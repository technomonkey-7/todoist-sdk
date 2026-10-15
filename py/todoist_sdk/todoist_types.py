# Typed models for the Todoist SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ActivityRequired(TypedDict):
    event_date: str
    event_type: str
    object_id: str
    object_type: str


class Activity(ActivityRequired, total=False):
    extra_data: Any
    extra_data_id: str
    id: str
    initiator_id: str
    parent_item_id: str
    parent_project_id: str


class ActivityListMatch(TypedDict, total=False):
    annotate_note: bool
    annotate_parent: bool
    cursor: Any
    date_from: Any
    date_to: Any
    ensure_last_state: bool
    event_type: Any
    include_child_object: bool
    include_parent_object: bool
    initiator_id: str
    initiator_id_null: Any
    limit: int
    object_event_type: Any
    object_id: str
    object_type: Any
    parent_item_id: str
    parent_project_id: str
    workspace_id: str


class Backup(TypedDict):
    url: str
    version: str


class BackupLoadMatch(TypedDict):
    file: str


class BackupListMatch(TypedDict, total=False):
    mfa_token: Any


class BillingPortalUrlRequired(TypedDict):
    billing_portal_url: str


class BillingPortalUrl(BillingPortalUrlRequired, total=False):
    reason_description: str
    reason_flag: str
    reason_text: str
    return_url: str


class BillingPortalUrlCreateDataRequired(TypedDict):
    billing_portal_url: str


class BillingPortalUrlCreateData(BillingPortalUrlCreateDataRequired, total=False):
    reason_description: str
    reason_flag: str
    reason_text: str
    return_url: str


class Collaborator(TypedDict):
    email: str
    id: str
    name: str


class CollaboratorListMatchRequired(TypedDict):
    project_id: str


class CollaboratorListMatch(CollaboratorListMatchRequired, total=False):
    cursor: Any
    limit: int
    public_key: Any


class CommentRequired(TypedDict):
    file_attachment: Any
    id: str
    is_deleted: bool
    posted_at: Any
    posted_uid: Any
    reactions: Any
    uids_to_notify: Any


class Comment(CommentRequired, total=False):
    attachment: Any
    content: str
    project_id: str
    task_id: str


class CommentLoadMatch(TypedDict):
    id: str


class CommentListMatch(TypedDict, total=False):
    cursor: Any
    limit: int
    project_id: str
    public_key: Any
    task_id: str


class CommentCreateDataRequired(TypedDict):
    file_attachment: Any
    id: str
    is_deleted: bool
    posted_at: Any
    posted_uid: Any
    reactions: Any
    uids_to_notify: Any


class CommentCreateData(CommentCreateDataRequired, total=False):
    attachment: Any
    content: str
    project_id: str
    task_id: str


class CommentUpdateDataRequired(TypedDict):
    id: str


class CommentUpdateData(CommentUpdateDataRequired, total=False):
    attachment: Any
    content: str
    file_attachment: Any
    is_deleted: bool
    posted_at: Any
    posted_uid: Any
    project_id: str
    reactions: Any
    task_id: str
    uids_to_notify: Any


class CommentRemoveMatch(TypedDict):
    id: str


class CompletedTask(TypedDict):
    added_at: Any
    added_by_uid: Any
    assigned_by_uid: Any
    checked: bool
    child_order: int
    completed_at: Any
    completed_by_uid: Any
    completed_count: int
    content: str
    day_order: int
    deadline: Any
    description: str
    due: Any
    duration: float
    id: str
    is_collapsed: bool
    is_deleted: bool
    labels: list
    note_count: int
    order_key: Any
    parent_id: str
    postponed_count: int
    priority: int
    project_id: str
    responsible_uid: Any
    section_id: str
    updated_at: Any
    user_id: str


class CompletedTaskListMatchRequired(TypedDict):
    since: str
    until: str


