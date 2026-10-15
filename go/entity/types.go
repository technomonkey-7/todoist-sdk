// Typed models for the Todoist SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/todoist-sdk/go/core"
)

// Active is the typed data model for the active entity.
type Active struct {
}

// ActiveListMatch is the typed request payload for Active.ListTyped.
type ActiveListMatch struct {
	WorkspaceId int `json:"workspace_id"`
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

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

// AnyProjectSyncView is the typed data model for the any_project_sync_view entity.
type AnyProjectSyncView struct {
}

// AnyProjectSyncViewLoadMatch is the typed request payload for AnyProjectSyncView.LoadTyped.
type AnyProjectSyncViewLoadMatch struct {
	ProjectId string `json:"project_id"`
}

// AnyProjectSyncViewListMatch is the typed request payload for AnyProjectSyncView.ListTyped.
type AnyProjectSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	FolderId *string `json:"folder_id,omitempty"`
	Limit *int `json:"limit,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// AnyProjectSyncViewCreateData is the typed request payload for AnyProjectSyncView.CreateTyped.
type AnyProjectSyncViewCreateData struct {
	ProjectId string `json:"project_id"`
	ChildOrder *any `json:"child_order,omitempty"`
	Color *any `json:"color,omitempty"`
	Description *string `json:"description,omitempty"`
	FolderId *string `json:"folder_id,omitempty"`
	Icon *any `json:"icon,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsFavorite *bool `json:"is_favorite,omitempty"`
	Name *string `json:"name,omitempty"`
	NextCursor any `json:"next_cursor"`
	ParentId *string `json:"parent_id,omitempty"`
	Results []any `json:"results"`
	ViewStyle *any `json:"view_style,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// Archived is the typed data model for the archived entity.
type Archived struct {
}

// ArchivedListMatch is the typed request payload for Archived.ListTyped.
type ArchivedListMatch struct {
	WorkspaceId int `json:"workspace_id"`
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// Authorization is the typed data model for the authorization entity.
type Authorization struct {
}

// AuthorizationCreateData is the typed request payload for Authorization.CreateTyped.
type AuthorizationCreateData struct {
	Token string `json:"token"`
	TokenTypeHint *any `json:"token_type_hint,omitempty"`
}

// AuthorizationRemoveMatch is the typed request payload for Authorization.RemoveTyped.
type AuthorizationRemoveMatch struct {
	AccessToken string `json:"access_token"`
	ClientId string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
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

// ByCompletionDate is the typed data model for the by_completion_date entity.
type ByCompletionDate struct {
}

// ByCompletionDateListMatch is the typed request payload for ByCompletionDate.ListTyped.
type ByCompletionDateListMatch struct {
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

// ByDueDate is the typed data model for the by_due_date entity.
type ByDueDate struct {
}

// ByDueDateListMatch is the typed request payload for ByDueDate.ListTyped.
type ByDueDateListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	FilterLang *any `json:"filter_lang,omitempty"`
	FilterQuery *any `json:"filter_query,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ParentId *string `json:"parent_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	SectionId *string `json:"section_id,omitempty"`
	Since string `json:"since"`
	Until string `json:"until"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
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

// CommentCreateData is the typed request payload for Comment.CreateTyped.
type CommentCreateData struct {
	Id string `json:"id"`
	Content any `json:"content"`
}

// CommentRemoveMatch is the typed request payload for Comment.RemoveTyped.
type CommentRemoveMatch struct {
	Id string `json:"id"`
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
	Id int `json:"id"`
	ChildOrder int `json:"child_order"`
	DefaultOrder int `json:"default_order"`
	DefaultOrderKey any `json:"default_order_key"`
	IsDeleted bool `json:"is_deleted"`
	Name string `json:"name"`
	WorkspaceId string `json:"workspace_id"`
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

// Invite is the typed data model for the invite entity.
type Invite struct {
}

// InviteCreateData is the typed request payload for Invite.CreateTyped.
type InviteCreateData struct {
	WorkspaceId int `json:"workspace_id"`
	App *string `json:"app,omitempty"`
	EmailList *any `json:"email_list,omitempty"`
	InvitedEmails []any `json:"invited_emails"`
	Role *any `json:"role,omitempty"`
}

// ItemSyncView is the typed data model for the item_sync_view entity.
type ItemSyncView struct {
}

// ItemSyncViewLoadMatch is the typed request payload for ItemSyncView.LoadTyped.
type ItemSyncViewLoadMatch struct {
	TaskId string `json:"task_id"`
	PublicKey *any `json:"public_key,omitempty"`
}

// ItemSyncViewListMatch is the typed request payload for ItemSyncView.ListTyped.
type ItemSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Ids *any `json:"ids,omitempty"`
	Label *string `json:"label,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ParentId *string `json:"parent_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	SectionId *string `json:"section_id,omitempty"`
}

