

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


describe('WorkspaceInvitationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.WorkspaceInvitation()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('workspace_invitation hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).WorkspaceInvitation().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).WorkspaceInvitation()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.WorkspaceInvitation().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().WorkspaceInvitation().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.WorkspaceInvitation().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.WorkspaceInvitation().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WorkspaceInvitation().list({"workspace_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workspace_invitation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app":{"a":true,"h":"App","n":"app","r":false,"sh":"Product the invitation was sent from.","t":"`$STRING`","key$":"app","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the invitation","t":"`$STRING`","key$":"id","index$":1},"inviter_id":{"a":true,"h":"Inviter Id","n":"inviter_id","r":true,"sh":"ID of the user user who sent the invitation","t":"`$STRING`","key$":"inviter_id","index$":2},"role":{"a":true,"h":"Role","n":"role","r":true,"sh":"Workspace role granted by the invitation.","t":"`$STRING`","key$":"role","index$":3},"user_email":{"a":true,"h":"User Email","n":"user_email","r":true,"sh":"The invited person's email.","t":"`$STRING`","key$":"user_email","index$":4},"workspace_id":{"a":true,"h":"Workspace Id","n":"workspace_id","r":true,"sh":"ID of the workspace","t":"`$STRING`","key$":"workspace_id","index$":5}},"id":{"field":"id","name":"id"},"name":"workspace_invitation","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/workspaces/invitations/all","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/workspaces/invitations/all","q":{"exist":["workspace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"lit":"invitations"},{"lit":"all"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"bf":["user_email","workspace_id"],"co":{"id":"POST /api/v1/workspaces/invitations/delete","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/workspaces/invitations/delete","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"lit":"invitations"},{"lit":"delete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/v1/workspaces/invitations/{invite_code}/accept","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"invite_code","or":"invite_code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/workspaces/invitations/{invite_code}/accept","q":{"$action":"accept","exist":["invite_code"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"lit":"invitations"},{"var":"invite_code"},{"lit":"accept"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PUT /api/v1/workspaces/invitations/{invite_code}/reject","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"invite_code","or":"invite_code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/workspaces/invitations/{invite_code}/reject","q":{"$action":"reject","exist":["invite_code"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"lit":"invitations"},{"var":"invite_code"},{"lit":"reject"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"workspace_invitation","name__orig":"workspace_invitation","Name":"WorkspaceInvitation","name_":"workspace_invitation","name-":"workspace-invitation","NAME":"WORKSPACE_INVITATION","index$":31}, {"active":true,"entity":"workspace_invitation","key$":"BasicWorkspaceInvitationFlow","kind":"basic","name":"BasicWorkspaceInvitationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"workspace_invitation_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"workspace_invitation_ref01","srcdatavar":"workspace_invitation_ref01_data","suffix":"_up0","textfield":"app"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workspace_invitation_ref01"}}],"v":[],"unreachable":true}]}, 'WorkspaceInvitation', {"GET /api/v1/workspaces/invitations/all":{"protocol":"http","parameters":[{"name":"workspace_id","in":"query","required":true,"schema":{"type":"integer","description":"ID of the workspace.","examples":[123456],"title":"Workspace Id"},"index$":0}]},"POST /api/v1/workspaces/invitations/delete":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"workspace_id":{"type":"integer","title":"Workspace Id","description":"ID of the workspace containing the invitation.","examples":[123456]},"user_email":{"type":"string","title":"User Email","description":"Email address of the invited user.","examples":["teammate@example.com"]}},"type":"object","required":["workspace_id","user_email"],"title":"Body","x-ref":"#/components/schemas/Body_52bab197"}}},"required":true},"parameters":[]},"PUT /api/v1/workspaces/invitations/{invite_code}/accept":{"protocol":"http","parameters":[{"name":"invite_code","in":"path","required":true,"schema":{"type":"string","description":"An opaque string representing an invite code. This invitation code is sent to a user via email and is exclusive for the user.","examples":["26d332457f16dc67f18385194be148f62c2b4317"],"title":"Invite Code"},"index$":0}]},"PUT /api/v1/workspaces/invitations/{invite_code}/reject":{"protocol":"http","parameters":[{"name":"invite_code","in":"path","required":true,"schema":{"type":"string","description":"An opaque string representing an invite code. This invitation code is sent to a user via email and is exclusive for the user.","examples":["26d332457f16dc67f18385194be148f62c2b4317"],"title":"Invite Code"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let workspace_invitation_ref01_data = Object.values(setup.data.existing.workspace_invitation)[0] as any

    // LIST
    const workspace_invitation_ref01_ent = client.WorkspaceInvitation()
    const workspace_invitation_ref01_match: any = {}

    const workspace_invitation_ref01_list = (await workspace_invitation_ref01_ent.list(workspace_invitation_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/workspace_invitation/WorkspaceInvitationTestData.json')

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
    ['workspace_invitation01','workspace_invitation02','workspace_invitation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_WORKSPACE_INVITATION_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_WORKSPACE_INVITATION_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_WORKSPACE_INVITATION_ENTID']
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
  
