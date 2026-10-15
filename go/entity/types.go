// Typed models for the Todoist SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/technomonkey-7/todoist-sdk/go/core"
)

// Activity is the typed data model for the activity entity.
type Activity struct {
}

// ActivityListMatch is the typed request payload for Activity.ListTyped.
type ActivityListMatch struct {
	AnnotateNote *bool `json:"annotate_note,omitempty"`
	AnnotateParent *bool `json:"annotate_parent,omitempty"`
	Cursor *any `json:"cursor,omitempty"`
	DateFrom *any `json:"date_from,omitempty"`
	DateTo *any `json:"date_to,omitempty"`
	EnsureLastState *bool `json:"ensure_last_state,omitempty"`
	EventType *any `json:"event_type,omitempty"`
	IncludeChildObject *bool `json:"include_child_object,omitempty"`
	IncludeParentObject *bool `json:"include_parent_object,omitempty"`
	InitiatorId *string `json:"initiator_id,omitempty"`
	InitiatorIdNull *any `json:"initiator_id_null,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ObjectEventType *any `json:"object_event_type,omitempty"`
	ObjectId *string `json:"object_id,omitempty"`
	ObjectType *any `json:"object_type,omitempty"`
	ParentItemId *string `json:"parent_item_id,omitempty"`
	ParentProjectId *string `json:"parent_project_id,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// Backup is the typed data model for the backup entity.
type Backup struct {
}

// BackupLoadMatch is the typed request payload for Backup.LoadTyped.
type BackupLoadMatch struct {
	File string `json:"file"`
}

// BackupListMatch is the typed request payload for Backup.ListTyped.
type BackupListMatch struct {
	MfaToken *any `json:"mfa_token,omitempty"`
}

// BillingPortalUrl is the typed data model for the billing_portal_url entity.
type BillingPortalUrl struct {
}

// BillingPortalUrlCreateData is the typed request payload for BillingPortalUrl.CreateTyped.
type BillingPortalUrlCreateData struct {
	BillingPortalUrl string `json:"billing_portal_url"`
	ReasonDescription *string `json:"reason_description,omitempty"`
	ReasonFlag *string `json:"reason_flag,omitempty"`
	ReasonText *string `json:"reason_text,omitempty"`
	ReturnUrl *string `json:"return_url,omitempty"`
}

// Collaborator is the typed data model for the collaborator entity.
type Collaborator struct {
}

// CollaboratorListMatch is the typed request payload for Collaborator.ListTyped.
type CollaboratorListMatch struct {
	ProjectId string `json:"project_id"`
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	PublicKey *any `json:"public_key,omitempty"`
}

// Comment is the typed data model for the comment entity.
type Comment struct {
}

// CommentLoadMatch is the typed request payload for Comment.LoadTyped.
type CommentLoadMatch struct {
	Id string `json:"id"`
}

// CommentListMatch is the typed request payload for Comment.ListTyped.
type CommentListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	PublicKey *any `json:"public_key,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
}

// CommentCreateData is the typed request payload for Comment.CreateTyped.
type CommentCreateData struct {
	Attachment *any `json:"attachment,omitempty"`
	Content *string `json:"content,omitempty"`
	FileAttachment any `json:"file_attachment"`
	Id string `json:"id"`
	IsDeleted bool `json:"is_deleted"`
	PostedAt any `json:"posted_at"`
	PostedUid any `json:"posted_uid"`
	ProjectId *string `json:"project_id,omitempty"`
	Reactions any `json:"reactions"`
	TaskId *string `json:"task_id,omitempty"`
	UidsToNotify any `json:"uids_to_notify"`
}

// CommentUpdateData is the typed request payload for Comment.UpdateTyped.
type CommentUpdateData struct {
	Id string `json:"id"`
	Attachment *any `json:"attachment,omitempty"`
	Content *string `json:"content,omitempty"`
	FileAttachment *any `json:"file_attachment,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	PostedAt *any `json:"posted_at,omitempty"`
	PostedUid *any `json:"posted_uid,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Reactions *any `json:"reactions,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
	UidsToNotify *any `json:"uids_to_notify,omitempty"`
}

// CommentRemoveMatch is the typed request payload for Comment.RemoveTyped.
type CommentRemoveMatch struct {
	Id string `json:"id"`
}

// CompletedTask is the typed data model for the completed_task entity.
type CompletedTask struct {
}

