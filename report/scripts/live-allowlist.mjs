#!/usr/bin/env node
// Write the live-test skip list into every target's sdk-test-control.json:
// reads (list, load, direct GETs) run everywhere; writes (create, update,
// remove) run only on the five core resources, where the generated live flow
// creates its own record first. Outside them a write can change account
// settings or start a billing action (notification_setting.update,
// usage_billing top_up, payments cancel/reactivate), so it is skipped.
// sdkgen writes these files once and never overwrites them (TestControl, exclude: true).
//   node live-allowlist.mjs [<sdk-root>]
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const WRITE_OK = new Set(['task', 'project', 'section', 'comment', 'label'])
const WRITES = ['create', 'update', 'remove']
const REASON = 'Write outside the five core resources: not run live, it can change account settings or start a billing action (see the README Coverage section).'

const model = JSON.parse(readFileSync(join(root, '.sdk', 'model', 'sdk.json'), 'utf8'))
const skips = []
for (const [name, entity] of Object.entries(model.main.kit.entity).sort()) {
  if (WRITE_OK.has(name)) continue
  for (const op of WRITES) if (entity.op?.[op]) skips.push({ entity: name, op, reason: REASON })
}

for (const target of ['ts', 'py', 'go']) {
  const file = join(root, target, 'test', 'sdk-test-control.json')
  if (!existsSync(file)) { console.error(`missing: ${file}`); process.exitCode = 1; continue }
  const ctrl = JSON.parse(readFileSync(file, 'utf8'))
  ctrl.test.skip.live.entityOp = skips
  writeFileSync(file, JSON.stringify(ctrl, null, 2) + '\n')
  console.log(`${target}: ${skips.length} live write ops skipped`)
}
console.log(skips.map((s) => `${s.entity}.${s.op}`).join(' '))
