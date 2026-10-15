

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


describe('ProjectImportCreateResponseWithObjectEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.ProjectImportCreateResponseWithObject()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectImportCreateResponseWithObject().create({"comments":"x","discarded_fields":"x","project_id":1,"project_notes":"x","project_view_options_defaults":"x","projects":"x","reminders":"x","sections":"x","status":"x","tasks":"x","template_type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_import_create_response_with_object.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"comments":{"a":true,"h":"Comments","n":"comments","r":true,"sh":"Task comments created by the import.","t":"`$ARRAY`","union":{"branches":4,"count":1,"depth":6},"key$":"comments","index$":0},"discarded_fields":{"a":true,"h":"Discarded Fields","n":"discarded_fields","r":true,"sh":"Task properties the importer dropped from one or more imported tasks because the plan in force does not include them.","t":"`$ARRAY`","key$":"discarded_fields","index$":1},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"ID of the project created from the template.","t":"`$STRING`","key$":"project_id","index$":2},"project_notes":{"a":true,"h":"Project Notes","n":"project_notes","r":true,"sh":"Project comments created by the import.","t":"`$ARRAY`","union":{"branches":4,"count":1,"depth":6},"key$":"project_notes","index$":3},"project_view_options_defaults":{"a":true,"h":"Project View Options Defaults","n":"project_view_options_defaults","r":true,"sh":"View options defaults applied to the imported project.","t":"`$ARRAY`","key$":"project_view_options_defaults","index$":4},"projects":{"a":true,"h":"Projects","n":"projects","r":true,"sh":"Projects created by the import.","t":"`$ARRAY`","union":{"branches":3,"count":2,"depth":9},"key$":"projects","index$":5},"reminders":{"a":true,"h":"Reminders","n":"reminders","r":true,"sh":"Reminders created by the import.","t":"`$ARRAY`","key$":"reminders","index$":6},"sections":{"a":true,"h":"Sections","n":"sections","r":true,"sh":"Sections created by the import.","t":"`$ARRAY`","key$":"sections","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Always `ok` on success.","t":"`$STRING`","key$":"status","index$":8},"tasks":{"a":true,"h":"Tasks","n":"tasks","r":true,"sh":"Tasks created by the import.","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":6},"key$":"tasks","index$":9},"template_type":{"a":true,"h":"Template Type","n":"template_type","r":true,"sh":"Type of template that was imported.","t":"`$STRING`","key$":"template_type","index$":10}},"name":"project_import_create_response_with_object","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/templates/create_project_from_file","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/templates/create_project_from_file","q":{},"r":{},"rb":{"fields":[{"binary":true,"media":"application/octet-stream","name":"file"},{"name":"name"},{"name":"workspace_id"}],"kind":"multipart","media":"multipart/form-data"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"templates"},{"lit":"create_project_from_file"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"project_import_create_response_with_object","name__orig":"project_import_create_response_with_object","Name":"ProjectImportCreateResponseWithObject","name_":"project_import_create_response_with_object","name-":"project-import-create-response-with-object","NAME":"PROJECT_IMPORT_CREATE_RESPONSE_WITH_OBJECT","index$":34}, {"active":true,"entity":"project_import_create_response_with_object","key$":"BasicProjectImportCreateResponseWithObjectFlow","kind":"basic","name":"BasicProjectImportCreateResponseWithObjectFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_import_create_response_with_object_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ProjectImportCreateResponseWithObject', {"POST /api/v1/templates/create_project_from_file":{"protocol":"http","requestBody":{"content":{"multipart/form-data":{"schema":{"properties":{"name":{"type":"string","title":"Name"},"workspace_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Workspace Id"},"file":{"type":"string","contentMediaType":"application/octet-stream","title":"File"}},"type":"object","required":["name","file"],"title":"Body_create_project_from_file_api_v1_templates_create_project_from_file_post","x-ref":"#/components/schemas/Body_create_project_from_file_api_v1_templates_create_project_from_file_post"}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_import_create_response_with_object_ref01_ent = client.ProjectImportCreateResponseWithObject()
    let project_import_create_response_with_object_ref01_data = setup.data.new.project_import_create_response_with_object['project_import_create_response_with_object_ref01']

    project_import_create_response_with_object_ref01_data = (await project_import_create_response_with_object_ref01_ent.create(project_import_create_response_with_object_ref01_data)).data()
    assert(null != project_import_create_response_with_object_ref01_data)


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
      '../../../../.sdk/test/entity/project_import_create_response_with_object/ProjectImportCreateResponseWithObjectTestData.json')

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
    ['project_import_create_response_with_object01','project_import_create_response_with_object02','project_import_create_response_with_object03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_PROJECT_IMPORT_CREATE_RESPONSE_WITH_OBJECT_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_PROJECT_IMPORT_CREATE_RESPONSE_WITH_OBJECT_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_PROJECT_IMPORT_CREATE_RESPONSE_WITH_OBJECT_ENTID']
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
  