// CompletedTaskListMatch is the typed request payload for CompletedTask.ListTyped.
type CompletedTaskListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	FilterLang *any `json:"filter_lang,omitempty"`
	FilterQuery *any `json:"filter_query,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ParentId *string `json:"parent_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	PublicKey *any `json:"public_key,omitempty"`
	SectionId *string `json:"section_id,omitempty"`
	Since string `json:"since"`
	Until string `json:"until"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// CreditState is the typed data model for the credit_state entity.
type CreditState struct {
}

// CreditStateLoadMatch is the typed request payload for CreditState.LoadTyped.
type CreditStateLoadMatch struct {
	Product *string `json:"product,omitempty"`
}

// Email is the typed data model for the email entity.
type Email struct {
}

// EmailUpdateData is the typed request payload for Email.UpdateTyped.
type EmailUpdateData struct {
	Email *string `json:"email,omitempty"`
	ObjId *string `json:"obj_id,omitempty"`
	ObjType *string `json:"obj_type,omitempty"`
}

// EmailRemoveMatch is the typed request payload for Email.RemoveTyped.
type EmailRemoveMatch struct {
	ObjId string `json:"obj_id"`
	ObjType string `json:"obj_type"`
}

// FileUrl is the typed data model for the file_url entity.
type FileUrl struct {
}

// FileUrlLoadMatch is the typed request payload for FileUrl.LoadTyped.
type FileUrlLoadMatch struct {
	ProjectId string `json:"project_id"`
	UseRelativeDate *bool `json:"use_relative_date,omitempty"`
}

// Folder is the typed data model for the folder entity.
type Folder struct {
}

// FolderLoadMatch is the typed request payload for Folder.LoadTyped.
type FolderLoadMatch struct {
	Id int `json:"id"`
}

// FolderListMatch is the typed request payload for Folder.ListTyped.
type FolderListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	WorkspaceId int `json:"workspace_id"`
}

// FolderCreateData is the typed request payload for Folder.CreateTyped.
type FolderCreateData struct {
	ChildOrder int `json:"child_order"`
	DefaultOrder int `json:"default_order"`
	DefaultOrderKey any `json:"default_order_key"`
	Id string `json:"id"`
	IsDeleted bool `json:"is_deleted"`
	Name string `json:"name"`
	WorkspaceId string `json:"workspace_id"`
}

// FolderUpdateData is the typed request payload for Folder.UpdateTyped.
type FolderUpdateData struct {
	Id int `json:"id"`
	ChildOrder *int `json:"child_order,omitempty"`
	DefaultOrder *int `json:"default_order,omitempty"`
	DefaultOrderKey *any `json:"default_order_key,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	Name *string `json:"name,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// FolderRemoveMatch is the typed request payload for Folder.RemoveTyped.
type FolderRemoveMatch struct {
	Id int `json:"id"`
}

// History is the typed data model for the history entity.
type History struct {
}

// HistoryListMatch is the typed request payload for History.ListTyped.
type HistoryListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Product *string `json:"product,omitempty"`
	Type *any `json:"type,omitempty"`
}

// IdMapping is the typed data model for the id_mapping entity.
type IdMapping struct {
}

// IdMappingListMatch is the typed request payload for IdMapping.ListTyped.
type IdMappingListMatch struct {
	ObjId string `json:"obj_id"`
	ObjName string `json:"obj_name"`
}

// Label is the typed data model for the label entity.
type Label struct {
}

// LabelLoadMatch is the typed request payload for Label.LoadTyped.
type LabelLoadMatch struct {
	Id int `json:"id"`
}

// LabelListMatch is the typed request payload for Label.ListTyped.
type LabelListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// LabelCreateData is the typed request payload for Label.CreateTyped.
type LabelCreateData struct {
	Color string `json:"color"`
	Id string `json:"id"`
	IsFavorite bool `json:"is_favorite"`
	Name string `json:"name"`
	Order any `json:"order"`
}

// LabelUpdateData is the typed request payload for Label.UpdateTyped.
type LabelUpdateData struct {
	Id int `json:"id"`
	Color *string `json:"color,omitempty"`
	IsFavorite *bool `json:"is_favorite,omitempty"`
	Name *string `json:"name,omitempty"`
	Order *any `json:"order,omitempty"`
}

// LabelRemoveMatch is the typed request payload for Label.RemoveTyped.
type LabelRemoveMatch struct {
	Id int `json:"id"`
}

// LocationReminder is the typed data model for the location_reminder entity.
type LocationReminder struct {
}

// LocationReminderLoadMatch is the typed request payload for LocationReminder.LoadTyped.
type LocationReminderLoadMatch struct {
	Id string `json:"id"`
}

