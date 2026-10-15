# todoist-mcp

[MCP](https://modelcontextprotocol.io) server exposing the Todoist SDK as
5 agent tools, `todoist_list`, `todoist_load`, `todoist_create`, `todoist_update` and `todoist_remove`, built on the
[official Go MCP SDK](https://github.com/modelcontextprotocol/go-sdk) and the
sibling Go SDK at `../go`. Runs over **stdio** (default, for spawnable installs)
or **streamable HTTP** (one shared server for several agents).

Create, update and remove are on, as the SDK's model sets
`main: kit: target: 'go-mcp': tool: write: true`. Each tool carries the MCP hints an agent host reads before calling
it, listed in the reference below.

## Examples

```sh
# 1. Build a native binary (-> dist/<os>-<arch>/todoist-mcp)
make build

# 2. Provide credentials via the environment
export TODOIST_APIKEY=sk_live_xxx

# 3a. Install into Claude Code over stdio (most common)
claude mcp add --scope user todoist \
  -- /absolute/path/to/todoist-mcp -transport stdio

# 3b. …or run a shared HTTP server instead
./todoist-mcp -transport http -addr :8080
```

Tool-call arguments (what an agent sends):

```jsonc
// todoist_list: first page of records
{ "entity": "activity" }

// todoist_load: one record
{ "entity": "backup", "query": { "file": "example" } }

// todoist_create: a new record
{ "entity": "billing_portal_url", "data": { "billing_portal_url": "example" } }

// todoist_update: change a record's fields
{ "entity": "comment", "data": { "id": "example", "attachment": "example" } }

// todoist_remove: delete a record
{ "entity": "comment", "query": { "id": "example_id" } }
```

> The rest of this guide follows the [Diátaxis](https://diataxis.fr) framework:
> a hands-on **Tutorial**, task-focused **How-to guides**, a factual
> **Reference**, and background **Explanation**.

## Tutorial: install and call a tool

1. **Build** the server from this `go-mcp/` directory:

   ```sh
   make build          # -> dist/<os>-<arch>/todoist-mcp
   ```

2. **Set your API key:**

   ```sh
   export TODOIST_APIKEY=sk_live_xxx
   ```

3. **Install it into Claude Code** (stdio transport):

   ```sh
   claude mcp add --scope user todoist \
     -- "$PWD"/dist/*/todoist-mcp -transport stdio
   ```

4. **Restart Claude Code.** The `todoist_list`, `todoist_load`, `todoist_create`, `todoist_update` and `todoist_remove` tools now appear in new
   sessions. Ask the agent to *"list activity using todoist"*
   and it calls `todoist_list` with `{"entity":"activity"}`.

## How-to guides

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export TODOIST_APIKEY=sk_live_xxx            # API key
export TODOIST_BASE=https://api.example.com  # optional: override the API base URL
```

Set these in the shell that launches the server (or in the `claude mcp add`
environment) so every tool call is authenticated.

### Run as a shared HTTP server

```sh
./todoist-mcp -transport http -addr :8080
```

Streamable HTTP lets several agents share one running process; stdio (the
default) spawns a fresh process per client.

### Call the `todoist_list` tool

Args: `entity` (required), `query` (optional: optional filter map; omit it for the first page).
Returns the first page of records as JSON:

```jsonc
{ "entity": "activity" }
```

### Call the `todoist_load` tool

Args: `entity` (required), `query` (required: match map naming the record, such as {"id":1}).
Returns the record as JSON:

```jsonc
{ "entity": "backup", "query": { "file": "example" } }
```

### Call the `todoist_create` tool

Args: `entity` (required), `data` (required: the new record's fields).
Returns the created record as JSON:

```jsonc
{ "entity": "billing_portal_url", "data": { "billing_portal_url": "example" } }
```

### Call the `todoist_update` tool

Args: `entity` (required), `data` (required: the record's id and the fields to change).
Returns the updated record as JSON:

```jsonc
{ "entity": "comment", "data": { "id": "example", "attachment": "example" } }
```

### Call the `todoist_remove` tool

Args: `entity` (required), `query` (required: match map naming the record, such as {"id":1}).
Returns the removed record as JSON:

```jsonc
{ "entity": "comment", "query": { "id": "example_id" } }
```

### Turn the write tools off

In the SDK's own model (`.sdk/model/sdk.aontu`), then regenerate:

```
main: kit: target: 'go-mcp': tool: write: false
```

### Cross-compile release binaries

```sh
make build       # native binary for this machine
make build-all   # linux/darwin/windows x amd64/arm64, under dist/<os>-<arch>/
```

## Reference

### Tools

| Tool | Args | Returns | MCP hints |
|------|------|---------|-----------|
| `todoist_list` | `entity`, `query` (optional map) | The first page of records as JSON | read-only |
| `todoist_load` | `entity`, `query` (required map) | The record as JSON | read-only |
| `todoist_create` | `entity`, `data` (required map) | The created record as JSON | additive |
| `todoist_update` | `entity`, `data` (required map) | The updated record as JSON | destructive |
| `todoist_remove` | `entity`, `query` (required map) | The removed record as JSON | destructive |

On error, a tool returns an MCP error result (`isError: true`) whose text is the
failure message (e.g. unknown entity, or an API error).

### Entities

Each tool takes as its `entity` argument one of the entities that has its
operation, of the 34 the SDK has:

| Tool | Entities |
|------|----------|
| `todoist_list` | activity, backup, collaborator, comment, completed_task, folder, history, id_mapping, label, location_reminder, plan_detail, productivity_stat, project, project_permission, reminder, section, shared_label, task, usage_summary, workspace, workspace_invitation, workspace_project, workspace_user |
| `todoist_load` | backup, comment, credit_state, file_url, folder, label, location_reminder, project, reminder, section, task, template, user, workspace |
| `todoist_create` | billing_portal_url, comment, folder, label, location_reminder, project, reminder, section, subscription_info, task, top_up, upload, workspace, workspace_user |
| `todoist_update` | comment, email, folder, label, location_reminder, notification_setting, project, reminder, section, shared_label, task, workspace, workspace_user |
| `todoist_remove` | comment, email, folder, label, location_reminder, project, reminder, section, shared_label, task, upload, workspace, workspace_invitation, workspace_user |

JSON schemas are emitted by the SDK from each tool's argument struct's
`json` / `jsonschema` tags — no schema is hand-written. Each tool's
`entity` is an `enum` of the entities in its row, so the server refuses
any other before it runs a call.

### Transports & flags

| Flag | Default | Purpose |
|------|---------|---------|
| `-transport` | `stdio` | `stdio` (spawnable) or `http` (streamable HTTP). |
| `-addr` | `:8080` | Listen address for the `http` transport. |

### Environment variables

| Variable | Purpose |
|----------|---------|
| `TODOIST_APIKEY` | API key sent with every request. |
| `TODOIST_BASE` | Optional override of the API base URL. |

### Smoke test via HTTP (raw JSON-RPC)

```sh
./todoist-mcp -transport http -addr :18080 &

# initialize, grab the session id
curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -D headers \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"0"}}}'

SESSION=$(awk '/Mcp-Session-Id/ {print $2}' headers | tr -d '\r')

curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H "Mcp-Session-Id: $SESSION" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"todoist_list","arguments":{"entity":"activity"}}}'
```

## Explanation

### How tools map to the SDK

`main.go` builds the SDK client (configured from the environment) and registers
one tool per operation the SDK's entities have. Each dispatches on the
`entity` argument to the matching entity in the sibling Go SDK at `../go`,
calls its operation, unwraps the `Entity` wrappers to plain data, and returns
it as pretty-printed JSON.

### Why two transports

**stdio** is the standard for agent hosts that spawn a server per client
(Claude Code's `claude mcp add`). **streamable HTTP** keeps one process running
that many agents can share — handy for a long-lived deployment.

### Schema generation

The input schema is derived from each tool's argument struct's `json` /
`jsonschema` tags at registration time, so the advertised tool schema can
never drift from the code that consumes it. The `entity` enum comes from the
same list the tool is registered for.

## Generated by

sdkgen `go-mcp` target. See the target source under `.sdk/src/cmp/go-mcp/` in
this repo, or upstream at
`github.com/voxgig/sdkgen/project/.sdk/src/cmp/go-mcp/`.
