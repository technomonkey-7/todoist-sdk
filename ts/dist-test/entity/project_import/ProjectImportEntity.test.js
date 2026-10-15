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
(0, node_test_1.describe)('ProjectImportEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TODOIST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TODOIST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TodoistSDK.test();
        const ent = testsdk.ProjectImport();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TODOIST_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project_import.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "project_import", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/v1/templates/import_into_project_from_file", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/templates/import_into_project_from_file", "q": { "$action": "from_file" }, "r": {}, "rb": { "fields": [{ "binary": true, "media": "application/octet-stream", "name": "file" }, { "name": "project_id" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "templates" }, { "lit": "import_into_project_from_file" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["locale", "project_id", "template_id"], "co": { "id": "POST /api/v1/templates/import_into_project_from_template_id", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/templates/import_into_project_from_template_id", "q": { "$action": "from_template" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "templates" }, { "lit": "import_into_project_from_template_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /api/v1/templates/create_project_from_file", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/templates/create_project_from_file", "q": { "$action": "new_project_from_file" }, "r": {}, "rb": { "fields": [{ "binary": true, "media": "application/octet-stream", "name": "file" }, { "name": "name" }, { "name": "workspace_id" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "templates" }, { "lit": "create_project_from_file" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "project_import", "name__orig": "project_import", "Name": "ProjectImport", "name_": "project_import", "name-": "project-import", "NAME": "PROJECT_IMPORT", "index$": 18 }, { "active": true, "entity": "project_import", "key$": "BasicProjectImportFlow", "kind": "basic", "name": "BasicProjectImportFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "project_import_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "unreachable": true }] }, 'ProjectImport', { "POST /api/v1/templates/import_into_project_from_file": { "protocol": "http", "requestBody": { "content": { "multipart/form-data": { "schema": { "properties": { "project_id": { "type": "string", "title": "Project Id" }, "file": { "type": "string", "contentMediaType": "application/octet-stream", "title": "File" } }, "type": "object", "required": ["project_id", "file"], "title": "Body_import_into_project_from_file_api_v1_templates_import_into_project_from_file_post", "x-ref": "#/components/schemas/Body_import_into_project_from_file_api_v1_templates_import_into_project_from_file_post" } } }, "required": true }, "parameters": [] }, "POST /api/v1/templates/import_into_project_from_template_id": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "project_id": { "type": "string", "title": "Project Id", "description": "String ID of the project to import the template into.", "examples": ["6XGgm6PHrGgMpCFX"] }, "template_id": { "type": "string", "title": "Template Id", "description": "ID of the saved template to import.", "examples": ["123456"] }, "locale": { "type": "string", "title": "Locale", "description": "Locale to use for localized template content.", "default": "en", "examples": ["en"] } }, "type": "object", "required": ["project_id", "template_id"], "title": "Body", "x-ref": "#/components/schemas/Body_925d2d9b" } } }, "required": true }, "parameters": [] }, "POST /api/v1/templates/create_project_from_file": { "protocol": "http", "requestBody": { "content": { "multipart/form-data": { "schema": { "properties": { "name": { "type": "string", "title": "Name" }, "workspace_id": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Workspace Id" }, "file": { "type": "string", "contentMediaType": "application/octet-stream", "title": "File" } }, "type": "object", "required": ["name", "file"], "title": "Body_create_project_from_file_api_v1_templates_create_project_from_file_post", "x-ref": "#/components/schemas/Body_create_project_from_file_api_v1_templates_create_project_from_file_post" } } }, "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let project_import_ref01_data = Object.values(setup.data.existing.project_import)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project_import/ProjectImportTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TodoistSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project_import01', 'project_import02', 'project_import03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TODOIST_TEST_PROJECT_IMPORT_ENTID': idmap,
        'TODOIST_TEST_LIVE': 'FALSE',
        'TODOIST_TEST_EXPLAIN': 'FALSE',
        'TODOIST_APIKEY': '',
    });
    idmap = env['TODOIST_TEST_PROJECT_IMPORT_ENTID'];
    const live = 'TRUE' === env.TODOIST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TODOIST_TEST_PROJECT_IMPORT_ENTID'];
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
//# sourceMappingURL=ProjectImportEntity.test.js.map