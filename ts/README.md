# Todoist TypeScript SDK

Unofficial Todoist API clients for TypeScript, Python and Go, with a CLI and an MCP server, generated from Todoist's OpenAPI definition.

The TypeScript SDK for the Todoist API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Activity()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/technomonkey-7/todoist-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/technomonkey-7/todoist-sdk
npm install ./todoist-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { TodoistSDK } from '@technomonkey-7/todoist-sdk'

const client = new TodoistSDK({
  apikey: process.env.TODOIST_APIKEY,
})
```

### 2. List activity records

`list()` resolves to an array of Activity ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const activitys = await client.Activity().list()

for (const activity of activitys) {
  console.log(activity.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const activitys = await client.Activity().list()
  console.log(activitys.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = TodoistSDK.test()

const activitys = await client.Activity().list()
// activitys is an array of Activity entities, one per mock record
console.log(activitys.map((activity) => activity.data()))
```

You can also use the instance method:

```ts
const client = new TodoistSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Activity()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new TodoistSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### TodoistSDK

#### Constructor

```ts
new TodoistSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Activity(data?)` | `ActivityEntity` | Create an Activity entity instance. |
| `Backup(data?)` | `BackupEntity` | Create a Backup entity instance. |
| `BillingPortalUrl(data?)` | `BillingPortalUrlEntity` | Create a BillingPortalUrl entity instance. |
| `Collaborator(data?)` | `CollaboratorEntity` | Create a Collaborator entity instance. |
| `Comment(data?)` | `CommentEntity` | Create a Comment entity instance. |
| `CompletedTask(data?)` | `CompletedTaskEntity` | Create a CompletedTask entity instance. |
| `CreditState(data?)` | `CreditStateEntity` | Create a CreditState entity instance. |
| `Email(data?)` | `EmailEntity` | Create an Email entity instance. |
| `FileUrl(data?)` | `FileUrlEntity` | Create a FileUrl entity instance. |
| `Folder(data?)` | `FolderEntity` | Create a Folder entity instance. |
| `History(data?)` | `HistoryEntity` | Create a History entity instance. |
| `IdMapping(data?)` | `IdMappingEntity` | Create an IdMapping entity instance. |
| `Label(data?)` | `LabelEntity` | Create a Label entity instance. |
| `LocationReminder(data?)` | `LocationReminderEntity` | Create a LocationReminder entity instance. |
| `NotificationSetting(data?)` | `NotificationSettingEntity` | Create a NotificationSetting entity instance. |
| `PlanDetail(data?)` | `PlanDetailEntity` | Create a PlanDetail entity instance. |
| `ProductivityStat(data?)` | `ProductivityStatEntity` | Create a ProductivityStat entity instance. |
| `Project(data?)` | `ProjectEntity` | Create a Project entity instance. |
| `ProjectImport(data?)` | `ProjectImportEntity` | Create a ProjectImport entity instance. |
| `ProjectPermission(data?)` | `ProjectPermissionEntity` | Create a ProjectPermission entity instance. |
| `Reminder(data?)` | `ReminderEntity` | Create a Reminder entity instance. |
| `Section(data?)` | `SectionEntity` | Create a Section entity instance. |
| `SharedLabel(data?)` | `SharedLabelEntity` | Create a SharedLabel entity instance. |
| `SubscriptionInfo(data?)` | `SubscriptionInfoEntity` | Create a SubscriptionInfo entity instance. |
| `Task(data?)` | `TaskEntity` | Create a Task entity instance. |
| `Template(data?)` | `TemplateEntity` | Create a Template entity instance. |
| `TopUp(data?)` | `TopUpEntity` | Create a TopUp entity instance. |
| `Upload(data?)` | `UploadEntity` | Create an Upload entity instance. |
| `UsageSummary(data?)` | `UsageSummaryEntity` | Create an UsageSummary entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `Workspace(data?)` | `WorkspaceEntity` | Create a Workspace entity instance. |
| `WorkspaceInvitation(data?)` | `WorkspaceInvitationEntity` | Create a WorkspaceInvitation entity instance. |
| `WorkspaceProject(data?)` | `WorkspaceProjectEntity` | Create a WorkspaceProject entity instance. |
| `WorkspaceUser(data?)` | `WorkspaceUserEntity` | Create a WorkspaceUser entity instance. |
| `tester(testopts?, sdkopts?)` | `TodoistSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `TodoistSDK.test(testopts?, sdkopts?)` | `TodoistSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): TodoistSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

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

Operations: list.

API path: `/api/v1/activities`

#### Backup

| Field | Description |
| --- | --- |
| `url` | Backup URL |
| `version` | Date and time of the backup version |

Operations: list, load.

API path: `/api/v1/backups`

#### BillingPortalUrl

| Field | Description |
| --- | --- |
| `billing_portal_url` |  |
| `reason_description` | Human-readable label of the cancellation reason. |
| `reason_flag` | Short identifier of the cancellation reason category. |
| `reason_text` | Free-form feedback from the user about the cancellation. |
| `return_url` | URL the user is redirected to after completing the flow. |

Operations: create.

API path: `/api/v1/payments/cancel_plan_with_redirect_to_stripe`

#### Collaborator

| Field | Description |
| --- | --- |
| `email` | The user's email address |
| `id` | The user's ID |
| `name` | The user's full name |

Operations: list.

API path: `/api/v1/projects/{project_id}/collaborators`

#### Comment

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
| `reactions` | Reaction emoji mapped to user IDs that reacted. |
| `task_id` | String ID of the task |
| `uids_to_notify` | String IDs of users notified by the comment. |

Operations: create, list, load, remove, update.

API path: `/api/v1/comments`

#### CompletedTask

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

Operations: list.

API path: `/api/v1/tasks/completed/by_completion_date`

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

Operations: load.

API path: `/api/v1/usage_billing/state`

#### Email

| Field | Description |
| --- | --- |
| `email` | Email address for the Todoist object. |
| `obj_id` | String ID of the Todoist object. |
| `obj_type` | Type of Todoist object to create an email for. |

Operations: remove, update.

API path: `/api/v1/emails`

#### FileUrl

| Field | Description |
| --- | --- |
| `file_name` | Name of the exported template file. |
| `file_url` | Temporary URL for downloading the exported template. |

Operations: load.

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

Operations: create, list, load, remove, update.

API path: `/api/v1/folders`

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

Operations: list.

API path: `/api/v1/usage_billing/history`

#### IdMapping

| Field | Description |
| --- | --- |
| `new_id` | Curent ID for the object. |
| `old_id` | Legacy ID for the object. |

Operations: list.

API path: `/api/v1/id_mappings/{obj_name}/{obj_ids}`

#### Label

| Field | Description |
| --- | --- |
| `color` | Label color name. |
| `id` | String ID of the label. |
| `is_favorite` | Whether the label is marked as a favorite. |
| `name` | Label name. |
| `order` | Position of the label in the label list, or `null` when no explicit order is set. |

Operations: create, list, load, remove, update.

API path: `/api/v1/labels`

#### LocationReminder

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

Operations: create, list, load, remove, update.

API path: `/api/v1/location_reminders`

#### NotificationSetting

| Field | Description |
| --- | --- |
| `dont_notify` | Whether notifications should be disabled for the selected type and channel. |
| `notification_type` | Notification type to update. |
| `service` | Notification channel to update. |

Operations: update.

API path: `/api/v1/notification_setting`

#### PlanDetail

| Field | Description |
| --- | --- |
| `billing_cycle` | Billing cycle for the listed prices. |
| `prices` | Prices available for the billing cycle. |

Operations: list.

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

Operations: list.

API path: `/api/v1/tasks/completed/stats`

#### Project

| Field | Description |
| --- | --- |
| `child_order` | Updated position of the project in the hierarchy. |
| `color` | Color of the project icon. |
| `description` | Description of the project. |
| `folder_id` | Folder to move the project into. |
| `icon` | Project icon name. |
| `id` |  |
| `is_collapsed` | Whether the project is collapsed. |
| `is_favorite` | Whether the project is a favorite for the user. |
| `name` | Name of the project. |
| `next_cursor` | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | Parent project ID. |
| `results` | Objects in the current page of results. |
| `view_style` | View style of the project. |
| `workspace_id` | Workspace ID. |

Operations: create, list, load, remove, update.

API path: `/api/v1/projects`

#### ProjectImport

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/templates/import_into_project_from_file`

