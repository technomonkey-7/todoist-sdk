

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


describe('SubscriptionInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.SubscriptionInfo()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SubscriptionInfo().create({"activation_method":1,"billing_portal_switch_to_annual_url":"x","billing_portal_url":"x","expiration_date":"x","has_billing_portal":true,"has_billing_portal_switch_to_annual":true,"has_switch_legacy_to_current":true,"invoice_credit_balance":"x","plan":"x","plan_price":"x","status":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'subscription_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activation_method":{"a":true,"h":"Activation Method","n":"activation_method","r":true,"sh":"How the active subscription was purchased.","t":"`$STRING`","key$":"activation_method","index$":0},"billing_portal_switch_to_annual_url":{"a":true,"h":"Billing Portal Switch To Annual Url","n":"billing_portal_switch_to_annual_url","r":true,"sh":"One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible.","t":"`$ANY`","key$":"billing_portal_switch_to_annual_url","index$":1},"billing_portal_url":{"a":true,"h":"Billing Portal Url","n":"billing_portal_url","r":true,"sh":"One-time URL to the Stripe customer portal, if available.","t":"`$ANY`","key$":"billing_portal_url","index$":2},"expiration_date":{"a":true,"h":"Expiration Date","n":"expiration_date","r":true,"sh":"Date the current paid period ends, in `YYYY-MM-DD` format.","t":"`$ANY`","key$":"expiration_date","index$":3},"has_billing_portal":{"a":true,"h":"Has Billing Portal","n":"has_billing_portal","r":true,"sh":"`true` when the user has a Stripe customer with a portal session.","t":"`$BOOLEAN`","key$":"has_billing_portal","index$":4},"has_billing_portal_switch_to_annual":{"a":true,"h":"Has Billing Portal Switch To Annual","n":"has_billing_portal_switch_to_annual","r":true,"sh":"`true` when a switch-to-annual flow is available in Stripe.","t":"`$BOOLEAN`","key$":"has_billing_portal_switch_to_annual","index$":5},"has_switch_legacy_to_current":{"a":true,"h":"Has Switch Legacy To Current","n":"has_switch_legacy_to_current","r":true,"sh":"`true` when the user is eligible to switch from a legacy Pro price to the current one.","t":"`$BOOLEAN`","key$":"has_switch_legacy_to_current","index$":6},"invoice_credit_balance":{"a":true,"h":"Invoice Credit Balance","n":"invoice_credit_balance","r":true,"sh":"Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g.","t":"`$ANY`","key$":"invoice_credit_balance","index$":7},"plan":{"a":true,"h":"Plan","n":"plan","r":true,"sh":"Plan tier the user is currently on.","t":"`$STRING`","key$":"plan","index$":8},"plan_price":{"a":true,"h":"Plan Price","n":"plan_price","r":true,"sh":"Price of the active plan, when known.","t":"`$ANY`","key$":"plan_price","index$":9},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Current subscription status.","t":"`$STRING`","key$":"status","index$":10}},"name":"subscription_info","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/payments/get_subscription_info","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/payments/get_subscription_info","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"payments"},{"lit":"get_subscription_info"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/v1/payments/reactivate_plan","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/payments/reactivate_plan","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"payments"},{"lit":"reactivate_plan"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"subscription_info","name__orig":"subscription_info","Name":"SubscriptionInfo","name_":"subscription_info","name-":"subscription-info","NAME":"SUBSCRIPTION_INFO","index$":41}, {"active":true,"entity":"subscription_info","key$":"BasicSubscriptionInfoFlow","kind":"basic","name":"BasicSubscriptionInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"subscription_info_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'SubscriptionInfo', {"POST /api/v1/payments/get_subscription_info":{"protocol":"http","parameters":[]},"POST /api/v1/payments/reactivate_plan":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const subscription_info_ref01_ent = client.SubscriptionInfo()
    let subscription_info_ref01_data = setup.data.new.subscription_info['subscription_info_ref01']

    subscription_info_ref01_data = (await subscription_info_ref01_ent.create(subscription_info_ref01_data)).data()
    assert(null != subscription_info_ref01_data)


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
      '../../../../.sdk/test/entity/subscription_info/SubscriptionInfoTestData.json')

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
    ['subscription_info01','subscription_info02','subscription_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_SUBSCRIPTION_INFO_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_SUBSCRIPTION_INFO_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_SUBSCRIPTION_INFO_ENTID']
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
  