// LocationReminderListMatch is the typed request payload for LocationReminder.ListTyped.
type LocationReminderListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
}

// LocationReminderCreateData is the typed request payload for LocationReminder.CreateTyped.
type LocationReminderCreateData struct {
	Id string `json:"id"`
	IsDeleted bool `json:"is_deleted"`
	ItemId string `json:"item_id"`
	LocLat string `json:"loc_lat"`
	LocLong string `json:"loc_long"`
	LocTrigger string `json:"loc_trigger"`
	Name string `json:"name"`
	NotifyUid string `json:"notify_uid"`
	ProjectId string `json:"project_id"`
	Radius int `json:"radius"`
	TaskId string `json:"task_id"`
	Type *string `json:"type,omitempty"`
}

// LocationReminderUpdateData is the typed request payload for LocationReminder.UpdateTyped.
type LocationReminderUpdateData struct {
	Id string `json:"id"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	ItemId *string `json:"item_id,omitempty"`
	LocLat *string `json:"loc_lat,omitempty"`
	LocLong *string `json:"loc_long,omitempty"`
	LocTrigger *string `json:"loc_trigger,omitempty"`
	Name *string `json:"name,omitempty"`
	NotifyUid *string `json:"notify_uid,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Radius *int `json:"radius,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
	Type *string `json:"type,omitempty"`
}

// LocationReminderRemoveMatch is the typed request payload for LocationReminder.RemoveTyped.
type LocationReminderRemoveMatch struct {
	Id string `json:"id"`
}

// NotificationSetting is the typed data model for the notification_setting entity.
type NotificationSetting struct {
}

// NotificationSettingUpdateData is the typed request payload for NotificationSetting.UpdateTyped.
type NotificationSettingUpdateData struct {
	DontNotify *any `json:"dont_notify,omitempty"`
	NotificationType *string `json:"notification_type,omitempty"`
	Service *string `json:"service,omitempty"`
}

// PlanDetail is the typed data model for the plan_detail entity.
type PlanDetail struct {
}

// PlanDetailListMatch is the typed request payload for PlanDetail.ListTyped.
type PlanDetailListMatch struct {
	WorkspaceId int `json:"workspace_id"`
}

// ProductivityStat is the typed data model for the productivity_stat entity.
type ProductivityStat struct {
}

// ProductivityStatListMatch is the typed request payload for ProductivityStat.ListTyped.
type ProductivityStatListMatch struct {
	CompletedCount *int `json:"completed_count,omitempty"`
	DaysItems *[]any `json:"days_items,omitempty"`
	Goals *map[string]any `json:"goals,omitempty"`
	Karma *float64 `json:"karma,omitempty"`
	KarmaGraphData *[]any `json:"karma_graph_data,omitempty"`
	KarmaLastUpdate *float64 `json:"karma_last_update,omitempty"`
	KarmaTrend *string `json:"karma_trend,omitempty"`
	KarmaUpdateReasons *[]any `json:"karma_update_reasons,omitempty"`
	ProjectColors *map[string]any `json:"project_colors,omitempty"`
	WeekItems *[]any `json:"week_items,omitempty"`
}

// Project is the typed data model for the project entity.
type Project struct {
}

// ProjectLoadMatch is the typed request payload for Project.LoadTyped.
type ProjectLoadMatch struct {
	Id string `json:"id"`
}

