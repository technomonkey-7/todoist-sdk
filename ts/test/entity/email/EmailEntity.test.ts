

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


describe('EmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.Email()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Email().update({"email":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"Email address for the Todoist object.","t":"`$STRING`","key$":"email","index$":0},"obj_id":{"a":true,"h":"Obj Id","n":"obj_id","r":true,"sh":"String ID of the Todoist object.","t":"`$STRING`","key$":"obj_id","index$":1},"obj_type":{"a":true,"h":"Obj Type","n":"obj_type","r":true,"sh":"Type of Todoist object to create an email for.","t":"`$STRING`","key$":"obj_type","index$":2}},"name":"email","op":{"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/emails","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"obj_id","or":"obj_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"obj_type","or":"obj_type","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/emails","q":{"exist":["obj_id","obj_type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"emails"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["obj_id","obj_type"],"co":{"id":"PUT /api/v1/emails","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/api/v1/emails","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"emails"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"email","name__orig":"email","Name":"Email","name_":"email","name-":"email","NAME":"EMAIL","index$":7}, {"active":true,"entity":"email","key$":"BasicEmailFlow","kind":"basic","name":"BasicEmailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_ref01","srcdatavar":"email_ref01_data","suffix":"_up0","textfield":"email"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_ref01"}}],"v":[],"index$":0}]}, 'Email', {"DELETE /api/v1/emails":{"protocol":"http","parameters":[{"name":"obj_type","in":"query","required":true,"schema":{"type":"string","enum":["project","project_comments","task","item"],"title":"EmailObjectType","x-enumDescriptions":{"item":"Deprecated alias of `task`","project":"Project","project_comments":"Project Comments","task":"Task"},"description":"Type of Todoist object whose email should be disabled.","examples":["project","project_comments","task"],"x-ref":"#/components/schemas/EmailObjectType"},"index$":0},{"name":"obj_id","in":"query","required":true,"schema":{"type":"string","description":"String ID of the Todoist object.","examples":["6XGgm6PHrGgMpCFX"],"title":"Obj Id"},"index$":1}]},"PUT /api/v1/emails":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"obj_type":{"type":"string","enum":["project","project_comments","task","item"],"title":"EmailObjectType","x-enumDescriptions":{"item":"Deprecated alias of `task`","project":"Project","project_comments":"Project Comments","task":"Task"},"description":"Type of Todoist object to create an email for.","examples":["project","project_comments","task"],"x-ref":"#/components/schemas/EmailObjectType","key$":"obj_type"},"obj_id":{"type":"string","title":"Obj Id","description":"String ID of the Todoist object.","examples":["6XGgm6PHrGgMpCFX"],"key$":"obj_id"}},"type":"object","required":["obj_type","obj_id"],"title":"Body","x-ref":"#/components/schemas/Body_0dc72dfd","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_ref01_data = Object.values(setup.data.existing.email)[0] as any

    // UPDATE
    const email_ref01_ent = client.Email()
    const email_ref01_data_up0: any = {}

    const email_ref01_markdef_up0 = { name: 'email', value: 'Mark01-email_ref01_' + setup.now }
    ;(email_ref01_data_up0 as any)[email_ref01_markdef_up0.name] = email_ref01_markdef_up0.value

    const email_ref01_resdata_up0 = (await email_ref01_ent.update(email_ref01_data_up0)).data()
    assert(null != email_ref01_resdata_up0)

    assert((email_ref01_resdata_up0 as any)[email_ref01_markdef_up0.name] === email_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/email/EmailTestData.json')

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
    ['email01','email02','email03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_EMAIL_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_EMAIL_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_EMAIL_ENTID']
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
  
