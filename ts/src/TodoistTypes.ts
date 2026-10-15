// Typed models for the Todoist SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Activity {
  event_date: string
  event_type: string
  extra_data?: any
  extra_data_id?: string
  id?: string
  initiator_id?: string
  object_id: string
  object_type: string
  parent_item_id?: string
  parent_project_id?: string
}

export interface ActivityListMatch {
  annotate_note?: boolean
  annotate_parent?: boolean
  cursor?: any
  date_from?: any
  date_to?: any
  ensure_last_state?: boolean
  event_type?: any
  include_child_object?: boolean
  include_parent_object?: boolean
  initiator_id?: string
  initiator_id_null?: any
  limit?: number
  object_event_type?: any
  object_id?: string
  object_type?: any
  parent_item_id?: string
  parent_project_id?: string
  workspace_id?: string
}

export interface Backup {
  url: string
  version: string
}

export interface BackupLoadMatch {
  file: string

  // Selects a custom action instead of the plain load:
  //   'download'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BackupListMatch {
  mfa_token?: any
}

export interface BillingPortalUrl {
  billing_portal_url: string
  reason_description?: string
  reason_flag?: string
  reason_text?: string
  return_url?: string
}

export interface BillingPortalUrlCreateData {
  billing_portal_url: string
  reason_description?: string
  reason_flag?: string
  reason_text?: string
  return_url?: string
}

export interface Collaborator {
  email: string
  id: string
  name: string
}

export interface CollaboratorListMatch {
  project_id: string
  cursor?: any
  limit?: number
  public_key?: any
}

export interface Comment {
  attachment?: any
  content?: string
  file_attachment: any
  id: string
  is_deleted: boolean
  posted_at: any
  posted_uid: any
  project_id?: string
  reactions: any
  task_id?: string
  uids_to_notify: any
}

export interface CommentLoadMatch {
  id: string
}

export interface CommentListMatch {
  cursor?: any
  limit?: number
  project_id?: string
  public_key?: any
  task_id?: string
}

export interface CommentCreateData {
  attachment?: any
  content?: string
  file_attachment: any
  id: string
  is_deleted: boolean
  posted_at: any
  posted_uid: any
  project_id?: string
  reactions: any
  task_id?: string
  uids_to_notify: any
}

export interface CommentUpdateData {
  id: string
  attachment?: any
  content?: string
  file_attachment?: any
  is_deleted?: boolean
  posted_at?: any
  posted_uid?: any
  project_id?: string
  reactions?: any
  task_id?: string
  uids_to_notify?: any

  // Selects a custom action instead of the plain update:
  //   'reaction_add' | 'reaction_remove'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CommentRemoveMatch {
  id: string
}

export interface CompletedTask {
  added_at: any
  added_by_uid: any
  assigned_by_uid: any
  checked: boolean
  child_order: number
  completed_at: any
  completed_by_uid: any
  completed_count: number
  content: string
  day_order: number
  deadline: any
  description: string
  due: any
  duration: number
  id: string
  is_collapsed: boolean
  is_deleted: boolean
  labels: any[]
  note_count: number
  order_key: any
  parent_id: string
  postponed_count: number
  priority: number
  project_id: string
  responsible_uid: any
  section_id: string
  updated_at: any
  user_id: string
}

export interface CompletedTaskListMatch {
  cursor?: any
  filter_lang?: any
  filter_query?: any
  limit?: number
  parent_id?: string
  project_id?: string
  public_key?: any
  section_id?: string
  since: string
  until: string
  workspace_id?: string

  // Selects a custom action instead of the plain list:
  //   'by_due_date'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CreditState {
  available_amount: number
  available_units: number
  currency: string
  depleted: boolean
  is_settled_low_balance: boolean
  low_balance: boolean
  settled_amount: number
  settled_units: number
  usage_allowed: boolean
  usage_block_reason: any
}

export interface CreditStateLoadMatch {
  product?: string
}

export interface Email {
  email: string
  obj_id: string
  obj_type: string
}

export interface EmailUpdateData {
  email?: string
  obj_id?: string
  obj_type?: string
}

export interface EmailRemoveMatch {
  obj_id: string
  obj_type: string
}