// ProjectListMatch is the typed request payload for Project.ListTyped.
type ProjectListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	FolderId *string `json:"folder_id,omitempty"`
	Limit *int `json:"limit,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// ProjectCreateData is the typed request payload for Project.CreateTyped.
type ProjectCreateData struct {
	ChildOrder *any `json:"child_order,omitempty"`
	Color *any `json:"color,omitempty"`
	Description *string `json:"description,omitempty"`
	FolderId *string `json:"folder_id,omitempty"`
	Icon *any `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsFavorite *bool `json:"is_favorite,omitempty"`
	Name string `json:"name"`
	NextCursor any `json:"next_cursor"`
	ParentId *string `json:"parent_id,omitempty"`
	Results []any `json:"results"`
	ViewStyle *any `json:"view_style,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// ProjectUpdateData is the typed request payload for Project.UpdateTyped.
type ProjectUpdateData struct {
	Id string `json:"id"`
	ChildOrder *any `json:"child_order,omitempty"`
	Color *any `json:"color,omitempty"`
	Description *string `json:"description,omitempty"`
	FolderId *string `json:"folder_id,omitempty"`
	Icon *any `json:"icon,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsFavorite *bool `json:"is_favorite,omitempty"`
	Name *string `json:"name,omitempty"`
	NextCursor *any `json:"next_cursor,omitempty"`
	ParentId *string `json:"parent_id,omitempty"`
	Results *[]any `json:"results,omitempty"`
	ViewStyle *any `json:"view_style,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// ProjectRemoveMatch is the typed request payload for Project.RemoveTyped.
type ProjectRemoveMatch struct {
	Id string `json:"id"`
}

// ProjectImport is the typed data model for the project_import entity.
type ProjectImport struct {
}

// ProjectImportCreateData is the typed request payload for ProjectImport.CreateTyped.
type ProjectImportCreateData struct {
}

// ProjectPermission is the typed data model for the project_permission entity.
type ProjectPermission struct {
}

// ProjectPermissionListMatch is the typed request payload for ProjectPermission.ListTyped.
type ProjectPermissionListMatch struct {
	ProjectCollaboratorActions *[]any `json:"project_collaborator_actions,omitempty"`
	WorkspaceCollaboratorActions *[]any `json:"workspace_collaborator_actions,omitempty"`
}

// Reminder is the typed data model for the reminder entity.
type Reminder struct {
}

// ReminderLoadMatch is the typed request payload for Reminder.LoadTyped.
type ReminderLoadMatch struct {
	Id string `json:"id"`
}

// ReminderListMatch is the typed request payload for Reminder.ListTyped.
type ReminderListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
}

// ReminderCreateData is the typed request payload for Reminder.CreateTyped.
type ReminderCreateData struct {
	Due any `json:"due"`
	Id string `json:"id"`
	IsDeleted bool `json:"is_deleted"`
	IsUrgent bool `json:"is_urgent"`
	ItemId string `json:"item_id"`
	MinuteOffset any `json:"minute_offset"`
	NotifyUid string `json:"notify_uid"`
	ReminderType *string `json:"reminder_type,omitempty"`
	Service *string `json:"service,omitempty"`
	TaskId string `json:"task_id"`
	Type string `json:"type"`
}

// ReminderUpdateData is the typed request payload for Reminder.UpdateTyped.
type ReminderUpdateData struct {
	Id string `json:"id"`
	Due *any `json:"due,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsUrgent *bool `json:"is_urgent,omitempty"`
	ItemId *string `json:"item_id,omitempty"`
	MinuteOffset *any `json:"minute_offset,omitempty"`
	NotifyUid *string `json:"notify_uid,omitempty"`
	ReminderType *string `json:"reminder_type,omitempty"`
	Service *string `json:"service,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ReminderRemoveMatch is the typed request payload for Reminder.RemoveTyped.
type ReminderRemoveMatch struct {
	Id string `json:"id"`
}

// Section is the typed data model for the section entity.
type Section struct {
}

// SectionLoadMatch is the typed request payload for Section.LoadTyped.
type SectionLoadMatch struct {
	Id string `json:"id"`
	PublicKey *any `json:"public_key,omitempty"`
}

// SectionListMatch is the typed request payload for Section.ListTyped.
type SectionListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	PublicKey *any `json:"public_key,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// SectionCreateData is the typed request payload for Section.CreateTyped.
type SectionCreateData struct {
	AddedAt string `json:"added_at"`
	ArchivedAt any `json:"archived_at"`
	Description string `json:"description"`
	Id string `json:"id"`
	IsArchived bool `json:"is_archived"`
	IsCollapsed bool `json:"is_collapsed"`
	IsDeleted bool `json:"is_deleted"`
	Name string `json:"name"`
	Order *any `json:"order,omitempty"`
	OrderKey any `json:"order_key"`
	ProjectId string `json:"project_id"`
	SectionOrder int `json:"section_order"`
	UpdatedAt any `json:"updated_at"`
	UserId string `json:"user_id"`
}

// SectionUpdateData is the typed request payload for Section.UpdateTyped.
type SectionUpdateData struct {
	Id string `json:"id"`
	AddedAt *string `json:"added_at,omitempty"`
	ArchivedAt *any `json:"archived_at,omitempty"`
	Description *string `json:"description,omitempty"`
	IsArchived *bool `json:"is_archived,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	Name *string `json:"name,omitempty"`
	Order *any `json:"order,omitempty"`
	OrderKey *any `json:"order_key,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	SectionOrder *int `json:"section_order,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// SectionRemoveMatch is the typed request payload for Section.RemoveTyped.
type SectionRemoveMatch struct {
	Id string `json:"id"`
}

// SharedLabel is the typed data model for the shared_label entity.
type SharedLabel struct {
}

// SharedLabelListMatch is the typed request payload for SharedLabel.ListTyped.
type SharedLabelListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	OmitPersonal *bool `json:"omit_personal,omitempty"`
}

