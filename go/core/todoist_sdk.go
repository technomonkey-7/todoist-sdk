package core

import (
	"encoding/json"
	"fmt"
	"strings"

	vs "github.com/technomonkey-7/todoist-sdk/go/utility/struct"
)

type TodoistSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewTodoistSDK(options map[string]any) *TodoistSDK {
	sdk := &TodoistSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

// The client holds the credential in its options, so a print or a JSON dump
// carries the name alone. Value receivers: a dereferenced client prints the
// same way.
func (sdk TodoistSDK) String() string {
	return "Todoist " + vs.Jsonify(map[string]any{"name": "Todoist"},
		map[string]any{"indent": 0})
}

func (sdk TodoistSDK) GoString() string {
	return sdk.String()
}

func (sdk TodoistSDK) MarshalJSON() ([]byte, error) {
	return json.Marshal(map[string]any{"name": "Todoist"})
}

func (sdk *TodoistSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *TodoistSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *TodoistSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *TodoistSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}
	method = strings.ToUpper(method)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	if !Allowed(allowMethodVal, method) {
		allowMethod, _ := allowMethodVal.(string)
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+method+"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *TodoistSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *TodoistSDK) opAllowed(op string) bool {
	return Allowed(vs.GetPath(sdk.options, []any{"allow", "op"}), op)
}

func (sdk *TodoistSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("TodoistSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *TodoistSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(sdk.rootctx, err)}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(ctx, fetchErr)}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		var bodyErr error
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
			if unreadable, _ := vs.GetProp(fm, "unreadable").(bool); unreadable {
				var failed error
				if status < 200 || status >= 300 {
					failed = ctx.MakeError("request_status",
						fmt.Sprintf("request: %d: %v", status, vs.GetProp(fm, "statusText")))
				}
				bodyErr = UnreadableBody(ctx, status, headers, vs.GetProp(fm, "body"),
					fetchdef["headers"], failed)
			}
		}

		out := map[string]any{
			"ok":      bodyErr == nil && status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}
		if bodyErr != nil {
			out["err"] = sdk.cleanErr(ctx, bodyErr)
		}
		return out, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// A raw request returns its error rather than passing it through MakeError.
func (sdk *TodoistSDK) cleanErr(ctx *Context, err error) error {
	if cleaned, ok := sdk.utility.Clean(ctx, err).(error); ok {
		return cleaned
	}
	return err
}

func (sdk *TodoistSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("TodoistSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Active returns a Active entity bound to this client.
// Idiomatic usage: client.Active(nil).List(nil, nil) or
// client.Active(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Active(data map[string]any) TodoistEntity {
	return NewActiveEntityFunc(sdk, data)
}


// Activity returns a Activity entity bound to this client.
// Idiomatic usage: client.Activity(nil).List(nil, nil) or
// client.Activity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Activity(data map[string]any) TodoistEntity {
	return NewActivityEntityFunc(sdk, data)
}


// Archived returns a Archived entity bound to this client.
// Idiomatic usage: client.Archived(nil).List(nil, nil) or
// client.Archived(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Archived(data map[string]any) TodoistEntity {
	return NewArchivedEntityFunc(sdk, data)
}


// Authorization returns a Authorization entity bound to this client.
// Idiomatic usage: client.Authorization(nil).List(nil, nil) or
// client.Authorization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Authorization(data map[string]any) TodoistEntity {
	return NewAuthorizationEntityFunc(sdk, data)
}


// Backup returns a Backup entity bound to this client.
// Idiomatic usage: client.Backup(nil).List(nil, nil) or
// client.Backup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Backup(data map[string]any) TodoistEntity {
	return NewBackupEntityFunc(sdk, data)
}


// BillingPortalUrl returns a BillingPortalUrl entity bound to this client.
// Idiomatic usage: client.BillingPortalUrl(nil).List(nil, nil) or
// client.BillingPortalUrl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) BillingPortalUrl(data map[string]any) TodoistEntity {
	return NewBillingPortalUrlEntityFunc(sdk, data)
}


// Collaborator returns a Collaborator entity bound to this client.
// Idiomatic usage: client.Collaborator(nil).List(nil, nil) or
// client.Collaborator(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Collaborator(data map[string]any) TodoistEntity {
	return NewCollaboratorEntityFunc(sdk, data)
}


// Comment returns a Comment entity bound to this client.
// Idiomatic usage: client.Comment(nil).List(nil, nil) or
// client.Comment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Comment(data map[string]any) TodoistEntity {
	return NewCommentEntityFunc(sdk, data)
}


// CompletedTask returns a CompletedTask entity bound to this client.
// Idiomatic usage: client.CompletedTask(nil).List(nil, nil) or
// client.CompletedTask(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) CompletedTask(data map[string]any) TodoistEntity {
	return NewCompletedTaskEntityFunc(sdk, data)
}


