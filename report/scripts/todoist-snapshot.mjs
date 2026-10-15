#!/usr/bin/env node
// Read-only snapshot of a Todoist account, independent of the SDK under test.
// Stores ids and content digests only, never names.
//   node todoist-snapshot.mjs snap <out.json>
//   node todoist-snapshot.mjs diff <before.json> <after.json>     exit 0 clean, 1 leftovers, 2 pre-existing data touched
//   node todoist-snapshot.mjs cleanup <before.json> <after.json> [--yes]
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SDK_ROOT = process.env.SDK_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const BASE = 'https://api.todoist.com/api/v1'
const KINDS = ['projects', 'sections', 'labels', 'tasks']

function token() {
  const env = readFileSync(join(SDK_ROOT, '.env.local'), 'utf8')
  const line = env.split(/\r?\n/).find((l) => l.startsWith('TODOIST_APIKEY='))
  if (!line) throw new Error('TODOIST_APIKEY not found in .env.local')
  return line.slice('TODOIST_APIKEY='.length).trim()
}

async function call(method, path) {
  const res = await fetch(BASE + path, { method, headers: { Authorization: `Bearer ${token()}` } })
  if (!res.ok) throw new Error(`${method} ${path.split('?')[0]} -> ${res.status}`)
  return res.status === 204 ? null : res.json()
}

async function listAll(kind) {
  const out = []
  let cursor = null
  do {
    const q = new URLSearchParams({ limit: '200' })
    if (cursor) q.set('cursor', cursor)
    const page = await call('GET', `/${kind}?${q}`)
    out.push(...page.results)
    cursor = page.next_cursor
  } while (cursor)
  return out
}

const digest = (record) => createHash('sha256').update(JSON.stringify(record)).digest('hex').slice(0, 16)

async function snap(file) {
  const snapshot = { taken_at: new Date().toISOString() }
  for (const kind of KINDS) {
    snapshot[kind] = Object.fromEntries((await listAll(kind)).map((r) => [r.id, digest(r)]))
  }
  writeFileSync(file, JSON.stringify(snapshot, null, 2))
  console.log(KINDS.map((k) => `${k}=${Object.keys(snapshot[k]).length}`).join(' '))
}

function diff(beforeFile, afterFile) {
  const before = JSON.parse(readFileSync(beforeFile, 'utf8'))
  const after = JSON.parse(readFileSync(afterFile, 'utf8'))
  const report = {}
  for (const kind of KINDS) {
    const b = before[kind]
    const a = after[kind]
    report[kind] = {
      added: Object.keys(a).filter((id) => !(id in b)),
      removed: Object.keys(b).filter((id) => !(id in a)),
      changed: Object.keys(a).filter((id) => id in b && a[id] !== b[id]),
    }
  }
  return report
}

async function cleanup(beforeFile, afterFile, yes) {
  const report = diff(beforeFile, afterFile)
  for (const kind of ['tasks', 'sections', 'projects', 'labels']) {
    for (const id of report[kind].added) {
      if (!yes) { console.log(`would delete ${kind}/${id}`); continue }
      try { await call('DELETE', `/${kind}/${id}`); console.log(`deleted ${kind}/${id}`) }
      catch (e) { console.log(`skip ${kind}/${id}: ${e.message}`) } // already gone with its project
    }
  }
}

const [cmd, a, b, flag] = process.argv.slice(2)
if (cmd === 'snap') await snap(a)
else if (cmd === 'diff') {
  const r = diff(a, b)
  console.log(JSON.stringify(r, null, 2))
  const touched = KINDS.some((k) => r[k].removed.length || r[k].changed.length)
  const leftovers = KINDS.some((k) => r[k].added.length)
  process.exit(touched ? 2 : leftovers ? 1 : 0)
}
else if (cmd === 'cleanup') await cleanup(a, b, flag === '--yes')
else { console.error('usage: snap <out> | diff <before> <after> | cleanup <before> <after> [--yes]'); process.exit(64) }