class CompletedTaskListMatch(CompletedTaskListMatchRequired, total=False):
    cursor: Any
    filter_lang: Any
    filter_query: Any
    limit: int
    parent_id: str
    project_id: str
    public_key: Any
    section_id: str
    workspace_id: str


class CreditState(TypedDict):
    available_amount: int
    available_units: int
    currency: str
    depleted: bool
    is_settled_low_balance: bool
    low_balance: bool
    settled_amount: int
    settled_units: int
    usage_allowed: bool
    usage_block_reason: Any


class CreditStateLoadMatch(TypedDict, total=False):
    product: str


class Email(TypedDict):
    email: str
    obj_id: str
    obj_type: str


class EmailUpdateData(TypedDict, total=False):
    email: str
    obj_id: str
    obj_type: str


class EmailRemoveMatch(TypedDict):
    obj_id: str
    obj_type: str


class FileUrl(TypedDict):
    file_name: str
    file_url: str


class FileUrlLoadMatchRequired(TypedDict):
    project_id: str


class FileUrlLoadMatch(FileUrlLoadMatchRequired, total=False):
    use_relative_date: bool


class Folder(TypedDict):
    child_order: int
    default_order: int
    default_order_key: Any
    id: str
    is_deleted: bool
    name: str
    workspace_id: str


class FolderLoadMatch(TypedDict):
    id: int


class FolderListMatchRequired(TypedDict):
    workspace_id: int


class FolderListMatch(FolderListMatchRequired, total=False):
    cursor: Any
    limit: int


class FolderCreateData(TypedDict):
    child_order: int
    default_order: int
    default_order_key: Any
    id: str
    is_deleted: bool
    name: str
    workspace_id: str


class FolderUpdateDataRequired(TypedDict):
    id: int


class FolderUpdateData(FolderUpdateDataRequired, total=False):
    child_order: int
    default_order: int
    default_order_key: Any
    is_deleted: bool
    name: str
    workspace_id: str


class FolderRemoveMatch(TypedDict):
    id: int


class HistoryRequired(TypedDict):
    charged_amount: Any
    charged_units: Any
    created_at: str
    credited_amount: Any
    credited_units: Any
    id: int
    type: str


class History(HistoryRequired, total=False):
    category: str
    description: str
    refs: dict
    status: str


class HistoryListMatch(TypedDict, total=False):
    cursor: Any
    limit: int
    product: str
    type: Any


class IdMapping(TypedDict):
    new_id: str
    old_id: str


class IdMappingListMatch(TypedDict):
    obj_id: str
    obj_name: str


class Label(TypedDict):
    color: str
    id: str
    is_favorite: bool
    name: str
    order: Any


class LabelLoadMatch(TypedDict):
    id: int


class LabelListMatch(TypedDict, total=False):
    cursor: Any
    limit: int


class LabelCreateData(TypedDict):
    color: str
    id: str
    is_favorite: bool
    name: str
    order: Any


class LabelUpdateDataRequired(TypedDict):
    id: int


class LabelUpdateData(LabelUpdateDataRequired, total=False):
    color: str
    is_favorite: bool
    name: str
    order: Any


class LabelRemoveMatch(TypedDict):
    id: int


class LocationReminderRequired(TypedDict):
    id: str
    is_deleted: bool
    item_id: str
    loc_lat: str
    loc_long: str
    loc_trigger: str
    name: str
    notify_uid: str
    project_id: str
    radius: int
    task_id: str


class LocationReminder(LocationReminderRequired, total=False):
    type: str


class LocationReminderLoadMatch(TypedDict):
    id: str


class LocationReminderListMatch(TypedDict, total=False):
    cursor: Any
    limit: int
    task_id: str


class LocationReminderCreateDataRequired(TypedDict):
    id: str
    is_deleted: bool
    item_id: str
    loc_lat: str
    loc_long: str
    loc_trigger: str
    name: str
    notify_uid: str
    project_id: str
    radius: int
    task_id: str


