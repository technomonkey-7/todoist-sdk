package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewActiveEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewActivityEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewAnyProjectSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewArchivedEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewAuthorizationEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewBackupEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewBillingPortalUrlEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewByCompletionDateEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewByDueDateEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewCollaboratorEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewCommentEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewCreditStateEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewEmailEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewFileUrlEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewFolderEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewHistoryEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewIdMappingEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewInviteEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewItemSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewLabelEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewLabelRestViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewLocationReminderEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewMemberViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewMigratePersonalTokenEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewNoteSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewNotificationLocationSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewNotificationSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewPaginatedListAnyProjectSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewPaginatedListItemSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewPaginatedListStrEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewPlanDetailEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProductivityStatEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProjectEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProjectImportEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProjectImportCreateResponseWithObjectEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewReminderEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewRemoveWorkspaceUserEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewRoleToActionMappingViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewSectionEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewSectionSyncViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewStatusOkEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewSubscriptionInfoEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewTaskEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewTemplateEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewTopUpEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewUploadEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewUsageSummaryEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewUserEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewWorkspaceEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewWorkspaceInvitationViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewWorkspaceUserViewEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