export interface FileUrl {
  file_name: string
  file_url: string
}

export interface FileUrlLoadMatch {
  project_id: string
  use_relative_date?: boolean
}

export interface Folder {
  child_order: number
  default_order: number
  default_order_key: any
  id: string
  is_deleted: boolean
  name: string
  workspace_id: string
}

export interface FolderLoadMatch {
  id: number
}

export interface FolderListMatch {
  cursor?: any
  limit?: number
  workspace_id: number
}

export interface FolderCreateData {
  child_order: number
  default_order: number
  default_order_key: any
  id: string
  is_deleted: boolean
  name: string
  workspace_id: string
}

export interface FolderUpdateData {
  id: number
  child_order?: number
  default_order?: number
  default_order_key?: any
  is_deleted?: boolean
  name?: string
  workspace_id?: string
}

export interface FolderRemoveMatch {
  id: number
}

export interface History {
  category?: string
  charged_amount: any
  charged_units: any
  created_at: string
  credited_amount: any
  credited_units: any
  description?: string
  id: number
  refs?: Record<string, any>
  status?: string
  type: string
}

export interface HistoryListMatch {
  cursor?: any
  limit?: number
  product?: string
  type?: any
}

export interface IdMapping {
  new_id: string
  old_id: string
}

export interface IdMappingListMatch {
  obj_id: string
  obj_name: string
}

export interface Label {
  color: string
  id: string
  is_favorite: boolean
  name: string
  order: any
}

export interface LabelLoadMatch {
  id: number
}

export interface LabelListMatch {
  cursor?: any
  limit?: number

  // Selects a custom action instead of the plain list:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface LabelCreateData {
  color: string
  id: string
  is_favorite: boolean
  name: string
  order: any
}

export interface LabelUpdateData {
  id: number
  color?: string
  is_favorite?: boolean
  name?: string
  order?: any
}

export interface LabelRemoveMatch {
  id: number
}

export interface LocationReminder {
  id: string
  is_deleted: boolean
  item_id: string
  loc_lat: string
  loc_long: string
  loc_trigger: string
  name: string
  notify_uid: string
  project_id: string
  radius: number
  task_id: string
  type?: string
}

export interface LocationReminderLoadMatch {
  id: string
}

export interface LocationReminderListMatch {
  cursor?: any
  limit?: number
  task_id?: string
}

export interface LocationReminderCreateData {
  id: string
  is_deleted: boolean
  item_id: string
  loc_lat: string
  loc_long: string
  loc_trigger: string
  name: string
  notify_uid: string
  project_id: string
  radius: number
  task_id: string
  type?: string
}

export interface LocationReminderUpdateData {
  id: string
  is_deleted?: boolean
  item_id?: string
  loc_lat?: string
  loc_long?: string
  loc_trigger?: string
  name?: string
  notify_uid?: string
  project_id?: string
  radius?: number
  task_id?: string
  type?: string
}

export interface LocationReminderRemoveMatch {
  id: string
}

export interface NotificationSetting {
  dont_notify?: any
  notification_type: string
  service: string
}

export interface NotificationSettingUpdateData {
  dont_notify?: any
  notification_type?: string
  service?: string
}

export interface PlanDetail {
  billing_cycle: string
  prices: any[]
}

export interface PlanDetailListMatch {
  workspace_id: number
}

export interface ProductivityStat {
  completed_count: number
  days_items: any[]
  goals: Record<string, any>
  karma: number
  karma_graph_data: any[]
  karma_last_update: number
  karma_trend: string
  karma_update_reasons: any[]
  project_colors: Record<string, any>
  week_items: any[]
}

export interface ProductivityStatListMatch {
  completed_count?: number
  days_items?: any[]
  goals?: Record<string, any>
  karma?: number
  karma_graph_data?: any[]
  karma_last_update?: number
  karma_trend?: string
  karma_update_reasons?: any[]
  project_colors?: Record<string, any>
  week_items?: any[]
}

export interface Project {
  child_order?: any
  color?: any
  description?: string
  folder_id?: string
  icon?: any
  id?: string
  is_collapsed?: boolean
  is_favorite?: boolean
  name: string
  next_cursor: any
  parent_id?: string
  results: any[]
  view_style?: any
  workspace_id?: string
}