class LocationReminderCreateData(LocationReminderCreateDataRequired, total=False):
    type: str


class LocationReminderUpdateDataRequired(TypedDict):
    id: str


class LocationReminderUpdateData(LocationReminderUpdateDataRequired, total=False):
    is_deleted: bool
    item_id: str
    loc_lat: str
    loc_long: str
    loc_trigger: str
    name: str
    notify_uid: str
    project_id: str
    radius: int
    task_id: str
    type: str


class LocationReminderRemoveMatch(TypedDict):
    id: str


class NotificationSettingRequired(TypedDict):
    notification_type: str
    service: str


class NotificationSetting(NotificationSettingRequired, total=False):
    dont_notify: Any


class NotificationSettingUpdateData(TypedDict, total=False):
    dont_notify: Any
    notification_type: str
    service: str


class PlanDetail(TypedDict):
    billing_cycle: str
    prices: list


class PlanDetailListMatch(TypedDict):
    workspace_id: int


class ProductivityStat(TypedDict):
    completed_count: int
    days_items: list
    goals: dict
    karma: float
    karma_graph_data: list
    karma_last_update: float
    karma_trend: str
    karma_update_reasons: list
    project_colors: dict
    week_items: list


class ProductivityStatListMatch(TypedDict, total=False):
    completed_count: int
    days_items: list
    goals: dict
    karma: float
    karma_graph_data: list
    karma_last_update: float
    karma_trend: str
    karma_update_reasons: list
    project_colors: dict
    week_items: list


class ProjectRequired(TypedDict):
    name: str
    next_cursor: Any
    results: list


class Project(ProjectRequired, total=False):
    child_order: Any
    color: Any
    description: str
    folder_id: str
    icon: Any
    id: str
    is_collapsed: bool
    is_favorite: bool
    parent_id: str
    view_style: Any
    workspace_id: str


class ProjectLoadMatch(TypedDict):
    id: str


class ProjectListMatch(TypedDict, total=False):
    cursor: Any
    folder_id: str
    limit: int
    workspace_id: str


class ProjectCreateDataRequired(TypedDict):
    name: str
    next_cursor: Any
    results: list


class ProjectCreateData(ProjectCreateDataRequired, total=False):
    child_order: Any
    color: Any
    description: str
    folder_id: str
    icon: Any
    id: str
    is_collapsed: bool
    is_favorite: bool
    parent_id: str
    view_style: Any
    workspace_id: str


class ProjectUpdateDataRequired(TypedDict):
    id: str


class ProjectUpdateData(ProjectUpdateDataRequired, total=False):
    child_order: Any
    color: Any
    description: str
    folder_id: str
    icon: Any
    is_collapsed: bool
    is_favorite: bool
    name: str
    next_cursor: Any
    parent_id: str
    results: list
    view_style: Any
    workspace_id: str


class ProjectRemoveMatch(TypedDict):
    id: str


class ProjectImport(TypedDict):
    pass


class ProjectImportCreateData(TypedDict):
    pass


class ProjectPermission(TypedDict):
    project_collaborator_actions: list
    workspace_collaborator_actions: list


class ProjectPermissionListMatch(TypedDict, total=False):
    project_collaborator_actions: list
    workspace_collaborator_actions: list


class ReminderRequired(TypedDict):
    due: Any
    id: str
    is_deleted: bool
    is_urgent: bool
    item_id: str
    minute_offset: Any
    notify_uid: str
    task_id: str
    type: str


class Reminder(ReminderRequired, total=False):
    reminder_type: str
    service: str


class ReminderLoadMatch(TypedDict):
    id: str


class ReminderListMatch(TypedDict, total=False):
    cursor: Any
    limit: int
    task_id: str


class ReminderCreateDataRequired(TypedDict):
    due: Any
    id: str
    is_deleted: bool
    is_urgent: bool
    item_id: str
    minute_offset: Any
    notify_uid: str
    task_id: str
    type: str


