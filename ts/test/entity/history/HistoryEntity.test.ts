

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


describe('HistoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.History()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('history hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).History().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).History()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.History().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().History().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.History().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.History().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.History().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'history.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`.","t":"`$STRING`","key$":"category","index$":0},"charged_amount":{"a":true,"h":"Charged Amount","n":"charged_amount","r":true,"sh":"`charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274.","t":"`$ANY`","key$":"charged_amount","index$":1},"charged_units":{"a":true,"h":"Charged Units","n":"charged_units","r":true,"sh":"Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side.","t":"`$ANY`","key$":"charged_units","index$":2},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"sh":"When the entry was written, UTC.","t":"`$STRING`","key$":"created_at","index$":3},"credited_amount":{"a":true,"h":"Credited Amount","n":"credited_amount","r":true,"sh":"`credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00.","t":"`$ANY`","key$":"credited_amount","index$":4},"credited_units":{"a":true,"h":"Credited Units","n":"credited_units","r":true,"sh":"Units added to the balance, as a positive number, or `null` on a debit.","t":"`$ANY`","key$":"credited_units","index$":5},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Human-readable summary of the entry.","t":"`$STRING`","key$":"description","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Ledger entry id.","t":"`$INTEGER`","key$":"id","index$":7},"refs":{"a":true,"h":"Refs","n":"refs","r":false,"sh":"Free-form attribution for the entry.","t":"`$OBJECT`","key$":"refs","index$":8},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`.","t":"`$STRING`","key$":"status","index$":9},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`.","t":"`$STRING`","key$":"type","index$":10}},"id":{"field":"id","name":"id"},"name":"history","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/usage_billing/history","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"automations","k":"query","n":"product","or":"product","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"type","or":"types","r":false,"t":"`$ANY`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/usage_billing/history","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"usage_billing"},{"lit":"history"}],"t":{"req":"`reqdata`","res":"`body.entries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"history","name__orig":"history","Name":"History","name_":"history","name-":"history","NAME":"HISTORY","index$":15}, {"active":true,"entity":"history","key$":"BasicHistoryFlow","kind":"basic","name":"BasicHistoryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"history_ref01"}}],"index$":0}]}, 'History', {"GET /api/v1/usage_billing/history":{"protocol":"http","parameters":[{"name":"product","in":"query","required":false,"schema":{"type":"string","description":"Product whose ledger to read.","examples":["automations"],"default":"automations","title":"Product"},"index$":0},{"name":"types","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"Comma-separated `type` values to return: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry`, or `chargeback`. When omitted, all types are returned. Rejects when an unrecognized name is supplied.","examples":["top_up","top_up,chargeback,expiry,void"],"title":"Types"},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":2},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let history_ref01_data = Object.values(setup.data.existing.history)[0] as any

    // LIST
    const history_ref01_ent = client.History()
    const history_ref01_match: any = {}

    const history_ref01_list = (await history_ref01_ent.list(history_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/history/HistoryTestData.json')

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
    ['history01','history02','history03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_HISTORY_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_HISTORY_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_HISTORY_ENTID']
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
  
