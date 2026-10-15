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
(0, node_test_1.describe)('SharedLabelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.SharedLabel();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('shared_label hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).SharedLabel().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).SharedLabel()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.SharedLabel().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().SharedLabel().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.SharedLabel().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.SharedLabel().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SharedLabel().list({ "limit": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'shared_label.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Current shared label name to rename.", "t": "`$STRING`", "key$": "name", "index$": 0 }, "new_name": { "a": true, "h": "New Name", "n": "new_name", "r": true, "sh": "New shared label name to apply to matching tasks.", "t": "`$STRING`", "key$": "new_name", "index$": 1 }, "next_cursor": { "a": true, "h": "Next Cursor", "n": "next_cursor", "r": true, "sh": "Cursor for the next page of results, or `null` when there are no more results.", "t": "`$ANY`", "key$": "next_cursor", "index$": 2 }, "results": { "a": true, "h": "Results", "n": "results", "r": true, "sh": "Objects in the current page of results.", "t": "`$ARRAY`", "key$": "results", "index$": 3 } }, "name": "shared_label", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/labels/shared", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": false, "k": "query", "n": "omit_personal", "or": "omit_personal", "r": false, "t": "`$BOOLEAN`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/labels/shared", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "labels" }, { "lit": "shared" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "bf": ["name"], "co": { "id": "POST /api/v1/labels/shared/remove", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/labels/shared/remove", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "labels" }, { "lit": "shared" }, { "lit": "remove" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["name", "new_name"], "co": { "id": "POST /api/v1/labels/shared/rename", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/labels/shared/rename", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "labels" }, { "lit": "shared" }, { "lit": "rename" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "shared_label", "name__orig": "shared_label", "Name": "SharedLabel", "name_": "shared_label", "name-": "shared-label", "NAME": "SHARED_LABEL", "index$": 31 }, { "active": true, "entity": "shared_label", "key$": "BasicSharedLabelFlow", "kind": "basic", "name": "BasicSharedLabelFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "shared_label_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "shared_label_ref01", "srcdatavar": "shared_label_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-shared_label_ref01" } }], "v": [], "index$": 1 }] }, 'SharedLabel', { "GET /api/v1/labels/shared": { "protocol": "http", "parameters": [{ "name": "omit_personal", "in": "query", "required": false, "schema": { "type": "boolean", "description": "Whether to exclude the user's personal labels from the shared label names.", "examples": [false], "default": false, "title": "Omit Personal" }, "index$": 0 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 200, "exclusiveMinimum": 0, "description": "The number of objects to return in a page", "examples": [50], "default": 50, "title": "Limit" }, "index$": 2 }] }, "POST /api/v1/labels/shared/remove": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "name": { "type": "string", "title": "Name", "description": "Shared label name to remove from matching tasks.", "examples": ["waiting"] } }, "type": "object", "required": ["name"], "title": "Body", "x-ref": "#/components/schemas/Body_0680de45" } } }, "required": true }, "parameters": [] }, "POST /api/v1/labels/shared/rename": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "name": { "type": "string", "title": "Name", "description": "Current shared label name to rename.", "examples": ["waiting"], "key$": "name" }, "new_name": { "type": "string", "title": "New Name", "description": "New shared label name to apply to matching tasks.", "examples": ["follow-up"], "key$": "new_name" } }, "type": "object", "required": ["name", "new_name"], "title": "Body", "x-ref": "#/components/schemas/Body_6ec83bd4", "index$": 1 } } }, "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let shared_label_ref01_data = Object.values(setup.data.existing.shared_label)[0];
        // LIST
        const shared_label_ref01_ent = client.SharedLabel();
        const shared_label_ref01_match = {};
        const shared_label_ref01_list = (await shared_label_ref01_ent.list(shared_label_ref01_match)).map((e) => e.data());
        // UPDATE
        const shared_label_ref01_data_up0 = {};
        const shared_label_ref01_markdef_up0 = { name: 'name', value: 'Mark01-shared_label_ref01_' + setup.now };
        shared_label_ref01_data_up0[shared_label_ref01_markdef_up0.name] = shared_label_ref01_markdef_up0.value;
        const shared_label_ref01_resdata_up0 = (await shared_label_ref01_ent.update(shared_label_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != shared_label_ref01_resdata_up0);
        (0, node_assert_1.default)(shared_label_ref01_resdata_up0[shared_label_ref01_markdef_up0.name] === shared_label_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/shared_label/SharedLabelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['shared_label01', 'shared_label02', 'shared_label03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_SHARED_LABEL_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_SHARED_LABEL_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_SHARED_LABEL_ENTID'];
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
//# sourceMappingURL=SharedLabelEntity.test.js.map