class ReminderCreateData(ReminderCreateDataRequired, total=False):
    reminder_type: str
    service: str


class ReminderUpdateDataRequired(TypedDict):
    id: str


class ReminderUpdateData(ReminderUpdateDataRequired, total=False):
    due: Any
    is_deleted: bool
    is_urgent: bool
    item_id: str
    minute_offset: Any
    notify_uid: str
    reminder_type: str
    service: str
    task_id: str
    type: str


class ReminderRemoveMatch(TypedDict):
    id: str


class SectionRequired(TypedDict):
    added_at: str
    archived_at: Any
    description: str
    id: str
    is_archived: bool
    is_collapsed: bool
    is_deleted: bool
    name: str
    order_key: Any
    project_id: str
    section_order: int
    updated_at: Any
    user_id: str


class Section(SectionRequired, total=False):
    order: Any


class SectionLoadMatchRequired(TypedDict):
    id: str


class SectionLoadMatch(SectionLoadMatchRequired, total=False):
    public_key: Any


class SectionListMatch(TypedDict, total=False):
    cursor: Any
    limit: int
    project_id: str
    public_key: Any
    workspace_id: str


class SectionCreateDataRequired(TypedDict):
    added_at: str
    archived_at: Any
    description: str
    id: str
    is_archived: bool
    is_collapsed: bool
    is_deleted: bool
    name: str
    order_key: Any
    project_id: str
    section_order: int
    updated_at: Any
    user_id: str


class SectionCreateData(SectionCreateDataRequired, total=False):
    order: Any


class SectionUpdateDataRequired(TypedDict):
    id: str


class SectionUpdateData(SectionUpdateDataRequired, total=False):
    added_at: str
    archived_at: Any
    description: str
    is_archived: bool
    is_collapsed: bool
    is_deleted: bool
    name: str
    order: Any
    order_key: Any
    project_id: str
    section_order: int
    updated_at: Any
    user_id: str


class SectionRemoveMatch(TypedDict):
    id: str


class SharedLabel(TypedDict):
    name: str
    new_name: str
    next_cursor: Any
    results: list


class SharedLabelListMatch(TypedDict, total=False):
    cursor: Any
    limit: int
    omit_personal: bool


class SharedLabelUpdateData(TypedDict, total=False):
    name: str
    new_name: str
    next_cursor: Any
    results: list


class SharedLabelRemoveMatch(TypedDict, total=False):
    name: str
    new_name: str
    next_cursor: Any
    results: list


class SubscriptionInfo(TypedDict):
    activation_method: str
    billing_portal_switch_to_annual_url: Any
    billing_portal_url: Any
    expiration_date: Any
    has_billing_portal: bool
    has_billing_portal_switch_to_annual: bool
    has_switch_legacy_to_current: bool
    invoice_credit_balance: Any
    plan: str
    plan_price: Any
    status: str


class SubscriptionInfoCreateData(TypedDict):
    activation_method: str
    billing_portal_switch_to_annual_url: Any
    billing_portal_url: Any
    expiration_date: Any
    has_billing_portal: bool
    has_billing_portal_switch_to_annual: bool
    has_switch_legacy_to_current: bool
    invoice_credit_balance: Any
    plan: str
    plan_price: Any
    status: str


class TaskRequired(TypedDict):
    added_at: Any
    added_by_uid: Any
    assigned_by_uid: Any
    checked: bool
    child_order: int
    completed_at: Any
    completed_by_uid: Any
    completed_count: int
    content: str
    day_order: int
    deadline: Any
    description: str
    due: Any
    duration: float
    id: str
    is_collapsed: bool
    is_deleted: bool
    labels: list
    note_count: int
    order_key: Any
    parent_id: str
    postponed_count: int
    priority: int
    project_id: str
    responsible_uid: Any
    section_id: str
    updated_at: Any
    user_id: str


