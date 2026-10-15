// Canonical CRUD scenario against the live Todoist API, through the generated TypeScript SDK.
// Reads TODOIST_APIKEY from <SDK_ROOT>/.env.local and never prints it.
const { readFileSync } = require('node:fs')
const { join } = require('node:path')

const SDK_ROOT = process.env.SDK_ROOT ?? join(__dirname, '..', '..')
const { TodoistSDK } = require(join(SDK_ROOT, 'ts'))

const apikey = readFileSync(join(SDK_ROOT, '.env.local'), 'utf8').match(/^TODOIST_APIKEY=(.+)$/m)[1].trim()
const client = new TodoistSDK({ apikey })
const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)
const name = `voxgig-sdk-live-ts-${stamp}`
const results = []

async function step(label, fn) {
  try {
    const value = await fn()
    results.push([label, 'PASS', ''])
    return value
  } catch (e) {
    results.push([label, 'FAIL', String(e?.message ?? e).slice(0, 160)])
    return undefined
  }
}

;(async () => {
  let projectId
  let labelId
  try {
    const project = await step('project.create', () => client.Project().create({ name }))
    projectId = project?.data().id
    const section = await step('section.create', () => client.Section().create({ project_id: projectId, name: 'Section A' }))
    const task = await step('task.create', () =>
      client.Task().create({ content: 'Write the DX report', project_id: projectId, section_id: section?.data().id }))
    const taskId = task?.data().id
    await step('task.load', async () => {
      const t = await client.Task().load({ id: taskId })
      if (t.data().id !== taskId) throw new Error('loaded a different task')
    })
    await step('task.update', async () => {
      const t = await client.Task().update({ id: taskId, content: 'Write the DX report (edited)' })
      if (!String(t.data().content).endsWith('(edited)')) throw new Error('content not updated')
    })
    await step('task.list', async () => {
      const tasks = await client.Task().list({ project_id: projectId })
      if (!tasks.some((t) => t.data().id === taskId)) throw new Error('task missing from project list')
    })
    await step('task.close', () => client.Task().update({ id: taskId, $action: 'close' }))
    await step('task.reopen', () => client.Task().update({ id: taskId, $action: 'reopen' }))
    const comment = await step('comment.create', () => client.Comment().create({ task_id: taskId, content: 'First comment' }))
    const commentId = comment?.data().id
    await step('comment.list', async () => {
      const comments = await client.Comment().list({ task_id: taskId })
      if (!comments.some((c) => c.data().id === commentId)) throw new Error('comment missing from list')
    })
    await step('comment.update', () => client.Comment().update({ id: commentId, content: 'Edited comment' }))
    await step('comment.remove', () => client.Comment().remove({ id: commentId }))
    const label = await step('label.create', () => client.Label().create({ name }))
    labelId = label?.data().id
    await step('label.update', () => client.Label().update({ id: labelId, color: 'berry_red' }))
    await step('label.remove', async () => { await client.Label().remove({ id: labelId }); labelId = undefined })
    await step('project.remove', async () => { await client.Project().remove({ id: projectId }); projectId = undefined })
  } finally {
    // Runs even when a step failed, so a broken step never leaves data behind.
    if (labelId) await client.Label().remove({ id: labelId }).catch(() => {})
    if (projectId) await client.Project().remove({ id: projectId }).catch(() => {})
    for (const [label, status, note] of results) console.log(`${status}  ${label}${note ? '  ' + note : ''}`)
    process.exitCode = results.some(([, status]) => status === 'FAIL') ? 1 : 0
  }
})()
