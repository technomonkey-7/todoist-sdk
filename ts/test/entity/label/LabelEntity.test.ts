

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


describe('LabelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.Label()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('label hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).Label().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).Label()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Label().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().Label().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Label().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Label().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Label().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'label.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"color":{"a":true,"h":"Color","n":"color","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Label color name.","t":"`$STRING`","key$":"color","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the label.","t":"`$STRING`","key$":"id","index$":1},"is_favorite":{"a":true,"h":"Is Favorite","n":"is_favorite","op":{"create":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"Whether the label is marked as a favorite.","t":"`$BOOLEAN`","key$":"is_favorite","index$":2},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Label name.","t":"`$STRING`","key$":"name","index$":3},"new_name":{"a":true,"h":"New Name","n":"new_name","r":true,"sh":"New shared label name to apply to matching tasks.","t":"`$STRING`","key$":"new_name","index$":4},"order":{"a":true,"h":"Order","n":"order","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Position of the label in the label list, or `null` when no explicit order is set.","t":"`$ANY`","key$":"order","index$":5}},"id":{"field":"id","name":"id"},"name":"label","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["color","is_favorite","name","order"],"co":{"id":"POST /api/v1/labels/{label_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"label_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/labels/{label_id}","q":{"exist":["id"]},"r":{"param":{"label_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["color","is_favorite","name","order"],"co":{"id":"POST /api/v1/labels","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/labels","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["name"],"co":{"id":"POST /api/v1/labels/shared/remove","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/labels/shared/remove","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"lit":"shared"},{"lit":"remove"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["name","new_name"],"co":{"id":"POST /api/v1/labels/shared/rename","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/labels/shared/rename","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"lit":"shared"},{"lit":"rename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/labels","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/labels","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/labels/{label_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"label_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/labels/{label_id}","q":{"exist":["id"]},"r":{"param":{"label_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/labels/{label_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"label_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/labels/{label_id}","q":{"exist":["id"]},"r":{"param":{"label_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"labels"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"label","name__orig":"label","Name":"Label","name_":"label","name-":"label","NAME":"LABEL","index$":19}, {"active":true,"entity":"label","key$":"BasicLabelFlow","kind":"basic","name":"BasicLabelFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"label_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"label_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"label_ref01","srcdatavar":"label_ref01_data","suffix":"_dt0"},"m":{"id":"label01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-label_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"label_ref01","suffix":"_rm0"},"m":{"id":"label01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"label_ref01"}}],"index$":4}]}, 'Label', {"POST /api/v1/labels/{label_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"anyOf":[{"type":"string","maxLength":128,"minLength":1},{"type":"null"}],"title":"Name","description":"Updated label name. Passing null or omitting this field will leave it unchanged.","examples":["Priority"],"key$":"name"},"order":{"anyOf":[{"type":"integer","maximum":32767,"minimum":-32768},{"type":"null"}],"title":"Order","description":"Position of the label in the label list. Passing null or omitting this field will leave it unchanged.","examples":[12],"key$":"order"},"color":{"anyOf":[{"anyOf":[{},{}],"examples":["charcoal"],"x-ref":"#/components/schemas/APIColorID"},{"type":"null"}],"description":"Label color. Passing null or omitting this field will leave it unchanged.","examples":["berry_red"],"key$":"color"},"is_favorite":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Is Favorite","description":"Whether the label is marked as a favorite. Passing null or omitting this field will leave it unchanged.","examples":[true],"key$":"is_favorite"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_9c41452d","index$":1}}}},"parameters":[{"name":"label_id","in":"path","required":true,"schema":{"type":"integer","description":"String ID of the label","examples":["2147509004"],"title":"Label Id"},"index$":0}]},"POST /api/v1/labels":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","maxLength":128,"minLength":1,"title":"Name","description":"Name of the new label.","examples":["Priority"],"key$":"name"},"order":{"anyOf":[{"type":"integer","maximum":32767,"minimum":-32768},{"type":"null"}],"title":"Order","description":"Position of the new label in the label list","examples":[12],"key$":"order"},"color":{"anyOf":[{"type":"string","enum":["berry_red","red","orange","yellow","olive_green","lime_green","green","mint_green","teal","sky_blue","light_blue","blue","grape","violet","lavender","magenta","salmon","charcoal","grey","taupe"]},{"type":"integer","enum":[30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]}],"examples":["berry_red"],"description":"Label color.","default":"charcoal","x-ref":"#/components/schemas/APIColorID","key$":"color"},"is_favorite":{"type":"boolean","title":"Is Favorite","description":"Whether the label is marked as a favorite.","default":false,"examples":[false],"key$":"is_favorite"}},"type":"object","required":["name"],"title":"Body","x-ref":"#/components/schemas/Body_38bb43e2","index$":1}}}},"parameters":[]},"POST /api/v1/labels/shared/remove":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","title":"Name","description":"Shared label name to remove from matching tasks.","examples":["waiting"],"key$":"name"}},"type":"object","required":["name"],"title":"Body","x-ref":"#/components/schemas/Body_0680de45","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/labels/shared/rename":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","title":"Name","description":"Current shared label name to rename.","examples":["waiting"],"key$":"name"},"new_name":{"type":"string","title":"New Name","description":"New shared label name to apply to matching tasks.","examples":["follow-up"],"key$":"new_name"}},"type":"object","required":["name","new_name"],"title":"Body","x-ref":"#/components/schemas/Body_6ec83bd4","index$":1}}},"required":true},"parameters":[]},"GET /api/v1/labels":{"protocol":"http","parameters":[{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":1}]},"GET /api/v1/labels/{label_id}":{"protocol":"http","parameters":[{"name":"label_id","in":"path","required":true,"schema":{"type":"integer","description":"String ID of the label","examples":["2147509004"],"title":"Label Id"},"index$":0}]},"DELETE /api/v1/labels/{label_id}":{"protocol":"http","parameters":[{"name":"label_id","in":"path","required":true,"schema":{"type":"integer","description":"String ID of the label","examples":["2147509004"],"title":"Label Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const label_ref01_ent = client.Label()
    let label_ref01_data = setup.data.new.label['label_ref01']

    label_ref01_data = (await label_ref01_ent.create(label_ref01_data)).data()
    assert(null != label_ref01_data.id)


    // LIST
    const label_ref01_match: any = {}

    const label_ref01_list = (await label_ref01_ent.list(label_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(label_ref01_list, { id: label_ref01_data.id })))


    // LOAD
    const label_ref01_match_dt0: any = {}
    label_ref01_match_dt0.id = label_ref01_data.id
    const label_ref01_data_dt0 = (await label_ref01_ent.load(label_ref01_match_dt0)).data()
    assert(label_ref01_data_dt0.id === label_ref01_data.id)


    // REMOVE
    const label_ref01_match_rm0: any = { id: label_ref01_data.id }
    await label_ref01_ent.remove(label_ref01_match_rm0)
  

    // LIST
    const label_ref01_match_rt0: any = {}

    const label_ref01_list_rt0 = (await label_ref01_ent.list(label_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(label_ref01_list_rt0, { id: label_ref01_data.id })))


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
      '../../../../.sdk/test/entity/label/LabelTestData.json')

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
    ['label01','label02','label03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_LABEL_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_LABEL_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_LABEL_ENTID']
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
  
