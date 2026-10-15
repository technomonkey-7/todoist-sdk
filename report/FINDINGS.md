# Findings in full

Companion to [REPORT.md](../REPORT.md). Checked on the latest published packages on 2026-10-15: create-sdkgen 0.30.7, @voxgig/sdkgen 4.34.7, @voxgig/apidef 8.25.2, @voxgig/model 12.0.1, aontu 0.76.0. Environment: Windows 11, Node 24.20.0, Go 1.27.0, Python 3.13.7. "Who is affected" was checked against the generated code of voxgig-sdk/buggie-sdk and the issue trackers of voxgig/sdkgen, apidef, create-sdkgen and model.

### F1 — The Node 24 floor is stated in the agent guides but not in the human tutorial
- Stage: Environment
- Severity: papercut
- Who is affected: Anyone following the tutorial on Node 22 or older.
- Upstream: No existing issue found.
- Context: sdkgen `docs/tutorial.md` and create-sdkgen `AGENTS.md` on `main`, read 2026-10-15.
- Steps: Read the tutorial's "What you'll need", then create-sdkgen's AGENTS.md "Prerequisites".
- Expected: One stated minimum Node version in every entry point.
- Actual: The tutorial asks for "Node.js (a recent LTS)". create-sdkgen's AGENTS.md says "Node.js 24 or later (the floor aontu and sdkgen declare)", and apidef's AGENTS.md notes that `ts/package.json` declares no `engines`, "so nothing enforces it locally". The voxgig.com/sdk page and the create-sdkgen README name no version. A machine on Node 22 LTS (still in maintenance) satisfies "a recent LTS".
- Workaround: Upgraded the system Node to 24.20.0 LTS before scaffolding.
- Suggested fix: State "Node.js 24 or later" in the tutorial, the create-sdkgen README and the voxgig.com/sdk quick start, and declare `"engines": { "node": ">=24" }` in the published packages so npm warns at install time.

### F2 — Windows workstation gaps the docs do not mention
- Stage: Environment
- Severity: papercut
- Who is affected: Windows users.
- Upstream: Related: sdkgen#234, create-sdkgen#64 (POSIX shell assumptions).
- Context: Stock Windows 11 with Git for Windows and python.org Python.
- Steps: Check the commands the docs use: `python3 -m pytest` (create-sdkgen AGENTS.md, step 4), `make build` (go-mcp README), `make test` (rb).
- Expected: Either the commands work on Windows or the docs give the Windows form.
- Actual: `python3` resolves to the Microsoft Store stub ("Python bulunamadı"), not the installed Python; `py` or `python` is the working launcher. `make` is not installed with Git for Windows. Recorded here before scaffolding; later entries note where this actually bites.
- Workaround: Python via `py -3.13 -m venv` and the venv's `python`; Go binaries via `go build -o`.
- Suggested fix: A short "On Windows" note in the create-sdkgen README: `py`/`python` instead of `python3`, `go build -o` instead of `make build`.

### F3 — create-sdkgen cannot run npm on Windows: `spawn npm ENOENT`
- Stage: Describe (scaffold)
- Severity: major (the documented one-line quick start fails on every Windows machine)
- Who is affected: Every Windows user of the documented quick start; reproduced independently by other contributors.
- Upstream: Known: create-sdkgen#58 (open).
- Context: @voxgig/create-sdkgen 0.30.7 (via `npm create @voxgig/sdkgen@latest`), jostraca 0.31.2, Node 24.20.0, Windows 11.
- Steps: `npm create --yes @voxgig/sdkgen@latest -- todoist -o todoist-sdk -d ./todoist-openapi.json -t ts,py,go,go-cli,go-mcp -f test`
- Expected: Scaffold, `npm install` in `.sdk`, targets and features added.
- Actual: Scaffold files are written, then `INFO create/jostraca generate-install running npm install in .\todoist-sdk\.sdk` followed by `Voxgig Create SDK Error: Failed to start npm: spawn npm ENOENT`; exit 1, leaving a half-built `.sdk` (no node_modules, no targets).
- Cause: `runNpm()` in `dist/create-sdkgen.js` calls `child_process.spawn('npm', args, { cwd, env, stdio: 'inherit' })`. On Windows npm is `npm.cmd`; libuv does not resolve `.cmd` through PATHEXT, and since Node 18.20.2/20.12.2 (CVE-2024-27980) a `.cmd` cannot be spawned without `shell: true` at all. Minimal repro: `node -e "require('child_process').spawn('npm',['-v']).on('error',e=>console.log(e.code))"` prints `ENOENT`; adding `shell: true` prints the npm version but Node 24 then warns `DEP0190` (args concatenated, not escaped).
- Workaround: Scaffold with `--no-install` and without `-t/-f`, then in `.sdk`: `npm install`, `npm run add-target ts,py,go,go-cli,go-mcp`, `npm run add-feature test`. The error text for the `-t` + `--no-install` combination already points to this.
- Suggested fix: Spawn npm through `cross-spawn`, or as `spawn(process.execPath, [process.env.npm_execpath, ...args])` when `npm_execpath` is set (it is under `npm create`), falling back to `cross-spawn`. Both avoid the shell and the DEP0190 warning. create-sdkgen's AGENTS.md says its build matrix includes Windows, so the CI path presumably scaffolds without the install step; a Windows test that runs `npm create` end to end would catch it.

