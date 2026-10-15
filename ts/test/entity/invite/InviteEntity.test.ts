

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


describe('InviteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.Invite()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Invite().create({"workspace_id":"x","invited_emails":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'invite.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app":{"a":true,"h":"App","n":"app","r":false,"sh":"For first-party clients usage only.","t":"`$STRING`","key$":"app","index$":0},"email_list":{"a":true,"h":"Email List","n":"email_list","r":false,"sh":"List of user emails to invite to the workspace.","t":"`$ANY`","key$":"email_list","index$":1},"invited_emails":{"a":true,"h":"Invited Emails","n":"invited_emails","r":true,"sh":"Emails successfully invited to the workspace.","t":"`$ARRAY`","key$":"invited_emails","index$":2},"role":{"a":true,"h":"Role","n":"role","r":false,"sh":"Role assigned to invited users.","t":"`$ANY`","key$":"role","index$":3}},"name":"invite","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["app","email_list","role"],"co":{"id":"POST /api/v1/workspaces/{workspace_id}/users/invite","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/workspaces/{workspace_id}/users/invite","q":{"exist":["workspace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"users"},{"lit":"invite"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.workspace"]]},"key$":"invite","name__orig":"invite","Name":"Invite","name_":"invite","name-":"invite","NAME":"INVITE","index$":17}, {"active":true,"entity":"invite","key$":"BasicInviteFlow","kind":"basic","name":"BasicInviteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"invite_ref01"},"m":{"workspace_id":"workspace01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Invite', {"POST /api/v1/workspaces/{workspace_id}/users/invite":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"email_list":{"anyOf":[{"items":{"type":"string","format":"email"},"type":"array"},{"type":"null"}],"title":"Email List","description":"List of user emails to invite to the workspace.","examples":[["teammate@example.com"]],"key$":"email_list"},"role":{"anyOf":[{"type":"string","enum":["ADMIN","MEMBER","GUEST"],"title":"WorkspaceRole","description":"Role of the user inside the workspace","x-enumDescriptions":{"ADMIN":"Admin","GUEST":"Guest","MEMBER":"Member"},"x-ref":"#/components/schemas/WorkspaceRole"},{"type":"null"}],"description":"Role assigned to invited users.","examples":["MEMBER"],"key$":"role"},"app":{"type":"string","enum":["todoist","comms","automations"],"title":"ProductApp","description":"For first-party clients usage only. This attribute may be removed or changed without notice, so we strongly advise not to rely on it. Product the invitation is sent from. Products without their own invite emails are recorded as Todoist.","x-enumDescriptions":{"automations":"Automations","comms":"Comms","todoist":"Todoist"},"default":"todoist","examples":["comms"],"x-ref":"#/components/schemas/ProductApp","key$":"app"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_108b7f01","index$":1}}}},"parameters":[{"name":"workspace_id","in":"path","required":true,"schema":{"type":"integer","exclusiveMinimum":0,"description":"ID of the workspace","examples":[123456],"title":"Workspace Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const invite_ref01_ent = client.Invite()
    let invite_ref01_data = setup.data.new.invite['invite_ref01']
    invite_ref01_data['workspace_id'] = setup.idmap['workspace01']

    invite_ref01_data = (await invite_ref01_ent.create(invite_ref01_data)).data()
    assert(null != invite_ref01_data)


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
      '../../../../.sdk/test/entity/invite/InviteTestData.json')

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
    ['invite01','invite02','invite03','workspace01','workspace02','workspace03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_INVITE_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_INVITE_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_INVITE_ENTID']
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
  
