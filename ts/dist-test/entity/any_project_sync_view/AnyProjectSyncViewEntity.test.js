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
(0, node_test_1.describe)('AnyProjectSyncViewEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.AnyProjectSyncView();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('any_project_sync_view hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TodoistSDK.test(offline).AnyProjectSyncView().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TodoistSDK.test(offline).AnyProjectSyncView()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TodoistSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.AnyProjectSyncView().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TodoistSDK.test().AnyProjectSyncView().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TodoistSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.AnyProjectSyncView().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.AnyProjectSyncView().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TodoistSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AnyProjectSyncView().list({ "folder_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'any_project_sync_view.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "child_order": { "a": true, "h": "Child Order", "n": "child_order", "r": false, "sh": "Updated position of the project in the hierarchy.", "t": "`$ANY`", "key$": "child_order", "index$": 0 }, "color": { "a": true, "h": "Color", "n": "color", "r": false, "sh": "Updated project color.", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 2 }, "key$": "color", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Updated project description.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "folder_id": { "a": true, "h": "Folder Id", "n": "folder_id", "r": false, "sh": "Folder to move the project into.", "t": "`$STRING`", "key$": "folder_id", "index$": 3 }, "icon": { "a": true, "h": "Icon", "n": "icon", "r": false, "sh": "Updated project icon name.", "t": "`$ANY`", "key$": "icon", "index$": 4 }, "is_collapsed": { "a": true, "h": "Is Collapsed", "n": "is_collapsed", "r": false, "sh": "Whether the project is collapsed.", "t": "`$BOOLEAN`", "key$": "is_collapsed", "index$": 5 }, "is_favorite": { "a": true, "h": "Is Favorite", "n": "is_favorite", "r": false, "sh": "Whether the project is marked as a favorite.", "t": "`$BOOLEAN`", "key$": "is_favorite", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Updated project name.", "t": "`$STRING`", "key$": "name", "index$": 7 }, "next_cursor": { "a": true, "h": "Next Cursor", "n": "next_cursor", "r": true, "sh": "Cursor for the next page of results, or `null` when there are no more results.", "t": "`$ANY`", "key$": "next_cursor", "index$": 8 }, "parent_id": { "a": true, "h": "Parent Id", "n": "parent_id", "r": false, "sh": "Parent project ID.", "t": "`$STRING`", "key$": "parent_id", "index$": 9 }, "results": { "a": true, "h": "Results", "n": "results", "r": true, "sh": "Objects in the current page of results.", "t": "`$ARRAY`", "union": { "branches": 3, "count": 2, "depth": 9 }, "key$": "results", "index$": 10 }, "view_style": { "a": true, "h": "View Style", "n": "view_style", "r": false, "sh": "Updated project view style.", "t": "`$ANY`", "key$": "view_style", "index$": 11 }, "workspace_id": { "a": true, "h": "Workspace Id", "n": "workspace_id", "r": false, "sh": "Workspace ID.", "t": "`$STRING`", "key$": "workspace_id", "index$": 12 } }, "name": "any_project_sync_view", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["child_order", "color", "description", "folder_id", "icon", "is_collapsed", "is_favorite", "name", "view_style"], "co": { "id": "POST /api/v1/projects/{project_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/projects/{project_id}", "q": { "exist": ["project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "projects" }, { "var": "project_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /api/v1/projects/{project_id}/archive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/projects/{project_id}/archive", "q": { "exist": ["project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "archive" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /api/v1/projects/{project_id}/join", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/projects/{project_id}/join", "q": { "$action": "join", "exist": ["project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "join" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "POST /api/v1/projects/{project_id}/unarchive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/projects/{project_id}/unarchive", "q": { "exist": ["project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "unarchive" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": ["color", "description", "icon", "is_favorite", "name", "parent_id", "view_style", "workspace_id"], "co": { "id": "POST /api/v1/projects", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/projects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/projects", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "folder_id", "or": "folder_id", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "workspace_id", "or": "workspace_id", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/projects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/projects/{project_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/projects/{project_id}", "q": { "exist": ["project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "projects" }, { "var": "project_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.project"]] }, "key$": "any_project_sync_view", "name__orig": "any_project_sync_view", "Name": "AnyProjectSyncView", "name_": "any_project_sync_view", "name-": "any-project-sync-view", "NAME": "ANY_PROJECT_SYNC_VIEW", "index$": 2 }, { "active": true, "entity": "any_project_sync_view", "key$": "BasicAnyProjectSyncViewFlow", "kind": "basic", "name": "BasicAnyProjectSyncViewFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "any_project_sync_view_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "any_project_sync_view_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "any_project_sync_view_ref01", "srcdatavar": "any_project_sync_view_ref01_data", "suffix": "_dt0" }, "m": { "id": "any_project_sync_view01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-any_project_sync_view_ref01" } }], "unreachable": true }] }, 'AnyProjectSyncView', { "POST /api/v1/projects/{project_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Name", "description": "Updated project name. Passing null or omitting this field will leave it unchanged.", "examples": ["Vacation Planning"], "key$": "name" }, "description": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Description", "description": "Updated project description. Passing null or omitting this field will leave it unchanged.", "examples": ["Tasks for planning the trip."], "key$": "description" }, "color": { "anyOf": [{ "anyOf": [{}, {}], "examples": ["charcoal"], "x-ref": "#/components/schemas/APIColorID" }, { "type": "null" }], "description": "Updated project color. Passing null or omitting this field will leave it unchanged.", "examples": ["charcoal"], "key$": "color" }, "icon": { "anyOf": [{ "type": "string", "enum": ["briefcase", "folder", "diagram", "headset", "microphone", "flag", "bullseye", "house", "heart", "airplane", "gift", "pin", "school_cap", "lightbulb", "star"], "examples": ["lightbulb"] }, { "type": "null" }], "title": "Icon", "description": "Updated project icon name. Pass null to reset to the default icon. Omit this field to keep it unchanged.", "examples": ["lightbulb"], "key$": "icon" }, "is_favorite": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Is Favorite", "description": "Whether the project is marked as a favorite. Passing null or omitting this field will leave it unchanged.", "examples": [true], "key$": "is_favorite" }, "view_style": { "anyOf": [{ "type": "string", "enum": ["list", "board", "calendar"], "x-ref": "#/components/schemas/ProjectViewStyleV1" }, { "type": "null" }], "description": "Updated project view style. Passing null or omitting this field will leave it unchanged.", "examples": ["board"], "key$": "view_style" }, "child_order": { "anyOf": [{ "type": "integer", "maximum": 2147483647, "minimum": -2147483648 }, { "type": "null" }], "title": "Child Order", "description": "Updated position of the project in the hierarchy. Only supported for personal projects. Passing null or omitting this field will leave it unchanged.", "examples": [12], "key$": "child_order" }, "is_collapsed": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Is Collapsed", "description": "Whether the project is collapsed. Passing null or omitting this field will leave it unchanged.", "examples": [false], "key$": "is_collapsed" }, "folder_id": { "anyOf": [{ "type": "integer", "exclusiveMinimum": 0, "description": "Numeric ID of the folder.", "examples": [1234] }, { "type": "null" }], "title": "Folder Id", "description": "Folder to move the project into. Only supported for workspace projects. Pass null to clear the value. Omit this field to keep it unchanged.", "key$": "folder_id" } }, "type": "object", "title": "Body", "x-ref": "#/components/schemas/Body_cb8d28ec", "index$": 1 } } } }, "parameters": [{ "name": "project_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the project", "examples": ["6XGgm6PHrGgMpCFX"], "title": "Project Id" }, "index$": 0 }] }, "POST /api/v1/projects/{project_id}/archive": { "protocol": "http", "parameters": [{ "name": "project_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the project", "examples": ["6XGgm6PHrGgMpCFX"], "title": "Project Id" }, "index$": 0 }] }, "POST /api/v1/projects/{project_id}/join": { "protocol": "http", "parameters": [{ "name": "project_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the workspace project to join.", "examples": ["6XGgm6PHrGgMpCFX"], "title": "Project Id" }, "index$": 0 }] }, "POST /api/v1/projects/{project_id}/unarchive": { "protocol": "http", "parameters": [{ "name": "project_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the project", "examples": ["6XGgm6PHrGgMpCFX"], "title": "Project Id" }, "index$": 0 }] }, "POST /api/v1/projects": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Name", "description": "Name of the project.", "examples": ["Vacation Planning"], "key$": "name" }, "description": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Description", "description": "Description of the project.", "examples": ["Tasks for planning the trip."], "key$": "description" }, "parent_id": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Parent Id", "description": "Parent project ID. If provided, creates this project as a sub-project", "examples": ["6XGgm6PHrGgMpCFX"], "key$": "parent_id" }, "color": { "anyOf": [{ "type": "string", "enum": ["berry_red", "red", "orange", "yellow", "olive_green", "lime_green", "green", "mint_green", "teal", "sky_blue", "light_blue", "blue", "grape", "violet", "lavender", "magenta", "salmon", "charcoal", "grey", "taupe"] }, { "type": "integer", "enum": [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49] }], "examples": ["charcoal"], "description": "Color of the project icon.", "default": "charcoal", "x-ref": "#/components/schemas/APIColorID", "key$": "color" }, "icon": { "anyOf": [{ "type": "string", "enum": ["briefcase", "folder", "diagram", "headset", "microphone", "flag", "bullseye", "house", "heart", "airplane", "gift", "pin", "school_cap", "lightbulb", "star"], "examples": ["lightbulb"] }, { "type": "null" }], "title": "Icon", "description": "Project icon name. Pass null or omit it for the default icon.", "examples": ["lightbulb"], "key$": "icon" }, "is_favorite": { "type": "boolean", "title": "Is Favorite", "description": "Whether the project is a favorite for the user.", "default": false, "examples": [false], "key$": "is_favorite" }, "view_style": { "anyOf": [{ "type": "string", "enum": ["list", "board", "calendar"], "x-ref": "#/components/schemas/ProjectViewStyleV1" }, { "type": "null" }], "description": "View style of the project.", "examples": ["list"], "key$": "view_style" }, "workspace_id": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Workspace Id", "description": "Workspace ID. If provided, creates a workspace project instead of a personal project.", "examples": [123456], "key$": "workspace_id" } }, "type": "object", "required": ["name"], "title": "Body", "x-ref": "#/components/schemas/Body_207bf8bc", "index$": 1 } } } }, "parameters": [] }, "GET /api/v1/projects": { "protocol": "http", "parameters": [{ "name": "folder_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "exclusiveMinimum": 0, "description": "Numeric ID of the folder.", "examples": [1234] }, { "type": "null" }], "description": "Filter projects to only those in this folder. If provided, workspace_id is ignored.", "title": "Folder Id" }, "index$": 0 }, { "name": "workspace_id", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "exclusiveMinimum": 0, "description": "Numeric ID of the workspace.", "examples": [123456] }, { "type": "null" }], "description": "Filter projects to only those in this workspace. Ignored if folder_id is also provided.", "title": "Workspace Id" }, "index$": 1 }, { "name": "cursor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "minLength": 1, "pattern": "^[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_-]+$", "description": "An opaque string used as the cursor for pagination. Must be used with the same parameters from the previous request", "examples": ["14540000435w8hj8pXXwPQJJch.X9DBH8ya2Xenok55"] }, { "type": "null" }], "title": "Cursor" }, "index$": 2 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 200, "exclusiveMinimum": 0, "description": "The number of objects to return in a page", "examples": [50], "default": 50, "title": "Limit" }, "index$": 3 }] }, "GET /api/v1/projects/{project_id}": { "protocol": "http", "parameters": [{ "name": "project_id", "in": "path", "required": true, "schema": { "type": "string", "description": "String ID of the project", "examples": ["6XGgm6PHrGgMpCFX"], "title": "Project Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const any_project_sync_view_ref01_ent = client.AnyProjectSyncView();
        let any_project_sync_view_ref01_data = setup.data.new.any_project_sync_view['any_project_sync_view_ref01'];
        any_project_sync_view_ref01_data = (await any_project_sync_view_ref01_ent.create(any_project_sync_view_ref01_data)).data();
        (0, node_assert_1.default)(null != any_project_sync_view_ref01_data);
        // LIST
        const any_project_sync_view_ref01_match = {};
        const any_project_sync_view_ref01_list = (await any_project_sync_view_ref01_ent.list(any_project_sync_view_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/any_project_sync_view/AnyProjectSyncViewTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['any_project_sync_view01', 'any_project_sync_view02', 'any_project_sync_view03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_ANY_PROJECT_SYNC_VIEW_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TODOIST_TEST_ANY_PROJECT_SYNC_VIEW_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_ANY_PROJECT_SYNC_VIEW_ENTID'];
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
//# sourceMappingURL=AnyProjectSyncViewEntity.test.js.map