#### ProjectPermission

| Field | Description |
| --- | --- |
| `project_collaborator_actions` | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | Workspace collaborator roles and their allowed actions. |

Operations: list.

API path: `/api/v1/projects/permissions`

#### Reminder

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

Operations: create, list, load, remove, update.

API path: `/api/v1/reminders`

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

Operations: create, list, load, remove, update.

API path: `/api/v1/sections`

#### SharedLabel

| Field | Description |
| --- | --- |
| `name` | Current shared label name to rename. |
| `new_name` | New shared label name to apply to matching tasks. |
| `next_cursor` | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | Objects in the current page of results. |

Operations: list, remove, update.

API path: `/api/v1/labels/shared`

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

Operations: create.

API path: `/api/v1/payments/get_subscription_info`

#### Task

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
| `deadline_date` | Deadline date in YYYY-MM-DD format |
| `description` | Task description. |
| `due` | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | Due date in RFC 3339 format or similar. |
| `due_datetime` | Due date and time. |
| `due_lang` | Due date language code. |
| `due_string` | Human-readable representation of the due date. |
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

Operations: create, list, load, remove, update.

API path: `/api/v1/tasks`

#### Template

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/templates/file`

#### TopUp

| Field | Description |
| --- | --- |
| `amount` | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | ISO currency code. |
| `return_url` | URL Checkout returns the user to. |
| `session_id` | The created Stripe Checkout session id. |

Operations: create.

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

Operations: create, remove.

API path: `/api/v1/uploads`

#### UsageSummary

| Field | Description |
| --- | --- |
| `automation_id` | The automation this usage belongs to. |
| `charged_amount` | `charged_units` in money, in microdollars. |
| `charged_units` | Units the group took off the balance, as a positive number. |
| `description` | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | How many usage events settled in the group. |

Operations: list.

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

Operations: load.

API path: `/api/v1/user`

#### Workspace

| Field | Description |
| --- | --- |
| `description` | Description of the workspace. |
| `domain_discovery` | Whether users with matching email domains can discover this workspace. |
| `domain_name` | Workspace email domain. |
| `id` |  |
| `invite_code` | Regenerate workspace invite code when set. |
| `is_collapsed` | Updated collapse state for current user. |
| `is_guest_allowed` | Whether guests are allowed in the workspace. |
| `is_link_sharing_enabled` | Whether link sharing is enabled for the workspace. |
| `is_trial_pending` | Whether the workspace is waiting for trial confirmation. |
| `name` | Name of the workspace. |
| `properties` | Workspace properties. |
| `restrict_email_domains` | Whether workspace invites are restricted to workspace domain. |

Operations: create, list, load, remove, update.

API path: `/api/v1/workspaces`

#### WorkspaceInvitation

| Field | Description |
| --- | --- |
| `app` | Product the invitation was sent from. |
| `id` | The ID of the invitation |
| `inviter_id` | ID of the user user who sent the invitation |
| `role` | Workspace role granted by the invitation. |
| `user_email` | The invited person's email. |
| `workspace_id` | ID of the workspace |

Operations: list, remove, update.

API path: `/api/v1/workspaces/invitations/all`

#### WorkspaceProject

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

Operations: list.

API path: `/api/v1/workspaces/{workspace_id}/projects/active`

#### WorkspaceUser

| Field | Description |
| --- | --- |
| `custom_sorting_applied` | Whether the user has custom project sorting enabled. |
| `full_name` | Full name of the workspace member. |
| `id` |  |
| `image_id` | Avatar image ID of the workspace member, or `null`. |
| `invite_code` | Workspace invite code to join with. |
| `is_deleted` | Whether the workspace member is deleted. |
| `project_sort_preference` | Project sorting preference for the user. |
| `role` | Workspace role assigned to the user. |
| `timezone` | Timezone of the workspace member. |
| `user_email` | Email address of the workspace member. |
| `user_id` | String ID of the workspace user. |
| `workspace_id` | String ID of the workspace. |

Operations: create, list, remove, update.

API path: `/api/v1/workspaces/{workspace_id}/users/invite`



## Entities


### Activity

Create an instance: `const activity = client.Activity()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const activitys = await client.Activity().list()
```


### Backup

Create an instance: `const backup = client.Backup()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `string` | Backup URL |
| `version` | `string` | Date and time of the backup version |