export interface ProjectLoadMatch {
  id: string
}

export interface ProjectListMatch {
  cursor?: any
  folder_id?: string
  limit?: number
  workspace_id?: string

  // Selects a custom action instead of the plain list:
  //   'archived' | 'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectCreateData {
  child_order?: any
  color?: any
  description?: string
  folder_id?: string
  icon?: any
  id?: string
  is_collapsed?: boolean
  is_favorite?: boolean
  name: string
  next_cursor: any
  parent_id?: string
  results: any[]
  view_style?: any
  workspace_id?: string
}

export interface ProjectUpdateData {
  id: string
  child_order?: any
  color?: any
  description?: string
  folder_id?: string
  icon?: any
  is_collapsed?: boolean
  is_favorite?: boolean
  name?: string
  next_cursor?: any
  parent_id?: string
  results?: any[]
  view_style?: any
  workspace_id?: string

  // Selects a custom action instead of the plain update:
  //   'archive' | 'join' | 'unarchive'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectRemoveMatch {
  id: string
}

export interface ProjectImport {
}

export interface ProjectImportCreateData {

  // Selects a custom action instead of the plain create:
  //   'from_file' | 'from_template' | 'new_project_from_file'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectPermission {
  project_collaborator_actions: any[]
  workspace_collaborator_actions: any[]
}

export interface ProjectPermissionListMatch {
  project_collaborator_actions?: any[]
  workspace_collaborator_actions?: any[]
}

export interface Reminder {
  due: any
  id: string
  is_deleted: boolean
  is_urgent: boolean
  item_id: string
  minute_offset: any
  notify_uid: string
  reminder_type?: string
  service?: string
  task_id: string
  type: string
}

export interface ReminderLoadMatch {
  id: string
}

export interface ReminderListMatch {
  cursor?: any
  limit?: number
  task_id?: string
}

export interface ReminderCreateData {
  due: any
  id: string
  is_deleted: boolean
  is_urgent: boolean
  item_id: string
  minute_offset: any
  notify_uid: string
  reminder_type?: string
  service?: string
  task_id: string
  type: string
}

export interface ReminderUpdateData {
  id: string
  due?: any
  is_deleted?: boolean
  is_urgent?: boolean
  item_id?: string
  minute_offset?: any
  notify_uid?: string
  reminder_type?: string
  service?: string
  task_id?: string
  type?: string
}

export interface ReminderRemoveMatch {
  id: string
}

export interface Section {
  added_at: string
  archived_at: any
  description: string
  id: string
  is_archived: boolean
  is_collapsed: boolean
  is_deleted: boolean
  name: string
  order?: any
  order_key: any
  project_id: string
  section_order: number
  updated_at: any
  user_id: string
}

export interface SectionLoadMatch {
  id: string
  public_key?: any
}

export interface SectionListMatch {
  cursor?: any
  limit?: number
  project_id?: string
  public_key?: any
  workspace_id?: string

  // Selects a custom action instead of the plain list:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SectionCreateData {
  added_at: string
  archived_at: any
  description: string
  id: string
  is_archived: boolean
  is_collapsed: boolean
  is_deleted: boolean
  name: string
  order?: any
  order_key: any
  project_id: string
  section_order: number
  updated_at: any
  user_id: string
}

export interface SectionUpdateData {
  id: string
  added_at?: string
  archived_at?: any
  description?: string
  is_archived?: boolean
  is_collapsed?: boolean
  is_deleted?: boolean
  name?: string
  order?: any
  order_key?: any
  project_id?: string
  section_order?: number
  updated_at?: any
  user_id?: string

  // Selects a custom action instead of the plain update:
  //   'archive' | 'unarchive'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SectionRemoveMatch {
  id: string
}

export interface SharedLabel {
  name: string
  new_name: string
  next_cursor: any
  results: any[]
}

export interface SharedLabelListMatch {
  cursor?: any
  limit?: number
  omit_personal?: boolean
}

export interface SharedLabelUpdateData {
  name?: string
  new_name?: string
  next_cursor?: any
  results?: any[]
}

export interface SharedLabelRemoveMatch {
  name?: string
  new_name?: string
  next_cursor?: any
  results?: any[]
}

