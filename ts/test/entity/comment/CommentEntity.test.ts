

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


describe('CommentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.Comment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Comment().create({"id":1,"content":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'comment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"content":{"a":true,"h":"Content","n":"content","r":true,"sh":"New content for the comment.","t":"`$ANY`","key$":"content","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1}},"id":{"field":"id","name":"id"},"name":"comment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["content"],"co":{"id":"POST /api/v1/comments/{comment_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/comments/{comment_id}","q":{"exist":["id"]},"r":{"param":{"comment_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"comments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["reaction"],"co":{"id":"POST /api/v1/comments/{comment_id}/reactions/remove","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/comments/{comment_id}/reactions/remove","q":{"$action":"reaction_remove","exist":["id"]},"r":{"param":{"comment_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"comments"},{"var":"id"},{"lit":"reactions"},{"lit":"remove"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/comments/{comment_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/comments/{comment_id}","q":{"exist":["id"]},"r":{"param":{"comment_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"comments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"comment","name__orig":"comment","Name":"Comment","name_":"comment","name-":"comment","NAME":"COMMENT","index$":10}, {"active":true,"entity":"comment","key$":"BasicCommentFlow","kind":"basic","name":"BasicCommentFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"comment_ref01"},"m":{"comment_id":"comment01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"comment_ref01","suffix":"_rm0"},"m":{"id":"comment01"},"o":"remove","s":[],"v":[],"index$":0}]}, 'Comment', {"POST /api/v1/comments/{comment_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"content":{"anyOf":[{"type":"string","maxLength":15000,"minLength":1},{"type":"null"}],"title":"Content","description":"New content for the comment. If null or an empty string, no update is performed.","examples":["Need two bottles of milk"],"key$":"content"}},"type":"object","required":["content"],"title":"Body","x-ref":"#/components/schemas/Body_61d93e0e","index$":1}}}},"parameters":[{"name":"comment_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the comment","examples":["6XGgmFQrx44wfGHr"],"title":"Comment Id"},"index$":0}]},"POST /api/v1/comments/{comment_id}/reactions/remove":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"reaction":{"type":"string","minLength":1,"title":"Reaction","description":"Reaction emoji.","examples":["👍"]}},"type":"object","required":["reaction"],"title":"Body","x-ref":"#/components/schemas/Body_3b3999fa"}}}},"parameters":[{"name":"comment_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the comment","examples":["6XGgmFQrx44wfGHr"],"title":"Comment Id"},"index$":0}]},"DELETE /api/v1/comments/{comment_id}":{"protocol":"http","parameters":[{"name":"comment_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the comment","examples":["6XGgmFQrx44wfGHr"],"title":"Comment Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let comment_ref01_data = Object.values(setup.data.existing.comment)[0] as any

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
      '../../../../.sdk/test/entity/comment/CommentTestData.json')

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
    ['comment01','comment02','comment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_COMMENT_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_COMMENT_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_COMMENT_ENTID']
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
  