// ItemSyncViewCreateData is the typed request payload for ItemSyncView.CreateTyped.
type ItemSyncViewCreateData struct {
	TaskId string `json:"task_id"`
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
	DueDate *string `json:"due_date,omitempty"`
	DueDatetime *string `json:"due_datetime,omitempty"`
	DueLang *string `json:"due_lang,omitempty"`
	DueString *string `json:"due_string,omitempty"`
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
	Id int `json:"id"`
	Color string `json:"color"`
	IsFavorite bool `json:"is_favorite"`
	Name string `json:"name"`
	NewName string `json:"new_name"`
	Order any `json:"order"`
}

// LabelRemoveMatch is the typed request payload for Label.RemoveTyped.
type LabelRemoveMatch struct {
	Id int `json:"id"`
}

// LabelRestView is the typed data model for the label_rest_view entity.
type LabelRestView struct {
}

// LabelRestViewListMatch is the typed request payload for LabelRestView.ListTyped.
type LabelRestViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Query string `json:"query"`
}

// LocationReminder is the typed data model for the location_reminder entity.
type LocationReminder struct {
}

// LocationReminderRemoveMatch is the typed request payload for LocationReminder.RemoveTyped.
type LocationReminderRemoveMatch struct {
	Id string `json:"id"`
}

// MemberView is the typed data model for the member_view entity.
type MemberView struct {
}

// MemberViewListMatch is the typed request payload for MemberView.ListTyped.
type MemberViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Sort *string `json:"sort,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// MigratePersonalToken is the typed data model for the migrate_personal_token entity.
type MigratePersonalToken struct {
}

// MigratePersonalTokenCreateData is the typed request payload for MigratePersonalToken.CreateTyped.
type MigratePersonalTokenCreateData struct {
	AccessToken any `json:"access_token"`
	ClientId string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	ExpiresIn int `json:"expires_in"`
	PersonalToken string `json:"personal_token"`
	Scope string `json:"scope"`
	TokenType string `json:"token_type"`
}

// NoteSyncView is the typed data model for the note_sync_view entity.
type NoteSyncView struct {
}

// NoteSyncViewLoadMatch is the typed request payload for NoteSyncView.LoadTyped.
type NoteSyncViewLoadMatch struct {
	CommentId string `json:"comment_id"`
}

// NoteSyncViewListMatch is the typed request payload for NoteSyncView.ListTyped.
type NoteSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	PublicKey *any `json:"public_key,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
}

// NoteSyncViewCreateData is the typed request payload for NoteSyncView.CreateTyped.
type NoteSyncViewCreateData struct {
	Attachment *any `json:"attachment,omitempty"`
	Content *string `json:"content,omitempty"`
	FileAttachment any `json:"file_attachment"`
	Id string `json:"id"`
	IsDeleted bool `json:"is_deleted"`
	PostedAt any `json:"posted_at"`
	PostedUid any `json:"posted_uid"`
	ProjectId *string `json:"project_id,omitempty"`
	Reaction string `json:"reaction"`
	Reactions any `json:"reactions"`
	TaskId *string `json:"task_id,omitempty"`
	UidsToNotify any `json:"uids_to_notify"`
}

