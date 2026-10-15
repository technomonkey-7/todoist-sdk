# Todoist Golang SDK Reference

Complete API reference for the Todoist Golang SDK.


## TodoistSDK

### Constructor

```go
func NewTodoistSDK(options map[string]any) *TodoistSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *TodoistSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *TodoistSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Activity(data map[string]any) TodoistEntity`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Backup(data map[string]any) TodoistEntity`

Create a new `Backup` entity instance. Pass `nil` for no initial data.

#### `BillingPortalUrl(data map[string]any) TodoistEntity`

Create a new `BillingPortalUrl` entity instance. Pass `nil` for no initial data.

#### `Collaborator(data map[string]any) TodoistEntity`

Create a new `Collaborator` entity instance. Pass `nil` for no initial data.

#### `Comment(data map[string]any) TodoistEntity`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `CompletedTask(data map[string]any) TodoistEntity`

Create a new `CompletedTask` entity instance. Pass `nil` for no initial data.

#### `CreditState(data map[string]any) TodoistEntity`

Create a new `CreditState` entity instance. Pass `nil` for no initial data.

#### `Email(data map[string]any) TodoistEntity`

Create a new `Email` entity instance. Pass `nil` for no initial data.

#### `FileUrl(data map[string]any) TodoistEntity`

Create a new `FileUrl` entity instance. Pass `nil` for no initial data.

#### `Folder(data map[string]any) TodoistEntity`

Create a new `Folder` entity instance. Pass `nil` for no initial data.

#### `History(data map[string]any) TodoistEntity`

Create a new `History` entity instance. Pass `nil` for no initial data.

#### `IdMapping(data map[string]any) TodoistEntity`

Create a new `IdMapping` entity instance. Pass `nil` for no initial data.

#### `Label(data map[string]any) TodoistEntity`

Create a new `Label` entity instance. Pass `nil` for no initial data.

#### `LocationReminder(data map[string]any) TodoistEntity`

Create a new `LocationReminder` entity instance. Pass `nil` for no initial data.

#### `NotificationSetting(data map[string]any) TodoistEntity`

Create a new `NotificationSetting` entity instance. Pass `nil` for no initial data.

#### `PlanDetail(data map[string]any) TodoistEntity`

Create a new `PlanDetail` entity instance. Pass `nil` for no initial data.

#### `ProductivityStat(data map[string]any) TodoistEntity`

Create a new `ProductivityStat` entity instance. Pass `nil` for no initial data.

#### `Project(data map[string]any) TodoistEntity`

Create a new `Project` entity instance. Pass `nil` for no initial data.

#### `ProjectImport(data map[string]any) TodoistEntity`

Create a new `ProjectImport` entity instance. Pass `nil` for no initial data.

#### `ProjectPermission(data map[string]any) TodoistEntity`

Create a new `ProjectPermission` entity instance. Pass `nil` for no initial data.

#### `Reminder(data map[string]any) TodoistEntity`

Create a new `Reminder` entity instance. Pass `nil` for no initial data.

#### `Section(data map[string]any) TodoistEntity`

Create a new `Section` entity instance. Pass `nil` for no initial data.

#### `SharedLabel(data map[string]any) TodoistEntity`

Create a new `SharedLabel` entity instance. Pass `nil` for no initial data.

#### `SubscriptionInfo(data map[string]any) TodoistEntity`

Create a new `SubscriptionInfo` entity instance. Pass `nil` for no initial data.

#### `Task(data map[string]any) TodoistEntity`

Create a new `Task` entity instance. Pass `nil` for no initial data.

#### `Template(data map[string]any) TodoistEntity`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `TopUp(data map[string]any) TodoistEntity`

Create a new `TopUp` entity instance. Pass `nil` for no initial data.

#### `Upload(data map[string]any) TodoistEntity`

Create a new `Upload` entity instance. Pass `nil` for no initial data.

#### `UsageSummary(data map[string]any) TodoistEntity`

Create a new `UsageSummary` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) TodoistEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Workspace(data map[string]any) TodoistEntity`

Create a new `Workspace` entity instance. Pass `nil` for no initial data.