class Task(TaskRequired, total=False):
    assignee_id: str
    deadline_date: Any
    due_date: Any
    due_datetime: Any
    due_lang: Any
    due_string: Any
    duration_unit: Any
    order: Any


class TaskLoadMatchRequired(TypedDict):
    id: str


class TaskLoadMatch(TaskLoadMatchRequired, total=False):
    public_key: Any


class TaskListMatch(TypedDict, total=False):
    cursor: Any
    ids: Any
    label: str
    limit: int
    parent_id: str
    project_id: str
    section_id: str


class TaskCreateDataRequired(TypedDict):
    added_at: Any
    added_by_uid: Any
    assigned_by_uid: Any
    checked: bool
    child_order: int
    completed_at: Any
    completed_by_uid: Any
    completed_count: int
    content: str
    day_order: int
    deadline: Any
    description: str
    due: Any
    duration: float
    id: str
    is_collapsed: bool
    is_deleted: bool
    labels: list
    note_count: int
    order_key: Any
    parent_id: str
    postponed_count: int
    priority: int
    project_id: str
    responsible_uid: Any
    section_id: str
    updated_at: Any
    user_id: str


class TaskCreateData(TaskCreateDataRequired, total=False):
    assignee_id: str
    deadline_date: Any
    due_date: Any
    due_datetime: Any
    due_lang: Any
    due_string: Any
    duration_unit: Any
    order: Any


class TaskUpdateDataRequired(TypedDict):
    id: str


class TaskUpdateData(TaskUpdateDataRequired, total=False):
    added_at: Any
    added_by_uid: Any
    assigned_by_uid: Any
    assignee_id: str
    checked: bool
    child_order: int
    completed_at: Any
    completed_by_uid: Any
    completed_count: int
    content: str
    day_order: int
    deadline: Any
    deadline_date: Any
    description: str
    due: Any
    due_date: Any
    due_datetime: Any
    due_lang: Any
    due_string: Any
    duration: float
    duration_unit: Any
    is_collapsed: bool
    is_deleted: bool
    labels: list
    note_count: int
    order: Any
    order_key: Any
    parent_id: str
    postponed_count: int
    priority: int
    project_id: str
    responsible_uid: Any
    section_id: str
    updated_at: Any
    user_id: str


class TaskRemoveMatch(TypedDict):
    id: str


class Template(TypedDict):
    pass


class TemplateLoadMatchRequired(TypedDict):
    project_id: str


class TemplateLoadMatch(TemplateLoadMatchRequired, total=False):
    use_relative_date: bool


class TopUp(TypedDict):
    amount: int
    checkout_url: str
    currency: str
    return_url: str
    session_id: str


class TopUpCreateData(TypedDict):
    amount: int
    checkout_url: str
    currency: str
    return_url: str
    session_id: str


class UploadRequired(TypedDict):
    file_name: str
    file_size: int
    file_type: str
    file_url: str
    resource_type: str


class Upload(UploadRequired, total=False):
    image: Any
    image_height: Any
    image_width: Any
    upload_state: str


class UploadCreateDataRequired(TypedDict):
    file_name: str
    file_size: int
    file_type: str
    file_url: str
    resource_type: str


class UploadCreateData(UploadCreateDataRequired, total=False):
    image: Any
    image_height: Any
    image_width: Any
    upload_state: str


class UploadRemoveMatch(TypedDict):
    file_url: str


class UsageSummary(TypedDict):
    automation_id: str
    charged_amount: int
    charged_units: int
    description: str
    usage_count: int


class UsageSummaryListMatch(TypedDict, total=False):
    category: Any
    group_by: Any
    product: str
    since: Any
    until: Any


