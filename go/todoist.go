package voxgigtodoistsdk

import (
	"github.com/technomonkey-7/todoist-sdk/go/core"
	"github.com/technomonkey-7/todoist-sdk/go/entity"
	"github.com/technomonkey-7/todoist-sdk/go/feature"
	_ "github.com/technomonkey-7/todoist-sdk/go/utility"
)

// Type aliases preserve external API.
type TodoistSDK = core.TodoistSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TodoistEntity = core.TodoistEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TodoistError = core.TodoistError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewActiveEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewActiveEntity(client, entopts)
	}
	core.NewActivityEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewActivityEntity(client, entopts)
	}
	core.NewArchivedEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewArchivedEntity(client, entopts)
	}
	core.NewAuthorizationEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewAuthorizationEntity(client, entopts)
	}
	core.NewBackupEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewBackupEntity(client, entopts)
	}
	core.NewBillingPortalUrlEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewBillingPortalUrlEntity(client, entopts)
	}
	core.NewCollaboratorEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewCollaboratorEntity(client, entopts)
	}
	core.NewCommentEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewCommentEntity(client, entopts)
	}
	core.NewCompletedTaskEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewCompletedTaskEntity(client, entopts)
	}
	core.NewCreditStateEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewCreditStateEntity(client, entopts)
	}
	core.NewEmailEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewEmailEntity(client, entopts)
	}
	core.NewFileUrlEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewFileUrlEntity(client, entopts)
	}
	core.NewFolderEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewFolderEntity(client, entopts)
	}
	core.NewHistoryEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewHistoryEntity(client, entopts)
	}
	core.NewIdMappingEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewIdMappingEntity(client, entopts)
	}
	core.NewInviteEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewInviteEntity(client, entopts)
	}
	core.NewLabelEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewLabelEntity(client, entopts)
	}
	core.NewLocationReminderEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewLocationReminderEntity(client, entopts)
	}
	core.NewMemberViewEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewMemberViewEntity(client, entopts)
	}
	core.NewMigratePersonalTokenEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewMigratePersonalTokenEntity(client, entopts)
	}
	core.NewNotificationLocationSyncViewEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewNotificationLocationSyncViewEntity(client, entopts)
	}
	core.NewNotificationSyncViewEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewNotificationSyncViewEntity(client, entopts)
	}
	core.NewPlanDetailEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewPlanDetailEntity(client, entopts)
	}
	core.NewProductivityStatEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewProductivityStatEntity(client, entopts)
	}
	core.NewProjectEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewProjectEntity(client, entopts)
	}
	core.NewProjectImportEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewProjectImportEntity(client, entopts)
	}
	core.NewProjectImportCreateResponseWithObjectEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewProjectImportCreateResponseWithObjectEntity(client, entopts)
	}
	core.NewReminderEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewReminderEntity(client, entopts)
	}
	core.NewRemoveWorkspaceUserEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewRemoveWorkspaceUserEntity(client, entopts)
	}
	core.NewRoleToActionMappingViewEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewRoleToActionMappingViewEntity(client, entopts)
	}
	core.NewSectionEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewSectionEntity(client, entopts)
	}
	core.NewSharedLabelEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewSharedLabelEntity(client, entopts)
	}
	core.NewStatusOkEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewStatusOkEntity(client, entopts)
	}
	core.NewSubscriptionInfoEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewSubscriptionInfoEntity(client, entopts)
	}
	core.NewTaskEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewTaskEntity(client, entopts)
	}
	core.NewTemplateEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewTemplateEntity(client, entopts)
	}
	core.NewTopUpEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewTopUpEntity(client, entopts)
	}
	core.NewUploadEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewUploadEntity(client, entopts)
	}
	core.NewUsageSummaryEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewUsageSummaryEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewUserEntity(client, entopts)
	}
	core.NewWorkspaceEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewWorkspaceEntity(client, entopts)
	}
	core.NewWorkspaceInvitationViewEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewWorkspaceInvitationViewEntity(client, entopts)
	}
	core.NewWorkspaceUserViewEntityFunc = func(client *core.TodoistSDK, entopts map[string]any) core.TodoistEntity {
		return entity.NewWorkspaceUserViewEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTodoistSDK = core.NewTodoistSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTodoistSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TodoistSDK  { return NewTodoistSDK(nil) }
func Test() *TodoistSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
