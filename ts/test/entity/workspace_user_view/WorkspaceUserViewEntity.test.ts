

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


describe('WorkspaceUserViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.WorkspaceUserView()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WorkspaceUserView().create({"user_id":"x","workspace_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workspace_user_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"custom_sorting_applied":{"a":true,"h":"Custom Sorting Applied","n":"custom_sorting_applied","r":false,"sh":"Whether the user has custom project sorting enabled.","t":"`$BOOLEAN`","key$":"custom_sorting_applied","index$":0},"invite_code":{"a":true,"h":"Invite Code","n":"invite_code","r":false,"sh":"Workspace invite code to join with.","t":"`$ANY`","key$":"invite_code","index$":1},"project_sort_preference":{"a":true,"h":"Project Sort Preference","n":"project_sort_preference","r":false,"sh":"Project sorting preference for the user.","t":"`$STRING`","key$":"project_sort_preference","index$":2},"role":{"a":true,"h":"Role","n":"role","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Workspace role assigned to the user.","t":"`$STRING`","key$":"role","index$":3},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"sh":"String ID of the workspace user.","t":"`$STRING`","key$":"user_id","index$":4},"workspace_id":{"a":true,"h":"Workspace Id","n":"workspace_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"String ID of the workspace.","t":"`$STRING`","key$":"workspace_id","index$":5}},"name":"workspace_user_view","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["role"],"co":{"id":"POST /api/v1/workspaces/{workspace_id}/users/{user_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/workspaces/{workspace_id}/users/{user_id}","q":{"exist":["user_id","workspace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"users"},{"var":"user_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["invite_code","workspace_id"],"co":{"id":"POST /api/v1/workspaces/join","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/workspaces/join","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"workspaces"},{"lit":"join"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.workspace","$.main.kit.entity.user"]]},"key$":"workspace_user_view","name__orig":"workspace_user_view","Name":"WorkspaceUserView","name_":"workspace_user_view","name-":"workspace-user-view","NAME":"WORKSPACE_USER_VIEW","index$":50}, {"active":true,"entity":"workspace_user_view","key$":"BasicWorkspaceUserViewFlow","kind":"basic","name":"BasicWorkspaceUserViewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"workspace_user_view_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'WorkspaceUserView', {"POST /api/v1/workspaces/{workspace_id}/users/{user_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"role":{"type":"string","enum":["ADMIN","MEMBER","GUEST"],"title":"WorkspaceRole","description":"Updated role for the user.","x-enumDescriptions":{"ADMIN":"Admin","GUEST":"Guest","MEMBER":"Member"},"examples":["ADMIN"],"x-ref":"#/components/schemas/WorkspaceRole","key$":"role"}},"type":"object","required":["role"],"title":"Body","x-ref":"#/components/schemas/Body_51341cd2","index$":1}}}},"parameters":[{"name":"workspace_id","in":"path","required":true,"schema":{"type":"integer","exclusiveMinimum":0,"description":"ID of the workspace","examples":[123456],"title":"Workspace Id"},"index$":0},{"name":"user_id","in":"path","required":true,"schema":{"type":"integer","exclusiveMaximum":18446744073709552000,"exclusiveMinimum":0,"description":"ID of the workspace user","examples":[123456],"title":"User Id"},"index$":1}]},"POST /api/v1/workspaces/join":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"invite_code":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Invite Code","description":"Workspace invite code to join with. Provide either `invite_code` or `workspace_id`, not both.","examples":["26d332457f16dc67f18385194be148f62c2b4317"],"key$":"invite_code"},"workspace_id":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Workspace Id","description":"Workspace ID to join by verified email domain. Provide either `invite_code` or `workspace_id`, not both.","examples":[123456],"key$":"workspace_id"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_fe5aa153","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const workspace_user_view_ref01_ent = client.WorkspaceUserView()
    let workspace_user_view_ref01_data = setup.data.new.workspace_user_view['workspace_user_view_ref01']

    workspace_user_view_ref01_data = (await workspace_user_view_ref01_ent.create(workspace_user_view_ref01_data)).data()
    assert(null != workspace_user_view_ref01_data)


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
      '../../../../.sdk/test/entity/workspace_user_view/WorkspaceUserViewTestData.json')

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
    ['workspace_user_view01','workspace_user_view02','workspace_user_view03','workspace01','workspace02','workspace03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_WORKSPACE_USER_VIEW_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_WORKSPACE_USER_VIEW_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_WORKSPACE_USER_VIEW_ENTID']
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
  
