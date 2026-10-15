

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


describe('PaginatedListItemSyncViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.PaginatedListItemSyncView()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('paginated_list_item_sync_view hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).PaginatedListItemSyncView().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).PaginatedListItemSyncView()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.PaginatedListItemSyncView().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().PaginatedListItemSyncView().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.PaginatedListItemSyncView().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.PaginatedListItemSyncView().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PaginatedListItemSyncView().list({"limit":"x","query":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'paginated_list_item_sync_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"added_at":{"a":true,"fo":"date-time","h":"Added At","n":"added_at","r":true,"sh":"Date and time when the task was created, or `null` if unknown.","t":"`$ANY`","key$":"added_at","index$":0},"added_by_uid":{"a":true,"h":"Added By Uid","n":"added_by_uid","r":true,"sh":"String ID of the user who created the task, or `null` if unknown.","t":"`$ANY`","key$":"added_by_uid","index$":1},"assigned_by_uid":{"a":true,"h":"Assigned By Uid","n":"assigned_by_uid","r":true,"sh":"String ID of the user who assigned the task, or `null` if unassigned.","t":"`$ANY`","key$":"assigned_by_uid","index$":2},"checked":{"a":true,"h":"Checked","n":"checked","r":true,"sh":"Whether the task is completed.","t":"`$BOOLEAN`","key$":"checked","index$":3},"child_order":{"a":true,"h":"Child Order","n":"child_order","r":true,"sh":"Position of the task among sibling tasks.","t":"`$INTEGER`","key$":"child_order","index$":4},"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":true,"sh":"Date and time when the task was completed, or `null` if active.","t":"`$ANY`","key$":"completed_at","index$":5},"completed_by_uid":{"a":true,"h":"Completed By Uid","n":"completed_by_uid","r":true,"sh":"String ID of the user who completed the task, or `null` if active.","t":"`$ANY`","key$":"completed_by_uid","index$":6},"completed_count":{"a":true,"h":"Completed Count","n":"completed_count","r":true,"sh":"Number of times the task has been marked as completed.","t":"`$INTEGER`","key$":"completed_count","index$":7},"content":{"a":true,"h":"Content","n":"content","r":true,"sh":"Task content.","t":"`$STRING`","key$":"content","index$":8},"day_order":{"a":true,"h":"Day Order","n":"day_order","r":true,"sh":"Task order for day-based views.","t":"`$INTEGER`","key$":"day_order","index$":9},"deadline":{"a":true,"h":"Deadline","n":"deadline","r":true,"sh":"Deadline details for the task, or `null` when the task has no deadline.","t":"`$ANY`","key$":"deadline","index$":10},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"Task description.","t":"`$STRING`","key$":"description","index$":11},"due":{"a":true,"h":"Due","n":"due","r":true,"sh":"Due date details for the task, or `null` when the task has no due date.","t":"`$ANY`","key$":"due","index$":12},"duration":{"a":true,"h":"Duration","n":"duration","r":true,"sh":"Task duration details, or `null` when the task has no duration.","t":"`$NUMBER`","union":{"branches":2,"count":1,"depth":3},"key$":"duration","index$":13},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the task.","t":"`$STRING`","key$":"id","index$":14},"is_collapsed":{"a":true,"h":"Is Collapsed","n":"is_collapsed","r":true,"sh":"Whether the task is collapsed in the user's view.","t":"`$BOOLEAN`","key$":"is_collapsed","index$":15},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":true,"sh":"Whether the task is deleted.","t":"`$BOOLEAN`","key$":"is_deleted","index$":16},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"sh":"Names of labels attached to the task.","t":"`$ARRAY`","key$":"labels","index$":17},"note_count":{"a":true,"h":"Note Count","n":"note_count","r":true,"sh":"**Deprecated**: only returns 0 and is marked for removal.","t":"`$INTEGER`","key$":"note_count","index$":18},"order_key":{"a":true,"h":"Order Key","n":"order_key","r":true,"sh":"Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task.","t":"`$ANY`","key$":"order_key","index$":19},"parent_id":{"a":true,"h":"Parent Id","n":"parent_id","r":true,"sh":"String ID of the parent task, or `null` if this is a top-level task.","t":"`$STRING`","key$":"parent_id","index$":20},"postponed_count":{"a":true,"h":"Postponed Count","n":"postponed_count","r":true,"sh":"Number of times the task's due date has been rescheduled by the user.","t":"`$INTEGER`","key$":"postponed_count","index$":21},"priority":{"a":true,"h":"Priority","n":"priority","r":true,"sh":"Task priority from 1 (normal) to 4 (urgent).","t":"`$INTEGER`","key$":"priority","index$":22},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"String ID of the project that contains the task.","t":"`$STRING`","key$":"project_id","index$":23},"responsible_uid":{"a":true,"h":"Responsible Uid","n":"responsible_uid","r":true,"sh":"String ID of the user responsible for the task, or `null` if unassigned.","t":"`$ANY`","key$":"responsible_uid","index$":24},"section_id":{"a":true,"h":"Section Id","n":"section_id","r":true,"sh":"String ID of the section that contains the task, or `null` if the task is not in a section.","t":"`$STRING`","key$":"section_id","index$":25},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Date and time when the task was last updated, or `null` if unknown.","t":"`$ANY`","key$":"updated_at","index$":26},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"sh":"String ID of the user who owns the task.","t":"`$STRING`","key$":"user_id","index$":27}},"id":{"field":"id","name":"id"},"name":"paginated_list_item_sync_view","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/tasks/filter","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"lang","or":"lang","r":false,"t":"`$ANY`","index$":1},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/tasks/filter","q":{"exist":["query"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"},{"lit":"filter"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"paginated_list_item_sync_view","name__orig":"paginated_list_item_sync_view","Name":"PaginatedListItemSyncView","name_":"paginated_list_item_sync_view","name-":"paginated-list-item-sync-view","NAME":"PAGINATED_LIST_ITEM_SYNC_VIEW","index$":28}, {"active":true,"entity":"paginated_list_item_sync_view","key$":"BasicPaginatedListItemSyncViewFlow","kind":"basic","name":"BasicPaginatedListItemSyncViewFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"paginated_list_item_sync_view_ref01"}}],"index$":0}]}, 'PaginatedListItemSyncView', {"GET /api/v1/tasks/filter":{"protocol":"http","parameters":[{"name":"query","in":"query","required":true,"schema":{"type":"string","minLength":1,"maxLength":1024,"description":"Filter by any [supported filter](https://todoist.com/help/articles/introduction-to-filters-V98wIH). Multiple filters (using the comma `,` operator) are not supported.","examples":["today | overdue"],"title":"Query"},"index$":0},{"name":"lang","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"IETF language tag defining what language filter is written in, if differs from default English","examples":["en","de","fr"],"title":"Lang"},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":2},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let paginated_list_item_sync_view_ref01_data = Object.values(setup.data.existing.paginated_list_item_sync_view)[0] as any

    // LIST
    const paginated_list_item_sync_view_ref01_ent = client.PaginatedListItemSyncView()
    const paginated_list_item_sync_view_ref01_match: any = {}

    const paginated_list_item_sync_view_ref01_list = (await paginated_list_item_sync_view_ref01_ent.list(paginated_list_item_sync_view_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/paginated_list_item_sync_view/PaginatedListItemSyncViewTestData.json')

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
    ['paginated_list_item_sync_view01','paginated_list_item_sync_view02','paginated_list_item_sync_view03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_PAGINATED_LIST_ITEM_SYNC_VIEW_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_PAGINATED_LIST_ITEM_SYNC_VIEW_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_PAGINATED_LIST_ITEM_SYNC_VIEW_ENTID']
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
  
