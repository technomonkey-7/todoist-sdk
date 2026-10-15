

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


describe('MemberViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.MemberView()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('member_view hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).MemberView().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).MemberView()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MemberView().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().MemberView().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MemberView().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MemberView().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MemberView().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'member_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"full_name":{"a":true,"h":"Full Name","n":"full_name","r":true,"sh":"Full name of the workspace member.","t":"`$STRING`","key$":"full_name","index$":0},"image_id":{"a":true,"h":"Image Id","n":"image_id","r":false,"sh":"Avatar image ID of the workspace member, or `null`.","t":"`$STRING`","key$":"image_id","index$":1},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":false,"sh":"Whether the workspace member is deleted.","t":"`$BOOLEAN`","key$":"is_deleted","index$":2},"role":{"a":true,"h":"Role","n":"role","r":true,"sh":"Workspace role assigned to the member.","t":"`$STRING`","key$":"role","index$":3},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":true,"sh":"Timezone of the workspace member.","t":"`$STRING`","key$":"timezone","index$":4},"user_email":{"a":true,"h":"User Email","n":"user_email","r":true,"sh":"Email address of the workspace member.","t":"`$STRING`","key$":"user_email","index$":5},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"sh":"String ID of the workspace member.","t":"`$STRING`","key$":"user_id","index$":6},"workspace_id":{"a":true,"h":"Workspace Id","n":"workspace_id","r":true,"sh":"String ID of the workspace.","t":"`$STRING`","key$":"workspace_id","index$":7}},"name":"member_view","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/workspaces/users","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"id","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/workspaces/users","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body.workspace_users`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"member_view","name__orig":"member_view","Name":"MemberView","name_":"member_view","name-":"member-view","NAME":"MEMBER_VIEW","index$":22}, {"active":true,"entity":"member_view","key$":"BasicMemberViewFlow","kind":"basic","name":"BasicMemberViewFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"member_view_ref01"}}],"index$":0}]}, 'MemberView', {"GET /api/v1/workspaces/users":{"protocol":"http","parameters":[{"name":"workspace_id","in":"query","required":false,"schema":{"anyOf":[{"type":"integer"},{"type":"null"}],"description":"ID of the workspace to list users for.","examples":[123456],"title":"Workspace Id"},"index$":0},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","description":"Maximum number of workspace users to return.","examples":[50],"default":100,"title":"Limit"},"index$":2},{"name":"sort","in":"query","required":false,"schema":{"enum":["id","name"],"type":"string","description":"Order workspace users by ID, or by name with the requesting user first. Name sorting requires workspace_id.","examples":["name"],"default":"id","title":"Sort"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let member_view_ref01_data = Object.values(setup.data.existing.member_view)[0] as any

    // LIST
    const member_view_ref01_ent = client.MemberView()
    const member_view_ref01_match: any = {}

    const member_view_ref01_list = (await member_view_ref01_ent.list(member_view_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/member_view/MemberViewTestData.json')

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
    ['member_view01','member_view02','member_view03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_MEMBER_VIEW_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_MEMBER_VIEW_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_MEMBER_VIEW_ENTID']
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
  
