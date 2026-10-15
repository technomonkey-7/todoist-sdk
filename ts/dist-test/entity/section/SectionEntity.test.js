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
(0, node_test_1.describe)('SectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.Section();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('section hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).Section().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).Section()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Section().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().Section().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Section().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Section().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Section().list({ "limit": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'section.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "added_at": { "a": true, "fo": "date-time", "h": "Added At", "n": "added_at", "r": true, "sh": "Date and time when the section was created.", "t": "`$STRING`", "key$": "added_at", "index$": 0 }, "archived_at": { "a": true, "fo": "date-time", "h": "Archived At", "n": "archived_at", "r": true, "sh": "Date and time when the section was archived, or `null` if it is active.", "t": "`$ANY`", "key$": "archived_at", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Section description, or `null` if it has none.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "String ID of the section.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "is_archived": { "a": true, "h": "Is Archived", "n": "is_archived", "r": true, "sh": "Whether the section is archived.", "t": "`$BOOLEAN`", "key$": "is_archived", "index$": 4 }, "is_collapsed": { "a": true, "h": "Is Collapsed", "n": "is_collapsed", "op": { "create": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "sh": "Whether the section is collapsed in the user's view.", "t": "`$BOOLEAN`", "key$": "is_collapsed", "index$": 5 }, "is_deleted": { "a": true, "h": "Is Deleted", "n": "is_deleted", "r": true, "sh": "Whether the section is deleted.", "t": "`$BOOLEAN`", "key$": "is_deleted", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Section name.", "t": "`$STRING`", "key$": "name", "index$": 7 }, "order": { "a": true, "h": "Order", "n": "order", "r": false, "sh": "Position of the new section in the project", "t": "`$ANY`", "key$": "order", "index$": 8 }, "order_key": { "a": true, "h": "Order Key", "n": "order_key", "r": true, "sh": "Fractional-indexing order key: sections sort by comparing keys lexicographically within a project.", "t": "`$ANY`", "key$": "order_key", "index$": 9 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": true, "sh": "String ID of the project that contains the section.", "t": "`$STRING`", "key$": "project_id", "index$": 10 }, "section_order": { "a": true, "h": "Section Order", "n": "section_order", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Position of the section in the project.", "t": "`$INTEGER`", "key$": "section_order", "index$": 11 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "sh": "Date and time when the section was last updated, or `null` if unknown.", "t": "`$ANY`", "key$": "updated_at", "index$": 12 }, "user_id": { "a": true, "h": "User Id", "n": "user_id", "r": true, "sh": "String ID of the user who owns the section.", "t": "`$STRING`", "key$": "user_id", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "section", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["description", "is_collapsed", "name", "section_order"], "co": { "id": "POST /api/v1/sections/{section_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "section_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/sections/{section_id}", "q": { "exist": ["id"] }, "r": { "param": { "section_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "sections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["description", "name", "order", "project_id"], "co": { "id": "POST /api/v1/sections", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/sections", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "sections" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/sections", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "public_key", "or": "public_key", "r": false, "t": "`$ANY`", "index$": 3 }, { "a": true, "k": "query", "n": "workspace_id", "or": "workspace_id", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/sections", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "sections" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/sections/{section_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "section_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "public_key", "or": "public_key", "r": false, "t": "`$ANY`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/sections/{section_id}", "q": { "exist": ["id"] }, "r": { "param": { "section_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "sections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/sections/{section_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "section_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/sections/{section_id}", "q": { "exist": ["id"] }, "r": { "param": { "section_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "sections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "section", "name__orig": "section", "Name": "Section", "name_": "section", "name-": "section", "NAME": "SECTION", "index$": 38 }, { "active": true, "entity": "section", "key$": "BasicSectionFlow", "kind": "basic", "name": "BasicSectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "section_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "section_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "section_ref01", "srcdatavar": "section_ref01_data", "suffix": "_dt0" }, "m": { "id": "section01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-section_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "section_ref01", "suffix": "_rm0" }, "m": { "id": "section01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "section_ref01" } }], "index$": 4 }] }, 'Section', { "POST /api/v1/sections/{section_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Name", "description": "Updated section name. Passing null or omitting this field will leave it unchanged.", "examples": ["Groceries"], "key$": "name" }, "section_order": { "anyOf": [{ "type": "integer", "maximum": 2147483647, "minimum": -2147483648 }, { "type": "null" }], "title": "Section Order", "description": "Updated position of the section in the project. Passing null or omitting this field will leave it unchanged.", "examples": [12], "key$": "section_order" }, "is_collapsed": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Is Collapsed", "description": "Updated collapsed state of the section. Passing null or omitting this field will leave it unchanged.", "examples": [true], "key$": "is_collapsed" }, "description": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Description", "description": "Updated section description. Pass null to clear the value. Omit this field to keep it unchanged.", "examples": ["Tasks for the launch plan"], "key$": "description" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_163067b4", "index$": 1 } } } }, "parameters": [{ "name": "section_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the section", "examples": ["6fFPHV272WWh3gpW"], "title": "Section Id" }, "index$": 0 }] }, "POST /api/v1/sections": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "type": "string", "title": "Name", "description": "Name of the new section.", "examples": ["Groceries"], "key$": "name" }, "project_id": { "type": "string", "title": "Project Id", "description": "ID of the project to add the section to", "examples": ["6XGgm6PHrGgMpCFX"], "key$": "project_id" }, "order": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Order", "description": "Position of the new section in the project", "examples": [12], "key$": "order" }, "description": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Description", "description": "Description of the new section.", "examples": ["Tasks for the launch plan"], "key$": "description" } }, "type": "object", "required": ["name", "project_id"], "title": "Body", "x-ref": "#/components/schemas/Body_134c19e9", "index$": 1 } } } }, "parameters": [] }, "GET /api/v1/sections": { "protocol": "http", "parameters": [{ "name": "project_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "String ID of the project to get sections from. If omitted or null, get sections from all projects. If provided, workspace_id is ignored.", "examples": ["6XGgm6PHrGgMpCFX"], "title": "Project Id" }, "index$": 0 }, { "name": "workspace_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "exclusiveMinimum": 0, "description": "Numeric ID of the workspace.", "examples": [123456] }, { "type": "null" }], "description": "Numeric ID of the workspace to get sections from, limited to the user's joined projects. If omitted or null, get sections from all projects. Ignored if project_id is also provided.", "title": "Workspace Id" }, "index$": 1 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 2 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 200, "exclusiveMinimum": 0, "description": "The number of objects to return in a page", "examples": [50], "default": 50, "title": "Limit" }, "index$": 3 }, { "name": "public_key", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "description": "Public project access key.", "examples": ["550e8400-e29b-41d4-a716-446655440000"] }, { "type": "null" }], "title": "Public Key" }, "index$": 4 }] }, "GET /api/v1/sections/{section_id}": { "protocol": "http", "parameters": [{ "name": "section_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the section", "examples": ["6fFPHV272WWh3gpW"], "title": "Section Id" }, "index$": 0 }, { "name": "public_key", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "description": "Public project access key.", "examples": ["550e8400-e29b-41d4-a716-446655440000"] }, { "type": "null" }], "title": "Public Key" }, "index$": 1 }] }, "DELETE /api/v1/sections/{section_id}": { "protocol": "http", "parameters": [{ "name": "section_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the section", "examples": ["6fFPHV272WWh3gpW"], "title": "Section Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const section_ref01_ent = client.Section();
        let section_ref01_data = setup.data.new.section['section_ref01'];
        section_ref01_data = (await section_ref01_ent.create(section_ref01_data)).data();
        (0, node_assert_1.default)(null != section_ref01_data.id);
        // LIST
        const section_ref01_match = {};
        const section_ref01_list = (await section_ref01_ent.list(section_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(section_ref01_list, { id: section_ref01_data.id })));
        // LOAD
        const section_ref01_match_dt0 = {};
        section_ref01_match_dt0.id = section_ref01_data.id;
        const section_ref01_data_dt0 = (await section_ref01_ent.load(section_ref01_match_dt0)).data();
        (0, node_assert_1.default)(section_ref01_data_dt0.id === section_ref01_data.id);
        // REMOVE
        const section_ref01_match_rm0 = { id: section_ref01_data.id };
        await section_ref01_ent.remove(section_ref01_match_rm0);
        // LIST
        const section_ref01_match_rt0 = {};
        const section_ref01_list_rt0 = (await section_ref01_ent.list(section_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(section_ref01_list_rt0, { id: section_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/section/SectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['section01', 'section02', 'section03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_SECTION_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TODOIST_TEST_SECTION_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_SECTION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TodoistSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
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
//# sourceMappingURL=SectionEntity.test.js.map