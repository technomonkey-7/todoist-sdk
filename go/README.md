# Todoist Golang SDK

Unofficial Todoist API clients for TypeScript, Python and Go, with a CLI and an MCP server, generated from Doist's OpenAPI definition.

The Golang SDK for the Todoist API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Active(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/technomonkey-7/todoist-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/technomonkey-7/todoist-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/technomonkey-7/todoist-sdk/go=../todoist-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/technomonkey-7/todoist-sdk/go"
)

func main() {
    client := sdk.NewTodoistSDK(map[string]any{
        "apikey": os.Getenv("TODOIST_APIKEY"),
    })

    // List active records — the value is a []any of entities, one per record.
    actives, err := client.Active(nil).List(map[string]any{"workspace_id": 1}, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range actives.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
activitys, err := client.Activity(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = activitys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

activitys, err := client.Activity(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range activitys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewTodoistSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
TODOIST_TEST_LIVE=TRUE
TODOIST_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewTodoistSDK

```go
func NewTodoistSDK(options map[string]any) *TodoistSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *TodoistSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TodoistSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Active` | `(data map[string]any) TodoistEntity` | Create an Active entity instance. |
| `Activity` | `(data map[string]any) TodoistEntity` | Create an Activity entity instance. |
| `Archived` | `(data map[string]any) TodoistEntity` | Create an Archived entity instance. |
| `Authorization` | `(data map[string]any) TodoistEntity` | Create an Authorization entity instance. |
| `Backup` | `(data map[string]any) TodoistEntity` | Create a Backup entity instance. |
| `BillingPortalUrl` | `(data map[string]any) TodoistEntity` | Create a BillingPortalUrl entity instance. |
| `Collaborator` | `(data map[string]any) TodoistEntity` | Create a Collaborator entity instance. |
| `Comment` | `(data map[string]any) TodoistEntity` | Create a Comment entity instance. |
| `CompletedTask` | `(data map[string]any) TodoistEntity` | Create a CompletedTask entity instance. |
| `CreditState` | `(data map[string]any) TodoistEntity` | Create a CreditState entity instance. |
| `Email` | `(data map[string]any) TodoistEntity` | Create an Email entity instance. |
| `FileUrl` | `(data map[string]any) TodoistEntity` | Create a FileUrl entity instance. |
| `Folder` | `(data map[string]any) TodoistEntity` | Create a Folder entity instance. |
| `History` | `(data map[string]any) TodoistEntity` | Create a History entity instance. |
| `IdMapping` | `(data map[string]any) TodoistEntity` | Create an IdMapping entity instance. |
| `Invite` | `(data map[string]any) TodoistEntity` | Create an Invite entity instance. |
| `Label` | `(data map[string]any) TodoistEntity` | Create a Label entity instance. |
| `LocationReminder` | `(data map[string]any) TodoistEntity` | Create a LocationReminder entity instance. |
| `MemberView` | `(data map[string]any) TodoistEntity` | Create a MemberView entity instance. |
| `MigratePersonalToken` | `(data map[string]any) TodoistEntity` | Create a MigratePersonalToken entity instance. |
| `NotificationLocationSyncView` | `(data map[string]any) TodoistEntity` | Create a NotificationLocationSyncView entity instance. |
| `NotificationSyncView` | `(data map[string]any) TodoistEntity` | Create a NotificationSyncView entity instance. |
| `PlanDetail` | `(data map[string]any) TodoistEntity` | Create a PlanDetail entity instance. |
| `ProductivityStat` | `(data map[string]any) TodoistEntity` | Create a ProductivityStat entity instance. |
| `Project` | `(data map[string]any) TodoistEntity` | Create a Project entity instance. |
| `ProjectImport` | `(data map[string]any) TodoistEntity` | Create a ProjectImport entity instance. |
| `ProjectImportCreateResponseWithObject` | `(data map[string]any) TodoistEntity` | Create a ProjectImportCreateResponseWithObject entity instance. |
| `Reminder` | `(data map[string]any) TodoistEntity` | Create a Reminder entity instance. |
| `RemoveWorkspaceUser` | `(data map[string]any) TodoistEntity` | Create a RemoveWorkspaceUser entity instance. |
| `RoleToActionMappingView` | `(data map[string]any) TodoistEntity` | Create a RoleToActionMappingView entity instance. |
| `Section` | `(data map[string]any) TodoistEntity` | Create a Section entity instance. |
| `SharedLabel` | `(data map[string]any) TodoistEntity` | Create a SharedLabel entity instance. |
| `StatusOk` | `(data map[string]any) TodoistEntity` | Create a StatusOk entity instance. |
| `SubscriptionInfo` | `(data map[string]any) TodoistEntity` | Create a SubscriptionInfo entity instance. |
| `Task` | `(data map[string]any) TodoistEntity` | Create a Task entity instance. |
| `Template` | `(data map[string]any) TodoistEntity` | Create a Template entity instance. |
| `TopUp` | `(data map[string]any) TodoistEntity` | Create a TopUp entity instance. |
| `Upload` | `(data map[string]any) TodoistEntity` | Create an Upload entity instance. |
| `UsageSummary` | `(data map[string]any) TodoistEntity` | Create an UsageSummary entity instance. |
| `User` | `(data map[string]any) TodoistEntity` | Create an User entity instance. |
| `Workspace` | `(data map[string]any) TodoistEntity` | Create a Workspace entity instance. |
| `WorkspaceInvitationView` | `(data map[string]any) TodoistEntity` | Create a WorkspaceInvitationView entity instance. |
| `WorkspaceUserView` | `(data map[string]any) TodoistEntity` | Create a WorkspaceUserView entity instance. |

### Entity interface (TodoistEntity)

All entities implement the `TodoistEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    active, err := client.Active(nil).List(map[string]any{"workspace_id": 1}, nil)
    if err != nil { /* handle */ }
    // active is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Active

| Field | Description |
| --- | --- |
| `"access"` | Project access configuration. |
| `"archived_date"` | Date and time when the project was archived, or `null` if active. |
| `"archived_timestamp"` | Unix timestamp for when the project was archived, or 0 if active. |
| `"color"` | Numeric project color code. |
| `"default_order"` | Default order of the project in workspace views. |
| `"default_order_key"` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `"description"` | Project description. |
| `"folder_id"` | Numeric ID of the folder that contains the project, or `null`. |
| `"icon"` | Project icon name, or `null` for the default icon. |
| `"initiated_by_uid"` | Numeric ID of the user requesting the workspace project. |
| `"is_archived"` | Whether the workspace project is archived. |
| `"is_frozen"` | Whether the project is frozen and cannot be modified. |
| `"is_invite_only"` | Whether joining the workspace project requires an invitation. |
| `"is_project_insights_enabled"` | Whether project insights are enabled for the project. |
| `"name"` | Project name. |
| `"project_id"` | String ID of the project. |
| `"public_access"` | Whether the project is publicly accessible. |
| `"role"` |  |
| `"status"` | Project status. |
| `"view_style"` | Project view style. |
| `"workspace_id"` | Numeric ID of the workspace that contains the project. |

Operations: List.

API path: `/api/v1/workspaces/{workspace_id}/projects/active`

#### Activity

| Field | Description |
| --- | --- |
| `"event_date"` | The timestamp when this activity occurred. |
| `"event_type"` | The type of event that occurred. |
| `"extra_data"` | This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`… |
| `"extra_data_id"` | Internal ID for the extra activity data row. |
| `"id"` | The internal unique identifier for this activity log entry. |
| `"initiator_id"` |  |
| `"object_id"` | The unique identifier of the object this activity relates to (project, item, note, or section ID). |
| `"object_type"` | The type of object this activity relates to. |
| `"parent_item_id"` | For note (comment) activities, the ID of the item (task) that the note is attached to. |
| `"parent_project_id"` | The ID of the project that contains the object this activity relates to. |

Operations: List.

API path: `/api/v1/activities`

#### Archived

| Field | Description |
| --- | --- |
| `"access"` | Project access configuration. |
| `"archived_date"` | Date and time when the project was archived, or `null` if active. |
| `"archived_timestamp"` | Unix timestamp for when the project was archived, or 0 if active. |
| `"color"` | Numeric project color code. |
| `"default_order"` | Default order of the project in workspace views. |
| `"default_order_key"` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `"description"` | Project description. |
| `"folder_id"` | Numeric ID of the folder that contains the project, or `null`. |
| `"icon"` | Project icon name, or `null` for the default icon. |
| `"initiated_by_uid"` | Numeric ID of the user requesting the workspace project. |
| `"is_archived"` | Whether the workspace project is archived. |
| `"is_frozen"` | Whether the project is frozen and cannot be modified. |
| `"is_invite_only"` | Whether joining the workspace project requires an invitation. |
| `"is_project_insights_enabled"` | Whether project insights are enabled for the project. |
| `"name"` | Project name. |
| `"project_id"` | String ID of the project. |
| `"public_access"` | Whether the project is publicly accessible. |
| `"role"` |  |
| `"status"` | Project status. |
| `"view_style"` | Project view style. |
| `"workspace_id"` | Numeric ID of the workspace that contains the project. |

Operations: List.

API path: `/api/v1/workspaces/{workspace_id}/projects/archived`

#### Authorization

| Field | Description |
| --- | --- |
| `"token"` | The token to be revoked (access token). |
| `"token_type_hint"` | A hint about the type of the token being revoked (optional). |

Operations: Create, Remove.

API path: `/api/v1/revoke`

#### Backup

| Field | Description |
| --- | --- |
| `"url"` | Backup URL |
| `"version"` | Date and time of the backup version |

Operations: List, Load.

API path: `/api/v1/backups`

#### BillingPortalUrl

| Field | Description |
| --- | --- |
| `"billing_portal_url"` |  |
| `"reason_description"` | Human-readable label of the cancellation reason. |
| `"reason_flag"` | Short identifier of the cancellation reason category. |
| `"reason_text"` | Free-form feedback from the user about the cancellation. |
| `"return_url"` | URL the user is redirected to after completing the flow. |

Operations: Create.

API path: `/api/v1/payments/cancel_plan_with_redirect_to_stripe`

#### Collaborator

| Field | Description |
| --- | --- |
| `"email"` | The user's email address |
| `"id"` | The user's ID |
| `"name"` | The user's full name |

Operations: List.

API path: `/api/v1/projects/{project_id}/collaborators`

#### Comment

| Field | Description |
| --- | --- |
| `"attachment"` | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `"content"` | Comment content. |
| `"file_attachment"` | File attachment metadata, or `null` when the comment has no attachment. |
| `"id"` | String ID of the comment. |
| `"is_deleted"` | Whether the comment is deleted. |
| `"posted_at"` | Date and time when the comment was posted, or `null` if unknown. |
| `"posted_uid"` | String ID of the user who posted the comment. |
| `"project_id"` | String ID of the project |
| `"reactions"` | Reaction emoji mapped to user IDs that reacted. |
| `"task_id"` | String ID of the task |
| `"uids_to_notify"` | String IDs of users notified by the comment. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/comments`

#### CompletedTask

| Field | Description |
| --- | --- |
| `"added_at"` | Date and time when the task was created, or `null` if unknown. |
| `"added_by_uid"` | String ID of the user who created the task, or `null` if unknown. |
| `"assigned_by_uid"` | String ID of the user who assigned the task, or `null` if unassigned. |
| `"checked"` | Whether the task is completed. |
| `"child_order"` | Position of the task among sibling tasks. |
| `"completed_at"` | Date and time when the task was completed, or `null` if active. |
| `"completed_by_uid"` | String ID of the user who completed the task, or `null` if active. |
| `"completed_count"` | Number of times the task has been marked as completed. |
| `"content"` | Task content. |
| `"day_order"` | Task order for day-based views. |
| `"deadline"` | Deadline details for the task, or `null` when the task has no deadline. |
| `"description"` | Task description. |
| `"due"` | Due date details for the task, or `null` when the task has no due date. |
| `"duration"` | Task duration details, or `null` when the task has no duration. |
| `"id"` | String ID of the task. |
| `"is_collapsed"` | Whether the task is collapsed in the user's view. |
| `"is_deleted"` | Whether the task is deleted. |
| `"labels"` | Names of labels attached to the task. |
| `"note_count"` | **Deprecated**: only returns 0 and is marked for removal. |
| `"order_key"` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `"parent_id"` | String ID of the parent task, or `null` if this is a top-level task. |
| `"postponed_count"` | Number of times the task's due date has been rescheduled by the user. |
| `"priority"` | Task priority from 1 (normal) to 4 (urgent). |
| `"project_id"` | String ID of the project that contains the task. |
| `"responsible_uid"` | String ID of the user responsible for the task, or `null` if unassigned. |
| `"section_id"` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `"updated_at"` | Date and time when the task was last updated, or `null` if unknown. |
| `"user_id"` | String ID of the user who owns the task. |

Operations: List.

API path: `/api/v1/tasks/completed/by_completion_date`

#### CreditState

| Field | Description |
| --- | --- |
| `"available_amount"` | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `"available_units"` | Balance net of in-flight holds (`available_cached - held`). |
| `"currency"` | ISO currency code every amount in this response is in. |
| `"depleted"` | No further runs may start. |
| `"is_settled_low_balance"` | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `"low_balance"` | Balance is at or below the low-balance threshold. |
| `"settled_amount"` | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `"settled_units"` | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `"usage_allowed"` | Whether a new run may start right now. |
| `"usage_block_reason"` | Why a new run cannot start, or `null` when it can. |

Operations: Load.

API path: `/api/v1/usage_billing/state`

#### Email

| Field | Description |
| --- | --- |
| `"email"` | Email address for the Todoist object. |
| `"obj_id"` | String ID of the Todoist object. |
| `"obj_type"` | Type of Todoist object to create an email for. |

Operations: Update.

API path: `/api/v1/emails`

#### FileUrl

| Field | Description |
| --- | --- |
| `"file_name"` | Name of the exported template file. |
| `"file_url"` | Temporary URL for downloading the exported template. |

Operations: Load.

API path: `/api/v1/templates/url`

#### Folder

| Field | Description |
| --- | --- |
| `"child_order"` | User-specific position of the folder. |
| `"default_order"` | Default position of the folder in the workspace. |
| `"default_order_key"` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `"id"` | String ID of the folder. |
| `"is_deleted"` | Whether the folder is deleted. |
| `"name"` | Folder name. |
| `"workspace_id"` | String ID of the workspace that contains the folder. |

Operations: Create, List, Load, Remove.

API path: `/api/v1/folders/{folder_id}`

#### History

| Field | Description |
| --- | --- |
| `"category"` | What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`. |
| `"charged_amount"` | `charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274. |
| `"charged_units"` | Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side. |
| `"created_at"` | When the entry was written, UTC. |
| `"credited_amount"` | `credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00. |
| `"credited_units"` | Units added to the balance, as a positive number, or `null` on a debit. |
| `"description"` | Human-readable summary of the entry. |
| `"id"` | Ledger entry id. |
| `"refs"` | Free-form attribution for the entry. |
| `"status"` | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `"type"` | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

Operations: List.

API path: `/api/v1/usage_billing/history`

#### IdMapping

| Field | Description |
| --- | --- |
| `"new_id"` | Curent ID for the object. |
| `"old_id"` | Legacy ID for the object. |

Operations: List.

API path: `/api/v1/id_mappings/{obj_name}/{obj_ids}`

#### Invite

| Field | Description |
| --- | --- |
| `"app"` | For first-party clients usage only. |
| `"email_list"` | List of user emails to invite to the workspace. |
| `"invited_emails"` | Emails successfully invited to the workspace. |
| `"role"` | Role assigned to invited users. |

Operations: Create.

API path: `/api/v1/workspaces/{workspace_id}/users/invite`

#### Label

| Field | Description |
| --- | --- |
| `"color"` | Label color name. |
| `"id"` | String ID of the label. |
| `"is_favorite"` | Whether the label is marked as a favorite. |
| `"name"` | Label name. |
| `"order"` | Position of the label in the label list, or `null` when no explicit order is set. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/labels`

#### LocationReminder

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Remove.

API path: `/api/v1/location_reminders/{reminder_id}`

#### MemberView

| Field | Description |
| --- | --- |
| `"full_name"` | Full name of the workspace member. |
| `"image_id"` | Avatar image ID of the workspace member, or `null`. |
| `"is_deleted"` | Whether the workspace member is deleted. |
| `"role"` | Workspace role assigned to the member. |
| `"timezone"` | Timezone of the workspace member. |
| `"user_email"` | Email address of the workspace member. |
| `"user_id"` | String ID of the workspace member. |
| `"workspace_id"` | String ID of the workspace. |

Operations: List.

API path: `/api/v1/workspaces/users`

#### MigratePersonalToken

| Field | Description |
| --- | --- |
| `"access_token"` | OAuth access token created from the personal token. |
| `"client_id"` | The unique Client ID of the Todoist application that you registered. |
| `"client_secret"` | The unique Client Secret of the Todoist application that you registered. |
| `"expires_in"` | Access token lifetime in seconds. |
| `"personal_token"` | Token obtained from the email/password authentication. |
| `"scope"` | Scopes of the OAuth token. |
| `"token_type"` | OAuth token type. |

Operations: Create.

API path: `/api/v1/access_tokens/migrate_personal_token`

#### NotificationLocationSyncView

| Field | Description |
| --- | --- |
| `"id"` | String ID of the location reminder |
| `"is_deleted"` | Whether the location reminder is deleted |
| `"item_id"` | String ID of the task |
| `"loc_lat"` | Latitude of the location |
| `"loc_long"` | Longitude of the location |
| `"loc_trigger"` | Trigger type for the location reminder |
| `"name"` | Name of the location |
| `"notify_uid"` | String ID of the user who will receive the reminder |
| `"project_id"` | String ID of the project containing the task |
| `"radius"` | Radius in meters |
| `"task_id"` | String ID of the task |
| `"type"` | The reminder type |

Operations: Create, List, Load.

API path: `/api/v1/location_reminders/{reminder_id}`

#### NotificationSyncView

| Field | Description |
| --- | --- |
| `"due"` | Datetime when the reminder fires, or `null` if unset. |
| `"id"` | String ID of the reminder. |
| `"is_deleted"` | Whether the reminder is deleted. |
| `"is_urgent"` | Whether the reminder should be delivered urgently. |
| `"item_id"` | String ID of the task that owns the reminder. |
| `"minute_offset"` | Minutes before the task due time for relative reminders. |
| `"notify_uid"` | String ID of the user who receives the reminder. |
| `"reminder_type"` | Type of the reminder: 'relative' or 'absolute' |
| `"service"` | Notification service type: 'email', 'push'. |
| `"task_id"` | String ID of the task |
| `"type"` | Reminder type. |

Operations: Create, List, Load.

API path: `/api/v1/reminders/{reminder_id}`

#### PlanDetail

| Field | Description |
| --- | --- |
| `"billing_cycle"` | Billing cycle for the listed prices. |
| `"prices"` | Prices available for the billing cycle. |

Operations: List.

API path: `/api/v1/workspaces/plan_details`

#### ProductivityStat

| Field | Description |
| --- | --- |
| `"completed_count"` | Total number of tasks completed by the user (all time) |
| `"days_items"` | Daily completion statistics for the last 7 days, ordered chronologically |
| `"goals"` | User goals, streaks, and productivity settings |
| `"karma"` | Current karma score |
| `"karma_graph_data"` | Historical karma data points for graphing, each containing date and karma_avg |
| `"karma_last_update"` | Net karma change from the most recent update (positive_karma + negative_karma) |
| `"karma_trend"` | Karma trend indicator ('up' or 'down') |
| `"karma_update_reasons"` | Recent karma update events with reasons and amounts |
| `"project_colors"` | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `"week_items"` | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

Operations: List.

API path: `/api/v1/tasks/completed/stats`

#### Project

| Field | Description |
| --- | --- |
| `"child_order"` | Updated position of the project in the hierarchy. |
| `"color"` | Color of the project icon. |
| `"description"` | Description of the project. |
| `"folder_id"` | Folder to move the project into. |
| `"icon"` | Project icon name. |
| `"id"` |  |
| `"is_collapsed"` | Whether the project is collapsed. |
| `"is_favorite"` | Whether the project is a favorite for the user. |
| `"name"` | Name of the project. |
| `"next_cursor"` | Cursor for the next page of results, or `null` when there are no more results. |
| `"parent_id"` | Parent project ID. |
| `"results"` | Objects in the current page of results. |
| `"view_style"` | View style of the project. |
| `"workspace_id"` | Workspace ID. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/projects`

#### ProjectImport

| Field | Description |
| --- | --- |
| `"comments"` | Task comments created by the import. |
| `"discarded_fields"` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `"locale"` | Locale to use for localized template content. |
| `"project_id"` | String ID of the project to import the template into. |
| `"project_notes"` | Project comments created by the import. |
| `"project_view_options_defaults"` | View options defaults applied to the imported project. |
| `"projects"` | Projects created or updated by the import. |
| `"reminders"` | Reminders created by the import. |
| `"sections"` | Sections created by the import. |
| `"status"` | Always `ok` on success. |
| `"tasks"` | Tasks created by the import. |
| `"template_id"` | ID of the saved template to import. |
| `"template_type"` | Type of template that was imported. |

Operations: Create.

API path: `/api/v1/templates/import_into_project_from_file`

#### ProjectImportCreateResponseWithObject

| Field | Description |
| --- | --- |
| `"comments"` | Task comments created by the import. |
| `"discarded_fields"` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `"project_id"` | ID of the project created from the template. |
| `"project_notes"` | Project comments created by the import. |
| `"project_view_options_defaults"` | View options defaults applied to the imported project. |
| `"projects"` | Projects created by the import. |
| `"reminders"` | Reminders created by the import. |
| `"sections"` | Sections created by the import. |
| `"status"` | Always `ok` on success. |
| `"tasks"` | Tasks created by the import. |
| `"template_type"` | Type of template that was imported. |

Operations: Create.

API path: `/api/v1/templates/create_project_from_file`

#### Reminder

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Remove.

API path: `/api/v1/reminders/{reminder_id}`

#### RemoveWorkspaceUser

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Remove.

API path: `/api/v1/workspaces/{workspace_id}/users/{user_id}`

#### RoleToActionMappingView

| Field | Description |
| --- | --- |
| `"project_collaborator_actions"` | Project collaborator roles and their allowed actions. |
| `"workspace_collaborator_actions"` | Workspace collaborator roles and their allowed actions. |

Operations: List.

API path: `/api/v1/projects/permissions`

#### Section

| Field | Description |
| --- | --- |
| `"added_at"` | Date and time when the section was created. |
| `"archived_at"` | Date and time when the section was archived, or `null` if it is active. |
| `"description"` | Section description, or `null` if it has none. |
| `"id"` | String ID of the section. |
| `"is_archived"` | Whether the section is archived. |
| `"is_collapsed"` | Whether the section is collapsed in the user's view. |
| `"is_deleted"` | Whether the section is deleted. |
| `"name"` | Section name. |
| `"order"` | Position of the new section in the project |
| `"order_key"` | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `"project_id"` | String ID of the project that contains the section. |
| `"section_order"` | Position of the section in the project. |
| `"updated_at"` | Date and time when the section was last updated, or `null` if unknown. |
| `"user_id"` | String ID of the user who owns the section. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/sections`

#### SharedLabel

| Field | Description |
| --- | --- |
| `"name"` | Current shared label name to rename. |
| `"new_name"` | New shared label name to apply to matching tasks. |
| `"next_cursor"` | Cursor for the next page of results, or `null` when there are no more results. |
| `"results"` | Objects in the current page of results. |

Operations: List, Remove, Update.

API path: `/api/v1/labels/shared`

#### StatusOk

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/api/v1/emails`

#### SubscriptionInfo

| Field | Description |
| --- | --- |
| `"activation_method"` | How the active subscription was purchased. |
| `"billing_portal_switch_to_annual_url"` | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `"billing_portal_url"` | One-time URL to the Stripe customer portal, if available. |
| `"expiration_date"` | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `"has_billing_portal"` | `true` when the user has a Stripe customer with a portal session. |
| `"has_billing_portal_switch_to_annual"` | `true` when a switch-to-annual flow is available in Stripe. |
| `"has_switch_legacy_to_current"` | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `"invoice_credit_balance"` | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `"plan"` | Plan tier the user is currently on. |
| `"plan_price"` | Price of the active plan, when known. |
| `"status"` | Current subscription status. |

Operations: Create.

API path: `/api/v1/payments/get_subscription_info`

#### Task

| Field | Description |
| --- | --- |
| `"added_at"` | Date and time when the task was created, or `null` if unknown. |
| `"added_by_uid"` | String ID of the user who created the task, or `null` if unknown. |
| `"assigned_by_uid"` | String ID of the user who assigned the task, or `null` if unassigned. |
| `"assignee_id"` | ID of the user to assign the task to. |
| `"checked"` | Whether the task is completed. |
| `"child_order"` | Position of the task among sibling tasks. |
| `"completed_at"` | Date and time when the task was completed, or `null` if active. |
| `"completed_by_uid"` | String ID of the user who completed the task, or `null` if active. |
| `"completed_count"` | Number of times the task has been marked as completed. |
| `"content"` | Task content. |
| `"day_order"` | Task order for day-based views. |
| `"deadline"` | Deadline details for the task, or `null` when the task has no deadline. |
| `"deadline_date"` | Deadline date in YYYY-MM-DD format |
| `"description"` | Task description. |
| `"due"` | Due date details for the task, or `null` when the task has no due date. |
| `"due_date"` | Due date in RFC 3339 format or similar. |
| `"due_datetime"` | Due date and time. |
| `"due_lang"` | Due date language code. |
| `"due_string"` | Human-readable representation of the due date. |
| `"duration"` | Task duration details, or `null` when the task has no duration. |
| `"duration_unit"` | Unit of time for duration. |
| `"id"` | String ID of the task. |
| `"is_collapsed"` | Whether the task is collapsed in the user's view. |
| `"is_deleted"` | Whether the task is deleted. |
| `"labels"` | Names of labels attached to the task. |
| `"note_count"` | **Deprecated**: only returns 0 and is marked for removal. |
| `"order"` | Position of the task in the project or section |
| `"order_key"` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `"parent_id"` | String ID of the parent task, or `null` if this is a top-level task. |
| `"postponed_count"` | Number of times the task's due date has been rescheduled by the user. |
| `"priority"` | Task priority from 1 (normal) to 4 (urgent). |
| `"project_id"` | String ID of the project that contains the task. |
| `"responsible_uid"` | String ID of the user responsible for the task, or `null` if unassigned. |
| `"section_id"` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `"updated_at"` | Date and time when the task was last updated, or `null` if unknown. |
| `"user_id"` | String ID of the user who owns the task. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/tasks`

#### Template

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/templates/file`

#### TopUp

| Field | Description |
| --- | --- |
| `"amount"` | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `"checkout_url"` | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `"currency"` | ISO currency code. |
| `"return_url"` | URL Checkout returns the user to. |
| `"session_id"` | The created Stripe Checkout session id. |

Operations: Create.

API path: `/api/v1/usage_billing/top_up`

#### Upload

| Field | Description |
| --- | --- |
| `"file_name"` | Name of the uploaded file. |
| `"file_size"` | Size of the uploaded file in bytes. |
| `"file_type"` | MIME type of the uploaded file. |
| `"file_url"` | URL of the uploaded file. |
| `"image"` | Image URL for image uploads, or `null` for non-image files. |
| `"image_height"` | Image height in pixels, or `null` for non-image files. |
| `"image_width"` | Image width in pixels, or `null` for non-image files. |
| `"resource_type"` | Detected resource type of the upload. |
| `"upload_state"` | Upload processing state. |

Operations: Create, Remove.

API path: `/api/v1/uploads`

#### UsageSummary

| Field | Description |
| --- | --- |
| `"automation_id"` | The automation this usage belongs to. |
| `"charged_amount"` | `charged_units` in money, in microdollars. |
| `"charged_units"` | Units the group took off the balance, as a positive number. |
| `"description"` | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `"usage_count"` | How many usage events settled in the group. |

Operations: List.

API path: `/api/v1/usage_billing/usage_summary`

#### User

| Field | Description |
| --- | --- |
| `"activated_user"` | Whether the user is considered activated (completed key onboarding actions) |
| `"auto_reminder"` | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `"avatar_big"` | The link to a 195x195 pixels image of the user's avatar |
| `"avatar_medium"` | The link to a 60x60 pixels image of the user's avatar |
| `"avatar_s640"` | The link to a 640x640 pixels image of the user's avatar |
| `"avatar_small"` | The link to a 35x35 pixels image of the user's avatar |
| `"business_account_id"` | The ID of the user's business account |
| `"completed_count"` | Total number of tasks completed by user |
| `"completed_today"` | Number of tasks completed today by the user |
| `"daily_goal"` | The daily goal number of completed tasks for karma |
| `"date_format"` | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `"days_off"` | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `"deleted_at"` | Date when user was deleted (ISO 8601 format) |
| `"dont_notify"` | Whether notifications should be disabled for the selected type and channel. |
| `"email"` | User's email address |
| `"feature_identifier"` | Feature identifier for feature flag evaluations |
| `"features"` | Feature flags and settings for the user |
| `"free_trial_expires"` | Date when free trial expires (ISO 8601 format) |
| `"full_name"` | The user's real name formatted as Firstname Lastname |
| `"getting_started_guide_projects"` | List of project IDs for getting started guide |
| `"has_magic_number"` | Whether the user has reached a magic number milestone |
| `"has_password"` | Whether the user has a password set on the account. |
| `"has_started_a_trial"` | Whether the user has ever started a free trial |
| `"id"` | User ID |
| `"image_id"` | The ID of the user's avatar |
| `"inbox_project_id"` | The ID of the user's Inbox project |
| `"is_celebrations_enabled"` | Whether celebration animations are enabled |
| `"is_deleted"` | Whether the user is deleted |
| `"is_onboarded"` | Composite flag: true once all four onboarded_* criteria above are met. |
| `"is_premium"` | Whether the user has a Todoist Pro subscription (a true or false value) |
| `"joinable_workspace"` | Information about workspaces the user can join |
| `"joined_at"` | Date when user joined Todoist (ISO 8601 format) |
| `"karma"` | The user's karma score |
| `"karma_trend"` | The user's karma trend. |
| `"lang"` | The user's language |
| `"mfa_enabled"` | Whether multi-factor authentication is enabled |
| `"next_week"` | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `"notification_type"` | Notification type to update. |
| `"onboarded_dated_tasks_created"` | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `"onboarded_desktop_accessed"` | True once the user has synced from Web, macOS, or Windows. |
| `"onboarded_mobile_accessed"` | True once the user has synced from iOS or Android. |
| `"onboarded_tasks_completed"` | True once the user has completed at least 3 tasks. |
| `"onboarding_completed"` | Whether the user has completed onboarding |
| `"onboarding_initiated"` | Whether the user has initiated onboarding |
| `"onboarding_level"` | User's self-reported skill level during onboarding |
| `"onboarding_persona"` | User's onboarding persona selection |
| `"onboarding_role"` | User's role selection during onboarding |
| `"onboarding_started"` | Whether the user has started onboarding |
| `"onboarding_team_mode"` | Whether user selected team mode during onboarding |
| `"onboarding_use_cases"` | Use cases the user selected during onboarding |
| `"premium_status"` | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `"premium_until"` | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `"service"` | Notification channel to update. |
| `"share_limit"` | Maximum number of collaborators allowed in shared projects |
| `"sort_order"` | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `"start_day"` | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `"start_page"` | The user's default view on Todoist. |
| `"status"` | The user's status, shared across Todoist and Comms. |
| `"theme_appearance"` | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `"theme_id"` | The currently selected Todoist theme (a number between 0 and 13) |
| `"time_format"` | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `"token"` | The user's token that should be used to call the other API methods |
| `"tz_info"` | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `"urgent_reminder_device"` | The device that should ring urgent reminders. |
| `"verification_status"` | User's email verification status. |
| `"websocket_url"` | WebSocket URL for real-time updates |
| `"weekend_start_day"` | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `"weekly_goal"` | The target number of tasks to complete per week |

Operations: List, Update.

API path: `/api/v1/user`

#### Workspace

| Field | Description |
| --- | --- |
| `"description"` | Updated workspace description. |
| `"domain_discovery"` | Updated domain discovery setting. |
| `"domain_name"` | Updated workspace email domain. |
| `"id"` |  |
| `"invite_code"` | Regenerate workspace invite code when set. |
| `"is_collapsed"` | Updated collapse state for current user. |
| `"is_guest_allowed"` | Updated guest access status. |
| `"is_link_sharing_enabled"` | Updated link sharing status. |
| `"is_trial_pending"` | Updated trial pending state. |
| `"name"` | Updated workspace name. |
| `"properties"` | Updated workspace properties. |
| `"restrict_email_domains"` | Updated email domain restriction setting. |

Operations: Create, List, Load, Remove.

API path: `/api/v1/workspaces/{workspace_id}`

#### WorkspaceInvitationView

| Field | Description |
| --- | --- |
| `"app"` | Product the invitation was sent from. |
| `"id"` | The ID of the invitation |
| `"inviter_id"` | ID of the user user who sent the invitation |
| `"role"` | Workspace role granted by the invitation. |
| `"user_email"` | The invited person's email. |
| `"workspace_id"` | ID of the workspace |

Operations: Create, List, Update.

API path: `/api/v1/workspaces/invitations/delete`

#### WorkspaceUserView

| Field | Description |
| --- | --- |
| `"custom_sorting_applied"` | Whether the user has custom project sorting enabled. |
| `"invite_code"` | Workspace invite code to join with. |
| `"project_sort_preference"` | Project sorting preference for the user. |
| `"role"` | Workspace role assigned to the user. |
| `"user_id"` | String ID of the workspace user. |
| `"workspace_id"` | String ID of the workspace. |

Operations: Create.

API path: `/api/v1/workspaces/{workspace_id}/users/{user_id}`



## Entities


### Active

Create an instance: `active := client.Active(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `any` | Project access configuration. |
| `archived_date` | `any` | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `int` | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `any` | Numeric project color code. |
| `default_order` | `int` | Default order of the project in workspace views. |
| `default_order_key` | `any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `string` | Project description. |
| `folder_id` | `string` | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `any` | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `int` | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `bool` | Whether the workspace project is archived. |
| `is_frozen` | `bool` | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `bool` | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `bool` | Whether project insights are enabled for the project. |
| `name` | `string` | Project name. |
| `project_id` | `string` | String ID of the project. |
| `public_access` | `bool` | Whether the project is publicly accessible. |
| `role` | `any` |  |
| `status` | `string` | Project status. |
| `view_style` | `string` | Project view style. |
| `workspace_id` | `int` | Numeric ID of the workspace that contains the project. |

#### Example: List

```go
actives, err := client.Active(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range actives.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Activity

Create an instance: `activity := client.Activity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_date` | `string` | The timestamp when this activity occurred. |
| `event_type` | `string` | The type of event that occurred. |
| `extra_data` | `any` | This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`… |
| `extra_data_id` | `string` | Internal ID for the extra activity data row. |
| `id` | `string` | The internal unique identifier for this activity log entry. |
| `initiator_id` | `string` |  |
| `object_id` | `string` | The unique identifier of the object this activity relates to (project, item, note, or section ID). |
| `object_type` | `string` | The type of object this activity relates to. |
| `parent_item_id` | `string` | For note (comment) activities, the ID of the item (task) that the note is attached to. |
| `parent_project_id` | `string` | The ID of the project that contains the object this activity relates to. |

#### Example: List

```go
activitys, err := client.Activity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range activitys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Archived

Create an instance: `archived := client.Archived(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `any` | Project access configuration. |
| `archived_date` | `any` | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `int` | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `any` | Numeric project color code. |
| `default_order` | `int` | Default order of the project in workspace views. |
| `default_order_key` | `any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `string` | Project description. |
| `folder_id` | `string` | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `any` | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `int` | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `bool` | Whether the workspace project is archived. |
| `is_frozen` | `bool` | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `bool` | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `bool` | Whether project insights are enabled for the project. |
| `name` | `string` | Project name. |
| `project_id` | `string` | String ID of the project. |
| `public_access` | `bool` | Whether the project is publicly accessible. |
| `role` | `any` |  |
| `status` | `string` | Project status. |
| `view_style` | `string` | Project view style. |
| `workspace_id` | `int` | Numeric ID of the workspace that contains the project. |

#### Example: List

```go
archiveds, err := client.Archived(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range archiveds.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Authorization

Create an instance: `authorization := client.Authorization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `token` | `string` | The token to be revoked (access token). |
| `token_type_hint` | `any` | A hint about the type of the token being revoked (optional). |

#### Example: Create

```go
result, err := client.Authorization(nil).Create(map[string]any{
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Backup

Create an instance: `backup := client.Backup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `string` | Backup URL |
| `version` | `string` | Date and time of the backup version |

#### Example: Load

```go
backup, err := client.Backup(nil).Load(map[string]any{"file": "file"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(backup.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
backups, err := client.Backup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range backups.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### BillingPortalUrl

Create an instance: `billingPortalUrl := client.BillingPortalUrl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_portal_url` | `string` |  |
| `reason_description` | `string` | Human-readable label of the cancellation reason. |
| `reason_flag` | `string` | Short identifier of the cancellation reason category. |
| `reason_text` | `string` | Free-form feedback from the user about the cancellation. |
| `return_url` | `string` | URL the user is redirected to after completing the flow. |

#### Example: Create

```go
result, err := client.BillingPortalUrl(nil).Create(map[string]any{
    "billing_portal_url": "example_billing_portal_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Collaborator

Create an instance: `collaborator := client.Collaborator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The user's email address |
| `id` | `string` | The user's ID |
| `name` | `string` | The user's full name |

#### Example: List

```go
collaborators, err := client.Collaborator(nil).List(map[string]any{"project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range collaborators.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Comment

Create an instance: `comment := client.Comment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `any` | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `content` | `string` | Comment content. |
| `file_attachment` | `any` | File attachment metadata, or `null` when the comment has no attachment. |
| `id` | `string` | String ID of the comment. |
| `is_deleted` | `bool` | Whether the comment is deleted. |
| `posted_at` | `any` | Date and time when the comment was posted, or `null` if unknown. |
| `posted_uid` | `any` | String ID of the user who posted the comment. |
| `project_id` | `string` | String ID of the project |
| `reactions` | `any` | Reaction emoji mapped to user IDs that reacted. |
| `task_id` | `string` | String ID of the task |
| `uids_to_notify` | `any` | String IDs of users notified by the comment. |

#### Example: Load

```go
comment, err := client.Comment(nil).Load(map[string]any{"id": "comment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(comment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
comments, err := client.Comment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range comments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Comment(nil).Create(map[string]any{
    "file_attachment": "example_file_attachment",
    "id": "example_id",
    "is_deleted": true,
    "posted_at": "example_posted_at",
    "posted_uid": "example_posted_uid",
    "reactions": "example_reactions",
    "uids_to_notify": "example_uids_to_notify",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CompletedTask

Create an instance: `completedTask := client.CompletedTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Whether the task is completed. |
| `child_order` | `int` | Position of the task among sibling tasks. |
| `completed_at` | `any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Number of times the task has been marked as completed. |
| `content` | `string` | Task content. |
| `day_order` | `int` | Task order for day-based views. |
| `deadline` | `any` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `string` | Task description. |
| `due` | `any` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float64` | Task duration details, or `null` when the task has no duration. |
| `id` | `string` | String ID of the task. |
| `is_collapsed` | `bool` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the task is deleted. |
| `labels` | `[]any` | Names of labels attached to the task. |
| `note_count` | `int` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | String ID of the project that contains the task. |
| `responsible_uid` | `any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | String ID of the user who owns the task. |

#### Example: List

```go
completedTasks, err := client.CompletedTask(nil).List(map[string]any{"since": "example", "until": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range completedTasks.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### CreditState

Create an instance: `creditState := client.CreditState(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_amount` | `int` | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `available_units` | `int` | Balance net of in-flight holds (`available_cached - held`). |
| `currency` | `string` | ISO currency code every amount in this response is in. |
| `depleted` | `bool` | No further runs may start. |
| `is_settled_low_balance` | `bool` | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `low_balance` | `bool` | Balance is at or below the low-balance threshold. |
| `settled_amount` | `int` | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `settled_units` | `int` | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `usage_allowed` | `bool` | Whether a new run may start right now. |
| `usage_block_reason` | `any` | Why a new run cannot start, or `null` when it can. |

#### Example: Load

```go
creditState, err := client.CreditState(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(creditState.(sdk.Entity).Data()) // the loaded entity's record
```


### Email

Create an instance: `email := client.Email(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | Email address for the Todoist object. |
| `obj_id` | `string` | String ID of the Todoist object. |
| `obj_type` | `string` | Type of Todoist object to create an email for. |


### FileUrl

Create an instance: `fileUrl := client.FileUrl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `string` | Name of the exported template file. |
| `file_url` | `string` | Temporary URL for downloading the exported template. |

#### Example: Load

```go
fileUrl, err := client.FileUrl(nil).Load(map[string]any{"project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(fileUrl.(sdk.Entity).Data()) // the loaded entity's record
```


### Folder

Create an instance: `folder := client.Folder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_order` | `int` | User-specific position of the folder. |
| `default_order` | `int` | Default position of the folder in the workspace. |
| `default_order_key` | `any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `id` | `string` | String ID of the folder. |
| `is_deleted` | `bool` | Whether the folder is deleted. |
| `name` | `string` | Folder name. |
| `workspace_id` | `string` | String ID of the workspace that contains the folder. |

#### Example: Load

```go
folder, err := client.Folder(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(folder.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
folders, err := client.Folder(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range folders.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Folder(nil).Create(map[string]any{
    "id": 1,
    "child_order": 1,
    "default_order": 1,
    "default_order_key": "example_default_order_key",
    "is_deleted": true,
    "name": "example_name",
    "workspace_id": "example_workspace_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### History

Create an instance: `history := client.History(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`. |
| `charged_amount` | `any` | `charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274. |
| `charged_units` | `any` | Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side. |
| `created_at` | `string` | When the entry was written, UTC. |
| `credited_amount` | `any` | `credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00. |
| `credited_units` | `any` | Units added to the balance, as a positive number, or `null` on a debit. |
| `description` | `string` | Human-readable summary of the entry. |
| `id` | `int` | Ledger entry id. |
| `refs` | `map[string]any` | Free-form attribution for the entry. |
| `status` | `string` | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `type` | `string` | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

#### Example: List

```go
historys, err := client.History(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range historys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### IdMapping

Create an instance: `idMapping := client.IdMapping(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `new_id` | `string` | Curent ID for the object. |
| `old_id` | `string` | Legacy ID for the object. |

#### Example: List

```go
idMappings, err := client.IdMapping(nil).List(map[string]any{"obj_id": "example", "obj_name": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range idMappings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Invite

Create an instance: `invite := client.Invite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` | For first-party clients usage only. |
| `email_list` | `any` | List of user emails to invite to the workspace. |
| `invited_emails` | `[]any` | Emails successfully invited to the workspace. |
| `role` | `any` | Role assigned to invited users. |

#### Example: Create

```go
result, err := client.Invite(nil).Create(map[string]any{
    "workspace_id": 1,
    "invited_emails": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Label

Create an instance: `label := client.Label(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` | Label color name. |
| `id` | `string` | String ID of the label. |
| `is_favorite` | `bool` | Whether the label is marked as a favorite. |
| `name` | `string` | Label name. |
| `order` | `any` | Position of the label in the label list, or `null` when no explicit order is set. |

#### Example: Load

```go
label, err := client.Label(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(label.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
labels, err := client.Label(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range labels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Label(nil).Create(map[string]any{
    "color": "example_color",
    "id": "example_id",
    "is_favorite": true,
    "name": "example_name",
    "order": "example_order",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LocationReminder

Create an instance: `locationReminder := client.LocationReminder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### MemberView

Create an instance: `memberView := client.MemberView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `full_name` | `string` | Full name of the workspace member. |
| `image_id` | `string` | Avatar image ID of the workspace member, or `null`. |
| `is_deleted` | `bool` | Whether the workspace member is deleted. |
| `role` | `string` | Workspace role assigned to the member. |
| `timezone` | `string` | Timezone of the workspace member. |
| `user_email` | `string` | Email address of the workspace member. |
| `user_id` | `string` | String ID of the workspace member. |
| `workspace_id` | `string` | String ID of the workspace. |

#### Example: List

```go
memberViews, err := client.MemberView(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range memberViews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### MigratePersonalToken

Create an instance: `migratePersonalToken := client.MigratePersonalToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `any` | OAuth access token created from the personal token. |
| `client_id` | `string` | The unique Client ID of the Todoist application that you registered. |
| `client_secret` | `string` | The unique Client Secret of the Todoist application that you registered. |
| `expires_in` | `int` | Access token lifetime in seconds. |
| `personal_token` | `string` | Token obtained from the email/password authentication. |
| `scope` | `string` | Scopes of the OAuth token. |
| `token_type` | `string` | OAuth token type. |

#### Example: Create

```go
result, err := client.MigratePersonalToken(nil).Create(map[string]any{
    "access_token": "example_access_token",
    "client_id": "example_client_id",
    "client_secret": "example_client_secret",
    "expires_in": 1,
    "personal_token": "example_personal_token",
    "scope": "example_scope",
    "token_type": "example_token_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### NotificationLocationSyncView

Create an instance: `notificationLocationSyncView := client.NotificationLocationSyncView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | String ID of the location reminder |
| `is_deleted` | `bool` | Whether the location reminder is deleted |
| `item_id` | `string` | String ID of the task |
| `loc_lat` | `string` | Latitude of the location |
| `loc_long` | `string` | Longitude of the location |
| `loc_trigger` | `string` | Trigger type for the location reminder |
| `name` | `string` | Name of the location |
| `notify_uid` | `string` | String ID of the user who will receive the reminder |
| `project_id` | `string` | String ID of the project containing the task |
| `radius` | `int` | Radius in meters |
| `task_id` | `string` | String ID of the task |
| `type` | `string` | The reminder type |

#### Example: Load

```go
notificationLocationSyncView, err := client.NotificationLocationSyncView(nil).Load(map[string]any{"reminder_id": "reminder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(notificationLocationSyncView.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
notificationLocationSyncViews, err := client.NotificationLocationSyncView(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range notificationLocationSyncViews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.NotificationLocationSyncView(nil).Create(map[string]any{
    "reminder_id": "example_reminder_id",
    "id": "example_id",
    "is_deleted": true,
    "item_id": "example_item_id",
    "loc_lat": "example_loc_lat",
    "loc_long": "example_loc_long",
    "loc_trigger": "example_loc_trigger",
    "name": "example_name",
    "notify_uid": "example_notify_uid",
    "project_id": "example_project_id",
    "radius": 1,
    "task_id": "example_task_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### NotificationSyncView

Create an instance: `notificationSyncView := client.NotificationSyncView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `due` | `any` | Datetime when the reminder fires, or `null` if unset. |
| `id` | `string` | String ID of the reminder. |
| `is_deleted` | `bool` | Whether the reminder is deleted. |
| `is_urgent` | `bool` | Whether the reminder should be delivered urgently. |
| `item_id` | `string` | String ID of the task that owns the reminder. |
| `minute_offset` | `any` | Minutes before the task due time for relative reminders. |
| `notify_uid` | `string` | String ID of the user who receives the reminder. |
| `reminder_type` | `string` | Type of the reminder: 'relative' or 'absolute' |
| `service` | `string` | Notification service type: 'email', 'push'. |
| `task_id` | `string` | String ID of the task |
| `type` | `string` | Reminder type. |

#### Example: Load

```go
notificationSyncView, err := client.NotificationSyncView(nil).Load(map[string]any{"reminder_id": "reminder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(notificationSyncView.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
notificationSyncViews, err := client.NotificationSyncView(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range notificationSyncViews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.NotificationSyncView(nil).Create(map[string]any{
    "reminder_id": "example_reminder_id",
    "due": "example_due",
    "id": "example_id",
    "is_deleted": true,
    "is_urgent": true,
    "item_id": "example_item_id",
    "minute_offset": "example_minute_offset",
    "notify_uid": "example_notify_uid",
    "task_id": "example_task_id",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PlanDetail

Create an instance: `planDetail := client.PlanDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_cycle` | `string` | Billing cycle for the listed prices. |
| `prices` | `[]any` | Prices available for the billing cycle. |

#### Example: List

```go
planDetails, err := client.PlanDetail(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range planDetails.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ProductivityStat

Create an instance: `productivityStat := client.ProductivityStat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_count` | `int` | Total number of tasks completed by the user (all time) |
| `days_items` | `[]any` | Daily completion statistics for the last 7 days, ordered chronologically |
| `goals` | `map[string]any` | User goals, streaks, and productivity settings |
| `karma` | `float64` | Current karma score |
| `karma_graph_data` | `[]any` | Historical karma data points for graphing, each containing date and karma_avg |
| `karma_last_update` | `float64` | Net karma change from the most recent update (positive_karma + negative_karma) |
| `karma_trend` | `string` | Karma trend indicator ('up' or 'down') |
| `karma_update_reasons` | `[]any` | Recent karma update events with reasons and amounts |
| `project_colors` | `map[string]any` | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `week_items` | `[]any` | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

#### Example: List

```go
productivityStats, err := client.ProductivityStat(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range productivityStats.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Project

Create an instance: `project := client.Project(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_order` | `any` | Updated position of the project in the hierarchy. |
| `color` | `any` | Color of the project icon. |
| `description` | `string` | Description of the project. |
| `folder_id` | `string` | Folder to move the project into. |
| `icon` | `any` | Project icon name. |
| `id` | `string` |  |
| `is_collapsed` | `bool` | Whether the project is collapsed. |
| `is_favorite` | `bool` | Whether the project is a favorite for the user. |
| `name` | `string` | Name of the project. |
| `next_cursor` | `any` | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | `string` | Parent project ID. |
| `results` | `[]any` | Objects in the current page of results. |
| `view_style` | `any` | View style of the project. |
| `workspace_id` | `string` | Workspace ID. |

#### Example: Load

```go
project, err := client.Project(nil).Load(map[string]any{"id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(project.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
projects, err := client.Project(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projects.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Project(nil).Create(map[string]any{
    "name": "example_name",
    "next_cursor": "example_next_cursor",
    "results": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectImport

Create an instance: `projectImport := client.ProjectImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comments` | `[]any` | Task comments created by the import. |
| `discarded_fields` | `[]any` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `locale` | `string` | Locale to use for localized template content. |
| `project_id` | `string` | String ID of the project to import the template into. |
| `project_notes` | `[]any` | Project comments created by the import. |
| `project_view_options_defaults` | `[]any` | View options defaults applied to the imported project. |
| `projects` | `[]any` | Projects created or updated by the import. |
| `reminders` | `[]any` | Reminders created by the import. |
| `sections` | `[]any` | Sections created by the import. |
| `status` | `string` | Always `ok` on success. |
| `tasks` | `[]any` | Tasks created by the import. |
| `template_id` | `string` | ID of the saved template to import. |
| `template_type` | `string` | Type of template that was imported. |

#### Example: Create

```go
result, err := client.ProjectImport(nil).Create(map[string]any{
    "comments": []any{},
    "discarded_fields": []any{},
    "project_id": "example_project_id",
    "project_notes": []any{},
    "project_view_options_defaults": []any{},
    "projects": []any{},
    "reminders": []any{},
    "sections": []any{},
    "status": "example_status",
    "tasks": []any{},
    "template_id": "example_template_id",
    "template_type": "example_template_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectImportCreateResponseWithObject

Create an instance: `projectImportCreateResponseWithObject := client.ProjectImportCreateResponseWithObject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comments` | `[]any` | Task comments created by the import. |
| `discarded_fields` | `[]any` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `project_id` | `string` | ID of the project created from the template. |
| `project_notes` | `[]any` | Project comments created by the import. |
| `project_view_options_defaults` | `[]any` | View options defaults applied to the imported project. |
| `projects` | `[]any` | Projects created by the import. |
| `reminders` | `[]any` | Reminders created by the import. |
| `sections` | `[]any` | Sections created by the import. |
| `status` | `string` | Always `ok` on success. |
| `tasks` | `[]any` | Tasks created by the import. |
| `template_type` | `string` | Type of template that was imported. |

#### Example: Create

```go
result, err := client.ProjectImportCreateResponseWithObject(nil).Create(map[string]any{
    "comments": []any{},
    "discarded_fields": []any{},
    "project_id": "example_project_id",
    "project_notes": []any{},
    "project_view_options_defaults": []any{},
    "projects": []any{},
    "reminders": []any{},
    "sections": []any{},
    "status": "example_status",
    "tasks": []any{},
    "template_type": "example_template_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Reminder

Create an instance: `reminder := client.Reminder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RemoveWorkspaceUser

Create an instance: `removeWorkspaceUser := client.RemoveWorkspaceUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RoleToActionMappingView

Create an instance: `roleToActionMappingView := client.RoleToActionMappingView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_collaborator_actions` | `[]any` | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | `[]any` | Workspace collaborator roles and their allowed actions. |

#### Example: List

```go
roleToActionMappingViews, err := client.RoleToActionMappingView(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range roleToActionMappingViews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Section

Create an instance: `section := client.Section(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `string` | Date and time when the section was created. |
| `archived_at` | `any` | Date and time when the section was archived, or `null` if it is active. |
| `description` | `string` | Section description, or `null` if it has none. |
| `id` | `string` | String ID of the section. |
| `is_archived` | `bool` | Whether the section is archived. |
| `is_collapsed` | `bool` | Whether the section is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the section is deleted. |
| `name` | `string` | Section name. |
| `order` | `any` | Position of the new section in the project |
| `order_key` | `any` | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `string` | String ID of the project that contains the section. |
| `section_order` | `int` | Position of the section in the project. |
| `updated_at` | `any` | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | `string` | String ID of the user who owns the section. |

#### Example: Load

```go
section, err := client.Section(nil).Load(map[string]any{"id": "section_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(section.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
sections, err := client.Section(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sections.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Section(nil).Create(map[string]any{
    "added_at": "example_added_at",
    "archived_at": "example_archived_at",
    "description": "example_description",
    "id": "example_id",
    "is_archived": true,
    "is_collapsed": true,
    "is_deleted": true,
    "name": "example_name",
    "order_key": "example_order_key",
    "project_id": "example_project_id",
    "section_order": 1,
    "updated_at": "example_updated_at",
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SharedLabel

Create an instance: `sharedLabel := client.SharedLabel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Current shared label name to rename. |
| `new_name` | `string` | New shared label name to apply to matching tasks. |
| `next_cursor` | `any` | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `[]any` | Objects in the current page of results. |

#### Example: List

```go
sharedLabels, err := client.SharedLabel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sharedLabels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### StatusOk

Create an instance: `statusOk := client.StatusOk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### SubscriptionInfo

Create an instance: `subscriptionInfo := client.SubscriptionInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_method` | `string` | How the active subscription was purchased. |
| `billing_portal_switch_to_annual_url` | `any` | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `billing_portal_url` | `any` | One-time URL to the Stripe customer portal, if available. |
| `expiration_date` | `any` | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `has_billing_portal` | `bool` | `true` when the user has a Stripe customer with a portal session. |
| `has_billing_portal_switch_to_annual` | `bool` | `true` when a switch-to-annual flow is available in Stripe. |
| `has_switch_legacy_to_current` | `bool` | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `invoice_credit_balance` | `any` | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `plan` | `string` | Plan tier the user is currently on. |
| `plan_price` | `any` | Price of the active plan, when known. |
| `status` | `string` | Current subscription status. |

#### Example: Create

```go
result, err := client.SubscriptionInfo(nil).Create(map[string]any{
    "activation_method": "example_activation_method",
    "billing_portal_switch_to_annual_url": "example_billing_portal_switch_to_annual_url",
    "billing_portal_url": "example_billing_portal_url",
    "expiration_date": "example_expiration_date",
    "has_billing_portal": true,
    "has_billing_portal_switch_to_annual": true,
    "has_switch_legacy_to_current": true,
    "invoice_credit_balance": "example_invoice_credit_balance",
    "plan": "example_plan",
    "plan_price": "example_plan_price",
    "status": "example_status",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Task

Create an instance: `task := client.Task(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `string` | ID of the user to assign the task to. |
| `checked` | `bool` | Whether the task is completed. |
| `child_order` | `int` | Position of the task among sibling tasks. |
| `completed_at` | `any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Number of times the task has been marked as completed. |
| `content` | `string` | Task content. |
| `day_order` | `int` | Task order for day-based views. |
| `deadline` | `any` | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `any` | Deadline date in YYYY-MM-DD format |
| `description` | `string` | Task description. |
| `due` | `any` | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `any` | Due date in RFC 3339 format or similar. |
| `due_datetime` | `any` | Due date and time. |
| `due_lang` | `any` | Due date language code. |
| `due_string` | `any` | Human-readable representation of the due date. |
| `duration` | `float64` | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `any` | Unit of time for duration. |
| `id` | `string` | String ID of the task. |
| `is_collapsed` | `bool` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the task is deleted. |
| `labels` | `[]any` | Names of labels attached to the task. |
| `note_count` | `int` | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `any` | Position of the task in the project or section |
| `order_key` | `any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | String ID of the project that contains the task. |
| `responsible_uid` | `any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | String ID of the user who owns the task. |

#### Example: Load

```go
task, err := client.Task(nil).Load(map[string]any{"id": "task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(task.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
tasks, err := client.Task(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range tasks.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Task(nil).Create(map[string]any{
    "added_at": "example_added_at",
    "added_by_uid": "example_added_by_uid",
    "assigned_by_uid": "example_assigned_by_uid",
    "checked": true,
    "child_order": 1,
    "completed_at": "example_completed_at",
    "completed_by_uid": "example_completed_by_uid",
    "completed_count": 1,
    "content": "example_content",
    "day_order": 1,
    "deadline": "example_deadline",
    "description": "example_description",
    "due": "example_due",
    "duration": 1,
    "id": "example_id",
    "is_collapsed": true,
    "is_deleted": true,
    "labels": []any{},
    "note_count": 1,
    "order_key": "example_order_key",
    "parent_id": "example_parent_id",
    "postponed_count": 1,
    "priority": 1,
    "project_id": "example_project_id",
    "responsible_uid": "example_responsible_uid",
    "section_id": "example_section_id",
    "updated_at": "example_updated_at",
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Template

Create an instance: `template := client.Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
template, err := client.Template(nil).Load(map[string]any{"project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(template.(sdk.Entity).Data()) // the loaded entity's record
```


### TopUp

Create an instance: `topUp := client.TopUp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `int` | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | `string` | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | `string` | ISO currency code. |
| `return_url` | `string` | URL Checkout returns the user to. |
| `session_id` | `string` | The created Stripe Checkout session id. |

#### Example: Create

```go
result, err := client.TopUp(nil).Create(map[string]any{
    "amount": 1,
    "checkout_url": "example_checkout_url",
    "currency": "example_currency",
    "return_url": "example_return_url",
    "session_id": "example_session_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Upload

Create an instance: `upload := client.Upload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `string` | Name of the uploaded file. |
| `file_size` | `int` | Size of the uploaded file in bytes. |
| `file_type` | `string` | MIME type of the uploaded file. |
| `file_url` | `string` | URL of the uploaded file. |
| `image` | `any` | Image URL for image uploads, or `null` for non-image files. |
| `image_height` | `any` | Image height in pixels, or `null` for non-image files. |
| `image_width` | `any` | Image width in pixels, or `null` for non-image files. |
| `resource_type` | `string` | Detected resource type of the upload. |
| `upload_state` | `string` | Upload processing state. |

#### Example: Create

```go
result, err := client.Upload(nil).Create(map[string]any{
    "file_name": "example_file_name",
    "file_size": 1,
    "file_type": "example_file_type",
    "file_url": "example_file_url",
    "resource_type": "example_resource_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### UsageSummary

Create an instance: `usageSummary := client.UsageSummary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automation_id` | `string` | The automation this usage belongs to. |
| `charged_amount` | `int` | `charged_units` in money, in microdollars. |
| `charged_units` | `int` | Units the group took off the balance, as a positive number. |
| `description` | `string` | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | `int` | How many usage events settled in the group. |

#### Example: List

```go
usageSummarys, err := client.UsageSummary(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range usageSummarys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_user` | `bool` | Whether the user is considered activated (completed key onboarding actions) |
| `auto_reminder` | `int` | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `avatar_big` | `any` | The link to a 195x195 pixels image of the user's avatar |
| `avatar_medium` | `any` | The link to a 60x60 pixels image of the user's avatar |
| `avatar_s640` | `any` | The link to a 640x640 pixels image of the user's avatar |
| `avatar_small` | `any` | The link to a 35x35 pixels image of the user's avatar |
| `business_account_id` | `string` | The ID of the user's business account |
| `completed_count` | `int` | Total number of tasks completed by user |
| `completed_today` | `int` | Number of tasks completed today by the user |
| `daily_goal` | `int` | The daily goal number of completed tasks for karma |
| `date_format` | `int` | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `days_off` | `[]any` | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `deleted_at` | `any` | Date when user was deleted (ISO 8601 format) |
| `dont_notify` | `any` | Whether notifications should be disabled for the selected type and channel. |
| `email` | `string` | User's email address |
| `feature_identifier` | `string` | Feature identifier for feature flag evaluations |
| `features` | `map[string]any` | Feature flags and settings for the user |
| `free_trial_expires` | `any` | Date when free trial expires (ISO 8601 format) |
| `full_name` | `string` | The user's real name formatted as Firstname Lastname |
| `getting_started_guide_projects` | `any` | List of project IDs for getting started guide |
| `has_magic_number` | `bool` | Whether the user has reached a magic number milestone |
| `has_password` | `bool` | Whether the user has a password set on the account. |
| `has_started_a_trial` | `bool` | Whether the user has ever started a free trial |
| `id` | `string` | User ID |
| `image_id` | `string` | The ID of the user's avatar |
| `inbox_project_id` | `string` | The ID of the user's Inbox project |
| `is_celebrations_enabled` | `bool` | Whether celebration animations are enabled |
| `is_deleted` | `bool` | Whether the user is deleted |
| `is_onboarded` | `bool` | Composite flag: true once all four onboarded_* criteria above are met. |
| `is_premium` | `bool` | Whether the user has a Todoist Pro subscription (a true or false value) |
| `joinable_workspace` | `any` | Information about workspaces the user can join |
| `joined_at` | `any` | Date when user joined Todoist (ISO 8601 format) |
| `karma` | `float64` | The user's karma score |
| `karma_trend` | `any` | The user's karma trend. |
| `lang` | `string` | The user's language |
| `mfa_enabled` | `bool` | Whether multi-factor authentication is enabled |
| `next_week` | `int` | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `notification_type` | `string` | Notification type to update. |
| `onboarded_dated_tasks_created` | `any` | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `onboarded_desktop_accessed` | `any` | True once the user has synced from Web, macOS, or Windows. |
| `onboarded_mobile_accessed` | `any` | True once the user has synced from iOS or Android. |
| `onboarded_tasks_completed` | `any` | True once the user has completed at least 3 tasks. |
| `onboarding_completed` | `bool` | Whether the user has completed onboarding |
| `onboarding_initiated` | `bool` | Whether the user has initiated onboarding |
| `onboarding_level` | `any` | User's self-reported skill level during onboarding |
| `onboarding_persona` | `any` | User's onboarding persona selection |
| `onboarding_role` | `any` | User's role selection during onboarding |
| `onboarding_started` | `bool` | Whether the user has started onboarding |
| `onboarding_team_mode` | `any` | Whether user selected team mode during onboarding |
| `onboarding_use_cases` | `any` | Use cases the user selected during onboarding |
| `premium_status` | `any` | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `premium_until` | `any` | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `service` | `string` | Notification channel to update. |
| `share_limit` | `int` | Maximum number of collaborators allowed in shared projects |
| `sort_order` | `int` | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `start_day` | `int` | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `start_page` | `string` | The user's default view on Todoist. |
| `status` | `any` | The user's status, shared across Todoist and Comms. |
| `theme_appearance` | `string` | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `theme_id` | `string` | The currently selected Todoist theme (a number between 0 and 13) |
| `time_format` | `any` | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `token` | `string` | The user's token that should be used to call the other API methods |
| `tz_info` | `map[string]any` | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `urgent_reminder_device` | `any` | The device that should ring urgent reminders. |
| `verification_status` | `string` | User's email verification status. |
| `websocket_url` | `string` | WebSocket URL for real-time updates |
| `weekend_start_day` | `int` | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `weekly_goal` | `int` | The target number of tasks to complete per week |

#### Example: List

```go
users, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range users.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Workspace

Create an instance: `workspace := client.Workspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Updated workspace description. |
| `domain_discovery` | `any` | Updated domain discovery setting. |
| `domain_name` | `any` | Updated workspace email domain. |
| `id` | `string` |  |
| `invite_code` | `any` | Regenerate workspace invite code when set. |
| `is_collapsed` | `bool` | Updated collapse state for current user. |
| `is_guest_allowed` | `bool` | Updated guest access status. |
| `is_link_sharing_enabled` | `bool` | Updated link sharing status. |
| `is_trial_pending` | `bool` | Updated trial pending state. |
| `name` | `string` | Updated workspace name. |
| `properties` | `any` | Updated workspace properties. |
| `restrict_email_domains` | `any` | Updated email domain restriction setting. |

#### Example: Load

```go
workspace, err := client.Workspace(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
workspaces, err := client.Workspace(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range workspaces.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Workspace(nil).Create(map[string]any{
    "id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### WorkspaceInvitationView

Create an instance: `workspaceInvitationView := client.WorkspaceInvitationView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` | Product the invitation was sent from. |
| `id` | `string` | The ID of the invitation |
| `inviter_id` | `string` | ID of the user user who sent the invitation |
| `role` | `string` | Workspace role granted by the invitation. |
| `user_email` | `string` | The invited person's email. |
| `workspace_id` | `string` | ID of the workspace |

#### Example: List

```go
workspaceInvitationViews, err := client.WorkspaceInvitationView(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range workspaceInvitationViews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.WorkspaceInvitationView(nil).Create(map[string]any{
    "inviter_id": "example_inviter_id",
    "role": "example_role",
    "user_email": "example_user_email",
    "workspace_id": "example_workspace_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### WorkspaceUserView

Create an instance: `workspaceUserView := client.WorkspaceUserView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `custom_sorting_applied` | `bool` | Whether the user has custom project sorting enabled. |
| `invite_code` | `any` | Workspace invite code to join with. |
| `project_sort_preference` | `string` | Project sorting preference for the user. |
| `role` | `string` | Workspace role assigned to the user. |
| `user_id` | `string` | String ID of the workspace user. |
| `workspace_id` | `string` | String ID of the workspace. |

#### Example: Create

```go
result, err := client.WorkspaceUserView(nil).Create(map[string]any{
    "user_id": 1,
    "workspace_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

10 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `comment` | `file_attachment` | 4 | 3 levels |
| `project_import` | `comments` | 4 | 6 levels |
| `project_import` | `project_notes` | 4 | 6 levels |
| `project_import_create_response_with_object` | `comments` | 4 | 6 levels |
| `project_import_create_response_with_object` | `project_notes` | 4 | 6 levels |
| `active` | `access` | 3 | 4 levels |
| `archived` | `access` | 3 | 4 levels |
| `project` | `results` | 3 | 9 levels |
| `project_import` | `projects` | 3 | 9 levels |
| `project_import_create_response_with_object` | `projects` | 3 | 9 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/technomonkey-7/todoist-sdk/go/
├── todoist.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/technomonkey-7/todoist-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
activity := client.Activity(nil)
activity.List(nil, nil)

// activity.Data() now returns the activity data from the last list
// activity.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