// NotificationLocationSyncView is the typed data model for the notification_location_sync_view entity.
type NotificationLocationSyncView struct {
}

// NotificationLocationSyncViewLoadMatch is the typed request payload for NotificationLocationSyncView.LoadTyped.
type NotificationLocationSyncViewLoadMatch struct {
	ReminderId string `json:"reminder_id"`
}

// NotificationLocationSyncViewListMatch is the typed request payload for NotificationLocationSyncView.ListTyped.
type NotificationLocationSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
}

// NotificationLocationSyncViewCreateData is the typed request payload for NotificationLocationSyncView.CreateTyped.
type NotificationLocationSyncViewCreateData struct {
	ReminderId string `json:"reminder_id"`
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

// NotificationSyncView is the typed data model for the notification_sync_view entity.
type NotificationSyncView struct {
}

// NotificationSyncViewLoadMatch is the typed request payload for NotificationSyncView.LoadTyped.
type NotificationSyncViewLoadMatch struct {
	ReminderId string `json:"reminder_id"`
}

// NotificationSyncViewListMatch is the typed request payload for NotificationSyncView.ListTyped.
type NotificationSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
}

// NotificationSyncViewCreateData is the typed request payload for NotificationSyncView.CreateTyped.
type NotificationSyncViewCreateData struct {
	ReminderId string `json:"reminder_id"`
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

// PaginatedListAnyProjectSyncView is the typed data model for the paginated_list_any_project_sync_view entity.
type PaginatedListAnyProjectSyncView struct {
}

// PaginatedListAnyProjectSyncViewListMatch is the typed request payload for PaginatedListAnyProjectSyncView.ListTyped.
type PaginatedListAnyProjectSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Query string `json:"query"`
}

// PaginatedListItemSyncView is the typed data model for the paginated_list_item_sync_view entity.
type PaginatedListItemSyncView struct {
}