export interface SubscriptionInfo {
  activation_method: string
  billing_portal_switch_to_annual_url: any
  billing_portal_url: any
  expiration_date: any
  has_billing_portal: boolean
  has_billing_portal_switch_to_annual: boolean
  has_switch_legacy_to_current: boolean
  invoice_credit_balance: any
  plan: string
  plan_price: any
  status: string
}

export interface SubscriptionInfoCreateData {
  activation_method: string
  billing_portal_switch_to_annual_url: any
  billing_portal_url: any
  expiration_date: any
  has_billing_portal: boolean
  has_billing_portal_switch_to_annual: boolean
  has_switch_legacy_to_current: boolean
  invoice_credit_balance: any
  plan: string
  plan_price: any
  status: string

  // Selects a custom action instead of the plain create:
  //   'reactivate_plan'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Task {
  added_at: any
  added_by_uid: any
  assigned_by_uid: any
  assignee_id?: string
  checked: boolean
  child_order: number
  completed_at: any
  completed_by_uid: any
  completed_count: number
  content: string
  day_order: number
  deadline: any
  deadline_date?: any
  description: string
  due: any
  due_date?: any
  due_datetime?: any
  due_lang?: any
  due_string?: any
  duration: number
  duration_unit?: any
  id: string
  is_collapsed: boolean
  is_deleted: boolean
  labels: any[]
  note_count: number
  order?: any
  order_key: any
  parent_id: string
  postponed_count: number
  priority: number
  project_id: string
  responsible_uid: any
  section_id: string
  updated_at: any
  user_id: string
}

export interface TaskLoadMatch {
  id: string
  public_key?: any
}

export interface TaskListMatch {
  cursor?: any
  ids?: any
  label?: string
  limit?: number
  parent_id?: string
  project_id?: string
  section_id?: string

  // Selects a custom action instead of the plain list:
  //   'filter'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TaskCreateData {
  added_at: any
  added_by_uid: any
  assigned_by_uid: any
  assignee_id?: string
  checked: boolean
  child_order: number
  completed_at: any
  completed_by_uid: any
  completed_count: number
  content: string
  day_order: number
  deadline: any
  deadline_date?: any
  description: string
  due: any
  due_date?: any
  due_datetime?: any
  due_lang?: any
  due_string?: any
  duration: number
  duration_unit?: any
  id: string
  is_collapsed: boolean
  is_deleted: boolean
  labels: any[]
  note_count: number
  order?: any
  order_key: any
  parent_id: string
  postponed_count: number
  priority: number
  project_id: string
  responsible_uid: any
  section_id: string
  updated_at: any
  user_id: string

  // Selects a custom action instead of the plain create:
  //   'quick'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TaskUpdateData {
  id: string
  added_at?: any
  added_by_uid?: any
  assigned_by_uid?: any
  assignee_id?: string
  checked?: boolean
  child_order?: number
  completed_at?: any
  completed_by_uid?: any
  completed_count?: number
  content?: string
  day_order?: number
  deadline?: any
  deadline_date?: any
  description?: string
  due?: any
  due_date?: any
  due_datetime?: any
  due_lang?: any
  due_string?: any
  duration?: number
  duration_unit?: any
  is_collapsed?: boolean
  is_deleted?: boolean
  labels?: any[]
  note_count?: number
  order?: any
  order_key?: any
  parent_id?: string
  postponed_count?: number
  priority?: number
  project_id?: string
  responsible_uid?: any
  section_id?: string
  updated_at?: any
  user_id?: string

  // Selects a custom action instead of the plain update:
  //   'close' | 'move' | 'reopen'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TaskRemoveMatch {
  id: string
}

export interface Template {
}

export interface TemplateLoadMatch {
  project_id: string
  use_relative_date?: boolean

  // Selects a custom action instead of the plain load:
  //   'file'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TopUp {
  amount: number
  checkout_url: string
  currency: string
  return_url: string
  session_id: string
}

export interface TopUpCreateData {
  amount: number
  checkout_url: string
  currency: string
  return_url: string
  session_id: string
}

export interface Upload {
  file_name: string
  file_size: number
  file_type: string
  file_url: string
  image?: any
  image_height?: any
  image_width?: any
  resource_type: string
  upload_state?: string
}

