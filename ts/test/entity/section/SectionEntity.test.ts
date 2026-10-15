

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


describe('SectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.Section()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('section hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).Section().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).Section()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Section().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().Section().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Section().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Section().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Section().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'section.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"added_at":{"a":true,"fo":"date-time","h":"Added At","n":"added_at","r":true,"sh":"Date and time when the section was created.","t":"`$STRING`","key$":"added_at","index$":0},"archived_at":{"a":true,"fo":"date-time","h":"Archived At","n":"archived_at","r":true,"sh":"Date and time when the section was archived, or `null` if it is active.","t":"`$ANY`","key$":"archived_at","index$":1},"description":{"a":true,"h":"Description","n":"description","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Section description, or `null` if it has none.","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the section.","t":"`$STRING`","key$":"id","index$":3},"is_archived":{"a":true,"h":"Is Archived","n":"is_archived","r":true,"sh":"Whether the section is archived.","t":"`$BOOLEAN`","key$":"is_archived","index$":4},"is_collapsed":{"a":true,"h":"Is Collapsed","n":"is_collapsed","op":{"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"Whether the section is collapsed in the user's view.","t":"`$BOOLEAN`","key$":"is_collapsed","index$":5},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":true,"sh":"Whether the section is deleted.","t":"`$BOOLEAN`","key$":"is_deleted","index$":6},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Section name.","t":"`$STRING`","key$":"name","index$":7},"order":{"a":true,"h":"Order","n":"order","r":false,"sh":"Position of the new section in the project","t":"`$ANY`","key$":"order","index$":8},"order_key":{"a":true,"h":"Order Key","n":"order_key","r":true,"sh":"Fractional-indexing order key: sections sort by comparing keys lexicographically within a project.","t":"`$ANY`","key$":"order_key","index$":9},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"String ID of the project that contains the section.","t":"`$STRING`","key$":"project_id","index$":10},"section_order":{"a":true,"h":"Section Order","n":"section_order","op":{"update":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Position of the section in the project.","t":"`$INTEGER`","key$":"section_order","index$":11},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Date and time when the section was last updated, or `null` if unknown.","t":"`$ANY`","key$":"updated_at","index$":12},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"sh":"String ID of the user who owns the section.","t":"`$STRING`","key$":"user_id","index$":13}},"id":{"field":"id","name":"id"},"name":"section","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["description","name","order","project_id"],"co":{"id":"POST /api/v1/sections","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/sections","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/sections/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"project_id","or":"project_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/sections/search","q":{"$action":"search","exist":["query"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/sections","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"project_id","or":"project_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"public_key","or":"public_key","r":false,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/sections","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/sections/{section_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"section_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"public_key","or":"public_key","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/sections/{section_id}","q":{"exist":["id"]},"r":{"param":{"section_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/sections/{section_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"section_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/sections/{section_id}","q":{"exist":["id"]},"r":{"param":{"section_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["description","is_collapsed","name","section_order"],"co":{"id":"POST /api/v1/sections/{section_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"section_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/sections/{section_id}","q":{"exist":["id"]},"r":{"param":{"section_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/v1/sections/{section_id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"section_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/sections/{section_id}/archive","q":{"$action":"archive","exist":["id"]},"r":{"param":{"section_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /api/v1/sections/{section_id}/unarchive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"section_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/sections/{section_id}/unarchive","q":{"$action":"unarchive","exist":["id"]},"r":{"param":{"section_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sections"},{"var":"id"},{"lit":"unarchive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"section","name__orig":"section","Name":"Section","name_":"section","name-":"section","NAME":"SECTION","index$":21}, {"active":true,"entity":"section","key$":"BasicSectionFlow","kind":"basic","name":"BasicSectionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"section_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"section_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"section_ref01","srcdatavar":"section_ref01_data","suffix":"_up0","textfield":"added_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-section_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"section_ref01","srcdatavar":"section_ref01_data","suffix":"_dt0"},"m":{"id":"section01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-section_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"section_ref01","suffix":"_rm0"},"m":{"id":"section01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"section_ref01"}}],"index$":5}]}, 'Section', {"POST /api/v1/sections":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","title":"Name","description":"Name of the new section.","examples":["Groceries"],"key$":"name"},"project_id":{"type":"string","title":"Project Id","description":"ID of the project to add the section to","examples":["6XGgm6PHrGgMpCFX"],"key$":"project_id"},"order":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Order","description":"Position of the new section in the project","examples":[12],"key$":"order"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description","description":"Description of the new section.","examples":["Tasks for the launch plan"],"key$":"description"}},"type":"object","required":["name","project_id"],"title":"Body","x-ref":"#/components/schemas/Body_134c19e9","index$":1}}}},"parameters":[]},"GET /api/v1/sections/search":{"protocol":"http","parameters":[{"name":"query","in":"query","required":true,"schema":{"type":"string","minLength":1,"maxLength":1024,"description":"Search query to match section names. Matching is case-insensitive. Queries are matched literally unless `*` (wildcard) is included. Use `\\*` for literal asterisk and `\\\\` for literal backslash.","examples":["To Do","Week *","Q* 2026","Draft\\*"],"title":"Query"},"index$":0},{"name":"project_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the project to search sections from. If omitted or null, search sections from all projects. If provided, workspace_id is ignored.","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":1},{"name":"workspace_id","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","exclusiveMinimum":0,"description":"Numeric ID of the workspace.","examples":[123456]},{"type":"null"}],"description":"Numeric ID of the workspace to search sections from, limited to the user's joined projects. If omitted or null, search sections from all projects. Ignored if project_id is also provided.","title":"Workspace Id"},"index$":2},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":3},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":4}]},"GET /api/v1/sections":{"protocol":"http","parameters":[{"name":"project_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the project to get sections from. If omitted or null, get sections from all projects. If provided, workspace_id is ignored.","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0},{"name":"workspace_id","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","exclusiveMinimum":0,"description":"Numeric ID of the workspace.","examples":[123456]},{"type":"null"}],"description":"Numeric ID of the workspace to get sections from, limited to the user's joined projects. If omitted or null, get sections from all projects. Ignored if project_id is also provided.","title":"Workspace Id"},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":2},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":3},{"name":"public_key","in":"query","required":false,"schema":{"anyOf":[{"type":"string","description":"Public project access key.","examples":["550e8400-e29b-41d4-a716-446655440000"]},{"type":"null"}],"title":"Public Key"},"index$":4}]},"GET /api/v1/sections/{section_id}":{"protocol":"http","parameters":[{"name":"section_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the section","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":0},{"name":"public_key","in":"query","required":false,"schema":{"anyOf":[{"type":"string","description":"Public project access key.","examples":["550e8400-e29b-41d4-a716-446655440000"]},{"type":"null"}],"title":"Public Key"},"index$":1}]},"DELETE /api/v1/sections/{section_id}":{"protocol":"http","parameters":[{"name":"section_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the section","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":0}]},"POST /api/v1/sections/{section_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Name","description":"Updated section name. Passing null or omitting this field will leave it unchanged.","examples":["Groceries"],"key$":"name"},"section_order":{"anyOf":[{"type":"integer","maximum":2147483647,"minimum":-2147483648},{"type":"null"}],"title":"Section Order","description":"Updated position of the section in the project. Passing null or omitting this field will leave it unchanged.","examples":[12],"key$":"section_order"},"is_collapsed":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Is Collapsed","description":"Updated collapsed state of the section. Passing null or omitting this field will leave it unchanged.","examples":[true],"key$":"is_collapsed"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description","description":"Updated section description. Pass null to clear the value. Omit this field to keep it unchanged.","examples":["Tasks for the launch plan"],"key$":"description"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_163067b4","index$":1}}}},"parameters":[{"name":"section_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the section","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":0}]},"POST /api/v1/sections/{section_id}/archive":{"protocol":"http","parameters":[{"name":"section_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the section","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":0}]},"POST /api/v1/sections/{section_id}/unarchive":{"protocol":"http","parameters":[{"name":"section_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the section","examples":["6fFPHV272WWh3gpW"],"title":"Section Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const section_ref01_ent = client.Section()
    let section_ref01_data = setup.data.new.section['section_ref01']

    section_ref01_data = (await section_ref01_ent.create(section_ref01_data)).data()
    assert(null != section_ref01_data.id)


    // LIST
    const section_ref01_match: any = {}

    const section_ref01_list = (await section_ref01_ent.list(section_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(section_ref01_list, { id: section_ref01_data.id })))


    // UPDATE
    const section_ref01_data_up0: any = {}
    section_ref01_data_up0.id = section_ref01_data.id

    const section_ref01_markdef_up0 = { name: 'added_at', value: 'Mark01-section_ref01_' + setup.now }
    ;(section_ref01_data_up0 as any)[section_ref01_markdef_up0.name] = section_ref01_markdef_up0.value

    const section_ref01_resdata_up0 = (await section_ref01_ent.update(section_ref01_data_up0)).data()
    assert(section_ref01_resdata_up0.id === section_ref01_data_up0.id)

    assert((section_ref01_resdata_up0 as any)[section_ref01_markdef_up0.name] === section_ref01_markdef_up0.value)


    // LOAD
    const section_ref01_match_dt0: any = {}
    section_ref01_match_dt0.id = section_ref01_data.id
    const section_ref01_data_dt0 = (await section_ref01_ent.load(section_ref01_match_dt0)).data()
    assert(section_ref01_data_dt0.id === section_ref01_data.id)


    // REMOVE
    const section_ref01_match_rm0: any = { id: section_ref01_data.id }
    await section_ref01_ent.remove(section_ref01_match_rm0)
  

    // LIST
    const section_ref01_match_rt0: any = {}

    const section_ref01_list_rt0 = (await section_ref01_ent.list(section_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(section_ref01_list_rt0, { id: section_ref01_data.id })))


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
      '../../../../.sdk/test/entity/section/SectionTestData.json')

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
    ['section01','section02','section03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_SECTION_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_SECTION_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_SECTION_ENTID']
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
  