#### `WorkspaceInvitation(data map[string]any) TodoistEntity`

Create a new `WorkspaceInvitation` entity instance. Pass `nil` for no initial data.

#### `WorkspaceProject(data map[string]any) TodoistEntity`

Create a new `WorkspaceProject` entity instance. Pass `nil` for no initial data.

#### `WorkspaceUser(data map[string]any) TodoistEntity`

Create a new `WorkspaceUser` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ActivityEntity

```go
activity := client.Activity(nil)
fmt.Println(activity.GetName()) // "activity"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Activity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BackupEntity

```go
backup := client.Backup(nil)
fmt.Println(backup.GetName()) // "backup"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `string` | Yes | Backup URL |
| `version` | `string` | Yes | Date and time of the backup version |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Backup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Backup(nil).Load(map[string]any{"file": "file"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BackupEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BillingPortalUrlEntity

```go
billingPortalUrl := client.BillingPortalUrl(nil)
fmt.Println(billingPortalUrl.GetName()) // "billing_portal_url"
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BillingPortalUrl(nil).Create(map[string]any{
    "billing_portal_url": "example_billing_portal_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BillingPortalUrlEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CollaboratorEntity

```go
collaborator := client.Collaborator(nil)
fmt.Println(collaborator.GetName()) // "collaborator"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | The user's email address |
| `id` | `string` | Yes | The user's ID |
| `name` | `string` | Yes | The user's full name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Collaborator(nil).List(map[string]any{"project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollaboratorEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CommentEntity

```go
comment := client.Comment(nil)
fmt.Println(comment.GetName()) // "comment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `any` | No | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `content` | `string` | No | Comment content. |
| `file_attachment` | `any` | Yes | File attachment metadata, or `null` when the comment has no attachment. |
| `id` | `string` | Yes | String ID of the comment. |
| `is_deleted` | `bool` | Yes | Whether the comment is deleted. |
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

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Comment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Comment(nil).Load(map[string]any{"id": "comment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Comment(nil).Update(map[string]any{
    "id": "comment_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Comment(nil).Remove(map[string]any{"id": "comment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CompletedTaskEntity

```go
completedTask := client.CompletedTask(nil)
fmt.Println(completedTask.GetName()) // "completed_task"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `bool` | Yes | Whether the task is completed. |
| `child_order` | `int` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Yes | Number of times the task has been marked as completed. |
| `content` | `string` | Yes | Task content. |
| `day_order` | `int` | Yes | Task order for day-based views. |
| `deadline` | `any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `string` | Yes | Task description. |
| `due` | `any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `float64` | Yes | Task duration details, or `null` when the task has no duration. |
| `id` | `string` | Yes | String ID of the task. |
| `is_collapsed` | `bool` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the task is deleted. |
| `labels` | `[]any` | Yes | Names of labels attached to the task. |
| `note_count` | `int` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | Yes | String ID of the user who owns the task. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CompletedTask(nil).List(map[string]any{"since": "example", "until": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompletedTaskEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CreditStateEntity

```go
creditState := client.CreditState(nil)
fmt.Println(creditState.GetName()) // "credit_state"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_amount` | `int` | Yes | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `available_units` | `int` | Yes | Balance net of in-flight holds (`available_cached - held`). |
| `currency` | `string` | Yes | ISO currency code every amount in this response is in. |
| `depleted` | `bool` | Yes | No further runs may start. |
| `is_settled_low_balance` | `bool` | Yes | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `low_balance` | `bool` | Yes | Balance is at or below the low-balance threshold. |
| `settled_amount` | `int` | Yes | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `settled_units` | `int` | Yes | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `usage_allowed` | `bool` | Yes | Whether a new run may start right now. |
| `usage_block_reason` | `any` | Yes | Why a new run cannot start, or `null` when it can. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CreditState(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CreditStateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EmailEntity

```go
email := client.Email(nil)
fmt.Println(email.GetName()) // "email"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | Email address for the Todoist object. |
| `obj_id` | `string` | Yes | String ID of the Todoist object. |
| `obj_type` | `string` | Yes | Type of Todoist object to create an email for. |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Email(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Email(nil).Remove(map[string]any{"obj_id": "obj_id", "obj_type": "obj_type"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## FileUrlEntity

```go
fileUrl := client.FileUrl(nil)
fmt.Println(fileUrl.GetName()) // "file_url"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `string` | Yes | Name of the exported template file. |
| `file_url` | `string` | Yes | Temporary URL for downloading the exported template. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.FileUrl(nil).Load(map[string]any{"project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FileUrlEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## FolderEntity

```go
folder := client.Folder(nil)
fmt.Println(folder.GetName()) // "folder"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_order` | `int` | Yes | User-specific position of the folder. |
| `default_order` | `int` | Yes | Default position of the folder in the workspace. |
| `default_order_key` | `any` | Yes | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `id` | `string` | Yes | String ID of the folder. |
| `is_deleted` | `bool` | Yes | Whether the folder is deleted. |
| `name` | `string` | Yes | Folder name. |
| `workspace_id` | `string` | Yes | String ID of the workspace that contains the folder. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `child_order` | - | - | Yes | - | - |
| `default_order` | - | - | Yes | Yes | - |
| `default_order_key` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_deleted` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `workspace_id` | - | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Folder(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Folder(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Folder(nil).Create(map[string]any{
    "child_order": 1,
    "default_order": 1,
    "default_order_key": "example_default_order_key",
    "id": "example_id",
    "is_deleted": true,
    "name": "example_name",
    "workspace_id": "example_workspace_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Folder(nil).Update(map[string]any{
    "id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Folder(nil).Remove(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FolderEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## HistoryEntity

```go
history := client.History(nil)
fmt.Println(history.GetName()) // "history"
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
| `id` | `int` | Yes | Ledger entry id. |
| `refs` | `map[string]any` | No | Free-form attribution for the entry. |
| `status` | `string` | No | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `type` | `string` | Yes | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.History(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HistoryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## IdMappingEntity

```go
idMapping := client.IdMapping(nil)
fmt.Println(idMapping.GetName()) // "id_mapping"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `new_id` | `string` | Yes | Curent ID for the object. |
| `old_id` | `string` | Yes | Legacy ID for the object. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.IdMapping(nil).List(map[string]any{"obj_id": "example", "obj_name": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IdMappingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LabelEntity

```go
label := client.Label(nil)
fmt.Println(label.GetName()) // "label"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | Yes | Label color name. |
| `id` | `string` | Yes | String ID of the label. |
| `is_favorite` | `bool` | Yes | Whether the label is marked as a favorite. |
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

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Label(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Label(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Label(nil).Update(map[string]any{
    "id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Label(nil).Remove(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LocationReminderEntity

```go
locationReminder := client.LocationReminder(nil)
fmt.Println(locationReminder.GetName()) // "location_reminder"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | String ID of the location reminder |
| `is_deleted` | `bool` | Yes | Whether the location reminder is deleted |
| `item_id` | `string` | Yes | String ID of the task |
| `loc_lat` | `string` | Yes | Latitude of the location |
| `loc_long` | `string` | Yes | Longitude of the location |
| `loc_trigger` | `string` | Yes | Trigger type for the location reminder |
| `name` | `string` | Yes | Name of the location |
| `notify_uid` | `string` | Yes | String ID of the user who will receive the reminder |
| `project_id` | `string` | Yes | String ID of the project containing the task |
| `radius` | `int` | Yes | Radius in meters |
| `task_id` | `string` | Yes | String ID of the task |
| `type` | `string` | No | The reminder type |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `id` | - | - | - | - | - |
| `is_deleted` | - | - | - | - | - |
| `item_id` | - | - | - | - | - |
| `loc_lat` | - | - | - | Yes | - |
| `loc_long` | - | - | - | Yes | - |
| `loc_trigger` | - | - | - | Yes | - |
| `name` | - | - | - | Yes | - |
| `notify_uid` | - | - | - | - | - |
| `project_id` | - | - | - | - | - |
| `radius` | - | - | Yes | Yes | - |
| `task_id` | - | - | - | - | - |
| `type` | - | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LocationReminder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LocationReminder(nil).Load(map[string]any{"id": "location_reminder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LocationReminder(nil).Create(map[string]any{
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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LocationReminder(nil).Update(map[string]any{
    "id": "location_reminder_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LocationReminder(nil).Remove(map[string]any{"id": "location_reminder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocationReminderEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## NotificationSettingEntity

```go
notificationSetting := client.NotificationSetting(nil)
fmt.Println(notificationSetting.GetName()) // "notification_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dont_notify` | `any` | No | Whether notifications should be disabled for the selected type and channel. |
| `notification_type` | `string` | Yes | Notification type to update. |
| `service` | `string` | Yes | Notification channel to update. |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.NotificationSetting(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NotificationSettingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PlanDetailEntity

```go
planDetail := client.PlanDetail(nil)
fmt.Println(planDetail.GetName()) // "plan_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `billing_cycle` | `string` | Yes | Billing cycle for the listed prices. |
| `prices` | `[]any` | Yes | Prices available for the billing cycle. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PlanDetail(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlanDetailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductivityStatEntity

```go
productivityStat := client.ProductivityStat(nil)
fmt.Println(productivityStat.GetName()) // "productivity_stat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_count` | `int` | Yes | Total number of tasks completed by the user (all time) |
| `days_items` | `[]any` | Yes | Daily completion statistics for the last 7 days, ordered chronologically |
| `goals` | `map[string]any` | Yes | User goals, streaks, and productivity settings |
| `karma` | `float64` | Yes | Current karma score |
| `karma_graph_data` | `[]any` | Yes | Historical karma data points for graphing, each containing date and karma_avg |
| `karma_last_update` | `float64` | Yes | Net karma change from the most recent update (positive_karma + negative_karma) |
| `karma_trend` | `string` | Yes | Karma trend indicator ('up' or 'down') |
| `karma_update_reasons` | `[]any` | Yes | Recent karma update events with reasons and amounts |
| `project_colors` | `map[string]any` | Yes | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `week_items` | `[]any` | Yes | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProductivityStat(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductivityStatEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectEntity

```go
project := client.Project(nil)
fmt.Println(project.GetName()) // "project"
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
| `is_collapsed` | `bool` | No | Whether the project is collapsed. |
| `is_favorite` | `bool` | No | Whether the project is a favorite for the user. |
| `name` | `string` | Yes | Name of the project. |
| `next_cursor` | `any` | Yes | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | `string` | No | Parent project ID. |
| `results` | `[]any` | Yes | Objects in the current page of results. |
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

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Project(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Load(map[string]any{"id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Create(map[string]any{
    "name": "example_name",
    "next_cursor": "example_next_cursor",
    "results": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Update(map[string]any{
    "id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Remove(map[string]any{"id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectImportEntity

```go
projectImport := client.ProjectImport(nil)
fmt.Println(projectImport.GetName()) // "project_import"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectImportEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectPermissionEntity

```go
projectPermission := client.ProjectPermission(nil)
fmt.Println(projectPermission.GetName()) // "project_permission"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_collaborator_actions` | `[]any` | Yes | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | `[]any` | Yes | Workspace collaborator roles and their allowed actions. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectPermission(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectPermissionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ReminderEntity

```go
reminder := client.Reminder(nil)
fmt.Println(reminder.GetName()) // "reminder"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `due` | `any` | Yes | Datetime when the reminder fires, or `null` if unset. |
| `id` | `string` | Yes | String ID of the reminder. |
| `is_deleted` | `bool` | Yes | Whether the reminder is deleted. |
| `is_urgent` | `bool` | Yes | Whether the reminder should be delivered urgently. |
| `item_id` | `string` | Yes | String ID of the task that owns the reminder. |
| `minute_offset` | `any` | Yes | Minutes before the task due time for relative reminders. |
| `notify_uid` | `string` | Yes | String ID of the user who receives the reminder. |
| `reminder_type` | `string` | No | Type of the reminder: 'relative' or 'absolute' |
| `service` | `string` | No | Notification service type: 'email', 'push'. |
| `task_id` | `string` | Yes | String ID of the task |
| `type` | `string` | Yes | Reminder type. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `due` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `is_deleted` | - | - | - | - | - |
| `is_urgent` | - | - | Yes | Yes | - |
| `item_id` | - | - | - | - | - |
| `minute_offset` | - | - | Yes | Yes | - |
| `notify_uid` | - | - | - | - | - |
| `reminder_type` | - | - | - | - | - |
| `service` | - | - | - | - | - |
| `task_id` | - | - | - | - | - |
| `type` | - | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Reminder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Reminder(nil).Load(map[string]any{"id": "reminder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Reminder(nil).Create(map[string]any{
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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Reminder(nil).Update(map[string]any{
    "id": "reminder_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Reminder(nil).Remove(map[string]any{"id": "reminder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReminderEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SectionEntity

```go
section := client.Section(nil)
fmt.Println(section.GetName()) // "section"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | Yes | Date and time when the section was created. |
| `archived_at` | `any` | Yes | Date and time when the section was archived, or `null` if it is active. |
| `description` | `string` | Yes | Section description, or `null` if it has none. |
| `id` | `string` | Yes | String ID of the section. |
| `is_archived` | `bool` | Yes | Whether the section is archived. |
| `is_collapsed` | `bool` | Yes | Whether the section is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the section is deleted. |
| `name` | `string` | Yes | Section name. |
| `order` | `any` | No | Position of the new section in the project |
| `order_key` | `any` | Yes | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `string` | Yes | String ID of the project that contains the section. |
| `section_order` | `int` | Yes | Position of the section in the project. |
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

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Section(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Section(nil).Load(map[string]any{"id": "section_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Section(nil).Update(map[string]any{
    "id": "section_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Section(nil).Remove(map[string]any{"id": "section_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SectionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SharedLabelEntity

```go
sharedLabel := client.SharedLabel(nil)
fmt.Println(sharedLabel.GetName()) // "shared_label"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Current shared label name to rename. |
| `new_name` | `string` | Yes | New shared label name to apply to matching tasks. |
| `next_cursor` | `any` | Yes | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `[]any` | Yes | Objects in the current page of results. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.SharedLabel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.SharedLabel(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.SharedLabel(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SharedLabelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SubscriptionInfoEntity

```go
subscriptionInfo := client.SubscriptionInfo(nil)
fmt.Println(subscriptionInfo.GetName()) // "subscription_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation_method` | `string` | Yes | How the active subscription was purchased. |
| `billing_portal_switch_to_annual_url` | `any` | Yes | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `billing_portal_url` | `any` | Yes | One-time URL to the Stripe customer portal, if available. |
| `expiration_date` | `any` | Yes | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `has_billing_portal` | `bool` | Yes | `true` when the user has a Stripe customer with a portal session. |
| `has_billing_portal_switch_to_annual` | `bool` | Yes | `true` when a switch-to-annual flow is available in Stripe. |
| `has_switch_legacy_to_current` | `bool` | Yes | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `invoice_credit_balance` | `any` | Yes | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `plan` | `string` | Yes | Plan tier the user is currently on. |
| `plan_price` | `any` | Yes | Price of the active plan, when known. |
| `status` | `string` | Yes | Current subscription status. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SubscriptionInfoEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TaskEntity

```go
task := client.Task(nil)
fmt.Println(task.GetName()) // "task"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `string` | No | ID of the user to assign the task to. |
| `checked` | `bool` | Yes | Whether the task is completed. |
| `child_order` | `int` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `int` | Yes | Number of times the task has been marked as completed. |
| `content` | `string` | Yes | Task content. |
| `day_order` | `int` | Yes | Task order for day-based views. |
| `deadline` | `any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `any` | No | Deadline date in YYYY-MM-DD format |
| `description` | `string` | Yes | Task description. |
| `due` | `any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `any` | No | Due date in RFC 3339 format or similar. |
| `due_datetime` | `any` | No | Due date and time. |
| `due_lang` | `any` | No | Due date language code. |
| `due_string` | `any` | No | Human-readable representation of the due date. |
| `duration` | `float64` | Yes | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `any` | No | Unit of time for duration. |
| `id` | `string` | Yes | String ID of the task. |
| `is_collapsed` | `bool` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `bool` | Yes | Whether the task is deleted. |
| `labels` | `[]any` | Yes | Names of labels attached to the task. |
| `note_count` | `int` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `any` | No | Position of the task in the project or section |
| `order_key` | `any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `int` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `int` | Yes | Task priority from 1 (normal) to 4 (urgent). |
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

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Task(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Task(nil).Load(map[string]any{"id": "task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Task(nil).Update(map[string]any{
    "id": "task_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Task(nil).Remove(map[string]any{"id": "task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TaskEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TemplateEntity

```go
template := client.Template(nil)
fmt.Println(template.GetName()) // "template"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Template(nil).Load(map[string]any{"project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TopUpEntity

```go
topUp := client.TopUp(nil)
fmt.Println(topUp.GetName()) // "top_up"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `int` | Yes | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | `string` | Yes | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | `string` | Yes | ISO currency code. |
| `return_url` | `string` | Yes | URL Checkout returns the user to. |
| `session_id` | `string` | Yes | The created Stripe Checkout session id. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TopUpEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## UploadEntity

```go
upload := client.Upload(nil)
fmt.Println(upload.GetName()) // "upload"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `string` | Yes | Name of the uploaded file. |
| `file_size` | `int` | Yes | Size of the uploaded file in bytes. |
| `file_type` | `string` | Yes | MIME type of the uploaded file. |
| `file_url` | `string` | Yes | URL of the uploaded file. |
| `image` | `any` | No | Image URL for image uploads, or `null` for non-image files. |
| `image_height` | `any` | No | Image height in pixels, or `null` for non-image files. |
| `image_width` | `any` | No | Image width in pixels, or `null` for non-image files. |
| `resource_type` | `string` | Yes | Detected resource type of the upload. |
| `upload_state` | `string` | No | Upload processing state. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Upload(nil).Remove(map[string]any{"file_url": "file_url"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UploadEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## UsageSummaryEntity

```go
usageSummary := client.UsageSummary(nil)
fmt.Println(usageSummary.GetName()) // "usage_summary"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automation_id` | `string` | Yes | The automation this usage belongs to. |
| `charged_amount` | `int` | Yes | `charged_units` in money, in microdollars. |
| `charged_units` | `int` | Yes | Units the group took off the balance, as a positive number. |
| `description` | `string` | Yes | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | `int` | Yes | How many usage events settled in the group. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.UsageSummary(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UsageSummaryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_user` | `bool` | Yes | Whether the user is considered activated (completed key onboarding actions) |
| `auto_reminder` | `int` | Yes | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `avatar_big` | `any` | No | The link to a 195x195 pixels image of the user's avatar |
| `avatar_medium` | `any` | No | The link to a 60x60 pixels image of the user's avatar |
| `avatar_s640` | `any` | No | The link to a 640x640 pixels image of the user's avatar |
| `avatar_small` | `any` | No | The link to a 35x35 pixels image of the user's avatar |
| `business_account_id` | `string` | No | The ID of the user's business account |
| `completed_count` | `int` | Yes | Total number of tasks completed by user |
| `completed_today` | `int` | Yes | Number of tasks completed today by the user |
| `daily_goal` | `int` | Yes | The daily goal number of completed tasks for karma |
| `date_format` | `int` | Yes | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `days_off` | `[]any` | Yes | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `deleted_at` | `any` | No | Date when user was deleted (ISO 8601 format) |
| `email` | `string` | Yes | User's email address |
| `feature_identifier` | `string` | Yes | Feature identifier for feature flag evaluations |
| `features` | `map[string]any` | Yes | Feature flags and settings for the user |
| `free_trial_expires` | `any` | No | Date when free trial expires (ISO 8601 format) |
| `full_name` | `string` | Yes | The user's real name formatted as Firstname Lastname |
| `getting_started_guide_projects` | `any` | No | List of project IDs for getting started guide |
| `has_magic_number` | `bool` | Yes | Whether the user has reached a magic number milestone |
| `has_password` | `bool` | Yes | Whether the user has a password set on the account. |
| `has_started_a_trial` | `bool` | Yes | Whether the user has ever started a free trial |
| `id` | `string` | Yes | User ID |
| `image_id` | `string` | No | The ID of the user's avatar |
| `inbox_project_id` | `string` | No | The ID of the user's Inbox project |
| `is_celebrations_enabled` | `bool` | Yes | Whether celebration animations are enabled |
| `is_deleted` | `bool` | No | Whether the user is deleted |
| `is_onboarded` | `bool` | No | Composite flag: true once all four onboarded_* criteria above are met. |
| `is_premium` | `bool` | Yes | Whether the user has a Todoist Pro subscription (a true or false value) |
| `joinable_workspace` | `any` | Yes | Information about workspaces the user can join |
| `joined_at` | `any` | No | Date when user joined Todoist (ISO 8601 format) |
| `karma` | `float64` | Yes | The user's karma score |
| `karma_trend` | `any` | No | The user's karma trend. |
| `lang` | `string` | Yes | The user's language |
| `mfa_enabled` | `bool` | Yes | Whether multi-factor authentication is enabled |
| `next_week` | `int` | Yes | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `onboarded_dated_tasks_created` | `any` | No | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `onboarded_desktop_accessed` | `any` | No | True once the user has synced from Web, macOS, or Windows. |
| `onboarded_mobile_accessed` | `any` | No | True once the user has synced from iOS or Android. |
| `onboarded_tasks_completed` | `any` | No | True once the user has completed at least 3 tasks. |
| `onboarding_completed` | `bool` | Yes | Whether the user has completed onboarding |
| `onboarding_initiated` | `bool` | Yes | Whether the user has initiated onboarding |
| `onboarding_level` | `any` | No | User's self-reported skill level during onboarding |
| `onboarding_persona` | `any` | No | User's onboarding persona selection |
| `onboarding_role` | `any` | No | User's role selection during onboarding |
| `onboarding_started` | `bool` | Yes | Whether the user has started onboarding |
| `onboarding_team_mode` | `any` | No | Whether user selected team mode during onboarding |
| `onboarding_use_cases` | `any` | No | Use cases the user selected during onboarding |
| `premium_status` | `any` | No | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `premium_until` | `any` | No | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `share_limit` | `int` | Yes | Maximum number of collaborators allowed in shared projects |
| `sort_order` | `int` | Yes | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `start_day` | `int` | Yes | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `start_page` | `string` | Yes | The user's default view on Todoist. |
| `status` | `any` | No | The user's status, shared across Todoist and Comms. |
| `theme_appearance` | `string` | Yes | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `theme_id` | `string` | Yes | The currently selected Todoist theme (a number between 0 and 13) |
| `time_format` | `any` | No | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `token` | `string` | No | The user's token that should be used to call the other API methods |
| `tz_info` | `map[string]any` | Yes | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `urgent_reminder_device` | `any` | No | The device that should ring urgent reminders. |
| `verification_status` | `string` | Yes | User's email verification status. |
| `websocket_url` | `string` | Yes | WebSocket URL for real-time updates |
| `weekend_start_day` | `int` | Yes | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `weekly_goal` | `int` | Yes | The target number of tasks to complete per week |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkspaceEntity

```go
workspace := client.Workspace(nil)
fmt.Println(workspace.GetName()) // "workspace"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the workspace. |
| `domain_discovery` | `bool` | No | Whether users with matching email domains can discover this workspace. |
| `domain_name` | `any` | No | Workspace email domain. |
| `id` | `string` | No |  |
| `invite_code` | `any` | No | Regenerate workspace invite code when set. |
| `is_collapsed` | `bool` | No | Updated collapse state for current user. |
| `is_guest_allowed` | `bool` | No | Whether guests are allowed in the workspace. |
| `is_link_sharing_enabled` | `bool` | No | Whether link sharing is enabled for the workspace. |
| `is_trial_pending` | `bool` | No | Whether the workspace is waiting for trial confirmation. |
| `name` | `string` | No | Name of the workspace. |
| `properties` | `any` | No | Workspace properties. |
| `restrict_email_domains` | `bool` | No | Whether workspace invites are restricted to workspace domain. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Workspace(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Workspace(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Workspace(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Workspace(nil).Update(map[string]any{
    "id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Workspace(nil).Remove(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkspaceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkspaceInvitationEntity

```go
workspaceInvitation := client.WorkspaceInvitation(nil)
fmt.Println(workspaceInvitation.GetName()) // "workspace_invitation"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.WorkspaceInvitation(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.WorkspaceInvitation(nil).Remove(map[string]any{"id": "workspace_invitation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkspaceInvitationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkspaceProjectEntity

```go
workspaceProject := client.WorkspaceProject(nil)
fmt.Println(workspaceProject.GetName()) // "workspace_project"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `any` | Yes | Project access configuration. |
| `archived_date` | `any` | No | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `int` | No | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `any` | No | Numeric project color code. |
| `default_order` | `int` | No | Default order of the project in workspace views. |
| `default_order_key` | `any` | No | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `string` | No | Project description. |
| `folder_id` | `string` | No | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `any` | No | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `int` | Yes | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `bool` | No | Whether the workspace project is archived. |
| `is_frozen` | `bool` | No | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `bool` | No | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `bool` | No | Whether project insights are enabled for the project. |
| `name` | `string` | No | Project name. |
| `project_id` | `string` | Yes | String ID of the project. |
| `public_access` | `bool` | Yes | Whether the project is publicly accessible. |
| `role` | `any` | No |  |
| `status` | `string` | No | Project status. |
| `view_style` | `string` | No | Project view style. |
| `workspace_id` | `int` | Yes | Numeric ID of the workspace that contains the project. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.WorkspaceProject(nil).List(map[string]any{"workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkspaceProjectEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkspaceUserEntity

```go
workspaceUser := client.WorkspaceUser(nil)
fmt.Println(workspaceUser.GetName()) // "workspace_user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `custom_sorting_applied` | `bool` | No | Whether the user has custom project sorting enabled. |
| `full_name` | `string` | Yes | Full name of the workspace member. |
| `id` | `string` | No |  |
| `image_id` | `string` | No | Avatar image ID of the workspace member, or `null`. |
| `invite_code` | `any` | No | Workspace invite code to join with. |
| `is_deleted` | `bool` | No | Whether the workspace member is deleted. |
| `project_sort_preference` | `string` | No | Project sorting preference for the user. |
| `role` | `string` | No | Workspace role assigned to the user. |
| `timezone` | `string` | Yes | Timezone of the workspace member. |
| `user_email` | `string` | Yes | Email address of the workspace member. |
| `user_id` | `string` | Yes | String ID of the workspace user. |
| `workspace_id` | `string` | Yes | String ID of the workspace. |

### Field Usage by Operation

| Field | list | create | update | remove |
| --- | --- | --- | --- | --- |
| `custom_sorting_applied` | - | - | - | - |
| `full_name` | - | - | - | - |
| `id` | - | - | - | - |
| `image_id` | - | - | - | - |
| `invite_code` | - | - | - | - |
| `is_deleted` | - | - | - | - |
| `project_sort_preference` | - | - | - | - |
| `role` | Yes | - | Yes | - |
| `timezone` | - | - | - | - |
| `user_email` | - | - | - | - |
| `user_id` | - | - | - | - |
| `workspace_id` | - | Yes | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.WorkspaceUser(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.WorkspaceUser(nil).Create(map[string]any{
    "full_name": "example_full_name",
    "timezone": "example_timezone",
    "user_email": "example_user_email",
    "user_id": "example_user_id",
    "workspace_id": "example_workspace_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.WorkspaceUser(nil).Update(map[string]any{
    "id": 1,
    "workspace_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.WorkspaceUser(nil).Remove(map[string]any{"id": 1, "workspace_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkspaceUserEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `paging` | 0.0.1 | Paging |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```go
client := sdk.NewTodoistSDK(map[string]any{
    "feature": map[string]any{
        "paging": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

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

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