// SharedLabelUpdateData is the typed request payload for SharedLabel.UpdateTyped.
type SharedLabelUpdateData struct {
	Name *string `json:"name,omitempty"`
	NewName *string `json:"new_name,omitempty"`
	NextCursor *any `json:"next_cursor,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// SharedLabelRemoveMatch is the typed request payload for SharedLabel.RemoveTyped.
type SharedLabelRemoveMatch struct {
	Name *string `json:"name,omitempty"`
	NewName *string `json:"new_name,omitempty"`
	NextCursor *any `json:"next_cursor,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// SubscriptionInfo is the typed data model for the subscription_info entity.
type SubscriptionInfo struct {
}

// SubscriptionInfoCreateData is the typed request payload for SubscriptionInfo.CreateTyped.
type SubscriptionInfoCreateData struct {
	ActivationMethod string `json:"activation_method"`
	BillingPortalSwitchToAnnualUrl any `json:"billing_portal_switch_to_annual_url"`
	BillingPortalUrl any `json:"billing_portal_url"`
	ExpirationDate any `json:"expiration_date"`
	HasBillingPortal bool `json:"has_billing_portal"`
	HasBillingPortalSwitchToAnnual bool `json:"has_billing_portal_switch_to_annual"`
	HasSwitchLegacyToCurrent bool `json:"has_switch_legacy_to_current"`
	InvoiceCreditBalance any `json:"invoice_credit_balance"`
	Plan string `json:"plan"`
	PlanPrice any `json:"plan_price"`
	Status string `json:"status"`
}

// Task is the typed data model for the task entity.
type Task struct {
}

// TaskLoadMatch is the typed request payload for Task.LoadTyped.
type TaskLoadMatch struct {
	Id string `json:"id"`
	PublicKey *any `json:"public_key,omitempty"`
}

// TaskListMatch is the typed request payload for Task.ListTyped.
type TaskListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Ids *any `json:"ids,omitempty"`
	Label *string `json:"label,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ParentId *string `json:"parent_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	SectionId *string `json:"section_id,omitempty"`
}

// TaskCreateData is the typed request payload for Task.CreateTyped.
type TaskCreateData struct {
	AddedAt any `json:"added_at"`
	AddedByUid any `json:"added_by_uid"`
	AssignedByUid any `json:"assigned_by_uid"`
	AssigneeId *string `json:"assignee_id,omitempty"`
	Checked bool `json:"checked"`
	ChildOrder int `json:"child_order"`
	CompletedAt any `json:"completed_at"`
	CompletedByUid any `json:"completed_by_uid"`
	CompletedCount int `json:"completed_count"`
	Content string `json:"content"`
	DayOrder int `json:"day_order"`
	Deadline any `json:"deadline"`
	DeadlineDate *any `json:"deadline_date,omitempty"`
	Description string `json:"description"`
	Due any `json:"due"`
	DueDate *any `json:"due_date,omitempty"`
	DueDatetime *any `json:"due_datetime,omitempty"`
	DueLang *any `json:"due_lang,omitempty"`
	DueString *any `json:"due_string,omitempty"`
	Duration float64 `json:"duration"`
	DurationUnit *any `json:"duration_unit,omitempty"`
	Id string `json:"id"`
	IsCollapsed bool `json:"is_collapsed"`
	IsDeleted bool `json:"is_deleted"`
	Labels []any `json:"labels"`
	NoteCount int `json:"note_count"`
	Order *any `json:"order,omitempty"`
	OrderKey any `json:"order_key"`
	ParentId string `json:"parent_id"`
	PostponedCount int `json:"postponed_count"`
	Priority int `json:"priority"`
	ProjectId string `json:"project_id"`
	ResponsibleUid any `json:"responsible_uid"`
	SectionId string `json:"section_id"`
	UpdatedAt any `json:"updated_at"`
	UserId string `json:"user_id"`
}

