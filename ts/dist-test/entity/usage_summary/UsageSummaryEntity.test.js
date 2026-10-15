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
(0, node_test_1.describe)('UsageSummaryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.UsageSummary();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('usage_summary hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).UsageSummary().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).UsageSummary()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.UsageSummary().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().UsageSummary().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.UsageSummary().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.UsageSummary().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.UsageSummary().list({ "product": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'usage_summary.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "automation_id": { "a": true, "h": "Automation Id", "n": "automation_id", "r": true, "sh": "The automation this usage belongs to.", "t": "`$STRING`", "key$": "automation_id", "index$": 0 }, "charged_amount": { "a": true, "h": "Charged Amount", "n": "charged_amount", "r": true, "sh": "`charged_units` in money, in microdollars.", "t": "`$INTEGER`", "key$": "charged_amount", "index$": 1 }, "charged_units": { "a": true, "h": "Charged Units", "n": "charged_units", "r": true, "sh": "Units the group took off the balance, as a positive number.", "t": "`$INTEGER`", "key$": "charged_units", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": true, "sh": "The label of the newest usage in the group, so a renamed automation shows its current name.", "t": "`$STRING`", "key$": "description", "index$": 3 }, "usage_count": { "a": true, "h": "Usage Count", "n": "usage_count", "r": true, "sh": "How many usage events settled in the group.", "t": "`$INTEGER`", "key$": "usage_count", "index$": 4 } }, "name": "usage_summary", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/usage_billing/usage_summary", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "category", "or": "category", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "group_by", "or": "group_by", "r": false, "t": "`$ANY`", "index$": 1 }, { "a": true, "ex": "automations", "k": "query", "n": "product", "or": "product", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "since", "or": "since", "r": false, "t": "`$ANY`", "index$": 3 }, { "a": true, "k": "query", "n": "until", "or": "until", "r": false, "t": "`$ANY`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/usage_billing/usage_summary", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "usage_billing" }, { "lit": "usage_summary" }], "t": { "req": "`reqdata`", "res": "`body.groups`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "usage_summary", "name__orig": "usage_summary", "Name": "UsageSummary", "name_": "usage_summary", "name-": "usage-summary", "NAME": "USAGE_SUMMARY", "index$": 38 }, { "active": true, "entity": "usage_summary", "key$": "BasicUsageSummaryFlow", "kind": "basic", "name": "BasicUsageSummaryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "usage_summary_ref01" } }], "index$": 0 }] }, 'UsageSummary', { "GET /api/v1/usage_billing/usage_summary": { "protocol": "http", "parameters": [{ "name": "product", "in": "query", "required": false, "schema": { "type": "string", "description": "Product whose usage to total.", "examples": ["automations"], "default": "automations", "title": "Product" }, "index$": 0 }, { "name": "category", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "Count one kind of work only, for example `automation_run`. More than one kind settles against the same balance, so a per-run average over all of them mixes runs with chat messages. Omit to total every category.", "examples": ["automation_run"], "title": "Category" }, "index$": 1 }, { "name": "since", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "format": "date-time" }, { "type": "null" }], "description": "Start of the window, inclusive. Omit to start at the account's first event. A value with no offset is read as UTC, which is what `created_at` in `/history` reports.", "examples": ["2026-07-15T00:00:00Z"], "title": "Since" }, "index$": 2 }, { "name": "until", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "format": "date-time" }, { "type": "null" }], "description": "End of the window, exclusive. Omit to run to now. A value with no offset is read as UTC.", "examples": ["2026-08-15T00:00:00Z"], "title": "Until" }, "index$": 3 }, { "name": "group_by", "in": "query", "required": false, "schema": { "anyOf": [{ "const": "automation", "type": "string" }, { "type": "null" }], "description": "Split the total by the automation that ran, in `groups`. Send `category=automation_run` with it: chat messages carry no automation, so without the filter each chat label becomes a group of its own.", "examples": ["automation"], "title": "Group By" }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let usage_summary_ref01_data = Object.values(setup.data.existing.usage_summary)[0];
        // LIST
        const usage_summary_ref01_ent = client.UsageSummary();
        const usage_summary_ref01_match = {};
        const usage_summary_ref01_list = (await usage_summary_ref01_ent.list(usage_summary_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/usage_summary/UsageSummaryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['usage_summary01', 'usage_summary02', 'usage_summary03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_USAGE_SUMMARY_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_USAGE_SUMMARY_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_USAGE_SUMMARY_ENTID'];
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
//# sourceMappingURL=UsageSummaryEntity.test.js.map