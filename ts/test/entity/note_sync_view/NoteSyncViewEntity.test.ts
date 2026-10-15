

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


describe('NoteSyncViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.NoteSyncView()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('note_sync_view hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).NoteSyncView().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).NoteSyncView()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.NoteSyncView().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().NoteSyncView().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.NoteSyncView().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.NoteSyncView().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NoteSyncView().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'note_sync_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachment":{"a":true,"h":"Attachment","n":"attachment","r":false,"sh":"A [File attachment](#tag/Sync/Comments/File-Attachments) object","t":"`$ANY`","key$":"attachment","index$":0},"content":{"a":true,"h":"Content","n":"content","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Comment content.","t":"`$STRING`","key$":"content","index$":1},"file_attachment":{"a":true,"h":"File Attachment","n":"file_attachment","r":true,"sh":"File attachment metadata, or `null` when the comment has no attachment.","t":"`$ANY`","union":{"branches":4,"count":1,"depth":3},"key$":"file_attachment","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"String ID of the comment.","t":"`$STRING`","key$":"id","index$":3},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":true,"sh":"Whether the comment is deleted.","t":"`$BOOLEAN`","key$":"is_deleted","index$":4},"posted_at":{"a":true,"fo":"date-time","h":"Posted At","n":"posted_at","r":true,"sh":"Date and time when the comment was posted, or `null` if unknown.","t":"`$ANY`","key$":"posted_at","index$":5},"posted_uid":{"a":true,"h":"Posted Uid","n":"posted_uid","r":true,"sh":"String ID of the user who posted the comment.","t":"`$ANY`","key$":"posted_uid","index$":6},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"String ID of the project","t":"`$STRING`","key$":"project_id","index$":7},"reaction":{"a":true,"h":"Reaction","n":"reaction","r":true,"sh":"Reaction emoji.","t":"`$STRING`","key$":"reaction","index$":8},"reactions":{"a":true,"h":"Reactions","n":"reactions","r":true,"sh":"Reaction emoji mapped to user IDs that reacted.","t":"`$ANY`","key$":"reactions","index$":9},"task_id":{"a":true,"h":"Task Id","n":"task_id","r":false,"sh":"String ID of the task","t":"`$STRING`","key$":"task_id","index$":10},"uids_to_notify":{"a":true,"h":"Uids To Notify","n":"uids_to_notify","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"String IDs of users notified by the comment.","t":"`$ANY`","key$":"uids_to_notify","index$":11}},"id":{"field":"id","name":"id"},"name":"note_sync_view","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["reaction"],"co":{"id":"POST /api/v1/comments/{comment_id}/reactions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"comment_id","or":"comment_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/comments/{comment_id}/reactions","q":{"exist":["comment_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"comments"},{"var":"comment_id"},{"lit":"reactions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["attachment","content","project_id","task_id","uids_to_notify"],"co":{"id":"POST /api/v1/comments","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/comments","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/comments","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"project_id","or":"project_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"public_key","or":"public_key","r":false,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"task_id","or":"task_id","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/comments","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/comments/{comment_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"comment_id","or":"comment_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/comments/{comment_id}","q":{"exist":["comment_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"comments"},{"var":"comment_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.comment"]]},"key$":"note_sync_view","name__orig":"note_sync_view","Name":"NoteSyncView","name_":"note_sync_view","name-":"note-sync-view","NAME":"NOTE_SYNC_VIEW","index$":24}, {"active":true,"entity":"note_sync_view","key$":"BasicNoteSyncViewFlow","kind":"basic","name":"BasicNoteSyncViewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"note_sync_view_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"note_sync_view_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"note_sync_view_ref01","srcdatavar":"note_sync_view_ref01_data","suffix":"_dt0"},"m":{"id":"note_sync_view01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-note_sync_view_ref01"}}],"unreachable":true}]}, 'NoteSyncView', {"POST /api/v1/comments/{comment_id}/reactions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"reaction":{"type":"string","maxLength":64,"minLength":1,"title":"Reaction","description":"Reaction emoji.","examples":["👍"],"key$":"reaction"}},"type":"object","required":["reaction"],"title":"Body","x-ref":"#/components/schemas/Body_579e1668","index$":1}}}},"parameters":[{"name":"comment_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the comment","examples":["6XGgmFQrx44wfGHr"],"title":"Comment Id"},"index$":0}]},"POST /api/v1/comments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"content":{"type":"string","maxLength":15000,"minLength":1,"title":"Content","description":"Content of the comment","examples":["Need one bottle of milk"],"key$":"content"},"project_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Project Id","description":"String ID of the project","examples":["6XGgm6PHrGgMpCFX"],"key$":"project_id"},"task_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Task Id","description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"key$":"task_id"},"attachment":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"title":"Attachment","description":"A [File attachment](#tag/Sync/Comments/File-Attachments) object","examples":[{"file_name":"File.pdf","file_type":"application/pdf","file_url":"https://s3.amazonaws.com/domorebetter/Todoist+Setup+Guide.pdf","resource_type":"file"}],"key$":"attachment"},"uids_to_notify":{"anyOf":[{"items":{"type":"integer"},"type":"array"},{"type":"null"}],"title":"Uids To Notify","description":"Optional list of user IDs to notify about this comment.","examples":[[12345678,23456789]],"key$":"uids_to_notify"}},"type":"object","required":["content"],"title":"Body","x-ref":"#/components/schemas/Body_28d2b1b0","index$":1}}}},"parameters":[]},"GET /api/v1/comments":{"protocol":"http","parameters":[{"name":"project_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the project","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0},{"name":"task_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the task","examples":["6XGgmFVcrG5RRjVr"],"title":"Task Id"},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":2},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":3},{"name":"public_key","in":"query","required":false,"schema":{"anyOf":[{"type":"string","description":"Public project access key.","examples":["550e8400-e29b-41d4-a716-446655440000"]},{"type":"null"}],"title":"Public Key"},"index$":4}]},"GET /api/v1/comments/{comment_id}":{"protocol":"http","parameters":[{"name":"comment_id","in":"path","required":true,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"String ID of the comment","examples":["6XGgmFVcrG5RRjVr"],"title":"Comment Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const note_sync_view_ref01_ent = client.NoteSyncView()
    let note_sync_view_ref01_data = setup.data.new.note_sync_view['note_sync_view_ref01']

    note_sync_view_ref01_data = (await note_sync_view_ref01_ent.create(note_sync_view_ref01_data)).data()
    assert(null != note_sync_view_ref01_data.id)


    // LIST
    const note_sync_view_ref01_match: any = {}

    const note_sync_view_ref01_list = (await note_sync_view_ref01_ent.list(note_sync_view_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(note_sync_view_ref01_list, { id: note_sync_view_ref01_data.id })))


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
      '../../../../.sdk/test/entity/note_sync_view/NoteSyncViewTestData.json')

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
    ['note_sync_view01','note_sync_view02','note_sync_view03','comment01','comment02','comment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_NOTE_SYNC_VIEW_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_NOTE_SYNC_VIEW_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_NOTE_SYNC_VIEW_ENTID']
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
  