// TaskUpdateData is the typed request payload for Task.UpdateTyped.
type TaskUpdateData struct {
	Id string `json:"id"`
	AddedAt *any `json:"added_at,omitempty"`
	AddedByUid *any `json:"added_by_uid,omitempty"`
	AssignedByUid *any `json:"assigned_by_uid,omitempty"`
	AssigneeId *string `json:"assignee_id,omitempty"`
	Checked *bool `json:"checked,omitempty"`
	ChildOrder *int `json:"child_order,omitempty"`
	CompletedAt *any `json:"completed_at,omitempty"`
	CompletedByUid *any `json:"completed_by_uid,omitempty"`
	CompletedCount *int `json:"completed_count,omitempty"`
	Content *string `json:"content,omitempty"`
	DayOrder *int `json:"day_order,omitempty"`
	Deadline *any `json:"deadline,omitempty"`
	DeadlineDate *any `json:"deadline_date,omitempty"`
	Description *string `json:"description,omitempty"`
	Due *any `json:"due,omitempty"`
	DueDate *any `json:"due_date,omitempty"`
	DueDatetime *any `json:"due_datetime,omitempty"`
	DueLang *any `json:"due_lang,omitempty"`
	DueString *any `json:"due_string,omitempty"`
	Duration *float64 `json:"duration,omitempty"`
	DurationUnit *any `json:"duration_unit,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	NoteCount *int `json:"note_count,omitempty"`
	Order *any `json:"order,omitempty"`
	OrderKey *any `json:"order_key,omitempty"`
	ParentId *string `json:"parent_id,omitempty"`
	PostponedCount *int `json:"postponed_count,omitempty"`
	Priority *int `json:"priority,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	ResponsibleUid *any `json:"responsible_uid,omitempty"`
	SectionId *string `json:"section_id,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// TaskRemoveMatch is the typed request payload for Task.RemoveTyped.
type TaskRemoveMatch struct {
	Id string `json:"id"`
}

// Template is the typed data model for the template entity.
type Template struct {
}

// TemplateLoadMatch is the typed request payload for Template.LoadTyped.
type TemplateLoadMatch struct {
	ProjectId string `json:"project_id"`
	UseRelativeDate *bool `json:"use_relative_date,omitempty"`
}

// TopUp is the typed data model for the top_up entity.
type TopUp struct {
}

// TopUpCreateData is the typed request payload for TopUp.CreateTyped.
type TopUpCreateData struct {
	Amount int `json:"amount"`
	CheckoutUrl string `json:"checkout_url"`
	Currency string `json:"currency"`
	ReturnUrl string `json:"return_url"`
	SessionId string `json:"session_id"`
}

// Upload is the typed data model for the upload entity.
type Upload struct {
}

// UploadCreateData is the typed request payload for Upload.CreateTyped.
type UploadCreateData struct {
	FileName string `json:"file_name"`
	FileSize int `json:"file_size"`
	FileType string `json:"file_type"`
	FileUrl string `json:"file_url"`
	Image *any `json:"image,omitempty"`
	ImageHeight *any `json:"image_height,omitempty"`
	ImageWidth *any `json:"image_width,omitempty"`
	ResourceType string `json:"resource_type"`
	UploadState *string `json:"upload_state,omitempty"`
}

// UploadRemoveMatch is the typed request payload for Upload.RemoveTyped.
type UploadRemoveMatch struct {
	FileUrl string `json:"file_url"`
}

// UsageSummary is the typed data model for the usage_summary entity.
type UsageSummary struct {
}

// UsageSummaryListMatch is the typed request payload for UsageSummary.ListTyped.
type UsageSummaryListMatch struct {
	Category *any `json:"category,omitempty"`
	GroupBy *any `json:"group_by,omitempty"`
	Product *string `json:"product,omitempty"`
	Since *any `json:"since,omitempty"`
	Until *any `json:"until,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	ActivatedUser *bool `json:"activated_user,omitempty"`
	AutoReminder *int `json:"auto_reminder,omitempty"`
	AvatarBig *any `json:"avatar_big,omitempty"`
	AvatarMedium *any `json:"avatar_medium,omitempty"`
	AvatarS640 *any `json:"avatar_s640,omitempty"`
	AvatarSmall *any `json:"avatar_small,omitempty"`
	BusinessAccountId *string `json:"business_account_id,omitempty"`
	CompletedCount *int `json:"completed_count,omitempty"`
	CompletedToday *int `json:"completed_today,omitempty"`
	DailyGoal *int `json:"daily_goal,omitempty"`
	DateFormat *int `json:"date_format,omitempty"`
	DaysOff *[]any `json:"days_off,omitempty"`
	DeletedAt *any `json:"deleted_at,omitempty"`
	Email *string `json:"email,omitempty"`
	FeatureIdentifier *string `json:"feature_identifier,omitempty"`
	Features *map[string]any `json:"features,omitempty"`
	FreeTrialExpires *any `json:"free_trial_expires,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	GettingStartedGuideProjects *any `json:"getting_started_guide_projects,omitempty"`
	HasMagicNumber *bool `json:"has_magic_number,omitempty"`
	HasPassword *bool `json:"has_password,omitempty"`
	HasStartedATrial *bool `json:"has_started_a_trial,omitempty"`
	Id string `json:"id"`
	ImageId *string `json:"image_id,omitempty"`
	InboxProjectId *string `json:"inbox_project_id,omitempty"`
	IsCelebrationsEnabled *bool `json:"is_celebrations_enabled,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsOnboarded *bool `json:"is_onboarded,omitempty"`
	IsPremium *bool `json:"is_premium,omitempty"`
	JoinableWorkspace *any `json:"joinable_workspace,omitempty"`
	JoinedAt *any `json:"joined_at,omitempty"`
	Karma *float64 `json:"karma,omitempty"`
	KarmaTrend *any `json:"karma_trend,omitempty"`
	Lang *string `json:"lang,omitempty"`
	MfaEnabled *bool `json:"mfa_enabled,omitempty"`
	NextWeek *int `json:"next_week,omitempty"`
	OnboardedDatedTasksCreated *any `json:"onboarded_dated_tasks_created,omitempty"`
	OnboardedDesktopAccessed *any `json:"onboarded_desktop_accessed,omitempty"`
	OnboardedMobileAccessed *any `json:"onboarded_mobile_accessed,omitempty"`
	OnboardedTasksCompleted *any `json:"onboarded_tasks_completed,omitempty"`
	OnboardingCompleted *bool `json:"onboarding_completed,omitempty"`
	OnboardingInitiated *bool `json:"onboarding_initiated,omitempty"`
	OnboardingLevel *any `json:"onboarding_level,omitempty"`
	OnboardingPersona *any `json:"onboarding_persona,omitempty"`
	OnboardingRole *any `json:"onboarding_role,omitempty"`
	OnboardingStarted *bool `json:"onboarding_started,omitempty"`
	OnboardingTeamMode *any `json:"onboarding_team_mode,omitempty"`
	OnboardingUseCases *any `json:"onboarding_use_cases,omitempty"`
	PremiumStatus *any `json:"premium_status,omitempty"`
	PremiumUntil *any `json:"premium_until,omitempty"`
	ShareLimit *int `json:"share_limit,omitempty"`
	SortOrder *int `json:"sort_order,omitempty"`
	StartDay *int `json:"start_day,omitempty"`
	StartPage *string `json:"start_page,omitempty"`
	Status *any `json:"status,omitempty"`
	ThemeAppearance *string `json:"theme_appearance,omitempty"`
	ThemeId *string `json:"theme_id,omitempty"`
	TimeFormat *any `json:"time_format,omitempty"`
	Token *string `json:"token,omitempty"`
	TzInfo *map[string]any `json:"tz_info,omitempty"`
	UrgentReminderDevice *any `json:"urgent_reminder_device,omitempty"`
	VerificationStatus *string `json:"verification_status,omitempty"`
	WebsocketUrl *string `json:"websocket_url,omitempty"`
	WeekendStartDay *int `json:"weekend_start_day,omitempty"`
	WeeklyGoal *int `json:"weekly_goal,omitempty"`
}

