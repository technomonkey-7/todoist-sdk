

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


describe('TopUpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.TopUp()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.TopUp().create({"amount":"x","checkout_url":"x","currency":"x","return_url":"x","session_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'top_up.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":true,"sh":"Amount to buy, in the currency's minor unit (1000 = $10.00).","t":"`$INTEGER`","key$":"amount","index$":0},"checkout_url":{"a":true,"h":"Checkout Url","n":"checkout_url","r":true,"sh":"Hosted Stripe Checkout URL to redirect the user to for payment.","t":"`$STRING`","key$":"checkout_url","index$":1},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"sh":"ISO currency code.","t":"`$STRING`","key$":"currency","index$":2},"return_url":{"a":true,"h":"Return Url","n":"return_url","r":true,"sh":"URL Checkout returns the user to.","t":"`$STRING`","key$":"return_url","index$":3},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":true,"sh":"The created Stripe Checkout session id.","t":"`$STRING`","key$":"session_id","index$":4}},"name":"top_up","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["amount","currency","return_url"],"co":{"id":"POST /api/v1/usage_billing/top_up","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/usage_billing/top_up","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"usage_billing"},{"lit":"top_up"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"top_up","name__orig":"top_up","Name":"TopUp","name_":"top_up","name-":"top-up","NAME":"TOP_UP","index$":26}, {"active":true,"entity":"top_up","key$":"BasicTopUpFlow","kind":"basic","name":"BasicTopUpFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"top_up_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'TopUp', {"POST /api/v1/usage_billing/top_up":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"amount":{"type":"integer","title":"Amount","description":"Amount to buy, in the currency's minor unit (1000 = $10.00).","examples":[1000],"key$":"amount"},"currency":{"type":"string","title":"Currency","description":"ISO currency code.","examples":["usd"],"key$":"currency"},"return_url":{"type":"string","title":"Return Url","description":"URL Checkout returns the user to.","examples":["https://todoist.com/app/settings/automations"],"key$":"return_url"}},"type":"object","required":["amount","currency","return_url"],"title":"Body","x-ref":"#/components/schemas/Body_b48755ce","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const top_up_ref01_ent = client.TopUp()
    let top_up_ref01_data = setup.data.new.top_up['top_up_ref01']

    top_up_ref01_data = (await top_up_ref01_ent.create(top_up_ref01_data)).data()
    assert(null != top_up_ref01_data)


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
      '../../../../.sdk/test/entity/top_up/TopUpTestData.json')

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
    ['top_up01','top_up02','top_up03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_TOP_UP_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_TOP_UP_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_TOP_UP_ENTID']
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
  
