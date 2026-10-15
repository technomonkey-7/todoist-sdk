package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewActivityEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewBackupEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewBillingPortalUrlEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewCollaboratorEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewCommentEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewCompletedTaskEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewCreditStateEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewEmailEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewFileUrlEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewFolderEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewHistoryEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewIdMappingEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewLabelEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewLocationReminderEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewNotificationSettingEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewPlanDetailEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProductivityStatEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProjectEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProjectImportEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewProjectPermissionEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewReminderEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewSectionEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewSharedLabelEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewSubscriptionInfoEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewTaskEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewTemplateEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewTopUpEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewUploadEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewUsageSummaryEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewUserEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewWorkspaceEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewWorkspaceInvitationEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewWorkspaceProjectEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

var NewWorkspaceUserEntityFunc func(client *TodoistSDK, entopts map[string]any) TodoistEntity