// Workspace is the typed data model for the workspace entity.
type Workspace struct {
}

// WorkspaceLoadMatch is the typed request payload for Workspace.LoadTyped.
type WorkspaceLoadMatch struct {
	Id int `json:"id"`
}

// WorkspaceListMatch is the typed request payload for Workspace.ListTyped.
type WorkspaceListMatch struct {
	Description *string `json:"description,omitempty"`
	DomainDiscovery *bool `json:"domain_discovery,omitempty"`
	DomainName *any `json:"domain_name,omitempty"`
	Id *string `json:"id,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsGuestAllowed *bool `json:"is_guest_allowed,omitempty"`
	IsLinkSharingEnabled *bool `json:"is_link_sharing_enabled,omitempty"`
	IsTrialPending *bool `json:"is_trial_pending,omitempty"`
	Name *string `json:"name,omitempty"`
	Properties *any `json:"properties,omitempty"`
	RestrictEmailDomains *bool `json:"restrict_email_domains,omitempty"`
}

// WorkspaceCreateData is the typed request payload for Workspace.CreateTyped.
type WorkspaceCreateData struct {
	Description *string `json:"description,omitempty"`
	DomainDiscovery *bool `json:"domain_discovery,omitempty"`
	DomainName *any `json:"domain_name,omitempty"`
	Id *string `json:"id,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsGuestAllowed *bool `json:"is_guest_allowed,omitempty"`
	IsLinkSharingEnabled *bool `json:"is_link_sharing_enabled,omitempty"`
	IsTrialPending *bool `json:"is_trial_pending,omitempty"`
	Name *string `json:"name,omitempty"`
	Properties *any `json:"properties,omitempty"`
	RestrictEmailDomains *bool `json:"restrict_email_domains,omitempty"`
}

