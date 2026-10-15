

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
  afterEach(liveDelay('TODOIST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TodoistSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('user hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TodoistSDK.test(offline).User().stream('list')) { }
    }, /offline/)

    for await (const _item of TodoistSDK.test(offline).User()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.User().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TodoistSDK.test().User().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TodoistSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.User().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.User().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TodoistSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.User().list({"activated_user":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TODOIST_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activated_user":{"a":true,"h":"Activated User","n":"activated_user","r":true,"sh":"Whether the user is considered activated (completed key onboarding actions)","t":"`$BOOLEAN`","key$":"activated_user","index$":0},"auto_reminder":{"a":true,"h":"Auto Reminder","n":"auto_reminder","r":true,"sh":"The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task","t":"`$INTEGER`","key$":"auto_reminder","index$":1},"avatar_big":{"a":true,"h":"Avatar Big","n":"avatar_big","r":false,"sh":"The link to a 195x195 pixels image of the user's avatar","t":"`$ANY`","key$":"avatar_big","index$":2},"avatar_medium":{"a":true,"h":"Avatar Medium","n":"avatar_medium","r":false,"sh":"The link to a 60x60 pixels image of the user's avatar","t":"`$ANY`","key$":"avatar_medium","index$":3},"avatar_s640":{"a":true,"h":"Avatar S640","n":"avatar_s640","r":false,"sh":"The link to a 640x640 pixels image of the user's avatar","t":"`$ANY`","key$":"avatar_s640","index$":4},"avatar_small":{"a":true,"h":"Avatar Small","n":"avatar_small","r":false,"sh":"The link to a 35x35 pixels image of the user's avatar","t":"`$ANY`","key$":"avatar_small","index$":5},"business_account_id":{"a":true,"h":"Business Account Id","n":"business_account_id","r":false,"sh":"The ID of the user's business account","t":"`$STRING`","key$":"business_account_id","index$":6},"completed_count":{"a":true,"h":"Completed Count","n":"completed_count","r":true,"sh":"Total number of tasks completed by user","t":"`$INTEGER`","key$":"completed_count","index$":7},"completed_today":{"a":true,"h":"Completed Today","n":"completed_today","r":true,"sh":"Number of tasks completed today by the user","t":"`$INTEGER`","key$":"completed_today","index$":8},"daily_goal":{"a":true,"h":"Daily Goal","n":"daily_goal","r":true,"sh":"The daily goal number of completed tasks for karma","t":"`$INTEGER`","key$":"daily_goal","index$":9},"date_format":{"a":true,"h":"Date Format","n":"date_format","r":true,"sh":"Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1)","t":"`$INTEGER`","key$":"date_format","index$":10},"days_off":{"a":true,"h":"Days Off","n":"days_off","r":true,"sh":"Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday)","t":"`$ARRAY`","key$":"days_off","index$":11},"deleted_at":{"a":true,"h":"Deleted At","n":"deleted_at","r":false,"sh":"Date when user was deleted (ISO 8601 format)","t":"`$ANY`","key$":"deleted_at","index$":12},"dont_notify":{"a":true,"h":"Dont Notify","n":"dont_notify","r":false,"sh":"Whether notifications should be disabled for the selected type and channel.","t":"`$ANY`","key$":"dont_notify","index$":13},"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"User's email address","t":"`$STRING`","key$":"email","index$":14},"feature_identifier":{"a":true,"h":"Feature Identifier","n":"feature_identifier","r":true,"sh":"Feature identifier for feature flag evaluations","t":"`$STRING`","key$":"feature_identifier","index$":15},"features":{"a":true,"h":"Features","n":"features","r":true,"sh":"Feature flags and settings for the user","t":"`$OBJECT`","key$":"features","index$":16},"free_trial_expires":{"a":true,"h":"Free Trial Expires","n":"free_trial_expires","r":false,"sh":"Date when free trial expires (ISO 8601 format)","t":"`$ANY`","key$":"free_trial_expires","index$":17},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":true,"sh":"The user's real name formatted as Firstname Lastname","t":"`$STRING`","key$":"full_name","index$":18},"getting_started_guide_projects":{"a":true,"h":"Getting Started Guide Projects","n":"getting_started_guide_projects","r":false,"sh":"List of project IDs for getting started guide","t":"`$ANY`","key$":"getting_started_guide_projects","index$":19},"has_magic_number":{"a":true,"h":"Has Magic Number","n":"has_magic_number","r":true,"sh":"Whether the user has reached a magic number milestone","t":"`$BOOLEAN`","key$":"has_magic_number","index$":20},"has_password":{"a":true,"h":"Has Password","n":"has_password","r":true,"sh":"Whether the user has a password set on the account.","t":"`$BOOLEAN`","key$":"has_password","index$":21},"has_started_a_trial":{"a":true,"h":"Has Started A Trial","n":"has_started_a_trial","r":true,"sh":"Whether the user has ever started a free trial","t":"`$BOOLEAN`","key$":"has_started_a_trial","index$":22},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"User ID","t":"`$STRING`","key$":"id","index$":23},"image_id":{"a":true,"h":"Image Id","n":"image_id","r":false,"sh":"The ID of the user's avatar","t":"`$STRING`","key$":"image_id","index$":24},"inbox_project_id":{"a":true,"h":"Inbox Project Id","n":"inbox_project_id","r":false,"sh":"The ID of the user's Inbox project","t":"`$STRING`","key$":"inbox_project_id","index$":25},"is_celebrations_enabled":{"a":true,"h":"Is Celebrations Enabled","n":"is_celebrations_enabled","r":true,"sh":"Whether celebration animations are enabled","t":"`$BOOLEAN`","key$":"is_celebrations_enabled","index$":26},"is_deleted":{"a":true,"h":"Is Deleted","n":"is_deleted","r":false,"sh":"Whether the user is deleted","t":"`$BOOLEAN`","key$":"is_deleted","index$":27},"is_onboarded":{"a":true,"h":"Is Onboarded","n":"is_onboarded","r":false,"sh":"Composite flag: true once all four onboarded_* criteria above are met.","t":"`$BOOLEAN`","key$":"is_onboarded","index$":28},"is_premium":{"a":true,"h":"Is Premium","n":"is_premium","r":true,"sh":"Whether the user has a Todoist Pro subscription (a true or false value)","t":"`$BOOLEAN`","key$":"is_premium","index$":29},"joinable_workspace":{"a":true,"h":"Joinable Workspace","n":"joinable_workspace","r":true,"sh":"Information about workspaces the user can join","t":"`$ANY`","key$":"joinable_workspace","index$":30},"joined_at":{"a":true,"h":"Joined At","n":"joined_at","r":false,"sh":"Date when user joined Todoist (ISO 8601 format)","t":"`$ANY`","key$":"joined_at","index$":31},"karma":{"a":true,"h":"Karma","n":"karma","r":true,"sh":"The user's karma score","t":"`$NUMBER`","key$":"karma","index$":32},"karma_trend":{"a":true,"h":"Karma Trend","n":"karma_trend","r":false,"sh":"The user's karma trend.","t":"`$ANY`","key$":"karma_trend","index$":33},"lang":{"a":true,"h":"Lang","n":"lang","r":true,"sh":"The user's language","t":"`$STRING`","key$":"lang","index$":34},"mfa_enabled":{"a":true,"h":"Mfa Enabled","n":"mfa_enabled","r":true,"sh":"Whether multi-factor authentication is enabled","t":"`$BOOLEAN`","key$":"mfa_enabled","index$":35},"next_week":{"a":true,"h":"Next Week","n":"next_week","r":true,"sh":"The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday)","t":"`$INTEGER`","key$":"next_week","index$":36},"notification_type":{"a":true,"h":"Notification Type","n":"notification_type","r":true,"sh":"Notification type to update.","t":"`$STRING`","key$":"notification_type","index$":37},"onboarded_dated_tasks_created":{"a":true,"h":"Onboarded Dated Tasks Created","n":"onboarded_dated_tasks_created","r":false,"sh":"True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks).","t":"`$ANY`","key$":"onboarded_dated_tasks_created","index$":38},"onboarded_desktop_accessed":{"a":true,"h":"Onboarded Desktop Accessed","n":"onboarded_desktop_accessed","r":false,"sh":"True once the user has synced from Web, macOS, or Windows.","t":"`$ANY`","key$":"onboarded_desktop_accessed","index$":39},"onboarded_mobile_accessed":{"a":true,"h":"Onboarded Mobile Accessed","n":"onboarded_mobile_accessed","r":false,"sh":"True once the user has synced from iOS or Android.","t":"`$ANY`","key$":"onboarded_mobile_accessed","index$":40},"onboarded_tasks_completed":{"a":true,"h":"Onboarded Tasks Completed","n":"onboarded_tasks_completed","r":false,"sh":"True once the user has completed at least 3 tasks.","t":"`$ANY`","key$":"onboarded_tasks_completed","index$":41},"onboarding_completed":{"a":true,"h":"Onboarding Completed","n":"onboarding_completed","r":true,"sh":"Whether the user has completed onboarding","t":"`$BOOLEAN`","key$":"onboarding_completed","index$":42},"onboarding_initiated":{"a":true,"h":"Onboarding Initiated","n":"onboarding_initiated","r":true,"sh":"Whether the user has initiated onboarding","t":"`$BOOLEAN`","key$":"onboarding_initiated","index$":43},"onboarding_level":{"a":true,"h":"Onboarding Level","n":"onboarding_level","r":false,"sh":"User's self-reported skill level during onboarding","t":"`$ANY`","key$":"onboarding_level","index$":44},"onboarding_persona":{"a":true,"h":"Onboarding Persona","n":"onboarding_persona","r":false,"sh":"User's onboarding persona selection","t":"`$ANY`","key$":"onboarding_persona","index$":45},"onboarding_role":{"a":true,"h":"Onboarding Role","n":"onboarding_role","r":false,"sh":"User's role selection during onboarding","t":"`$ANY`","key$":"onboarding_role","index$":46},"onboarding_started":{"a":true,"h":"Onboarding Started","n":"onboarding_started","r":true,"sh":"Whether the user has started onboarding","t":"`$BOOLEAN`","key$":"onboarding_started","index$":47},"onboarding_team_mode":{"a":true,"h":"Onboarding Team Mode","n":"onboarding_team_mode","r":false,"sh":"Whether user selected team mode during onboarding","t":"`$ANY`","key$":"onboarding_team_mode","index$":48},"onboarding_use_cases":{"a":true,"h":"Onboarding Use Cases","n":"onboarding_use_cases","r":false,"sh":"Use cases the user selected during onboarding","t":"`$ANY`","key$":"onboarding_use_cases","index$":49},"premium_status":{"a":true,"h":"Premium Status","n":"premium_status","r":false,"sh":"Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member","t":"`$ANY`","key$":"premium_status","index$":50},"premium_until":{"a":true,"h":"Premium Until","n":"premium_until","r":false,"sh":"The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user).","t":"`$ANY`","key$":"premium_until","index$":51},"service":{"a":true,"h":"Service","n":"service","r":true,"sh":"Notification channel to update.","t":"`$STRING`","key$":"service","index$":52},"share_limit":{"a":true,"h":"Share Limit","n":"share_limit","r":true,"sh":"Maximum number of collaborators allowed in shared projects","t":"`$INTEGER`","key$":"share_limit","index$":53},"sort_order":{"a":true,"h":"Sort Order","n":"sort_order","r":true,"sh":"Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1)","t":"`$INTEGER`","key$":"sort_order","index$":54},"start_day":{"a":true,"h":"Start Day","n":"start_day","r":true,"sh":"The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday)","t":"`$INTEGER`","key$":"start_day","index$":55},"start_page":{"a":true,"h":"Start Page","n":"start_page","r":true,"sh":"The user's default view on Todoist.","t":"`$STRING`","key$":"start_page","index$":56},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The user's status, shared across Todoist and Comms.","t":"`$ANY`","key$":"status","index$":57},"theme_appearance":{"a":true,"h":"Theme Appearance","n":"theme_appearance","r":true,"sh":"Whether Todoist uses a light theme, a dark theme, or follows the system appearance","t":"`$STRING`","key$":"theme_appearance","index$":58},"theme_id":{"a":true,"h":"Theme Id","n":"theme_id","r":true,"sh":"The currently selected Todoist theme (a number between 0 and 13)","t":"`$STRING`","key$":"theme_id","index$":59},"time_format":{"a":true,"h":"Time Format","n":"time_format","r":false,"sh":"Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1)","t":"`$ANY`","key$":"time_format","index$":60},"token":{"a":true,"h":"Token","n":"token","r":false,"sh":"The user's token that should be used to call the other API methods","t":"`$STRING`","key$":"token","index$":61},"tz_info":{"a":true,"h":"Tz Info","n":"tz_info","r":true,"sh":"The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t…","t":"`$OBJECT`","key$":"tz_info","index$":62},"urgent_reminder_device":{"a":true,"h":"Urgent Reminder Device","n":"urgent_reminder_device","r":false,"sh":"The device that should ring urgent reminders.","t":"`$ANY`","key$":"urgent_reminder_device","index$":63},"verification_status":{"a":true,"h":"Verification Status","n":"verification_status","r":true,"sh":"User's email verification status.","t":"`$STRING`","key$":"verification_status","index$":64},"websocket_url":{"a":true,"h":"Websocket Url","n":"websocket_url","r":true,"sh":"WebSocket URL for real-time updates","t":"`$STRING`","key$":"websocket_url","index$":65},"weekend_start_day":{"a":true,"h":"Weekend Start Day","n":"weekend_start_day","r":true,"sh":"The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday)","t":"`$INTEGER`","key$":"weekend_start_day","index$":66},"weekly_goal":{"a":true,"h":"Weekly Goal","n":"weekly_goal","r":true,"sh":"The target number of tasks to complete per week","t":"`$INTEGER`","key$":"weekly_goal","index$":67}},"id":{"field":"id","name":"id"},"name":"user","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/user","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/user","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"user"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["dont_notify","notification_type","service"],"co":{"id":"PUT /api/v1/notification_setting","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/api/v1/notification_setting","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"notification_setting"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":47}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"user_ref01","srcdatavar":"user_ref01_data","suffix":"_up0","textfield":"business_account_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_ref01"}}],"v":[],"index$":1}]}, 'User', {"GET /api/v1/user":{"protocol":"http","parameters":[]},"PUT /api/v1/notification_setting":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"notification_type":{"type":"string","enum":["note_added","item_assigned","item_completed","item_uncompleted","karma_level","share_invitation_sent","share_invitation_accepted","share_invitation_rejected","share_invitation_blocked_by_project_limit","user_left_project","user_removed_from_project","teams_workspace_upgraded","teams_workspace_canceled","teams_workspace_payment_failed","pro_trial_started","pro_trial_ended","workspace_invitation_created","workspace_invitation_accepted","workspace_invitation_rejected","project_archived","project_moved","removed_from_workspace","workspace_deleted","message","workspace_user_joined_by_domain","price_increase_new_pro_users","price_increase_new_team","price_increase_new_team_trial","price_increase_android","workspace_team_cohort_tagged"],"title":"NotificationType","description":"Notification type to update.","x-enumDescriptions":{"item_assigned":"Item Assigned","item_completed":"Item Completed","item_uncompleted":"Item Uncompleted","karma_level":"Karma Level","message":"Message","note_added":"Note Added","price_increase_android":"Price Increase Android","price_increase_new_pro_users":"Price Increase New Pro Users","price_increase_new_team":"Price Increase New Team","price_increase_new_team_trial":"Price Increase New Team Trial","pro_trial_ended":"Pro Trial Ended","pro_trial_started":"Pro Trial Started","project_archived":"Project Archived","project_moved":"Project Moved","removed_from_workspace":"Removed From Workspace","share_invitation_accepted":"Share Invitation Accepted","share_invitation_blocked_by_project_limit":"Share Invitation Blocked By Project Limit","share_invitation_rejected":"Share Invitation Rejected","share_invitation_sent":"Share Invitation Sent","teams_workspace_canceled":"Teams Workspace Canceled","teams_workspace_payment_failed":"Teams Workspace Payment Failed","teams_workspace_upgraded":"Teams Workspace Upgraded","user_left_project":"User Left Project","user_removed_from_project":"User Removed From Project","workspace_deleted":"Workspace Deleted","workspace_invitation_accepted":"Workspace Invitation Accepted","workspace_invitation_created":"Workspace Invitation Created","workspace_invitation_rejected":"Workspace Invitation Rejected","workspace_team_cohort_tagged":"Workspace Team Acquisition Cohort Tagged","workspace_user_joined_by_domain":"Workspace User Joined By Domain"},"examples":["workspace_invitation_created"],"x-ref":"#/components/schemas/NotificationType","key$":"notification_type"},"service":{"type":"string","enum":["email","push"],"title":"NotificationChannel","description":"Notification channel to update.","x-enumDescriptions":{"email":"Email","push":"Push"},"examples":["email"],"x-ref":"#/components/schemas/NotificationChannel","key$":"service"},"dont_notify":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Dont Notify","description":"Whether notifications should be disabled for the selected type and channel.","examples":[true],"key$":"dont_notify"}},"type":"object","required":["notification_type","service"],"title":"Body","x-ref":"#/components/schemas/Body_604e3e52","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_ref01_data = Object.values(setup.data.existing.user)[0] as any

    // LIST
    const user_ref01_ent = client.User()
    const user_ref01_match: any = {}

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const user_ref01_data_up0: any = {}
    user_ref01_data_up0.id = user_ref01_data.id

    const user_ref01_markdef_up0 = { name: 'business_account_id', value: 'Mark01-user_ref01_' + setup.now }
    ;(user_ref01_data_up0 as any)[user_ref01_markdef_up0.name] = user_ref01_markdef_up0.value

    const user_ref01_resdata_up0 = (await user_ref01_ent.update(user_ref01_data_up0)).data()
    assert(user_ref01_resdata_up0.id === user_ref01_data_up0.id)

    assert((user_ref01_resdata_up0 as any)[user_ref01_markdef_up0.name] === user_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TODOIST_TEST_USER_ENTID': idmap,
    'TODOIST_TEST_LIVE': 'FALSE',
    'TODOIST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TODOIST_TEST_USER_ENTID']

  const live = 'TRUE' === env.TODOIST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TODOIST_TEST_USER_ENTID']
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
  
