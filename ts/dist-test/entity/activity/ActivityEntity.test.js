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
(0, node_test_1.describe)('ActivityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.Activity();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('activity hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).Activity().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).Activity()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Activity().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().Activity().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Activity().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Activity().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Activity().list({ "annotate_note": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'activity.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "event_date": { "a": true, "fo": "date-time", "h": "Event Date", "n": "event_date", "r": true, "sh": "The timestamp when this activity occurred.", "t": "`$STRING`", "key$": "event_date", "index$": 0 }, "event_type": { "a": true, "h": "Event Type", "n": "event_type", "r": true, "sh": "The type of event that occurred.", "t": "`$STRING`", "key$": "event_type", "index$": 1 }, "extra_data": { "a": true, "h": "Extra Data", "n": "extra_data", "r": false, "sh": "This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`…", "t": "`$ANY`", "key$": "extra_data", "index$": 2 }, "extra_data_id": { "a": true, "h": "Extra Data Id", "n": "extra_data_id", "r": false, "sh": "Internal ID for the extra activity data row.", "t": "`$STRING`", "key$": "extra_data_id", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The internal unique identifier for this activity log entry.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "initiator_id": { "a": true, "h": "Initiator Id", "n": "initiator_id", "r": false, "t": "`$STRING`", "key$": "initiator_id", "index$": 5 }, "object_id": { "a": true, "h": "Object Id", "n": "object_id", "r": true, "sh": "The unique identifier of the object this activity relates to (project, item, note, or section ID).", "t": "`$STRING`", "key$": "object_id", "index$": 6 }, "object_type": { "a": true, "h": "Object Type", "n": "object_type", "r": true, "sh": "The type of object this activity relates to.", "t": "`$STRING`", "key$": "object_type", "index$": 7 }, "parent_item_id": { "a": true, "h": "Parent Item Id", "n": "parent_item_id", "r": false, "sh": "For note (comment) activities, the ID of the item (task) that the note is attached to.", "t": "`$STRING`", "key$": "parent_item_id", "index$": 8 }, "parent_project_id": { "a": true, "h": "Parent Project Id", "n": "parent_project_id", "r": false, "sh": "The ID of the project that contains the object this activity relates to.", "t": "`$STRING`", "key$": "parent_project_id", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "activity", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/activities", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "annotate_note", "or": "annotate_notes", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": false, "k": "query", "n": "annotate_parent", "or": "annotate_parents", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 2 }, { "a": true, "k": "query", "n": "date_from", "or": "date_from", "r": false, "t": "`$ANY`", "index$": 3 }, { "a": true, "k": "query", "n": "date_to", "or": "date_to", "r": false, "t": "`$ANY`", "index$": 4 }, { "a": true, "ex": false, "k": "query", "n": "ensure_last_state", "or": "ensure_last_state", "r": false, "t": "`$BOOLEAN`", "index$": 5 }, { "a": true, "k": "query", "n": "event_type", "or": "event_type", "r": false, "t": "`$ANY`", "index$": 6 }, { "a": true, "ex": false, "k": "query", "n": "include_child_object", "or": "include_child_objects", "r": false, "t": "`$BOOLEAN`", "index$": 7 }, { "a": true, "ex": false, "k": "query", "n": "include_parent_object", "or": "include_parent_object", "r": false, "t": "`$BOOLEAN`", "index$": 8 }, { "a": true, "k": "query", "n": "initiator_id", "or": "initiator_id", "r": false, "t": "`$STRING`", "index$": 9 }, { "a": true, "k": "query", "n": "initiator_id_null", "or": "initiator_id_null", "r": false, "t": "`$ANY`", "index$": 10 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 11 }, { "a": true, "k": "query", "n": "object_event_type", "or": "object_event_types", "r": false, "t": "`$ANY`", "index$": 12 }, { "a": true, "k": "query", "n": "object_id", "or": "object_id", "r": false, "t": "`$STRING`", "index$": 13 }, { "a": true, "k": "query", "n": "object_type", "or": "object_type", "r": false, "t": "`$ANY`", "index$": 14 }, { "a": true, "k": "query", "n": "parent_item_id", "or": "parent_item_id", "r": false, "t": "`$STRING`", "index$": 15 }, { "a": true, "k": "query", "n": "parent_project_id", "or": "parent_project_id", "r": false, "t": "`$STRING`", "index$": 16 }, { "a": true, "k": "query", "n": "workspace_id", "or": "workspace_id", "r": false, "t": "`$STRING`", "index$": 17 }] }, "k": "http", "m": "GET", "o": "/api/v1/activities", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "activities" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "activity", "name__orig": "activity", "Name": "Activity", "name_": "activity", "name-": "activity", "NAME": "ACTIVITY", "index$": 0 }, { "active": true, "entity": "activity", "key$": "BasicActivityFlow", "kind": "basic", "name": "BasicActivityFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "activity_ref01" } }], "index$": 0 }] }, 'Activity', { "GET /api/v1/activities": { "protocol": "http", "parameters": [{ "name": "object_type", "in": "query", "required": false, "schema": { "anyOf": [{ "enum": ["project", "item", "note", "section"], "type": "string" }, { "type": "null" }], "description": "The type of object to filter activities by. Must be one of \"project\", \"item\" (task), \"note\" (comment), or \"section\". When specified with `object_id`, returns activities for that specific object.", "examples": ["item"], "title": "Object Type" }, "index$": 0 }, { "name": "object_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer" }, { "type": "string" }, { "type": "null" }], "description": "The ID of the specific object to get activities for. Must be used together with `object_type`. For example, to get activities for a specific task, set `object_type=item` and `object_id=<task_id>`.", "examples": ["6XGgmFVcrG5RRjVr"], "title": "Object Id" }, "index$": 1 }, { "name": "parent_project_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer" }, { "type": "string" }, { "type": "null" }], "description": "Filter activities to only those belonging to the specified project. Returns activities for the project itself and all its tasks and comments.", "examples": ["6XGgm6PHrGgMpCFX"], "title": "Parent Project Id" }, "index$": 2 }, { "name": "parent_item_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer" }, { "type": "string" }, { "type": "null" }], "description": "Filter activities to only those belonging to the specified task. Returns activities for the task itself and all its comments.", "examples": ["6XGgmFVcrG5RRjVr"], "title": "Parent Item Id" }, "index$": 3 }, { "name": "include_parent_object", "in": "query", "required": false, "schema": { "type": "boolean", "description": "When `true` and `object_id` is specified, also include activities for the parent object. For example, when filtering by a specific task, also include activities for its parent project.", "examples": [false], "default": false, "title": "Include Parent Object" }, "index$": 4 }, { "name": "include_child_objects", "in": "query", "required": false, "schema": { "type": "boolean", "description": "When `true` and `object_id` is specified, also include activities for all child objects. For example, when filtering by a project, also include activities for all its tasks and comments.", "examples": [false], "default": false, "title": "Include Child Objects" }, "index$": 5 }, { "name": "initiator_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer" }, { "type": "array", "items": { "type": "integer" } }, { "type": "null" }], "description": "Filter activities to only those initiated by the specified user ID(s). Accepts either a single user ID or a list of user IDs. Useful for shared projects to see who made which changes.", "examples": [123456], "title": "Initiator Id" }, "index$": 6 }, { "name": "initiator_id_null", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "description": "Filter by whether the activity has an initiator. When `true`, returns only activities with no initiator (your own activities). When `false`, returns only activities initiated by collaborators.", "examples": [false], "title": "Initiator Id Null" }, "index$": 7 }, { "name": "event_type", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "Filter by a simple event type (e.g., \"added\", \"deleted\", \"completed\"). Returns events of this type across ALL object types that support it. Valid types: \"added\", \"deleted\", \"updated\", \"archived\", \"unarchived\", \"completed\", \"uncompleted\", \"shared\", \"left\", \"moved\". Prefix the value with `!` to negate the filter and return all events EXCEPT this type (e.g., \"!deleted\"). For more precise filtering by both object type and event type, use `object_event_types` instead.", "examples": ["added", "deleted", "completed", "updated", "!deleted"], "title": "Event Type" }, "index$": 8 }, { "name": "ensure_last_state", "in": "query", "required": false, "schema": { "type": "boolean", "description": "**Deprecated** - This parameter has no implementation and will be removed in a future version.", "examples": [false], "default": false, "title": "Ensure Last State" }, "index$": 9 }, { "name": "object_event_types", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "array", "items": { "type": "string" } }, { "type": "null" }], "description": "Advanced filtering for specific object type and event type combinations. Format: `[\"object_type:event_type\"]`. Examples: `[\"item:deleted\"]` for deleted tasks, `[\"item:\"]` for all task events, `[\":deleted\"]` for all delete events across all types, `[\"item:deleted\", \"note:added\"]` for multiple filters. Valid event types: \"added\", \"deleted\", \"updated\", \"completed\", \"uncompleted\", \"archived\", \"unarchived\", \"shared\", \"left\", \"moved\". This is the recommended way to filter events.", "examples": [["item:deleted"], ["item:", "note:added"], [":deleted"]], "title": "Object Event Types" }, "index$": 10 }, { "name": "workspace_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer" }, { "type": "array", "items": { "anyOf": [{ "type": "integer" }, { "type": "null" }] } }, { "type": "null" }], "description": "Filter activities by workspace. Accepts a single workspace ID, a list of workspace IDs, or `null` to filter for personal projects (projects not belonging to any workspace). Use `[null, 123]` to include both personal projects and workspace 123. When not set, returns activities from all workspaces and personal projects.", "examples": [123456], "title": "Workspace Id" }, "index$": 11 }, { "name": "annotate_notes", "in": "query", "required": false, "schema": { "type": "boolean", "description": "When `true`, includes additional information about comments in the `extra_data` field, such as the content of the comment.", "examples": [false], "default": false, "title": "Annotate Notes" }, "index$": 12 }, { "name": "annotate_parents", "in": "query", "required": false, "schema": { "type": "boolean", "description": "When `true`, includes additional information about parent objects in the `extra_data` field, such as the name of the parent project or task.", "examples": [false], "default": false, "title": "Annotate Parents" }, "index$": 13 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "description": "Pagination cursor for fetching the next page of results. Use the value returned in the `next_cursor` field from a previous response.", "title": "Cursor" }, "index$": 14 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 200, "exclusiveMinimum": 0, "description": "The number of objects to return in a page", "examples": [50], "default": 50, "title": "Limit" }, "index$": 15 }, { "name": "date_from", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "format": "date-time" }, { "type": "null" }], "description": "Filter activities to only those that occurred on or after this date. Must be in ISO 8601 format (e.g. '2026-01-01T00:00:00Z'). When specified, overrides the default pagination behavior and allows custom date ranges.", "examples": ["2026-01-01", "2026-01-01T00:00:00Z"], "title": "Date From" }, "index$": 16 }, { "name": "date_to", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "format": "date-time" }, { "type": "null" }], "description": "Filter activities to only those that occurred before this date (exclusive upper bound). Must be in ISO 8601 format (e.g. '2026-02-01T00:00:00Z'). When specified, overrides the default pagination behavior and allows custom date ranges.", "examples": ["2026-02-01T00:00:00Z"], "title": "Date To" }, "index$": 17 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let activity_ref01_data = Object.values(setup.data.existing.activity)[0];
        // LIST
        const activity_ref01_ent = client.Activity();
        const activity_ref01_match = {};
        const activity_ref01_list = (await activity_ref01_ent.list(activity_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/activity/ActivityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['activity01', 'activity02', 'activity03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_ACTIVITY_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_ACTIVITY_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_ACTIVITY_ENTID'];
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
//# sourceMappingURL=ActivityEntity.test.js.map