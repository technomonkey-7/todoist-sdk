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
(0, node_test_1.describe)('ActiveEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.Active();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Active().list({ "workspace_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'active.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access": { "a": true, "h": "Access", "n": "access", "r": true, "sh": "Project access configuration.", "t": "`$ANY`", "union": { "branches": 3, "count": 1, "depth": 4 }, "key$": "access", "index$": 0 }, "archived_date": { "a": true, "h": "Archived Date", "n": "archived_date", "r": false, "sh": "Date and time when the project was archived, or `null` if active.", "t": "`$ANY`", "key$": "archived_date", "index$": 1 }, "archived_timestamp": { "a": true, "h": "Archived Timestamp", "n": "archived_timestamp", "r": false, "sh": "Unix timestamp for when the project was archived, or 0 if active.", "t": "`$INTEGER`", "key$": "archived_timestamp", "index$": 2 }, "color": { "a": true, "h": "Color", "n": "color", "r": false, "sh": "Numeric project color code.", "t": "`$ANY`", "key$": "color", "index$": 3 }, "default_order": { "a": true, "h": "Default Order", "n": "default_order", "r": false, "sh": "Default order of the project in workspace views.", "t": "`$INTEGER`", "key$": "default_order", "index$": 4 }, "default_order_key": { "a": true, "h": "Default Order Key", "n": "default_order_key", "r": false, "sh": "Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together).", "t": "`$ANY`", "key$": "default_order_key", "index$": 5 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Project description.", "t": "`$STRING`", "key$": "description", "index$": 6 }, "folder_id": { "a": true, "h": "Folder Id", "n": "folder_id", "r": false, "sh": "Numeric ID of the folder that contains the project, or `null`.", "t": "`$STRING`", "key$": "folder_id", "index$": 7 }, "icon": { "a": true, "h": "Icon", "n": "icon", "r": false, "sh": "Project icon name, or `null` for the default icon.", "t": "`$ANY`", "key$": "icon", "index$": 8 }, "initiated_by_uid": { "a": true, "h": "Initiated By Uid", "n": "initiated_by_uid", "r": true, "sh": "Numeric ID of the user requesting the workspace project.", "t": "`$INTEGER`", "key$": "initiated_by_uid", "index$": 9 }, "is_archived": { "a": true, "h": "Is Archived", "n": "is_archived", "r": false, "sh": "Whether the workspace project is archived.", "t": "`$BOOLEAN`", "key$": "is_archived", "index$": 10 }, "is_frozen": { "a": true, "h": "Is Frozen", "n": "is_frozen", "r": false, "sh": "Whether the project is frozen and cannot be modified.", "t": "`$BOOLEAN`", "key$": "is_frozen", "index$": 11 }, "is_invite_only": { "a": true, "h": "Is Invite Only", "n": "is_invite_only", "r": false, "sh": "Whether joining the workspace project requires an invitation.", "t": "`$BOOLEAN`", "key$": "is_invite_only", "index$": 12 }, "is_project_insights_enabled": { "a": true, "h": "Is Project Insights Enabled", "n": "is_project_insights_enabled", "r": false, "sh": "Whether project insights are enabled for the project.", "t": "`$BOOLEAN`", "key$": "is_project_insights_enabled", "index$": 13 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Project name.", "t": "`$STRING`", "key$": "name", "index$": 14 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": true, "sh": "String ID of the project.", "t": "`$STRING`", "key$": "project_id", "index$": 15 }, "public_access": { "a": true, "h": "Public Access", "n": "public_access", "r": true, "sh": "Whether the project is publicly accessible.", "t": "`$BOOLEAN`", "key$": "public_access", "index$": 16 }, "role": { "a": true, "h": "Role", "n": "role", "r": false, "t": "`$ANY`", "key$": "role", "index$": 17 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Project status.", "t": "`$STRING`", "key$": "status", "index$": 18 }, "view_style": { "a": true, "h": "View Style", "n": "view_style", "r": false, "sh": "Project view style.", "t": "`$STRING`", "key$": "view_style", "index$": 19 }, "workspace_id": { "a": true, "h": "Workspace Id", "n": "workspace_id", "r": true, "sh": "Numeric ID of the workspace that contains the project.", "t": "`$INTEGER`", "key$": "workspace_id", "index$": 20 } }, "name": "active", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/workspaces/{workspace_id}/projects/active", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/workspaces/{workspace_id}/projects/active", "q": { "exist": ["workspace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "projects" }, { "lit": "active" }], "t": { "req": "`reqdata`", "res": "`body.workspace_projects`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.workspace"]] }, "key$": "active", "name__orig": "active", "Name": "Active", "name_": "active", "name-": "active", "NAME": "ACTIVE", "index$": 0 }, { "active": true, "entity": "active", "key$": "BasicActiveFlow", "kind": "basic", "name": "BasicActiveFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "workspace_id": "workspace01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "active_ref01" } }], "index$": 0 }] }, 'Active', { "GET /api/v1/workspaces/{workspace_id}/projects/active": { "protocol": "http", "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "minimum": 0, "description": "ID of the workspace whose active projects should be listed.", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 500, "minimum": 1, "description": "The number of active workspace projects to return in a page.", "examples": [50], "default": 100, "title": "Limit" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let active_ref01_data = Object.values(setup.data.existing.active)[0];
        // LIST
        const active_ref01_ent = client.Active();
        const active_ref01_match = {};
        active_ref01_match['workspace_id'] = setup.idmap['workspace01'];
        const active_ref01_list = (await active_ref01_ent.list(active_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/active/ActiveTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['active01', 'active02', 'active03', 'workspace01', 'workspace02', 'workspace03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_ACTIVE_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TODOIST_TEST_ACTIVE_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_ACTIVE_ENTID'];
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
//# sourceMappingURL=ActiveEntity.test.js.map