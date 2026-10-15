

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


describe('UsageSummaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.UsageSummary()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('usage_summary hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).UsageSummary().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).UsageSummary()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.UsageSummary().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().UsageSummary().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.UsageSummary().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.UsageSummary().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.UsageSummary().list({"product":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'usage_summary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"automation_id":{"a":true,"h":"Automation Id","n":"automation_id","r":true,"sh":"The automation this usage belongs to.","t":"`$STRING`","key$":"automation_id","index$":0},"charged_amount":{"a":true,"h":"Charged Amount","n":"charged_amount","r":true,"sh":"`charged_units` in money, in microdollars.","t":"`$INTEGER`","key$":"charged_amount","index$":1},"charged_units":{"a":true,"h":"Charged Units","n":"charged_units","r":true,"sh":"Units the group took off the balance, as a positive number.","t":"`$INTEGER`","key$":"charged_units","index$":2},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"The label of the newest usage in the group, so a renamed automation shows its current name.","t":"`$STRING`","key$":"description","index$":3},"usage_count":{"a":true,"h":"Usage Count","n":"usage_count","r":true,"sh":"How many usage events settled in the group.","t":"`$INTEGER`","key$":"usage_count","index$":4}},"name":"usage_summary","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/usage_billing/usage_summary","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"group_by","or":"group_by","r":false,"t":"`$ANY`","index$":1},{"a":true,"ex":"automations","k":"query","n":"product","or":"product","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"since","or":"since","r":false,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"until","or":"until","r":false,"t":"`$ANY`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/usage_billing/usage_summary","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"usage_billing"},{"lit":"usage_summary"}],"t":{"req":"`reqdata`","res":"`body.groups`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"usage_summary","name__orig":"usage_summary","Name":"UsageSummary","name_":"usage_summary","name-":"usage-summary","NAME":"USAGE_SUMMARY","index$":28}, {"active":true,"entity":"usage_summary","key$":"BasicUsageSummaryFlow","kind":"basic","name":"BasicUsageSummaryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"usage_summary_ref01"}}],"index$":0}]}, 'UsageSummary', {"GET /api/v1/usage_billing/usage_summary":{"protocol":"http","parameters":[{"name":"product","in":"query","required":false,"schema":{"type":"string","description":"Product whose usage to total.","examples":["automations"],"default":"automations","title":"Product"},"index$":0},{"name":"category","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"Count one kind of work only, for example `automation_run`. More than one kind settles against the same balance, so a per-run average over all of them mixes runs with chat messages. Omit to total every category.","examples":["automation_run"],"title":"Category"},"index$":1},{"name":"since","in":"query","required":false,"schema":{"anyOf":[{"type":"string","format":"date-time"},{"type":"null"}],"description":"Start of the window, inclusive. Omit to start at the account's first event. A value with no offset is read as UTC, which is what `created_at` in `/history` reports.","examples":["2026-07-15T00:00:00Z"],"title":"Since"},"index$":2},{"name":"until","in":"query","required":false,"schema":{"anyOf":[{"type":"string","format":"date-time"},{"type":"null"}],"description":"End of the window, exclusive. Omit to run to now. A value with no offset is read as UTC.","examples":["2026-08-15T00:00:00Z"],"title":"Until"},"index$":3},{"name":"group_by","in":"query","required":false,"schema":{"anyOf":[{"const":"automation","type":"string"},{"type":"null"}],"description":"Split the total by the automation that ran, in `groups`. Send `category=automation_run` with it: chat messages carry no automation, so without the filter each chat label becomes a group of its own.","examples":["automation"],"title":"Group By"},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let usage_summary_ref01_data = Object.values(setup.data.existing.usage_summary)[0] as any

    // LIST
    const usage_summary_ref01_ent = client.UsageSummary()
    const usage_summary_ref01_match: any = {}

    const usage_summary_ref01_list = (await usage_summary_ref01_ent.list(usage_summary_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/usage_summary/UsageSummaryTestData.json')

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
    ['usage_summary01','usage_summary02','usage_summary03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_USAGE_SUMMARY_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_USAGE_SUMMARY_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_USAGE_SUMMARY_ENTID']
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
  