// CreditState returns a CreditState entity bound to this client.
// Idiomatic usage: client.CreditState(nil).List(nil, nil) or
// client.CreditState(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) CreditState(data map[string]any) TodoistEntity {
	return NewCreditStateEntityFunc(sdk, data)
}


// Email returns a Email entity bound to this client.
// Idiomatic usage: client.Email(nil).List(nil, nil) or
// client.Email(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Email(data map[string]any) TodoistEntity {
	return NewEmailEntityFunc(sdk, data)
}


// FileUrl returns a FileUrl entity bound to this client.
// Idiomatic usage: client.FileUrl(nil).List(nil, nil) or
// client.FileUrl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) FileUrl(data map[string]any) TodoistEntity {
	return NewFileUrlEntityFunc(sdk, data)
}


// Folder returns a Folder entity bound to this client.
// Idiomatic usage: client.Folder(nil).List(nil, nil) or
// client.Folder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Folder(data map[string]any) TodoistEntity {
	return NewFolderEntityFunc(sdk, data)
}


// History returns a History entity bound to this client.
// Idiomatic usage: client.History(nil).List(nil, nil) or
// client.History(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) History(data map[string]any) TodoistEntity {
	return NewHistoryEntityFunc(sdk, data)
}


// IdMapping returns a IdMapping entity bound to this client.
// Idiomatic usage: client.IdMapping(nil).List(nil, nil) or
// client.IdMapping(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) IdMapping(data map[string]any) TodoistEntity {
	return NewIdMappingEntityFunc(sdk, data)
}


// Invite returns a Invite entity bound to this client.
// Idiomatic usage: client.Invite(nil).List(nil, nil) or
// client.Invite(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Invite(data map[string]any) TodoistEntity {
	return NewInviteEntityFunc(sdk, data)
}


// Label returns a Label entity bound to this client.
// Idiomatic usage: client.Label(nil).List(nil, nil) or
// client.Label(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Label(data map[string]any) TodoistEntity {
	return NewLabelEntityFunc(sdk, data)
}


// LocationReminder returns a LocationReminder entity bound to this client.
// Idiomatic usage: client.LocationReminder(nil).List(nil, nil) or
// client.LocationReminder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) LocationReminder(data map[string]any) TodoistEntity {
	return NewLocationReminderEntityFunc(sdk, data)
}


// MemberView returns a MemberView entity bound to this client.
// Idiomatic usage: client.MemberView(nil).List(nil, nil) or
// client.MemberView(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) MemberView(data map[string]any) TodoistEntity {
	return NewMemberViewEntityFunc(sdk, data)
}


// MigratePersonalToken returns a MigratePersonalToken entity bound to this client.
// Idiomatic usage: client.MigratePersonalToken(nil).List(nil, nil) or
// client.MigratePersonalToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) MigratePersonalToken(data map[string]any) TodoistEntity {
	return NewMigratePersonalTokenEntityFunc(sdk, data)
}


// NotificationLocationSyncView returns a NotificationLocationSyncView entity bound to this client.
// Idiomatic usage: client.NotificationLocationSyncView(nil).List(nil, nil) or
// client.NotificationLocationSyncView(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) NotificationLocationSyncView(data map[string]any) TodoistEntity {
	return NewNotificationLocationSyncViewEntityFunc(sdk, data)
}


// NotificationSyncView returns a NotificationSyncView entity bound to this client.
// Idiomatic usage: client.NotificationSyncView(nil).List(nil, nil) or
// client.NotificationSyncView(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) NotificationSyncView(data map[string]any) TodoistEntity {
	return NewNotificationSyncViewEntityFunc(sdk, data)
}


// PlanDetail returns a PlanDetail entity bound to this client.
// Idiomatic usage: client.PlanDetail(nil).List(nil, nil) or
// client.PlanDetail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) PlanDetail(data map[string]any) TodoistEntity {
	return NewPlanDetailEntityFunc(sdk, data)
}


// ProductivityStat returns a ProductivityStat entity bound to this client.
// Idiomatic usage: client.ProductivityStat(nil).List(nil, nil) or
// client.ProductivityStat(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) ProductivityStat(data map[string]any) TodoistEntity {
	return NewProductivityStatEntityFunc(sdk, data)
}


// Project returns a Project entity bound to this client.
// Idiomatic usage: client.Project(nil).List(nil, nil) or
// client.Project(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Project(data map[string]any) TodoistEntity {
	return NewProjectEntityFunc(sdk, data)
}


// ProjectImport returns a ProjectImport entity bound to this client.
// Idiomatic usage: client.ProjectImport(nil).List(nil, nil) or
// client.ProjectImport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) ProjectImport(data map[string]any) TodoistEntity {
	return NewProjectImportEntityFunc(sdk, data)
}