// PaginatedListItemSyncViewListMatch is the typed request payload for PaginatedListItemSyncView.ListTyped.
type PaginatedListItemSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Lang *any `json:"lang,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Query string `json:"query"`
}

// PaginatedListStr is the typed data model for the paginated_list_str entity.
type PaginatedListStr struct {
}

// PaginatedListStrListMatch is the typed request payload for PaginatedListStr.ListTyped.
type PaginatedListStrListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	OmitPersonal *bool `json:"omit_personal,omitempty"`
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

// ProjectRemoveMatch is the typed request payload for Project.RemoveTyped.
type ProjectRemoveMatch struct {
	Id string `json:"id"`
}

// ProjectImport is the typed data model for the project_import entity.
type ProjectImport struct {
}

// ProjectImportCreateData is the typed request payload for ProjectImport.CreateTyped.
type ProjectImportCreateData struct {
	Comments []any `json:"comments"`
	DiscardedFields []any `json:"discarded_fields"`
	Locale *string `json:"locale,omitempty"`
	ProjectId string `json:"project_id"`
	ProjectNotes []any `json:"project_notes"`
	ProjectViewOptionsDefaults []any `json:"project_view_options_defaults"`
	Projects []any `json:"projects"`
	Reminders []any `json:"reminders"`
	Sections []any `json:"sections"`
	Status string `json:"status"`
	Tasks []any `json:"tasks"`
	TemplateId string `json:"template_id"`
	TemplateType string `json:"template_type"`
}

// ProjectImportCreateResponseWithObject is the typed data model for the project_import_create_response_with_object entity.
type ProjectImportCreateResponseWithObject struct {
}

// ProjectImportCreateResponseWithObjectCreateData is the typed request payload for ProjectImportCreateResponseWithObject.CreateTyped.
type ProjectImportCreateResponseWithObjectCreateData struct {
	Comments []any `json:"comments"`
	DiscardedFields []any `json:"discarded_fields"`
	ProjectId string `json:"project_id"`
	ProjectNotes []any `json:"project_notes"`
	ProjectViewOptionsDefaults []any `json:"project_view_options_defaults"`
	Projects []any `json:"projects"`
	Reminders []any `json:"reminders"`
	Sections []any `json:"sections"`
	Status string `json:"status"`
	Tasks []any `json:"tasks"`
	TemplateType string `json:"template_type"`
}

// Reminder is the typed data model for the reminder entity.
type Reminder struct {
}

// ReminderRemoveMatch is the typed request payload for Reminder.RemoveTyped.
type ReminderRemoveMatch struct {
	Id string `json:"id"`
}

// RemoveWorkspaceUser is the typed data model for the remove_workspace_user entity.
type RemoveWorkspaceUser struct {
}

// RemoveWorkspaceUserRemoveMatch is the typed request payload for RemoveWorkspaceUser.RemoveTyped.
type RemoveWorkspaceUserRemoveMatch struct {
	Id int `json:"id"`
	WorkspaceId int `json:"workspace_id"`
}

// RoleToActionMappingView is the typed data model for the role_to_action_mapping_view entity.
type RoleToActionMappingView struct {
}

// RoleToActionMappingViewListMatch is the typed request payload for RoleToActionMappingView.ListTyped.
type RoleToActionMappingViewListMatch struct {
	ProjectCollaboratorActions *[]any `json:"project_collaborator_actions,omitempty"`
	WorkspaceCollaboratorActions *[]any `json:"workspace_collaborator_actions,omitempty"`
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
	Id string `json:"id"`
	AddedAt string `json:"added_at"`
	ArchivedAt any `json:"archived_at"`
	Description string `json:"description"`
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

// SectionRemoveMatch is the typed request payload for Section.RemoveTyped.
type SectionRemoveMatch struct {
	Id string `json:"id"`
}

// SectionSyncView is the typed data model for the section_sync_view entity.
type SectionSyncView struct {
}

// SectionSyncViewListMatch is the typed request payload for SectionSyncView.ListTyped.
type SectionSyncViewListMatch struct {
	Cursor *any `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Query string `json:"query"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// SectionSyncViewCreateData is the typed request payload for SectionSyncView.CreateTyped.
type SectionSyncViewCreateData struct {
	Id string `json:"id"`
	AddedAt string `json:"added_at"`
	ArchivedAt any `json:"archived_at"`
	Description string `json:"description"`
	IsArchived bool `json:"is_archived"`
	IsCollapsed bool `json:"is_collapsed"`
	IsDeleted bool `json:"is_deleted"`
	Name string `json:"name"`
	OrderKey any `json:"order_key"`
	ProjectId string `json:"project_id"`
	SectionOrder int `json:"section_order"`
	UpdatedAt any `json:"updated_at"`
	UserId string `json:"user_id"`
}

// StatusOk is the typed data model for the status_ok entity.
type StatusOk struct {
}

// StatusOkRemoveMatch is the typed request payload for StatusOk.RemoveTyped.
type StatusOkRemoveMatch struct {
	ObjId string `json:"obj_id"`
	ObjType string `json:"obj_type"`
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

// TaskCreateData is the typed request payload for Task.CreateTyped.
type TaskCreateData struct {
	Id *string `json:"id,omitempty"`
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

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
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
	DontNotify *any `json:"dont_notify,omitempty"`
	Email *string `json:"email,omitempty"`
	FeatureIdentifier *string `json:"feature_identifier,omitempty"`
	Features *map[string]any `json:"features,omitempty"`
	FreeTrialExpires *any `json:"free_trial_expires,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	GettingStartedGuideProjects *any `json:"getting_started_guide_projects,omitempty"`
	HasMagicNumber *bool `json:"has_magic_number,omitempty"`
	HasPassword *bool `json:"has_password,omitempty"`
	HasStartedATrial *bool `json:"has_started_a_trial,omitempty"`
	Id *string `json:"id,omitempty"`
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
	NotificationType *string `json:"notification_type,omitempty"`
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
	Service *string `json:"service,omitempty"`
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

