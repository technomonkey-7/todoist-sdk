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
(0, node_test_1.describe)('WorkspaceUserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.WorkspaceUser();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('workspace_user hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).WorkspaceUser().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).WorkspaceUser()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.WorkspaceUser().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().WorkspaceUser().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.WorkspaceUser().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.WorkspaceUser().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.WorkspaceUser().list({ "limit": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'workspace_user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "custom_sorting_applied": { "a": true, "h": "Custom Sorting Applied", "n": "custom_sorting_applied", "r": false, "sh": "Whether the user has custom project sorting enabled.", "t": "`$BOOLEAN`", "key$": "custom_sorting_applied", "index$": 0 }, "full_name": { "a": true, "h": "Full Name", "n": "full_name", "r": true, "sh": "Full name of the workspace member.", "t": "`$STRING`", "key$": "full_name", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "image_id": { "a": true, "h": "Image Id", "n": "image_id", "r": false, "sh": "Avatar image ID of the workspace member, or `null`.", "t": "`$STRING`", "key$": "image_id", "index$": 3 }, "invite_code": { "a": true, "h": "Invite Code", "n": "invite_code", "r": false, "sh": "Workspace invite code to join with.", "t": "`$ANY`", "key$": "invite_code", "index$": 4 }, "is_deleted": { "a": true, "h": "Is Deleted", "n": "is_deleted", "r": false, "sh": "Whether the workspace member is deleted.", "t": "`$BOOLEAN`", "key$": "is_deleted", "index$": 5 }, "project_sort_preference": { "a": true, "h": "Project Sort Preference", "n": "project_sort_preference", "r": false, "sh": "Project sorting preference for the user.", "t": "`$STRING`", "key$": "project_sort_preference", "index$": 6 }, "role": { "a": true, "h": "Role", "n": "role", "op": { "list": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Workspace role assigned to the user.", "t": "`$STRING`", "key$": "role", "index$": 7 }, "timezone": { "a": true, "h": "Timezone", "n": "timezone", "r": true, "sh": "Timezone of the workspace member.", "t": "`$STRING`", "key$": "timezone", "index$": 8 }, "user_email": { "a": true, "h": "User Email", "n": "user_email", "r": true, "sh": "Email address of the workspace member.", "t": "`$STRING`", "key$": "user_email", "index$": 9 }, "user_id": { "a": true, "h": "User Id", "n": "user_id", "r": true, "sh": "String ID of the workspace user.", "t": "`$STRING`", "key$": "user_id", "index$": 10 }, "workspace_id": { "a": true, "h": "Workspace Id", "n": "workspace_id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "String ID of the workspace.", "t": "`$STRING`", "key$": "workspace_id", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "workspace_user", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["app", "email_list", "role"], "co": { "id": "POST /api/v1/workspaces/{workspace_id}/users/invite", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/workspaces/{workspace_id}/users/invite", "q": { "$action": "invite", "exist": ["workspace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "users" }, { "lit": "invite" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["invite_code", "workspace_id"], "co": { "id": "POST /api/v1/workspaces/join", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/workspaces/join", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "lit": "join" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/workspaces/users", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "id", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "workspace_id", "or": "workspace_id", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/workspaces/users", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "lit": "users" }], "t": { "req": "`reqdata`", "res": "`body.workspace_users`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/workspaces/{workspace_id}/users/{user_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "user_id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/workspaces/{workspace_id}/users/{user_id}", "q": { "exist": ["id", "workspace_id"] }, "r": { "param": { "user_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "users" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["role"], "co": { "id": "POST /api/v1/workspaces/{workspace_id}/users/{user_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "user_id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/workspaces/{workspace_id}/users/{user_id}", "q": { "exist": ["id", "workspace_id"] }, "r": { "param": { "user_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "users" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.workspace"]] }, "key$": "workspace_user", "name__orig": "workspace_user", "Name": "WorkspaceUser", "name_": "workspace_user", "name-": "workspace-user", "NAME": "WORKSPACE_USER", "index$": 33 }, { "active": true, "entity": "workspace_user", "key$": "BasicWorkspaceUserFlow", "kind": "basic", "name": "BasicWorkspaceUserFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "workspace_user_ref01" }, "m": { "workspace_id": "workspace01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "workspace_user_ref01" } }], "index$": 1 }, { "a": true, "d": { "workspace_id": "workspace01" }, "i": { "ref": "workspace_user_ref01", "srcdatavar": "workspace_user_ref01_data", "suffix": "_up0", "textfield": "full_name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-workspace_user_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "workspace_user_ref01", "suffix": "_rm0" }, "m": { "id": "workspace_user01", "workspace_id": "workspace01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "workspace_user_ref01" } }], "index$": 4 }] }, 'WorkspaceUser', { "POST /api/v1/workspaces/{workspace_id}/users/invite": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "email_list": { "anyOf": [{ "items": { "type": "string", "format": "email" }, "type": "array" }, { "type": "null" }], "title": "Email List", "description": "List of user emails to invite to the workspace.", "examples": [["teammate@example.com"]] }, "role": { "anyOf": [{ "type": "string", "enum": ["ADMIN", "MEMBER", "GUEST"], "title": "WorkspaceRole", "description": "Role of the user inside the workspace", "x-enumDescriptions": { "ADMIN": "Admin", "GUEST": "Guest", "MEMBER": "Member" }, "x-ref": "#/components/schemas/WorkspaceRole" }, { "type": "null" }], "description": "Role assigned to invited users.", "examples": ["MEMBER"] }, "app": { "type": "string", "enum": ["todoist", "comms", "automations"], "title": "ProductApp", "description": "For first-party clients usage only. This attribute may be removed or changed without notice, so we strongly advise not to rely on it. Product the invitation is sent from. Products without their own invite emails are recorded as Todoist.", "x-enumDescriptions": { "automations": "Automations", "comms": "Comms", "todoist": "Todoist" }, "default": "todoist", "examples": ["comms"], "x-ref": "#/components/schemas/ProductApp" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_108b7f01" } } } }, "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "description": "ID of the workspace", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }] }, "POST /api/v1/workspaces/join": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "invite_code": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Invite Code", "description": "Workspace invite code to join with. Provide either `invite_code` or `workspace_id`, not both.", "examples": ["26d332457f16dc67f18385194be148f62c2b4317"], "key$": "invite_code" }, "workspace_id": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Workspace Id", "description": "Workspace ID to join by verified email domain. Provide either `invite_code` or `workspace_id`, not both.", "examples": [123456], "key$": "workspace_id" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_fe5aa153", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /api/v1/workspaces/users": { "protocol": "http", "parameters": [{ "name": "workspace_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "description": "ID of the workspace to list users for.", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "description": "Maximum number of workspace users to return.", "examples": [50], "default": 100, "title": "Limit" }, "index$": 2 }, { "name": "sort", "in": "query", "required": false, "schema": { "enum": ["id", "name"], "type": "string", "description": "Order workspace users by ID, or by name with the requesting user first. Name sorting requires workspace_id.", "examples": ["name"], "default": "id", "title": "Sort" }, "index$": 3 }] }, "DELETE /api/v1/workspaces/{workspace_id}/users/{user_id}": { "protocol": "http", "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "description": "ID of the workspace", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }, { "name": "user_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMaximum": 18446744073709552000, "exclusiveMinimum": 0, "description": "ID of the workspace user", "examples": [123456], "title": "User Id" }, "index$": 1 }] }, "POST /api/v1/workspaces/{workspace_id}/users/{user_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "role": { "type": "string", "enum": ["ADMIN", "MEMBER", "GUEST"], "title": "WorkspaceRole", "description": "Updated role for the user.", "x-enumDescriptions": { "ADMIN": "Admin", "GUEST": "Guest", "MEMBER": "Member" }, "examples": ["ADMIN"], "x-ref": "#/components/schemas/WorkspaceRole", "key$": "role" } }, "type": "object", "required": ["role"], "title": "Body", "x-ref": "#/components/schemas/Body_51341cd2", "index$": 1 } } } }, "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "description": "ID of the workspace", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }, { "name": "user_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMaximum": 18446744073709552000, "exclusiveMinimum": 0, "description": "ID of the workspace user", "examples": [123456], "title": "User Id" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const workspace_user_ref01_ent = client.WorkspaceUser();
        let workspace_user_ref01_data = setup.data.new.workspace_user['workspace_user_ref01'];
        workspace_user_ref01_data['workspace_id'] = setup.idmap['workspace01'];
        workspace_user_ref01_data = (await workspace_user_ref01_ent.create(workspace_user_ref01_data)).data();
        (0, node_assert_1.default)(null != workspace_user_ref01_data.id);
        // LIST
        const workspace_user_ref01_match = {};
        const workspace_user_ref01_list = (await workspace_user_ref01_ent.list(workspace_user_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(workspace_user_ref01_list, { id: workspace_user_ref01_data.id })));
        // UPDATE
        const workspace_user_ref01_data_up0 = {};
        workspace_user_ref01_data_up0.id = workspace_user_ref01_data.id;
        workspace_user_ref01_data_up0['workspace_id'] = setup.idmap['workspace_id'] ?? setup.idmap['workspace01'];
        const workspace_user_ref01_markdef_up0 = { name: 'full_name', value: 'Mark01-workspace_user_ref01_' + setup.now };
        workspace_user_ref01_data_up0[workspace_user_ref01_markdef_up0.name] = workspace_user_ref01_markdef_up0.value;
        const workspace_user_ref01_resdata_up0 = (await workspace_user_ref01_ent.update(workspace_user_ref01_data_up0)).data();
        (0, node_assert_1.default)(workspace_user_ref01_resdata_up0.id === workspace_user_ref01_data_up0.id);
        (0, node_assert_1.default)(workspace_user_ref01_resdata_up0[workspace_user_ref01_markdef_up0.name] === workspace_user_ref01_markdef_up0.value);
        // REMOVE
        const workspace_user_ref01_match_rm0 = { id: workspace_user_ref01_data.id };
        workspace_user_ref01_match_rm0['workspace_id'] = setup.idmap['workspace_id'] ?? setup.idmap['workspace01'];
        await workspace_user_ref01_ent.remove(workspace_user_ref01_match_rm0);
        // LIST
        const workspace_user_ref01_match_rt0 = {};
        const workspace_user_ref01_list_rt0 = (await workspace_user_ref01_ent.list(workspace_user_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(workspace_user_ref01_list_rt0, { id: workspace_user_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/workspace_user/WorkspaceUserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['workspace_user01', 'workspace_user02', 'workspace_user03', 'workspace01', 'workspace02', 'workspace03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_WORKSPACE_USER_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_WORKSPACE_USER_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_WORKSPACE_USER_ENTID'];
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
//# sourceMappingURL=WorkspaceUserEntity.test.js.map