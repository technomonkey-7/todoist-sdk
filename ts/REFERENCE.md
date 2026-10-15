# Todoist TypeScript SDK Reference

Complete API reference for the Todoist TypeScript SDK.


## TodoistSDK

### Constructor

```ts
new TodoistSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TodoistSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TodoistSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TodoistSDK` instance in test mode.


### Instance Methods

#### `Active(data?: object)`

Create a new `Active` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ActiveEntity` instance.

#### `Activity(data?: object)`

Create a new `Activity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ActivityEntity` instance.

#### `Archived(data?: object)`

Create a new `Archived` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArchivedEntity` instance.

#### `Authorization(data?: object)`

Create a new `Authorization` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthorizationEntity` instance.

#### `Backup(data?: object)`

Create a new `Backup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BackupEntity` instance.

#### `BillingPortalUrl(data?: object)`

Create a new `BillingPortalUrl` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingPortalUrlEntity` instance.

#### `Collaborator(data?: object)`

Create a new `Collaborator` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollaboratorEntity` instance.

#### `Comment(data?: object)`

Create a new `Comment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CommentEntity` instance.

#### `CompletedTask(data?: object)`

Create a new `CompletedTask` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompletedTaskEntity` instance.

#### `CreditState(data?: object)`

Create a new `CreditState` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreditStateEntity` instance.

#### `Email(data?: object)`

Create a new `Email` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailEntity` instance.

#### `FileUrl(data?: object)`

Create a new `FileUrl` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FileUrlEntity` instance.

#### `Folder(data?: object)`

Create a new `Folder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FolderEntity` instance.

#### `History(data?: object)`

Create a new `History` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HistoryEntity` instance.

#### `IdMapping(data?: object)`

Create a new `IdMapping` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IdMappingEntity` instance.

#### `Invite(data?: object)`

Create a new `Invite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InviteEntity` instance.

#### `Label(data?: object)`

Create a new `Label` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LabelEntity` instance.

#### `LocationReminder(data?: object)`

Create a new `LocationReminder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocationReminderEntity` instance.

#### `MemberView(data?: object)`

Create a new `MemberView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MemberViewEntity` instance.

#### `MigratePersonalToken(data?: object)`

Create a new `MigratePersonalToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MigratePersonalTokenEntity` instance.

#### `NotificationLocationSyncView(data?: object)`

Create a new `NotificationLocationSyncView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NotificationLocationSyncViewEntity` instance.

#### `NotificationSyncView(data?: object)`

Create a new `NotificationSyncView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NotificationSyncViewEntity` instance.

#### `PlanDetail(data?: object)`

Create a new `PlanDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlanDetailEntity` instance.

#### `ProductivityStat(data?: object)`

Create a new `ProductivityStat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductivityStatEntity` instance.

#### `Project(data?: object)`

Create a new `Project` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEntity` instance.

#### `ProjectImport(data?: object)`

Create a new `ProjectImport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectImportEntity` instance.

#### `ProjectImportCreateResponseWithObject(data?: object)`

Create a new `ProjectImportCreateResponseWithObject` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectImportCreateResponseWithObjectEntity` instance.

#### `Reminder(data?: object)`

Create a new `Reminder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReminderEntity` instance.

#### `RemoveWorkspaceUser(data?: object)`

Create a new `RemoveWorkspaceUser` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RemoveWorkspaceUserEntity` instance.

#### `RoleToActionMappingView(data?: object)`

Create a new `RoleToActionMappingView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RoleToActionMappingViewEntity` instance.

#### `Section(data?: object)`

Create a new `Section` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SectionEntity` instance.

#### `SharedLabel(data?: object)`

Create a new `SharedLabel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SharedLabelEntity` instance.

#### `StatusOk(data?: object)`

Create a new `StatusOk` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatusOkEntity` instance.

#### `SubscriptionInfo(data?: object)`

Create a new `SubscriptionInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubscriptionInfoEntity` instance.

#### `Task(data?: object)`

Create a new `Task` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TaskEntity` instance.

#### `Template(data?: object)`

Create a new `Template` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateEntity` instance.

#### `TopUp(data?: object)`

Create a new `TopUp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TopUpEntity` instance.

#### `Upload(data?: object)`

Create a new `Upload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UploadEntity` instance.

#### `UsageSummary(data?: object)`

Create a new `UsageSummary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsageSummaryEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `Workspace(data?: object)`

Create a new `Workspace` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkspaceEntity` instance.

#### `WorkspaceInvitationView(data?: object)`

Create a new `WorkspaceInvitationView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkspaceInvitationViewEntity` instance.

#### `WorkspaceUserView(data?: object)`

Create a new `WorkspaceUserView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkspaceUserViewEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TodoistSDK.test()`.

**Returns:** `TodoistSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## ActiveEntity

```ts
const active = client.Active()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `any` | Yes | Project access configuration. |
| `archived_date` | `any` | No | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `number` | No | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `any` | No | Numeric project color code. |
| `default_order` | `number` | No | Default order of the project in workspace views. |
| `default_order_key` | `any` | No | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `string` | No | Project description. |
| `folder_id` | `string` | No | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `any` | No | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `number` | Yes | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `boolean` | No | Whether the workspace project is archived. |
| `is_frozen` | `boolean` | No | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `boolean` | No | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `boolean` | No | Whether project insights are enabled for the project. |
| `name` | `string` | No | Project name. |
| `project_id` | `string` | Yes | String ID of the project. |
| `public_access` | `boolean` | Yes | Whether the project is publicly accessible. |
| `role` | `any` | No |  |
| `status` | `string` | No | Project status. |
| `view_style` | `string` | No | Project view style. |
| `workspace_id` | `number` | Yes | Numeric ID of the workspace that contains the project. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Active().list({ workspace_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ActiveEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ActivityEntity

```ts
const activity = client.Activity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_date` | `string` | Yes | The timestamp when this activity occurred. |
| `event_type` | `string` | Yes | The type of event that occurred. |
| `extra_data` | `any` | No | This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`… |
| `extra_data_id` | `string` | No | Internal ID for the extra activity data row. |
| `id` | `string` | No | The internal unique identifier for this activity log entry. |
| `initiator_id` | `string` | No |  |
| `object_id` | `string` | Yes | The unique identifier of the object this activity relates to (project, item, note, or section ID). |
| `object_type` | `string` | Yes | The type of object this activity relates to. |
| `parent_item_id` | `string` | No | For note (comment) activities, the ID of the item (task) that the note is attached to. |
| `parent_project_id` | `string` | No | The ID of the project that contains the object this activity relates to. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Activity().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ActivityEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArchivedEntity

```ts
const archived = client.Archived()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `any` | Yes | Project access configuration. |
| `archived_date` | `any` | No | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `number` | No | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `any` | No | Numeric project color code. |
| `default_order` | `number` | No | Default order of the project in workspace views. |
| `default_order_key` | `any` | No | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `string` | No | Project description. |
| `folder_id` | `string` | No | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `any` | No | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `number` | Yes | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `boolean` | No | Whether the workspace project is archived. |
| `is_frozen` | `boolean` | No | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `boolean` | No | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `boolean` | No | Whether project insights are enabled for the project. |
| `name` | `string` | No | Project name. |
| `project_id` | `string` | Yes | String ID of the project. |
| `public_access` | `boolean` | Yes | Whether the project is publicly accessible. |
| `role` | `any` | No |  |
| `status` | `string` | No | Project status. |
| `view_style` | `string` | No | Project view style. |
| `workspace_id` | `number` | Yes | Numeric ID of the workspace that contains the project. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Archived().list({ workspace_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArchivedEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AuthorizationEntity

```ts
const authorization = client.Authorization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | Yes | The token to be revoked (access token). |
| `token_type_hint` | `any` | No | A hint about the type of the token being revoked (optional). |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Authorization().create({
  token: 'example_token',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Authorization().remove({ access_token: 'access_token', client_id: 'client_id', client_secret: 'client_secret' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthorizationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BackupEntity

```ts
const backup = client.Backup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `string` | Yes | Backup URL |
| `version` | `string` | Yes | Date and time of the backup version |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `download` | `/api/v1/backups/download` | `client.Backup().load({ $action: 'download', ... })` |

An action returns that action's OWN response, which is not necessarily a
Backup record — check the API definition for its shape.

```ts
const result = await client.Backup().load({
  $action: 'download',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Backup().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Backup().load({ file: 'file' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BackupEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingPortalUrlEntity

```ts
const billing_portal_url = client.BillingPortalUrl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `billing_portal_url` | `string` | Yes |  |
| `reason_description` | `string` | No | Human-readable label of the cancellation reason. |
| `reason_flag` | `string` | No | Short identifier of the cancellation reason category. |
| `reason_text` | `string` | No | Free-form feedback from the user about the cancellation. |
| `return_url` | `string` | No | URL the user is redirected to after completing the flow. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BillingPortalUrl().create({
  billing_portal_url: 'example_billing_portal_url',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingPortalUrlEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollaboratorEntity

```ts
const collaborator = client.Collaborator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | The user's email address |
| `id` | `string` | Yes | The user's ID |
| `name` | `string` | Yes | The user's full name |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Collaborator().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollaboratorEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CommentEntity

```ts
const comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `any` | No | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `content` | `string` | No | Comment content. |
| `file_attachment` | `any` | Yes | File attachment metadata, or `null` when the comment has no attachment. |
| `id` | `string` | Yes | String ID of the comment. |
| `is_deleted` | `boolean` | Yes | Whether the comment is deleted. |
| `posted_at` | `any` | Yes | Date and time when the comment was posted, or `null` if unknown. |
| `posted_uid` | `any` | Yes | String ID of the user who posted the comment. |
| `project_id` | `string` | No | String ID of the project |
| `reactions` | `any` | Yes | Reaction emoji mapped to user IDs that reacted. |
| `task_id` | `string` | No | String ID of the task |
| `uids_to_notify` | `any` | Yes | String IDs of users notified by the comment. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `attachment` | - | - | - | - | - |
| `content` | - | - | Yes | Yes | - |
| `file_attachment` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_deleted` | - | - | - | - | - |
| `posted_at` | - | - | - | - | - |
| `posted_uid` | - | - | - | - | - |
| `project_id` | - | - | - | - | - |
| `reactions` | - | - | - | - | - |
| `task_id` | - | - | - | - | - |
| `uids_to_notify` | - | - | Yes | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `reaction_add` | `/api/v1/comments/{comment_id}/reactions` | `client.Comment().update({ $action: 'reaction_add', ... })` |
| `reaction_remove` | `/api/v1/comments/{comment_id}/reactions/remove` | `client.Comment().update({ $action: 'reaction_remove', ... })` |

An action returns that action's OWN response, which is not necessarily a
Comment record — check the API definition for its shape.

```ts
const result = await client.Comment().update({
  $action: 'reaction_add',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Comment().create({
  file_attachment: 'example_file_attachment',
  id: 'example_id',
  is_deleted: true,
  posted_at: 'example_posted_at',
  posted_uid: 'example_posted_uid',
  reactions: 'example_reactions',
  uids_to_notify: 'example_uids_to_notify',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Comment().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Comment().load({ id: 'comment_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Comment().remove({ id: 'comment_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Comment().update({
  id: 'comment_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CommentEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompletedTaskEntity

```ts
const completed_task = client.CompletedTask()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `boolean` | Yes | Whether the task is completed. |
| `child_order` | `number` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `number` | Yes | Number of times the task has been marked as completed. |
| `content` | `string` | Yes | Task content. |
| `day_order` | `number` | Yes | Task order for day-based views. |
| `deadline` | `any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `string` | Yes | Task description. |
| `due` | `any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `number` | Yes | Task duration details, or `null` when the task has no duration. |
| `id` | `string` | Yes | String ID of the task. |
| `is_collapsed` | `boolean` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `boolean` | Yes | Whether the task is deleted. |
| `labels` | `any[]` | Yes | Names of labels attached to the task. |
| `note_count` | `number` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `number` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `number` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | Yes | String ID of the user who owns the task. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `by_due_date` | `/api/v1/tasks/completed/by_due_date` | `client.CompletedTask().list({ $action: 'by_due_date', ... })` |

An action returns that action's OWN response, which is not necessarily a
CompletedTask record — check the API definition for its shape.

```ts
const result = await client.CompletedTask().list({
  $action: 'by_due_date',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CompletedTask().list({ since: "example", until: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompletedTaskEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreditStateEntity

```ts
const credit_state = client.CreditState()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_amount` | `number` | Yes | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `available_units` | `number` | Yes | Balance net of in-flight holds (`available_cached - held`). |
| `currency` | `string` | Yes | ISO currency code every amount in this response is in. |
| `depleted` | `boolean` | Yes | No further runs may start. |
| `is_settled_low_balance` | `boolean` | Yes | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `low_balance` | `boolean` | Yes | Balance is at or below the low-balance threshold. |
| `settled_amount` | `number` | Yes | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `settled_units` | `number` | Yes | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `usage_allowed` | `boolean` | Yes | Whether a new run may start right now. |
| `usage_block_reason` | `any` | Yes | Why a new run cannot start, or `null` when it can. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CreditState().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreditStateEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailEntity

```ts
const email = client.Email()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | Email address for the Todoist object. |
| `obj_id` | `string` | Yes | String ID of the Todoist object. |
| `obj_type` | `string` | Yes | Type of Todoist object to create an email for. |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Email().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FileUrlEntity

```ts
const file_url = client.FileUrl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `string` | Yes | Name of the exported template file. |
| `file_url` | `string` | Yes | Temporary URL for downloading the exported template. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.FileUrl().load({ project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FileUrlEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FolderEntity

```ts
const folder = client.Folder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_order` | `number` | Yes | User-specific position of the folder. |
| `default_order` | `number` | Yes | Default position of the folder in the workspace. |
| `default_order_key` | `any` | Yes | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `id` | `string` | Yes | String ID of the folder. |
| `is_deleted` | `boolean` | Yes | Whether the folder is deleted. |
| `name` | `string` | Yes | Folder name. |
| `workspace_id` | `string` | Yes | String ID of the workspace that contains the folder. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Folder().create({
  id: 1,
  child_order: 1,
  default_order: 1,
  default_order_key: 'example_default_order_key',
  is_deleted: true,
  name: 'example_name',
  workspace_id: 'example_workspace_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Folder().list({ workspace_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Folder().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Folder().remove({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FolderEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HistoryEntity

```ts
const history = client.History()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No | What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`. |
| `charged_amount` | `any` | Yes | `charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274. |
| `charged_units` | `any` | Yes | Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side. |
| `created_at` | `string` | Yes | When the entry was written, UTC. |
| `credited_amount` | `any` | Yes | `credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00. |
| `credited_units` | `any` | Yes | Units added to the balance, as a positive number, or `null` on a debit. |
| `description` | `string` | No | Human-readable summary of the entry. |
| `id` | `number` | Yes | Ledger entry id. |
| `refs` | `Record<string, any>` | No | Free-form attribution for the entry. |
| `status` | `string` | No | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `type` | `string` | Yes | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.History().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HistoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IdMappingEntity

```ts
const id_mapping = client.IdMapping()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `new_id` | `string` | Yes | Curent ID for the object. |
| `old_id` | `string` | Yes | Legacy ID for the object. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.IdMapping().list({ obj_id: "example", obj_name: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IdMappingEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InviteEntity

```ts
const invite = client.Invite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No | For first-party clients usage only. |
| `email_list` | `any` | No | List of user emails to invite to the workspace. |
| `invited_emails` | `any[]` | Yes | Emails successfully invited to the workspace. |
| `role` | `any` | No | Role assigned to invited users. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Invite().create({
  workspace_id: 1,
  invited_emails: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InviteEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LabelEntity

```ts
const label = client.Label()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | Yes | Label color name. |
| `id` | `string` | Yes | String ID of the label. |
| `is_favorite` | `boolean` | Yes | Whether the label is marked as a favorite. |
| `name` | `string` | Yes | Label name. |
| `order` | `any` | Yes | Position of the label in the label list, or `null` when no explicit order is set. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `color` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `is_favorite` | - | - | Yes | Yes | - |
| `name` | - | - | - | Yes | - |
| `order` | - | - | Yes | Yes | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/api/v1/labels/search` | `client.Label().list({ $action: 'search', ... })` |

An action returns that action's OWN response, which is not necessarily a
Label record — check the API definition for its shape.

```ts
const result = await client.Label().list({
  $action: 'search',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Label().create({
  color: 'example_color',
  id: 'example_id',
  is_favorite: true,
  name: 'example_name',
  order: 'example_order',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Label().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Label().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Label().remove({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Label().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LabelEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocationReminderEntity

```ts
const location_reminder = client.LocationReminder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LocationReminder().remove({ id: 'location_reminder_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocationReminderEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MemberViewEntity

```ts
const member_view = client.MemberView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `full_name` | `string` | Yes | Full name of the workspace member. |
| `image_id` | `string` | No | Avatar image ID of the workspace member, or `null`. |
| `is_deleted` | `boolean` | No | Whether the workspace member is deleted. |
| `role` | `string` | Yes | Workspace role assigned to the member. |
| `timezone` | `string` | Yes | Timezone of the workspace member. |
| `user_email` | `string` | Yes | Email address of the workspace member. |
| `user_id` | `string` | Yes | String ID of the workspace member. |
| `workspace_id` | `string` | Yes | String ID of the workspace. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MemberView().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MemberViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MigratePersonalTokenEntity

```ts
const migrate_personal_token = client.MigratePersonalToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `any` | Yes | OAuth access token created from the personal token. |
| `client_id` | `string` | Yes | The unique Client ID of the Todoist application that you registered. |
| `client_secret` | `string` | Yes | The unique Client Secret of the Todoist application that you registered. |
| `expires_in` | `number` | Yes | Access token lifetime in seconds. |
| `personal_token` | `string` | Yes | Token obtained from the email/password authentication. |
| `scope` | `string` | Yes | Scopes of the OAuth token. |
| `token_type` | `string` | Yes | OAuth token type. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MigratePersonalToken().create({
  access_token: 'example_access_token',
  client_id: 'example_client_id',
  client_secret: 'example_client_secret',
  expires_in: 1,
  personal_token: 'example_personal_token',
  scope: 'example_scope',
  token_type: 'example_token_type',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MigratePersonalTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NotificationLocationSyncViewEntity

```ts
const notification_location_sync_view = client.NotificationLocationSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | String ID of the location reminder |
| `is_deleted` | `boolean` | Yes | Whether the location reminder is deleted |
| `item_id` | `string` | Yes | String ID of the task |
| `loc_lat` | `string` | Yes | Latitude of the location |
| `loc_long` | `string` | Yes | Longitude of the location |
| `loc_trigger` | `string` | Yes | Trigger type for the location reminder |
| `name` | `string` | Yes | Name of the location |
| `notify_uid` | `string` | Yes | String ID of the user who will receive the reminder |
| `project_id` | `string` | Yes | String ID of the project containing the task |
| `radius` | `number` | Yes | Radius in meters |
| `task_id` | `string` | Yes | String ID of the task |
| `type` | `string` | No | The reminder type |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.NotificationLocationSyncView().create({
  reminder_id: 'example_reminder_id',
  id: 'example_id',
  is_deleted: true,
  item_id: 'example_item_id',
  loc_lat: 'example_loc_lat',
  loc_long: 'example_loc_long',
  loc_trigger: 'example_loc_trigger',
  name: 'example_name',
  notify_uid: 'example_notify_uid',
  project_id: 'example_project_id',
  radius: 1,
  task_id: 'example_task_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.NotificationLocationSyncView().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.NotificationLocationSyncView().load({ reminder_id: 'reminder_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NotificationLocationSyncViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NotificationSyncViewEntity

```ts
const notification_sync_view = client.NotificationSyncView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `due` | `any` | Yes | Datetime when the reminder fires, or `null` if unset. |
| `id` | `string` | Yes | String ID of the reminder. |
| `is_deleted` | `boolean` | Yes | Whether the reminder is deleted. |
| `is_urgent` | `boolean` | Yes | Whether the reminder should be delivered urgently. |
| `item_id` | `string` | Yes | String ID of the task that owns the reminder. |
| `minute_offset` | `any` | Yes | Minutes before the task due time for relative reminders. |
| `notify_uid` | `string` | Yes | String ID of the user who receives the reminder. |
| `reminder_type` | `string` | No | Type of the reminder: 'relative' or 'absolute' |
| `service` | `string` | No | Notification service type: 'email', 'push'. |
| `task_id` | `string` | Yes | String ID of the task |
| `type` | `string` | Yes | Reminder type. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.NotificationSyncView().create({
  reminder_id: 'example_reminder_id',
  due: 'example_due',
  id: 'example_id',
  is_deleted: true,
  is_urgent: true,
  item_id: 'example_item_id',
  minute_offset: 'example_minute_offset',
  notify_uid: 'example_notify_uid',
  task_id: 'example_task_id',
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.NotificationSyncView().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.NotificationSyncView().load({ reminder_id: 'reminder_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NotificationSyncViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlanDetailEntity

```ts
const plan_detail = client.PlanDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `billing_cycle` | `string` | Yes | Billing cycle for the listed prices. |
| `prices` | `any[]` | Yes | Prices available for the billing cycle. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PlanDetail().list({ workspace_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlanDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductivityStatEntity

```ts
const productivity_stat = client.ProductivityStat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_count` | `number` | Yes | Total number of tasks completed by the user (all time) |
| `days_items` | `any[]` | Yes | Daily completion statistics for the last 7 days, ordered chronologically |
| `goals` | `Record<string, any>` | Yes | User goals, streaks, and productivity settings |
| `karma` | `number` | Yes | Current karma score |
| `karma_graph_data` | `any[]` | Yes | Historical karma data points for graphing, each containing date and karma_avg |
| `karma_last_update` | `number` | Yes | Net karma change from the most recent update (positive_karma + negative_karma) |
| `karma_trend` | `string` | Yes | Karma trend indicator ('up' or 'down') |
| `karma_update_reasons` | `any[]` | Yes | Recent karma update events with reasons and amounts |
| `project_colors` | `Record<string, any>` | Yes | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `week_items` | `any[]` | Yes | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProductivityStat().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductivityStatEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEntity

```ts
const project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_order` | `any` | No | Updated position of the project in the hierarchy. |
| `color` | `any` | No | Color of the project icon. |
| `description` | `string` | No | Description of the project. |
| `folder_id` | `string` | No | Folder to move the project into. |
| `icon` | `any` | No | Project icon name. |
| `id` | `string` | No |  |
| `is_collapsed` | `boolean` | No | Whether the project is collapsed. |
| `is_favorite` | `boolean` | No | Whether the project is a favorite for the user. |
| `name` | `string` | Yes | Name of the project. |
| `next_cursor` | `any` | Yes | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | `string` | No | Parent project ID. |
| `results` | `any[]` | Yes | Objects in the current page of results. |
| `view_style` | `any` | No | View style of the project. |
| `workspace_id` | `string` | No | Workspace ID. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `child_order` | - | - | - | - | - |
| `color` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `folder_id` | - | - | - | - | - |
| `icon` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_collapsed` | - | - | - | - | - |
| `is_favorite` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `next_cursor` | - | - | - | - | - |
| `parent_id` | - | - | - | - | - |
| `results` | - | - | - | - | - |
| `view_style` | - | - | - | - | - |
| `workspace_id` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archived` | `/api/v1/projects/archived` | `client.Project().list({ $action: 'archived', ... })` |
| `search` | `/api/v1/projects/search` | `client.Project().list({ $action: 'search', ... })` |
| `archive` | `/api/v1/projects/{project_id}/archive` | `client.Project().update({ $action: 'archive', ... })` |
| `join` | `/api/v1/projects/{project_id}/join` | `client.Project().update({ $action: 'join', ... })` |
| `unarchive` | `/api/v1/projects/{project_id}/unarchive` | `client.Project().update({ $action: 'unarchive', ... })` |

An action returns that action's OWN response, which is not necessarily a
Project record — check the API definition for its shape.

```ts
const result = await client.Project().list({
  $action: 'archived',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Project().create({
  name: 'example_name',
  next_cursor: 'example_next_cursor',
  results: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Project().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Project().load({ id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Project().remove({ id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Project().update({
  id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectImportEntity

```ts
const project_import = client.ProjectImport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comments` | `any[]` | Yes | Task comments created by the import. |
| `discarded_fields` | `any[]` | Yes | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `locale` | `string` | No | Locale to use for localized template content. |
| `project_id` | `string` | Yes | String ID of the project to import the template into. |
| `project_notes` | `any[]` | Yes | Project comments created by the import. |
| `project_view_options_defaults` | `any[]` | Yes | View options defaults applied to the imported project. |
| `projects` | `any[]` | Yes | Projects created or updated by the import. |
| `reminders` | `any[]` | Yes | Reminders created by the import. |
| `sections` | `any[]` | Yes | Sections created by the import. |
| `status` | `string` | Yes | Always `ok` on success. |
| `tasks` | `any[]` | Yes | Tasks created by the import. |
| `template_id` | `string` | Yes | ID of the saved template to import. |
| `template_type` | `string` | Yes | Type of template that was imported. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectImport().create({
  comments: [],
  discarded_fields: [],
  project_id: 'example_project_id',
  project_notes: [],
  project_view_options_defaults: [],
  projects: [],
  reminders: [],
  sections: [],
  status: 'example_status',
  tasks: [],
  template_id: 'example_template_id',
  template_type: 'example_template_type',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectImportEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectImportCreateResponseWithObjectEntity

```ts
const project_import_create_response_with_object = client.ProjectImportCreateResponseWithObject()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comments` | `any[]` | Yes | Task comments created by the import. |
| `discarded_fields` | `any[]` | Yes | Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. |
| `project_id` | `string` | Yes | ID of the project created from the template. |
| `project_notes` | `any[]` | Yes | Project comments created by the import. |
| `project_view_options_defaults` | `any[]` | Yes | View options defaults applied to the imported project. |
| `projects` | `any[]` | Yes | Projects created by the import. |
| `reminders` | `any[]` | Yes | Reminders created by the import. |
| `sections` | `any[]` | Yes | Sections created by the import. |
| `status` | `string` | Yes | Always `ok` on success. |
| `tasks` | `any[]` | Yes | Tasks created by the import. |
| `template_type` | `string` | Yes | Type of template that was imported. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectImportCreateResponseWithObject().create({
  comments: [],
  discarded_fields: [],
  project_id: 'example_project_id',
  project_notes: [],
  project_view_options_defaults: [],
  projects: [],
  reminders: [],
  sections: [],
  status: 'example_status',
  tasks: [],
  template_type: 'example_template_type',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectImportCreateResponseWithObjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReminderEntity

```ts
const reminder = client.Reminder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Reminder().remove({ id: 'reminder_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReminderEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RemoveWorkspaceUserEntity

```ts
const remove_workspace_user = client.RemoveWorkspaceUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.RemoveWorkspaceUser().remove({ id: 1, workspace_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RemoveWorkspaceUserEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RoleToActionMappingViewEntity

```ts
const role_to_action_mapping_view = client.RoleToActionMappingView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_collaborator_actions` | `any[]` | Yes | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | `any[]` | Yes | Workspace collaborator roles and their allowed actions. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.RoleToActionMappingView().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RoleToActionMappingViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SectionEntity

```ts
const section = client.Section()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | Yes | Date and time when the section was created. |
| `archived_at` | `any` | Yes | Date and time when the section was archived, or `null` if it is active. |
| `description` | `string` | Yes | Section description, or `null` if it has none. |
| `id` | `string` | Yes | String ID of the section. |
| `is_archived` | `boolean` | Yes | Whether the section is archived. |
| `is_collapsed` | `boolean` | Yes | Whether the section is collapsed in the user's view. |
| `is_deleted` | `boolean` | Yes | Whether the section is deleted. |
| `name` | `string` | Yes | Section name. |
| `order` | `any` | No | Position of the new section in the project |
| `order_key` | `any` | Yes | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `string` | Yes | String ID of the project that contains the section. |
| `section_order` | `number` | Yes | Position of the section in the project. |
| `updated_at` | `any` | Yes | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | `string` | Yes | String ID of the user who owns the section. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `added_at` | - | - | - | - | - |
| `archived_at` | - | - | - | - | - |
| `description` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `is_archived` | - | - | - | - | - |
| `is_collapsed` | - | - | - | Yes | - |
| `is_deleted` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `order` | - | - | - | - | - |
| `order_key` | - | - | - | - | - |
| `project_id` | - | - | - | - | - |
| `section_order` | - | - | - | Yes | - |
| `updated_at` | - | - | - | - | - |
| `user_id` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/api/v1/sections/search` | `client.Section().list({ $action: 'search', ... })` |
| `archive` | `/api/v1/sections/{section_id}/archive` | `client.Section().update({ $action: 'archive', ... })` |
| `unarchive` | `/api/v1/sections/{section_id}/unarchive` | `client.Section().update({ $action: 'unarchive', ... })` |

An action returns that action's OWN response, which is not necessarily a
Section record — check the API definition for its shape.

```ts
const result = await client.Section().list({
  $action: 'search',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Section().create({
  added_at: 'example_added_at',
  archived_at: 'example_archived_at',
  description: 'example_description',
  id: 'example_id',
  is_archived: true,
  is_collapsed: true,
  is_deleted: true,
  name: 'example_name',
  order_key: 'example_order_key',
  project_id: 'example_project_id',
  section_order: 1,
  updated_at: 'example_updated_at',
  user_id: 'example_user_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Section().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Section().load({ id: 'section_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Section().remove({ id: 'section_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Section().update({
  id: 'section_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SharedLabelEntity

```ts
const shared_label = client.SharedLabel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Current shared label name to rename. |
| `new_name` | `string` | Yes | New shared label name to apply to matching tasks. |
| `next_cursor` | `any` | Yes | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `any[]` | Yes | Objects in the current page of results. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SharedLabel().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.SharedLabel().remove()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.SharedLabel().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SharedLabelEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatusOkEntity

```ts
const status_ok = client.StatusOk()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.StatusOk().remove({ obj_id: 'obj_id', obj_type: 'obj_type' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatusOkEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubscriptionInfoEntity

```ts
const subscription_info = client.SubscriptionInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation_method` | `string` | Yes | How the active subscription was purchased. |
| `billing_portal_switch_to_annual_url` | `any` | Yes | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `billing_portal_url` | `any` | Yes | One-time URL to the Stripe customer portal, if available. |
| `expiration_date` | `any` | Yes | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `has_billing_portal` | `boolean` | Yes | `true` when the user has a Stripe customer with a portal session. |
| `has_billing_portal_switch_to_annual` | `boolean` | Yes | `true` when a switch-to-annual flow is available in Stripe. |
| `has_switch_legacy_to_current` | `boolean` | Yes | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `invoice_credit_balance` | `any` | Yes | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `plan` | `string` | Yes | Plan tier the user is currently on. |
| `plan_price` | `any` | Yes | Price of the active plan, when known. |
| `status` | `string` | Yes | Current subscription status. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.SubscriptionInfo().create({
  activation_method: 'example_activation_method',
  billing_portal_switch_to_annual_url: 'example_billing_portal_switch_to_annual_url',
  billing_portal_url: 'example_billing_portal_url',
  expiration_date: 'example_expiration_date',
  has_billing_portal: true,
  has_billing_portal_switch_to_annual: true,
  has_switch_legacy_to_current: true,
  invoice_credit_balance: 'example_invoice_credit_balance',
  plan: 'example_plan',
  plan_price: 'example_plan_price',
  status: 'example_status',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubscriptionInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TaskEntity

```ts
const task = client.Task()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `string` | No | ID of the user to assign the task to. |
| `checked` | `boolean` | Yes | Whether the task is completed. |
| `child_order` | `number` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `number` | Yes | Number of times the task has been marked as completed. |
| `content` | `string` | Yes | Task content. |
| `day_order` | `number` | Yes | Task order for day-based views. |
| `deadline` | `any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `any` | No | Deadline date in YYYY-MM-DD format |
| `description` | `string` | Yes | Task description. |
| `due` | `any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `any` | No | Due date in RFC 3339 format or similar. |
| `due_datetime` | `any` | No | Due date and time. |
| `due_lang` | `any` | No | Due date language code. |
| `due_string` | `any` | No | Human-readable representation of the due date. |
| `duration` | `number` | Yes | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `any` | No | Unit of time for duration. |
| `id` | `string` | Yes | String ID of the task. |
| `is_collapsed` | `boolean` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `boolean` | Yes | Whether the task is deleted. |
| `labels` | `any[]` | Yes | Names of labels attached to the task. |
| `note_count` | `number` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `any` | No | Position of the task in the project or section |
| `order_key` | `any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `number` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `number` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | Yes | String ID of the user who owns the task. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `added_at` | - | - | - | - | - |
| `added_by_uid` | - | - | - | - | - |
| `assigned_by_uid` | - | - | - | - | - |
| `assignee_id` | - | - | - | - | - |
| `checked` | - | - | - | - | - |
| `child_order` | - | - | - | Yes | - |
| `completed_at` | - | - | - | - | - |
| `completed_by_uid` | - | - | - | - | - |
| `completed_count` | - | - | - | - | - |
| `content` | - | - | - | Yes | - |
| `day_order` | - | - | - | Yes | - |
| `deadline` | - | - | - | - | - |
| `deadline_date` | - | - | - | - | - |
| `description` | - | - | Yes | Yes | - |
| `due` | - | - | - | - | - |
| `due_date` | - | - | - | - | - |
| `due_datetime` | - | - | - | - | - |
| `due_lang` | - | - | - | - | - |
| `due_string` | - | - | - | - | - |
| `duration` | - | - | Yes | Yes | - |
| `duration_unit` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_collapsed` | - | - | - | Yes | - |
| `is_deleted` | - | - | - | - | - |
| `labels` | - | - | Yes | Yes | - |
| `note_count` | - | - | - | - | - |
| `order` | - | - | - | - | - |
| `order_key` | - | - | - | - | - |
| `parent_id` | - | - | Yes | - | - |
| `postponed_count` | - | - | - | - | - |
| `priority` | - | - | Yes | Yes | - |
| `project_id` | - | - | Yes | - | - |
| `responsible_uid` | - | - | - | - | - |
| `section_id` | - | - | Yes | - | - |
| `updated_at` | - | - | - | - | - |
| `user_id` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `quick` | `/api/v1/tasks/quick` | `client.Task().create({ $action: 'quick', ... })` |
| `filter` | `/api/v1/tasks/filter` | `client.Task().list({ $action: 'filter', ... })` |
| `close` | `/api/v1/tasks/{task_id}/close` | `client.Task().update({ $action: 'close', ... })` |
| `move` | `/api/v1/tasks/{task_id}/move` | `client.Task().update({ $action: 'move', ... })` |
| `reopen` | `/api/v1/tasks/{task_id}/reopen` | `client.Task().update({ $action: 'reopen', ... })` |

An action returns that action's OWN response, which is not necessarily a
Task record — check the API definition for its shape.

```ts
const result = await client.Task().create({
  $action: 'quick',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Task().create({
  added_at: 'example_added_at',
  added_by_uid: 'example_added_by_uid',
  assigned_by_uid: 'example_assigned_by_uid',
  checked: true,
  child_order: 1,
  completed_at: 'example_completed_at',
  completed_by_uid: 'example_completed_by_uid',
  completed_count: 1,
  content: 'example_content',
  day_order: 1,
  deadline: 'example_deadline',
  description: 'example_description',
  due: 'example_due',
  duration: 1,
  id: 'example_id',
  is_collapsed: true,
  is_deleted: true,
  labels: [],
  note_count: 1,
  order_key: 'example_order_key',
  parent_id: 'example_parent_id',
  postponed_count: 1,
  priority: 1,
  project_id: 'example_project_id',
  responsible_uid: 'example_responsible_uid',
  section_id: 'example_section_id',
  updated_at: 'example_updated_at',
  user_id: 'example_user_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Task().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Task().load({ id: 'task_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Task().remove({ id: 'task_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Task().update({
  id: 'task_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TaskEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateEntity

```ts
const template = client.Template()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `file` | `/api/v1/templates/file` | `client.Template().load({ $action: 'file', ... })` |

An action returns that action's OWN response, which is not necessarily a
Template record — check the API definition for its shape.

```ts
const result = await client.Template().load({
  $action: 'file',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Template().load({ project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TopUpEntity

```ts
const top_up = client.TopUp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | `string` | Yes | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | `string` | Yes | ISO currency code. |
| `return_url` | `string` | Yes | URL Checkout returns the user to. |
| `session_id` | `string` | Yes | The created Stripe Checkout session id. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.TopUp().create({
  amount: 1,
  checkout_url: 'example_checkout_url',
  currency: 'example_currency',
  return_url: 'example_return_url',
  session_id: 'example_session_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TopUpEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UploadEntity

```ts
const upload = client.Upload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `string` | Yes | Name of the uploaded file. |
| `file_size` | `number` | Yes | Size of the uploaded file in bytes. |
| `file_type` | `string` | Yes | MIME type of the uploaded file. |
| `file_url` | `string` | Yes | URL of the uploaded file. |
| `image` | `any` | No | Image URL for image uploads, or `null` for non-image files. |
| `image_height` | `any` | No | Image height in pixels, or `null` for non-image files. |
| `image_width` | `any` | No | Image width in pixels, or `null` for non-image files. |
| `resource_type` | `string` | Yes | Detected resource type of the upload. |
| `upload_state` | `string` | No | Upload processing state. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Upload().create({
  file_name: 'example_file_name',
  file_size: 1,
  file_type: 'example_file_type',
  file_url: 'example_file_url',
  resource_type: 'example_resource_type',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Upload().remove({ file_url: 'file_url' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UploadEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsageSummaryEntity

```ts
const usage_summary = client.UsageSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automation_id` | `string` | Yes | The automation this usage belongs to. |
| `charged_amount` | `number` | Yes | `charged_units` in money, in microdollars. |
| `charged_units` | `number` | Yes | Units the group took off the balance, as a positive number. |
| `description` | `string` | Yes | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | `number` | Yes | How many usage events settled in the group. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.UsageSummary().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsageSummaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_user` | `boolean` | Yes | Whether the user is considered activated (completed key onboarding actions) |
| `auto_reminder` | `number` | Yes | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `avatar_big` | `any` | No | The link to a 195x195 pixels image of the user's avatar |
| `avatar_medium` | `any` | No | The link to a 60x60 pixels image of the user's avatar |
| `avatar_s640` | `any` | No | The link to a 640x640 pixels image of the user's avatar |
| `avatar_small` | `any` | No | The link to a 35x35 pixels image of the user's avatar |
| `business_account_id` | `string` | No | The ID of the user's business account |
| `completed_count` | `number` | Yes | Total number of tasks completed by user |
| `completed_today` | `number` | Yes | Number of tasks completed today by the user |
| `daily_goal` | `number` | Yes | The daily goal number of completed tasks for karma |
| `date_format` | `number` | Yes | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `days_off` | `any[]` | Yes | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `deleted_at` | `any` | No | Date when user was deleted (ISO 8601 format) |
| `dont_notify` | `any` | No | Whether notifications should be disabled for the selected type and channel. |
| `email` | `string` | Yes | User's email address |
| `feature_identifier` | `string` | Yes | Feature identifier for feature flag evaluations |
| `features` | `Record<string, any>` | Yes | Feature flags and settings for the user |
| `free_trial_expires` | `any` | No | Date when free trial expires (ISO 8601 format) |
| `full_name` | `string` | Yes | The user's real name formatted as Firstname Lastname |
| `getting_started_guide_projects` | `any` | No | List of project IDs for getting started guide |
| `has_magic_number` | `boolean` | Yes | Whether the user has reached a magic number milestone |
| `has_password` | `boolean` | Yes | Whether the user has a password set on the account. |
| `has_started_a_trial` | `boolean` | Yes | Whether the user has ever started a free trial |
| `id` | `string` | Yes | User ID |
| `image_id` | `string` | No | The ID of the user's avatar |
| `inbox_project_id` | `string` | No | The ID of the user's Inbox project |
| `is_celebrations_enabled` | `boolean` | Yes | Whether celebration animations are enabled |
| `is_deleted` | `boolean` | No | Whether the user is deleted |
| `is_onboarded` | `boolean` | No | Composite flag: true once all four onboarded_* criteria above are met. |
| `is_premium` | `boolean` | Yes | Whether the user has a Todoist Pro subscription (a true or false value) |
| `joinable_workspace` | `any` | Yes | Information about workspaces the user can join |
| `joined_at` | `any` | No | Date when user joined Todoist (ISO 8601 format) |
| `karma` | `number` | Yes | The user's karma score |
| `karma_trend` | `any` | No | The user's karma trend. |
| `lang` | `string` | Yes | The user's language |
| `mfa_enabled` | `boolean` | Yes | Whether multi-factor authentication is enabled |
| `next_week` | `number` | Yes | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `notification_type` | `string` | Yes | Notification type to update. |
| `onboarded_dated_tasks_created` | `any` | No | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `onboarded_desktop_accessed` | `any` | No | True once the user has synced from Web, macOS, or Windows. |
| `onboarded_mobile_accessed` | `any` | No | True once the user has synced from iOS or Android. |
| `onboarded_tasks_completed` | `any` | No | True once the user has completed at least 3 tasks. |
| `onboarding_completed` | `boolean` | Yes | Whether the user has completed onboarding |
| `onboarding_initiated` | `boolean` | Yes | Whether the user has initiated onboarding |
| `onboarding_level` | `any` | No | User's self-reported skill level during onboarding |
| `onboarding_persona` | `any` | No | User's onboarding persona selection |
| `onboarding_role` | `any` | No | User's role selection during onboarding |
| `onboarding_started` | `boolean` | Yes | Whether the user has started onboarding |
| `onboarding_team_mode` | `any` | No | Whether user selected team mode during onboarding |
| `onboarding_use_cases` | `any` | No | Use cases the user selected during onboarding |
| `premium_status` | `any` | No | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `premium_until` | `any` | No | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `service` | `string` | Yes | Notification channel to update. |
| `share_limit` | `number` | Yes | Maximum number of collaborators allowed in shared projects |
| `sort_order` | `number` | Yes | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `start_day` | `number` | Yes | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `start_page` | `string` | Yes | The user's default view on Todoist. |
| `status` | `any` | No | The user's status, shared across Todoist and Comms. |
| `theme_appearance` | `string` | Yes | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `theme_id` | `string` | Yes | The currently selected Todoist theme (a number between 0 and 13) |
| `time_format` | `any` | No | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `token` | `string` | No | The user's token that should be used to call the other API methods |
| `tz_info` | `Record<string, any>` | Yes | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `urgent_reminder_device` | `any` | No | The device that should ring urgent reminders. |
| `verification_status` | `string` | Yes | User's email verification status. |
| `websocket_url` | `string` | Yes | WebSocket URL for real-time updates |
| `weekend_start_day` | `number` | Yes | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `weekly_goal` | `number` | Yes | The target number of tasks to complete per week |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.User().list()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.User().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkspaceEntity

```ts
const workspace = client.Workspace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Updated workspace description. |
| `domain_discovery` | `any` | No | Updated domain discovery setting. |
| `domain_name` | `any` | No | Updated workspace email domain. |
| `id` | `string` | No |  |
| `invite_code` | `any` | No | Regenerate workspace invite code when set. |
| `is_collapsed` | `boolean` | No | Updated collapse state for current user. |
| `is_guest_allowed` | `boolean` | No | Updated guest access status. |
| `is_link_sharing_enabled` | `boolean` | No | Updated link sharing status. |
| `is_trial_pending` | `boolean` | No | Updated trial pending state. |
| `name` | `string` | No | Updated workspace name. |
| `properties` | `any` | No | Updated workspace properties. |
| `restrict_email_domains` | `any` | No | Updated email domain restriction setting. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `logo` | `/api/v1/workspaces/logo` | `client.Workspace().create({ $action: 'logo', ... })` |
| `invitation` | `/api/v1/workspaces/invitations` | `client.Workspace().list({ $action: 'invitation', ... })` |

An action returns that action's OWN response, which is not necessarily a
Workspace record — check the API definition for its shape.

```ts
const result = await client.Workspace().create({
  $action: 'logo',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Workspace().create({
  id: 1,
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Workspace().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Workspace().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Workspace().remove({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkspaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkspaceInvitationViewEntity

```ts
const workspace_invitation_view = client.WorkspaceInvitationView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No | Product the invitation was sent from. |
| `id` | `string` | No | The ID of the invitation |
| `inviter_id` | `string` | Yes | ID of the user user who sent the invitation |
| `role` | `string` | Yes | Workspace role granted by the invitation. |
| `user_email` | `string` | Yes | The invited person's email. |
| `workspace_id` | `string` | Yes | ID of the workspace |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.WorkspaceInvitationView().create({
  inviter_id: 'example_inviter_id',
  role: 'example_role',
  user_email: 'example_user_email',
  workspace_id: 'example_workspace_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.WorkspaceInvitationView().list({ workspace_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.WorkspaceInvitationView().update({
  invite_code: 'invite_code',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkspaceInvitationViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkspaceUserViewEntity

```ts
const workspace_user_view = client.WorkspaceUserView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `custom_sorting_applied` | `boolean` | No | Whether the user has custom project sorting enabled. |
| `invite_code` | `any` | No | Workspace invite code to join with. |
| `project_sort_preference` | `string` | No | Project sorting preference for the user. |
| `role` | `string` | No | Workspace role assigned to the user. |
| `user_id` | `string` | Yes | String ID of the workspace user. |
| `workspace_id` | `string` | Yes | String ID of the workspace. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.WorkspaceUserView().create({
  user_id: 1,
  workspace_id: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkspaceUserViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new TodoistSDK({
  feature: {
    test: { active: true },
  }
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

