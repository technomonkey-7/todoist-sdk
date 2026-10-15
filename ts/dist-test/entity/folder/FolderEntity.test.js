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
(0, node_test_1.describe)('FolderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.Folder();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('folder hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).Folder().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).Folder()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Folder().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().Folder().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Folder().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Folder().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Folder().list({ "limit": "x", "workspace_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'folder.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "child_order": { "a": true, "h": "Child Order", "n": "child_order", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "User-specific position of the folder.", "t": "`$INTEGER`", "key$": "child_order", "index$": 0 }, "default_order": { "a": true, "h": "Default Order", "n": "default_order", "op": { "create": { "req": false, "type": "`$ANY`" }, "update": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Default position of the folder in the workspace.", "t": "`$INTEGER`", "key$": "default_order", "index$": 1 }, "default_order_key": { "a": true, "h": "Default Order Key", "n": "default_order_key", "r": true, "sh": "Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together).", "t": "`$ANY`", "key$": "default_order_key", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "String ID of the folder.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "is_deleted": { "a": true, "h": "Is Deleted", "n": "is_deleted", "r": true, "sh": "Whether the folder is deleted.", "t": "`$BOOLEAN`", "key$": "is_deleted", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Folder name.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "workspace_id": { "a": true, "h": "Workspace Id", "n": "workspace_id", "r": true, "sh": "String ID of the workspace that contains the folder.", "t": "`$STRING`", "key$": "workspace_id", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "folder", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["child_order", "default_order", "name", "workspace_id"], "co": { "id": "POST /api/v1/folders", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/folders", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "folders" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/folders", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/folders", "q": { "exist": ["workspace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "folders" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/folders/{folder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "folder_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/folders/{folder_id}", "q": { "exist": ["id"] }, "r": { "param": { "folder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "folders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/folders/{folder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "folder_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/folders/{folder_id}", "q": { "exist": ["id"] }, "r": { "param": { "folder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "folders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["default_order", "name"], "co": { "id": "POST /api/v1/folders/{folder_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "folder_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/folders/{folder_id}", "q": { "exist": ["id"] }, "r": { "param": { "folder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "folders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "folder", "name__orig": "folder", "Name": "Folder", "name_": "folder", "name-": "folder", "NAME": "FOLDER", "index$": 9 }, { "active": true, "entity": "folder", "key$": "BasicFolderFlow", "kind": "basic", "name": "BasicFolderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "folder_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "folder_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "folder_ref01", "srcdatavar": "folder_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-folder_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "folder_ref01", "srcdatavar": "folder_ref01_data", "suffix": "_dt0" }, "m": { "id": "folder01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-folder_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "folder_ref01", "suffix": "_rm0" }, "m": { "id": "folder01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "folder_ref01" } }], "index$": 5 }] }, 'Folder', { "POST /api/v1/folders": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "type": "string", "title": "Name", "description": "Name of the new folder.", "examples": ["Design"], "key$": "name" }, "workspace_id": { "type": "integer", "title": "Workspace Id", "description": "ID of the workspace to create the folder in.", "examples": [123456], "key$": "workspace_id" }, "default_order": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Default Order", "description": "Default position of the folder in the workspace.", "examples": [1], "key$": "default_order" }, "child_order": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Child Order", "description": "User-specific position of the folder.", "examples": [1], "key$": "child_order" } }, "type": "object", "required": ["name", "workspace_id"], "title": "Body", "x-ref": "#/components/schemas/Body_c04ca410", "index$": 1 } } } }, "parameters": [] }, "GET /api/v1/folders": { "protocol": "http", "parameters": [{ "name": "workspace_id", "in": "query", "required": true, "schema": { "type": "integer", "description": "ID of the workspace to list folders for.", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 200, "exclusiveMinimum": 0, "description": "The number of objects to return in a page", "examples": [50], "default": 50, "title": "Limit" }, "index$": 2 }] }, "GET /api/v1/folders/{folder_id}": { "protocol": "http", "parameters": [{ "name": "folder_id", "in": "path", "required": true, "schema": { "type": "integer", "description": "ID of the folder to return.", "examples": [1234], "title": "Folder Id" }, "index$": 0 }] }, "DELETE /api/v1/folders/{folder_id}": { "protocol": "http", "parameters": [{ "name": "folder_id", "in": "path", "required": true, "schema": { "type": "integer", "description": "ID of the folder to delete.", "examples": [1234], "title": "Folder Id" }, "index$": 0 }] }, "POST /api/v1/folders/{folder_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Name", "description": "Updated folder name. Passing null or omitting this field will leave it unchanged.", "examples": ["Design"], "key$": "name" }, "default_order": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Default Order", "description": "Updated default position of the folder. Passing null or omitting this field will leave it unchanged.", "examples": [1], "key$": "default_order" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_09503d19", "index$": 1 } } } }, "parameters": [{ "name": "folder_id", "in": "path", "required": true, "schema": { "type": "integer", "description": "ID of the folder to update.", "examples": [1234], "title": "Folder Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const folder_ref01_ent = client.Folder();
        let folder_ref01_data = setup.data.new.folder['folder_ref01'];
        folder_ref01_data = (await folder_ref01_ent.create(folder_ref01_data)).data();
        (0, node_assert_1.default)(null != folder_ref01_data.id);
        // LIST
        const folder_ref01_match = {};
        const folder_ref01_list = (await folder_ref01_ent.list(folder_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(folder_ref01_list, { id: folder_ref01_data.id })));
        // UPDATE
        const folder_ref01_data_up0 = {};
        folder_ref01_data_up0.id = folder_ref01_data.id;
        const folder_ref01_markdef_up0 = { name: 'name', value: 'Mark01-folder_ref01_' + setup.now };
        folder_ref01_data_up0[folder_ref01_markdef_up0.name] = folder_ref01_markdef_up0.value;
        const folder_ref01_resdata_up0 = (await folder_ref01_ent.update(folder_ref01_data_up0)).data();
        (0, node_assert_1.default)(folder_ref01_resdata_up0.id === folder_ref01_data_up0.id);
        (0, node_assert_1.default)(folder_ref01_resdata_up0[folder_ref01_markdef_up0.name] === folder_ref01_markdef_up0.value);
        // LOAD
        const folder_ref01_match_dt0 = {};
        folder_ref01_match_dt0.id = folder_ref01_data.id;
        const folder_ref01_data_dt0 = (await folder_ref01_ent.load(folder_ref01_match_dt0)).data();
        (0, node_assert_1.default)(folder_ref01_data_dt0.id === folder_ref01_data.id);
        // REMOVE
        const folder_ref01_match_rm0 = { id: folder_ref01_data.id };
        await folder_ref01_ent.remove(folder_ref01_match_rm0);
        // LIST
        const folder_ref01_match_rt0 = {};
        const folder_ref01_list_rt0 = (await folder_ref01_ent.list(folder_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(folder_ref01_list_rt0, { id: folder_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/folder/FolderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['folder01', 'folder02', 'folder03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_FOLDER_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_FOLDER_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_FOLDER_ENTID'];
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
//# sourceMappingURL=FolderEntity.test.js.map