class UserRequired(TypedDict):
    activated_user: bool
    auto_reminder: int
    completed_count: int
    completed_today: int
    daily_goal: int
    date_format: int
    days_off: list
    email: str
    feature_identifier: str
    features: dict
    full_name: str
    has_magic_number: bool
    has_password: bool
    has_started_a_trial: bool
    id: str
    is_celebrations_enabled: bool
    is_premium: bool
    joinable_workspace: Any
    karma: float
    lang: str
    mfa_enabled: bool
    next_week: int
    onboarding_completed: bool
    onboarding_initiated: bool
    onboarding_started: bool
    share_limit: int
    sort_order: int
    start_day: int
    start_page: str
    theme_appearance: str
    theme_id: str
    tz_info: dict
    verification_status: str
    websocket_url: str
    weekend_start_day: int
    weekly_goal: int


class User(UserRequired, total=False):
    avatar_big: Any
    avatar_medium: Any
    avatar_s640: Any
    avatar_small: Any
    business_account_id: str
    deleted_at: Any
    free_trial_expires: Any
    getting_started_guide_projects: Any
    image_id: str
    inbox_project_id: str
    is_deleted: bool
    is_onboarded: bool
    joined_at: Any
    karma_trend: Any
    onboarded_dated_tasks_created: Any
    onboarded_desktop_accessed: Any
    onboarded_mobile_accessed: Any
    onboarded_tasks_completed: Any
    onboarding_level: Any
    onboarding_persona: Any
    onboarding_role: Any
    onboarding_team_mode: Any
    onboarding_use_cases: Any
    premium_status: Any
    premium_until: Any
    status: Any
    time_format: Any
    token: str
    urgent_reminder_device: Any


class UserLoadMatchRequired(TypedDict):
    id: str


class UserLoadMatch(UserLoadMatchRequired, total=False):
    activated_user: bool
    auto_reminder: int
    avatar_big: Any
    avatar_medium: Any
    avatar_s640: Any
    avatar_small: Any
    business_account_id: str
    completed_count: int
    completed_today: int
    daily_goal: int
    date_format: int
    days_off: list
    deleted_at: Any
    email: str
    feature_identifier: str
    features: dict
    free_trial_expires: Any
    full_name: str
    getting_started_guide_projects: Any
    has_magic_number: bool
    has_password: bool
    has_started_a_trial: bool
    image_id: str
    inbox_project_id: str
    is_celebrations_enabled: bool
    is_deleted: bool
    is_onboarded: bool
    is_premium: bool
    joinable_workspace: Any
    joined_at: Any
    karma: float
    karma_trend: Any
    lang: str
    mfa_enabled: bool
    next_week: int
    onboarded_dated_tasks_created: Any
    onboarded_desktop_accessed: Any
    onboarded_mobile_accessed: Any
    onboarded_tasks_completed: Any
    onboarding_completed: bool
    onboarding_initiated: bool
    onboarding_level: Any
    onboarding_persona: Any
    onboarding_role: Any
    onboarding_started: bool
    onboarding_team_mode: Any
    onboarding_use_cases: Any
    premium_status: Any
    premium_until: Any
    share_limit: int
    sort_order: int
    start_day: int
    start_page: str
    status: Any
    theme_appearance: str
    theme_id: str
    time_format: Any
    token: str
    tz_info: dict
    urgent_reminder_device: Any
    verification_status: str
    websocket_url: str
    weekend_start_day: int
    weekly_goal: int


class Workspace(TypedDict, total=False):
    description: str
    domain_discovery: bool
    domain_name: Any
    id: str
    invite_code: Any
    is_collapsed: bool
    is_guest_allowed: bool
    is_link_sharing_enabled: bool
    is_trial_pending: bool
    name: str
    properties: Any
    restrict_email_domains: bool


class WorkspaceLoadMatch(TypedDict):
    id: int


class WorkspaceListMatch(TypedDict, total=False):
    description: str
    domain_discovery: bool
    domain_name: Any
    id: str
    invite_code: Any
    is_collapsed: bool
    is_guest_allowed: bool
    is_link_sharing_enabled: bool
    is_trial_pending: bool
    name: str
    properties: Any
    restrict_email_domains: bool