// ProjectImportCreateResponseWithObject returns a ProjectImportCreateResponseWithObject entity bound to this client.
// Idiomatic usage: client.ProjectImportCreateResponseWithObject(nil).List(nil, nil) or
// client.ProjectImportCreateResponseWithObject(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) ProjectImportCreateResponseWithObject(data map[string]any) TodoistEntity {
	return NewProjectImportCreateResponseWithObjectEntityFunc(sdk, data)
}


// Reminder returns a Reminder entity bound to this client.
// Idiomatic usage: client.Reminder(nil).List(nil, nil) or
// client.Reminder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Reminder(data map[string]any) TodoistEntity {
	return NewReminderEntityFunc(sdk, data)
}


// RemoveWorkspaceUser returns a RemoveWorkspaceUser entity bound to this client.
// Idiomatic usage: client.RemoveWorkspaceUser(nil).List(nil, nil) or
// client.RemoveWorkspaceUser(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) RemoveWorkspaceUser(data map[string]any) TodoistEntity {
	return NewRemoveWorkspaceUserEntityFunc(sdk, data)
}


// RoleToActionMappingView returns a RoleToActionMappingView entity bound to this client.
// Idiomatic usage: client.RoleToActionMappingView(nil).List(nil, nil) or
// client.RoleToActionMappingView(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) RoleToActionMappingView(data map[string]any) TodoistEntity {
	return NewRoleToActionMappingViewEntityFunc(sdk, data)
}


// Section returns a Section entity bound to this client.
// Idiomatic usage: client.Section(nil).List(nil, nil) or
// client.Section(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Section(data map[string]any) TodoistEntity {
	return NewSectionEntityFunc(sdk, data)
}


// SharedLabel returns a SharedLabel entity bound to this client.
// Idiomatic usage: client.SharedLabel(nil).List(nil, nil) or
// client.SharedLabel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) SharedLabel(data map[string]any) TodoistEntity {
	return NewSharedLabelEntityFunc(sdk, data)
}


// StatusOk returns a StatusOk entity bound to this client.
// Idiomatic usage: client.StatusOk(nil).List(nil, nil) or
// client.StatusOk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) StatusOk(data map[string]any) TodoistEntity {
	return NewStatusOkEntityFunc(sdk, data)
}


// SubscriptionInfo returns a SubscriptionInfo entity bound to this client.
// Idiomatic usage: client.SubscriptionInfo(nil).List(nil, nil) or
// client.SubscriptionInfo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) SubscriptionInfo(data map[string]any) TodoistEntity {
	return NewSubscriptionInfoEntityFunc(sdk, data)
}


// Task returns a Task entity bound to this client.
// Idiomatic usage: client.Task(nil).List(nil, nil) or
// client.Task(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Task(data map[string]any) TodoistEntity {
	return NewTaskEntityFunc(sdk, data)
}


// Template returns a Template entity bound to this client.
// Idiomatic usage: client.Template(nil).List(nil, nil) or
// client.Template(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Template(data map[string]any) TodoistEntity {
	return NewTemplateEntityFunc(sdk, data)
}


// TopUp returns a TopUp entity bound to this client.
// Idiomatic usage: client.TopUp(nil).List(nil, nil) or
// client.TopUp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) TopUp(data map[string]any) TodoistEntity {
	return NewTopUpEntityFunc(sdk, data)
}


// Upload returns a Upload entity bound to this client.
// Idiomatic usage: client.Upload(nil).List(nil, nil) or
// client.Upload(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Upload(data map[string]any) TodoistEntity {
	return NewUploadEntityFunc(sdk, data)
}


// UsageSummary returns a UsageSummary entity bound to this client.
// Idiomatic usage: client.UsageSummary(nil).List(nil, nil) or
// client.UsageSummary(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) UsageSummary(data map[string]any) TodoistEntity {
	return NewUsageSummaryEntityFunc(sdk, data)
}


// User returns a User entity bound to this client.
// Idiomatic usage: client.User(nil).List(nil, nil) or
// client.User(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) User(data map[string]any) TodoistEntity {
	return NewUserEntityFunc(sdk, data)
}


// Workspace returns a Workspace entity bound to this client.
// Idiomatic usage: client.Workspace(nil).List(nil, nil) or
// client.Workspace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) Workspace(data map[string]any) TodoistEntity {
	return NewWorkspaceEntityFunc(sdk, data)
}


// WorkspaceInvitationView returns a WorkspaceInvitationView entity bound to this client.
// Idiomatic usage: client.WorkspaceInvitationView(nil).List(nil, nil) or
// client.WorkspaceInvitationView(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) WorkspaceInvitationView(data map[string]any) TodoistEntity {
	return NewWorkspaceInvitationViewEntityFunc(sdk, data)
}


// WorkspaceUserView returns a WorkspaceUserView entity bound to this client.
// Idiomatic usage: client.WorkspaceUserView(nil).List(nil, nil) or
// client.WorkspaceUserView(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TodoistSDK) WorkspaceUserView(data map[string]any) TodoistEntity {
	return NewWorkspaceUserViewEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *TodoistSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewTodoistSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
