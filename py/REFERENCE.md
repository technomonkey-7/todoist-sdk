# Todoist Python SDK Reference

Complete API reference for the Todoist Python SDK.


## TodoistSDK

### Constructor

```python
from todoist_sdk import TodoistSDK

client = TodoistSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TodoistSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = TodoistSDK.test()
```


### Instance Methods

#### `Active(data=None)`

Create a new `ActiveEntity` instance. Pass `None` for no initial data.

#### `Activity(data=None)`

Create a new `ActivityEntity` instance. Pass `None` for no initial data.

#### `AnyProjectSyncView(data=None)`

Create a new `AnyProjectSyncViewEntity` instance. Pass `None` for no initial data.

#### `Archived(data=None)`

Create a new `ArchivedEntity` instance. Pass `None` for no initial data.

#### `Authorization(data=None)`

Create a new `AuthorizationEntity` instance. Pass `None` for no initial data.

#### `Backup(data=None)`

Create a new `BackupEntity` instance. Pass `None` for no initial data.

#### `BillingPortalUrl(data=None)`

Create a new `BillingPortalUrlEntity` instance. Pass `None` for no initial data.

#### `ByCompletionDate(data=None)`

Create a new `ByCompletionDateEntity` instance. Pass `None` for no initial data.

#### `ByDueDate(data=None)`

Create a new `ByDueDateEntity` instance. Pass `None` for no initial data.

#### `Collaborator(data=None)`

Create a new `CollaboratorEntity` instance. Pass `None` for no initial data.

#### `Comment(data=None)`

Create a new `CommentEntity` instance. Pass `None` for no initial data.

#### `CreditState(data=None)`

Create a new `CreditStateEntity` instance. Pass `None` for no initial data.

#### `Email(data=None)`

Create a new `EmailEntity` instance. Pass `None` for no initial data.

#### `FileUrl(data=None)`

Create a new `FileUrlEntity` instance. Pass `None` for no initial data.

#### `Folder(data=None)`

Create a new `FolderEntity` instance. Pass `None` for no initial data.

#### `History(data=None)`

Create a new `HistoryEntity` instance. Pass `None` for no initial data.

#### `IdMapping(data=None)`

Create a new `IdMappingEntity` instance. Pass `None` for no initial data.

#### `Invite(data=None)`

Create a new `InviteEntity` instance. Pass `None` for no initial data.

#### `ItemSyncView(data=None)`

Create a new `ItemSyncViewEntity` instance. Pass `None` for no initial data.

#### `Label(data=None)`

Create a new `LabelEntity` instance. Pass `None` for no initial data.

#### `LabelRestView(data=None)`

Create a new `LabelRestViewEntity` instance. Pass `None` for no initial data.

#### `LocationReminder(data=None)`

Create a new `LocationReminderEntity` instance. Pass `None` for no initial data.

#### `MemberView(data=None)`

Create a new `MemberViewEntity` instance. Pass `None` for no initial data.

#### `MigratePersonalToken(data=None)`

Create a new `MigratePersonalTokenEntity` instance. Pass `None` for no initial data.

#### `NoteSyncView(data=None)`

Create a new `NoteSyncViewEntity` instance. Pass `None` for no initial data.

#### `NotificationLocationSyncView(data=None)`

Create a new `NotificationLocationSyncViewEntity` instance. Pass `None` for no initial data.

#### `NotificationSyncView(data=None)`

Create a new `NotificationSyncViewEntity` instance. Pass `None` for no initial data.

#### `PaginatedListAnyProjectSyncView(data=None)`

Create a new `PaginatedListAnyProjectSyncViewEntity` instance. Pass `None` for no initial data.

#### `PaginatedListItemSyncView(data=None)`

Create a new `PaginatedListItemSyncViewEntity` instance. Pass `None` for no initial data.

#### `PaginatedListStr(data=None)`

Create a new `PaginatedListStrEntity` instance. Pass `None` for no initial data.

#### `PlanDetail(data=None)`

Create a new `PlanDetailEntity` instance. Pass `None` for no initial data.

#### `ProductivityStat(data=None)`

Create a new `ProductivityStatEntity` instance. Pass `None` for no initial data.

#### `Project(data=None)`

Create a new `ProjectEntity` instance. Pass `None` for no initial data.

#### `ProjectImport(data=None)`

Create a new `ProjectImportEntity` instance. Pass `None` for no initial data.

#### `ProjectImportCreateResponseWithObject(data=None)`

Create a new `ProjectImportCreateResponseWithObjectEntity` instance. Pass `None` for no initial data.

#### `Reminder(data=None)`

Create a new `ReminderEntity` instance. Pass `None` for no initial data.

#### `RemoveWorkspaceUser(data=None)`

Create a new `RemoveWorkspaceUserEntity` instance. Pass `None` for no initial data.

#### `RoleToActionMappingView(data=None)`

Create a new `RoleToActionMappingViewEntity` instance. Pass `None` for no initial data.

#### `Section(data=None)`

Create a new `SectionEntity` instance. Pass `None` for no initial data.

#### `SectionSyncView(data=None)`

Create a new `SectionSyncViewEntity` instance. Pass `None` for no initial data.

#### `StatusOk(data=None)`

Create a new `StatusOkEntity` instance. Pass `None` for no initial data.

#### `SubscriptionInfo(data=None)`

Create a new `SubscriptionInfoEntity` instance. Pass `None` for no initial data.

#### `Task(data=None)`

Create a new `TaskEntity` instance. Pass `None` for no initial data.

#### `Template(data=None)`

Create a new `TemplateEntity` instance. Pass `None` for no initial data.

#### `TopUp(data=None)`

Create a new `TopUpEntity` instance. Pass `None` for no initial data.

#### `Upload(data=None)`

Create a new `UploadEntity` instance. Pass `None` for no initial data.

#### `UsageSummary(data=None)`

Create a new `UsageSummaryEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `Workspace(data=None)`

Create a new `WorkspaceEntity` instance. Pass `None` for no initial data.

#### `WorkspaceInvitationView(data=None)`

Create a new `WorkspaceInvitationViewEntity` instance. Pass `None` for no initial data.

#### `WorkspaceUserView(data=None)`

Create a new `WorkspaceUserViewEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ActiveEntity

