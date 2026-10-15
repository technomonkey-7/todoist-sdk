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
(0, node_test_1.describe)('MigratePersonalTokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.MigratePersonalToken();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MigratePersonalToken().create({ "access_token": "x", "client_id": 1, "client_secret": "x", "expires_in": 1, "personal_token": "x", "scope": "x", "token_type": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'migrate_personal_token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_token": { "a": true, "h": "Access Token", "n": "access_token", "r": true, "sh": "OAuth access token created from the personal token.", "t": "`$ANY`", "key$": "access_token", "index$": 0 }, "client_id": { "a": true, "h": "Client Id", "n": "client_id", "r": true, "sh": "The unique Client ID of the Todoist application that you registered.", "t": "`$STRING`", "key$": "client_id", "index$": 1 }, "client_secret": { "a": true, "h": "Client Secret", "n": "client_secret", "r": true, "sh": "The unique Client Secret of the Todoist application that you registered.", "t": "`$STRING`", "key$": "client_secret", "index$": 2 }, "expires_in": { "a": true, "h": "Expires In", "n": "expires_in", "r": true, "sh": "Access token lifetime in seconds.", "t": "`$INTEGER`", "key$": "expires_in", "index$": 3 }, "personal_token": { "a": true, "h": "Personal Token", "n": "personal_token", "r": true, "sh": "Token obtained from the email/password authentication.", "t": "`$STRING`", "key$": "personal_token", "index$": 4 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": true, "sh": "Scopes of the OAuth token.", "t": "`$STRING`", "key$": "scope", "index$": 5 }, "token_type": { "a": true, "h": "Token Type", "n": "token_type", "r": true, "sh": "OAuth token type.", "t": "`$STRING`", "key$": "token_type", "index$": 6 } }, "name": "migrate_personal_token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["client_id", "client_secret", "personal_token", "scope"], "co": { "id": "POST /api/v1/access_tokens/migrate_personal_token", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/access_tokens/migrate_personal_token", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "access_tokens" }, { "lit": "migrate_personal_token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "migrate_personal_token", "name__orig": "migrate_personal_token", "Name": "MigratePersonalToken", "name_": "migrate_personal_token", "name-": "migrate-personal-token", "NAME": "MIGRATE_PERSONAL_TOKEN", "index$": 19 }, { "active": true, "entity": "migrate_personal_token", "key$": "BasicMigratePersonalTokenFlow", "kind": "basic", "name": "BasicMigratePersonalTokenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "migrate_personal_token_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'MigratePersonalToken', { "POST /api/v1/access_tokens/migrate_personal_token": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "client_id": { "type": "string", "title": "Client Id", "description": "The unique Client ID of the Todoist application that you registered.", "examples": ["0123456789abcdef"], "key$": "client_id" }, "client_secret": { "type": "string", "title": "Client Secret", "description": "The unique Client Secret of the Todoist application that you registered.", "examples": ["abcdef0123456789abcdef0123456789"], "key$": "client_secret" }, "personal_token": { "type": "string", "title": "Personal Token", "description": "Token obtained from the email/password authentication.", "examples": ["0123456789abcdef0123456789abcdef01234567"], "key$": "personal_token" }, "scope": { "type": "string", "title": "Scope", "description": "Scopes of the OAuth token. Please refer to the [Authorization](#tag/Authorization) guide for the detailed list of available scopes.", "examples": ["data:read_write"], "key$": "scope" } }, "type": "object", "required": ["client_id", "client_secret", "personal_token", "scope"], "title": "Body", "x-ref": "#/components/schemas/Body_999fd79a", "index$": 1 } } }, "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const migrate_personal_token_ref01_ent = client.MigratePersonalToken();
        let migrate_personal_token_ref01_data = setup.data.new.migrate_personal_token['migrate_personal_token_ref01'];
        migrate_personal_token_ref01_data = (await migrate_personal_token_ref01_ent.create(migrate_personal_token_ref01_data)).data();
        (0, node_assert_1.default)(null != migrate_personal_token_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/migrate_personal_token/MigratePersonalTokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['migrate_personal_token01', 'migrate_personal_token02', 'migrate_personal_token03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_MIGRATE_PERSONAL_TOKEN_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_MIGRATE_PERSONAL_TOKEN_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_MIGRATE_PERSONAL_TOKEN_ENTID'];
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
//# sourceMappingURL=MigratePersonalTokenEntity.test.js.map