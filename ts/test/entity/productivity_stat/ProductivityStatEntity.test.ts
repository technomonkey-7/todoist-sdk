

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


describe('ProductivityStatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.ProductivityStat()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('productivity_stat hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).ProductivityStat().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).ProductivityStat()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ProductivityStat().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().ProductivityStat().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ProductivityStat().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ProductivityStat().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProductivityStat().list({"completed_count":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'productivity_stat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed_count":{"a":true,"h":"Completed Count","n":"completed_count","r":true,"sh":"Total number of tasks completed by the user (all time)","t":"`$INTEGER`","key$":"completed_count","index$":0},"days_items":{"a":true,"h":"Days Items","n":"days_items","r":true,"sh":"Daily completion statistics for the last 7 days, ordered chronologically","t":"`$ARRAY`","key$":"days_items","index$":1},"goals":{"a":true,"h":"Goals","n":"goals","r":true,"sh":"User goals, streaks, and productivity settings","t":"`$OBJECT`","key$":"goals","index$":2},"karma":{"a":true,"h":"Karma","n":"karma","r":true,"sh":"Current karma score","t":"`$NUMBER`","key$":"karma","index$":3},"karma_graph_data":{"a":true,"h":"Karma Graph Data","n":"karma_graph_data","r":true,"sh":"Historical karma data points for graphing, each containing date and karma_avg","t":"`$ARRAY`","key$":"karma_graph_data","index$":4},"karma_last_update":{"a":true,"h":"Karma Last Update","n":"karma_last_update","r":true,"sh":"Net karma change from the most recent update (positive_karma + negative_karma)","t":"`$NUMBER`","key$":"karma_last_update","index$":5},"karma_trend":{"a":true,"h":"Karma Trend","n":"karma_trend","r":true,"sh":"Karma trend indicator ('up' or 'down')","t":"`$STRING`","key$":"karma_trend","index$":6},"karma_update_reasons":{"a":true,"h":"Karma Update Reasons","n":"karma_update_reasons","r":true,"sh":"Recent karma update events with reasons and amounts","t":"`$ARRAY`","key$":"karma_update_reasons","index$":7},"project_colors":{"a":true,"h":"Project Colors","n":"project_colors","r":true,"sh":"Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'})","t":"`$OBJECT`","key$":"project_colors","index$":8},"week_items":{"a":true,"h":"Week Items","n":"week_items","r":true,"sh":"Weekly completion statistics for the last 4 weeks, ordered chronologically.","t":"`$ARRAY`","key$":"week_items","index$":9}},"name":"productivity_stat","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/tasks/completed/stats","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/tasks/completed/stats","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tasks"},{"lit":"completed"},{"lit":"stats"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"productivity_stat","name__orig":"productivity_stat","Name":"ProductivityStat","name_":"productivity_stat","name-":"productivity-stat","NAME":"PRODUCTIVITY_STAT","index$":23}, {"active":true,"entity":"productivity_stat","key$":"BasicProductivityStatFlow","kind":"basic","name":"BasicProductivityStatFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"productivity_stat_ref01"}}],"index$":0}]}, 'ProductivityStat', {"GET /api/v1/tasks/completed/stats":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let productivity_stat_ref01_data = Object.values(setup.data.existing.productivity_stat)[0] as any

    // LIST
    const productivity_stat_ref01_ent = client.ProductivityStat()
    const productivity_stat_ref01_match: any = {}

    const productivity_stat_ref01_list = (await productivity_stat_ref01_ent.list(productivity_stat_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/productivity_stat/ProductivityStatTestData.json')

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
    ['productivity_stat01','productivity_stat02','productivity_stat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_PRODUCTIVITY_STAT_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_PRODUCTIVITY_STAT_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_PRODUCTIVITY_STAT_ENTID']
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
  