```python
active = client.Active()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `Any` | Yes | Project access configuration. |
| `archived_date` | `Any` | No | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `int` | No | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `Any` | No | Numeric project color code. |
| `default_order` | `int` | No | Default order of the project in workspace views. |
| `default_order_key` | `Any` | No | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `str` | No | Project description. |
| `folder_id` | `str` | No | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `Any` | No | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `int` | Yes | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `bool` | No | Whether the workspace project is archived. |
| `is_frozen` | `bool` | No | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `bool` | No | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `bool` | No | Whether project insights are enabled for the project. |
| `name` | `str` | No | Project name. |
| `project_id` | `str` | Yes | String ID of the project. |
| `public_access` | `bool` | Yes | Whether the project is publicly accessible. |
| `role` | `Any` | No |  |
| `status` | `str` | No | Project status. |
| `view_style` | `str` | No | Project view style. |
| `workspace_id` | `int` | Yes | Numeric ID of the workspace that contains the project. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ActiveEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Active().list({"workspace_id": 1})
for active in results:
    print(active.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActiveEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ActivityEntity

```python
activity = client.Activity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_date` | `str` | Yes | The timestamp when this activity occurred. |
| `event_type` | `str` | Yes | The type of event that occurred. |
| `extra_data` | `Any` | No | This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`… |
| `extra_data_id` | `str` | No | Internal ID for the extra activity data row. |
| `id` | `str` | No | The internal unique identifier for this activity log entry. |
| `initiator_id` | `str` | No |  |
| `object_id` | `str` | Yes | The unique identifier of the object this activity relates to (project, item, note, or section ID). |
| `object_type` | `str` | Yes | The type of object this activity relates to. |
| `parent_item_id` | `str` | No | For note (comment) activities, the ID of the item (task) that the note is attached to. |
| `parent_project_id` | `str` | No | The ID of the project that contains the object this activity relates to. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ActivityEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Activity().list()
for activity in results:
    print(activity.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActivityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AnyProjectSyncViewEntity

```python
any_project_sync_view = client.AnyProjectSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_order` | `Any` | No | Updated position of the project in the hierarchy. |
| `color` | `Any` | No | Updated project color. |
| `description` | `str` | No | Updated project description. |
| `folder_id` | `str` | No | Folder to move the project into. |
| `icon` | `Any` | No | Updated project icon name. |
| `is_collapsed` | `bool` | No | Whether the project is collapsed. |
| `is_favorite` | `bool` | No | Whether the project is marked as a favorite. |
| `name` | `str` | No | Updated project name. |
| `next_cursor` | `Any` | Yes | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | `str` | No | Parent project ID. |
| `results` | `list` | Yes | Objects in the current page of results. |
| `view_style` | `Any` | No | Updated project view style. |
| `workspace_id` | `str` | No | Workspace ID. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `child_order` | - | - | - |
| `color` | - | - | - |
| `description` | - | - | - |
| `folder_id` | - | - | - |
| `icon` | - | - | - |
| `is_collapsed` | - | - | - |
| `is_favorite` | - | - | - |
| `name` | - | - | Yes |
| `next_cursor` | - | - | - |
| `parent_id` | - | - | - |
| `results` | - | - | - |
| `view_style` | - | - | - |
| `workspace_id` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AnyProjectSyncViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AnyProjectSyncView().create({
    "project_id": "example_project_id",  # str
    "next_cursor": "example_next_cursor",  # Any
    "results": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AnyProjectSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AnyProjectSyncView().list()
for any_project_sync_view in results:
    print(any_project_sync_view.data_get())
```

#### `load(reqmatch, ctrl=None) -> AnyProjectSyncViewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AnyProjectSyncView().load({"project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AnyProjectSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArchivedEntity

```python
archived = client.Archived()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `Any` | Yes | Project access configuration. |
| `archived_date` | `Any` | No | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `int` | No | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `Any` | No | Numeric project color code. |
| `default_order` | `int` | No | Default order of the project in workspace views. |
| `default_order_key` | `Any` | No | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `str` | No | Project description. |
| `folder_id` | `str` | No | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `Any` | No | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `int` | Yes | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `bool` | No | Whether the workspace project is archived. |
| `is_frozen` | `bool` | No | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `bool` | No | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `bool` | No | Whether project insights are enabled for the project. |
| `name` | `str` | No | Project name. |
| `project_id` | `str` | Yes | String ID of the project. |
| `public_access` | `bool` | Yes | Whether the project is publicly accessible. |
| `role` | `Any` | No |  |
| `status` | `str` | No | Project status. |
| `view_style` | `str` | No | Project view style. |
| `workspace_id` | `int` | Yes | Numeric ID of the workspace that contains the project. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ArchivedEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Archived().list({"workspace_id": 1})
for archived in results:
    print(archived.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArchivedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AuthorizationEntity

```python
authorization = client.Authorization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `str` | Yes | The token to be revoked (access token). |
| `token_type_hint` | `Any` | No | A hint about the type of the token being revoked (optional). |

### Operations

#### `create(reqdata, ctrl=None) -> AuthorizationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Authorization().create({
    "token": "example_token",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> AuthorizationEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Authorization().remove({"access_token": "access_token", "client_id": "client_id", "client_secret": "client_secret"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthorizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BackupEntity

```python
backup = client.Backup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `str` | Yes | Backup URL |
| `version` | `str` | Yes | Date and time of the backup version |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BackupEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Backup().list()
for backup in results:
    print(backup.data_get())
```

#### `load(reqmatch, ctrl=None) -> BackupEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Backup().load({"file": "file"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BackupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingPortalUrlEntity

```python
billing_portal_url = client.BillingPortalUrl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `billing_portal_url` | `str` | Yes |  |
| `reason_description` | `str` | No | Human-readable label of the cancellation reason. |
| `reason_flag` | `str` | No | Short identifier of the cancellation reason category. |
| `reason_text` | `str` | No | Free-form feedback from the user about the cancellation. |
| `return_url` | `str` | No | URL the user is redirected to after completing the flow. |

### Operations

#### `create(reqdata, ctrl=None) -> BillingPortalUrlEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BillingPortalUrl().create({
    "billing_portal_url": "example_billing_portal_url",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingPortalUrlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ByCompletionDateEntity

```python
by_completion_date = client.ByCompletionDate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `Any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Yes | Whether the task is completed. |
| `child_order` | `int` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Yes | Number of times the task has been marked as completed. |
| `content` | `str` | Yes | Task content. |
| `day_order` | `int` | Yes | Task order for day-based views. |
| `deadline` | `Any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `str` | Yes | Task description. |
| `due` | `Any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float` | Yes | Task duration details, or `null` when the task has no duration. |
| `id` | `str` | Yes | String ID of the task. |
| `is_collapsed` | `bool` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the task is deleted. |
| `labels` | `list` | Yes | Names of labels attached to the task. |
| `note_count` | `int` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `Any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | Yes | String ID of the user who owns the task. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ByCompletionDateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ByCompletionDate().list({"since": "example", "until": "example"})
for by_completion_date in results:
    print(by_completion_date.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ByCompletionDateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ByDueDateEntity

```python
by_due_date = client.ByDueDate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `Any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Yes | Whether the task is completed. |
| `child_order` | `int` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Yes | Number of times the task has been marked as completed. |
| `content` | `str` | Yes | Task content. |
| `day_order` | `int` | Yes | Task order for day-based views. |
| `deadline` | `Any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `str` | Yes | Task description. |
| `due` | `Any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float` | Yes | Task duration details, or `null` when the task has no duration. |
| `id` | `str` | Yes | String ID of the task. |
| `is_collapsed` | `bool` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the task is deleted. |
| `labels` | `list` | Yes | Names of labels attached to the task. |
| `note_count` | `int` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `Any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | Yes | String ID of the user who owns the task. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ByDueDateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ByDueDate().list({"since": "example", "until": "example"})
for by_due_date in results:
    print(by_due_date.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ByDueDateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollaboratorEntity

```python
collaborator = client.Collaborator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes | The user's email address |
| `id` | `str` | Yes | The user's ID |
| `name` | `str` | Yes | The user's full name |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CollaboratorEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Collaborator().list({"project_id": "example"})
for collaborator in results:
    print(collaborator.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollaboratorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CommentEntity

```python
comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `Any` | Yes | New content for the comment. |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> CommentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Comment().create({
    "id": "example_id",  # str
    "content": "example_content",  # Any
})
```

#### `remove(reqmatch, ctrl=None) -> CommentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Comment().remove({"id": "comment_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreditStateEntity

```python
credit_state = client.CreditState()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_amount` | `int` | Yes | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `available_units` | `int` | Yes | Balance net of in-flight holds (`available_cached - held`). |
| `currency` | `str` | Yes | ISO currency code every amount in this response is in. |
| `depleted` | `bool` | Yes | No further runs may start. |
| `is_settled_low_balance` | `bool` | Yes | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `low_balance` | `bool` | Yes | Balance is at or below the low-balance threshold. |
| `settled_amount` | `int` | Yes | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `settled_units` | `int` | Yes | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `usage_allowed` | `bool` | Yes | Whether a new run may start right now. |
| `usage_block_reason` | `Any` | Yes | Why a new run cannot start, or `null` when it can. |

### Operations

#### `load(reqmatch, ctrl=None) -> CreditStateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CreditState().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreditStateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailEntity

```python
email = client.Email()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes | Email address for the Todoist object. |
| `obj_id` | `str` | Yes | String ID of the Todoist object. |
| `obj_type` | `str` | Yes | Type of Todoist object to create an email for. |

### Operations

#### `update(reqdata, ctrl=None) -> EmailEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Email().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FileUrlEntity

```python
file_url = client.FileUrl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `str` | Yes | Name of the exported template file. |
| `file_url` | `str` | Yes | Temporary URL for downloading the exported template. |

### Operations

#### `load(reqmatch, ctrl=None) -> FileUrlEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.FileUrl().load({"project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FileUrlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FolderEntity

```python
folder = client.Folder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_order` | `int` | Yes | User-specific position of the folder. |
| `default_order` | `int` | Yes | Default position of the folder in the workspace. |
| `default_order_key` | `Any` | Yes | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `id` | `str` | Yes | String ID of the folder. |
| `is_deleted` | `bool` | Yes | Whether the folder is deleted. |
| `name` | `str` | Yes | Folder name. |
| `workspace_id` | `str` | Yes | String ID of the workspace that contains the folder. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `child_order` | - | - | Yes | - |
| `default_order` | - | - | Yes | - |
| `default_order_key` | - | - | - | - |
| `id` | - | - | - | - |
| `is_deleted` | - | - | - | - |
| `name` | - | - | Yes | - |
| `workspace_id` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> FolderEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Folder().create({
    "id": 1,  # int
    "child_order": 1,  # int
    "default_order": 1,  # int
    "default_order_key": "example_default_order_key",  # Any
    "is_deleted": True,  # bool
    "name": "example_name",  # str
    "workspace_id": "example_workspace_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[FolderEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Folder().list({"workspace_id": 1})
for folder in results:
    print(folder.data_get())
```

#### `load(reqmatch, ctrl=None) -> FolderEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Folder().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> FolderEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Folder().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FolderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HistoryEntity

```python
history = client.History()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | No | What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`. |
| `charged_amount` | `Any` | Yes | `charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274. |
| `charged_units` | `Any` | Yes | Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side. |
| `created_at` | `str` | Yes | When the entry was written, UTC. |
| `credited_amount` | `Any` | Yes | `credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00. |
| `credited_units` | `Any` | Yes | Units added to the balance, as a positive number, or `null` on a debit. |
| `description` | `str` | No | Human-readable summary of the entry. |
| `id` | `int` | Yes | Ledger entry id. |
| `refs` | `dict` | No | Free-form attribution for the entry. |
| `status` | `str` | No | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `type` | `str` | Yes | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[HistoryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.History().list()
for history in results:
    print(history.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IdMappingEntity

```python
id_mapping = client.IdMapping()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `new_id` | `str` | Yes | Curent ID for the object. |
| `old_id` | `str` | Yes | Legacy ID for the object. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[IdMappingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.IdMapping().list({"obj_id": "example", "obj_name": "example"})
for id_mapping in results:
    print(id_mapping.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IdMappingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InviteEntity

```python
invite = client.Invite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `str` | No | For first-party clients usage only. |
| `email_list` | `Any` | No | List of user emails to invite to the workspace. |
| `invited_emails` | `list` | Yes | Emails successfully invited to the workspace. |
| `role` | `Any` | No | Role assigned to invited users. |

### Operations

#### `create(reqdata, ctrl=None) -> InviteEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Invite().create({
    "workspace_id": 1,  # int
    "invited_emails": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InviteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ItemSyncViewEntity

```python
item_sync_view = client.ItemSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `Any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `str` | No | ID of the user to assign the task to. |
| `checked` | `bool` | Yes | Whether the task is completed. |
| `child_order` | `int` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Yes | Number of times the task has been marked as completed. |
| `content` | `str` | Yes | Task content. |
| `day_order` | `int` | Yes | Task order for day-based views. |
| `deadline` | `Any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `Any` | No | Updated deadline date in YYYY-MM-DD format. |
| `description` | `str` | Yes | Task description. |
| `due` | `Any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `str` | No | Updated due date in RFC 3339 format or similar. |
| `due_datetime` | `str` | No | Updated due date and time. |
| `due_lang` | `str` | No | Updated due date language code. |
| `due_string` | `str` | No | Updated human-readable representation of the due date. |
| `duration` | `float` | Yes | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `Any` | No | Unit of time for duration. |
| `id` | `str` | Yes | String ID of the task. |
| `is_collapsed` | `bool` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the task is deleted. |
| `labels` | `list` | Yes | Names of labels attached to the task. |
| `note_count` | `int` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `Any` | No | Position of the task in the project or section |
| `order_key` | `Any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | Yes | String ID of the user who owns the task. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `added_at` | - | - | - |
| `added_by_uid` | - | - | - |
| `assigned_by_uid` | - | - | - |
| `assignee_id` | - | - | - |
| `checked` | - | - | - |
| `child_order` | - | - | Yes |
| `completed_at` | - | - | - |
| `completed_by_uid` | - | - | - |
| `completed_count` | - | - | - |
| `content` | - | - | Yes |
| `day_order` | - | - | Yes |
| `deadline` | - | - | - |
| `deadline_date` | - | - | - |
| `description` | - | - | Yes |
| `due` | - | - | - |
| `due_date` | - | - | - |
| `due_datetime` | - | - | - |
| `due_lang` | - | - | - |
| `due_string` | - | - | - |
| `duration` | - | - | Yes |
| `duration_unit` | - | - | - |
| `id` | - | - | - |
| `is_collapsed` | - | - | Yes |
| `is_deleted` | - | - | - |
| `labels` | - | - | Yes |
| `note_count` | - | - | - |
| `order` | - | - | - |
| `order_key` | - | - | - |
| `parent_id` | - | - | Yes |
| `postponed_count` | - | - | - |
| `priority` | - | - | Yes |
| `project_id` | - | - | Yes |
| `responsible_uid` | - | - | - |
| `section_id` | - | - | Yes |
| `updated_at` | - | - | - |
| `user_id` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> ItemSyncViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ItemSyncView().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[ItemSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ItemSyncView().list()
for item_sync_view in results:
    print(item_sync_view.data_get())
```

#### `load(reqmatch, ctrl=None) -> ItemSyncViewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ItemSyncView().load({"task_id": "task_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ItemSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LabelEntity

```python
label = client.Label()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `str` | Yes | Label color name. |
| `id` | `str` | Yes | String ID of the label. |
| `is_favorite` | `bool` | Yes | Whether the label is marked as a favorite. |
| `name` | `str` | Yes | Label name. |
| `new_name` | `str` | Yes | New shared label name to apply to matching tasks. |
| `order` | `Any` | Yes | Position of the label in the label list, or `null` when no explicit order is set. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `color` | - | - | Yes | - |
| `id` | - | - | - | - |
| `is_favorite` | - | - | Yes | - |
| `name` | - | - | Yes | - |
| `new_name` | - | - | - | - |
| `order` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> LabelEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Label().create({
    "id": 1,  # int
    "color": "example_color",  # str
    "is_favorite": True,  # bool
    "name": "example_name",  # str
    "new_name": "example_new_name",  # str
    "order": "example_order",  # Any
})
```

#### `list(reqmatch=None, ctrl=None) -> list[LabelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Label().list()
for label in results:
    print(label.data_get())
```

#### `load(reqmatch, ctrl=None) -> LabelEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Label().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> LabelEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Label().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LabelRestViewEntity

```python
label_rest_view = client.LabelRestView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `str` | Yes | Label color name. |
| `id` | `str` | Yes | String ID of the label. |
| `is_favorite` | `bool` | Yes | Whether the label is marked as a favorite. |
| `name` | `str` | Yes | Label name. |
| `order` | `Any` | Yes | Position of the label in the label list, or `null` when no explicit order is set. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LabelRestViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LabelRestView().list({"query": "example"})
for label_rest_view in results:
    print(label_rest_view.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabelRestViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocationReminderEntity

```python
location_reminder = client.LocationReminder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> LocationReminderEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LocationReminder().remove({"id": "location_reminder_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationReminderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MemberViewEntity

```python
member_view = client.MemberView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `full_name` | `str` | Yes | Full name of the workspace member. |
| `image_id` | `str` | No | Avatar image ID of the workspace member, or `null`. |
| `is_deleted` | `bool` | No | Whether the workspace member is deleted. |
| `role` | `str` | Yes | Workspace role assigned to the member. |
| `timezone` | `str` | Yes | Timezone of the workspace member. |
| `user_email` | `str` | Yes | Email address of the workspace member. |
| `user_id` | `str` | Yes | String ID of the workspace member. |
| `workspace_id` | `str` | Yes | String ID of the workspace. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MemberViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MemberView().list()
for member_view in results:
    print(member_view.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MemberViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MigratePersonalTokenEntity

```python
migrate_personal_token = client.MigratePersonalToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `Any` | Yes | OAuth access token created from the personal token. |
| `client_id` | `str` | Yes | The unique Client ID of the Todoist application that you registered. |
| `client_secret` | `str` | Yes | The unique Client Secret of the Todoist application that you registered. |
| `expires_in` | `int` | Yes | Access token lifetime in seconds. |
| `personal_token` | `str` | Yes | Token obtained from the email/password authentication. |
| `scope` | `str` | Yes | Scopes of the OAuth token. |
| `token_type` | `str` | Yes | OAuth token type. |

### Operations

#### `create(reqdata, ctrl=None) -> MigratePersonalTokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MigratePersonalToken().create({
    "access_token": "example_access_token",  # Any
    "client_id": "example_client_id",  # str
    "client_secret": "example_client_secret",  # str
    "expires_in": 1,  # int
    "personal_token": "example_personal_token",  # str
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MigratePersonalTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NoteSyncViewEntity

```python
note_sync_view = client.NoteSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `Any` | No | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `content` | `str` | No | Comment content. |
| `file_attachment` | `Any` | Yes | File attachment metadata, or `null` when the comment has no attachment. |
| `id` | `str` | Yes | String ID of the comment. |
| `is_deleted` | `bool` | Yes | Whether the comment is deleted. |
| `posted_at` | `Any` | Yes | Date and time when the comment was posted, or `null` if unknown. |
| `posted_uid` | `Any` | Yes | String ID of the user who posted the comment. |
| `project_id` | `str` | No | String ID of the project |
| `reaction` | `str` | Yes | Reaction emoji. |
| `reactions` | `Any` | Yes | Reaction emoji mapped to user IDs that reacted. |
| `task_id` | `str` | No | String ID of the task |
| `uids_to_notify` | `Any` | Yes | String IDs of users notified by the comment. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `attachment` | - | - | - |
| `content` | - | - | Yes |
| `file_attachment` | - | - | - |
| `id` | - | - | - |
| `is_deleted` | - | - | - |
| `posted_at` | - | - | - |
| `posted_uid` | - | - | - |
| `project_id` | - | - | - |
| `reaction` | - | - | - |
| `reactions` | - | - | - |
| `task_id` | - | - | - |
| `uids_to_notify` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> NoteSyncViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.NoteSyncView().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[NoteSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.NoteSyncView().list()
for note_sync_view in results:
    print(note_sync_view.data_get())
```

#### `load(reqmatch, ctrl=None) -> NoteSyncViewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.NoteSyncView().load({"comment_id": "comment_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NoteSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NotificationLocationSyncViewEntity

```python
notification_location_sync_view = client.NotificationLocationSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes | String ID of the location reminder |
| `is_deleted` | `bool` | Yes | Whether the location reminder is deleted |
| `item_id` | `str` | Yes | String ID of the task |
| `loc_lat` | `str` | Yes | Latitude of the location |
| `loc_long` | `str` | Yes | Longitude of the location |
| `loc_trigger` | `str` | Yes | Trigger type for the location reminder |
| `name` | `str` | Yes | Name of the location |
| `notify_uid` | `str` | Yes | String ID of the user who will receive the reminder |
| `project_id` | `str` | Yes | String ID of the project containing the task |
| `radius` | `int` | Yes | Radius in meters |
| `task_id` | `str` | Yes | String ID of the task |
| `type` | `str` | No | The reminder type |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `id` | - | - | - |
| `is_deleted` | - | - | - |
| `item_id` | - | - | - |
| `loc_lat` | - | - | Yes |
| `loc_long` | - | - | Yes |
| `loc_trigger` | - | - | Yes |
| `name` | - | - | Yes |
| `notify_uid` | - | - | - |
| `project_id` | - | - | - |
| `radius` | - | - | Yes |
| `task_id` | - | - | - |
| `type` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> NotificationLocationSyncViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.NotificationLocationSyncView().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[NotificationLocationSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.NotificationLocationSyncView().list()
for notification_location_sync_view in results:
    print(notification_location_sync_view.data_get())
```

#### `load(reqmatch, ctrl=None) -> NotificationLocationSyncViewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.NotificationLocationSyncView().load({"reminder_id": "reminder_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NotificationLocationSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NotificationSyncViewEntity

```python
notification_sync_view = client.NotificationSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `due` | `Any` | Yes | Datetime when the reminder fires, or `null` if unset. |
| `id` | `str` | Yes | String ID of the reminder. |
| `is_deleted` | `bool` | Yes | Whether the reminder is deleted. |
| `is_urgent` | `bool` | Yes | Whether the reminder should be delivered urgently. |
| `item_id` | `str` | Yes | String ID of the task that owns the reminder. |
| `minute_offset` | `Any` | Yes | Minutes before the task due time for relative reminders. |
| `notify_uid` | `str` | Yes | String ID of the user who receives the reminder. |
| `reminder_type` | `str` | No | Type of the reminder: 'relative' or 'absolute' |
| `service` | `str` | No | Notification service type: 'email', 'push'. |
| `task_id` | `str` | Yes | String ID of the task |
| `type` | `str` | Yes | Reminder type. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `due` | - | - | Yes |
| `id` | - | - | - |
| `is_deleted` | - | - | - |
| `is_urgent` | - | - | Yes |
| `item_id` | - | - | - |
| `minute_offset` | - | - | Yes |
| `notify_uid` | - | - | - |
| `reminder_type` | - | - | - |
| `service` | - | - | - |
| `task_id` | - | - | - |
| `type` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> NotificationSyncViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.NotificationSyncView().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[NotificationSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.NotificationSyncView().list()
for notification_sync_view in results:
    print(notification_sync_view.data_get())
```

#### `load(reqmatch, ctrl=None) -> NotificationSyncViewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.NotificationSyncView().load({"reminder_id": "reminder_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NotificationSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaginatedListAnyProjectSyncViewEntity

```python
paginated_list_any_project_sync_view = client.PaginatedListAnyProjectSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `next_cursor` | `Any` | Yes | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `list` | Yes | Objects in the current page of results. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PaginatedListAnyProjectSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PaginatedListAnyProjectSyncView().list({"query": "example"})
for paginated_list_any_project_sync_view in results:
    print(paginated_list_any_project_sync_view.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaginatedListAnyProjectSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaginatedListItemSyncViewEntity

```python
paginated_list_item_sync_view = client.PaginatedListItemSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `Any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `Any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `Any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Yes | Whether the task is completed. |
| `child_order` | `int` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `Any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `Any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Yes | Number of times the task has been marked as completed. |
| `content` | `str` | Yes | Task content. |
| `day_order` | `int` | Yes | Task order for day-based views. |
| `deadline` | `Any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `str` | Yes | Task description. |
| `due` | `Any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float` | Yes | Task duration details, or `null` when the task has no duration. |
| `id` | `str` | Yes | String ID of the task. |
| `is_collapsed` | `bool` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the task is deleted. |
| `labels` | `list` | Yes | Names of labels attached to the task. |
| `note_count` | `int` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `Any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `str` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `str` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `Any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `str` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `Any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `str` | Yes | String ID of the user who owns the task. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PaginatedListItemSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PaginatedListItemSyncView().list({"query": "example"})
for paginated_list_item_sync_view in results:
    print(paginated_list_item_sync_view.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaginatedListItemSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaginatedListStrEntity

```python
paginated_list_str = client.PaginatedListStr()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `next_cursor` | `Any` | Yes | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `list` | Yes | Objects in the current page of results. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PaginatedListStrEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PaginatedListStr().list()
for paginated_list_str in results:
    print(paginated_list_str.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaginatedListStrEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlanDetailEntity

```python
plan_detail = client.PlanDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `billing_cycle` | `str` | Yes | Billing cycle for the listed prices. |
| `prices` | `list` | Yes | Prices available for the billing cycle. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PlanDetailEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PlanDetail().list({"workspace_id": 1})
for plan_detail in results:
    print(plan_detail.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlanDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductivityStatEntity

```python
productivity_stat = client.ProductivityStat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_count` | `int` | Yes | Total number of tasks completed by the user (all time) |
| `days_items` | `list` | Yes | Daily completion statistics for the last 7 days, ordered chronologically |
| `goals` | `dict` | Yes | User goals, streaks, and productivity settings |
| `karma` | `float` | Yes | Current karma score |
| `karma_graph_data` | `list` | Yes | Historical karma data points for graphing, each containing date and karma_avg |
| `karma_last_update` | `float` | Yes | Net karma change from the most recent update (positive_karma + negative_karma) |
| `karma_trend` | `str` | Yes | Karma trend indicator ('up' or 'down') |
| `karma_update_reasons` | `list` | Yes | Recent karma update events with reasons and amounts |
| `project_colors` | `dict` | Yes | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `week_items` | `list` | Yes | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProductivityStatEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProductivityStat().list()
for productivity_stat in results:
    print(productivity_stat.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductivityStatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectEntity

```python
project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> ProjectEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Project().remove({"id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectImportEntity

```python
project_import = client.ProjectImport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comments` | `list` | Yes | Task comments created by the import. |
| `discarded_fields` | `list` | Yes | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `locale` | `str` | No | Locale to use for localized template content. |
| `project_id` | `str` | Yes | String ID of the project to import the template into. |
| `project_notes` | `list` | Yes | Project comments created by the import. |
| `project_view_options_defaults` | `list` | Yes | View options defaults applied to the imported project. |
| `projects` | `list` | Yes | Projects created or updated by the import. |
| `reminders` | `list` | Yes | Reminders created by the import. |
| `sections` | `list` | Yes | Sections created by the import. |
| `status` | `str` | Yes | Always `ok` on success. |
| `tasks` | `list` | Yes | Tasks created by the import. |
| `template_id` | `str` | Yes | ID of the saved template to import. |
| `template_type` | `str` | Yes | Type of template that was imported. |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectImportEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectImport().create({
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

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectImportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectImportCreateResponseWithObjectEntity

```python
project_import_create_response_with_object = client.ProjectImportCreateResponseWithObject()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comments` | `list` | Yes | Task comments created by the import. |
| `discarded_fields` | `list` | Yes | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `project_id` | `str` | Yes | ID of the project created from the template. |
| `project_notes` | `list` | Yes | Project comments created by the import. |
| `project_view_options_defaults` | `list` | Yes | View options defaults applied to the imported project. |
| `projects` | `list` | Yes | Projects created by the import. |
| `reminders` | `list` | Yes | Reminders created by the import. |
| `sections` | `list` | Yes | Sections created by the import. |
| `status` | `str` | Yes | Always `ok` on success. |
| `tasks` | `list` | Yes | Tasks created by the import. |
| `template_type` | `str` | Yes | Type of template that was imported. |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectImportCreateResponseWithObjectEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectImportCreateResponseWithObject().create({
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

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectImportCreateResponseWithObjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReminderEntity

```python
reminder = client.Reminder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> ReminderEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Reminder().remove({"id": "reminder_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReminderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RemoveWorkspaceUserEntity

```python
remove_workspace_user = client.RemoveWorkspaceUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> RemoveWorkspaceUserEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.RemoveWorkspaceUser().remove({"id": 1, "workspace_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RemoveWorkspaceUserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RoleToActionMappingViewEntity

```python
role_to_action_mapping_view = client.RoleToActionMappingView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_collaborator_actions` | `list` | Yes | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | `list` | Yes | Workspace collaborator roles and their allowed actions. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RoleToActionMappingViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.RoleToActionMappingView().list()
for role_to_action_mapping_view in results:
    print(role_to_action_mapping_view.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RoleToActionMappingViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SectionEntity

```python
section = client.Section()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `str` | Yes | Date and time when the section was created. |
| `archived_at` | `Any` | Yes | Date and time when the section was archived, or `null` if it is active. |
| `description` | `str` | Yes | Section description, or `null` if it has none. |
| `id` | `str` | Yes | String ID of the section. |
| `is_archived` | `bool` | Yes | Whether the section is archived. |
| `is_collapsed` | `bool` | Yes | Whether the section is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the section is deleted. |
| `name` | `str` | Yes | Section name. |
| `order` | `Any` | No | Position of the new section in the project |
| `order_key` | `Any` | Yes | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `str` | Yes | String ID of the project that contains the section. |
| `section_order` | `int` | Yes | Position of the section in the project. |
| `updated_at` | `Any` | Yes | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | `str` | Yes | String ID of the user who owns the section. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `added_at` | - | - | - | - |
| `archived_at` | - | - | - | - |
| `description` | - | - | Yes | - |
| `id` | - | - | - | - |
| `is_archived` | - | - | - | - |
| `is_collapsed` | - | - | Yes | - |
| `is_deleted` | - | - | - | - |
| `name` | - | - | Yes | - |
| `order` | - | - | - | - |
| `order_key` | - | - | - | - |
| `project_id` | - | - | - | - |
| `section_order` | - | - | Yes | - |
| `updated_at` | - | - | - | - |
| `user_id` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> SectionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Section().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[SectionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Section().list()
for section in results:
    print(section.data_get())
```

#### `load(reqmatch, ctrl=None) -> SectionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Section().load({"id": "section_id"})
```

#### `remove(reqmatch, ctrl=None) -> SectionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Section().remove({"id": "section_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SectionSyncViewEntity

```python
section_sync_view = client.SectionSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `str` | Yes | Date and time when the section was created. |
| `archived_at` | `Any` | Yes | Date and time when the section was archived, or `null` if it is active. |
| `description` | `str` | Yes | Section description, or `null` if it has none. |
| `id` | `str` | Yes | String ID of the section. |
| `is_archived` | `bool` | Yes | Whether the section is archived. |
| `is_collapsed` | `bool` | Yes | Whether the section is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the section is deleted. |
| `name` | `str` | Yes | Section name. |
| `order_key` | `Any` | Yes | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `str` | Yes | String ID of the project that contains the section. |
| `section_order` | `int` | Yes | Position of the section in the project. |
| `updated_at` | `Any` | Yes | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | `str` | Yes | String ID of the user who owns the section. |

### Operations

#### `create(reqdata, ctrl=None) -> SectionSyncViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[SectionSyncViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.SectionSyncView().list({"query": "example"})
for section_sync_view in results:
    print(section_sync_view.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SectionSyncViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatusOkEntity

```python
status_ok = client.StatusOk()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> StatusOkEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.StatusOk().remove({"obj_id": "obj_id", "obj_type": "obj_type"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatusOkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubscriptionInfoEntity

```python
subscription_info = client.SubscriptionInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation_method` | `str` | Yes | How the active subscription was purchased. |
| `billing_portal_switch_to_annual_url` | `Any` | Yes | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `billing_portal_url` | `Any` | Yes | One-time URL to the Stripe customer portal, if available. |
| `expiration_date` | `Any` | Yes | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `has_billing_portal` | `bool` | Yes | `true` when the user has a Stripe customer with a portal session. |
| `has_billing_portal_switch_to_annual` | `bool` | Yes | `true` when a switch-to-annual flow is available in Stripe. |
| `has_switch_legacy_to_current` | `bool` | Yes | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `invoice_credit_balance` | `Any` | Yes | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `plan` | `str` | Yes | Plan tier the user is currently on. |
| `plan_price` | `Any` | Yes | Price of the active plan, when known. |
| `status` | `str` | Yes | Current subscription status. |

### Operations

#### `create(reqdata, ctrl=None) -> SubscriptionInfoEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.SubscriptionInfo().create({
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

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TaskEntity

```python
task = client.Task()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> TaskEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Task().create({
})
```

#### `remove(reqmatch, ctrl=None) -> TaskEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Task().remove({"id": "task_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TaskEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateEntity

```python
template = client.Template()
```

### Operations

#### `load(reqmatch, ctrl=None) -> TemplateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Template().load({"project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TopUpEntity

```python
top_up = client.TopUp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `int` | Yes | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | `str` | Yes | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | `str` | Yes | ISO currency code. |
| `return_url` | `str` | Yes | URL Checkout returns the user to. |
| `session_id` | `str` | Yes | The created Stripe Checkout session id. |

### Operations

#### `create(reqdata, ctrl=None) -> TopUpEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.TopUp().create({
    "amount": 1,  # int
    "checkout_url": "example_checkout_url",  # str
    "currency": "example_currency",  # str
    "return_url": "example_return_url",  # str
    "session_id": "example_session_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TopUpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UploadEntity

```python
upload = client.Upload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `str` | Yes | Name of the uploaded file. |
| `file_size` | `int` | Yes | Size of the uploaded file in bytes. |
| `file_type` | `str` | Yes | MIME type of the uploaded file. |
| `file_url` | `str` | Yes | URL of the uploaded file. |
| `image` | `Any` | No | Image URL for image uploads, or `null` for non-image files. |
| `image_height` | `Any` | No | Image height in pixels, or `null` for non-image files. |
| `image_width` | `Any` | No | Image width in pixels, or `null` for non-image files. |
| `resource_type` | `str` | Yes | Detected resource type of the upload. |
| `upload_state` | `str` | No | Upload processing state. |

### Operations

#### `create(reqdata, ctrl=None) -> UploadEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Upload().create({
    "file_name": "example_file_name",  # str
    "file_size": 1,  # int
    "file_type": "example_file_type",  # str
    "file_url": "example_file_url",  # str
    "resource_type": "example_resource_type",  # str
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `remove(reqmatch, ctrl=None) -> UploadEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Upload().remove({"file_url": "file_url"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UploadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsageSummaryEntity

```python
usage_summary = client.UsageSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automation_id` | `str` | Yes | The automation this usage belongs to. |
| `charged_amount` | `int` | Yes | `charged_units` in money, in microdollars. |
| `charged_units` | `int` | Yes | Units the group took off the balance, as a positive number. |
| `description` | `str` | Yes | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | `int` | Yes | How many usage events settled in the group. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[UsageSummaryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.UsageSummary().list()
for usage_summary in results:
    print(usage_summary.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageSummaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_user` | `bool` | Yes | Whether the user is considered activated (completed key onboarding actions) |
| `auto_reminder` | `int` | Yes | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `avatar_big` | `Any` | No | The link to a 195x195 pixels image of the user's avatar |
| `avatar_medium` | `Any` | No | The link to a 60x60 pixels image of the user's avatar |
| `avatar_s640` | `Any` | No | The link to a 640x640 pixels image of the user's avatar |
| `avatar_small` | `Any` | No | The link to a 35x35 pixels image of the user's avatar |
| `business_account_id` | `str` | No | The ID of the user's business account |
| `completed_count` | `int` | Yes | Total number of tasks completed by user |
| `completed_today` | `int` | Yes | Number of tasks completed today by the user |
| `daily_goal` | `int` | Yes | The daily goal number of completed tasks for karma |
| `date_format` | `int` | Yes | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `days_off` | `list` | Yes | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `deleted_at` | `Any` | No | Date when user was deleted (ISO 8601 format) |
| `dont_notify` | `Any` | No | Whether notifications should be disabled for the selected type and channel. |
| `email` | `str` | Yes | User's email address |
| `feature_identifier` | `str` | Yes | Feature identifier for feature flag evaluations |
| `features` | `dict` | Yes | Feature flags and settings for the user |
| `free_trial_expires` | `Any` | No | Date when free trial expires (ISO 8601 format) |
| `full_name` | `str` | Yes | The user's real name formatted as Firstname Lastname |
| `getting_started_guide_projects` | `Any` | No | List of project IDs for getting started guide |
| `has_magic_number` | `bool` | Yes | Whether the user has reached a magic number milestone |
| `has_password` | `bool` | Yes | Whether the user has a password set on the account. |
| `has_started_a_trial` | `bool` | Yes | Whether the user has ever started a free trial |
| `id` | `str` | Yes | User ID |
| `image_id` | `str` | No | The ID of the user's avatar |
| `inbox_project_id` | `str` | No | The ID of the user's Inbox project |
| `is_celebrations_enabled` | `bool` | Yes | Whether celebration animations are enabled |
| `is_deleted` | `bool` | No | Whether the user is deleted |
| `is_onboarded` | `bool` | No | Composite flag: true once all four onboarded_* criteria above are met. |
| `is_premium` | `bool` | Yes | Whether the user has a Todoist Pro subscription (a true or false value) |
| `joinable_workspace` | `Any` | Yes | Information about workspaces the user can join |
| `joined_at` | `Any` | No | Date when user joined Todoist (ISO 8601 format) |
| `karma` | `float` | Yes | The user's karma score |
| `karma_trend` | `Any` | No | The user's karma trend. |
| `lang` | `str` | Yes | The user's language |
| `mfa_enabled` | `bool` | Yes | Whether multi-factor authentication is enabled |
| `next_week` | `int` | Yes | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `notification_type` | `str` | Yes | Notification type to update. |
| `onboarded_dated_tasks_created` | `Any` | No | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `onboarded_desktop_accessed` | `Any` | No | True once the user has synced from Web, macOS, or Windows. |
| `onboarded_mobile_accessed` | `Any` | No | True once the user has synced from iOS or Android. |
| `onboarded_tasks_completed` | `Any` | No | True once the user has completed at least 3 tasks. |
| `onboarding_completed` | `bool` | Yes | Whether the user has completed onboarding |
| `onboarding_initiated` | `bool` | Yes | Whether the user has initiated onboarding |
| `onboarding_level` | `Any` | No | User's self-reported skill level during onboarding |
| `onboarding_persona` | `Any` | No | User's onboarding persona selection |
| `onboarding_role` | `Any` | No | User's role selection during onboarding |
| `onboarding_started` | `bool` | Yes | Whether the user has started onboarding |
| `onboarding_team_mode` | `Any` | No | Whether user selected team mode during onboarding |
| `onboarding_use_cases` | `Any` | No | Use cases the user selected during onboarding |
| `premium_status` | `Any` | No | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `premium_until` | `Any` | No | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `service` | `str` | Yes | Notification channel to update. |
| `share_limit` | `int` | Yes | Maximum number of collaborators allowed in shared projects |
| `sort_order` | `int` | Yes | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `start_day` | `int` | Yes | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `start_page` | `str` | Yes | The user's default view on Todoist. |
| `status` | `Any` | No | The user's status, shared across Todoist and Comms. |
| `theme_appearance` | `str` | Yes | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `theme_id` | `str` | Yes | The currently selected Todoist theme (a number between 0 and 13) |
| `time_format` | `Any` | No | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `token` | `str` | No | The user's token that should be used to call the other API methods |
| `tz_info` | `dict` | Yes | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `urgent_reminder_device` | `Any` | No | The device that should ring urgent reminders. |
| `verification_status` | `str` | Yes | User's email verification status. |
| `websocket_url` | `str` | Yes | WebSocket URL for real-time updates |
| `weekend_start_day` | `int` | Yes | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `weekly_goal` | `int` | Yes | The target number of tasks to complete per week |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[UserEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.User().list()
for user in results:
    print(user.data_get())
```

#### `update(reqdata, ctrl=None) -> UserEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.User().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkspaceEntity

```python
workspace = client.Workspace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Updated workspace description. |
| `domain_discovery` | `Any` | No | Updated domain discovery setting. |
| `domain_name` | `Any` | No | Updated workspace email domain. |
| `id` | `str` | No |  |
| `invite_code` | `Any` | No | Regenerate workspace invite code when set. |
| `is_collapsed` | `bool` | No | Updated collapse state for current user. |
| `is_guest_allowed` | `bool` | No | Updated guest access status. |
| `is_link_sharing_enabled` | `bool` | No | Updated link sharing status. |
| `is_trial_pending` | `bool` | No | Updated trial pending state. |
| `name` | `str` | No | Updated workspace name. |
| `properties` | `Any` | No | Updated workspace properties. |
| `restrict_email_domains` | `Any` | No | Updated email domain restriction setting. |

### Operations

#### `create(reqdata, ctrl=None) -> WorkspaceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Workspace().create({
    "id": 1,  # int
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch=None, ctrl=None) -> list[WorkspaceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Workspace().list()
for workspace in results:
    print(workspace.data_get())
```

#### `load(reqmatch, ctrl=None) -> WorkspaceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Workspace().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> WorkspaceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Workspace().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkspaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkspaceInvitationViewEntity

```python
workspace_invitation_view = client.WorkspaceInvitationView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `str` | No | Product the invitation was sent from. |
| `id` | `str` | No | The ID of the invitation |
| `inviter_id` | `str` | Yes | ID of the user user who sent the invitation |
| `role` | `str` | Yes | Workspace role granted by the invitation. |
| `user_email` | `str` | Yes | The invited person's email. |
| `workspace_id` | `str` | Yes | ID of the workspace |

### Operations

#### `create(reqdata, ctrl=None) -> WorkspaceInvitationViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.WorkspaceInvitationView().create({
    "inviter_id": "example_inviter_id",  # str
    "role": "example_role",  # str
    "user_email": "example_user_email",  # str
    "workspace_id": "example_workspace_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[WorkspaceInvitationViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.WorkspaceInvitationView().list({"workspace_id": 1})
for workspace_invitation_view in results:
    print(workspace_invitation_view.data_get())
```

#### `update(reqdata, ctrl=None) -> WorkspaceInvitationViewEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.WorkspaceInvitationView().update({
    "invite_code": "invite_code",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkspaceInvitationViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkspaceUserViewEntity

```python
workspace_user_view = client.WorkspaceUserView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `custom_sorting_applied` | `bool` | No | Whether the user has custom project sorting enabled. |
| `invite_code` | `Any` | No | Workspace invite code to join with. |
| `project_sort_preference` | `str` | No | Project sorting preference for the user. |
| `role` | `str` | No | Workspace role assigned to the user. |
| `user_id` | `str` | Yes | String ID of the workspace user. |
| `workspace_id` | `str` | Yes | String ID of the workspace. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `custom_sorting_applied` | - |
| `invite_code` | - |
| `project_sort_preference` | - |
| `role` | Yes |
| `user_id` | - |
| `workspace_id` | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> WorkspaceUserViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.WorkspaceUserView().create({
    "user_id": 1,  # int
    "workspace_id": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkspaceUserViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = TodoistSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

