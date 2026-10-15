

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


describe('LocationReminderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.LocationReminder()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('location_reminder hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).LocationReminder().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).LocationReminder()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LocationReminder().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().LocationReminder().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LocationReminder().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LocationReminder().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LocationReminder().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'location_reminder.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the location reminder","t":"`$STRING`","key$":"id","index$":0},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":true,"sh":"Whether the location reminder is deleted","t":"`$BOOLEAN`","key$":"is_deleted","index$":1},"item_id":{"a":true,"h":"Item Id","n":"item_id","r":true,"sh":"String ID of the task","t":"`$STRING`","key$":"item_id","index$":2},"loc_lat":{"a":true,"h":"Loc Lat","n":"loc_lat","op":{"update":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Latitude of the location","t":"`$STRING`","key$":"loc_lat","index$":3},"loc_long":{"a":true,"h":"Loc Long","n":"loc_long","op":{"update":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Longitude of the location","t":"`$STRING`","key$":"loc_long","index$":4},"loc_trigger":{"a":true,"h":"Loc Trigger","n":"loc_trigger","op":{"update":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Trigger type for the location reminder","t":"`$STRING`","key$":"loc_trigger","index$":5},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Name of the location","t":"`$STRING`","key$":"name","index$":6},"notify_uid":{"a":true,"h":"Notify Uid","n":"notify_uid","r":true,"sh":"String ID of the user who will receive the reminder","t":"`$STRING`","key$":"notify_uid","index$":7},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"String ID of the project containing the task","t":"`$STRING`","key$":"project_id","index$":8},"radius":{"a":true,"h":"Radius","n":"radius","op":{"create":{"req":false,"type":"`$INTEGER`"},"update":{"req":false,"type":"`$NUMBER`"}},"r":true,"sh":"Radius in meters","t":"`$INTEGER`","key$":"radius","index$":9},"task_id":{"a":true,"h":"Task Id","n":"task_id","r":true,"sh":"String ID of the task","t":"`$STRING`","key$":"task_id","index$":10},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The reminder type","t":"`$STRING`","key$":"type","index$":11}},"id":{"field":"id","name":"id"},"name":"location_reminder","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["loc_lat","loc_long","loc_trigger","name","radius","task_id"],"co":{"id":"POST /api/v1/location_reminders","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/location_reminders","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"location_reminders"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/location_reminders","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"task_id","or":"task_id","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/location_reminders","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"location_reminders"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/location_reminders/{reminder_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"reminder_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/location_reminders/{reminder_id}","q":{"exist":["id"]},"r":{"param":{"reminder_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"location_reminders"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/location_reminders/{reminder_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"reminder_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/location_reminders/{reminder_id}","q":{"exist":["id"]},"r":{"param":{"reminder_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"location_reminders"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["loc_lat","loc_long","loc_trigger","name","radius"],"co":{"id":"POST /api/v1/location_reminders/{reminder_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"reminder_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/location_reminders/{reminder_id}","q":{"exist":["id"]},"r":{"param":{"reminder_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"location_reminders"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"location_reminder","name__orig":"location_reminder","Name":"LocationReminder","name_":"location_reminder","name-":"location-reminder","NAME":"LOCATION_REMINDER","index$":13}, {"active":true,"entity":"location_reminder","key$":"BasicLocationReminderFlow","kind":"basic","name":"BasicLocationReminderFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"location_reminder_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"location_reminder_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"location_reminder_ref01","srcdatavar":"location_reminder_ref01_data","suffix":"_up0","textfield":"item_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-location_reminder_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"location_reminder_ref01","srcdatavar":"location_reminder_ref01_data","suffix":"_dt0"},"m":{"id":"location_reminder01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-location_reminder_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"location_reminder_ref01","suffix":"_rm0"},"m":{"id":"location_reminder01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"location_reminder_ref01"}}],"index$":5}]}, 'LocationReminder', {"POST /api/v1/location_reminders":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"task_id":{"type":"string","description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"x-ref":"#/components/schemas/LocationReminderTaskIDAttribute","key$":"task_id"},"name":{"type":"string","maxLength":255,"minLength":1,"title":"Name","description":"Name of the location","examples":["Home"],"key$":"name"},"loc_lat":{"type":"string","maxLength":20,"minLength":1,"title":"Loc Lat","description":"Latitude of the location","examples":["37.7749"],"key$":"loc_lat"},"loc_long":{"type":"string","maxLength":20,"minLength":1,"title":"Loc Long","description":"Longitude of the location","examples":["-122.4194"],"key$":"loc_long"},"loc_trigger":{"type":"string","enum":["on_enter","on_leave"],"title":"Loc Trigger","description":"Trigger type: 'on_enter' or 'on_leave'","examples":["on_enter"],"key$":"loc_trigger"},"radius":{"type":"integer","maximum":255,"minimum":1,"title":"Radius","description":"Radius in meters (default 100, max 255)","default":100,"examples":[100],"key$":"radius"}},"type":"object","required":["task_id","name","loc_lat","loc_long","loc_trigger"],"title":"Body","x-ref":"#/components/schemas/Body_4c96330f","index$":1}}}},"parameters":[]},"GET /api/v1/location_reminders":{"protocol":"http","parameters":[{"name":"task_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"title":"Task Id"},"index$":0},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":2}]},"GET /api/v1/location_reminders/{reminder_id}":{"protocol":"http","parameters":[{"name":"reminder_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the location reminder","examples":["6XGgmFQrx44wfGHr"],"title":"Reminder Id"},"index$":0}]},"DELETE /api/v1/location_reminders/{reminder_id}":{"protocol":"http","parameters":[{"name":"reminder_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the location reminder","examples":["6XGgmFQrx44wfGHr"],"title":"Reminder Id"},"index$":0}]},"POST /api/v1/location_reminders/{reminder_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"anyOf":[{"type":"string","maxLength":255,"minLength":1},{"type":"null"}],"title":"Name","description":"Name of the location. If not provided (or null), the value remains unchanged.","examples":["Office"],"key$":"name"},"loc_lat":{"anyOf":[{"type":"string","maxLength":20,"minLength":1},{"type":"null"}],"title":"Loc Lat","description":"Latitude of the location. If not provided (or null), the value remains unchanged.","examples":["40.416775"],"key$":"loc_lat"},"loc_long":{"anyOf":[{"type":"string","maxLength":20,"minLength":1},{"type":"null"}],"title":"Loc Long","description":"Longitude of the location. If not provided (or null), the value remains unchanged.","examples":["-3.703790"],"key$":"loc_long"},"loc_trigger":{"anyOf":[{"type":"string","enum":["on_enter","on_leave"]},{"type":"null"}],"title":"Loc Trigger","description":"Trigger type: 'on_enter' or 'on_leave'. If not provided (or null), the value remains unchanged.","examples":["on_enter"],"key$":"loc_trigger"},"radius":{"anyOf":[{"type":"integer","maximum":255,"minimum":1},{"type":"null"}],"title":"Radius","description":"Radius in meters. If not provided (or null), the value remains unchanged.","examples":[100],"key$":"radius"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_9c2f879b","index$":1}}}},"parameters":[{"name":"reminder_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the location reminder","examples":["6XGgmFQrx44wfGHr"],"title":"Reminder Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const location_reminder_ref01_ent = client.LocationReminder()
    let location_reminder_ref01_data = setup.data.new.location_reminder['location_reminder_ref01']

    location_reminder_ref01_data = (await location_reminder_ref01_ent.create(location_reminder_ref01_data)).data()
    assert(null != location_reminder_ref01_data.id)


    // LIST
    const location_reminder_ref01_match: any = {}

    const location_reminder_ref01_list = (await location_reminder_ref01_ent.list(location_reminder_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(location_reminder_ref01_list, { id: location_reminder_ref01_data.id })))


    // UPDATE
    const location_reminder_ref01_data_up0: any = {}
    location_reminder_ref01_data_up0.id = location_reminder_ref01_data.id

    const location_reminder_ref01_markdef_up0 = { name: 'item_id', value: 'Mark01-location_reminder_ref01_' + setup.now }
    ;(location_reminder_ref01_data_up0 as any)[location_reminder_ref01_markdef_up0.name] = location_reminder_ref01_markdef_up0.value

    const location_reminder_ref01_resdata_up0 = (await location_reminder_ref01_ent.update(location_reminder_ref01_data_up0)).data()
    assert(location_reminder_ref01_resdata_up0.id === location_reminder_ref01_data_up0.id)

    assert((location_reminder_ref01_resdata_up0 as any)[location_reminder_ref01_markdef_up0.name] === location_reminder_ref01_markdef_up0.value)


    // LOAD
    const location_reminder_ref01_match_dt0: any = {}
    location_reminder_ref01_match_dt0.id = location_reminder_ref01_data.id
    const location_reminder_ref01_data_dt0 = (await location_reminder_ref01_ent.load(location_reminder_ref01_match_dt0)).data()
    assert(location_reminder_ref01_data_dt0.id === location_reminder_ref01_data.id)


    // REMOVE
    const location_reminder_ref01_match_rm0: any = { id: location_reminder_ref01_data.id }
    await location_reminder_ref01_ent.remove(location_reminder_ref01_match_rm0)
  

    // LIST
    const location_reminder_ref01_match_rt0: any = {}

    const location_reminder_ref01_list_rt0 = (await location_reminder_ref01_ent.list(location_reminder_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(location_reminder_ref01_list_rt0, { id: location_reminder_ref01_data.id })))


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
      '../../../../.sdk/test/entity/location_reminder/LocationReminderTestData.json')

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
    ['location_reminder01','location_reminder02','location_reminder03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_LOCATION_REMINDER_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_LOCATION_REMINDER_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_LOCATION_REMINDER_ENTID']
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
  