class WorkspaceCreateData(TypedDict, total=False):
    description: str
    domain_discovery: bool
    domain_name: Any
    id: str
    invite_code: Any
    is_collapsed: bool
    is_guest_allowed: bool
    is_link_sharing_enabled: bool
    is_trial_pending: bool
    name: str
    properties: Any
    restrict_email_domains: bool


class WorkspaceUpdateDataRequired(TypedDict):
    id: int


class WorkspaceUpdateData(WorkspaceUpdateDataRequired, total=False):
    description: str
    domain_discovery: bool
    domain_name: Any
    invite_code: Any
    is_collapsed: bool
    is_guest_allowed: bool
    is_link_sharing_enabled: bool
    is_trial_pending: bool
    name: str
    properties: Any
    restrict_email_domains: bool


class WorkspaceRemoveMatch(TypedDict):
    id: int


class WorkspaceInvitationRequired(TypedDict):
    inviter_id: str
    role: str
    user_email: str
    workspace_id: str


class WorkspaceInvitation(WorkspaceInvitationRequired, total=False):
    app: str
    id: str


class WorkspaceInvitationListMatch(TypedDict):
    workspace_id: int


class WorkspaceInvitationUpdateDataRequired(TypedDict):
    invite_code: str


class WorkspaceInvitationUpdateData(WorkspaceInvitationUpdateDataRequired, total=False):
    app: str
    id: str
    inviter_id: str
    role: str
    user_email: str
    workspace_id: str


class WorkspaceInvitationRemoveMatchRequired(TypedDict):
    id: str


class WorkspaceInvitationRemoveMatch(WorkspaceInvitationRemoveMatchRequired, total=False):
    app: str
    inviter_id: str
    role: str
    user_email: str
    workspace_id: str


class WorkspaceProjectRequired(TypedDict):
    access: Any
    initiated_by_uid: int
    project_id: str
    public_access: bool
    workspace_id: int


class WorkspaceProject(WorkspaceProjectRequired, total=False):
    archived_date: Any
    archived_timestamp: int
    color: Any
    default_order: int
    default_order_key: Any
    description: str
    folder_id: str
    icon: Any
    is_archived: bool
    is_frozen: bool
    is_invite_only: bool
    is_project_insights_enabled: bool
    name: str
    role: Any
    status: str
    view_style: str


class WorkspaceProjectListMatchRequired(TypedDict):
    workspace_id: int


class WorkspaceProjectListMatch(WorkspaceProjectListMatchRequired, total=False):
    cursor: Any
    limit: int


class WorkspaceUserRequired(TypedDict):
    full_name: str
    timezone: str
    user_email: str
    user_id: str
    workspace_id: str


class WorkspaceUser(WorkspaceUserRequired, total=False):
    custom_sorting_applied: bool
    id: str
    image_id: str
    invite_code: Any
    is_deleted: bool
    project_sort_preference: str
    role: str


class WorkspaceUserListMatch(TypedDict, total=False):
    cursor: Any
    limit: int
    sort: str
    workspace_id: str


class WorkspaceUserCreateDataRequired(TypedDict):
    full_name: str
    timezone: str
    user_email: str
    user_id: str
    workspace_id: str


class WorkspaceUserCreateData(WorkspaceUserCreateDataRequired, total=False):
    custom_sorting_applied: bool
    id: str
    image_id: str
    invite_code: Any
    is_deleted: bool
    project_sort_preference: str
    role: str


class WorkspaceUserUpdateDataRequired(TypedDict):
    id: int
    workspace_id: int


class WorkspaceUserUpdateData(WorkspaceUserUpdateDataRequired, total=False):
    custom_sorting_applied: bool
    full_name: str
    image_id: str
    invite_code: Any
    is_deleted: bool
    project_sort_preference: str
    role: str
    timezone: str
    user_email: str
    user_id: str


class WorkspaceUserRemoveMatch(TypedDict):
    id: int
    workspace_id: int
