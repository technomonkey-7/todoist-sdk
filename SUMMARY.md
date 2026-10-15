# Todoist API

> # Developing with Todoist
>
> Thanks for your interest in developing apps with Todoist. In this section
> we will provide an overview of the API we offer and cover some common topics for
> application development using them.
>
> You can use our API for free, but depending on your Todoist account plan (or that of the authenticated user), some
> features may be restricted.
>
> Please consider subscribing to the [Todoist API mailing
> list](https://groups.google.com/a/doist.com/g/todoist-api) to get important updates.
>
> ## Our API
>
> Our API uses an approach that should be familiar to anyone with experience
> calling [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) APIs.
>
> We also have a special endpoint called `/sync`, which is used by our
> first-party clients to keep the data updated locally without having to make many
> separate requests to the API. Anyone can use it, and some actions will only be
> available via `/sync`. The format is unconventional compared to current API standards,
> but it is our main driver for first-party apps.
>
> ## Our SDKs
>
> Our Python and JavaScript SDKs streamline working with the Todoist API, and
> can be installed from the main package registries for each ecosystem.
>
> For instructions, examples, and reference documentation, visit their pages:
>
> - [Todoist Python SDK](https://doist.github.io/todoist-api-python/)
> - [Todoist TypeScript SDK](https://doist.github.io/todoist-sdk-typescript/)
>
> ## Resource IDs and optimistic updates
>
> Our first-party clients use optimistic updates so newly-created resources
> (tasks, projects, etc.) are usable in the UI before the server has confirmed
> them. During that window, the resource is referenced by a **client-side
> placeholder ID** with a `tmp-` prefix, for example
> `tmp-UUID-XXXX-UnixMillis`. Once the sync with Todoist completes, the client
> replaces the placeholder with the real server-assigned ID.
>
> **Placeholder IDs are not valid server-side resource identifiers.** If you
> pass a `tmp-`-prefixed ID to a REST endpoint, the request will fail with a
> validation error (for example `Non-base32 digit found`) because the API only
> accepts base32-encoded or numeric IDs (depending on the resource).
>
> If your integration receives a resource ID from a client context (for example a UI
> extension payload or a browser event fired right after task creation), you
> should:
>
> 1. **Detect placeholder IDs early**, any ID starting with `tmp-` has not
>  yet synced.
> 2. **Wait for sync to complete before calling the REST API.** First-party
>  clients expose the real ID once the next `/sync` round-trip returns
>  (see the [`temp_id_mapping`](#tag/Sync/Overview/Temporary-resource-ID)
>  field in the Sync API response).
> 3. **Retry your API call with the confirmed ID** once available. If you
>  cannot wait, surface the delay to the end user rather than calling the
>  REST API with the placeholder.
>
> Note that this client-side `tmp-`-prefixed placeholder is distinct from the
> `temp_id` used in Sync API commands, the latter is a developer-supplied
> UUID that the server resolves inside a single `/sync` request. See the
> [Sync API&#39;s Temporary resource ID documentation](#tag/Sync/Overview/Temporary-resource-ID)
> for details on `temp_id` and `temp_id_mapping`.
>
> ## Integrations
>
> Integrations can be created and updated [here](https://app.todoist.com/app/settings/integrations/app-management).
>
> Once done, they can also be submitted for evaluation and inclusion in [our
> official integrations list](https://www.todoist.com/integrations). This not
> only serves as an opportunity to market your integration to our audience, but
> will also serve as a way to help users get set up and familiar with your app quickly.
>
> For more information on how to submit your integration for evaluation, refer to our [Marketing your integration page](https://www.todoist.com/help/articles/marketing-your-todoist-integration-B6C5sCKkn).
>
> ## Brand usage
>
> When creating with the Todoist platform, you may reference Todoist to describe
> what your app does, but you must keep it clearly distinct from Todoist&#39;s official
> products.
>
> - **Naming:** &quot;Todoist&quot; cannot be the primary name of your app. Use a format
> that signals independence, such as &quot;x for Todoist&quot; or &quot;x with Todoist&quot;.
> - **Disclaimer:** Your application description must state that it is &quot;not
> created by, affiliated with, or supported by Todoist.&quot;
> - **Logo and branding:** Any use of Todoist&#39;s marks must comply with our
> [brand guidelines](https://www.todoist.com/brand-assets/todoist-logo.zip), which are
> available for download.
> - **Legal compliance:** By using Todoist branding you agree to follow our brand
> guidelines and [Terms of Service](https://www.todoist.com/terms-of-service).
>
> For detailed questions about using the Todoist marks, contact
> [press@doist.com](mailto:press@doist.com).
>
> Lost? [Reach out to us](https://www.todoist.com/contact/login?returnTo=%2Fcontact) anytime.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 43 entities and 108 HTTP routes. There are 3 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Active

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `access`: Project access configuration.
- `archived_date`: Date and time when the project was archived, or `null` if active.
- `archived_timestamp`: Unix timestamp for when the project was archived, or 0 if active.
- `color`: Numeric project color code.
- `default_order`: Default order of the project in workspace views.

### Activity

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `event_date`: The timestamp when this activity occurred.
- `event_type`: The type of event that occurred. Valid values are: `&quot;added&quot;` (object was created), `&quot;deleted&quot;` (object was removed), `&quot;updated&quot;` (object was modified), `&quot;archived&quot;` (object was archived), `&quot;unarchived&quot;` (object was restored from archive), `&quot;completed&quot;` (task was completed), `&quot;uncompleted&quot;` (task was marked as incomplete), `&quot;shared&quot;` (project was shared with a user), `&quot;left&quot;` (user left a shared project), `&quot;moved&quot;` (task was moved between projects or between sections).
- `extra_data`: This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date` if an item&#39;s due date changed, the `responsible_uid` and `last_responsible_uid` if an item&#39;s responsible uid changed, the `description` and `last_description` if an item&#39;s description changed, the `priority` and `last_priority` if an item&#39;s priority changed, the `deadline` and `last_deadline` if an item&#39;s deadline changed, the `duration`, `last_duration`, `duration_unit`, and `last_duration_unit` if an item&#39;s duration changed, the `source_project_id` and `destination_project_id` if a task was moved between projects, the `section_id` on completion snapshots and section-move events, the `last_section_id` on section-move events indicating the previous section, and the `client` that caused the logging of the event
- `extra_data_id`: Internal ID for the extra activity data row.
- `id`: The internal unique identifier for this activity log entry.

### Archived

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `access`: Project access configuration.
- `archived_date`: Date and time when the project was archived, or `null` if active.
- `archived_timestamp`: Unix timestamp for when the project was archived, or 0 if active.
- `color`: Numeric project color code.
- `default_order`: Default order of the project in workspace views.

### Authorization

Results: Successful Response.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `token`: The token to be revoked (access token).
- `token_type_hint`: A hint about the type of the token being revoked (optional).

### Backup

Results: Successful Response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `url`: Backup URL
- `version`: Date and time of the backup version

### BillingPortalUrl

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `reason_description`: Human-readable label of the cancellation reason.
- `reason_flag`: Short identifier of the cancellation reason category.
- `reason_text`: Free-form feedback from the user about the cancellation.
- `return_url`: URL the user is redirected to after completing the flow.

### Collaborator

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `email`: The user&#39;s email address
- `id`: The user&#39;s ID
- `name`: The user&#39;s full name

### Comment

Results: Successful Response.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `attachment`: A [File attachment](#tag/Sync/Comments/File-Attachments) object
- `content`: Comment content.
- `file_attachment`: File attachment metadata, or `null` when the comment has no attachment.
- `id`: String ID of the comment.
- `is_deleted`: Whether the comment is deleted.

### CompletedTask

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `added_at`: Date and time when the task was created, or `null` if unknown.
- `added_by_uid`: String ID of the user who created the task, or `null` if unknown.
- `assigned_by_uid`: String ID of the user who assigned the task, or `null` if unassigned.
- `checked`: Whether the task is completed.
- `child_order`: Position of the task among sibling tasks.

### CreditState

Results: Successful Response.

SDK operations: `load`.

Key fields to recognise:

- `available_amount`: `available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726. The scale is exact for every amount this API reports; cents and hundredths of a cent both truncate a single chat message to zero. Converted by the server because the client cannot: the ratio is the account&#39;s pinned price and only the backend holds it.
- `available_units`: Balance net of in-flight holds (`available_cached - held`). The ledger unit, kept for support and reconciliation; display `available_amount` instead. Not a permission to start a run: use `usage_allowed` for that.
- `currency`: ISO currency code every amount in this response is in. Fixed for the life of the account: the first top-up pins the price, and the price fixes the currency. A user who has not topped up yet reads the currency they will be charged in.
- `depleted`: No further runs may start. Equivalent to `usage_allowed` being false.
- `is_settled_low_balance`: Whether the settled balance before in-flight holds is at or below the low-balance threshold.

### Email

Results: Successful Response.

SDK operations: `update`.

Key fields to recognise:

- `email`: Email address for the Todoist object.
- `obj_id`: String ID of the Todoist object.
- `obj_type`: Type of Todoist object to create an email for.

### FileUrl

Results: Successful Response.

SDK operations: `load`.

Key fields to recognise:

- `file_name`: Name of the exported template file.
- `file_url`: Temporary URL for downloading the exported template.

### Folder

Results: Successful Response.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `child_order`: User-specific position of the folder.
- `default_order`: Default position of the folder in the workspace.
- `default_order_key`: Fractional-indexing key for the workspace&#39;s shared default-ordering scope (folders and workspace projects together). `null` until assigned (backfill pending).
- `id`: String ID of the folder.
- `is_deleted`: Whether the folder is deleted.

### History

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `category`: What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`.
- `charged_amount`: `charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274. `null` exactly when `charged_units` is.
- `charged_units`: Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side. `0` is a real value and not an absent one: a run that failed before it reached the provider cost nothing. Not a usage figure on its own: `void`, `expiry` and `chargeback` are debits too, so summing this field across types overstates usage by every reversed grant. Filter on `type` to total usage.
- `created_at`: When the entry was written, UTC.
- `credited_amount`: `credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00. `null` exactly when `credited_units` is.

### IdMapping

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `new_id`: Curent ID for the object.
- `old_id`: Legacy ID for the object.

### Invite

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `app`: For first-party clients usage only.
- `email_list`: List of user emails to invite to the workspace.
- `invited_emails`: Emails successfully invited to the workspace.
- `role`: Role assigned to invited users.

### Label

Results: Successful Response.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `color`: Label color name.
- `id`: String ID of the label.
- `is_favorite`: Whether the label is marked as a favorite.
- `name`: Label name.
- `order`: Position of the label in the label list, or `null` when no explicit order is set.

### LocationReminder

Results: Successful Response.

SDK operations: `remove`.

### MemberView

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `full_name`: Full name of the workspace member.
- `image_id`: Avatar image ID of the workspace member, or `null`.
- `is_deleted`: Whether the workspace member is deleted.
- `role`: Workspace role assigned to the member.
- `timezone`: Timezone of the workspace member.

### MigratePersonalToken

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `access_token`: OAuth access token created from the personal token.
- `client_id`: The unique Client ID of the Todoist application that you registered.
- `client_secret`: The unique Client Secret of the Todoist application that you registered.
- `expires_in`: Access token lifetime in seconds.
- `personal_token`: Token obtained from the email/password authentication.

### NotificationLocationSyncView

Results: Successful Response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `id`: String ID of the location reminder
- `is_deleted`: Whether the location reminder is deleted
- `item_id`: String ID of the task
- `loc_lat`: Latitude of the location
- `loc_long`: Longitude of the location

### NotificationSyncView

Results: Successful Response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `due`: Datetime when the reminder fires, or `null` if unset.
- `id`: String ID of the reminder.
- `is_deleted`: Whether the reminder is deleted.
- `is_urgent`: Whether the reminder should be delivered urgently.
- `item_id`: String ID of the task that owns the reminder.

### PlanDetail

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `billing_cycle`: Billing cycle for the listed prices.
- `prices`: Prices available for the billing cycle.

### ProductivityStat

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `completed_count`: Total number of tasks completed by the user (all time)
- `days_items`: Daily completion statistics for the last 7 days, ordered chronologically
- `goals`: User goals, streaks, and productivity settings
- `karma`: Current karma score
- `karma_graph_data`: Historical karma data points for graphing, each containing date and `karma_avg`

### Project

Results: Successful Response.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `child_order`: Position of the project among sibling projects.
- `color`: Project color name.
- `description`: Project description.
- `folder_id`: String ID of the folder that contains the project, or `null`.
- `icon`: Project icon name, or `null` for the default icon. More icons will be added over time, so clients should fall back to the default icon for names they don&#39;t recognize.

### ProjectImport

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `comments`: Task comments created by the import.
- `discarded_fields`: Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. Empty when nothing was dropped. `reason` says which plan has to change: `workspace_plan_limit` for the workspace the project belongs to, `personal_plan_limit` for the importing user&#39;s own subscription.
- `locale`: Locale to use for localized template content.
- `project_id`: String ID of the project that contains the section.
- `project_notes`: Project comments created by the import.

### ProjectImportCreateResponseWithObject

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `comments`: Task comments created by the import.
- `discarded_fields`: Task properties the importer dropped from one or more imported tasks because the plan in force does not include them. Empty when nothing was dropped. `reason` says which plan has to change: `workspace_plan_limit` for the workspace the project belongs to, `personal_plan_limit` for the importing user&#39;s own subscription.
- `project_id`: ID of the project created from the template.
- `project_notes`: Project comments created by the import.
- `project_view_options_defaults`: View options defaults applied to the imported project.

### Reminder

Results: Successful Response.

SDK operations: `remove`.

### RemoveWorkspaceUser

Results: Successful Response.

SDK operations: `remove`.

### RoleToActionMappingView

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `project_collaborator_actions`: Project collaborator roles and their allowed actions.
- `workspace_collaborator_actions`: Workspace collaborator roles and their allowed actions.

### Section

Results: Successful Response.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `added_at`: Date and time when the section was created.
- `archived_at`: Date and time when the section was archived, or `null` if it is active.
- `description`: Section description, or `null` if it has none.
- `id`: String ID of the section.
- `is_archived`: Whether the section is archived.

### SharedLabel

Results: Successful Response.

SDK operations: `list`, `remove`, `update`.

Key fields to recognise:

- `name`: Current shared label name to rename.
- `new_name`: New shared label name to apply to matching tasks.
- `next_cursor`: Cursor for the next page of results, or `null` when there are no more results.
- `results`: Objects in the current page of results.

### StatusOk

Results: Successful Response.

SDK operations: `remove`.

### SubscriptionInfo

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `activation_method`: How the active subscription was purchased.
- `billing_portal_switch_to_annual_url`: One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible.
- `billing_portal_url`: One-time URL to the Stripe customer portal, if available.
- `expiration_date`: Date the current paid period ends, in `YYYY-MM-DD` format.
- `has_billing_portal`: `true` when the user has a Stripe customer with a portal session.

### Task

Results: Successful Response.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `added_at`: Date and time when the task was created, or `null` if unknown.
- `added_by_uid`: String ID of the user who created the task, or `null` if unknown.
- `assigned_by_uid`: String ID of the user who assigned the task, or `null` if unassigned.
- `assignee_id`: ID of the user to assign the task to.
- `checked`: Whether the task is completed.

### Template

Results: Successful Response.

SDK operations: `load`.

### TopUp

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `amount`: Amount to buy, in the currency&#39;s minor unit (1000 = $10.00).
- `checkout_url`: Hosted Stripe Checkout URL to redirect the user to for payment.
- `currency`: ISO currency code.
- `return_url`: URL Checkout returns the user to.
- `session_id`: The created Stripe Checkout session id.

### Upload

Results: Successful Response.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `file_name`: Name of the uploaded file.
- `file_size`: Size of the uploaded file in bytes.
- `file_type`: MIME type of the uploaded file.
- `file_url`: URL of the uploaded file.
- `image`: Image URL for image uploads, or `null` for non-image files.

### UsageSummary

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `automation_id`: The automation this usage belongs to. Null for usage recorded before runs carried their automation, such as the runs of an automation deleted since, and for test runs of a draft that was never published. Those group by `description` instead.
- `charged_amount`: `charged_units` in money, in microdollars (millionths of one `currency` unit), so 11287800 is $11.2878. Divide by `usage_count` for the per-run figure; guard the zero case, because an account with no usage reports 0 for both.
- `charged_units`: Units those events took off the balance, as a positive number. The ledger unit, kept for support and reconciliation; display `charged_amount` instead. Covers settled usage only, so it is smaller than the sum of `charged_units` over the same window in `/history`, which also carries reversed grants.
- `description`: The label of the newest usage in the group, so a renamed automation shows its current name. Prefer the client&#39;s own name for a known `automation_id`.
- `usage_count`: How many usage events settled in the window. One per unit of billable work: an automation run, or a chat message. Narrow it with `category` to count one kind. A run that failed before it reached the provider counts here and adds 0 to the amounts: it happened, and it cost nothing.

### User

Results: Successful Response.

SDK operations: `list`, `update`.

Key fields to recognise:

- `activated_user`: Whether the user is considered activated (completed key onboarding actions)
- `auto_reminder`: The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task
- `avatar_big`: The link to a 195x195 pixels image of the user&#39;s avatar
- `avatar_medium`: The link to a 60x60 pixels image of the user&#39;s avatar
- `avatar_s640`: The link to a 640x640 pixels image of the user&#39;s avatar

### Workspace

Results: Successful Response.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `description`: Workspace description.
- `domain_discovery`: Whether users with a matching email domain can discover the workspace.
- `domain_name`: Email domain associated with the workspace, or `null`.
- `id`: String ID of the workspace.
- `invite_code`: Opaque code to invite users to the workspace, or `null`.

### WorkspaceInvitationView

Results: Successful Response.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `app`: Product the invitation was sent from.
- `id`: The ID of the invitation
- `inviter_id`: ID of the user user who sent the invitation
- `role`: Workspace role granted by the invitation.
- `user_email`: The invited person&#39;s email.

### WorkspaceUserView

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `custom_sorting_applied`: Whether the user has custom project sorting enabled.
- `invite_code`: Workspace invite code to join with.
- `project_sort_preference`: Project sorting preference for the user.
- `role`: Workspace role assigned to the user.
- `user_id`: String ID of the workspace user.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Active | `list` | `GET /api/v1/workspaces/{workspace_id}/projects/active` | See reference |
| Activity | `list` | `GET /api/v1/activities` | See reference |
| Archived | `list` | `GET /api/v1/workspaces/{workspace_id}/projects/archived` | See reference |
| Authorization | `create` | `POST /api/v1/revoke` | See reference |
| Authorization | `remove` | `DELETE /api/v1/access_tokens` | See reference |
| Backup | `list` | `GET /api/v1/backups` | See reference |
| Backup | `load` | `GET /api/v1/backups/download` | See reference |
| BillingPortalUrl | `create` | `POST /api/v1/payments/cancel_plan_with_redirect_to_stripe` | See reference |
| Collaborator | `list` | `GET /api/v1/projects/{project_id}/collaborators` | See reference |
| Comment | `create` | `POST /api/v1/comments` | See reference |
| Comment | `list` | `GET /api/v1/comments` | See reference |
| Comment | `load` | `GET /api/v1/comments/{comment_id}` | See reference |
| Comment | `remove` | `DELETE /api/v1/comments/{comment_id}` | See reference |
| Comment | `update` | `POST /api/v1/comments/{comment_id}` | See reference |
| Comment | `update` | `POST /api/v1/comments/{comment_id}/reactions` | See reference |
| Comment | `update` | `POST /api/v1/comments/{comment_id}/reactions/remove` | See reference |
| CompletedTask | `list` | `GET /api/v1/tasks/completed/by_completion_date` | See reference |
| CompletedTask | `list` | `GET /api/v1/tasks/completed/by_due_date` | See reference |
| CreditState | `load` | `GET /api/v1/usage_billing/state` | See reference |
| Email | `update` | `PUT /api/v1/emails` | See reference |
| FileUrl | `load` | `GET /api/v1/templates/url` | See reference |
| Folder | `create` | `POST /api/v1/folders/{folder_id}` | See reference |
| Folder | `create` | `POST /api/v1/folders` | See reference |
| Folder | `list` | `GET /api/v1/folders` | See reference |
| Folder | `load` | `GET /api/v1/folders/{folder_id}` | See reference |
| Folder | `remove` | `DELETE /api/v1/folders/{folder_id}` | See reference |
| History | `list` | `GET /api/v1/usage_billing/history` | See reference |
| IdMapping | `list` | `GET /api/v1/id_mappings/{obj_name}/{obj_ids}` | See reference |
| Invite | `create` | `POST /api/v1/workspaces/{workspace_id}/users/invite` | See reference |
| Label | `create` | `POST /api/v1/labels` | See reference |
| Label | `list` | `GET /api/v1/labels/search` | See reference |
| Label | `list` | `GET /api/v1/labels` | See reference |
| Label | `load` | `GET /api/v1/labels/{label_id}` | See reference |
| Label | `remove` | `DELETE /api/v1/labels/{label_id}` | See reference |
| Label | `update` | `POST /api/v1/labels/{label_id}` | See reference |
| LocationReminder | `remove` | `DELETE /api/v1/location_reminders/{reminder_id}` | See reference |
| MemberView | `list` | `GET /api/v1/workspaces/users` | See reference |
| MigratePersonalToken | `create` | `POST /api/v1/access_tokens/migrate_personal_token` | See reference |
| NotificationLocationSyncView | `create` | `POST /api/v1/location_reminders/{reminder_id}` | See reference |
| NotificationLocationSyncView | `create` | `POST /api/v1/location_reminders` | See reference |
| NotificationLocationSyncView | `list` | `GET /api/v1/location_reminders` | See reference |
| NotificationLocationSyncView | `load` | `GET /api/v1/location_reminders/{reminder_id}` | See reference |
| NotificationSyncView | `create` | `POST /api/v1/reminders/{reminder_id}` | See reference |
| NotificationSyncView | `create` | `POST /api/v1/reminders` | See reference |
| NotificationSyncView | `list` | `GET /api/v1/reminders` | See reference |
| NotificationSyncView | `load` | `GET /api/v1/reminders/{reminder_id}` | See reference |
| PlanDetail | `list` | `GET /api/v1/workspaces/plan_details` | See reference |
| ProductivityStat | `list` | `GET /api/v1/tasks/completed/stats` | See reference |
| Project | `create` | `POST /api/v1/projects` | See reference |
| Project | `list` | `GET /api/v1/projects/search` | See reference |
| Project | `list` | `GET /api/v1/projects` | See reference |
| Project | `list` | `GET /api/v1/projects/archived` | See reference |
| Project | `load` | `GET /api/v1/projects/{project_id}` | See reference |
| Project | `remove` | `DELETE /api/v1/projects/{project_id}` | See reference |
| Project | `update` | `POST /api/v1/projects/{project_id}` | See reference |
| Project | `update` | `POST /api/v1/projects/{project_id}/archive` | See reference |
| Project | `update` | `POST /api/v1/projects/{project_id}/join` | See reference |
| Project | `update` | `POST /api/v1/projects/{project_id}/unarchive` | See reference |
| ProjectImport | `create` | `POST /api/v1/templates/import_into_project_from_file` | See reference |
| ProjectImport | `create` | `POST /api/v1/templates/import_into_project_from_template_id` | See reference |
| ProjectImportCreateResponseWithObject | `create` | `POST /api/v1/templates/create_project_from_file` | See reference |
| Reminder | `remove` | `DELETE /api/v1/reminders/{reminder_id}` | See reference |
| RemoveWorkspaceUser | `remove` | `DELETE /api/v1/workspaces/{workspace_id}/users/{user_id}` | See reference |
| RoleToActionMappingView | `list` | `GET /api/v1/projects/permissions` | See reference |
| Section | `create` | `POST /api/v1/sections` | See reference |
| Section | `list` | `GET /api/v1/sections/search` | See reference |
| Section | `list` | `GET /api/v1/sections` | See reference |
| Section | `load` | `GET /api/v1/sections/{section_id}` | See reference |
| Section | `remove` | `DELETE /api/v1/sections/{section_id}` | See reference |
| Section | `update` | `POST /api/v1/sections/{section_id}` | See reference |
| Section | `update` | `POST /api/v1/sections/{section_id}/archive` | See reference |
| Section | `update` | `POST /api/v1/sections/{section_id}/unarchive` | See reference |
| SharedLabel | `list` | `GET /api/v1/labels/shared` | See reference |
| SharedLabel | `remove` | `POST /api/v1/labels/shared/remove` | See reference |
| SharedLabel | `update` | `POST /api/v1/labels/shared/rename` | See reference |
| StatusOk | `remove` | `DELETE /api/v1/emails` | See reference |
| SubscriptionInfo | `create` | `POST /api/v1/payments/get_subscription_info` | See reference |
| SubscriptionInfo | `create` | `POST /api/v1/payments/reactivate_plan` | See reference |
| Task | `create` | `POST /api/v1/tasks` | See reference |
| Task | `create` | `POST /api/v1/tasks/quick` | See reference |
| Task | `list` | `GET /api/v1/tasks/filter` | See reference |
| Task | `list` | `GET /api/v1/tasks` | See reference |
| Task | `load` | `GET /api/v1/tasks/{task_id}` | See reference |
| Task | `remove` | `DELETE /api/v1/tasks/{task_id}` | See reference |
| Task | `update` | `POST /api/v1/tasks/{task_id}` | See reference |
| Task | `update` | `POST /api/v1/tasks/{task_id}/close` | See reference |
| Task | `update` | `POST /api/v1/tasks/{task_id}/move` | See reference |
| Task | `update` | `POST /api/v1/tasks/{task_id}/reopen` | See reference |
| Template | `load` | `GET /api/v1/templates/file` | See reference |
| TopUp | `create` | `POST /api/v1/usage_billing/top_up` | See reference |
| Upload | `create` | `POST /api/v1/uploads` | See reference |
| Upload | `remove` | `DELETE /api/v1/uploads` | See reference |
| UsageSummary | `list` | `GET /api/v1/usage_billing/usage_summary` | See reference |
| User | `list` | `GET /api/v1/user` | See reference |
| User | `update` | `PUT /api/v1/notification_setting` | See reference |
| Workspace | `create` | `POST /api/v1/workspaces/{workspace_id}` | See reference |
| Workspace | `create` | `POST /api/v1/workspaces` | See reference |
| Workspace | `create` | `POST /api/v1/workspaces/logo` | See reference |
| Workspace | `list` | `GET /api/v1/workspaces/invitations` | See reference |
| Workspace | `list` | `GET /api/v1/workspaces` | See reference |
| Workspace | `load` | `GET /api/v1/workspaces/{workspace_id}` | See reference |
| Workspace | `remove` | `DELETE /api/v1/workspaces/{workspace_id}` | See reference |
| WorkspaceInvitationView | `create` | `POST /api/v1/workspaces/invitations/delete` | See reference |
| WorkspaceInvitationView | `list` | `GET /api/v1/workspaces/invitations/all` | See reference |
| WorkspaceInvitationView | `update` | `PUT /api/v1/workspaces/invitations/{invite_code}/accept` | See reference |
| WorkspaceInvitationView | `update` | `PUT /api/v1/workspaces/invitations/{invite_code}/reject` | See reference |
| WorkspaceUserView | `create` | `POST /api/v1/workspaces/{workspace_id}/users/{user_id}` | See reference |
| WorkspaceUserView | `create` | `POST /api/v1/workspaces/join` | See reference |

## Connect to the API

- API server: `https://api.todoist.com/`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `todoist_list`: List records for an entity. Supported entities: `active`, `activity`, `archived`, `backup`, `collaborator`, `comment`, `completed_task`, `folder`, `history`, `id_mapping`, `label`, `member_view`, `notification_location_sync_view`, `notification_sync_view`, `plan_detail`, `productivity_stat`, `project`, `role_to_action_mapping_view`, `section`, `shared_label`, `task`, `usage_summary`, `user`, `workspace`, `workspace_invitation_view`.
- `todoist_load`: Load one record for an entity. Supported entities: `backup`, `comment`, `credit_state`, `file_url`, `folder`, `label`, `notification_location_sync_view`, `notification_sync_view`, `project`, `section`, `task`, `template`, `workspace`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

