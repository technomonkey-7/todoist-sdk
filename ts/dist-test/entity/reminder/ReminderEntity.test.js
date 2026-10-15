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
(0, node_test_1.describe)('ReminderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.Reminder();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('reminder hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).Reminder().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).Reminder()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Reminder().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().Reminder().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Reminder().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Reminder().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Reminder().list({ "limit": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reminder.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "due": { "a": true, "h": "Due", "n": "due", "op": { "create": { "req": false, "type": "`$ANY`" }, "update": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Datetime when the reminder fires, or `null` if unset.", "t": "`$ANY`", "key$": "due", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "String ID of the reminder.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "is_deleted": { "a": true, "h": "Is Deleted", "n": "is_deleted", "r": true, "sh": "Whether the reminder is deleted.", "t": "`$BOOLEAN`", "key$": "is_deleted", "index$": 2 }, "is_urgent": { "a": true, "h": "Is Urgent", "n": "is_urgent", "op": { "create": { "req": false, "type": "`$BOOLEAN`" }, "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "sh": "Whether the reminder should be delivered urgently.", "t": "`$BOOLEAN`", "key$": "is_urgent", "index$": 3 }, "item_id": { "a": true, "h": "Item Id", "n": "item_id", "r": true, "sh": "String ID of the task that owns the reminder.", "t": "`$STRING`", "key$": "item_id", "index$": 4 }, "minute_offset": { "a": true, "h": "Minute Offset", "n": "minute_offset", "op": { "create": { "req": false, "type": "`$ANY`" }, "update": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Minutes before the task due time for relative reminders.", "t": "`$ANY`", "key$": "minute_offset", "index$": 5 }, "notify_uid": { "a": true, "h": "Notify Uid", "n": "notify_uid", "r": true, "sh": "String ID of the user who receives the reminder.", "t": "`$STRING`", "key$": "notify_uid", "index$": 6 }, "reminder_type": { "a": true, "h": "Reminder Type", "n": "reminder_type", "r": false, "sh": "Type of the reminder: 'relative' or 'absolute'", "t": "`$STRING`", "key$": "reminder_type", "index$": 7 }, "service": { "a": true, "h": "Service", "n": "service", "r": false, "sh": "Notification service type: 'email', 'push'.", "t": "`$STRING`", "key$": "service", "index$": 8 }, "task_id": { "a": true, "h": "Task Id", "n": "task_id", "r": true, "sh": "String ID of the task", "t": "`$STRING`", "key$": "task_id", "index$": 9 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "Reminder type.", "t": "`$STRING`", "key$": "type", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "reminder", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["due", "is_urgent", "minute_offset", "reminder_type", "service", "task_id"], "co": { "id": "POST /api/v1/reminders", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/reminders", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reminders" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/reminders", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "task_id", "or": "task_id", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/reminders", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reminders" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/reminders/{reminder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "reminder_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/reminders/{reminder_id}", "q": { "exist": ["id"] }, "r": { "param": { "reminder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reminders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/reminders/{reminder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "reminder_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/reminders/{reminder_id}", "q": { "exist": ["id"] }, "r": { "param": { "reminder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reminders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["due", "is_urgent", "minute_offset", "service"], "co": { "id": "POST /api/v1/reminders/{reminder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "reminder_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/reminders/{reminder_id}", "q": { "exist": ["id"] }, "r": { "param": { "reminder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reminders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "reminder", "name__orig": "reminder", "Name": "Reminder", "name_": "reminder", "name-": "reminder", "NAME": "REMINDER", "index$": 20 }, { "active": true, "entity": "reminder", "key$": "BasicReminderFlow", "kind": "basic", "name": "BasicReminderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "reminder_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "reminder_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "reminder_ref01", "srcdatavar": "reminder_ref01_data", "suffix": "_up0", "textfield": "item_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-reminder_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "reminder_ref01", "srcdatavar": "reminder_ref01_data", "suffix": "_dt0" }, "m": { "id": "reminder01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-reminder_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "reminder_ref01", "suffix": "_rm0" }, "m": { "id": "reminder01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "reminder_ref01" } }], "index$": 5 }] }, 'Reminder', { "POST /api/v1/reminders": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "task_id": { "type": "string", "description": "String ID of the task", "examples": ["6XGgmFVcrG5RRjVr"], "x-ref": "#/components/schemas/ReminderTaskIDAttribute", "key$": "task_id" }, "reminder_type": { "type": "string", "enum": ["relative", "absolute"], "title": "Reminder Type", "description": "Type of the reminder: 'relative' or 'absolute'", "default": "relative", "examples": ["relative"], "key$": "reminder_type" }, "minute_offset": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Minute Offset", "description": "Minutes before due time to trigger (for relative reminders)", "examples": [30], "key$": "minute_offset" }, "due": { "anyOf": [{ "properties": { "date": {}, "string": {}, "lang": {}, "timezone": {}, "is_recurring": {} }, "type": "object", "title": "ReminderDueAttribute", "description": "Due date input for absolute reminders.", "x-ref": "#/components/schemas/ReminderDueAttribute" }, { "type": "null" }], "description": "Due date dictionary for absolute reminders.", "examples": [{ "date": "2025-02-12T09:00:00", "lang": "en", "timezone": "Europe/Madrid" }], "key$": "due" }, "service": { "type": "string", "enum": ["email", "push"], "description": "Notification service type: 'email', 'push'.", "examples": ["email"], "title": "Service", "x-ref": "#/components/schemas/ReminderServiceTypeAttribute", "key$": "service" }, "is_urgent": { "type": "boolean", "description": "Whether the reminder is an urgent reminder. Urgent reminders trigger an alarm notification on the user's designated urgent reminder device.", "examples": [false], "default": false, "x-ref": "#/components/schemas/ReminderIsUrgentAttribute", "key$": "is_urgent" } }, "type": "object", "required": ["task_id"], "title": "Body", "x-ref": "#/components/schemas/Body_958e83bd", "index$": 1 } } } }, "parameters": [] }, "GET /api/v1/reminders": { "protocol": "http", "parameters": [{ "name": "task_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "String ID of the task", "examples": ["6XGgmFVcrG5RRjVr"], "title": "Task Id" }, "index$": 0 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 200, "exclusiveMinimum": 0, "description": "The number of objects to return in a page", "examples": [50], "default": 50, "title": "Limit" }, "index$": 2 }] }, "GET /api/v1/reminders/{reminder_id}": { "protocol": "http", "parameters": [{ "name": "reminder_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the reminder", "examples": ["6XGgmFQrx44wfGHr"], "title": "Reminder Id" }, "index$": 0 }] }, "DELETE /api/v1/reminders/{reminder_id}": { "protocol": "http", "parameters": [{ "name": "reminder_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the reminder", "examples": ["6XGgmFQrx44wfGHr"], "title": "Reminder Id" }, "index$": 0 }] }, "POST /api/v1/reminders/{reminder_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "minute_offset": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Minute Offset", "description": "Minutes before due time to trigger (for relative reminders).", "examples": [30], "key$": "minute_offset" }, "due": { "anyOf": [{ "properties": { "date": {}, "string": {}, "lang": {}, "timezone": {}, "is_recurring": {} }, "type": "object", "title": "ReminderDueAttribute", "description": "Due date input for absolute reminders.", "x-ref": "#/components/schemas/ReminderDueAttribute" }, { "type": "null" }], "description": "Due date dictionary for absolute reminders.", "examples": [{ "date": "2025-02-12T09:00:00", "lang": "en", "timezone": "Europe/Madrid" }], "key$": "due" }, "service": { "type": "string", "enum": ["email", "push"], "title": "Service", "description": "Notification service type: 'email', 'push'.", "examples": ["email"], "x-ref": "#/components/schemas/ReminderServiceType", "key$": "service" }, "is_urgent": { "type": "boolean", "description": "Whether the reminder is an urgent reminder. Urgent reminders trigger an alarm notification on the user's designated urgent reminder device. Omit this field to keep it unchanged.", "examples": [false], "x-ref": "#/components/schemas/UpdateReminderIsUrgentAttribute", "key$": "is_urgent" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_0d5e560b", "index$": 1 } } } }, "parameters": [{ "name": "reminder_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the reminder", "examples": ["6XGgmFQrx44wfGHr"], "title": "Reminder Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const reminder_ref01_ent = client.Reminder();
        let reminder_ref01_data = setup.data.new.reminder['reminder_ref01'];
        reminder_ref01_data = (await reminder_ref01_ent.create(reminder_ref01_data)).data();
        (0, node_assert_1.default)(null != reminder_ref01_data.id);
        // LIST
        const reminder_ref01_match = {};
        const reminder_ref01_list = (await reminder_ref01_ent.list(reminder_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(reminder_ref01_list, { id: reminder_ref01_data.id })));
        // UPDATE
        const reminder_ref01_data_up0 = {};
        reminder_ref01_data_up0.id = reminder_ref01_data.id;
        const reminder_ref01_markdef_up0 = { name: 'item_id', value: 'Mark01-reminder_ref01_' + setup.now };
        reminder_ref01_data_up0[reminder_ref01_markdef_up0.name] = reminder_ref01_markdef_up0.value;
        const reminder_ref01_resdata_up0 = (await reminder_ref01_ent.update(reminder_ref01_data_up0)).data();
        (0, node_assert_1.default)(reminder_ref01_resdata_up0.id === reminder_ref01_data_up0.id);
        (0, node_assert_1.default)(reminder_ref01_resdata_up0[reminder_ref01_markdef_up0.name] === reminder_ref01_markdef_up0.value);
        // LOAD
        const reminder_ref01_match_dt0 = {};
        reminder_ref01_match_dt0.id = reminder_ref01_data.id;
        const reminder_ref01_data_dt0 = (await reminder_ref01_ent.load(reminder_ref01_match_dt0)).data();
        (0, node_assert_1.default)(reminder_ref01_data_dt0.id === reminder_ref01_data.id);
        // REMOVE
        const reminder_ref01_match_rm0 = { id: reminder_ref01_data.id };
        await reminder_ref01_ent.remove(reminder_ref01_match_rm0);
        // LIST
        const reminder_ref01_match_rt0 = {};
        const reminder_ref01_list_rt0 = (await reminder_ref01_ent.list(reminder_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(reminder_ref01_list_rt0, { id: reminder_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reminder/ReminderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reminder01', 'reminder02', 'reminder03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_REMINDER_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_REMINDER_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_REMINDER_ENTID'];
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
//# sourceMappingURL=ReminderEntity.test.js.map