export interface UploadCreateData {
  file_name: string
  file_size: number
  file_type: string
  file_url: string
  image?: any
  image_height?: any
  image_width?: any
  resource_type: string
  upload_state?: string
}

export interface UploadRemoveMatch {
  file_url: string
}

export interface UsageSummary {
  automation_id: string
  charged_amount: number
  charged_units: number
  description: string
  usage_count: number
}

export interface UsageSummaryListMatch {
  category?: any
  group_by?: any
  product?: string
  since?: any
  until?: any
}

export interface User {
  activated_user: boolean
  auto_reminder: number
  avatar_big?: any
  avatar_medium?: any
  avatar_s640?: any
  avatar_small?: any
  business_account_id?: string
  completed_count: number
  completed_today: number
  daily_goal: number
  date_format: number
  days_off: any[]
  deleted_at?: any
  email: string
  feature_identifier: string
  features: Record<string, any>
  free_trial_expires?: any
  full_name: string
  getting_started_guide_projects?: any
  has_magic_number: boolean
  has_password: boolean
  has_started_a_trial: boolean
  id: string
  image_id?: string
  inbox_project_id?: string
  is_celebrations_enabled: boolean
  is_deleted?: boolean
  is_onboarded?: boolean
  is_premium: boolean
  joinable_workspace: any
  joined_at?: any
  karma: number
  karma_trend?: any
  lang: string
  mfa_enabled: boolean
  next_week: number
  onboarded_dated_tasks_created?: any
  onboarded_desktop_accessed?: any
  onboarded_mobile_accessed?: any
  onboarded_tasks_completed?: any
  onboarding_completed: boolean
  onboarding_initiated: boolean
  onboarding_level?: any
  onboarding_persona?: any
  onboarding_role?: any
  onboarding_started: boolean
  onboarding_team_mode?: any
  onboarding_use_cases?: any
  premium_status?: any
  premium_until?: any
  share_limit: number
  sort_order: number
  start_day: number
  start_page: string
  status?: any
  theme_appearance: string
  theme_id: string
  time_format?: any
  token?: string
  tz_info: Record<string, any>
  urgent_reminder_device?: any
  verification_status: string
  websocket_url: string
  weekend_start_day: number
  weekly_goal: number
}

export interface UserLoadMatch {
  activated_user?: boolean
  auto_reminder?: number
  avatar_big?: any
  avatar_medium?: any
  avatar_s640?: any
  avatar_small?: any
  business_account_id?: string
  completed_count?: number
  completed_today?: number
  daily_goal?: number
  date_format?: number
  days_off?: any[]
  deleted_at?: any
  email?: string
  feature_identifier?: string
  features?: Record<string, any>
  free_trial_expires?: any
  full_name?: string
  getting_started_guide_projects?: any
  has_magic_number?: boolean
  has_password?: boolean
  has_started_a_trial?: boolean
  id: string
  image_id?: string
  inbox_project_id?: string
  is_celebrations_enabled?: boolean
  is_deleted?: boolean
  is_onboarded?: boolean
  is_premium?: boolean
  joinable_workspace?: any
  joined_at?: any
  karma?: number
  karma_trend?: any
  lang?: string
  mfa_enabled?: boolean
  next_week?: number
  onboarded_dated_tasks_created?: any
  onboarded_desktop_accessed?: any
  onboarded_mobile_accessed?: any
  onboarded_tasks_completed?: any
  onboarding_completed?: boolean
  onboarding_initiated?: boolean
  onboarding_level?: any
  onboarding_persona?: any
  onboarding_role?: any
  onboarding_started?: boolean
  onboarding_team_mode?: any
  onboarding_use_cases?: any
  premium_status?: any
  premium_until?: any
  share_limit?: number
  sort_order?: number
  start_day?: number
  start_page?: string
  status?: any
  theme_appearance?: string
  theme_id?: string
  time_format?: any
  token?: string
  tz_info?: Record<string, any>
  urgent_reminder_device?: any
  verification_status?: string
  websocket_url?: string
  weekend_start_day?: number
  weekly_goal?: number
}

