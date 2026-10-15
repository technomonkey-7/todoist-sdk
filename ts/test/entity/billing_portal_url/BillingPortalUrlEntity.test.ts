

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


describe('BillingPortalUrlEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.BillingPortalUrl()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BillingPortalUrl().create({"billing_portal_url":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing_portal_url.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"billing_portal_url":{"a":true,"h":"Billing Portal Url","n":"billing_portal_url","r":true,"t":"`$STRING`","key$":"billing_portal_url","index$":0},"reason_description":{"a":true,"h":"Reason Description","n":"reason_description","r":false,"sh":"Human-readable label of the cancellation reason.","t":"`$STRING`","key$":"reason_description","index$":1},"reason_flag":{"a":true,"h":"Reason Flag","n":"reason_flag","r":false,"sh":"Short identifier of the cancellation reason category.","t":"`$STRING`","key$":"reason_flag","index$":2},"reason_text":{"a":true,"h":"Reason Text","n":"reason_text","r":false,"sh":"Free-form feedback from the user about the cancellation.","t":"`$STRING`","key$":"reason_text","index$":3},"return_url":{"a":true,"h":"Return Url","n":"return_url","r":false,"sh":"URL the user is redirected to after completing the flow.","t":"`$STRING`","key$":"return_url","index$":4}},"name":"billing_portal_url","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["reason_description","reason_flag","reason_text","return_url"],"co":{"id":"POST /api/v1/payments/cancel_plan_with_redirect_to_stripe","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/payments/cancel_plan_with_redirect_to_stripe","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"payments"},{"lit":"cancel_plan_with_redirect_to_stripe"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"billing_portal_url","name__orig":"billing_portal_url","Name":"BillingPortalUrl","name_":"billing_portal_url","name-":"billing-portal-url","NAME":"BILLING_PORTAL_URL","index$":6}, {"active":true,"entity":"billing_portal_url","key$":"BasicBillingPortalUrlFlow","kind":"basic","name":"BasicBillingPortalUrlFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"billing_portal_url_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BillingPortalUrl', {"POST /api/v1/payments/cancel_plan_with_redirect_to_stripe":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"reason_flag":{"type":"string","title":"Reason Flag","description":"Short identifier of the cancellation reason category.","default":"","examples":["too_expensive"],"key$":"reason_flag"},"reason_description":{"type":"string","title":"Reason Description","description":"Human-readable label of the cancellation reason.","default":"","examples":["It's too expensive for me"],"key$":"reason_description"},"reason_text":{"type":"string","title":"Reason Text","description":"Free-form feedback from the user about the cancellation.","default":"","examples":["I no longer use it daily."],"key$":"reason_text"},"return_url":{"type":"string","title":"Return Url","description":"URL the user is redirected to after completing the flow.","default":"","examples":["https://todoist.com/app/settings/subscription"],"key$":"return_url"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_e4b32da9","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const billing_portal_url_ref01_ent = client.BillingPortalUrl()
    let billing_portal_url_ref01_data = setup.data.new.billing_portal_url['billing_portal_url_ref01']

    billing_portal_url_ref01_data = (await billing_portal_url_ref01_ent.create(billing_portal_url_ref01_data)).data()
    assert(null != billing_portal_url_ref01_data)


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
      '../../../../.sdk/test/entity/billing_portal_url/BillingPortalUrlTestData.json')

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
    ['billing_portal_url01','billing_portal_url02','billing_portal_url03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_BILLING_PORTAL_URL_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_BILLING_PORTAL_URL_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_BILLING_PORTAL_URL_ENTID']
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
  
