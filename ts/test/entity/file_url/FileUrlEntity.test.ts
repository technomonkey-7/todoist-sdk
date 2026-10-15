

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


describe('FileUrlEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.FileUrl()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.FileUrl().load({"project_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'file_url.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"file_name":{"a":true,"h":"File Name","n":"file_name","r":true,"sh":"Name of the exported template file.","t":"`$STRING`","key$":"file_name","index$":0},"file_url":{"a":true,"fo":"uri","h":"File Url","n":"file_url","r":true,"sh":"Temporary URL for downloading the exported template.","t":"`$STRING`","key$":"file_url","index$":1}},"name":"file_url","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/templates/url","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":true,"k":"query","n":"use_relative_date","or":"use_relative_dates","r":false,"t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/templates/url","q":{"exist":["project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"templates"},{"lit":"url"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"file_url","name__orig":"file_url","Name":"FileUrl","name_":"file_url","name-":"file-url","NAME":"FILE_URL","index$":8}, {"active":true,"entity":"file_url","key$":"BasicFileUrlFlow","kind":"basic","name":"BasicFileUrlFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"file_url_ref01","srcdatavar":"file_url_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-file_url_ref01"}}],"index$":0}]}, 'FileUrl', {"GET /api/v1/templates/url":{"protocol":"http","parameters":[{"name":"project_id","in":"query","required":true,"schema":{"type":"string","description":"String ID of the project to export as a template URL.","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0},{"name":"use_relative_dates","in":"query","required":false,"schema":{"type":"boolean","description":"Whether to export due dates as relative dates.","examples":[true],"default":true,"title":"Use Relative Dates"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let file_url_ref01_data = Object.values(setup.data.existing.file_url)[0] as any

    // LOAD
    const file_url_ref01_ent = client.FileUrl()
    const file_url_ref01_match_dt0: any = {}
    const file_url_ref01_data_dt0 = (await file_url_ref01_ent.load(file_url_ref01_match_dt0)).data()
    assert(null != file_url_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/file_url/FileUrlTestData.json')

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
    ['file_url01','file_url02','file_url03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_FILE_URL_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_FILE_URL_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_FILE_URL_ENTID']
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
  
