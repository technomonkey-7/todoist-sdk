

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


describe('SectionSyncViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.SectionSyncView()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('section_sync_view hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).SectionSyncView().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).SectionSyncView()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.SectionSyncView().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().SectionSyncView().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.SectionSyncView().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.SectionSyncView().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SectionSyncView().list({"limit":"x","query":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'section_sync_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"added_at":{"a":true,"fo":"date-time","h":"Added At","n":"added_at","r":true,"sh":"Date and time when the section was created.","t":"`$STRING`","key$":"added_at","index$":0},"archived_at":{"a":true,"fo":"date-time","h":"Archived At","n":"archived_at","r":true,"sh":"Date and time when the section was archived, or `null` if it is active.","t":"`$ANY`","key$":"archived_at","index$":1},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"Section description, or `null` if it has none.","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the section.","t":"`$STRING`","key$":"id","index$":3},"is_archived":{"a":true,"h":"Is Archived","n":"is_archived","r":true,"sh":"Whether the section is archived.","t":"`$BOOLEAN`","key$":"is_archived","index$":4},"is_collapsed":{"a":true,"h":"Is Collapsed","n":"is_collapsed","r":true,"sh":"Whether the section is collapsed in the user's view.","t":"`$BOOLEAN`","key$":"is_collapsed","index$":5},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":true,"sh":"Whether the section is deleted.","t":"`$BOOLEAN`","key$":"is_deleted","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Section name.","t":"`$STRING`","key$":"name","index$":7},"order_key":{"a":true,"h":"Order Key","n":"order_key","r":true,"sh":"Fractional-indexing order key: sections sort by comparing keys lexicographically within a project.","t":"`$ANY`","key$":"order_key","index$":8},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"String ID of the project that contains the section.","t":"`$STRING`","key$":"project_id","index$":9},"section_order":{"a":true,"h":"Section Order","n":"section_order","r":true,"sh":"Position of the section in the project.","t":"`$INTEGER`","key$":"section_order","index$":10},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Date and time when the section was last updated, or `null` if unknown.","t":"`$ANY`","key$":"updated_at","index$":11},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"sh":"String ID of the user who owns the section.","t":"`$STRING`","key$":"user_id","index$":12}},"id":{"field":"id","name":"id"},"name":"section_sync_view","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/sections/{section_id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"section_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/sections/{section_id}/archive","q":{"$action":"archive","exist":["id"]},"r":{"param":{"section_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/v1/sections/{section_id}/unarchive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"section_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/sections/{section_id}/unarchive","q":{"$action":"unarchive","exist":["id"]},"r":{"param":{"section_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"var":"id"},{"lit":"unarchive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/sections/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"project_id","or":"project_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/sections/search","q":{"exist":["query"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"section_sync_view","name__orig":"section_sync_view","Name":"SectionSyncView","name_":"section_sync_view","name-":"section-sync-view","NAME":"SECTION_SYNC_VIEW","index$":39}, {"active":true,"entity":"section_sync_view","key$":"BasicSectionSyncViewFlow","kind":"basic","name":"BasicSectionSyncViewFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"section_sync_view_ref01"},"m":{"section_id":"section01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"section_sync_view_ref01"}}],"index$":0}]}, 'SectionSyncView', {"POST /api/v1/sections/{section_id}/archive":{"protocol":"http","parameters":[{"name":"section_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the section","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":0}]},"POST /api/v1/sections/{section_id}/unarchive":{"protocol":"http","parameters":[{"name":"section_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the section","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":0}]},"GET /api/v1/sections/search":{"protocol":"http","parameters":[{"name":"query","in":"query","required":true,"schema":{"type":"string","minLength":1,"maxLength":1024,"description":"Search query to match section names. Matching is case-insensitive. Queries are matched literally unless `*` (wildcard) is included. Use `\\*` for literal asterisk and `\\\\` for literal backslash.","examples":["To Do","Week *","Q* 2026","Draft\\*"],"title":"Query"},"index$":0},{"name":"project_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the project to search sections from. If omitted or null, search sections from all projects. If provided, workspace_id is ignored.","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":1},{"name":"workspace_id","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","exclusiveMinimum":0,"description":"Numeric ID of the workspace.","examples":[123456]},{"type":"null"}],"description":"Numeric ID of the workspace to search sections from, limited to the user's joined projects. If omitted or null, search sections from all projects. Ignored if project_id is also provided.","title":"Workspace Id"},"index$":2},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":3},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let section_sync_view_ref01_data = Object.values(setup.data.existing.section_sync_view)[0] as any

    // LIST
    const section_sync_view_ref01_ent = client.SectionSyncView()
    const section_sync_view_ref01_match: any = {}

    const section_sync_view_ref01_list = (await section_sync_view_ref01_ent.list(section_sync_view_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/section_sync_view/SectionSyncViewTestData.json')

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
    ['section_sync_view01','section_sync_view02','section_sync_view03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_SECTION_SYNC_VIEW_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_SECTION_SYNC_VIEW_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_SECTION_SYNC_VIEW_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TodoistSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.TODOIST_APIKEY,
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
  