// UserUpdateData is the typed request payload for User.UpdateTyped.
type UserUpdateData struct {
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
	DontNotify *any `json:"dont_notify,omitempty"`
	Email *string `json:"email,omitempty"`
	FeatureIdentifier *string `json:"feature_identifier,omitempty"`
	Features *map[string]any `json:"features,omitempty"`
	FreeTrialExpires *any `json:"free_trial_expires,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	GettingStartedGuideProjects *any `json:"getting_started_guide_projects,omitempty"`
	HasMagicNumber *bool `json:"has_magic_number,omitempty"`
	HasPassword *bool `json:"has_password,omitempty"`
	HasStartedATrial *bool `json:"has_started_a_trial,omitempty"`
	Id *string `json:"id,omitempty"`
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
	NotificationType *string `json:"notification_type,omitempty"`
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
	Service *string `json:"service,omitempty"`
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
	DomainDiscovery *any `json:"domain_discovery,omitempty"`
	DomainName *any `json:"domain_name,omitempty"`
	Id *string `json:"id,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsGuestAllowed *bool `json:"is_guest_allowed,omitempty"`
	IsLinkSharingEnabled *bool `json:"is_link_sharing_enabled,omitempty"`
	IsTrialPending *bool `json:"is_trial_pending,omitempty"`
	Name *string `json:"name,omitempty"`
	Properties *any `json:"properties,omitempty"`
	RestrictEmailDomains *any `json:"restrict_email_domains,omitempty"`
}

// WorkspaceCreateData is the typed request payload for Workspace.CreateTyped.
type WorkspaceCreateData struct {
	Id int `json:"id"`
	Description *string `json:"description,omitempty"`
	DomainDiscovery *any `json:"domain_discovery,omitempty"`
	DomainName *any `json:"domain_name,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	IsCollapsed *bool `json:"is_collapsed,omitempty"`
	IsGuestAllowed *bool `json:"is_guest_allowed,omitempty"`
	IsLinkSharingEnabled *bool `json:"is_link_sharing_enabled,omitempty"`
	IsTrialPending *bool `json:"is_trial_pending,omitempty"`
	Name *string `json:"name,omitempty"`
	Properties *any `json:"properties,omitempty"`
	RestrictEmailDomains *any `json:"restrict_email_domains,omitempty"`
}

// WorkspaceRemoveMatch is the typed request payload for Workspace.RemoveTyped.
type WorkspaceRemoveMatch struct {
	Id int `json:"id"`
}

// WorkspaceInvitationView is the typed data model for the workspace_invitation_view entity.
type WorkspaceInvitationView struct {
}

// WorkspaceInvitationViewListMatch is the typed request payload for WorkspaceInvitationView.ListTyped.
type WorkspaceInvitationViewListMatch struct {
	WorkspaceId int `json:"workspace_id"`
}

// WorkspaceInvitationViewCreateData is the typed request payload for WorkspaceInvitationView.CreateTyped.
type WorkspaceInvitationViewCreateData struct {
	App *string `json:"app,omitempty"`
	Id *string `json:"id,omitempty"`
	InviterId string `json:"inviter_id"`
	Role string `json:"role"`
	UserEmail string `json:"user_email"`
	WorkspaceId string `json:"workspace_id"`
}

// WorkspaceInvitationViewUpdateData is the typed request payload for WorkspaceInvitationView.UpdateTyped.
type WorkspaceInvitationViewUpdateData struct {
	InviteCode string `json:"invite_code"`
	App *string `json:"app,omitempty"`
	Id *string `json:"id,omitempty"`
	InviterId *string `json:"inviter_id,omitempty"`
	Role *string `json:"role,omitempty"`
	UserEmail *string `json:"user_email,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// WorkspaceUserView is the typed data model for the workspace_user_view entity.
type WorkspaceUserView struct {
}

// WorkspaceUserViewCreateData is the typed request payload for WorkspaceUserView.CreateTyped.
type WorkspaceUserViewCreateData struct {
	UserId int `json:"user_id"`
	WorkspaceId int `json:"workspace_id"`
	CustomSortingApplied *bool `json:"custom_sorting_applied,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	ProjectSortPreference *string `json:"project_sort_preference,omitempty"`
	Role *string `json:"role,omitempty"`
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