### F4 — `npm run generate` fails on Windows: the scaffold's bare includes do not resolve
- Stage: Generate (model build)
- Severity: blocker on Windows
- Who is affected: Every Windows user.
- Upstream: Known: create-sdkgen#62 (open) and apidef#118 (closed, but still reproduces on the latest published packages). The evidence below answers the question #62 leaves open.
- Steps: Fresh scaffold (see F3), then `cd .sdk && npm run generate`.
- Expected: Model builds and SDKs are generated.
- Actual: `[aontu/multisource_not_found]: source not found: api/api-info.aontu --> ....sdkmodelsdk.aontu:13:1`, although the file exists at `.sdkmodelapiapi-info.aontu`. The first search path printed is `/Users/sonar/.../.sdk/api/api-info.aontu`: no drive letter, and `.sdkapi` instead of `.sdkmodelapi`.
- Cause: The scaffold writes bare includes (`@"api/api-info.aontu"` in `model/sdk.aontu`, `@"struct/test.aontu"` in `test/test.aontu`, 9 in all: 6 and 3). @voxgig/model injects the real fs into aontu, and `@tabnas/multisource` (`dist/resolver/file.js`, 0.5.8, and the same code in 0.6.3) then resolves a bare include with POSIX path rules: `path.posix.parse("C:\...\model\sdk.aontu").dir` is empty, so the include falls back to the current directory.
- Answer to #62: Prefixing the 9 bare includes with `./`, with multisource left unpatched, makes `npm run generate` succeed on Windows, and the generated output is byte-identical to the output committed here (zero files differ). So the scaffold fix proposed in #62 is sufficient; the multisource behaviour only matters for bare includes.
- Workaround used here: a one-line local patch to the resolver in the git-ignored `node_modules` (`report/scripts/patch-multisource-win.sh`), which gives the same output. Editing the two scaffold files the same way also works.
- Suggested fix: Ship the scaffold with `./` includes (#62), and run `npm create` plus `npm run generate` on a Windows runner in CI.

### F5 — A definition without `securitySchemes` silently yields an SDK with no auth
- Stage: Model
- Severity: major (every live call 401s; offline tests cannot see it)
- Who is affected: Any REST definition without securitySchemes. FastAPI omits them unless the app declares a security dependency.
- Upstream: No existing issue found.
- Context: apidef 8.25.2 `dist/transform/top.js`, sdkgen 4.34.7 `isAuthActive`. Todoist's FastAPI-generated definition has no `components.securitySchemes` and no `security`, although every endpoint needs `Authorization: Bearer <token>`.
- Steps: Generate from the unmodified definition; read `.sdk/model/api/api-info.aontu` and `ts/README.md`.
- Expected: Either auth code with a default scheme, or a warning that the SDK was generated without auth and how to turn it on.
- Actual: `info.auth: false` is written unconditionally for any non-GraphQL definition that declares no scheme (the explicit `auth` build option is honoured only for GraphQL). The generated SDKs omit credential handling, the READMEs never mention `apikey`, and the build prints no warning. The offline test suites pass, so nothing flags it before a live call.
- Workaround: `main: kit: config: auth: active: true` in `project.aontu` (documented in the model reference under `main.kit.config`; prefix defaults to `Bearer`).
- Suggested fix: Have apidef warn when a REST definition declares no security scheme ("generated without auth; set main.kit.config.auth.active: true if the API needs a credential"), and honour the `auth` build option for REST definitions as it already does for GraphQL. FastAPI apps omit the scheme unless the developer declares a security dependency, so this case is common.

### F6 — Entities are grouped by response component name, which splits FastAPI resources apart
- Stage: Model / Shape
- Severity: major (the out-of-the-box surface does not match the API's resources)
- Who is affected: Definitions produced by FastAPI-style frameworks.
- Upstream: Partly apidef#103 (closed): paginated wrappers still become entities here (`/tasks/filter`, `/projects/search`, `/labels/shared`), and naming by `*SyncView` components is not covered.
- Context: apidef 8.25.2, Todoist definition (FastAPI: components named `ItemSyncView`, `AnyProjectSyncView`, `NoteSyncView`, `PaginatedList_ItemSyncView_`, `StatusOk`).
- Steps: Generate; list entities (the baseline commit).
- Expected: One entity per Todoist resource (Task, Project, Section, Comment, Label), following the paths `/tasks`, `/tasks/{task_id}`.
- Actual: 51 entities. Task's operations are spread over `item_sync_view`, `task`, `paginated_list_item_sync_view`, `by_due_date` and `by_completion_date`; Project's over `any_project_sync_view` and `project`; Comment's over `note_sync_view` and `comment`. Schema names such as `status_ok` and `paginated_list_str` become entities.
- Workaround: Guide corrections in `.sdk/model/guide/guide.aontu`.
- Suggested fix: When the response component name and the path segment disagree, prefer the path segment for the entity name, or at least when the component name carries a known framework suffix (`SyncView`, `View`, `Response`, `PaginatedList_`). The guide's `why_*` trace would make the choice visible.

### F7 — `POST` on an item path is read as `create`, and verb sub-paths collide with it
- Stage: Model
- Severity: major (no core entity gets `update`; close/reopen/archive are unreachable)
- Who is affected: Any API that updates with POST on the item path.
- Upstream: No existing issue found.
- Context: apidef 8.25.2. Todoist updates with `POST /tasks/{task_id}`, and exposes verbs as `POST /tasks/{task_id}/close` etc.
- Steps: Generate; read `.sdk/apidef-warnings.txt`.
- Expected: `POST /{collection}/{id}` with a request body on an existing id classified as `update` (the convention FastAPI apps and Todoist use), and every `/{id}/<verb>` folded as an action.
- Actual: `POST /{id}` is a `create` point on every core resource, so none of them has `update`. Most verbs were folded as actions (task `close`/`reopen`, section `archive`/`unarchive`, project `join`, task `quick`), but task `move` and project `archive`/`unarchive` were not, and collide with `POST /{id}` on the same selector. The same verb is an action on sections and a plain point on projects. apidef warns `only POST /api/v1/tasks/{task_id} is ever chosen` (six warnings in all) and ends with `PARTIAL BUILD!`.
- Workaround: Guide corrections in `.sdk/model/guide/guide.aontu`.
- Suggested fix: Classify `POST` on an item path whose sibling `GET` loads the same entity as `update`; fold every verb sub-path the same way regardless of the resource.
- Positive: the warning text names the exact points and the reason, which made the diagnosis quick.

### F8 — A project not published by Voxgig carries Voxgig's identity until four model keys are set
- Stage: Shape (project identity)
- Severity: minor (documented, but the default is wrong for exactly the external developers this task invites)
- Who is affected: Anyone outside Voxgig.
- Upstream: No existing issue found.
- Context: create-sdkgen 0.30.7 writes `origin: 'voxgig-sdk'` into `.sdk/model/sdk.aontu`, a scaffold-owned file that is rewritten on re-scaffold. sdkgen 4.34.7.
- Steps: Scaffold, generate, read `LICENSE`, `ts/package.json`, `py/pyproject.toml`, `go/go.mod`.
- Expected: A way to say who publishes the SDK at scaffold time (a flag or a prompt), or names derived from the person running it.
- Actual: `Copyright (c) 2026 Voxgig`, npm `@voxgig-sdk/todoist-sdk`, PyPI `voxgig-sdk-todoist-sdk`, Go modules under `github.com/voxgig-sdk/`. Fixing it takes `main.kit.publisher`, `main.kit.repo.path` and `main.kit.target.{ts,py}.publish.registry.package` in `project.aontu`. create-sdkgen has no option for any of them.
- Positive: Once set, the model does the rest well. `repo.path` alone fixed all three Go module paths and every repository URL; `publisher` fixed LICENSE, NOTICE, SECURITY.md and the npm author; the non-ASCII name ("Çankaya") came through intact everywhere. The model reference explains why each key exists, with the incident that motivated it.
- Papercut: `py/pyproject.toml` gets no `authors` entry, while `ts/package.json` carries the publisher as `author`.
- Suggested fix: `create-sdkgen --publisher "<name>" --repo <org>/<repo>` (or an interactive prompt) that writes these keys into `project.aontu`; when `origin` is the default and a publisher is set, derive registry names from the repo owner instead of `voxgig-sdk`.

### F9 — Shaping through the guide works, but the main move is undocumented
- Stage: Shape
- Severity: positive, with a minor documentation gap
- Who is affected: Positive.
- Upstream: Documentation gap: no existing issue found.
- Context: apidef 8.25.2, `.sdk/model/guide/guide.aontu`.
- What worked: About 250 lines of guide (no edits to the definition, no generated code touched) took the surface from 51 entities with 6 apidef warnings and no `update` on any core resource to 34 entities, 0 warnings, full CRUD plus actions on Task, Project, Section, Comment and Label, and 105 of 108 operations reachable (the 3 left out are OAuth-app endpoints). The base guide uses defaults (`*POST`), so concrete corrections in the entry file win without conflicts, and the `active` flag at entity, path and op level is enough to move a route from one entity to another. Each step regenerated in about 7 s, which made the edit-generate-inspect loop fast.
- Gap: The guide reference's "Correcting the guide" section shows switching an entity off, adding an action, and choosing media types. It does not show the two moves this API needed most: gathering paths from several heuristic entities under one name (declare the paths on the target entity, switch the others off), and removing a wrongly classified op from a path (`op: create: active: false`). I found both by reading `@voxgig/apidef/model/guide.aontu`, the schema.
- Gap: There is no command that prints the resulting surface (entity → op → method, path, action). I wrote a 30-line script over `.sdk/model/sdk.json` (`report/scripts/model-summary.mjs`) to check each change; the classification is in the base guide, but the effective result after unification is only in `sdk.json`.
- Suggested fix: Add both moves to the reference with a short example, and a `voxgig-sdkgen surface` (or `apidef --summary`) command that prints the unified surface and the warnings count, so a shaping session can be verified step by step.

### F10 — Offline suites, features and the Go builds all ran on Windows without trouble
- Stage: Verify
- Severity: positive
- Who is affected: Positive.
- Upstream: —
- Context: Windows 11, Node 24.20.0, Python 3.13.7, Go 1.27.0.
- Observed: After the two scaffold/generate problems (F3, F4), nothing else needed a Windows workaround. ts, py and go suites were green on the first run (ts 515 pass, py 394, go 434 incl. subtests); `go build` and `go vet` were clean for go-cli and go-mcp; `feature add retry,timeout,paging` regenerated cleanly and kept every suite green. The py Makefile's `test` recipe uses `python -m pytest`, which works on Windows (only `publish` uses `python3`). `paging` recognised Todoist's `next_cursor` / `cursor` pair with no configuration.
- Note: The green offline suites said nothing about the two real problems in the baseline (no auth, F5; misgrouped resources, F6). They check the SDK against its own model, so they cannot catch a model that is wrong for the API. That is what the live suite is for.

### F11 — CLI and MCP server: build instructions assume make; the CLI has no create or remove
- Stage: Verify
- Severity: papercut (build) / observation (CLI scope)
- Who is affected: Windows users (make); every generated CLI (scope).
- Upstream: Related: sdkgen#234 (cross-platform scripts), sdkgen#392 (go install blocked by a replace directive).
- Context: go-cli and go-mcp generated by sdkgen 4.34.7, Windows 11, Go 1.27.0.
- Observed: `go-mcp/README.md` gives `make build` (-> `dist/<os>-<arch>/todoist-mcp`) as the build step; Git for Windows has no make. `go build -o ../.bin/todoist-mcp.exe .` works and the binary runs: `initialize` reports `todoist 0.0.1 (protocol 2025-06-18)` and `tools/list` returns `todoist_create, todoist_list, todoist_load, todoist_remove, todoist_update` once `main.kit.target.go-mcp.tool.write` is true. The CLI (`todoist-cli`, boru expressions plus a REPL) offers `list`, `load` and `update` only, while the MCP server can create and remove.
- Suggested fix: Give the plain `go build -o <name> .` line beside `make build` in both READMEs. If create and remove are left out of the CLI on purpose (as for the MCP server's default), say so in its `--help`.

### F12 — Each target looks for `.env.local` in a different place; the README says "the project root"
- Stage: Verify (live)
- Severity: major (a live run with the credential where the README says produces 401 on every call in ts, and nothing says the file was not found)
- Who is affected: Every generated SDK, on any OS (the same code is in voxgig-sdk/buggie-sdk).
- Upstream: No existing issue found.
- Context: sdkgen 4.34.7 test templates; `.env.local` at the repository root, as the root README and each target README ("Create a `.env.local` file at the project root") suggest.
- Steps: Put `TODOIST_APIKEY=...` in `<repo>/.env.local`; `cd ts && TODOIST_TEST_LIVE=TRUE npm test`.
- Expected: The live suite authenticates.
- Actual: ts: 71 failures, every request `401`. The compiled ts tests read `__dirname + '/../../../.env.local'`, which from `ts/dist-test/entity/<e>/` is `ts/.env.local`. go reads `<go/test>/../../.env.local`, the repository root. py reads `open("../../.env.local")`, relative to the current directory: from `py/` (where its Makefile runs `python -m pytest test/`) that is the directory above the repository. A missing file is silently ignored in all three.
- Workaround: Export the variable for the run instead (`TODOIST_APIKEY=... npm test`): all three override the file with the environment in live mode, and all three trim CRLF line endings correctly.
- Suggested fix: Resolve one location for every target, the repository root, relative to the test file rather than the cwd (py: `Path(__file__).resolve().parents[2]`), and print a one-line notice in live mode when no credential was found ("TODOIST_APIKEY not set; looked in <path> and the environment").

### F13 — The generated update flow writes its test mark into the first string field, whatever it means
- Stage: Verify (live)
- Severity: minor (two false failures here; on other APIs it can write nonsense into a real field of a record the test created)
- Who is affected: Every generated SDK (buggie-sdk's issue flow marks `client_audience`).
- Upstream: No existing issue found.
- Context: apidef 8.25.2 `dist/transform/flowstep.js` `firstTextField()`.
- Steps: Live run of the generated ts suite.
- Expected: The update step changes a free-text field (`content`, `name`, `description`) and reads the mark back.
- Actual: `firstTextField` sorts the entity's fields by name and takes the first `$STRING` that is not `id`, not read-only and not a path parameter. Task gets `assignee_id` (a user id), Label gets `color` (an enum: `berry_red`, ...), Section gets `added_at` (a timestamp the definition does not mark read-only). Todoist answers 400 to `assignee_id: "Mark01-task_ref01_..."` and `color: "Mark01-..."`. The source comment already says "which field this lands on is alphabetical accident". The hand-written scenario, which updates `content` and `color: 'berry_red'`, passes, so the update routes themselves work.
- Workaround: None in the model: the guide's op-level `live` hint feeds only the create step's input. Reported as two classified failures.
- Suggested fix: Prefer fields named `name`, `title`, `content`, `description`, `summary`; skip names ending in `_id`, `_uid`, `_at`, fields with an `enum` or a `format`, and fields of type `date-time`. Let the guide name the field (`op: update: live: textfield: content`).

### F14 — Live create flows cannot reach a parent created in the same run
- Stage: Verify (live)
- Severity: minor for Todoist (Section and Comment creation fails; 14 more flows are blocked on parent ids or required query values)
- Who is affected: SDKs with nested resources whose parent id travels in the request body.
- Upstream: No existing issue found (sdkgen#393 is a related parent-id problem in lua and perl tests).
- Context: generated `ts/test/live-entity.ts`, `TODOIST_TEST_<ENTITY>_ENTID`.
- Steps: Live run; read the Section flow's create step and the runner.
- Expected: A way to give `section.create` a real `project_id` (a project created earlier in the run, or one supplied by the user).
- Actual: The create body is synthesised from the definition's examples, so `project_id` is `6XGgm6PHrGgMpCFX` and Todoist answers 404. The per-entity `TODOIST_TEST_<ENTITY>_ENTID` JSON map fills path and required query parameters, but not body fields, and it is not mentioned in any generated README or AGENTS.md. Flows that need a `workspace_id` (folders, workspace projects, invitations, plan details) or a required query (`since`/`until` for completed tasks) are blocked the same way.
- Workaround: The hand-written scenario (`report/scripts/live-scenario.cjs`) creates the project first and passes its id: section, task-in-section, comments, close/reopen and label all pass live (16/16).
- Suggested fix: Let the ENTID map (or the guide's `live` hint) fill body fields too, and document the variable in each target's "Run live tests" section. Longer term, the flow already knows `relations.ancestors`; a create step could take a parent from an earlier create of the parent entity in the same run.

### F15 — Generated direct tests call the first route of an op, even when it is an action
- Stage: Verify (live)
- Severity: minor (15 of 23 direct-test failures)
- Who is affected: SDKs where an op's first route is an action.
- Upstream: No existing issue found.
- Context: generated `ts/test/entity/*/<Entity>Direct.test.ts`.
- Steps: Live run.
- Expected: `direct-list-project` calls `GET /api/v1/projects`.
- Actual: It calls the first point of `list`, which for project, task, label, section and workspace is an action route (`/projects/search`, `/tasks/filter`, `/labels/search`, `/sections/search`, `/workspaces/invitations`) with a required `query` or `workspace_id`; Todoist answers 400. The live entity runner handles this correctly ("an action route is taken only when the step names its action or the operation has no other route"); the direct-test template does not apply the same rule. The workspace case comes from the heuristic's own `invitation` action, so it is not caused by the guide corrections.
- Suggested fix: Use the entity runner's route choice in the direct tests: skip points with `q.$action` unless the op has no other point.

### F16 — Excluding every step of a flow through sdk-test-control fails it instead of skipping it
- Stage: Verify (live)
- Severity: minor (7 failures that only say "I was told not to run")
- Who is affected: SDKs with write-only entities.
- Upstream: No existing issue found.
- Context: `sdk-test-control.json` `skip.live.entityOp`, `main.kit.test.live.strict: true` (default).
- Steps: Exclude `top_up.create` (the entity's only step) and run live.
- Expected: The entity's live test is skipped, with the reason from the control file.
- Actual: `Live coverage incomplete: {"planned":1,"attempted":0,...,"excluded":1}` and the test fails. A flow with at least one passing read and its writes excluded passes, so only write-only entities are affected (billing_portal_url, email, notification_setting, project_import, subscription_info, top_up, upload).
- Positive: The control file itself is well designed: sdkgen writes it once and never overwrites it (`TestControl`, `exclude: true`), and a reason travels with each entry into the live report.
- Suggested fix: Count `excluded` like `empty`: a flow with nothing attempted because everything was excluded should skip with the control file's reasons.

### F17 — The live suites are not at parity: ts has the new runner, py and go the old inline flow
- Stage: Verify (live)
- Severity: major (sdkgen's own AGENTS.md calls language parity "CRITICAL"; the same SDK model gives different live results per language)
- Who is affected: Every generated SDK (the same py and go templates are in buggie-sdk).
- Upstream: No existing issue found.
- Context: generated tests in `ts/test/live-entity.ts` versus `py/test/test_<entity>_entity.py` and `go/test/<entity>_entity_test.go`; same model, same account, same run conditions .
- Observed:
  - Create input. ts synthesises the create body from the definition's request schema and examples; py and go send the offline mock fixture as the live body, e.g. project `{"color":"s231","folder_id":"FOLDER01","parent_id":"PARENT01","workspace_id":"WORKSPACE01","view_style":"s23c",...}`, which Todoist rejects with 400. So the Project flow passes 6/6 in ts and fails at its first step in py and go.
  - Singletons. ts loads `GET /api/v1/user` without an id; py and go block ("the flow loads a user record it has no list to find").
  - Exclusions. In py and go, excluding one op skips the whole flow, reads included ("skipping any one skips the whole flow"); in ts the remaining steps run, and a flow left with nothing to run fails (F16).
  - Result: ts 465 pass / 44 fail; py 341 / 39; go 349 / 39 subtests. py and go fail the same 39 tests.
- Suggested fix: Port the ts live runner (contract-based input synthesis, id-less load, per-step exclusion with reasons) to the py and go templates, and add a cross-language check that the same model yields the same live plan.

### F18 — The generated MCP server's list tool returns an array as structuredContent; Claude Code rejects it
- Stage: Verify (MCP)
- Severity: major (the list tool is unusable from a schema-validating MCP client such as Claude Code)
- Who is affected: Every generated MCP server (the same `runOp` is in buggie-sdk).
- Upstream: No existing issue found.
- Context: go-mcp generated by sdkgen 4.34.7, `github.com/modelcontextprotocol/go-sdk v1.6.0`, Claude Code 2.1.300. Summary under "MCP server driven by Claude Code" above.
- Steps: Build go-mcp, run `claude -p "... list the tasks in that project ..." --mcp-config mcp.json --strict-mcp-config --allowedTools "mcp__todoist__*"`.
- Expected: `todoist_list` returns the tasks.
- Actual: `MCP server "todoist" returned a malformed result that failed schema validation: Invalid result for tools/call: [{"expected":"record","code":"invalid_type","path":["structuredContent"],"message":"Invalid input: expected record, received array"}]`. Create and load work.
- Cause: `runOp` in `go-mcp/tools.go` returns `data` as the typed handler's output value; the Go SDK serialises that value into `structuredContent`. For `list`, `data` is `[]any`. The MCP specification (2025-06-18) requires `structuredContent` to be a JSON object.
- Workaround: None without editing generated code; the agent fell back to `todoist_load`.
- Suggested fix: In the go-mcp template, wrap list results (`map[string]any{"items": data}`) for the structured output, keeping the text content as is, and declare the matching output schema. A test that validates a `tools/call` result against the MCP schema (or runs one call through a real client) would catch it; a smoke test that reads only the text content does not.

### F19 — TypeScript create types require every response-required field, server-assigned ones included
- Stage: Generate (ts)
- Severity: major for TypeScript users of APIs whose responses mark most fields required (FastAPI/pydantic do by default)
- Who is affected: Definitions whose responses mark fields required, as FastAPI/pydantic do by default. In buggie-sdk the same fields are optional because its definition marks fewer required.
- Upstream: Known: sdkgen#215 (open).
- Context: sdkgen 4.34.7 `dist/helpers/opShape.js` (`opRequestShape`, `fieldInOp`, `fieldOptional`), `.sdk/src/cmp/ts/EntityTypes_ts.ts`.
- Steps: Put `await client.Task().create({ content: 'Write the release notes' })` in the README; run `npm test` in `ts/`.
- Expected: The README example type-checks: `content` is the only required body field of `POST /tasks`.
- Actual: `TS2345: ... '{ content: string; }' is missing the following properties from type 'TaskCreateData': added_at, added_by_uid, assigned_by_uid, checked, and 23 more.` For create, `fieldInOp` keeps every record field unless `field.op.create.active` is false, and `fieldOptional('create')` uses the record's `r` (required in the response), not the request body's required list. apidef does record per-op request facts (`project_id: op.create.req: false`), but they are not used for optionality. Project additionally requires `next_cursor` and `results`: its record is an `anyOf` of personal and workspace projects, and the list page's own properties end up in the entity's fields (present in the baseline's `any_project_sync_view` too, so not caused by the guide).
- Not fixable in the project model: entity fields are written as concrete values, so `main: kit: entity: project: fields: next_cursor: r: false` fails with `aontu/scalar_value: Cannot unify values`.
- Workaround: The README example casts the argument (`as any`). The README examples harness strips every import except the SDK class (`stripImports` in `ts/test/readme_examples.test.ts`), so the example cannot import the exported `TaskCreateData` type to cast to it.
- Positive: The `readme_examples` test caught this before publication: every code block in the README is type-checked and run offline, which is the reason the README can claim its examples work.
- Suggested fix: Build create/update input types from the request body schema of the op's points (the `bf` list and the body's own `required`), and never require fields the response marks read-only or the request does not contain. Let the README harness keep `import type` lines that name the SDK package.

### F20 — Switched-off entities leave orphan flow files, and doctor's summary hides why it fails
- Stage: Shape / Verify (doctor)
- Severity: papercut
- Who is affected: Anyone who switches entities off in the guide.
- Upstream: Related: sdkgen#198 (open).
- Context: apidef 8.25.2, `voxgig-sdkgen doctor` (sdkgen 4.34.7).
- Steps: Switch entities off in the guide (`guide: entity: item_sync_view: active: false`), regenerate, run `npx voxgig-sdkgen doctor`.
- Expected: Either apidef removes the flow files of entities it no longer generates, or doctor's summary names the problem.
- Actual: The 24 `model/flow/Basic<Entity>Flow.aontu` files of switched-off entities stay on disk. doctor lists each as `ORPHAN MODEL FILE (on disk, included by nothing, read by nobody)`, exits 1, and ends with `.sdk has drifted: 0 forked, 0 edited, 0 stale, 0 missing, 0 outdated` and the advice to run `voxgig-sdkgen target add <lang>`, which does not remove them. Deleting the 24 files and regenerating gives `.sdk matches the scaffold (0 additive)`, exit 0; apidef does not recreate them.
- Positive: The per-file finding itself is precise ("included by nothing, read by nobody"), which made it safe to delete them.
- Suggested fix: Have apidef collect flow files for inactive entities as it already collects orphaned entity files, and count orphans in doctor's summary line with their own remedy.

### F21 — Generated README examples use the alphabetically first entity, with a naive plural
- Stage: Generate (docs)
- Severity: papercut
- Who is affected: Every generated README.
- Upstream: No existing issue found.
- Context: root `README.md` and each target README, sdkgen 4.34.7.
- Observed: Every generated example (Entities, Offline unit testing, Quickstart in each language) uses `Activity`, the first entity by name, an activity log, rather than Task, the API's main resource; at baseline it was `Active` and `CreditState`. The variable names pluralise naively: `const activitys = await client.Activity().list()`, "List all activitys". The generated "Use it from an AI agent (MCP)" section shows a client config with no `env`, although the server needs `TODOIST_APIKEY`. No model slot chooses the example entity (none in the model reference or `sdkgen.aontu`).
- Suggested fix: A `main.kit.text.example_entity` slot (or choose the entity with the most ops), the same plural helper apidef already uses (`depluralize` has an inverse table), and an `env` entry in the MCP config example when the SDK has auth.

### F22 — A default live run writes to the account through entities that have no create step
- Stage: Verify (live)
- Severity: major (safety: the live suite is the step the docs ask people to run against their own account)
- Who is affected: Every generated SDK with an entity that has writes but no create step.
- Upstream: No existing issue found.
- Context: generated `ts/test/live-entity.ts` and the per-entity flows; same pattern in py and go.
- Steps: Read the generated flows before running `TODOIST_TEST_LIVE=TRUE npm test` (done before the first live run).
- Expected: Live writes only to records the run itself creates.
- Actual: The runner guards update and remove well when a flow has a create step ("A failed create must not turn a later update/remove into a write against an arbitrary record"). A flow with no create step still runs its update or create with synthesised example values. On Todoist that means `notification_setting.update` (changes the user's notification settings), `top_up.create` (`POST /usage_billing/top_up` with `amount: 1000`, which opens a Stripe checkout), `billing_portal_url.create` (`POST /payments/cancel_plan_with_redirect_to_stripe`) and `subscription_info.create` (`reactivate_plan` as an action). None of these ran: 28 write ops outside the five core resources were excluded in `sdk-test-control.json` first.
- Workaround: Exclude every write op on entities without a create step (script: `report/scripts/live-allowlist.mjs`, generated from the model).
- Suggested fix: Make writes on an entity with no create step opt-in for live runs (excluded by default, with the reason in the report), and treat routes whose path or summary names payment, billing, plan, cancel or delete-account as never-live unless named explicitly.
