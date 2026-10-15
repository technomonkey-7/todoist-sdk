#!/usr/bin/env node
// Minimal MCP stdio client: initialize, list tools, optionally call one tool.
//   node mcp-smoke.mjs <server-binary> [--call <tool> '<json-args>']
import { spawn } from 'node:child_process'
import { createInterface } from 'node:readline'

const [bin, ...rest] = process.argv.slice(2)
if (!bin) {
  console.error("usage: node mcp-smoke.mjs <server-binary> [--call <tool> '<json-args>']")
  process.exit(64)
}
const at = rest.indexOf('--call')
const call = at >= 0 ? { name: rest[at + 1], args: JSON.parse(rest[at + 2] ?? '{}') } : null

const child = spawn(bin, ['-transport', 'stdio'], { stdio: ['pipe', 'pipe', 'inherit'], env: process.env })
child.on('error', (e) => { console.error(`cannot start server: ${e.message}`); process.exit(1) })
const pending = new Map()
createInterface({ input: child.stdout }).on('line', (line) => {
  let msg
  try { msg = JSON.parse(line) } catch { return }
  if (msg.id !== undefined && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id) }
})

let nextId = 1
function request(method, params) {
  const id = nextId++
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n')
  return new Promise((resolve, reject) => {
    pending.set(id, resolve)
    setTimeout(() => reject(new Error(`timeout waiting for ${method}`)), 15000).unref()
  })
}
const notify = (method, params) => child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method, params }) + '\n')

try {
  const init = await request('initialize', {
    protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'mcp-smoke', version: '0.1.0' },
  })
  if (init.error) throw new Error(`initialize failed: ${JSON.stringify(init.error)}`)
  const info = init.result.serverInfo
  console.log(`server: ${info.name} ${info.version} (protocol ${init.result.protocolVersion})`)
  notify('notifications/initialized', {})
  const tools = await request('tools/list', {})
  console.log(`tools: ${tools.result.tools.map((t) => t.name).join(', ')}`)
  if (call) {
    const res = await request('tools/call', { name: call.name, arguments: call.args })
    const sc = res.result?.structuredContent
    if (sc !== undefined && (sc === null || typeof sc !== 'object' || Array.isArray(sc))) {
      // MCP 2025-06-18: structuredContent must be a JSON object. Validating clients reject anything else.
      console.log(`invalid result: structuredContent is ${Array.isArray(sc) ? 'an array' : typeof sc}, the MCP specification requires an object`)
      process.exitCode = 1
    }
    if (res.error || res.result.isError) {
      console.log(JSON.stringify(res.error ?? res.result, null, 2))
      process.exitCode = 1
    } else {
      console.log(res.result.content.map((c) => c.text ?? `[${c.type}]`).join('\n').slice(0, 2000))
    }
  }
} catch (e) {
  console.error(e.message)
  process.exitCode = 1
} finally {
  child.stdin.end()
  child.kill()
}
