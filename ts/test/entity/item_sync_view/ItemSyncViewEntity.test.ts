

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TodoistSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ItemSyncViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.ItemSyncView()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('item_sync_view hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).ItemSyncView().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).ItemSyncView()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ItemSyncView().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().ItemSyncView().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ItemSyncView().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ItemSyncView().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ItemSyncView().list({"label":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'item_sync_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"added_at":{"a":true,"fo":"date-time","h":"Added At","n":"added_at","r":true,"sh":"Date and time when the task was created, or `null` if unknown.","t":"`$ANY`","key$":"added_at","index$":0},"added_by_uid":{"a":true,"h":"Added By Uid","n":"added_by_uid","r":true,"sh":"String ID of the user who created the task, or `null` if unknown.","t":"`$ANY`","key$":"added_by_uid","index$":1},"assigned_by_uid":{"a":true,"h":"Assigned By Uid","n":"assigned_by_uid","r":true,"sh":"String ID of the user who assigned the task, or `null` if unassigned.","t":"`$ANY`","key$":"assigned_by_uid","index$":2},"assignee_id":{"a":true,"h":"Assignee Id","n":"assignee_id","r":false,"sh":"ID of the user to assign the task to.","t":"`$STRING`","key$":"assignee_id","index$":3},"checked":{"a":true,"h":"Checked","n":"checked","r":true,"sh":"Whether the task is completed.","t":"`$BOOLEAN`","key$":"checked","index$":4},"child_order":{"a":true,"h":"Child Order","n":"child_order","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"Position of the task among sibling tasks.","t":"`$INTEGER`","key$":"child_order","index$":5},"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":true,"sh":"Date and time when the task was completed, or `null` if active.","t":"`$ANY`","key$":"completed_at","index$":6},"completed_by_uid":{"a":true,"h":"Completed By Uid","n":"completed_by_uid","r":true,"sh":"String ID of the user who completed the task, or `null` if active.","t":"`$ANY`","key$":"completed_by_uid","index$":7},"completed_count":{"a":true,"h":"Completed Count","n":"completed_count","r":true,"sh":"Number of times the task has been marked as completed.","t":"`$INTEGER`","key$":"completed_count","index$":8},"content":{"a":true,"h":"Content","n":"content","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Task content.","t":"`$STRING`","key$":"content","index$":9},"day_order":{"a":true,"h":"Day Order","n":"day_order","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"Task order for day-based views.","t":"`$INTEGER`","key$":"day_order","index$":10},"deadline":{"a":true,"h":"Deadline","n":"deadline","r":true,"sh":"Deadline details for the task, or `null` when the task has no deadline.","t":"`$ANY`","key$":"deadline","index$":11},"deadline_date":{"a":true,"fo":"date","h":"Deadline Date","n":"deadline_date","r":false,"sh":"Updated deadline date in YYYY-MM-DD format.","t":"`$ANY`","key$":"deadline_date","index$":12},"description":{"a":true,"h":"Description","n":"description","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Task description.","t":"`$STRING`","key$":"description","index$":13},"due":{"a":true,"h":"Due","n":"due","r":true,"sh":"Due date details for the task, or `null` when the task has no due date.","t":"`$ANY`","key$":"due","index$":14},"due_date":{"a":true,"h":"Due Date","n":"due_date","r":false,"sh":"Updated due date in RFC 3339 format or similar.","t":"`$STRING`","key$":"due_date","index$":15},"due_datetime":{"a":true,"h":"Due Datetime","n":"due_datetime","r":false,"sh":"Updated due date and time.","t":"`$STRING`","key$":"due_datetime","index$":16},"due_lang":{"a":true,"h":"Due Lang","n":"due_lang","r":false,"sh":"Updated due date language code.","t":"`$STRING`","key$":"due_lang","index$":17},"due_string":{"a":true,"h":"Due String","n":"due_string","r":false,"sh":"Updated human-readable representation of the due date.","t":"`$STRING`","key$":"due_string","index$":18},"duration":{"a":true,"h":"Duration","n":"duration","op":{"create":{"req":false,"type":"`$NUMBER`"}},"r":true,"sh":"Task duration details, or `null` when the task has no duration.","t":"`$NUMBER`","union":{"branches":2,"count":1,"depth":3},"key$":"duration","index$":19},"duration_unit":{"a":true,"h":"Duration Unit","n":"duration_unit","r":false,"sh":"Unit of time for duration.","t":"`$ANY`","key$":"duration_unit","index$":20},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the task.","t":"`$STRING`","key$":"id","index$":21},"is_collapsed":{"a":true,"h":"Is Collapsed","n":"is_collapsed","op":{"create":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"Whether the task is collapsed in the user's view.","t":"`$BOOLEAN`","key$":"is_collapsed","index$":22},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":true,"sh":"Whether the task is deleted.","t":"`$BOOLEAN`","key$":"is_deleted","index$":23},"labels":{"a":true,"h":"Labels","n":"labels","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Names of labels attached to the task.","t":"`$ARRAY`","key$":"labels","index$":24},"note_count":{"a":true,"h":"Note Count","n":"note_count","r":true,"sh":"**Deprecated**: only returns 0 and is marked for removal.","t":"`$INTEGER`","key$":"note_count","index$":25},"order":{"a":true,"h":"Order","n":"order","r":false,"sh":"Position of the task in the project or section","t":"`$ANY`","key$":"order","index$":26},"order_key":{"a":true,"h":"Order Key","n":"order_key","r":true,"sh":"Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task.","t":"`$ANY`","key$":"order_key","index$":27},"parent_id":{"a":true,"h":"Parent Id","n":"parent_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"String ID of the parent task, or `null` if this is a top-level task.","t":"`$STRING`","key$":"parent_id","index$":28},"postponed_count":{"a":true,"h":"Postponed Count","n":"postponed_count","r":true,"sh":"Number of times the task's due date has been rescheduled by the user.","t":"`$INTEGER`","key$":"postponed_count","index$":29},"priority":{"a":true,"h":"Priority","n":"priority","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Task priority from 1 (normal) to 4 (urgent).","t":"`$INTEGER`","key$":"priority","index$":30},"project_id":{"a":true,"h":"Project Id","n":"project_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"String ID of the project that contains the task.","t":"`$STRING`","key$":"project_id","index$":31},"responsible_uid":{"a":true,"h":"Responsible Uid","n":"responsible_uid","r":true,"sh":"String ID of the user responsible for the task, or `null` if unassigned.","t":"`$ANY`","key$":"responsible_uid","index$":32},"section_id":{"a":true,"h":"Section Id","n":"section_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"String ID of the section that contains the task, or `null` if the task is not in a section.","t":"`$STRING`","key$":"section_id","index$":33},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Date and time when the task was last updated, or `null` if unknown.","t":"`$ANY`","key$":"updated_at","index$":34},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"sh":"String ID of the user who owns the task.","t":"`$STRING`","key$":"user_id","index$":35}},"id":{"field":"id","name":"id"},"name":"item_sync_view","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["assignee_id","child_order","content","day_order","deadline_date","description","due_date","due_datetime","due_lang","due_string","duration","duration_unit","is_collapsed","labels","priority"],"co":{"id":"POST /api/v1/tasks/{task_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/tasks/{task_id}","q":{"exist":["task_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"},{"var":"task_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/v1/tasks/{task_id}/close","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/tasks/{task_id}/close","q":{"$action":"close","exist":["task_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"},{"var":"task_id"},{"lit":"close"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["parent_id","project_id","section_id"],"co":{"id":"POST /api/v1/tasks/{task_id}/move","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/tasks/{task_id}/move","q":{"exist":["task_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"},{"var":"task_id"},{"lit":"move"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /api/v1/tasks/{task_id}/reopen","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/tasks/{task_id}/reopen","q":{"$action":"reopen","exist":["task_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"},{"var":"task_id"},{"lit":"reopen"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"bf":["assignee_id","content","deadline_date","description","due_date","due_datetime","due_lang","due_string","duration","duration_unit","labels","order","parent_id","priority","project_id","section_id"],"co":{"id":"POST /api/v1/tasks","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/tasks","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/tasks","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"ids","or":"ids","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"label","or":"label","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"parent_id","or":"parent_id","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"project_id","or":"project_id","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"section_id","or":"section_id","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/api/v1/tasks","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/tasks/{task_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"public_key","or":"public_key","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/tasks/{task_id}","q":{"exist":["task_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"},{"var":"task_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.task"]]},"key$":"item_sync_view","name__orig":"item_sync_view","Name":"ItemSyncView","name_":"item_sync_view","name-":"item-sync-view","NAME":"ITEM_SYNC_VIEW","index$":18}, {"active":true,"entity":"item_sync_view","key$":"BasicItemSyncViewFlow","kind":"basic","name":"BasicItemSyncViewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"item_sync_view_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"item_sync_view_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"item_sync_view_ref01","srcdatavar":"item_sync_view_ref01_data","suffix":"_dt0"},"m":{"id":"item_sync_view01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-item_sync_view_ref01"}}],"unreachable":true}]}, 'ItemSyncView', {"POST /api/v1/tasks/{task_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"content":{"type":"string","title":"Content","description":"Updated task content. Omit this field to keep it unchanged.","examples":["Buy milk"],"key$":"content"},"description":{"type":"string","title":"Description","description":"Updated task description. Omit this field to keep it unchanged.","examples":["Pick up two liters of whole milk."],"key$":"description"},"labels":{"items":{"type":"string"},"type":"array","title":"Labels","description":"Updated list of label names. Omit this field to keep it unchanged.","examples":[["errands","shopping"]],"key$":"labels"},"priority":{"type":"integer","maximum":4,"minimum":1,"title":"Priority","description":"Updated task priority (1-4, where 1 is highest). Omit this field to keep it unchanged.","examples":[2],"key$":"priority"},"due_string":{"type":"string","title":"Due String","description":"Updated human-readable representation of the due date. See the [Due dates](#tag/Due-dates) section for more details. Omit this field to keep it unchanged.","examples":["tomorrow at 12:00"],"key$":"due_string"},"due_date":{"type":"string","title":"Due Date","description":"Updated due date in RFC 3339 format or similar. See the [Due dates](#tag/Due-dates) section for more details. Omit this field to keep it unchanged.","examples":["2025-02-12"],"key$":"due_date"},"due_datetime":{"type":"string","title":"Due Datetime","description":"Updated due date and time. See the [Due dates](#tag/Due-dates) section for more details. Omit this field to keep it unchanged.","examples":["2025-02-12T12:00:00Z"],"key$":"due_datetime"},"due_lang":{"type":"string","title":"Due Lang","description":"Updated due date language code. See the [Due dates](#tag/Due-dates) section for more details. Omit this field to keep it unchanged.","examples":["en"],"key$":"due_lang"},"assignee_id":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Assignee Id","description":"ID of the user to assign the task to. To find User IDs, use [Get user](#operation/user_info_api_v1_user_get) for your own ID or [Get all collaborators](#operation/get_project_collaborators_api_v1_projects__project_id__collaborators_get) for project members. Pass null to clear the value. Omit this field to keep it unchanged.","examples":[123456789],"key$":"assignee_id"},"duration":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Duration","description":"Updated task duration, as a positive whole number of minutes or days. The API accepts durations longer than 24 hours, but the Todoist web and desktop date picker limits duration edits to 24 hours. Only used if `duration_unit` is also provided. Pass null to clear the value. Omit this field to keep it unchanged.","examples":[30],"key$":"duration"},"duration_unit":{"anyOf":[{"type":"string","enum":["minute","day"]},{"type":"null"}],"title":"Duration Unit","description":"Unit of time for duration. Must be provided to update the task duration. Pass null to clear the value. Omit this field to keep it unchanged.","examples":["minute"],"key$":"duration_unit"},"deadline_date":{"anyOf":[{"type":"string"},{"type":"null"}],"format":"date","title":"Deadline Date","description":"Updated deadline date in YYYY-MM-DD format. Pass null to clear the value. Omit this field to keep it unchanged.","examples":["2025-02-12"],"key$":"deadline_date"},"child_order":{"type":"integer","maximum":2147483647,"minimum":-2147483648,"title":"Child Order","description":"Updated position of the task in its current scope. Omit this field to keep it unchanged.","examples":[12],"key$":"child_order"},"is_collapsed":{"type":"boolean","title":"Is Collapsed","description":"Updated collapsed state of the task for the current user. Omit this field to keep it unchanged.","examples":[false],"key$":"is_collapsed"},"day_order":{"type":"integer","maximum":2147483647,"minimum":-2147483648,"title":"Day Order","description":"Updated position of the task in Today and Upcoming views. Omit this field to keep it unchanged.","examples":[3],"key$":"day_order"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_829067ab","index$":1}}}},"parameters":[{"name":"task_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"title":"Task Id"},"index$":0}]},"POST /api/v1/tasks/{task_id}/close":{"protocol":"http","parameters":[{"name":"task_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"title":"Task Id"},"index$":0}]},"POST /api/v1/tasks/{task_id}/move":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"project_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Project Id","description":"ID of the project to move the task to","examples":["6XGgm6PHrGgMpCFX"],"key$":"project_id"},"section_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Section Id","description":"ID of the section to move the task to","examples":["6fFPHV272WWh3gpW"],"key$":"section_id"},"parent_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Parent Id","description":"ID of the parent task to move the task under","examples":["6fFPHRxcmVqm4C84"],"key$":"parent_id"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_02786f52","index$":1}}}},"parameters":[{"name":"task_id","in":"path","required":true,"schema":{"type":"string","description":"ID of the task to move","examples":["6XGgm6PHrGgMpCFX"],"title":"Task Id"},"index$":0}]},"POST /api/v1/tasks/{task_id}/reopen":{"protocol":"http","parameters":[{"name":"task_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"title":"Task Id"},"index$":0}]},"POST /api/v1/tasks":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"content":{"type":"string","minLength":1,"title":"Content","description":"Task content.","examples":["Buy milk"],"key$":"content"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description","description":"Task description.","examples":["Pick up two liters of whole milk."],"key$":"description"},"project_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Project Id","description":"ID of the project to add the task to. If omitted or null, the task will be added to the user's Inbox.","examples":["6XGgm6PHrGgMpCFX"],"key$":"project_id"},"section_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Section Id","description":"ID of the section to add the task to","examples":["6fFPHV272WWh3gpW"],"key$":"section_id"},"parent_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Parent Id","description":"ID of the parent task","examples":["6XGgmFVcrG5RRjVr"],"key$":"parent_id"},"order":{"anyOf":[{"type":"integer","maximum":2147483647,"minimum":-2147483648},{"type":"null"}],"title":"Order","description":"Position of the task in the project or section","examples":[12],"key$":"order"},"labels":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Labels","description":"List of label names.","examples":[["errands","shopping"]],"key$":"labels"},"priority":{"anyOf":[{"type":"integer","maximum":4,"minimum":1},{"type":"null"}],"title":"Priority","description":"Task priority (1-4, where 1 is highest)","examples":[2],"key$":"priority"},"assignee_id":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Assignee Id","description":"ID of the user to assign the task to. To find User IDs, use [Get user](#operation/user_info_api_v1_user_get) for your own ID or [Get all collaborators](#operation/get_project_collaborators_api_v1_projects__project_id__collaborators_get) for project members.","examples":[123456789],"key$":"assignee_id"},"due_string":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Due String","description":"Human-readable representation of the due date. See the [Due dates](#tag/Due-dates) section for more details.","examples":["tomorrow at 12:00"],"key$":"due_string"},"due_date":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Due Date","description":"Due date in RFC 3339 format or similar. See the [Due dates](#tag/Due-dates) section for more details.","examples":["2025-02-12"],"key$":"due_date"},"due_datetime":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Due Datetime","description":"Due date and time. See the [Due dates](#tag/Due-dates) section for more details.","examples":["2025-02-12T12:00:00Z"],"key$":"due_datetime"},"due_lang":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Due Lang","description":"Due date language code. See the [Due dates](#tag/Due-dates) section for more details.","examples":["en"],"key$":"due_lang"},"duration":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Duration","description":"Task duration, as a positive whole number of minutes or days. The API accepts durations longer than 24 hours, but the Todoist web and desktop date picker limits duration edits to 24 hours. Only used if `duration_unit` is also provided.","examples":[30],"key$":"duration"},"duration_unit":{"anyOf":[{"type":"string","enum":["minute","day"]},{"type":"null"}],"title":"Duration Unit","description":"Unit of time for duration.","examples":["minute"],"key$":"duration_unit"},"deadline_date":{"anyOf":[{"type":"string"},{"type":"null"}],"format":"date","title":"Deadline Date","description":"Deadline date in YYYY-MM-DD format","examples":["2025-02-12"],"key$":"deadline_date"}},"type":"object","required":["content"],"title":"Body","x-ref":"#/components/schemas/Body_37565102","index$":1}}}},"parameters":[]},"GET /api/v1/tasks":{"protocol":"http","parameters":[{"name":"project_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the project to get tasks from","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0},{"name":"section_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the section to get tasks from","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":1},{"name":"parent_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the parent task to get sub-tasks from","examples":["6fFPHRxcmVqm4C84"],"title":"Parent Id"},"index$":2},{"name":"label","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"Filter tasks by label name.","examples":["next_action"],"title":"Label"},"index$":3},{"name":"ids","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"A list of the task IDs to retrieve, this should be a comma separated list","examples":["6XGgmFVcrG5RRjVr,6fFPHV272WWh3gpW"],"title":"Ids"},"index$":4},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":5},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":6}]},"GET /api/v1/tasks/{task_id}":{"protocol":"http","parameters":[{"name":"task_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"title":"Task Id"},"index$":0},{"name":"public_key","in":"query","required":false,"schema":{"anyOf":[{"type":"string","description":"Public project access key.","examples":["550e8400-e29b-41d4-a716-446655440000"]},{"type":"null"}],"title":"Public Key"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const item_sync_view_ref01_ent = client.ItemSyncView()
    let item_sync_view_ref01_data = setup.data.new.item_sync_view['item_sync_view_ref01']

    item_sync_view_ref01_data = (await item_sync_view_ref01_ent.create(item_sync_view_ref01_data)).data()
    assert(null != item_sync_view_ref01_data.id)


    // LIST
    const item_sync_view_ref01_match: any = {}

    const item_sync_view_ref01_list = (await item_sync_view_ref01_ent.list(item_sync_view_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(item_sync_view_ref01_list, { id: item_sync_view_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/item_sync_view/ItemSyncViewTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TodoistSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['item_sync_view01','item_sync_view02','item_sync_view03','task01','task02','task03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_ITEM_SYNC_VIEW_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_ITEM_SYNC_VIEW_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_ITEM_SYNC_VIEW_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TodoistSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TODOIST_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
