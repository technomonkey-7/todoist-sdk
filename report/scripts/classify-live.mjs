#!/usr/bin/env node
// Classify every failing live entity flow and direct test in a TypeScript live-run log.
//   node classify-live.mjs <ts-live.log>
// Categories (finding ids in report/FINDINGS.md):
//   excluded-only   flow has nothing left to run after sdk-test-control exclusions (F16)
//   needs-input     a step is blocked: a parent id or required query value the flow cannot supply (F14)
//   mark-field      update wrote the test mark into an id, enum or timestamp field (F13)
//   example-parent  create sent the definition's example parent id (F14)
//   one-of-params   list needs one of two optional params the definition does not tie together (definition)
//   action-route    direct test called an action route that needs a required query param (F15)
//   response-shape  direct test got a 200 but did not apply the op's response unwrap (F15)
import { readFileSync } from 'node:fs'

if (!process.argv[2]) {
  console.error('usage: node classify-live.mjs <ts-live.log>')
  process.exit(64)
}
const lines = readFileSync(process.argv[2], 'utf8').split('\n')
const rows = []

for (const line of lines) {
  if (!line.startsWith('LIVE SUMMARY ')) continue
  const s = JSON.parse(line.slice('LIVE SUMMARY '.length))
  if (s.passed + s.empty === s.planned) continue
  const bad = s.results.filter((r) => !['passed', 'empty'].includes(r.state))
  // A flow whose reads passed and whose writes were excluded does not fail the run.
  if (s.passed > 0 && bad.every((r) => r.state === 'excluded')) continue
  let cat
  if (bad.every((r) => r.state === 'excluded')) cat = 'excluded-only'
  else if (bad.some((r) => r.state === 'failed' && /\.update\./.test(r.id) && r.requests?.[0]?.status === 400)) cat = 'mark-field'
  else if (bad.some((r) => r.state === 'failed' && /\.create\./.test(r.id) && [400, 404].includes(r.requests?.[0]?.status))) cat = 'example-parent'
  else if (bad.some((r) => r.state === 'failed' && /\.list\./.test(r.id) && r.requests?.[0]?.status === 400)) cat = 'one-of-params'
  else if (bad.some((r) => r.state === 'blocked')) cat = 'needs-input'
  else cat = 'other'
  const detail = bad.map((r) => `${r.id.replace(/\.\d+$/, '')}:${r.state}${r.requests?.[0] ? ' ' + r.requests[0].status : ''}`).join(', ')
  rows.push({ test: `${s.entity} (flow)`, cat, detail })
}

let lastResponse = null
for (let i = 0; i < lines.length; i++) {
  const l = lines[i]
  if (l.startsWith('▶ ')) lastResponse = null
  if (l.startsWith('LIVE RESPONSE ')) {
    const j = JSON.parse(l.slice('LIVE RESPONSE '.length))
    lastResponse = `${j.method} ${j.path.replace('https://api.todoist.com', '')} ${j.status}`
  }
  const m = l.match(/^ {2}✖ (direct-\S+)/)
  if (!m) continue
  const status = lastResponse ? Number(lastResponse.split(' ').pop()) : null
  // Action routes that come first in their op (F15).
  const actionRoute = /\/(projects\/search|tasks\/filter|labels\/search|sections\/search|workspaces\/invitations) /.test(lastResponse ?? '')
  // Lists that need one of two optional parameters the definition does not tie together.
  const oneOf = /\/(comments|folders) /.test(lastResponse ?? '')
  const cat = status === 400 && actionRoute ? 'action-route'
    : status === 400 && oneOf ? 'one-of-params'
    : status === 200 ? 'response-shape'
    : 'needs-input'
  rows.push({ test: m[1], cat, detail: lastResponse ?? 'no request sent' })
}

const counts = rows.reduce((a, r) => ((a[r.cat] = (a[r.cat] ?? 0) + 1), a), {})
console.log('| Test | Category | Detail |\n|---|---|---|')
for (const r of rows) console.log(`| ${r.test} | ${r.cat} | ${r.detail} |`)
console.log(`\nTotal ${rows.length}: ` + Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', '))
