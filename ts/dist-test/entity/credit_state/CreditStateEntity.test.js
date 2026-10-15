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
(0, node_test_1.describe)('CreditStateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.CreditState();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CreditState().load({ "product": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'credit_state.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "available_amount": { "a": true, "h": "Available Amount", "n": "available_amount", "r": true, "sh": "`available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726.", "t": "`$INTEGER`", "key$": "available_amount", "index$": 0 }, "available_units": { "a": true, "h": "Available Units", "n": "available_units", "r": true, "sh": "Balance net of in-flight holds (`available_cached - held`).", "t": "`$INTEGER`", "key$": "available_units", "index$": 1 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "sh": "ISO currency code every amount in this response is in.", "t": "`$STRING`", "key$": "currency", "index$": 2 }, "depleted": { "a": true, "h": "Depleted", "n": "depleted", "r": true, "sh": "No further runs may start.", "t": "`$BOOLEAN`", "key$": "depleted", "index$": 3 }, "is_settled_low_balance": { "a": true, "h": "Is Settled Low Balance", "n": "is_settled_low_balance", "r": true, "sh": "Whether the settled balance before in-flight holds is at or below the low-balance threshold.", "t": "`$BOOLEAN`", "key$": "is_settled_low_balance", "index$": 4 }, "low_balance": { "a": true, "h": "Low Balance", "n": "low_balance", "r": true, "sh": "Balance is at or below the low-balance threshold.", "t": "`$BOOLEAN`", "key$": "low_balance", "index$": 5 }, "settled_amount": { "a": true, "h": "Settled Amount", "n": "settled_amount", "r": true, "sh": "`settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price.", "t": "`$INTEGER`", "key$": "settled_amount", "index$": 6 }, "settled_units": { "a": true, "h": "Settled Units", "n": "settled_units", "r": true, "sh": "Balance after settled credits and debits, before in-flight holds (`available_cached`).", "t": "`$INTEGER`", "key$": "settled_units", "index$": 7 }, "usage_allowed": { "a": true, "h": "Usage Allowed", "n": "usage_allowed", "r": true, "sh": "Whether a new run may start right now.", "t": "`$BOOLEAN`", "key$": "usage_allowed", "index$": 8 }, "usage_block_reason": { "a": true, "h": "Usage Block Reason", "n": "usage_block_reason", "r": true, "sh": "Why a new run cannot start, or `null` when it can.", "t": "`$ANY`", "key$": "usage_block_reason", "index$": 9 } }, "name": "credit_state", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/usage_billing/state", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "automations", "k": "query", "n": "product", "or": "product", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/usage_billing/state", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "usage_billing" }, { "lit": "state" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "credit_state", "name__orig": "credit_state", "Name": "CreditState", "name_": "credit_state", "name-": "credit-state", "NAME": "CREDIT_STATE", "index$": 6 }, { "active": true, "entity": "credit_state", "key$": "BasicCreditStateFlow", "kind": "basic", "name": "BasicCreditStateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "credit_state_ref01", "srcdatavar": "credit_state_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-credit_state_ref01" } }], "index$": 0 }] }, 'CreditState', { "GET /api/v1/usage_billing/state": { "protocol": "http", "parameters": [{ "name": "product", "in": "query", "required": false, "schema": { "type": "string", "description": "Product whose credit state to read.", "examples": ["automations"], "default": "automations", "title": "Product" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let credit_state_ref01_data = Object.values(setup.data.existing.credit_state)[0];
        // LOAD
        const credit_state_ref01_ent = client.CreditState();
        const credit_state_ref01_match_dt0 = {};
        const credit_state_ref01_data_dt0 = (await credit_state_ref01_ent.load(credit_state_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != credit_state_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/credit_state/CreditStateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['credit_state01', 'credit_state02', 'credit_state03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_CREDIT_STATE_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_CREDIT_STATE_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_CREDIT_STATE_ENTID'];
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
//# sourceMappingURL=CreditStateEntity.test.js.map