#### Example: Load

```ts
const backup = await client.Backup().load({ file: 'file' })
```

#### Example: List

```ts
const backups = await client.Backup().list()
```


### BillingPortalUrl

Create an instance: `const billing_portal_url = client.BillingPortalUrl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_portal_url` | `string` |  |
| `reason_description` | `string` | Human-readable label of the cancellation reason. |
| `reason_flag` | `string` | Short identifier of the cancellation reason category. |
| `reason_text` | `string` | Free-form feedback from the user about the cancellation. |
| `return_url` | `string` | URL the user is redirected to after completing the flow. |

#### Example: Create

```ts
const billing_portal_url = await client.BillingPortalUrl().create({
  billing_portal_url: 'example_billing_portal_url',
})
```


### Collaborator

Create an instance: `const collaborator = client.Collaborator()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The user's email address |
| `id` | `string` | The user's ID |
| `name` | `string` | The user's full name |

#### Example: List

```ts
const collaborators = await client.Collaborator().list({ project_id: "example" })
```


### Comment

Create an instance: `const comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `any` | A [File attachment](#tag/Sync/Comments/File-Attachments) object |
| `content` | `string` | Comment content. |
| `file_attachment` | `any` | File attachment metadata, or `null` when the comment has no attachment. |
| `id` | `string` | String ID of the comment. |
| `is_deleted` | `boolean` | Whether the comment is deleted. |
| `posted_at` | `any` | Date and time when the comment was posted, or `null` if unknown. |
| `posted_uid` | `any` | String ID of the user who posted the comment. |
| `project_id` | `string` | String ID of the project |
| `reactions` | `any` | Reaction emoji mapped to user IDs that reacted. |
| `task_id` | `string` | String ID of the task |
| `uids_to_notify` | `any` | String IDs of users notified by the comment. |

#### Example: Load

```ts
const comment = await client.Comment().load({ id: 'comment_id' })
```

#### Example: List

```ts
const comments = await client.Comment().list()
```

#### Example: Create

```ts
const comment = await client.Comment().create({
  file_attachment: 'example_file_attachment',
  id: 'example_id',
  is_deleted: true,
  posted_at: 'example_posted_at',
  posted_uid: 'example_posted_uid',
  reactions: 'example_reactions',
  uids_to_notify: 'example_uids_to_notify',
})
```


### CompletedTask

Create an instance: `const completed_task = client.CompletedTask()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `checked` | `boolean` | Whether the task is completed. |
| `child_order` | `number` | Position of the task among sibling tasks. |
| `completed_at` | `any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `number` | Number of times the task has been marked as completed. |
| `content` | `string` | Task content. |
| `day_order` | `number` | Task order for day-based views. |
| `deadline` | `any` | Deadline details for the task, or `null` when the task has no deadline. |
| `description` | `string` | Task description. |
| `due` | `any` | Due date details for the task, or `null` when the task has no due date. |
| `duration` | `number` | Task duration details, or `null` when the task has no duration. |
| `id` | `string` | String ID of the task. |
| `is_collapsed` | `boolean` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `boolean` | Whether the task is deleted. |
| `labels` | `any[]` | Names of labels attached to the task. |
| `note_count` | `number` | **Deprecated**: only returns 0 and is marked for removal. |
| `order_key` | `any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `number` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `number` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | String ID of the project that contains the task. |
| `responsible_uid` | `any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | String ID of the user who owns the task. |

#### Example: List

```ts
const completed_tasks = await client.CompletedTask().list({ since: "example", until: "example" })
```


### CreditState

Create an instance: `const credit_state = client.CreditState()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_amount` | `number` | `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. |
| `available_units` | `number` | Balance net of in-flight holds (`available_cached - held`). |
| `currency` | `string` | ISO currency code every amount in this response is in. |
| `depleted` | `boolean` | No further runs may start. |
| `is_settled_low_balance` | `boolean` | Whether the settled balance before in-flight holds is at or below the low-balance threshold. |
| `low_balance` | `boolean` | Balance is at or below the low-balance threshold. |
| `settled_amount` | `number` | `settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price. |
| `settled_units` | `number` | Balance after settled credits and debits, before in-flight holds (`available_cached`). |
| `usage_allowed` | `boolean` | Whether a new run may start right now. |
| `usage_block_reason` | `any` | Why a new run cannot start, or `null` when it can. |

#### Example: Load

```ts
const credit_state = await client.CreditState().load()
```


### Email

Create an instance: `const email = client.Email()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | Email address for the Todoist object. |
| `obj_id` | `string` | String ID of the Todoist object. |
| `obj_type` | `string` | Type of Todoist object to create an email for. |


### FileUrl

Create an instance: `const file_url = client.FileUrl()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `string` | Name of the exported template file. |
| `file_url` | `string` | Temporary URL for downloading the exported template. |

#### Example: Load

```ts
const file_url = await client.FileUrl().load({ project_id: 'project_id' })
```


### Folder

Create an instance: `const folder = client.Folder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_order` | `number` | User-specific position of the folder. |
| `default_order` | `number` | Default position of the folder in the workspace. |
| `default_order_key` | `any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `id` | `string` | String ID of the folder. |
| `is_deleted` | `boolean` | Whether the folder is deleted. |
| `name` | `string` | Folder name. |
| `workspace_id` | `string` | String ID of the workspace that contains the folder. |

#### Example: Load

```ts
const folder = await client.Folder().load({ id: 1 })
```

#### Example: List

```ts
const folders = await client.Folder().list({ workspace_id: 1 })
```

#### Example: Create

```ts
const folder = await client.Folder().create({
  child_order: 1,
  default_order: 1,
  default_order_key: 'example_default_order_key',
  id: 'example_id',
  is_deleted: true,
  name: 'example_name',
  workspace_id: 'example_workspace_id',
})
```


### History

Create an instance: `const history = client.History()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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
| `id` | `number` | Ledger entry id. |
| `refs` | `Record<string, any>` | Free-form attribution for the entry. |
| `status` | `string` | Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`. |
| `type` | `string` | What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`. |

#### Example: List

```ts
const historys = await client.History().list()
```


### IdMapping

Create an instance: `const id_mapping = client.IdMapping()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `new_id` | `string` | Curent ID for the object. |
| `old_id` | `string` | Legacy ID for the object. |

#### Example: List

```ts
const id_mappings = await client.IdMapping().list({ obj_id: "example", obj_name: "example" })
```


### Label

Create an instance: `const label = client.Label()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` | Label color name. |
| `id` | `string` | String ID of the label. |
| `is_favorite` | `boolean` | Whether the label is marked as a favorite. |
| `name` | `string` | Label name. |
| `order` | `any` | Position of the label in the label list, or `null` when no explicit order is set. |

#### Example: Load

```ts
const label = await client.Label().load({ id: 1 })
```

#### Example: List

```ts
const labels = await client.Label().list()
```

#### Example: Create

```ts
const label = await client.Label().create({
  color: 'example_color',
  id: 'example_id',
  is_favorite: true,
  name: 'example_name',
  order: 'example_order',
})
```


### LocationReminder

Create an instance: `const location_reminder = client.LocationReminder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | String ID of the location reminder |
| `is_deleted` | `boolean` | Whether the location reminder is deleted |
| `item_id` | `string` | String ID of the task |
| `loc_lat` | `string` | Latitude of the location |
| `loc_long` | `string` | Longitude of the location |
| `loc_trigger` | `string` | Trigger type for the location reminder |
| `name` | `string` | Name of the location |
| `notify_uid` | `string` | String ID of the user who will receive the reminder |
| `project_id` | `string` | String ID of the project containing the task |
| `radius` | `number` | Radius in meters |
| `task_id` | `string` | String ID of the task |
| `type` | `string` | The reminder type |

#### Example: Load

```ts
const location_reminder = await client.LocationReminder().load({ id: 'location_reminder_id' })
```

#### Example: List

```ts
const location_reminders = await client.LocationReminder().list()
```

#### Example: Create

```ts
const location_reminder = await client.LocationReminder().create({
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


### NotificationSetting

Create an instance: `const notification_setting = client.NotificationSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dont_notify` | `any` | Whether notifications should be disabled for the selected type and channel. |
| `notification_type` | `string` | Notification type to update. |
| `service` | `string` | Notification channel to update. |


### PlanDetail

Create an instance: `const plan_detail = client.PlanDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_cycle` | `string` | Billing cycle for the listed prices. |
| `prices` | `any[]` | Prices available for the billing cycle. |

#### Example: List

```ts
const plan_details = await client.PlanDetail().list({ workspace_id: 1 })
```


### ProductivityStat

Create an instance: `const productivity_stat = client.ProductivityStat()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_count` | `number` | Total number of tasks completed by the user (all time) |
| `days_items` | `any[]` | Daily completion statistics for the last 7 days, ordered chronologically |
| `goals` | `Record<string, any>` | User goals, streaks, and productivity settings |
| `karma` | `number` | Current karma score |
| `karma_graph_data` | `any[]` | Historical karma data points for graphing, each containing date and karma_avg |
| `karma_last_update` | `number` | Net karma change from the most recent update (positive_karma + negative_karma) |
| `karma_trend` | `string` | Karma trend indicator ('up' or 'down') |
| `karma_update_reasons` | `any[]` | Recent karma update events with reasons and amounts |
| `project_colors` | `Record<string, any>` | Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'}) |
| `week_items` | `any[]` | Weekly completion statistics for the last 4 weeks, ordered chronologically. |

#### Example: List

```ts
const productivity_stats = await client.ProductivityStat().list()
```


### Project

Create an instance: `const project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_order` | `any` | Updated position of the project in the hierarchy. |
| `color` | `any` | Color of the project icon. |
| `description` | `string` | Description of the project. |
| `folder_id` | `string` | Folder to move the project into. |
| `icon` | `any` | Project icon name. |
| `id` | `string` |  |
| `is_collapsed` | `boolean` | Whether the project is collapsed. |
| `is_favorite` | `boolean` | Whether the project is a favorite for the user. |
| `name` | `string` | Name of the project. |
| `next_cursor` | `any` | Cursor for the next page of results, or `null` when there are no more results. |
| `parent_id` | `string` | Parent project ID. |
| `results` | `any[]` | Objects in the current page of results. |
| `view_style` | `any` | View style of the project. |
| `workspace_id` | `string` | Workspace ID. |

#### Example: Load

```ts
const project = await client.Project().load({ id: 'project_id' })
```

#### Example: List

```ts
const projects = await client.Project().list()
```

#### Example: Create

```ts
const project = await client.Project().create({
  name: 'example_name',
  next_cursor: 'example_next_cursor',
  results: [],
})
```


### ProjectImport

Create an instance: `const project_import = client.ProjectImport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ProjectPermission

Create an instance: `const project_permission = client.ProjectPermission()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_collaborator_actions` | `any[]` | Project collaborator roles and their allowed actions. |
| `workspace_collaborator_actions` | `any[]` | Workspace collaborator roles and their allowed actions. |

#### Example: List

```ts
const project_permissions = await client.ProjectPermission().list()
```


### Reminder

Create an instance: `const reminder = client.Reminder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `due` | `any` | Datetime when the reminder fires, or `null` if unset. |
| `id` | `string` | String ID of the reminder. |
| `is_deleted` | `boolean` | Whether the reminder is deleted. |
| `is_urgent` | `boolean` | Whether the reminder should be delivered urgently. |
| `item_id` | `string` | String ID of the task that owns the reminder. |
| `minute_offset` | `any` | Minutes before the task due time for relative reminders. |
| `notify_uid` | `string` | String ID of the user who receives the reminder. |
| `reminder_type` | `string` | Type of the reminder: 'relative' or 'absolute' |
| `service` | `string` | Notification service type: 'email', 'push'. |
| `task_id` | `string` | String ID of the task |
| `type` | `string` | Reminder type. |

#### Example: Load

```ts
const reminder = await client.Reminder().load({ id: 'reminder_id' })
```

#### Example: List

```ts
const reminders = await client.Reminder().list()
```

#### Example: Create

```ts
const reminder = await client.Reminder().create({
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


### Section

Create an instance: `const section = client.Section()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `string` | Date and time when the section was created. |
| `archived_at` | `any` | Date and time when the section was archived, or `null` if it is active. |
| `description` | `string` | Section description, or `null` if it has none. |
| `id` | `string` | String ID of the section. |
| `is_archived` | `boolean` | Whether the section is archived. |
| `is_collapsed` | `boolean` | Whether the section is collapsed in the user's view. |
| `is_deleted` | `boolean` | Whether the section is deleted. |
| `name` | `string` | Section name. |
| `order` | `any` | Position of the new section in the project |
| `order_key` | `any` | Fractional-indexing order key: sections sort by comparing keys lexicographically within a project. |
| `project_id` | `string` | String ID of the project that contains the section. |
| `section_order` | `number` | Position of the section in the project. |
| `updated_at` | `any` | Date and time when the section was last updated, or `null` if unknown. |
| `user_id` | `string` | String ID of the user who owns the section. |

#### Example: Load

```ts
const section = await client.Section().load({ id: 'section_id' })
```

#### Example: List

```ts
const sections = await client.Section().list()
```

#### Example: Create

```ts
const section = await client.Section().create({
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


### SharedLabel

Create an instance: `const shared_label = client.SharedLabel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Current shared label name to rename. |
| `new_name` | `string` | New shared label name to apply to matching tasks. |
| `next_cursor` | `any` | Cursor for the next page of results, or `null` when there are no more results. |
| `results` | `any[]` | Objects in the current page of results. |

#### Example: List

```ts
const shared_labels = await client.SharedLabel().list()
```


### SubscriptionInfo

Create an instance: `const subscription_info = client.SubscriptionInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_method` | `string` | How the active subscription was purchased. |
| `billing_portal_switch_to_annual_url` | `any` | One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible. |
| `billing_portal_url` | `any` | One-time URL to the Stripe customer portal, if available. |
| `expiration_date` | `any` | Date the current paid period ends, in `YYYY-MM-DD` format. |
| `has_billing_portal` | `boolean` | `true` when the user has a Stripe customer with a portal session. |
| `has_billing_portal_switch_to_annual` | `boolean` | `true` when a switch-to-annual flow is available in Stripe. |
| `has_switch_legacy_to_current` | `boolean` | `true` when the user is eligible to switch from a legacy Pro price to the current one. |
| `invoice_credit_balance` | `any` | Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g. |
| `plan` | `string` | Plan tier the user is currently on. |
| `plan_price` | `any` | Price of the active plan, when known. |
| `status` | `string` | Current subscription status. |

#### Example: Create

```ts
const subscription_info = await client.SubscriptionInfo().create({
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


### Task

Create an instance: `const task = client.Task()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `string` | ID of the user to assign the task to. |
| `checked` | `boolean` | Whether the task is completed. |
| `child_order` | `number` | Position of the task among sibling tasks. |
| `completed_at` | `any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `number` | Number of times the task has been marked as completed. |
| `content` | `string` | Task content. |
| `day_order` | `number` | Task order for day-based views. |
| `deadline` | `any` | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `any` | Deadline date in YYYY-MM-DD format |
| `description` | `string` | Task description. |
| `due` | `any` | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `any` | Due date in RFC 3339 format or similar. |
| `due_datetime` | `any` | Due date and time. |
| `due_lang` | `any` | Due date language code. |
| `due_string` | `any` | Human-readable representation of the due date. |
| `duration` | `number` | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `any` | Unit of time for duration. |
| `id` | `string` | String ID of the task. |
| `is_collapsed` | `boolean` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `boolean` | Whether the task is deleted. |
| `labels` | `any[]` | Names of labels attached to the task. |
| `note_count` | `number` | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `any` | Position of the task in the project or section |
| `order_key` | `any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `number` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `number` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | String ID of the project that contains the task. |
| `responsible_uid` | `any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | String ID of the user who owns the task. |

#### Example: Load

```ts
const task = await client.Task().load({ id: 'task_id' })
```

#### Example: List

```ts
const tasks = await client.Task().list()
```

#### Example: Create

```ts
const task = await client.Task().create({
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


### Template

Create an instance: `const template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const template = await client.Template().load({ project_id: 'project_id' })
```


### TopUp

Create an instance: `const top_up = client.TopUp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Amount to buy, in the currency's minor unit (1000 = $10.00). |
| `checkout_url` | `string` | Hosted Stripe Checkout URL to redirect the user to for payment. |
| `currency` | `string` | ISO currency code. |
| `return_url` | `string` | URL Checkout returns the user to. |
| `session_id` | `string` | The created Stripe Checkout session id. |

#### Example: Create

```ts
const top_up = await client.TopUp().create({
  amount: 1,
  checkout_url: 'example_checkout_url',
  currency: 'example_currency',
  return_url: 'example_return_url',
  session_id: 'example_session_id',
})
```


### Upload

Create an instance: `const upload = client.Upload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `string` | Name of the uploaded file. |
| `file_size` | `number` | Size of the uploaded file in bytes. |
| `file_type` | `string` | MIME type of the uploaded file. |
| `file_url` | `string` | URL of the uploaded file. |
| `image` | `any` | Image URL for image uploads, or `null` for non-image files. |
| `image_height` | `any` | Image height in pixels, or `null` for non-image files. |
| `image_width` | `any` | Image width in pixels, or `null` for non-image files. |
| `resource_type` | `string` | Detected resource type of the upload. |
| `upload_state` | `string` | Upload processing state. |

#### Example: Create

```ts
const upload = await client.Upload().create({
  file_name: 'example_file_name',
  file_size: 1,
  file_type: 'example_file_type',
  file_url: 'example_file_url',
  resource_type: 'example_resource_type',
})
```


### UsageSummary

Create an instance: `const usage_summary = client.UsageSummary()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automation_id` | `string` | The automation this usage belongs to. |
| `charged_amount` | `number` | `charged_units` in money, in microdollars. |
| `charged_units` | `number` | Units the group took off the balance, as a positive number. |
| `description` | `string` | The label of the newest usage in the group, so a renamed automation shows its current name. |
| `usage_count` | `number` | How many usage events settled in the group. |

#### Example: List

```ts
const usage_summarys = await client.UsageSummary().list()
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_user` | `boolean` | Whether the user is considered activated (completed key onboarding actions) |
| `auto_reminder` | `number` | The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task |
| `avatar_big` | `any` | The link to a 195x195 pixels image of the user's avatar |
| `avatar_medium` | `any` | The link to a 60x60 pixels image of the user's avatar |
| `avatar_s640` | `any` | The link to a 640x640 pixels image of the user's avatar |
| `avatar_small` | `any` | The link to a 35x35 pixels image of the user's avatar |
| `business_account_id` | `string` | The ID of the user's business account |
| `completed_count` | `number` | Total number of tasks completed by user |
| `completed_today` | `number` | Number of tasks completed today by the user |
| `daily_goal` | `number` | The daily goal number of completed tasks for karma |
| `date_format` | `number` | Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1) |
| `days_off` | `any[]` | Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `deleted_at` | `any` | Date when user was deleted (ISO 8601 format) |
| `email` | `string` | User's email address |
| `feature_identifier` | `string` | Feature identifier for feature flag evaluations |
| `features` | `Record<string, any>` | Feature flags and settings for the user |
| `free_trial_expires` | `any` | Date when free trial expires (ISO 8601 format) |
| `full_name` | `string` | The user's real name formatted as Firstname Lastname |
| `getting_started_guide_projects` | `any` | List of project IDs for getting started guide |
| `has_magic_number` | `boolean` | Whether the user has reached a magic number milestone |
| `has_password` | `boolean` | Whether the user has a password set on the account. |
| `has_started_a_trial` | `boolean` | Whether the user has ever started a free trial |
| `id` | `string` | User ID |
| `image_id` | `string` | The ID of the user's avatar |
| `inbox_project_id` | `string` | The ID of the user's Inbox project |
| `is_celebrations_enabled` | `boolean` | Whether celebration animations are enabled |
| `is_deleted` | `boolean` | Whether the user is deleted |
| `is_onboarded` | `boolean` | Composite flag: true once all four onboarded_* criteria above are met. |
| `is_premium` | `boolean` | Whether the user has a Todoist Pro subscription (a true or false value) |
| `joinable_workspace` | `any` | Information about workspaces the user can join |
| `joined_at` | `any` | Date when user joined Todoist (ISO 8601 format) |
| `karma` | `number` | The user's karma score |
| `karma_trend` | `any` | The user's karma trend. |
| `lang` | `string` | The user's language |
| `mfa_enabled` | `boolean` | Whether multi-factor authentication is enabled |
| `next_week` | `number` | The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `onboarded_dated_tasks_created` | `any` | True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks). |
| `onboarded_desktop_accessed` | `any` | True once the user has synced from Web, macOS, or Windows. |
| `onboarded_mobile_accessed` | `any` | True once the user has synced from iOS or Android. |
| `onboarded_tasks_completed` | `any` | True once the user has completed at least 3 tasks. |
| `onboarding_completed` | `boolean` | Whether the user has completed onboarding |
| `onboarding_initiated` | `boolean` | Whether the user has initiated onboarding |
| `onboarding_level` | `any` | User's self-reported skill level during onboarding |
| `onboarding_persona` | `any` | User's onboarding persona selection |
| `onboarding_role` | `any` | User's role selection during onboarding |
| `onboarding_started` | `boolean` | Whether the user has started onboarding |
| `onboarding_team_mode` | `any` | Whether user selected team mode during onboarding |
| `onboarding_use_cases` | `any` | Use cases the user selected during onboarding |
| `premium_status` | `any` | Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member |
| `premium_until` | `any` | The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user). |
| `share_limit` | `number` | Maximum number of collaborators allowed in shared projects |
| `sort_order` | `number` | Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1) |
| `start_day` | `number` | The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `start_page` | `string` | The user's default view on Todoist. |
| `status` | `any` | The user's status, shared across Todoist and Comms. |
| `theme_appearance` | `string` | Whether Todoist uses a light theme, a dark theme, or follows the system appearance |
| `theme_id` | `string` | The currently selected Todoist theme (a number between 0 and 13) |
| `time_format` | `any` | Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1) |
| `token` | `string` | The user's token that should be used to call the other API methods |
| `tz_info` | `Record<string, any>` | The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t… |
| `urgent_reminder_device` | `any` | The device that should ring urgent reminders. |
| `verification_status` | `string` | User's email verification status. |
| `websocket_url` | `string` | WebSocket URL for real-time updates |
| `weekend_start_day` | `number` | The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday) |
| `weekly_goal` | `number` | The target number of tasks to complete per week |

#### Example: Load

```ts
const user = await client.User().load({ id: 'user_id' })
```


### Workspace

Create an instance: `const workspace = client.Workspace()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the workspace. |
| `domain_discovery` | `boolean` | Whether users with matching email domains can discover this workspace. |
| `domain_name` | `any` | Workspace email domain. |
| `id` | `string` |  |
| `invite_code` | `any` | Regenerate workspace invite code when set. |
| `is_collapsed` | `boolean` | Updated collapse state for current user. |
| `is_guest_allowed` | `boolean` | Whether guests are allowed in the workspace. |
| `is_link_sharing_enabled` | `boolean` | Whether link sharing is enabled for the workspace. |
| `is_trial_pending` | `boolean` | Whether the workspace is waiting for trial confirmation. |
| `name` | `string` | Name of the workspace. |
| `properties` | `any` | Workspace properties. |
| `restrict_email_domains` | `boolean` | Whether workspace invites are restricted to workspace domain. |

#### Example: Load

```ts
const workspace = await client.Workspace().load({ id: 1 })
```

#### Example: List

```ts
const workspaces = await client.Workspace().list()
```

#### Example: Create

```ts
const workspace = await client.Workspace().create({
})
```


### WorkspaceInvitation

Create an instance: `const workspace_invitation = client.WorkspaceInvitation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

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

```ts
const workspace_invitations = await client.WorkspaceInvitation().list({ workspace_id: 1 })
```


### WorkspaceProject

Create an instance: `const workspace_project = client.WorkspaceProject()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `any` | Project access configuration. |
| `archived_date` | `any` | Date and time when the project was archived, or `null` if active. |
| `archived_timestamp` | `number` | Unix timestamp for when the project was archived, or 0 if active. |
| `color` | `any` | Numeric project color code. |
| `default_order` | `number` | Default order of the project in workspace views. |
| `default_order_key` | `any` | Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together). |
| `description` | `string` | Project description. |
| `folder_id` | `string` | Numeric ID of the folder that contains the project, or `null`. |
| `icon` | `any` | Project icon name, or `null` for the default icon. |
| `initiated_by_uid` | `number` | Numeric ID of the user requesting the workspace project. |
| `is_archived` | `boolean` | Whether the workspace project is archived. |
| `is_frozen` | `boolean` | Whether the project is frozen and cannot be modified. |
| `is_invite_only` | `boolean` | Whether joining the workspace project requires an invitation. |
| `is_project_insights_enabled` | `boolean` | Whether project insights are enabled for the project. |
| `name` | `string` | Project name. |
| `project_id` | `string` | String ID of the project. |
| `public_access` | `boolean` | Whether the project is publicly accessible. |
| `role` | `any` |  |
| `status` | `string` | Project status. |
| `view_style` | `string` | Project view style. |
| `workspace_id` | `number` | Numeric ID of the workspace that contains the project. |

#### Example: List

```ts
const workspace_projects = await client.WorkspaceProject().list({ workspace_id: 1 })
```


### WorkspaceUser

Create an instance: `const workspace_user = client.WorkspaceUser()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `custom_sorting_applied` | `boolean` | Whether the user has custom project sorting enabled. |
| `full_name` | `string` | Full name of the workspace member. |
| `id` | `string` |  |
| `image_id` | `string` | Avatar image ID of the workspace member, or `null`. |
| `invite_code` | `any` | Workspace invite code to join with. |
| `is_deleted` | `boolean` | Whether the workspace member is deleted. |
| `project_sort_preference` | `string` | Project sorting preference for the user. |
| `role` | `string` | Workspace role assigned to the user. |
| `timezone` | `string` | Timezone of the workspace member. |
| `user_email` | `string` | Email address of the workspace member. |
| `user_id` | `string` | String ID of the workspace user. |
| `workspace_id` | `string` | String ID of the workspace. |

#### Example: List

```ts
const workspace_users = await client.WorkspaceUser().list()
```

#### Example: Create

```ts
const workspace_user = await client.WorkspaceUser().create({
  full_name: 'example_full_name',
  timezone: 'example_timezone',
  user_email: 'example_user_email',
  user_id: 'example_user_id',
  workspace_id: 'example_workspace_id',
})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`paging`](#paging) | Paging |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `comment` | `file_attachment` | 4 | 3 levels |
| `project` | `results` | 3 | 9 levels |
| `workspace_project` | `access` | 3 | 4 levels |

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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **PagingFeature**: Paging
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
todoist/
├── src/
│   ├── TodoistSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { TodoistSDK } from '@technomonkey-7/todoist-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const activity = client.Activity()
await activity.list()

// activity.data() now returns the activity data from the last `list`
// activity.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
