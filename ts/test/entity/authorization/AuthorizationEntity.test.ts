

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


describe('AuthorizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.Authorization()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Authorization().create({"token":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'authorization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"token":{"a":true,"h":"Token","n":"token","r":true,"sh":"The token to be revoked (access token).","t":"`$STRING`","key$":"token","index$":0},"token_type_hint":{"a":true,"h":"Token Type Hint","n":"token_type_hint","r":false,"sh":"A hint about the type of the token being revoked (optional).","t":"`$ANY`","key$":"token_type_hint","index$":1}},"name":"authorization","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["token","token_type_hint"],"co":{"id":"POST /api/v1/revoke","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/revoke","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"revoke"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/access_tokens","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"access_token","or":"access_token","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"client_id","or":"client_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"client_secret","or":"client_secret","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/access_tokens","q":{"exist":["access_token","client_id","client_secret"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"access_tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"authorization","name__orig":"authorization","Name":"Authorization","name_":"authorization","name-":"authorization","NAME":"AUTHORIZATION","index$":4}, {"active":true,"entity":"authorization","key$":"BasicAuthorizationFlow","kind":"basic","name":"BasicAuthorizationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"authorization_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"authorization_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":1}]}, 'Authorization', {"POST /api/v1/revoke":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"token":{"type":"string","title":"Token","description":"The token to be revoked (access token).","examples":["0123456789abcdef0123456789abcdef01234567"],"key$":"token"},"token_type_hint":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Token Type Hint","description":"A hint about the type of the token being revoked (optional). Expected value: 'access_token'","examples":["access_token"],"key$":"token_type_hint"}},"type":"object","required":["token"],"title":"Body","x-ref":"#/components/schemas/Body_8e7e8a3c","index$":1}}},"required":true},"parameters":[]},"DELETE /api/v1/access_tokens":{"protocol":"http","parameters":[{"name":"client_id","in":"query","required":true,"schema":{"type":"string","description":"The unique Client ID of the Todoist application that you registered.","examples":["0123456789abcdef"],"title":"Client Id"},"index$":0},{"name":"client_secret","in":"query","required":true,"schema":{"type":"string","description":"The unique Client Secret of the Todoist application that you registered.","examples":["abcdef0123456789abcdef0123456789"],"title":"Client Secret"},"index$":1},{"name":"access_token","in":"query","required":true,"schema":{"type":"string","description":"Access token obtained from OAuth authentication.","examples":["0123456789abcdef0123456789abcdef01234567"],"title":"Access Token"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const authorization_ref01_ent = client.Authorization()
    let authorization_ref01_data = setup.data.new.authorization['authorization_ref01']

    authorization_ref01_data = (await authorization_ref01_ent.create(authorization_ref01_data)).data()
    assert(null != authorization_ref01_data)



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
      '../../../../.sdk/test/entity/authorization/AuthorizationTestData.json')

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
    ['authorization01','authorization02','authorization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_AUTHORIZATION_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_AUTHORIZATION_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_AUTHORIZATION_ENTID']
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
  
