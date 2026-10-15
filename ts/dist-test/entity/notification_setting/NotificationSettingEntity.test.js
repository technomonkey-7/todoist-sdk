"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('NotificationSettingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.NotificationSetting();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.NotificationSetting().update({ "notification_type": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'notification_setting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dont_notify": { "a": true, "h": "Dont Notify", "n": "dont_notify", "r": false, "sh": "Whether notifications should be disabled for the selected type and channel.", "t": "`$ANY`", "key$": "dont_notify", "index$": 0 }, "notification_type": { "a": true, "h": "Notification Type", "n": "notification_type", "r": true, "sh": "Notification type to update.", "t": "`$STRING`", "key$": "notification_type", "index$": 1 }, "service": { "a": true, "h": "Service", "n": "service", "r": true, "sh": "Notification channel to update.", "t": "`$STRING`", "key$": "service", "index$": 2 } }, "name": "notification_setting", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["dont_notify", "notification_type", "service"], "co": { "id": "PUT /api/v1/notification_setting", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PUT", "o": "/api/v1/notification_setting", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "notification_setting" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "notification_setting", "name__orig": "notification_setting", "Name": "NotificationSetting", "name_": "notification_setting", "name-": "notification-setting", "NAME": "NOTIFICATION_SETTING", "index$": 14 }, { "active": true, "entity": "notification_setting", "key$": "BasicNotificationSettingFlow", "kind": "basic", "name": "BasicNotificationSettingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "notification_setting_ref01", "srcdatavar": "notification_setting_ref01_data", "suffix": "_up0", "textfield": "notification_type" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-notification_setting_ref01" } }], "v": [], "index$": 0 }] }, 'NotificationSetting', { "PUT /api/v1/notification_setting": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "notification_type": { "type": "string", "enum": ["note_added", "item_assigned", "item_completed", "item_uncompleted", "karma_level", "share_invitation_sent", "share_invitation_accepted", "share_invitation_rejected", "share_invitation_blocked_by_project_limit", "user_left_project", "user_removed_from_project", "teams_workspace_upgraded", "teams_workspace_canceled", "teams_workspace_payment_failed", "pro_trial_started", "pro_trial_ended", "workspace_invitation_created", "workspace_invitation_accepted", "workspace_invitation_rejected", "project_archived", "project_moved", "removed_from_workspace", "workspace_deleted", "message", "workspace_user_joined_by_domain", "price_increase_new_pro_users", "price_increase_new_team", "price_increase_new_team_trial", "price_increase_android", "workspace_team_cohort_tagged"], "title": "NotificationType", "description": "Notification type to update.", "x-enumDescriptions": { "item_assigned": "Item Assigned", "item_completed": "Item Completed", "item_uncompleted": "Item Uncompleted", "karma_level": "Karma Level", "message": "Message", "note_added": "Note Added", "price_increase_android": "Price Increase Android", "price_increase_new_pro_users": "Price Increase New Pro Users", "price_increase_new_team": "Price Increase New Team", "price_increase_new_team_trial": "Price Increase New Team Trial", "pro_trial_ended": "Pro Trial Ended", "pro_trial_started": "Pro Trial Started", "project_archived": "Project Archived", "project_moved": "Project Moved", "removed_from_workspace": "Removed From Workspace", "share_invitation_accepted": "Share Invitation Accepted", "share_invitation_blocked_by_project_limit": "Share Invitation Blocked By Project Limit", "share_invitation_rejected": "Share Invitation Rejected", "share_invitation_sent": "Share Invitation Sent", "teams_workspace_canceled": "Teams Workspace Canceled", "teams_workspace_payment_failed": "Teams Workspace Payment Failed", "teams_workspace_upgraded": "Teams Workspace Upgraded", "user_left_project": "User Left Project", "user_removed_from_project": "User Removed From Project", "workspace_deleted": "Workspace Deleted", "workspace_invitation_accepted": "Workspace Invitation Accepted", "workspace_invitation_created": "Workspace Invitation Created", "workspace_invitation_rejected": "Workspace Invitation Rejected", "workspace_team_cohort_tagged": "Workspace Team Acquisition Cohort Tagged", "workspace_user_joined_by_domain": "Workspace User Joined By Domain" }, "examples": ["workspace_invitation_created"], "x-ref": "#/components/schemas/NotificationType", "key$": "notification_type" }, "service": { "type": "string", "enum": ["email", "push"], "title": "NotificationChannel", "description": "Notification channel to update.", "x-enumDescriptions": { "email": "Email", "push": "Push" }, "examples": ["email"], "x-ref": "#/components/schemas/NotificationChannel", "key$": "service" }, "dont_notify": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Dont Notify", "description": "Whether notifications should be disabled for the selected type and channel.", "examples": [true], "key$": "dont_notify" } }, "type": "object", "required": ["notification_type", "service"], "title": "Body", "x-ref": "#/components/schemas/Body_604e3e52", "index$": 1 } } }, "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let notification_setting_ref01_data = Object.values(setup.data.existing.notification_setting)[0];
        // UPDATE
        const notification_setting_ref01_ent = client.NotificationSetting();
        const notification_setting_ref01_data_up0 = {};
        const notification_setting_ref01_markdef_up0 = { name: 'notification_type', value: 'Mark01-notification_setting_ref01_' + setup.now };
        notification_setting_ref01_data_up0[notification_setting_ref01_markdef_up0.name] = notification_setting_ref01_markdef_up0.value;
        const notification_setting_ref01_resdata_up0 = (await notification_setting_ref01_ent.update(notification_setting_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != notification_setting_ref01_resdata_up0);
        (0, node_assert_1.default)(notification_setting_ref01_resdata_up0[notification_setting_ref01_markdef_up0.name] === notification_setting_ref01_markdef_up0.value);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/notification_setting/NotificationSettingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['notification_setting01', 'notification_setting02', 'notification_setting03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_NOTIFICATION_SETTING_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_NOTIFICATION_SETTING_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_NOTIFICATION_SETTING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TodoistSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=NotificationSettingEntity.test.js.map