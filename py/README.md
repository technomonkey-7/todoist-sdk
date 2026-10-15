# Todoist Python SDK

Unofficial Todoist API clients for TypeScript, Python and Go, with a CLI and an MCP server, generated from Doist's OpenAPI definition.

The Python SDK for the Todoist API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Active()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/technomonkey-7/todoist-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from todoist_sdk import TodoistSDK

client = TodoistSDK({
    "apikey": os.environ.get("TODOIST_APIKEY"),
})
```

### 2. List active records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    actives = client.Active().list({"workspace_id": 1})
    for active in actives:
        print(active.data_get())
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an anyprojectsyncview

AnyProjectSyncView is nested under project, so provide the `project_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    anyprojectsyncview = client.AnyProjectSyncView().load({"project_id": "example_project_id"})
    print(anyprojectsyncview.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    creditstate = client.CreditState().load()
    print(creditstate.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = TodoistSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
creditstate = client.CreditState().load()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = TodoistSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### TodoistSDK

```python
from todoist_sdk import TodoistSDK

client = TodoistSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = TodoistSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### TodoistSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Active` | `(data) -> ActiveEntity` | Create an Active entity instance. |
| `Activity` | `(data) -> ActivityEntity` | Create an Activity entity instance. |
| `AnyProjectSyncView` | `(data) -> AnyProjectSyncViewEntity` | Create an AnyProjectSyncView entity instance. |
| `Archived` | `(data) -> ArchivedEntity` | Create an Archived entity instance. |
| `Authorization` | `(data) -> AuthorizationEntity` | Create an Authorization entity instance. |
| `Backup` | `(data) -> BackupEntity` | Create a Backup entity instance. |
| `BillingPortalUrl` | `(data) -> BillingPortalUrlEntity` | Create a BillingPortalUrl entity instance. |
| `ByCompletionDate` | `(data) -> ByCompletionDateEntity` | Create a ByCompletionDate entity instance. |
| `ByDueDate` | `(data) -> ByDueDateEntity` | Create a ByDueDate entity instance. |
| `Collaborator` | `(data) -> CollaboratorEntity` | Create a Collaborator entity instance. |
| `Comment` | `(data) -> CommentEntity` | Create a Comment entity instance. |
| `CreditState` | `(data) -> CreditStateEntity` | Create a CreditState entity instance. |
| `Email` | `(data) -> EmailEntity` | Create an Email entity instance. |
| `FileUrl` | `(data) -> FileUrlEntity` | Create a FileUrl entity instance. |
| `Folder` | `(data) -> FolderEntity` | Create a Folder entity instance. |
| `History` | `(data) -> HistoryEntity` | Create a History entity instance. |
| `IdMapping` | `(data) -> IdMappingEntity` | Create an IdMapping entity instance. |
| `Invite` | `(data) -> InviteEntity` | Create an Invite entity instance. |
| `ItemSyncView` | `(data) -> ItemSyncViewEntity` | Create an ItemSyncView entity instance. |
| `Label` | `(data) -> LabelEntity` | Create a Label entity instance. |
| `LabelRestView` | `(data) -> LabelRestViewEntity` | Create a LabelRestView entity instance. |
| `LocationReminder` | `(data) -> LocationReminderEntity` | Create a LocationReminder entity instance. |
| `MemberView` | `(data) -> MemberViewEntity` | Create a MemberView entity instance. |
| `MigratePersonalToken` | `(data) -> MigratePersonalTokenEntity` | Create a MigratePersonalToken entity instance. |
| `NoteSyncView` | `(data) -> NoteSyncViewEntity` | Create a NoteSyncView entity instance. |
| `NotificationLocationSyncView` | `(data) -> NotificationLocationSyncViewEntity` | Create a NotificationLocationSyncView entity instance. |
| `NotificationSyncView` | `(data) -> NotificationSyncViewEntity` | Create a NotificationSyncView entity instance. |
| `PaginatedListAnyProjectSyncView` | `(data) -> PaginatedListAnyProjectSyncViewEntity` | Create a PaginatedListAnyProjectSyncView entity instance. |
| `PaginatedListItemSyncView` | `(data) -> PaginatedListItemSyncViewEntity` | Create a PaginatedListItemSyncView entity instance. |
| `PaginatedListStr` | `(data) -> PaginatedListStrEntity` | Create a PaginatedListStr entity instance. |
| `PlanDetail` | `(data) -> PlanDetailEntity` | Create a PlanDetail entity instance. |
| `ProductivityStat` | `(data) -> ProductivityStatEntity` | Create a ProductivityStat entity instance. |
| `Project` | `(data) -> ProjectEntity` | Create a Project entity instance. |
| `ProjectImport` | `(data) -> ProjectImportEntity` | Create a ProjectImport entity instance. |
| `ProjectImportCreateResponseWithObject` | `(data) -> ProjectImportCreateResponseWithObjectEntity` | Create a ProjectImportCreateResponseWithObject entity instance. |
| `Reminder` | `(data) -> ReminderEntity` | Create a Reminder entity instance. |
| `RemoveWorkspaceUser` | `(data) -> RemoveWorkspaceUserEntity` | Create a RemoveWorkspaceUser entity instance. |
| `RoleToActionMappingView` | `(data) -> RoleToActionMappingViewEntity` | Create a RoleToActionMappingView entity instance. |
| `Section` | `(data) -> SectionEntity` | Create a Section entity instance. |
| `SectionSyncView` | `(data) -> SectionSyncViewEntity` | Create a SectionSyncView entity instance. |
| `StatusOk` | `(data) -> StatusOkEntity` | Create a StatusOk entity instance. |
| `SubscriptionInfo` | `(data) -> SubscriptionInfoEntity` | Create a SubscriptionInfo entity instance. |
| `Task` | `(data) -> TaskEntity` | Create a Task entity instance. |
| `Template` | `(data) -> TemplateEntity` | Create a Template entity instance. |
| `TopUp` | `(data) -> TopUpEntity` | Create a TopUp entity instance. |
| `Upload` | `(data) -> UploadEntity` | Create an Upload entity instance. |
| `UsageSummary` | `(data) -> UsageSummaryEntity` | Create an UsageSummary entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `Workspace` | `(data) -> WorkspaceEntity` | Create a Workspace entity instance. |
| `WorkspaceInvitationView` | `(data) -> WorkspaceInvitationViewEntity` | Create a WorkspaceInvitationView entity instance. |
| `WorkspaceUserView` | `(data) -> WorkspaceUserViewEntity` | Create a WorkspaceUserView entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Active

| Field | Description |
| --- | --- |
| `access` | Project access configuration. |
| `archived_date` | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | Numeric project color code. |
| `default_order` | Default order of the project in workspace views. |
| `default_order_key` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | Project description. |
| `folder_id` | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | Numeric ID of the user requesting the workspace project. |
| `is_archived` | Whether the workspace project is archived. |
| `is_frozen` | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | Whether project insights are enabled for the project. |
| `name` | Project name. |
| `project_id` | String ID of the project. |
| `public_access` | Whether the project is publicly accessible. |
| `role` |  |
| `status` | Project status. |
| `view_style` | Project view style. |
| `workspace_id` | Numeric ID of the workspace that contains the project. |

Operations: List.

API path: `/api/v1/workspaces/{workspace_id}/projects/active`

#### Activity

| Field | Description |
| --- | --- |
| `event_date` | The timestamp when this activity occurred. |
| `event_type` | The type of event that occurred. |
| `extra_data` | This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`… |
| `extra_data_id` | Internal ID for the extra activity data row. |
| `id` | The internal unique identifier for this activity log entry. |
| `initiator_id` |  |
| `object_id` | The unique identifier of the object this activity relates to (project, item, note, or section ID). |
| `object_type` | The type of object this activity relates to. |
| `parent_item_id` | For note (comment) activities, the ID of the item (task) that the note is attached to. |
| `parent_project_id` | The ID of the project that contains the object this activity relates to. |

Operations: List.

API path: `/api/v1/activities`

#### AnyProjectSyncView

| Field | Description |
| --- | --- |
| `child_order` | Updated position of the project in the hierarchy. |
| `color` | Updated project color. |
| `description` | Updated project description. |
| `folder_id` | Folder to move the project into. |
| `icon` | Updated project icon name. |
| `is_collapsed` | Whether the project is collapsed. |
| `is_favorite` | Whether the project is marked as a favorite. |
| `name` | Updated project name. |
| `next_cursor` | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | Parent project ID. |
| `results` | Objects in the current page of results. |
| `view_style` | Updated project view style. |
| `workspace_id` | Workspace ID. |

Operations: Create, List, Load.

API path: `/api/v1/projects/{project_id}`

#### Archived

| Field | Description |
| --- | --- |
| `access` | Project access configuration. |
| `archived_date` | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | Numeric project color code. |
| `default_order` | Default order of the project in workspace views. |
| `default_order_key` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | Project description. |
| `folder_id` | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | Numeric ID of the user requesting the workspace project. |
| `is_archived` | Whether the workspace project is archived. |
| `is_frozen` | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | Whether project insights are enabled for the project. |
| `name` | Project name. |
| `project_id` | String ID of the project. |
| `public_access` | Whether the project is publicly accessible. |
| `role` |  |
| `status` | Project status. |
| `view_style` | Project view style. |
| `workspace_id` | Numeric ID of the workspace that contains the project. |

Operations: List.

API path: `/api/v1/workspaces/{workspace_id}/projects/archived`

#### Authorization

| Field | Description |
| --- | --- |
| `token` | The token to be revoked (access token). |
| `token_type_hint` | A hint about the type of the token being revoked (optional). |

Operations: Create, Remove.

API path: `/api/v1/revoke`

#### Backup

| Field | Description |
| --- | --- |
| `url` | Backup URL |
| `version` | Date and time of the backup version |

Operations: List, Load.

API path: `/api/v1/backups`

#### BillingPortalUrl

| Field | Description |
| --- | --- |
| `billing_portal_url` |  |
| `reason_description` | Human-readable label of the cancellation reason. |
| `reason_flag` | Short identifier of the cancellation reason category. |
| `reason_text` | Free-form feedback from the user about the cancellation. |
| `return_url` | URL the user is redirected to after completing the flow. |

Operations: Create.

API path: `/api/v1/payments/cancel_plan_with_redirect_to_stripe`

#### ByCompletionDate

| Field | Description |
| --- | --- |
| `added_at` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | Whether the task is completed. |
| `child_order` | Position of the task among sibling tasks. |
| `completed_at` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | Number of times the task has been marked as completed. |
| `content` | Task content. |
| `day_order` | Task order for day-based views. |
| `deadline` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | Task description. |
| `due` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | Task duration details, or `null` when the task has no duration. |
| `id` | String ID of the task. |
| `is_collapsed` | Whether the task is collapsed in the user's view. |
| `is_deleted` | Whether the task is deleted. |
| `labels` | Names of labels attached to the task. |
| `note_count` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | String ID of the project that contains the task. |
| `responsible_uid` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | String ID of the user who owns the task. |

Operations: List.

API path: `/api/v1/tasks/completed/by_completion_date`

#### ByDueDate

| Field | Description |
| --- | --- |
| `added_at` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | Whether the task is completed. |
| `child_order` | Position of the task among sibling tasks. |
| `completed_at` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | Number of times the task has been marked as completed. |
| `content` | Task content. |
| `day_order` | Task order for day-based views. |
| `deadline` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | Task description. |
| `due` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | Task duration details, or `null` when the task has no duration. |
| `id` | String ID of the task. |
| `is_collapsed` | Whether the task is collapsed in the user's view. |
| `is_deleted` | Whether the task is deleted. |
| `labels` | Names of labels attached to the task. |
| `note_count` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | String ID of the project that contains the task. |
| `responsible_uid` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | String ID of the user who owns the task. |

Operations: List.

API path: `/api/v1/tasks/completed/by_due_date`

#### Collaborator

| Field | Description |
| --- | --- |
| `email` | The user's email address |
| `id` | The user's ID |
| `name` | The user's full name |

Operations: List.

API path: `/api/v1/projects/{project_id}/collaborators`

#### Comment

| Field | Description |
| --- | --- |
| `content` | New content for the comment. |
| `id` |  |

Operations: Create, Remove.

API path: `/api/v1/comments/{comment_id}`

#### CreditState

| Field | Description |
| --- | --- |
| `available_amount` | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `available_units` | Balance net of in-flight holds (`available_cached - held`). |
| `currency` | ISO currency code every amount in this response is in. |
| `depleted` | No further runs may start. |
| `is_settled_low_balance` | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `low_balance` | Balance is at or below the low-balance threshold. |
| `settled_amount` | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `settled_units` | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `usage_allowed` | Whether a new run may start right now. |
| `usage_block_reason` | Why a new run cannot start, or `null` when it can. |

Operations: Load.

API path: `/api/v1/usage_billing/state`

#### Email

| Field | Description |
| --- | --- |
| `email` | Email address for the Todoist object. |
| `obj_id` | String ID of the Todoist object. |
| `obj_type` | Type of Todoist object to create an email for. |

Operations: Update.

API path: `/api/v1/emails`

#### FileUrl

| Field | Description |
| --- | --- |
| `file_name` | Name of the exported template file. |
| `file_url` | Temporary URL for downloading the exported template. |

Operations: Load.

API path: `/api/v1/templates/url`

#### Folder

| Field | Description |
| --- | --- |
| `child_order` | User-specific position of the folder. |
| `default_order` | Default position of the folder in the workspace. |
| `default_order_key` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `id` | String ID of the folder. |
| `is_deleted` | Whether the folder is deleted. |
| `name` | Folder name. |
| `workspace_id` | String ID of the workspace that contains the folder. |

Operations: Create, List, Load, Remove.

API path: `/api/v1/folders/{folder_id}`

#### History

| Field | Description |
| --- | --- |
| `category` | What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`. |
| `charged_amount` | `charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274. |
| `charged_units` | Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side. |
| `created_at` | When the entry was written, UTC. |
| `credited_amount` | `credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00. |
| `credited_units` | Units added to the balance, as a positive number, or `null` on a debit. |
| `description` | Human-readable summary of the entry. |
| `id` | Ledger entry id. |
| `refs` | Free-form attribution for the entry. |
| `status` | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `type` | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

Operations: List.

API path: `/api/v1/usage_billing/history`

#### IdMapping

| Field | Description |
| --- | --- |
| `new_id` | Curent ID for the object. |
| `old_id` | Legacy ID for the object. |

Operations: List.

API path: `/api/v1/id_mappings/{obj_name}/{obj_ids}`

#### Invite

| Field | Description |
| --- | --- |
| `app` | For first-party clients usage only. |
| `email_list` | List of user emails to invite to the workspace. |
| `invited_emails` | Emails successfully invited to the workspace. |
| `role` | Role assigned to invited users. |

Operations: Create.

API path: `/api/v1/workspaces/{workspace_id}/users/invite`

#### ItemSyncView

| Field | Description |
| --- | --- |
| `added_at` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | ID of the user to assign the task to. |
| `checked` | Whether the task is completed. |
| `child_order` | Position of the task among sibling tasks. |
| `completed_at` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | Number of times the task has been marked as completed. |
| `content` | Task content. |
| `day_order` | Task order for day-based views. |
| `deadline` | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | Updated deadline date in YYYY-MM-DD format. |
| `description` | Task description. |
| `due` | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | Updated due date in RFC 3339 format or similar. |
| `due_datetime` | Updated due date and time. |
| `due_lang` | Updated due date language code. |
| `due_string` | Updated human-readable representation of the due date. |
| `duration` | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | Unit of time for duration. |
| `id` | String ID of the task. |
| `is_collapsed` | Whether the task is collapsed in the user's view. |
| `is_deleted` | Whether the task is deleted. |
| `labels` | Names of labels attached to the task. |
| `note_count` | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | Position of the task in the project or section |
| `order_key` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | String ID of the project that contains the task. |
| `responsible_uid` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | String ID of the user who owns the task. |

Operations: Create, List, Load.

API path: `/api/v1/tasks/{task_id}`

#### Label

| Field | Description |
| --- | --- |
| `color` | Label color name. |
| `id` | String ID of the label. |
| `is_favorite` | Whether the label is marked as a favorite. |
| `name` | Label name. |
| `new_name` | New shared label name to apply to matching tasks. |
| `order` | Position of the label in the label list, or `null` when no explicit order is set. |

Operations: Create, List, Load, Remove.

API path: `/api/v1/labels/{label_id}`

#### LabelRestView

| Field | Description |
| --- | --- |
| `color` | Label color name. |
| `id` | String ID of the label. |
| `is_favorite` | Whether the label is marked as a favorite. |
| `name` | Label name. |
| `order` | Position of the label in the label list, or `null` when no explicit order is set. |

Operations: List.

API path: `/api/v1/labels/search`

#### LocationReminder

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/api/v1/location_reminders/{reminder_id}`

#### MemberView

| Field | Description |
| --- | --- |
| `full_name` | Full name of the workspace member. |
| `image_id` | Avatar image ID of the workspace member, or `null`. |
| `is_deleted` | Whether the workspace member is deleted. |
| `role` | Workspace role assigned to the member. |
| `timezone` | Timezone of the workspace member. |
| `user_email` | Email address of the workspace member. |
| `user_id` | String ID of the workspace member. |
| `workspace_id` | String ID of the workspace. |

Operations: List.

API path: `/api/v1/workspaces/users`

#### MigratePersonalToken

| Field | Description |
| --- | --- |
| `access_token` | OAuth access token created from the personal token. |
| `client_id` | The unique Client ID of the Todoist application that you registered. |
| `client_secret` | The unique Client Secret of the Todoist application that you registered. |
| `expires_in` | Access token lifetime in seconds. |
| `personal_token` | Token obtained from the email/password authentication. |
| `scope` | Scopes of the OAuth token. |
| `token_type` | OAuth token type. |

Operations: Create.

API path: `/api/v1/access_tokens/migrate_personal_token`

#### NoteSyncView

| Field | Description |
| --- | --- |
| `attachment` | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `content` | Comment content. |
| `file_attachment` | File attachment metadata, or `null` when the comment has no attachment. |
| `id` | String ID of the comment. |
| `is_deleted` | Whether the comment is deleted. |
| `posted_at` | Date and time when the comment was posted, or `null` if unknown. |
| `posted_uid` | String ID of the user who posted the comment. |
| `project_id` | String ID of the project |
| `reaction` | Reaction emoji. |
| `reactions` | Reaction emoji mapped to user IDs that reacted. |
| `task_id` | String ID of the task |
| `uids_to_notify` | String IDs of users notified by the comment. |

Operations: Create, List, Load.

API path: `/api/v1/comments/{comment_id}/reactions`

#### NotificationLocationSyncView

| Field | Description |
| --- | --- |
| `id` | String ID of the location reminder |
| `is_deleted` | Whether the location reminder is deleted |
| `item_id` | String ID of the task |
| `loc_lat` | Latitude of the location |
| `loc_long` | Longitude of the location |
| `loc_trigger` | Trigger type for the location reminder |
| `name` | Name of the location |
| `notify_uid` | String ID of the user who will receive the reminder |
| `project_id` | String ID of the project containing the task |
| `radius` | Radius in meters |
| `task_id` | String ID of the task |
| `type` | The reminder type |

Operations: Create, List, Load.

API path: `/api/v1/location_reminders/{reminder_id}`

#### NotificationSyncView

| Field | Description |
| --- | --- |
| `due` | Datetime when the reminder fires, or `null` if unset. |
| `id` | String ID of the reminder. |
| `is_deleted` | Whether the reminder is deleted. |
| `is_urgent` | Whether the reminder should be delivered urgently. |
| `item_id` | String ID of the task that owns the reminder. |
| `minute_offset` | Minutes before the task due time for relative reminders. |
| `notify_uid` | String ID of the user who receives the reminder. |
| `reminder_type` | Type of the reminder: 'relative' or 'absolute' |
| `service` | Notification service type: 'email', 'push'. |
| `task_id` | String ID of the task |
| `type` | Reminder type. |

Operations: Create, List, Load.

API path: `/api/v1/reminders/{reminder_id}`

#### PaginatedListAnyProjectSyncView

| Field | Description |
| --- | --- |
| `next_cursor` | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | Objects in the current page of results. |

Operations: List.

API path: `/api/v1/projects/search`

#### PaginatedListItemSyncView

| Field | Description |
| --- | --- |
| `added_at` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | Whether the task is completed. |
| `child_order` | Position of the task among sibling tasks. |
| `completed_at` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | Number of times the task has been marked as completed. |
| `content` | Task content. |
| `day_order` | Task order for day-based views. |
| `deadline` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | Task description. |
| `due` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | Task duration details, or `null` when the task has no duration. |
| `id` | String ID of the task. |
| `is_collapsed` | Whether the task is collapsed in the user's view. |
| `is_deleted` | Whether the task is deleted. |
| `labels` | Names of labels attached to the task. |
| `note_count` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | String ID of the project that contains the task. |
| `responsible_uid` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | String ID of the user who owns the task. |

Operations: List.

API path: `/api/v1/tasks/filter`

#### PaginatedListStr

| Field | Description |
| --- | --- |
| `next_cursor` | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | Objects in the current page of results. |

Operations: List.

API path: `/api/v1/labels/shared`

#### PlanDetail

| Field | Description |
| --- | --- |
| `billing_cycle` | Billing cycle for the listed prices. |
| `prices` | Prices available for the billing cycle. |

Operations: List.

API path: `/api/v1/workspaces/plan_details`

#### ProductivityStat

| Field | Description |
| --- | --- |
| `completed_count` | Total number of tasks completed by the user (all time) |
| `days_items` | Daily completion statistics for the last 7 days, ordered chronologically |
| `goals` | User goals, streaks, and productivity settings |
| `karma` | Current karma score |
| `karma_graph_data` | Historical karma data points for graphing, each containing date and karma_avg |
| `karma_last_update` | Net karma change from the most recent update (positive_karma + negative_karma) |
| `karma_trend` | Karma trend indicator ('up' or 'down') |
| `karma_update_reasons` | Recent karma update events with reasons and amounts |
| `project_colors` | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `week_items` | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

Operations: List.

API path: `/api/v1/tasks/completed/stats`

#### Project

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/api/v1/projects/{project_id}`

#### ProjectImport

| Field | Description |
| --- | --- |
| `comments` | Task comments created by the import. |
| `discarded_fields` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `locale` | Locale to use for localized template content. |
| `project_id` | String ID of the project to import the template into. |
| `project_notes` | Project comments created by the import. |
| `project_view_options_defaults` | View options defaults applied to the imported project. |
| `projects` | Projects created or updated by the import. |
| `reminders` | Reminders created by the import. |
| `sections` | Sections created by the import. |
| `status` | Always `ok` on success. |
| `tasks` | Tasks created by the import. |
| `template_id` | ID of the saved template to import. |
| `template_type` | Type of template that was imported. |

Operations: Create.

API path: `/api/v1/templates/import_into_project_from_file`

#### ProjectImportCreateResponseWithObject

| Field | Description |
| --- | --- |
| `comments` | Task comments created by the import. |
| `discarded_fields` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `project_id` | ID of the project created from the template. |
| `project_notes` | Project comments created by the import. |
| `project_view_options_defaults` | View options defaults applied to the imported project. |
| `projects` | Projects created by the import. |
| `reminders` | Reminders created by the import. |
| `sections` | Sections created by the import. |
| `status` | Always `ok` on success. |
| `tasks` | Tasks created by the import. |
| `template_type` | Type of template that was imported. |

Operations: Create.

API path: `/api/v1/templates/create_project_from_file`

#### Reminder

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/api/v1/reminders/{reminder_id}`

#### RemoveWorkspaceUser

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/api/v1/workspaces/{workspace_id}/users/{user_id}`

#### RoleToActionMappingView

| Field | Description |
| --- | --- |
| `project_collaborator_actions` | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | Workspace collaborator roles and their allowed actions. |

Operations: List.

API path: `/api/v1/projects/permissions`

#### Section

| Field | Description |
| --- | --- |
| `added_at` | Date and time when the section was created. |
| `archived_at` | Date and time when the section was archived, or `null` if it is active. |
| `description` | Section description, or `null` if it has none. |
| `id` | String ID of the section. |
| `is_archived` | Whether the section is archived. |
| `is_collapsed` | Whether the section is collapsed in the user's view. |
| `is_deleted` | Whether the section is deleted. |
| `name` | Section name. |
| `order` | Position of the new section in the project |
| `order_key` | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | String ID of the project that contains the section. |
| `section_order` | Position of the section in the project. |
| `updated_at` | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | String ID of the user who owns the section. |

Operations: Create, List, Load, Remove.

API path: `/api/v1/sections/{section_id}`

#### SectionSyncView

| Field | Description |
| --- | --- |
| `added_at` | Date and time when the section was created. |
| `archived_at` | Date and time when the section was archived, or `null` if it is active. |
| `description` | Section description, or `null` if it has none. |
| `id` | String ID of the section. |
| `is_archived` | Whether the section is archived. |
| `is_collapsed` | Whether the section is collapsed in the user's view. |
| `is_deleted` | Whether the section is deleted. |
| `name` | Section name. |
| `order_key` | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | String ID of the project that contains the section. |
| `section_order` | Position of the section in the project. |
| `updated_at` | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | String ID of the user who owns the section. |

Operations: Create, List.

API path: `/api/v1/sections/{section_id}/archive`

#### StatusOk

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/api/v1/emails`

#### SubscriptionInfo

| Field | Description |
| --- | --- |
| `activation_method` | How the active subscription was purchased. |
| `billing_portal_switch_to_annual_url` | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `billing_portal_url` | One-time URL to the Stripe customer portal, if available. |
| `expiration_date` | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `has_billing_portal` | `true` when the user has a Stripe customer with a portal session. |
| `has_billing_portal_switch_to_annual` | `true` when a switch-to-annual flow is available in Stripe. |
| `has_switch_legacy_to_current` | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `invoice_credit_balance` | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `plan` | Plan tier the user is currently on. |
| `plan_price` | Price of the active plan, when known. |
| `status` | Current subscription status. |

Operations: Create.

API path: `/api/v1/payments/get_subscription_info`

#### Task

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Remove.

API path: `/api/v1/tasks/quick`

#### Template

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/templates/file`

#### TopUp

| Field | Description |
| --- | --- |
| `amount` | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | ISO currency code. |
| `return_url` | URL Checkout returns the user to. |
| `session_id` | The created Stripe Checkout session id. |

Operations: Create.

API path: `/api/v1/usage_billing/top_up`

#### Upload

| Field | Description |
| --- | --- |
| `file_name` | Name of the uploaded file. |
| `file_size` | Size of the uploaded file in bytes. |
| `file_type` | MIME type of the uploaded file. |
| `file_url` | URL of the uploaded file. |
| `image` | Image URL for image uploads, or `null` for non-image files. |
| `image_height` | Image height in pixels, or `null` for non-image files. |
| `image_width` | Image width in pixels, or `null` for non-image files. |
| `resource_type` | Detected resource type of the upload. |
| `upload_state` | Upload processing state. |

Operations: Create, Remove.

API path: `/api/v1/uploads`

#### UsageSummary

| Field | Description |
| --- | --- |
| `automation_id` | The automation this usage belongs to. |
| `charged_amount` | `charged_units` in money, in microdollars. |
| `charged_units` | Units the group took off the balance, as a positive number. |
| `description` | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | How many usage events settled in the group. |

Operations: List.

API path: `/api/v1/usage_billing/usage_summary`

#### User

| Field | Description |
| --- | --- |
| `activated_user` | Whether the user is considered activated (completed key onboarding actions) |
| `auto_reminder` | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `avatar_big` | The link to a 195x195 pixels image of the user's avatar |
| `avatar_medium` | The link to a 60x60 pixels image of the user's avatar |
| `avatar_s640` | The link to a 640x640 pixels image of the user's avatar |
| `avatar_small` | The link to a 35x35 pixels image of the user's avatar |
| `business_account_id` | The ID of the user's business account |
| `completed_count` | Total number of tasks completed by user |
| `completed_today` | Number of tasks completed today by the user |
| `daily_goal` | The daily goal number of completed tasks for karma |
| `date_format` | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `days_off` | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `deleted_at` | Date when user was deleted (ISO 8601 format) |
| `dont_notify` | Whether notifications should be disabled for the selected type and channel. |
| `email` | User's email address |
| `feature_identifier` | Feature identifier for feature flag evaluations |
| `features` | Feature flags and settings for the user |
| `free_trial_expires` | Date when free trial expires (ISO 8601 format) |
| `full_name` | The user's real name formatted as Firstname Lastname |
| `getting_started_guide_projects` | List of project IDs for getting started guide |
| `has_magic_number` | Whether the user has reached a magic number milestone |
| `has_password` | Whether the user has a password set on the account. |
| `has_started_a_trial` | Whether the user has ever started a free trial |
| `id` | User ID |
| `image_id` | The ID of the user's avatar |
| `inbox_project_id` | The ID of the user's Inbox project |
| `is_celebrations_enabled` | Whether celebration animations are enabled |
| `is_deleted` | Whether the user is deleted |
| `is_onboarded` | Composite flag: true once all four onboarded_* criteria above are met. |
| `is_premium` | Whether the user has a Todoist Pro subscription (a true or false value) |
| `joinable_workspace` | Information about workspaces the user can join |
| `joined_at` | Date when user joined Todoist (ISO 8601 format) |
| `karma` | The user's karma score |
| `karma_trend` | The user's karma trend. |
| `lang` | The user's language |
| `mfa_enabled` | Whether multi-factor authentication is enabled |
| `next_week` | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `notification_type` | Notification type to update. |
| `onboarded_dated_tasks_created` | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `onboarded_desktop_accessed` | True once the user has synced from Web, macOS, or Windows. |
| `onboarded_mobile_accessed` | True once the user has synced from iOS or Android. |
| `onboarded_tasks_completed` | True once the user has completed at least 3 tasks. |
| `onboarding_completed` | Whether the user has completed onboarding |
| `onboarding_initiated` | Whether the user has initiated onboarding |
| `onboarding_level` | User's self-reported skill level during onboarding |
| `onboarding_persona` | User's onboarding persona selection |
| `onboarding_role` | User's role selection during onboarding |
| `onboarding_started` | Whether the user has started onboarding |
| `onboarding_team_mode` | Whether user selected team mode during onboarding |
| `onboarding_use_cases` | Use cases the user selected during onboarding |
| `premium_status` | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `premium_until` | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `service` | Notification channel to update. |
| `share_limit` | Maximum number of collaborators allowed in shared projects |
| `sort_order` | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `start_day` | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `start_page` | The user's default view on Todoist. |
| `status` | The user's status, shared across Todoist and Comms. |
| `theme_appearance` | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `theme_id` | The currently selected Todoist theme (a number between 0 and 13) |
| `time_format` | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `token` | The user's token that should be used to call the other API methods |
| `tz_info` | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `urgent_reminder_device` | The device that should ring urgent reminders. |
| `verification_status` | User's email verification status. |
| `websocket_url` | WebSocket URL for real-time updates |
| `weekend_start_day` | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `weekly_goal` | The target number of tasks to complete per week |

Operations: List, Update.

API path: `/api/v1/user`

#### Workspace

| Field | Description |
| --- | --- |
| `description` | Updated workspace description. |
| `domain_discovery` | Updated domain discovery setting. |
| `domain_name` | Updated workspace email domain. |
| `id` |  |
| `invite_code` | Regenerate workspace invite code when set. |
| `is_collapsed` | Updated collapse state for current user. |
| `is_guest_allowed` | Updated guest access status. |
| `is_link_sharing_enabled` | Updated link sharing status. |
| `is_trial_pending` | Updated trial pending state. |
| `name` | Updated workspace name. |
| `properties` | Updated workspace properties. |
| `restrict_email_domains` | Updated email domain restriction setting. |

Operations: Create, List, Load, Remove.

API path: `/api/v1/workspaces/{workspace_id}`

#### WorkspaceInvitationView

| Field | Description |
| --- | --- |
| `app` | Product the invitation was sent from. |
| `id` | The ID of the invitation |
| `inviter_id` | ID of the user user who sent the invitation |
| `role` | Workspace role granted by the invitation. |
| `user_email` | The invited person's email. |
| `workspace_id` | ID of the workspace |

Operations: Create, List, Update.

API path: `/api/v1/workspaces/invitations/delete`

#### WorkspaceUserView

| Field | Description |
| --- | --- |
| `custom_sorting_applied` | Whether the user has custom project sorting enabled. |
| `invite_code` | Workspace invite code to join with. |
| `project_sort_preference` | Project sorting preference for the user. |
| `role` | Workspace role assigned to the user. |
| `user_id` | String ID of the workspace user. |
| `workspace_id` | String ID of the workspace. |

Operations: Create.

API path: `/api/v1/workspaces/{workspace_id}/users/{user_id}`



## Entities


### Active

Create an instance: `active = client.Active()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `Any` | Project access configuration. |
| `archived_date` | `Any` | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `int` | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `Any` | Numeric project color code. |
| `default_order` | `int` | Default order of the project in workspace views. |
| `default_order_key` | `Any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `str` | Project description. |
| `folder_id` | `str` | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `Any` | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `int` | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `bool` | Whether the workspace project is archived. |
| `is_frozen` | `bool` | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `bool` | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `bool` | Whether project insights are enabled for the project. |
| `name` | `str` | Project name. |
| `project_id` | `str` | String ID of the project. |
| `public_access` | `bool` | Whether the project is publicly accessible. |
| `role` | `Any` |  |
| `status` | `str` | Project status. |
| `view_style` | `str` | Project view style. |
| `workspace_id` | `int` | Numeric ID of the workspace that contains the project. |

#### Example: List

```python
actives = client.Active().list({"workspace_id": 1})
```


### Activity

Create an instance: `activity = client.Activity()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_date` | `str` | The timestamp when this activity occurred. |
| `event_type` | `str` | The type of event that occurred. |
| `extra_data` | `Any` | This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`… |
| `extra_data_id` | `str` | Internal ID for the extra activity data row. |
| `id` | `str` | The internal unique identifier for this activity log entry. |
| `initiator_id` | `str` |  |
| `object_id` | `str` | The unique identifier of the object this activity relates to (project, item, note, or section ID). |
| `object_type` | `str` | The type of object this activity relates to. |
| `parent_item_id` | `str` | For note (comment) activities, the ID of the item (task) that the note is attached to. |
| `parent_project_id` | `str` | The ID of the project that contains the object this activity relates to. |

#### Example: List

```python
activitys = client.Activity().list()
```


### AnyProjectSyncView

Create an instance: `any_project_sync_view = client.AnyProjectSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_order` | `Any` | Updated position of the project in the hierarchy. |
| `color` | `Any` | Updated project color. |
| `description` | `str` | Updated project description. |
| `folder_id` | `str` | Folder to move the project into. |
| `icon` | `Any` | Updated project icon name. |
| `is_collapsed` | `bool` | Whether the project is collapsed. |
| `is_favorite` | `bool` | Whether the project is marked as a favorite. |
| `name` | `str` | Updated project name. |
| `next_cursor` | `Any` | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | `str` | Parent project ID. |
| `results` | `list` | Objects in the current page of results. |
| `view_style` | `Any` | Updated project view style. |
| `workspace_id` | `str` | Workspace ID. |

#### Example: Load

```python
any_project_sync_view = client.AnyProjectSyncView().load({"project_id": "project_id"})
```

#### Example: List

```python
any_project_sync_views = client.AnyProjectSyncView().list()
```

#### Example: Create

```python
any_project_sync_view = client.AnyProjectSyncView().create({
    "project_id": "example_project_id",  # str
    "next_cursor": "example_next_cursor",  # Any
    "results": [],  # list
})
```


### Archived

Create an instance: `archived = client.Archived()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `Any` | Project access configuration. |
| `archived_date` | `Any` | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `int` | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `Any` | Numeric project color code. |
| `default_order` | `int` | Default order of the project in workspace views. |
| `default_order_key` | `Any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `str` | Project description. |
| `folder_id` | `str` | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `Any` | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `int` | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `bool` | Whether the workspace project is archived. |
| `is_frozen` | `bool` | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `bool` | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `bool` | Whether project insights are enabled for the project. |
| `name` | `str` | Project name. |
| `project_id` | `str` | String ID of the project. |
| `public_access` | `bool` | Whether the project is publicly accessible. |
| `role` | `Any` |  |
| `status` | `str` | Project status. |
| `view_style` | `str` | Project view style. |
| `workspace_id` | `int` | Numeric ID of the workspace that contains the project. |

#### Example: List

```python
archiveds = client.Archived().list({"workspace_id": 1})
```


### Authorization

Create an instance: `authorization = client.Authorization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `token` | `str` | The token to be revoked (access token). |
| `token_type_hint` | `Any` | A hint about the type of the token being revoked (optional). |

#### Example: Create

```python
authorization = client.Authorization().create({
    "token": "example_token",  # str
})
```


### Backup

Create an instance: `backup = client.Backup()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `str` | Backup URL |
| `version` | `str` | Date and time of the backup version |

#### Example: Load

```python
backup = client.Backup().load({"file": "file"})
```

#### Example: List

```python
backups = client.Backup().list()
```


### BillingPortalUrl

Create an instance: `billing_portal_url = client.BillingPortalUrl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_portal_url` | `str` |  |
| `reason_description` | `str` | Human-readable label of the cancellation reason. |
| `reason_flag` | `str` | Short identifier of the cancellation reason category. |
| `reason_text` | `str` | Free-form feedback from the user about the cancellation. |
| `return_url` | `str` | URL the user is redirected to after completing the flow. |

#### Example: Create

```python
billing_portal_url = client.BillingPortalUrl().create({
    "billing_portal_url": "example_billing_portal_url",  # str
})
```


### ByCompletionDate

Create an instance: `by_completion_date = client.ByCompletionDate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `Any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Whether the task is completed. |
| `child_order` | `int` | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Number of times the task has been marked as completed. |
| `content` | `str` | Task content. |
| `day_order` | `int` | Task order for day-based views. |
| `deadline` | `Any` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `str` | Task description. |
| `due` | `Any` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float` | Task duration details, or `null` when the task has no duration. |
| `id` | `str` | String ID of the task. |
| `is_collapsed` | `bool` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the task is deleted. |
| `labels` | `list` | Names of labels attached to the task. |
| `note_count` | `int` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `Any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | String ID of the user who owns the task. |

#### Example: List

```python
by_completion_dates = client.ByCompletionDate().list({"since": "example", "until": "example"})
```


### ByDueDate

Create an instance: `by_due_date = client.ByDueDate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `Any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Whether the task is completed. |
| `child_order` | `int` | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Number of times the task has been marked as completed. |
| `content` | `str` | Task content. |
| `day_order` | `int` | Task order for day-based views. |
| `deadline` | `Any` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `str` | Task description. |
| `due` | `Any` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float` | Task duration details, or `null` when the task has no duration. |
| `id` | `str` | String ID of the task. |
| `is_collapsed` | `bool` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the task is deleted. |
| `labels` | `list` | Names of labels attached to the task. |
| `note_count` | `int` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `Any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | String ID of the user who owns the task. |

#### Example: List

```python
by_due_dates = client.ByDueDate().list({"since": "example", "until": "example"})
```


### Collaborator

Create an instance: `collaborator = client.Collaborator()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` | The user's email address |
| `id` | `str` | The user's ID |
| `name` | `str` | The user's full name |

#### Example: List

```python
collaborators = client.Collaborator().list({"project_id": "example"})
```


### Comment

Create an instance: `comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `Any` | New content for the comment. |
| `id` | `str` |  |

#### Example: Create

```python
comment = client.Comment().create({
    "id": "example_id",  # str
    "content": "example_content",  # Any
})
```


### CreditState

Create an instance: `credit_state = client.CreditState()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_amount` | `int` | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `available_units` | `int` | Balance net of in-flight holds (`available_cached - held`). |
| `currency` | `str` | ISO currency code every amount in this response is in. |
| `depleted` | `bool` | No further runs may start. |
| `is_settled_low_balance` | `bool` | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `low_balance` | `bool` | Balance is at or below the low-balance threshold. |
| `settled_amount` | `int` | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `settled_units` | `int` | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `usage_allowed` | `bool` | Whether a new run may start right now. |
| `usage_block_reason` | `Any` | Why a new run cannot start, or `null` when it can. |

#### Example: Load

```python
credit_state = client.CreditState().load()
```


### Email

Create an instance: `email = client.Email()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` | Email address for the Todoist object. |
| `obj_id` | `str` | String ID of the Todoist object. |
| `obj_type` | `str` | Type of Todoist object to create an email for. |


### FileUrl

Create an instance: `file_url = client.FileUrl()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `str` | Name of the exported template file. |
| `file_url` | `str` | Temporary URL for downloading the exported template. |

#### Example: Load

```python
file_url = client.FileUrl().load({"project_id": "project_id"})
```


### Folder

Create an instance: `folder = client.Folder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_order` | `int` | User-specific position of the folder. |
| `default_order` | `int` | Default position of the folder in the workspace. |
| `default_order_key` | `Any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `id` | `str` | String ID of the folder. |
| `is_deleted` | `bool` | Whether the folder is deleted. |
| `name` | `str` | Folder name. |
| `workspace_id` | `str` | String ID of the workspace that contains the folder. |

#### Example: Load

```python
folder = client.Folder().load({"id": 1})
```

#### Example: List

```python
folders = client.Folder().list({"workspace_id": 1})
```

#### Example: Create

```python
folder = client.Folder().create({
    "id": 1,  # int
    "child_order": 1,  # int
    "default_order": 1,  # int
    "default_order_key": "example_default_order_key",  # Any
    "is_deleted": True,  # bool
    "name": "example_name",  # str
    "workspace_id": "example_workspace_id",  # str
})
```


### History

Create an instance: `history = client.History()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` | What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`. |
| `charged_amount` | `Any` | `charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274. |
| `charged_units` | `Any` | Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side. |
| `created_at` | `str` | When the entry was written, UTC. |
| `credited_amount` | `Any` | `credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00. |
| `credited_units` | `Any` | Units added to the balance, as a positive number, or `null` on a debit. |
| `description` | `str` | Human-readable summary of the entry. |
| `id` | `int` | Ledger entry id. |
| `refs` | `dict` | Free-form attribution for the entry. |
| `status` | `str` | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `type` | `str` | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

#### Example: List

```python
historys = client.History().list()
```


### IdMapping

Create an instance: `id_mapping = client.IdMapping()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `new_id` | `str` | Curent ID for the object. |
| `old_id` | `str` | Legacy ID for the object. |

#### Example: List

```python
id_mappings = client.IdMapping().list({"obj_id": "example", "obj_name": "example"})
```


### Invite

Create an instance: `invite = client.Invite()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `str` | For first-party clients usage only. |
| `email_list` | `Any` | List of user emails to invite to the workspace. |
| `invited_emails` | `list` | Emails successfully invited to the workspace. |
| `role` | `Any` | Role assigned to invited users. |

#### Example: Create

```python
invite = client.Invite().create({
    "workspace_id": 1,  # int
    "invited_emails": [],  # list
})
```


### ItemSyncView

Create an instance: `item_sync_view = client.ItemSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `Any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `str` | ID of the user to assign the task to. |
| `checked` | `bool` | Whether the task is completed. |
| `child_order` | `int` | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Number of times the task has been marked as completed. |
| `content` | `str` | Task content. |
| `day_order` | `int` | Task order for day-based views. |
| `deadline` | `Any` | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `Any` | Updated deadline date in YYYY-MM-DD format. |
| `description` | `str` | Task description. |
| `due` | `Any` | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `str` | Updated due date in RFC 3339 format or similar. |
| `due_datetime` | `str` | Updated due date and time. |
| `due_lang` | `str` | Updated due date language code. |
| `due_string` | `str` | Updated human-readable representation of the due date. |
| `duration` | `float` | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `Any` | Unit of time for duration. |
| `id` | `str` | String ID of the task. |
| `is_collapsed` | `bool` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the task is deleted. |
| `labels` | `list` | Names of labels attached to the task. |
| `note_count` | `int` | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `Any` | Position of the task in the project or section |
| `order_key` | `Any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | String ID of the user who owns the task. |

#### Example: Load

```python
item_sync_view = client.ItemSyncView().load({"task_id": "task_id"})
```

#### Example: List

```python
item_sync_views = client.ItemSyncView().list()
```

#### Example: Create

```python
item_sync_view = client.ItemSyncView().create({
    "task_id": "example_task_id",  # str
    "added_at": "example_added_at",  # Any
    "added_by_uid": "example_added_by_uid",  # Any
    "assigned_by_uid": "example_assigned_by_uid",  # Any
    "checked": True,  # bool
    "child_order": 1,  # int
    "completed_at": "example_completed_at",  # Any
    "completed_by_uid": "example_completed_by_uid",  # Any
    "completed_count": 1,  # int
    "content": "example_content",  # str
    "day_order": 1,  # int
    "deadline": "example_deadline",  # Any
    "description": "example_description",  # str
    "due": "example_due",  # Any
    "duration": 1,  # float
    "id": "example_id",  # str
    "is_collapsed": True,  # bool
    "is_deleted": True,  # bool
    "labels": [],  # list
    "note_count": 1,  # int
    "order_key": "example_order_key",  # Any
    "parent_id": "example_parent_id",  # str
    "postponed_count": 1,  # int
    "priority": 1,  # int
    "project_id": "example_project_id",  # str
    "responsible_uid": "example_responsible_uid",  # Any
    "section_id": "example_section_id",  # str
    "updated_at": "example_updated_at",  # Any
    "user_id": "example_user_id",  # str
})
```


### Label

Create an instance: `label = client.Label()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `str` | Label color name. |
| `id` | `str` | String ID of the label. |
| `is_favorite` | `bool` | Whether the label is marked as a favorite. |
| `name` | `str` | Label name. |
| `new_name` | `str` | New shared label name to apply to matching tasks. |
| `order` | `Any` | Position of the label in the label list, or `null` when no explicit order is set. |

#### Example: Load

```python
label = client.Label().load({"id": 1})
```

#### Example: List

```python
labels = client.Label().list()
```

#### Example: Create

```python
label = client.Label().create({
    "id": 1,  # int
    "color": "example_color",  # str
    "is_favorite": True,  # bool
    "name": "example_name",  # str
    "new_name": "example_new_name",  # str
    "order": "example_order",  # Any
})
```


### LabelRestView

Create an instance: `label_rest_view = client.LabelRestView()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `str` | Label color name. |
| `id` | `str` | String ID of the label. |
| `is_favorite` | `bool` | Whether the label is marked as a favorite. |
| `name` | `str` | Label name. |
| `order` | `Any` | Position of the label in the label list, or `null` when no explicit order is set. |

#### Example: List

```python
label_rest_views = client.LabelRestView().list({"query": "example"})
```


### LocationReminder

Create an instance: `location_reminder = client.LocationReminder()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### MemberView

Create an instance: `member_view = client.MemberView()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `full_name` | `str` | Full name of the workspace member. |
| `image_id` | `str` | Avatar image ID of the workspace member, or `null`. |
| `is_deleted` | `bool` | Whether the workspace member is deleted. |
| `role` | `str` | Workspace role assigned to the member. |
| `timezone` | `str` | Timezone of the workspace member. |
| `user_email` | `str` | Email address of the workspace member. |
| `user_id` | `str` | String ID of the workspace member. |
| `workspace_id` | `str` | String ID of the workspace. |

#### Example: List

```python
member_views = client.MemberView().list()
```


### MigratePersonalToken

Create an instance: `migrate_personal_token = client.MigratePersonalToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `Any` | OAuth access token created from the personal token. |
| `client_id` | `str` | The unique Client ID of the Todoist application that you registered. |
| `client_secret` | `str` | The unique Client Secret of the Todoist application that you registered. |
| `expires_in` | `int` | Access token lifetime in seconds. |
| `personal_token` | `str` | Token obtained from the email/password authentication. |
| `scope` | `str` | Scopes of the OAuth token. |
| `token_type` | `str` | OAuth token type. |

#### Example: Create

```python
migrate_personal_token = client.MigratePersonalToken().create({
    "access_token": "example_access_token",  # Any
    "client_id": "example_client_id",  # str
    "client_secret": "example_client_secret",  # str
    "expires_in": 1,  # int
    "personal_token": "example_personal_token",  # str
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```


### NoteSyncView

Create an instance: `note_sync_view = client.NoteSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `Any` | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `content` | `str` | Comment content. |
| `file_attachment` | `Any` | File attachment metadata, or `null` when the comment has no attachment. |
| `id` | `str` | String ID of the comment. |
| `is_deleted` | `bool` | Whether the comment is deleted. |
| `posted_at` | `Any` | Date and time when the comment was posted, or `null` if unknown. |
| `posted_uid` | `Any` | String ID of the user who posted the comment. |
| `project_id` | `str` | String ID of the project |
| `reaction` | `str` | Reaction emoji. |
| `reactions` | `Any` | Reaction emoji mapped to user IDs that reacted. |
| `task_id` | `str` | String ID of the task |
| `uids_to_notify` | `Any` | String IDs of users notified by the comment. |

#### Example: Load

```python
note_sync_view = client.NoteSyncView().load({"comment_id": "comment_id"})
```

#### Example: List

```python
note_sync_views = client.NoteSyncView().list()
```

#### Example: Create

```python
note_sync_view = client.NoteSyncView().create({
    "file_attachment": "example_file_attachment",  # Any
    "id": "example_id",  # str
    "is_deleted": True,  # bool
    "posted_at": "example_posted_at",  # Any
    "posted_uid": "example_posted_uid",  # Any
    "reaction": "example_reaction",  # str
    "reactions": "example_reactions",  # Any
    "uids_to_notify": "example_uids_to_notify",  # Any
})
```


### NotificationLocationSyncView

Create an instance: `notification_location_sync_view = client.NotificationLocationSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` | String ID of the location reminder |
| `is_deleted` | `bool` | Whether the location reminder is deleted |
| `item_id` | `str` | String ID of the task |
| `loc_lat` | `str` | Latitude of the location |
| `loc_long` | `str` | Longitude of the location |
| `loc_trigger` | `str` | Trigger type for the location reminder |
| `name` | `str` | Name of the location |
| `notify_uid` | `str` | String ID of the user who will receive the reminder |
| `project_id` | `str` | String ID of the project containing the task |
| `radius` | `int` | Radius in meters |
| `task_id` | `str` | String ID of the task |
| `type` | `str` | The reminder type |

#### Example: Load

```python
notification_location_sync_view = client.NotificationLocationSyncView().load({"reminder_id": "reminder_id"})
```

#### Example: List

```python
notification_location_sync_views = client.NotificationLocationSyncView().list()
```

#### Example: Create

```python
notification_location_sync_view = client.NotificationLocationSyncView().create({
    "reminder_id": "example_reminder_id",  # str
    "id": "example_id",  # str
    "is_deleted": True,  # bool
    "item_id": "example_item_id",  # str
    "loc_lat": "example_loc_lat",  # str
    "loc_long": "example_loc_long",  # str
    "loc_trigger": "example_loc_trigger",  # str
    "name": "example_name",  # str
    "notify_uid": "example_notify_uid",  # str
    "project_id": "example_project_id",  # str
    "radius": 1,  # int
    "task_id": "example_task_id",  # str
})
```


### NotificationSyncView

Create an instance: `notification_sync_view = client.NotificationSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `due` | `Any` | Datetime when the reminder fires, or `null` if unset. |
| `id` | `str` | String ID of the reminder. |
| `is_deleted` | `bool` | Whether the reminder is deleted. |
| `is_urgent` | `bool` | Whether the reminder should be delivered urgently. |
| `item_id` | `str` | String ID of the task that owns the reminder. |
| `minute_offset` | `Any` | Minutes before the task due time for relative reminders. |
| `notify_uid` | `str` | String ID of the user who receives the reminder. |
| `reminder_type` | `str` | Type of the reminder: 'relative' or 'absolute' |
| `service` | `str` | Notification service type: 'email', 'push'. |
| `task_id` | `str` | String ID of the task |
| `type` | `str` | Reminder type. |

#### Example: Load

```python
notification_sync_view = client.NotificationSyncView().load({"reminder_id": "reminder_id"})
```

#### Example: List

```python
notification_sync_views = client.NotificationSyncView().list()
```

#### Example: Create

```python
notification_sync_view = client.NotificationSyncView().create({
    "reminder_id": "example_reminder_id",  # str
    "due": "example_due",  # Any
    "id": "example_id",  # str
    "is_deleted": True,  # bool
    "is_urgent": True,  # bool
    "item_id": "example_item_id",  # str
    "minute_offset": "example_minute_offset",  # Any
    "notify_uid": "example_notify_uid",  # str
    "task_id": "example_task_id",  # str
    "type": "example_type",  # str
})
```


### PaginatedListAnyProjectSyncView

Create an instance: `paginated_list_any_project_sync_view = client.PaginatedListAnyProjectSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `next_cursor` | `Any` | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `list` | Objects in the current page of results. |

#### Example: List

```python
paginated_list_any_project_sync_views = client.PaginatedListAnyProjectSyncView().list({"query": "example"})
```


### PaginatedListItemSyncView

Create an instance: `paginated_list_item_sync_view = client.PaginatedListItemSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `Any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Whether the task is completed. |
| `child_order` | `int` | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Number of times the task has been marked as completed. |
| `content` | `str` | Task content. |
| `day_order` | `int` | Task order for day-based views. |
| `deadline` | `Any` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `str` | Task description. |
| `due` | `Any` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float` | Task duration details, or `null` when the task has no duration. |
| `id` | `str` | String ID of the task. |
| `is_collapsed` | `bool` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the task is deleted. |
| `labels` | `list` | Names of labels attached to the task. |
| `note_count` | `int` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `Any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | String ID of the user who owns the task. |

#### Example: List

```python
paginated_list_item_sync_views = client.PaginatedListItemSyncView().list({"query": "example"})
```


### PaginatedListStr

Create an instance: `paginated_list_str = client.PaginatedListStr()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `next_cursor` | `Any` | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `list` | Objects in the current page of results. |

#### Example: List

```python
paginated_list_strs = client.PaginatedListStr().list()
```


### PlanDetail

Create an instance: `plan_detail = client.PlanDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_cycle` | `str` | Billing cycle for the listed prices. |
| `prices` | `list` | Prices available for the billing cycle. |

#### Example: List

```python
plan_details = client.PlanDetail().list({"workspace_id": 1})
```


### ProductivityStat

Create an instance: `productivity_stat = client.ProductivityStat()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_count` | `int` | Total number of tasks completed by the user (all time) |
| `days_items` | `list` | Daily completion statistics for the last 7 days, ordered chronologically |
| `goals` | `dict` | User goals, streaks, and productivity settings |
| `karma` | `float` | Current karma score |
| `karma_graph_data` | `list` | Historical karma data points for graphing, each containing date and karma_avg |
| `karma_last_update` | `float` | Net karma change from the most recent update (positive_karma + negative_karma) |
| `karma_trend` | `str` | Karma trend indicator ('up' or 'down') |
| `karma_update_reasons` | `list` | Recent karma update events with reasons and amounts |
| `project_colors` | `dict` | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `week_items` | `list` | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

#### Example: List

```python
productivity_stats = client.ProductivityStat().list()
```


### Project

Create an instance: `project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### ProjectImport

Create an instance: `project_import = client.ProjectImport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comments` | `list` | Task comments created by the import. |
| `discarded_fields` | `list` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `locale` | `str` | Locale to use for localized template content. |
| `project_id` | `str` | String ID of the project to import the template into. |
| `project_notes` | `list` | Project comments created by the import. |
| `project_view_options_defaults` | `list` | View options defaults applied to the imported project. |
| `projects` | `list` | Projects created or updated by the import. |
| `reminders` | `list` | Reminders created by the import. |
| `sections` | `list` | Sections created by the import. |
| `status` | `str` | Always `ok` on success. |
| `tasks` | `list` | Tasks created by the import. |
| `template_id` | `str` | ID of the saved template to import. |
| `template_type` | `str` | Type of template that was imported. |

#### Example: Create

```python
project_import = client.ProjectImport().create({
    "comments": [],  # list
    "discarded_fields": [],  # list
    "project_id": "example_project_id",  # str
    "project_notes": [],  # list
    "project_view_options_defaults": [],  # list
    "projects": [],  # list
    "reminders": [],  # list
    "sections": [],  # list
    "status": "example_status",  # str
    "tasks": [],  # list
    "template_id": "example_template_id",  # str
    "template_type": "example_template_type",  # str
})
```


### ProjectImportCreateResponseWithObject

Create an instance: `project_import_create_response_with_object = client.ProjectImportCreateResponseWithObject()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comments` | `list` | Task comments created by the import. |
| `discarded_fields` | `list` | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `project_id` | `str` | ID of the project created from the template. |
| `project_notes` | `list` | Project comments created by the import. |
| `project_view_options_defaults` | `list` | View options defaults applied to the imported project. |
| `projects` | `list` | Projects created by the import. |
| `reminders` | `list` | Reminders created by the import. |
| `sections` | `list` | Sections created by the import. |
| `status` | `str` | Always `ok` on success. |
| `tasks` | `list` | Tasks created by the import. |
| `template_type` | `str` | Type of template that was imported. |

#### Example: Create

```python
project_import_create_response_with_object = client.ProjectImportCreateResponseWithObject().create({
    "comments": [],  # list
    "discarded_fields": [],  # list
    "project_id": "example_project_id",  # str
    "project_notes": [],  # list
    "project_view_options_defaults": [],  # list
    "projects": [],  # list
    "reminders": [],  # list
    "sections": [],  # list
    "status": "example_status",  # str
    "tasks": [],  # list
    "template_type": "example_template_type",  # str
})
```


### Reminder

Create an instance: `reminder = client.Reminder()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### RemoveWorkspaceUser

Create an instance: `remove_workspace_user = client.RemoveWorkspaceUser()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### RoleToActionMappingView

Create an instance: `role_to_action_mapping_view = client.RoleToActionMappingView()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_collaborator_actions` | `list` | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | `list` | Workspace collaborator roles and their allowed actions. |

#### Example: List

```python
role_to_action_mapping_views = client.RoleToActionMappingView().list()
```


### Section

Create an instance: `section = client.Section()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `str` | Date and time when the section was created. |
| `archived_at` | `Any` | Date and time when the section was archived, or `null` if it is active. |
| `description` | `str` | Section description, or `null` if it has none. |
| `id` | `str` | String ID of the section. |
| `is_archived` | `bool` | Whether the section is archived. |
| `is_collapsed` | `bool` | Whether the section is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the section is deleted. |
| `name` | `str` | Section name. |
| `order` | `Any` | Position of the new section in the project |
| `order_key` | `Any` | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `str` | String ID of the project that contains the section. |
| `section_order` | `int` | Position of the section in the project. |
| `updated_at` | `Any` | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | `str` | String ID of the user who owns the section. |

#### Example: Load

```python
section = client.Section().load({"id": "section_id"})
```

#### Example: List

```python
sections = client.Section().list()
```

#### Example: Create

```python
section = client.Section().create({
    "id": "example_id",  # str
    "added_at": "example_added_at",  # str
    "archived_at": "example_archived_at",  # Any
    "description": "example_description",  # str
    "is_archived": True,  # bool
    "is_collapsed": True,  # bool
    "is_deleted": True,  # bool
    "name": "example_name",  # str
    "order_key": "example_order_key",  # Any
    "project_id": "example_project_id",  # str
    "section_order": 1,  # int
    "updated_at": "example_updated_at",  # Any
    "user_id": "example_user_id",  # str
})
```


### SectionSyncView

Create an instance: `section_sync_view = client.SectionSyncView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `str` | Date and time when the section was created. |
| `archived_at` | `Any` | Date and time when the section was archived, or `null` if it is active. |
| `description` | `str` | Section description, or `null` if it has none. |
| `id` | `str` | String ID of the section. |
| `is_archived` | `bool` | Whether the section is archived. |
| `is_collapsed` | `bool` | Whether the section is collapsed in the user's view. |
| `is_deleted` | `bool` | Whether the section is deleted. |
| `name` | `str` | Section name. |
| `order_key` | `Any` | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `str` | String ID of the project that contains the section. |
| `section_order` | `int` | Position of the section in the project. |
| `updated_at` | `Any` | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | `str` | String ID of the user who owns the section. |

#### Example: List

```python
section_sync_views = client.SectionSyncView().list({"query": "example"})
```


### StatusOk

Create an instance: `status_ok = client.StatusOk()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### SubscriptionInfo

Create an instance: `subscription_info = client.SubscriptionInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_method` | `str` | How the active subscription was purchased. |
| `billing_portal_switch_to_annual_url` | `Any` | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `billing_portal_url` | `Any` | One-time URL to the Stripe customer portal, if available. |
| `expiration_date` | `Any` | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `has_billing_portal` | `bool` | `true` when the user has a Stripe customer with a portal session. |
| `has_billing_portal_switch_to_annual` | `bool` | `true` when a switch-to-annual flow is available in Stripe. |
| `has_switch_legacy_to_current` | `bool` | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `invoice_credit_balance` | `Any` | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `plan` | `str` | Plan tier the user is currently on. |
| `plan_price` | `Any` | Price of the active plan, when known. |
| `status` | `str` | Current subscription status. |

#### Example: Create

```python
subscription_info = client.SubscriptionInfo().create({
    "activation_method": "example_activation_method",  # str
    "billing_portal_switch_to_annual_url": "example_billing_portal_switch_to_annual_url",  # Any
    "billing_portal_url": "example_billing_portal_url",  # Any
    "expiration_date": "example_expiration_date",  # Any
    "has_billing_portal": True,  # bool
    "has_billing_portal_switch_to_annual": True,  # bool
    "has_switch_legacy_to_current": True,  # bool
    "invoice_credit_balance": "example_invoice_credit_balance",  # Any
    "plan": "example_plan",  # str
    "plan_price": "example_plan_price",  # Any
    "status": "example_status",  # str
})
```


### Task

Create an instance: `task = client.Task()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Create

```python
task = client.Task().create({
})
```


### Template

Create an instance: `template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
template = client.Template().load({"project_id": "project_id"})
```


### TopUp

Create an instance: `top_up = client.TopUp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `int` | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | `str` | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | `str` | ISO currency code. |
| `return_url` | `str` | URL Checkout returns the user to. |
| `session_id` | `str` | The created Stripe Checkout session id. |

#### Example: Create

```python
top_up = client.TopUp().create({
    "amount": 1,  # int
    "checkout_url": "example_checkout_url",  # str
    "currency": "example_currency",  # str
    "return_url": "example_return_url",  # str
    "session_id": "example_session_id",  # str
})
```


### Upload

Create an instance: `upload = client.Upload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `str` | Name of the uploaded file. |
| `file_size` | `int` | Size of the uploaded file in bytes. |
| `file_type` | `str` | MIME type of the uploaded file. |
| `file_url` | `str` | URL of the uploaded file. |
| `image` | `Any` | Image URL for image uploads, or `null` for non-image files. |
| `image_height` | `Any` | Image height in pixels, or `null` for non-image files. |
| `image_width` | `Any` | Image width in pixels, or `null` for non-image files. |
| `resource_type` | `str` | Detected resource type of the upload. |
| `upload_state` | `str` | Upload processing state. |

#### Example: Create

```python
upload = client.Upload().create({
    "file_name": "example_file_name",  # str
    "file_size": 1,  # int
    "file_type": "example_file_type",  # str
    "file_url": "example_file_url",  # str
    "resource_type": "example_resource_type",  # str
})
```


### UsageSummary

Create an instance: `usage_summary = client.UsageSummary()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automation_id` | `str` | The automation this usage belongs to. |
| `charged_amount` | `int` | `charged_units` in money, in microdollars. |
| `charged_units` | `int` | Units the group took off the balance, as a positive number. |
| `description` | `str` | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | `int` | How many usage events settled in the group. |

#### Example: List

```python
usage_summarys = client.UsageSummary().list()
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_user` | `bool` | Whether the user is considered activated (completed key onboarding actions) |
| `auto_reminder` | `int` | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `avatar_big` | `Any` | The link to a 195x195 pixels image of the user's avatar |
| `avatar_medium` | `Any` | The link to a 60x60 pixels image of the user's avatar |
| `avatar_s640` | `Any` | The link to a 640x640 pixels image of the user's avatar |
| `avatar_small` | `Any` | The link to a 35x35 pixels image of the user's avatar |
| `business_account_id` | `str` | The ID of the user's business account |
| `completed_count` | `int` | Total number of tasks completed by user |
| `completed_today` | `int` | Number of tasks completed today by the user |
| `daily_goal` | `int` | The daily goal number of completed tasks for karma |
| `date_format` | `int` | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `days_off` | `list` | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `deleted_at` | `Any` | Date when user was deleted (ISO 8601 format) |
| `dont_notify` | `Any` | Whether notifications should be disabled for the selected type and channel. |
| `email` | `str` | User's email address |
| `feature_identifier` | `str` | Feature identifier for feature flag evaluations |
| `features` | `dict` | Feature flags and settings for the user |
| `free_trial_expires` | `Any` | Date when free trial expires (ISO 8601 format) |
| `full_name` | `str` | The user's real name formatted as Firstname Lastname |
| `getting_started_guide_projects` | `Any` | List of project IDs for getting started guide |
| `has_magic_number` | `bool` | Whether the user has reached a magic number milestone |
| `has_password` | `bool` | Whether the user has a password set on the account. |
| `has_started_a_trial` | `bool` | Whether the user has ever started a free trial |
| `id` | `str` | User ID |
| `image_id` | `str` | The ID of the user's avatar |
| `inbox_project_id` | `str` | The ID of the user's Inbox project |
| `is_celebrations_enabled` | `bool` | Whether celebration animations are enabled |
| `is_deleted` | `bool` | Whether the user is deleted |
| `is_onboarded` | `bool` | Composite flag: true once all four onboarded_* criteria above are met. |
| `is_premium` | `bool` | Whether the user has a Todoist Pro subscription (a true or false value) |
| `joinable_workspace` | `Any` | Information about workspaces the user can join |
| `joined_at` | `Any` | Date when user joined Todoist (ISO 8601 format) |
| `karma` | `float` | The user's karma score |
| `karma_trend` | `Any` | The user's karma trend. |
| `lang` | `str` | The user's language |
| `mfa_enabled` | `bool` | Whether multi-factor authentication is enabled |
| `next_week` | `int` | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `notification_type` | `str` | Notification type to update. |
| `onboarded_dated_tasks_created` | `Any` | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `onboarded_desktop_accessed` | `Any` | True once the user has synced from Web, macOS, or Windows. |
| `onboarded_mobile_accessed` | `Any` | True once the user has synced from iOS or Android. |
| `onboarded_tasks_completed` | `Any` | True once the user has completed at least 3 tasks. |
| `onboarding_completed` | `bool` | Whether the user has completed onboarding |
| `onboarding_initiated` | `bool` | Whether the user has initiated onboarding |
| `onboarding_level` | `Any` | User's self-reported skill level during onboarding |
| `onboarding_persona` | `Any` | User's onboarding persona selection |
| `onboarding_role` | `Any` | User's role selection during onboarding |
| `onboarding_started` | `bool` | Whether the user has started onboarding |
| `onboarding_team_mode` | `Any` | Whether user selected team mode during onboarding |
| `onboarding_use_cases` | `Any` | Use cases the user selected during onboarding |
| `premium_status` | `Any` | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `premium_until` | `Any` | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `service` | `str` | Notification channel to update. |
| `share_limit` | `int` | Maximum number of collaborators allowed in shared projects |
| `sort_order` | `int` | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `start_day` | `int` | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `start_page` | `str` | The user's default view on Todoist. |
| `status` | `Any` | The user's status, shared across Todoist and Comms. |
| `theme_appearance` | `str` | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `theme_id` | `str` | The currently selected Todoist theme (a number between 0 and 13) |
| `time_format` | `Any` | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `token` | `str` | The user's token that should be used to call the other API methods |
| `tz_info` | `dict` | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `urgent_reminder_device` | `Any` | The device that should ring urgent reminders. |
| `verification_status` | `str` | User's email verification status. |
| `websocket_url` | `str` | WebSocket URL for real-time updates |
| `weekend_start_day` | `int` | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `weekly_goal` | `int` | The target number of tasks to complete per week |

#### Example: List

```python
users = client.User().list()
```


### Workspace

Create an instance: `workspace = client.Workspace()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Updated workspace description. |
| `domain_discovery` | `Any` | Updated domain discovery setting. |
| `domain_name` | `Any` | Updated workspace email domain. |
| `id` | `str` |  |
| `invite_code` | `Any` | Regenerate workspace invite code when set. |
| `is_collapsed` | `bool` | Updated collapse state for current user. |
| `is_guest_allowed` | `bool` | Updated guest access status. |
| `is_link_sharing_enabled` | `bool` | Updated link sharing status. |
| `is_trial_pending` | `bool` | Updated trial pending state. |
| `name` | `str` | Updated workspace name. |
| `properties` | `Any` | Updated workspace properties. |
| `restrict_email_domains` | `Any` | Updated email domain restriction setting. |

#### Example: Load

```python
workspace = client.Workspace().load({"id": 1})
```

#### Example: List

```python
workspaces = client.Workspace().list()
```

#### Example: Create

```python
workspace = client.Workspace().create({
    "id": 1,  # int
})
```


### WorkspaceInvitationView

Create an instance: `workspace_invitation_view = client.WorkspaceInvitationView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `str` | Product the invitation was sent from. |
| `id` | `str` | The ID of the invitation |
| `inviter_id` | `str` | ID of the user user who sent the invitation |
| `role` | `str` | Workspace role granted by the invitation. |
| `user_email` | `str` | The invited person's email. |
| `workspace_id` | `str` | ID of the workspace |

#### Example: List

```python
workspace_invitation_views = client.WorkspaceInvitationView().list({"workspace_id": 1})
```

#### Example: Create

```python
workspace_invitation_view = client.WorkspaceInvitationView().create({
    "inviter_id": "example_inviter_id",  # str
    "role": "example_role",  # str
    "user_email": "example_user_email",  # str
    "workspace_id": "example_workspace_id",  # str
})
```


### WorkspaceUserView

Create an instance: `workspace_user_view = client.WorkspaceUserView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `custom_sorting_applied` | `bool` | Whether the user has custom project sorting enabled. |
| `invite_code` | `Any` | Workspace invite code to join with. |
| `project_sort_preference` | `str` | Project sorting preference for the user. |
| `role` | `str` | Workspace role assigned to the user. |
| `user_id` | `str` | String ID of the workspace user. |
| `workspace_id` | `str` | String ID of the workspace. |

#### Example: Create

```python
workspace_user_view = client.WorkspaceUserView().create({
    "user_id": 1,  # int
    "workspace_id": 1,  # int
})
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

11 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `note_sync_view` | `file_attachment` | 4 | 3 levels |
| `project_import` | `comments` | 4 | 6 levels |
| `project_import` | `project_notes` | 4 | 6 levels |
| `project_import_create_response_with_object` | `comments` | 4 | 6 levels |
| `project_import_create_response_with_object` | `project_notes` | 4 | 6 levels |
| `active` | `access` | 3 | 4 levels |
| `any_project_sync_view` | `results` | 3 | 9 levels |
| `archived` | `access` | 3 | 4 levels |
| `paginated_list_any_project_sync_view` | `results` | 3 | 9 levels |
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── todoist_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`todoist_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
creditstate = client.CreditState()
creditstate.load()

# creditstate.data_get() now returns the creditstate data from the last load
# creditstate.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