// WorkspaceUpdateData is the typed request payload for Workspace.UpdateTyped.
type WorkspaceUpdateData struct {
	Id int `json:"id"`
	Description *string `json:"description,omitempty"`
	DomainDiscovery *bool `json:"domain_discovery,omitempty"`
	DomainName *any `json:"domain_name,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsGuestAllowed *bool `json:"is_guest_allowed,omitempty"`
	IsLinkSharingEnabled *bool `json:"is_link_sharing_enabled,omitempty"`
	IsTrialPending *bool `json:"is_trial_pending,omitempty"`
	Name *string `json:"name,omitempty"`
	Properties *any `json:"properties,omitempty"`
	RestrictEmailDomains *bool `json:"restrict_email_domains,omitempty"`
}

// WorkspaceRemoveMatch is the typed request payload for Workspace.RemoveTyped.
type WorkspaceRemoveMatch struct {
	Id int `json:"id"`
}

// WorkspaceInvitation is the typed data model for the workspace_invitation entity.
type WorkspaceInvitation struct {
}

// WorkspaceInvitationListMatch is the typed request payload for WorkspaceInvitation.ListTyped.
type WorkspaceInvitationListMatch struct {
	WorkspaceId int `json:"workspace_id"`
}

// WorkspaceInvitationUpdateData is the typed request payload for WorkspaceInvitation.UpdateTyped.
type WorkspaceInvitationUpdateData struct {
	InviteCode string `json:"invite_code"`
	App *string `json:"app,omitempty"`
	Id *string `json:"id,omitempty"`
	InviterId *string `json:"inviter_id,omitempty"`
	Role *string `json:"role,omitempty"`
	UserEmail *string `json:"user_email,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// WorkspaceInvitationRemoveMatch is the typed request payload for WorkspaceInvitation.RemoveTyped.
type WorkspaceInvitationRemoveMatch struct {
	App *string `json:"app,omitempty"`
	Id string `json:"id"`
	InviterId *string `json:"inviter_id,omitempty"`
	Role *string `json:"role,omitempty"`
	UserEmail *string `json:"user_email,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// WorkspaceProject is the typed data model for the workspace_project entity.
type WorkspaceProject struct {
}

// WorkspaceProjectListMatch is the typed request payload for WorkspaceProject.ListTyped.
type WorkspaceProjectListMatch struct {
	WorkspaceId int `json:"workspace_id"`
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// WorkspaceUser is the typed data model for the workspace_user entity.
type WorkspaceUser struct {
}

// WorkspaceUserListMatch is the typed request payload for WorkspaceUser.ListTyped.
type WorkspaceUserListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Sort *string `json:"sort,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// WorkspaceUserCreateData is the typed request payload for WorkspaceUser.CreateTyped.
type WorkspaceUserCreateData struct {
	CustomSortingApplied *bool `json:"custom_sorting_applied,omitempty"`
	FullName string `json:"full_name"`
	Id *string `json:"id,omitempty"`
	ImageId *string `json:"image_id,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	ProjectSortPreference *string `json:"project_sort_preference,omitempty"`
	Role *string `json:"role,omitempty"`
	Timezone string `json:"timezone"`
	UserEmail string `json:"user_email"`
	UserId string `json:"user_id"`
	WorkspaceId string `json:"workspace_id"`
}

// WorkspaceUserUpdateData is the typed request payload for WorkspaceUser.UpdateTyped.
type WorkspaceUserUpdateData struct {
	Id int `json:"id"`
	WorkspaceId int `json:"workspace_id"`
	CustomSortingApplied *bool `json:"custom_sorting_applied,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	ImageId *string `json:"image_id,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	ProjectSortPreference *string `json:"project_sort_preference,omitempty"`
	Role *string `json:"role,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	UserEmail *string `json:"user_email,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// WorkspaceUserRemoveMatch is the typed request payload for WorkspaceUser.RemoveTyped.
type WorkspaceUserRemoveMatch struct {
	Id int `json:"id"`
	WorkspaceId int `json:"workspace_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
