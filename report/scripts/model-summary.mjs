#!/usr/bin/env node
// Print the SDK surface the unified model describes: entity -> op -> points (method, path, response unwrap).
//   node model-summary.mjs [<sdk-root>] [--only e1,e2]
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const onlyAt = args.indexOf('--only')
const only = onlyAt >= 0 ? new Set(args[onlyAt + 1].split(',')) : null
const root = args.find((a, i) => !a.startsWith('--') && i !== (onlyAt >= 0 ? onlyAt + 1 : -1))
  ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..')

const model = JSON.parse(readFileSync(join(root, '.sdk', 'model', 'sdk.json'), 'utf8'))
const entities = model.main.kit.entity
const names = Object.keys(entities).sort()
const active = names.filter((n) => entities[n].active !== false)

console.log(`entities: ${names.length} (active ${active.length})`)
for (const name of names) {
  if (only && !only.has(name)) continue
  const e = entities[name]
  const ops = Object.keys(e.op ?? {}).sort()
  console.log(`\n${name}${e.active === false ? '  [inactive]' : ''}  ops: ${ops.join(', ') || '-'}`)
  for (const op of ops) {
    for (const p of e.op[op].points ?? []) {
      const action = p.q?.$action ? `  action=${p.q.$action}` : ''
      const res = p.t?.res && p.t.res !== '`body`' ? `  res=${typeof p.t.res === 'string' ? p.t.res : JSON.stringify(p.t.res)}` : ''
      console.log(`  ${op.padEnd(7)} ${p.m.padEnd(6)} ${p.o}${res}${action}`)
    }
  }
}
