

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


describe('NotificationSyncViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.NotificationSyncView()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('notification_sync_view hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).NotificationSyncView().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).NotificationSyncView()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.NotificationSyncView().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().NotificationSyncView().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.NotificationSyncView().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.NotificationSyncView().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NotificationSyncView().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'notification_sync_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"due":{"a":true,"h":"Due","n":"due","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Datetime when the reminder fires, or `null` if unset.","t":"`$ANY`","key$":"due","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the reminder.","t":"`$STRING`","key$":"id","index$":1},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":true,"sh":"Whether the reminder is deleted.","t":"`$BOOLEAN`","key$":"is_deleted","index$":2},"is_urgent":{"a":true,"h":"Is Urgent","n":"is_urgent","op":{"create":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"Whether the reminder should be delivered urgently.","t":"`$BOOLEAN`","key$":"is_urgent","index$":3},"item_id":{"a":true,"h":"Item Id","n":"item_id","r":true,"sh":"String ID of the task that owns the reminder.","t":"`$STRING`","key$":"item_id","index$":4},"minute_offset":{"a":true,"h":"Minute Offset","n":"minute_offset","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Minutes before the task due time for relative reminders.","t":"`$ANY`","key$":"minute_offset","index$":5},"notify_uid":{"a":true,"h":"Notify Uid","n":"notify_uid","r":true,"sh":"String ID of the user who receives the reminder.","t":"`$STRING`","key$":"notify_uid","index$":6},"reminder_type":{"a":true,"h":"Reminder Type","n":"reminder_type","r":false,"sh":"Type of the reminder: 'relative' or 'absolute'","t":"`$STRING`","key$":"reminder_type","index$":7},"service":{"a":true,"h":"Service","n":"service","r":false,"sh":"Notification service type: 'email', 'push'.","t":"`$STRING`","key$":"service","index$":8},"task_id":{"a":true,"h":"Task Id","n":"task_id","r":true,"sh":"String ID of the task","t":"`$STRING`","key$":"task_id","index$":9},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"Reminder type.","t":"`$STRING`","key$":"type","index$":10}},"id":{"field":"id","name":"id"},"name":"notification_sync_view","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["due","is_urgent","minute_offset","service"],"co":{"id":"POST /api/v1/reminders/{reminder_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"reminder_id","or":"reminder_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/reminders/{reminder_id}","q":{"exist":["reminder_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"reminders"},{"var":"reminder_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["due","is_urgent","minute_offset","reminder_type","service","task_id"],"co":{"id":"POST /api/v1/reminders","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/reminders","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"reminders"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/reminders","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"task_id","or":"task_id","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/reminders","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"reminders"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/reminders/{reminder_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"reminder_id","or":"reminder_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/reminders/{reminder_id}","q":{"exist":["reminder_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"reminders"},{"var":"reminder_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.reminder"]]},"key$":"notification_sync_view","name__orig":"notification_sync_view","Name":"NotificationSyncView","name_":"notification_sync_view","name-":"notification-sync-view","NAME":"NOTIFICATION_SYNC_VIEW","index$":21}, {"active":true,"entity":"notification_sync_view","key$":"BasicNotificationSyncViewFlow","kind":"basic","name":"BasicNotificationSyncViewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"notification_sync_view_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"notification_sync_view_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"notification_sync_view_ref01","srcdatavar":"notification_sync_view_ref01_data","suffix":"_dt0"},"m":{"id":"notification_sync_view01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-notification_sync_view_ref01"}}],"unreachable":true}]}, 'NotificationSyncView', {"POST /api/v1/reminders/{reminder_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"minute_offset":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Minute Offset","description":"Minutes before due time to trigger (for relative reminders).","examples":[30],"key$":"minute_offset"},"due":{"anyOf":[{"properties":{"date":{},"string":{},"lang":{},"timezone":{},"is_recurring":{}},"type":"object","title":"ReminderDueAttribute","description":"Due date input for absolute reminders.","x-ref":"#/components/schemas/ReminderDueAttribute"},{"type":"null"}],"description":"Due date dictionary for absolute reminders.","examples":[{"date":"2025-02-12T09:00:00","lang":"en","timezone":"Europe/Madrid"}],"key$":"due"},"service":{"type":"string","enum":["email","push"],"title":"Service","description":"Notification service type: 'email', 'push'.","examples":["email"],"x-ref":"#/components/schemas/ReminderServiceType","key$":"service"},"is_urgent":{"type":"boolean","description":"Whether the reminder is an urgent reminder. Urgent reminders trigger an alarm notification on the user's designated urgent reminder device. Omit this field to keep it unchanged.","examples":[false],"x-ref":"#/components/schemas/UpdateReminderIsUrgentAttribute","key$":"is_urgent"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_0d5e560b","index$":1}}}},"parameters":[{"name":"reminder_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the reminder","examples":["6XGgmFQrx44wfGHr"],"title":"Reminder Id"},"index$":0}]},"POST /api/v1/reminders":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"task_id":{"type":"string","description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"x-ref":"#/components/schemas/ReminderTaskIDAttribute","key$":"task_id"},"reminder_type":{"type":"string","enum":["relative","absolute"],"title":"Reminder Type","description":"Type of the reminder: 'relative' or 'absolute'","default":"relative","examples":["relative"],"key$":"reminder_type"},"minute_offset":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Minute Offset","description":"Minutes before due time to trigger (for relative reminders)","examples":[30],"key$":"minute_offset"},"due":{"anyOf":[{"properties":{"date":{},"string":{},"lang":{},"timezone":{},"is_recurring":{}},"type":"object","title":"ReminderDueAttribute","description":"Due date input for absolute reminders.","x-ref":"#/components/schemas/ReminderDueAttribute"},{"type":"null"}],"description":"Due date dictionary for absolute reminders.","examples":[{"date":"2025-02-12T09:00:00","lang":"en","timezone":"Europe/Madrid"}],"key$":"due"},"service":{"type":"string","enum":["email","push"],"description":"Notification service type: 'email', 'push'.","examples":["email"],"title":"Service","x-ref":"#/components/schemas/ReminderServiceTypeAttribute","key$":"service"},"is_urgent":{"type":"boolean","description":"Whether the reminder is an urgent reminder. Urgent reminders trigger an alarm notification on the user's designated urgent reminder device.","examples":[false],"default":false,"x-ref":"#/components/schemas/ReminderIsUrgentAttribute","key$":"is_urgent"}},"type":"object","required":["task_id"],"title":"Body","x-ref":"#/components/schemas/Body_958e83bd","index$":1}}}},"parameters":[]},"GET /api/v1/reminders":{"protocol":"http","parameters":[{"name":"task_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"title":"Task Id"},"index$":0},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":2}]},"GET /api/v1/reminders/{reminder_id}":{"protocol":"http","parameters":[{"name":"reminder_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the reminder","examples":["6XGgmFQrx44wfGHr"],"title":"Reminder Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const notification_sync_view_ref01_ent = client.NotificationSyncView()
    let notification_sync_view_ref01_data = setup.data.new.notification_sync_view['notification_sync_view_ref01']

    notification_sync_view_ref01_data = (await notification_sync_view_ref01_ent.create(notification_sync_view_ref01_data)).data()
    assert(null != notification_sync_view_ref01_data.id)


    // LIST
    const notification_sync_view_ref01_match: any = {}

    const notification_sync_view_ref01_list = (await notification_sync_view_ref01_ent.list(notification_sync_view_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(notification_sync_view_ref01_list, { id: notification_sync_view_ref01_data.id })))


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
      '../../../../.sdk/test/entity/notification_sync_view/NotificationSyncViewTestData.json')

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
    ['notification_sync_view01','notification_sync_view02','notification_sync_view03','reminder01','reminder02','reminder03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_NOTIFICATION_SYNC_VIEW_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_NOTIFICATION_SYNC_VIEW_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_NOTIFICATION_SYNC_VIEW_ENTID']
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
  
