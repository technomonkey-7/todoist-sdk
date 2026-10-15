

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


describe('ProjectEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.Project()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('project hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).Project().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).Project()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Project().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().Project().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Project().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Project().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Project().list({"folder_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"child_order":{"a":true,"h":"Child Order","n":"child_order","r":false,"sh":"Updated position of the project in the hierarchy.","t":"`$ANY`","key$":"child_order","index$":0},"color":{"a":true,"h":"Color","n":"color","r":false,"sh":"Color of the project icon.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"color","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the project.","t":"`$STRING`","key$":"description","index$":2},"folder_id":{"a":true,"h":"Folder Id","n":"folder_id","r":false,"sh":"Folder to move the project into.","t":"`$STRING`","key$":"folder_id","index$":3},"icon":{"a":true,"h":"Icon","n":"icon","r":false,"sh":"Project icon name.","t":"`$ANY`","key$":"icon","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"is_collapsed":{"a":true,"h":"Is Collapsed","n":"is_collapsed","r":false,"sh":"Whether the project is collapsed.","t":"`$BOOLEAN`","key$":"is_collapsed","index$":6},"is_favorite":{"a":true,"h":"Is Favorite","n":"is_favorite","r":false,"sh":"Whether the project is a favorite for the user.","t":"`$BOOLEAN`","key$":"is_favorite","index$":7},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Name of the project.","t":"`$STRING`","key$":"name","index$":8},"next_cursor":{"a":true,"h":"Next Cursor","n":"next_cursor","r":true,"sh":"Cursor for the next page of results, or `null` when there are no more results.","t":"`$ANY`","key$":"next_cursor","index$":9},"parent_id":{"a":true,"h":"Parent Id","n":"parent_id","r":false,"sh":"Parent project ID.","t":"`$STRING`","key$":"parent_id","index$":10},"results":{"a":true,"h":"Results","n":"results","r":true,"sh":"Objects in the current page of results.","t":"`$ARRAY`","union":{"branches":3,"count":2,"depth":9},"key$":"results","index$":11},"view_style":{"a":true,"h":"View Style","n":"view_style","r":false,"sh":"View style of the project.","t":"`$ANY`","key$":"view_style","index$":12},"workspace_id":{"a":true,"h":"Workspace Id","n":"workspace_id","r":false,"sh":"Workspace ID.","t":"`$STRING`","key$":"workspace_id","index$":13}},"id":{"field":"id","name":"id"},"name":"project","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["color","description","icon","is_favorite","name","parent_id","view_style","workspace_id"],"co":{"id":"POST /api/v1/projects","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/projects","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/projects/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/projects/search","q":{"$action":"search","exist":["query"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/projects","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"folder_id","or":"folder_id","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/projects","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/projects/archived","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$ANY`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/projects/archived","q":{"$action":"archived"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"lit":"archived"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["child_order","color","description","folder_id","icon","is_collapsed","is_favorite","name","view_style"],"co":{"id":"POST /api/v1/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/v1/projects/{project_id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/projects/{project_id}/archive","q":{"$action":"archive","exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /api/v1/projects/{project_id}/join","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/projects/{project_id}/join","q":{"$action":"join","exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"var":"id"},{"lit":"join"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /api/v1/projects/{project_id}/unarchive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/projects/{project_id}/unarchive","q":{"$action":"unarchive","exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"projects"},{"var":"id"},{"lit":"unarchive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"project","name__orig":"project","Name":"Project","name_":"project","name-":"project","NAME":"PROJECT","index$":24}, {"active":true,"entity":"project","key$":"BasicProjectFlow","kind":"basic","name":"BasicProjectFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"project_ref01","srcdatavar":"project_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"project_ref01","srcdatavar":"project_ref01_data","suffix":"_dt0"},"m":{"id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"project_ref01","suffix":"_rm0"},"m":{"id":"project01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"project_ref01"}}],"index$":5}]}, 'Project', {"POST /api/v1/projects":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Name","description":"Name of the project.","examples":["Vacation Planning"],"key$":"name"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description","description":"Description of the project.","examples":["Tasks for planning the trip."],"key$":"description"},"parent_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Parent Id","description":"Parent project ID. If provided, creates this project as a sub-project","examples":["6XGgm6PHrGgMpCFX"],"key$":"parent_id"},"color":{"anyOf":[{"type":"string","enum":["berry_red","red","orange","yellow","olive_green","lime_green","green","mint_green","teal","sky_blue","light_blue","blue","grape","violet","lavender","magenta","salmon","charcoal","grey","taupe"]},{"type":"integer","enum":[30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]}],"examples":["charcoal"],"description":"Color of the project icon.","default":"charcoal","x-ref":"#/components/schemas/APIColorID","key$":"color"},"icon":{"anyOf":[{"type":"string","enum":["briefcase","folder","diagram","headset","microphone","flag","bullseye","house","heart","airplane","gift","pin","school_cap","lightbulb","star"],"examples":["lightbulb"]},{"type":"null"}],"title":"Icon","description":"Project icon name. Pass null or omit it for the default icon.","examples":["lightbulb"],"key$":"icon"},"is_favorite":{"type":"boolean","title":"Is Favorite","description":"Whether the project is a favorite for the user.","default":false,"examples":[false],"key$":"is_favorite"},"view_style":{"anyOf":[{"type":"string","enum":["list","board","calendar"],"x-ref":"#/components/schemas/ProjectViewStyleV1"},{"type":"null"}],"description":"View style of the project.","examples":["list"],"key$":"view_style"},"workspace_id":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Workspace Id","description":"Workspace ID. If provided, creates a workspace project instead of a personal project.","examples":[123456],"key$":"workspace_id"}},"type":"object","required":["name"],"title":"Body","x-ref":"#/components/schemas/Body_207bf8bc","index$":1}}}},"parameters":[]},"GET /api/v1/projects/search":{"protocol":"http","parameters":[{"name":"query","in":"query","required":true,"schema":{"type":"string","minLength":1,"maxLength":1024,"description":"Search query to match project names. Matching is case-insensitive. Queries are matched literally unless `*` (wildcard) is included. Use `\\*` for literal asterisk and `\\\\` for literal backslash.","examples":["Inbox","Client *","Q* 2026","Draft\\*"],"title":"Query"},"index$":0},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":2}]},"GET /api/v1/projects":{"protocol":"http","parameters":[{"name":"folder_id","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","exclusiveMinimum":0,"description":"Numeric ID of the folder.","examples":[1234]},{"type":"null"}],"description":"Filter projects to only those in this folder. If provided, workspace_id is ignored.","title":"Folder Id"},"index$":0},{"name":"workspace_id","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","exclusiveMinimum":0,"description":"Numeric ID of the workspace.","examples":[123456]},{"type":"null"}],"description":"Filter projects to only those in this workspace. Ignored if folder_id is also provided.","title":"Workspace Id"},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":2},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":3}]},"GET /api/v1/projects/archived":{"protocol":"http","parameters":[{"name":"cursor","in":"query","required":false,"schema":{"anyOf":[{"type":"string","minLength":1,"pattern":"^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$","description":"An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request","examples":["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"]},{"type":"null"}],"title":"Cursor"},"index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"exclusiveMinimum":0,"description":"The number of objects to return in a page","examples":[50],"default":50,"title":"Limit"},"index$":1}]},"GET /api/v1/projects/{project_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the project","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0}]},"DELETE /api/v1/projects/{project_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the project","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0}]},"POST /api/v1/projects/{project_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Name","description":"Updated project name. Passing null or omitting this field will leave it unchanged.","examples":["Vacation Planning"],"key$":"name"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description","description":"Updated project description. Passing null or omitting this field will leave it unchanged.","examples":["Tasks for planning the trip."],"key$":"description"},"color":{"anyOf":[{"anyOf":[{},{}],"examples":["charcoal"],"x-ref":"#/components/schemas/APIColorID"},{"type":"null"}],"description":"Updated project color. Passing null or omitting this field will leave it unchanged.","examples":["charcoal"],"key$":"color"},"icon":{"anyOf":[{"type":"string","enum":["briefcase","folder","diagram","headset","microphone","flag","bullseye","house","heart","airplane","gift","pin","school_cap","lightbulb","star"],"examples":["lightbulb"]},{"type":"null"}],"title":"Icon","description":"Updated project icon name. Pass null to reset to the default icon. Omit this field to keep it unchanged.","examples":["lightbulb"],"key$":"icon"},"is_favorite":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Is Favorite","description":"Whether the project is marked as a favorite. Passing null or omitting this field will leave it unchanged.","examples":[true],"key$":"is_favorite"},"view_style":{"anyOf":[{"type":"string","enum":["list","board","calendar"],"x-ref":"#/components/schemas/ProjectViewStyleV1"},{"type":"null"}],"description":"Updated project view style. Passing null or omitting this field will leave it unchanged.","examples":["board"],"key$":"view_style"},"child_order":{"anyOf":[{"type":"integer","maximum":2147483647,"minimum":-2147483648},{"type":"null"}],"title":"Child Order","description":"Updated position of the project in the hierarchy. Only supported for personal projects. Passing null or omitting this field will leave it unchanged.","examples":[12],"key$":"child_order"},"is_collapsed":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Is Collapsed","description":"Whether the project is collapsed. Passing null or omitting this field will leave it unchanged.","examples":[false],"key$":"is_collapsed"},"folder_id":{"anyOf":[{"type":"integer","exclusiveMinimum":0,"description":"Numeric ID of the folder.","examples":[1234]},{"type":"null"}],"title":"Folder Id","description":"Folder to move the project into. Only supported for workspace projects. Pass null to clear the value. Omit this field to keep it unchanged.","key$":"folder_id"}},"type":"object","title":"Body","x-ref":"#/components/schemas/Body_cb8d28ec","index$":1}}}},"parameters":[{"name":"project_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the project","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0}]},"POST /api/v1/projects/{project_id}/archive":{"protocol":"http","parameters":[{"name":"project_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the project","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0}]},"POST /api/v1/projects/{project_id}/join":{"protocol":"http","parameters":[{"name":"project_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the workspace project to join.","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0}]},"POST /api/v1/projects/{project_id}/unarchive":{"protocol":"http","parameters":[{"name":"project_id","in":"path","required":true,"schema":{"type":"string","description":"String ID of the project","examples":["6XGgm6PHrGgMpCFX"],"title":"Project Id"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_ref01_ent = client.Project()
    let project_ref01_data = setup.data.new.project['project_ref01']

    project_ref01_data = (await project_ref01_ent.create(project_ref01_data)).data()
    assert(null != project_ref01_data.id)


    // LIST
    const project_ref01_match: any = {}

    const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(project_ref01_list, { id: project_ref01_data.id })))


    // UPDATE
    const project_ref01_data_up0: any = {}
    project_ref01_data_up0.id = project_ref01_data.id

    const project_ref01_markdef_up0 = { name: 'description', value: 'Mark01-project_ref01_' + setup.now }
    ;(project_ref01_data_up0 as any)[project_ref01_markdef_up0.name] = project_ref01_markdef_up0.value

    const project_ref01_resdata_up0 = (await project_ref01_ent.update(project_ref01_data_up0)).data()
    assert(project_ref01_resdata_up0.id === project_ref01_data_up0.id)

    assert((project_ref01_resdata_up0 as any)[project_ref01_markdef_up0.name] === project_ref01_markdef_up0.value)


    // LOAD
    const project_ref01_match_dt0: any = {}
    project_ref01_match_dt0.id = project_ref01_data.id
    const project_ref01_data_dt0 = (await project_ref01_ent.load(project_ref01_match_dt0)).data()
    assert(project_ref01_data_dt0.id === project_ref01_data.id)


    // REMOVE
    const project_ref01_match_rm0: any = { id: project_ref01_data.id }
    await project_ref01_ent.remove(project_ref01_match_rm0)
  

    // LIST
    const project_ref01_match_rt0: any = {}

    const project_ref01_list_rt0 = (await project_ref01_ent.list(project_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(project_ref01_list_rt0, { id: project_ref01_data.id })))


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
      '../../../../.sdk/test/entity/project/ProjectTestData.json')

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
    ['project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_PROJECT_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
    'TODOIST_APIKEY': '',
  })

  idmap = env['TODOIST_TEST_PROJECT_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_PROJECT_ENTID']
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
  
