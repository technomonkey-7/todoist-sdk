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
(0, node_test_1.describe)('WorkspaceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.Workspace();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('workspace hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).Workspace().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).Workspace()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Workspace().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().Workspace().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Workspace().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Workspace().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Workspace().list({ "description": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'workspace.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Updated workspace description.", "t": "`$STRING`", "key$": "description", "index$": 0 }, "domain_discovery": { "a": true, "h": "Domain Discovery", "n": "domain_discovery", "r": false, "sh": "Updated domain discovery setting.", "t": "`$ANY`", "key$": "domain_discovery", "index$": 1 }, "domain_name": { "a": true, "h": "Domain Name", "n": "domain_name", "r": false, "sh": "Updated workspace email domain.", "t": "`$ANY`", "key$": "domain_name", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "invite_code": { "a": true, "h": "Invite Code", "n": "invite_code", "r": false, "sh": "Regenerate workspace invite code when set.", "t": "`$ANY`", "key$": "invite_code", "index$": 4 }, "is_collapsed": { "a": true, "h": "Is Collapsed", "n": "is_collapsed", "r": false, "sh": "Updated collapse state for current user.", "t": "`$BOOLEAN`", "key$": "is_collapsed", "index$": 5 }, "is_guest_allowed": { "a": true, "h": "Is Guest Allowed", "n": "is_guest_allowed", "r": false, "sh": "Updated guest access status.", "t": "`$BOOLEAN`", "key$": "is_guest_allowed", "index$": 6 }, "is_link_sharing_enabled": { "a": true, "h": "Is Link Sharing Enabled", "n": "is_link_sharing_enabled", "r": false, "sh": "Updated link sharing status.", "t": "`$BOOLEAN`", "key$": "is_link_sharing_enabled", "index$": 7 }, "is_trial_pending": { "a": true, "h": "Is Trial Pending", "n": "is_trial_pending", "r": false, "sh": "Updated trial pending state.", "t": "`$BOOLEAN`", "key$": "is_trial_pending", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Updated workspace name.", "t": "`$STRING`", "key$": "name", "index$": 9 }, "properties": { "a": true, "h": "Properties", "n": "properties", "r": false, "sh": "Updated workspace properties.", "t": "`$ANY`", "key$": "properties", "index$": 10 }, "restrict_email_domains": { "a": true, "h": "Restrict Email Domains", "n": "restrict_email_domains", "r": false, "sh": "Updated email domain restriction setting.", "t": "`$ANY`", "key$": "restrict_email_domains", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "workspace", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["description", "domain_discovery", "domain_name", "invite_code", "is_collapsed", "is_guest_allowed", "is_link_sharing_enabled", "is_trial_pending", "name", "properties", "restrict_email_domains"], "co": { "id": "POST /api/v1/workspaces/{workspace_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/workspaces/{workspace_id}", "q": { "exist": ["id"] }, "r": { "param": { "workspace_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["description", "domain_discovery", "domain_name", "is_guest_allowed", "is_link_sharing_enabled", "is_trial_pending", "name", "properties", "restrict_email_domains"], "co": { "id": "POST /api/v1/workspaces", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/workspaces", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /api/v1/workspaces/logo", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/workspaces/logo", "q": { "$action": "logo" }, "r": {}, "rb": { "fields": [{ "name": "delete" }, { "binary": true, "media": "application/octet-stream", "name": "file" }, { "name": "workspace_id" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "lit": "logo" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/workspaces/invitations", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/workspaces/invitations", "q": { "$action": "invitation", "exist": ["workspace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "lit": "invitations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/workspaces", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/workspaces", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/workspaces/{workspace_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/workspaces/{workspace_id}", "q": { "exist": ["id"] }, "r": { "param": { "workspace_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/workspaces/{workspace_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workspace_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/workspaces/{workspace_id}", "q": { "exist": ["id"] }, "r": { "param": { "workspace_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "workspaces" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "workspace", "name__orig": "workspace", "Name": "Workspace", "name_": "workspace", "name-": "workspace", "NAME": "WORKSPACE", "index$": 48 }, { "active": true, "entity": "workspace", "key$": "BasicWorkspaceFlow", "kind": "basic", "name": "BasicWorkspaceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "workspace_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "workspace_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "workspace_ref01", "srcdatavar": "workspace_ref01_data", "suffix": "_dt0" }, "m": { "id": "workspace01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-workspace_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "workspace_ref01", "suffix": "_rm0" }, "m": { "id": "workspace01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "workspace_ref01" } }], "index$": 4 }] }, 'Workspace', { "POST /api/v1/workspaces/{workspace_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "anyOf": [{ "type": "string", "maxLength": 255, "minLength": 1 }, { "type": "null" }], "title": "Name", "description": "Updated workspace name. Passing null or omitting this field will leave it unchanged.", "examples": ["Design Team"], "key$": "name" }, "description": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Description", "description": "Updated workspace description. Passing null or omitting this field will leave it unchanged.", "examples": ["Workspace for design projects."], "key$": "description" }, "is_link_sharing_enabled": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Is Link Sharing Enabled", "description": "Updated link sharing status. Passing null or omitting this field will leave it unchanged.", "examples": [true], "key$": "is_link_sharing_enabled" }, "is_guest_allowed": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Is Guest Allowed", "description": "Updated guest access status. Passing null or omitting this field will leave it unchanged.", "examples": [true], "key$": "is_guest_allowed" }, "domain_name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Domain Name", "description": "Updated workspace email domain. Passing null or omitting this field will leave it unchanged.", "examples": ["example.com"], "key$": "domain_name" }, "domain_discovery": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Domain Discovery", "description": "Updated domain discovery setting. Passing null or omitting this field will leave it unchanged.", "examples": [false], "key$": "domain_discovery" }, "restrict_email_domains": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Restrict Email Domains", "description": "Updated email domain restriction setting. Passing null or omitting this field will leave it unchanged.", "examples": [false], "key$": "restrict_email_domains" }, "properties": { "anyOf": [{ "properties": { "industry": {}, "department": {}, "organization_size": {}, "intended_team_size": {}, "type_of_work": {}, "creator_role": {}, "region": {}, "country": {}, "default_access_level": {}, "desktop_workspace_modal": {}, "beta_enabled": {}, "acquisition_source": {}, "team_acquisition_cohort": {}, "acquisition_loop_last_show": {}, "hdyhau": {}, "onboarding_filter_id": {}, "created_platform": {} }, "type": "object", "title": "PublicWorkspaceProperties", "description": "Client-settable workspace properties.\n\nTrusted-only provenance fields are rejected outright (including\nexplicit nulls) so the public create/update surfaces can neither opt\na workspace into import behavior nor clear its provenance.", "x-ref": "#/components/schemas/PublicWorkspaceProperties" }, { "type": "null" }], "description": "Updated workspace properties. Passing null or omitting this field will leave it unchanged.", "examples": [{}], "key$": "properties" }, "is_trial_pending": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Is Trial Pending", "description": "Updated trial pending state. Passing null or omitting this field will leave it unchanged.", "examples": [false], "key$": "is_trial_pending" }, "invite_code": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Invite Code", "description": "Regenerate workspace invite code when set. Passing null or omitting this field will leave it unchanged.", "examples": ["regenerate"], "key$": "invite_code" }, "is_collapsed": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Is Collapsed", "description": "Updated collapse state for current user. Passing null or omitting this field will leave it unchanged.", "examples": [false], "key$": "is_collapsed" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_b628cfc1", "index$": 1 } } } }, "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "description": "ID of the workspace", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }] }, "POST /api/v1/workspaces": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "name": { "anyOf": [{ "type": "string", "maxLength": 255, "minLength": 1 }, { "type": "null" }], "title": "Name", "description": "Name of the workspace.", "examples": ["Design Team"], "key$": "name" }, "description": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Description", "description": "Description of the workspace.", "examples": ["Workspace for design projects."], "key$": "description" }, "is_link_sharing_enabled": { "type": "boolean", "title": "Is Link Sharing Enabled", "description": "Whether link sharing is enabled for the workspace.", "default": true, "examples": [true], "key$": "is_link_sharing_enabled" }, "is_guest_allowed": { "type": "boolean", "title": "Is Guest Allowed", "description": "Whether guests are allowed in the workspace.", "default": true, "examples": [true], "key$": "is_guest_allowed" }, "domain_name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Domain Name", "description": "Workspace email domain.", "examples": ["example.com"], "key$": "domain_name" }, "domain_discovery": { "type": "boolean", "title": "Domain Discovery", "description": "Whether users with matching email domains can discover this workspace.", "default": false, "examples": [false], "key$": "domain_discovery" }, "restrict_email_domains": { "type": "boolean", "title": "Restrict Email Domains", "description": "Whether workspace invites are restricted to workspace domain.", "default": false, "examples": [false], "key$": "restrict_email_domains" }, "properties": { "anyOf": [{ "properties": { "industry": {}, "department": {}, "organization_size": {}, "intended_team_size": {}, "type_of_work": {}, "creator_role": {}, "region": {}, "country": {}, "default_access_level": {}, "desktop_workspace_modal": {}, "beta_enabled": {}, "acquisition_source": {}, "team_acquisition_cohort": {}, "acquisition_loop_last_show": {}, "hdyhau": {}, "onboarding_filter_id": {}, "created_platform": {} }, "type": "object", "title": "PublicWorkspaceProperties", "description": "Client-settable workspace properties.\n\nTrusted-only provenance fields are rejected outright (including\nexplicit nulls) so the public create/update surfaces can neither opt\na workspace into import behavior nor clear its provenance.", "x-ref": "#/components/schemas/PublicWorkspaceProperties" }, { "type": "null" }], "description": "Workspace properties.", "examples": [{}], "key$": "properties" }, "is_trial_pending": { "type": "boolean", "title": "Is Trial Pending", "description": "Whether the workspace is waiting for trial confirmation.", "default": false, "examples": [false], "key$": "is_trial_pending" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_e1a528d7", "index$": 1 } } }, "required": true }, "parameters": [] }, "POST /api/v1/workspaces/logo": { "protocol": "http", "requestBody": { "content": { "multipart/form-data": { "schema": { "properties": { "workspace_id": { "type": "integer", "title": "Workspace Id" }, "delete": { "type": "boolean", "title": "Delete", "default": false }, "file": { "type": "string", "contentMediaType": "application/octet-stream", "title": "File" } }, "type": "object", "required": ["workspace_id", "file"], "title": "Body_update_logo_api_v1_workspaces_logo_post", "x-ref": "#/components/schemas/Body_update_logo_api_v1_workspaces_logo_post" } } }, "required": true }, "parameters": [] }, "GET /api/v1/workspaces/invitations": { "protocol": "http", "parameters": [{ "name": "workspace_id", "in": "query", "required": true, "schema": { "type": "integer", "description": "ID of the workspace.", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }] }, "GET /api/v1/workspaces": { "protocol": "http", "parameters": [] }, "GET /api/v1/workspaces/{workspace_id}": { "protocol": "http", "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "description": "ID of the workspace", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }] }, "DELETE /api/v1/workspaces/{workspace_id}": { "protocol": "http", "parameters": [{ "name": "workspace_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "description": "ID of the workspace", "examples": [123456], "title": "Workspace Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const workspace_ref01_ent = client.Workspace();
        let workspace_ref01_data = setup.data.new.workspace['workspace_ref01'];
        workspace_ref01_data = (await workspace_ref01_ent.create(workspace_ref01_data)).data();
        (0, node_assert_1.default)(null != workspace_ref01_data.id);
        // LIST
        const workspace_ref01_match = {};
        const workspace_ref01_list = (await workspace_ref01_ent.list(workspace_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(workspace_ref01_list, { id: workspace_ref01_data.id })));
        // LOAD
        const workspace_ref01_match_dt0 = {};
        workspace_ref01_match_dt0.id = workspace_ref01_data.id;
        const workspace_ref01_data_dt0 = (await workspace_ref01_ent.load(workspace_ref01_match_dt0)).data();
        (0, node_assert_1.default)(workspace_ref01_data_dt0.id === workspace_ref01_data.id);
        // REMOVE
        const workspace_ref01_match_rm0 = { id: workspace_ref01_data.id };
        await workspace_ref01_ent.remove(workspace_ref01_match_rm0);
        // LIST
        const workspace_ref01_match_rt0 = {};
        const workspace_ref01_list_rt0 = (await workspace_ref01_ent.list(workspace_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(workspace_ref01_list_rt0, { id: workspace_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/workspace/WorkspaceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['workspace01', 'workspace02', 'workspace03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_WORKSPACE_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TODOIST_TEST_WORKSPACE_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_WORKSPACE_ENTID'];
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
//# sourceMappingURL=WorkspaceEntity.test.js.map