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
(0, node_test_1.describe)('NotificationLocationSyncViewEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.NotificationLocationSyncView();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('notification_location_sync_view hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).NotificationLocationSyncView().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).NotificationLocationSyncView()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.NotificationLocationSyncView().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().NotificationLocationSyncView().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.NotificationLocationSyncView().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.NotificationLocationSyncView().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.NotificationLocationSyncView().list({ "limit": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'notification_location_sync_view.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "String ID of the location reminder", "t": "`$STRING`", "key$": "id", "index$": 0 }, "is_deleted": { "a": true, "h": "Is Deleted", "n": "is_deleted", "r": true, "sh": "Whether the location reminder is deleted", "t": "`$BOOLEAN`", "key$": "is_deleted", "index$": 1 }, "item_id": { "a": true, "h": "Item Id", "n": "item_id", "r": true, "sh": "String ID of the task", "t": "`$STRING`", "key$": "item_id", "index$": 2 }, "loc_lat": { "a": true, "h": "Loc Lat", "n": "loc_lat", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Latitude of the location", "t": "`$STRING`", "key$": "loc_lat", "index$": 3 }, "loc_long": { "a": true, "h": "Loc Long", "n": "loc_long", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Longitude of the location", "t": "`$STRING`", "key$": "loc_long", "index$": 4 }, "loc_trigger": { "a": true, "h": "Loc Trigger", "n": "loc_trigger", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Trigger type for the location reminder", "t": "`$STRING`", "key$": "loc_trigger", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Name of the location", "t": "`$STRING`", "key$": "name", "index$": 6 }, "notify_uid": { "a": true, "h": "Notify Uid", "n": "notify_uid", "r": true, "sh": "String ID of the user who will receive the reminder", "t": "`$STRING`", "key$": "notify_uid", "index$": 7 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": true, "sh": "String ID of the project containing the task", "t": "`$STRING`", "key$": "project_id", "index$": 8 }, "radius": { "a": true, "h": "Radius", "n": "radius", "op": { "create": { "req": false, "type": "`$INTEGER`" } }, "r": true, "sh": "Radius in meters", "t": "`$INTEGER`", "key$": "radius", "index$": 9 }, "task_id": { "a": true, "h": "Task Id", "n": "task_id", "r": true, "sh": "String ID of the task", "t": "`$STRING`", "key$": "task_id", "index$": 10 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The reminder type", "t": "`$STRING`", "key$": "type", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "notification_location_sync_view", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["loc_lat", "loc_long", "loc_trigger", "name", "radius"], "co": { "id": "POST /api/v1/location_reminders/{reminder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "reminder_id", "or": "reminder_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/location_reminders/{reminder_id}", "q": { "exist": ["reminder_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "location_reminders" }, { "var": "reminder_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["loc_lat", "loc_long", "loc_trigger", "name", "radius", "task_id"], "co": { "id": "POST /api/v1/location_reminders", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/location_reminders", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "location_reminders" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/location_reminders", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "task_id", "or": "task_id", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/location_reminders", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "location_reminders" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/location_reminders/{reminder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "reminder_id", "or": "reminder_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/location_reminders/{reminder_id}", "q": { "exist": ["reminder_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "location_reminders" }, { "var": "reminder_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.location_reminder"]] }, "key$": "notification_location_sync_view", "name__orig": "notification_location_sync_view", "Name": "NotificationLocationSyncView", "name_": "notification_location_sync_view", "name-": "notification-location-sync-view", "NAME": "NOTIFICATION_LOCATION_SYNC_VIEW", "index$": 20 }, { "active": true, "entity": "notification_location_sync_view", "key$": "BasicNotificationLocationSyncViewFlow", "kind": "basic", "name": "BasicNotificationLocationSyncViewFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "notification_location_sync_view_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "notification_location_sync_view_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "notification_location_sync_view_ref01", "srcdatavar": "notification_location_sync_view_ref01_data", "suffix": "_dt0" }, "m": { "id": "notification_location_sync_view01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-notification_location_sync_view_ref01" } }], "unreachable": true }] }, 'NotificationLocationSyncView', { "POST /api/v1/location_reminders/{reminder_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "anyOf": [{ "type": "string", "maxLength": 255, "minLength": 1 }, { "type": "null" }], "title": "Name", "description": "Name of the location. If not provided (or null), the value remains unchanged.", "examples": ["Office"], "key$": "name" }, "loc_lat": { "anyOf": [{ "type": "string", "maxLength": 20, "minLength": 1 }, { "type": "null" }], "title": "Loc Lat", "description": "Latitude of the location. If not provided (or null), the value remains unchanged.", "examples": ["40.416775"], "key$": "loc_lat" }, "loc_long": { "anyOf": [{ "type": "string", "maxLength": 20, "minLength": 1 }, { "type": "null" }], "title": "Loc Long", "description": "Longitude of the location. If not provided (or null), the value remains unchanged.", "examples": ["-3.703790"], "key$": "loc_long" }, "loc_trigger": { "anyOf": [{ "type": "string", "enum": ["on_enter", "on_leave"] }, { "type": "null" }], "title": "Loc Trigger", "description": "Trigger type: 'on_enter' or 'on_leave'. If not provided (or null), the value remains unchanged.", "examples": ["on_enter"], "key$": "loc_trigger" }, "radius": { "anyOf": [{ "type": "integer", "maximum": 255, "minimum": 1 }, { "type": "null" }], "title": "Radius", "description": "Radius in meters. If not provided (or null), the value remains unchanged.", "examples": [100], "key$": "radius" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_9c2f879b", "index$": 1 } } } }, "parameters": [{ "name": "reminder_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the location reminder", "examples": ["6XGgmFQrx44wfGHr"], "title": "Reminder Id" }, "index$": 0 }] }, "POST /api/v1/location_reminders": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "task_id": { "type": "string", "description": "String ID of the task", "examples": ["6XGgmFVcrG5RRjVr"], "x-ref": "#/components/schemas/LocationReminderTaskIDAttribute", "key$": "task_id" }, "name": { "type": "string", "maxLength": 255, "minLength": 1, "title": "Name", "description": "Name of the location", "examples": ["Home"], "key$": "name" }, "loc_lat": { "type": "string", "maxLength": 20, "minLength": 1, "title": "Loc Lat", "description": "Latitude of the location", "examples": ["37.7749"], "key$": "loc_lat" }, "loc_long": { "type": "string", "maxLength": 20, "minLength": 1, "title": "Loc Long", "description": "Longitude of the location", "examples": ["-122.4194"], "key$": "loc_long" }, "loc_trigger": { "type": "string", "enum": ["on_enter", "on_leave"], "title": "Loc Trigger", "description": "Trigger type: 'on_enter' or 'on_leave'", "examples": ["on_enter"], "key$": "loc_trigger" }, "radius": { "type": "integer", "maximum": 255, "minimum": 1, "title": "Radius", "description": "Radius in meters (default 100, max 255)", "default": 100, "examples": [100], "key$": "radius" } }, "type": "object", "required": ["task_id", "name", "loc_lat", "loc_long", "loc_trigger"], "title": "Body", "x-ref": "#/components/schemas/Body_4c96330f", "index$": 1 } } } }, "parameters": [] }, "GET /api/v1/location_reminders": { "protocol": "http", "parameters": [{ "name": "task_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "String ID of the task", "examples": ["6XGgmFVcrG5RRjVr"], "title": "Task Id" }, "index$": 0 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 200, "exclusiveMinimum": 0, "description": "The number of objects to return in a page", "examples": [50], "default": 50, "title": "Limit" }, "index$": 2 }] }, "GET /api/v1/location_reminders/{reminder_id}": { "protocol": "http", "parameters": [{ "name": "reminder_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the location reminder", "examples": ["6XGgmFQrx44wfGHr"], "title": "Reminder Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const notification_location_sync_view_ref01_ent = client.NotificationLocationSyncView();
        let notification_location_sync_view_ref01_data = setup.data.new.notification_location_sync_view['notification_location_sync_view_ref01'];
        notification_location_sync_view_ref01_data = (await notification_location_sync_view_ref01_ent.create(notification_location_sync_view_ref01_data)).data();
        (0, node_assert_1.default)(null != notification_location_sync_view_ref01_data.id);
        // LIST
        const notification_location_sync_view_ref01_match = {};
        const notification_location_sync_view_ref01_list = (await notification_location_sync_view_ref01_ent.list(notification_location_sync_view_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(notification_location_sync_view_ref01_list, { id: notification_location_sync_view_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/notification_location_sync_view/NotificationLocationSyncViewTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['notification_location_sync_view01', 'notification_location_sync_view02', 'notification_location_sync_view03', 'location_reminder01', 'location_reminder02', 'location_reminder03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_NOTIFICATION_LOCATION_SYNC_VIEW_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_NOTIFICATION_LOCATION_SYNC_VIEW_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_NOTIFICATION_LOCATION_SYNC_VIEW_ENTID'];
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
//# sourceMappingURL=NotificationLocationSyncViewEntity.test.js.map