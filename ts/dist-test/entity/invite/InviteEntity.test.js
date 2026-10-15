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
(0, node_test_1.describe)('InviteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.Invite();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Invite().create({ "workspace_id": "x", "invited_emails": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'invite.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app": { "a": true, "h": "App", "n": "app", "r": false, "sh": "For first-party clients usage only.", "t": "`$STRING`", "key$": "app", "index$": 0 }, "email_list": { "a": true, "h": "Email List", "n": "email_list", "r": false, "sh": "List of user emails to invite to the workspace.", "t": "`$ANY`", "key$": "email_list", "index$": 1 }, "invited_emails": { "a": true, "h": "Invited Emails", "n": "invited_emails", "r": true, "sh": "Emails successfully invited to the workspace.", "t": "`$ARRAY`", "key$": "invited_emails", "index$": 2 }, "role": { "a": true, "h": "Role", "n": "role", "r": false, "sh": "Role assigned to invited users.", "t": "`$ANY`", "key$": "role", "index$": 3 } }, "name": "invite", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["app", "email_list", "role"], "co": { "id": "POST /api/v1/workspaces/{workspace_id}/users/invite", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/workspaces/{workspace_id}/users/invite", "q": { "exist": ["workspace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "users" }, { "lit": "invite" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.workspace"]] }, "key$": "invite", "name__orig": "invite", "Name": "Invite", "name_": "invite", "name-": "invite", "NAME": "INVITE", "index$": 17 }, { "active": true, "entity": "invite", "key$": "BasicInviteFlow", "kind": "basic", "name": "BasicInviteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "invite_ref01" }, "m": { "workspace_id": "workspace01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Invite', { "POST /api/v1/workspaces/{workspace_id}/users/invite": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "email_list": { "anyOf": [{ "items": { "type": "string", "format": "email" }, "type": "array" }, { "type": "null" }], "title": "Email List", "description": "List of user emails to invite to the workspace.", "examples": [["teammate@example.com"]], "key$": "email_list" }, "role": { "anyOf": [{ "type": "string", "enum": ["ADMIN", "MEMBER", "GUEST"], "title": "WorkspaceRole", "description": "Role of the user inside the workspace", "x-enumDescriptions": { "ADMIN": "Admin", "GUEST": "Guest", "MEMBER": "Member" }, "x-ref": "#/components/schemas/WorkspaceRole" }, { "type": "null" }], "description": "Role assigned to invited users.", "examples": ["MEMBER"], "key$": "role" }, "app": { "type": "string", "enum": ["todoist", "comms", "automations"], "title": "ProductApp", "description": "For first-party clients usage only. This attribute may be removed or changed without notice, so we strongly advise not to rely on it. Product the invitation is sent from. Products without their own invite emails are recorded as Todoist.", "x-enumDescriptions": { "automations": "Automations", "comms": "Comms", "todoist": "Todoist" }, "default": "todoist", "examples": ["comms"], "x-ref": "#/components/schemas/ProductApp", "key$": "app" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_108b7f01", "index$": 1 } } } }, "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "description": "ID of the workspace", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const invite_ref01_ent = client.Invite();
        let invite_ref01_data = setup.data.new.invite['invite_ref01'];
        invite_ref01_data['workspace_id'] = setup.idmap['workspace01'];
        invite_ref01_data = (await invite_ref01_ent.create(invite_ref01_data)).data();
        (0, node_assert_1.default)(null != invite_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/invite/InviteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['invite01', 'invite02', 'invite03', 'workspace01', 'workspace02', 'workspace03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_INVITE_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TODOIST_TEST_INVITE_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_INVITE_ENTID'];
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
//# sourceMappingURL=InviteEntity.test.js.map