export interface Workspace {
  description?: string
  domain_discovery?: boolean
  domain_name?: any
  id?: string
  invite_code?: any
  is_collapsed?: boolean
  is_guest_allowed?: boolean
  is_link_sharing_enabled?: boolean
  is_trial_pending?: boolean
  name?: string
  properties?: any
  restrict_email_domains?: boolean
}

export interface WorkspaceLoadMatch {
  id: number
}

export interface WorkspaceListMatch {
  description?: string
  domain_discovery?: boolean
  domain_name?: any
  id?: string
  invite_code?: any
  is_collapsed?: boolean
  is_guest_allowed?: boolean
  is_link_sharing_enabled?: boolean
  is_trial_pending?: boolean
  name?: string
  properties?: any
  restrict_email_domains?: boolean

  // Selects a custom action instead of the plain list:
  //   'invitation'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorkspaceCreateData {
  description?: string
  domain_discovery?: boolean
  domain_name?: any
  id?: string
  invite_code?: any
  is_collapsed?: boolean
  is_guest_allowed?: boolean
  is_link_sharing_enabled?: boolean
  is_trial_pending?: boolean
  name?: string
  properties?: any
  restrict_email_domains?: boolean

  // Selects a custom action instead of the plain create:
  //   'logo'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorkspaceUpdateData {
  id: number
  description?: string
  domain_discovery?: boolean
  domain_name?: any
  invite_code?: any
  is_collapsed?: boolean
  is_guest_allowed?: boolean
  is_link_sharing_enabled?: boolean
  is_trial_pending?: boolean
  name?: string
  properties?: any
  restrict_email_domains?: boolean
}

export interface WorkspaceRemoveMatch {
  id: number
}

export interface WorkspaceInvitation {
  app?: string
  id?: string
  inviter_id: string
  role: string
  user_email: string
  workspace_id: string
}

export interface WorkspaceInvitationListMatch {
  workspace_id: number
}

export interface WorkspaceInvitationUpdateData {
  invite_code: string
  app?: string
  id?: string
  inviter_id?: string
  role?: string
  user_email?: string
  workspace_id?: string

  // Selects a custom action instead of the plain update:
  //   'accept' | 'reject'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorkspaceInvitationRemoveMatch {
  app?: string
  id: string
  inviter_id?: string
  role?: string
  user_email?: string
  workspace_id?: string
}

export interface WorkspaceProject {
  access: any
  archived_date?: any
  archived_timestamp?: number
  color?: any
  default_order?: number
  default_order_key?: any
  description?: string
  folder_id?: string
  icon?: any
  initiated_by_uid: number
  is_archived?: boolean
  is_frozen?: boolean
  is_invite_only?: boolean
  is_project_insights_enabled?: boolean
  name?: string
  project_id: string
  public_access: boolean
  role?: any
  status?: string
  view_style?: string
  workspace_id: number
}

export interface WorkspaceProjectListMatch {
  workspace_id: number
  cursor?: any
  limit?: number

  // Selects a custom action instead of the plain list:
  //   'archived'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorkspaceUser {
  custom_sorting_applied?: boolean
  full_name: string
  id?: string
  image_id?: string
  invite_code?: any
  is_deleted?: boolean
  project_sort_preference?: string
  role?: string
  timezone: string
  user_email: string
  user_id: string
  workspace_id: string
}

export interface WorkspaceUserListMatch {
  cursor?: any
  limit?: number
  sort?: string
  workspace_id?: string
}

export interface WorkspaceUserCreateData {
  custom_sorting_applied?: boolean
  full_name: string
  id?: string
  image_id?: string
  invite_code?: any
  is_deleted?: boolean
  project_sort_preference?: string
  role?: string
  timezone: string
  user_email: string
  user_id: string
  workspace_id: string

  // Selects a custom action instead of the plain create:
  //   'invite'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorkspaceUserUpdateData {
  id: number
  workspace_id: number
  custom_sorting_applied?: boolean
  full_name?: string
  image_id?: string
  invite_code?: any
  is_deleted?: boolean
  project_sort_preference?: string
  role?: string
  timezone?: string
  user_email?: string
  user_id?: string
}

export interface WorkspaceUserRemoveMatch {
  id: number
  workspace_id: number
}

