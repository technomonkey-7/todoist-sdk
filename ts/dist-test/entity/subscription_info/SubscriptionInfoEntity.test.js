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
(0, node_test_1.describe)('SubscriptionInfoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.SubscriptionInfo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SubscriptionInfo().create({ "activation_method": 1, "billing_portal_switch_to_annual_url": "x", "billing_portal_url": "x", "expiration_date": "x", "has_billing_portal": true, "has_billing_portal_switch_to_annual": true, "has_switch_legacy_to_current": true, "invoice_credit_balance": "x", "plan": "x", "plan_price": "x", "status": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'subscription_info.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "activation_method": { "a": true, "h": "Activation Method", "n": "activation_method", "r": true, "sh": "How the active subscription was purchased.", "t": "`$STRING`", "key$": "activation_method", "index$": 0 }, "billing_portal_switch_to_annual_url": { "a": true, "h": "Billing Portal Switch To Annual Url", "n": "billing_portal_switch_to_annual_url", "r": true, "sh": "One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible.", "t": "`$ANY`", "key$": "billing_portal_switch_to_annual_url", "index$": 1 }, "billing_portal_url": { "a": true, "h": "Billing Portal Url", "n": "billing_portal_url", "r": true, "sh": "One-time URL to the Stripe customer portal, if available.", "t": "`$ANY`", "key$": "billing_portal_url", "index$": 2 }, "expiration_date": { "a": true, "h": "Expiration Date", "n": "expiration_date", "r": true, "sh": "Date the current paid period ends, in `YYYY-MM-DD` format.", "t": "`$ANY`", "key$": "expiration_date", "index$": 3 }, "has_billing_portal": { "a": true, "h": "Has Billing Portal", "n": "has_billing_portal", "r": true, "sh": "`true` when the user has a Stripe customer with a portal session.", "t": "`$BOOLEAN`", "key$": "has_billing_portal", "index$": 4 }, "has_billing_portal_switch_to_annual": { "a": true, "h": "Has Billing Portal Switch To Annual", "n": "has_billing_portal_switch_to_annual", "r": true, "sh": "`true` when a switch-to-annual flow is available in Stripe.", "t": "`$BOOLEAN`", "key$": "has_billing_portal_switch_to_annual", "index$": 5 }, "has_switch_legacy_to_current": { "a": true, "h": "Has Switch Legacy To Current", "n": "has_switch_legacy_to_current", "r": true, "sh": "`true` when the user is eligible to switch from a legacy Pro price to the current one.", "t": "`$BOOLEAN`", "key$": "has_switch_legacy_to_current", "index$": 6 }, "invoice_credit_balance": { "a": true, "h": "Invoice Credit Balance", "n": "invoice_credit_balance", "r": true, "sh": "Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g.", "t": "`$ANY`", "key$": "invoice_credit_balance", "index$": 7 }, "plan": { "a": true, "h": "Plan", "n": "plan", "r": true, "sh": "Plan tier the user is currently on.", "t": "`$STRING`", "key$": "plan", "index$": 8 }, "plan_price": { "a": true, "h": "Plan Price", "n": "plan_price", "r": true, "sh": "Price of the active plan, when known.", "t": "`$ANY`", "key$": "plan_price", "index$": 9 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Current subscription status.", "t": "`$STRING`", "key$": "status", "index$": 10 } }, "name": "subscription_info", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/v1/payments/get_subscription_info", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/payments/get_subscription_info", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "payments" }, { "lit": "get_subscription_info" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /api/v1/payments/reactivate_plan", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/payments/reactivate_plan", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "payments" }, { "lit": "reactivate_plan" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "subscription_info", "name__orig": "subscription_info", "Name": "SubscriptionInfo", "name_": "subscription_info", "name-": "subscription-info", "NAME": "SUBSCRIPTION_INFO", "index$": 33 }, { "active": true, "entity": "subscription_info", "key$": "BasicSubscriptionInfoFlow", "kind": "basic", "name": "BasicSubscriptionInfoFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "subscription_info_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'SubscriptionInfo', { "POST /api/v1/payments/get_subscription_info": { "protocol": "http", "parameters": [] }, "POST /api/v1/payments/reactivate_plan": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const subscription_info_ref01_ent = client.SubscriptionInfo();
        let subscription_info_ref01_data = setup.data.new.subscription_info['subscription_info_ref01'];
        subscription_info_ref01_data = (await subscription_info_ref01_ent.create(subscription_info_ref01_data)).data();
        (0, node_assert_1.default)(null != subscription_info_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/subscription_info/SubscriptionInfoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['subscription_info01', 'subscription_info02', 'subscription_info03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_SUBSCRIPTION_INFO_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_SUBSCRIPTION_INFO_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_SUBSCRIPTION_INFO_ENTID'];
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
//# sourceMappingURL=SubscriptionInfoEntity.test.js.map