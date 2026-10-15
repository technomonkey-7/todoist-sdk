

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


describe('SharedLabelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.SharedLabel()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('shared_label hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).SharedLabel().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).SharedLabel()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.SharedLabel().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().SharedLabel().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.SharedLabel().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.SharedLabel().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SharedLabel().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'shared_label.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Current shared label name to rename.","t":"`$STRING`","key$":"name","index$":0},"new_name":{"a":true,"h":"New Name","n":"new_name","r":true,"sh":"New shared label name to apply to matching tasks.","t":"`$STRING`","key$":"new_name","index$":1},"next_cursor":{"a":true,"h":"Next Cursor","n":"next_cursor","r":true,"sh":"Cursor for the next page of results, or `null` when there are no more results.","t":"`$ANY`","key$":"next_cursor","index$":2},"results":{"a":true,"h":"Results","n":"results","r":true,"sh":"Objects in the current page of results.","t":"`$ARRAY`","key$":"results","index$":3}},"name":"shared_label","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/labels/shared","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":false,"k":"query","n":"omit_personal","or":"omit_personal","r":false,"t":"`$BOOLEAN`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/labels/shared","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"lit":"shared"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"bf":["name"],"co":{"id":"POST /api/v1/labels/shared/remove","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/labels/shared/remove","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"lit":"shared"},{"lit":"remove"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["name","new_name"],"co":{"id":"POST /api/v1/labels/shared/rename","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/labels/shared/rename","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"lit":"shared"},{"lit":"rename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"shared_label","name__orig":"shared_label","Name":"SharedLabel","name_":"shared_label","name-":"shared-label","NAME":"SHARED_LABEL","index$":31}, {"active":true,"entity":"shared_label","key$":"BasicSharedLabelFlow","kind":"basic","name":"BasicSharedLabelFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"shared_label_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"shared_label_ref01","srcdatavar":"shared_label_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-shared_label_ref01"}}],"v":[],"index$":1}]}, 'SharedLabel', {"GET /api/v1/labels/shared":{"protocol":"http","parameters":[{"name":"omit_personal","in":"query","required":false,"schema":{"type":"boolean","description":"Whether to exclude the user's personal labels from the shared label names.","examples":[false],"default":false,"title":"Omit Personal"},"index$":0},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":2}]},"POST /api/v1/labels/shared/remove":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","title":"Name","description":"Shared label name to remove from matching tasks.","examples":["waiting"]}},"type":"object","required":["name"],"title":"Body","x-ref":"#/components/schemas/Body_0680de45"}}},"required":true},"parameters":[]},"POST /api/v1/labels/shared/rename":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","title":"Name","description":"Current shared label name to rename.","examples":["waiting"],"key$":"name"},"new_name":{"type":"string","title":"New Name","description":"New shared label name to apply to matching tasks.","examples":["follow-up"],"key$":"new_name"}},"type":"object","required":["name","new_name"],"title":"Body","x-ref":"#/components/schemas/Body_6ec83bd4","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let shared_label_ref01_data = Object.values(setup.data.existing.shared_label)[0] as any

    // LIST
    const shared_label_ref01_ent = client.SharedLabel()
    const shared_label_ref01_match: any = {}

    const shared_label_ref01_list = (await shared_label_ref01_ent.list(shared_label_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const shared_label_ref01_data_up0: any = {}

    const shared_label_ref01_markdef_up0 = { name: 'name', value: 'Mark01-shared_label_ref01_' + setup.now }
    ;(shared_label_ref01_data_up0 as any)[shared_label_ref01_markdef_up0.name] = shared_label_ref01_markdef_up0.value

    const shared_label_ref01_resdata_up0 = (await shared_label_ref01_ent.update(shared_label_ref01_data_up0)).data()
    assert(null != shared_label_ref01_resdata_up0)

    assert((shared_label_ref01_resdata_up0 as any)[shared_label_ref01_markdef_up0.name] === shared_label_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/shared_label/SharedLabelTestData.json')

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
    ['shared_label01','shared_label02','shared_label03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_SHARED_LABEL_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_SHARED_LABEL_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_SHARED_LABEL_ENTID']
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
  
