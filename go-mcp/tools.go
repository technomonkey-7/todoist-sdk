package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/technomonkey-7/todoist-sdk/go"
)

// ListArgs is what an agent sends to todoist_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: activity | backup | collaborator | comment | completed_task | folder | history | id_mapping | label | location_reminder | plan_detail | productivity_stat | project | project_permission | reminder | section | shared_label | task | usage_summary | workspace | workspace_invitation | workspace_project | workspace_user"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to todoist_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: backup | comment | credit_state | file_url | folder | label | location_reminder | project | reminder | section | task | template | user | workspace"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

// CreateArgs is what an agent sends to todoist_create.
type CreateArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: billing_portal_url | comment | folder | label | location_reminder | project | reminder | section | subscription_info | task | top_up | upload | workspace | workspace_user"`
	Data   map[string]any `json:"data" jsonschema:"the new record's fields"`
}

// UpdateArgs is what an agent sends to todoist_update.
type UpdateArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: comment | email | folder | label | location_reminder | notification_setting | project | reminder | section | shared_label | task | workspace | workspace_user"`
	Data   map[string]any `json:"data" jsonschema:"the record's id and the fields to change"`
}

// RemoveArgs is what an agent sends to todoist_remove.
type RemoveArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: comment | email | folder | label | location_reminder | project | reminder | section | shared_label | task | upload | workspace | workspace_invitation | workspace_user"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.TodoistSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "todoist_list",
		Description: "List records from Todoist. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("activity", "backup", "collaborator", "comment", "completed_task", "folder", "history", "id_mapping", "label", "location_reminder", "plan_detail", "productivity_stat", "project", "project_permission", "reminder", "section", "shared_label", "task", "usage_summary", "workspace", "workspace_invitation", "workspace_project", "workspace_user"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "todoist_load",
		Description: "Load one record from Todoist. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("backup", "comment", "credit_state", "file_url", "folder", "label", "location_reminder", "project", "reminder", "section", "task", "template", "user", "workspace"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "todoist_create",
		Description: "Create a record in Todoist. Args: entity, data (the new record's fields). Returns the created record as JSON.",
		Annotations: &mcp.ToolAnnotations{DestructiveHint: hint(false)},
		InputSchema: entitySchema[CreateArgs]("billing_portal_url", "comment", "folder", "label", "location_reminder", "project", "reminder", "section", "subscription_info", "task", "top_up", "upload", "workspace", "workspace_user"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args CreateArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "create", args.Entity, args.Data)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "todoist_update",
		Description: "Update a record in Todoist. Args: entity, data (the record's id and the fields to change). Returns the updated record as JSON.",
		Annotations: &mcp.ToolAnnotations{DestructiveHint: hint(true)},
		InputSchema: entitySchema[UpdateArgs]("comment", "email", "folder", "label", "location_reminder", "notification_setting", "project", "reminder", "section", "shared_label", "task", "workspace", "workspace_user"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args UpdateArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "update", args.Entity, args.Data)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "todoist_remove",
		Description: "Remove a record from Todoist. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the removed record as JSON.",
		Annotations: &mcp.ToolAnnotations{DestructiveHint: hint(true)},
		InputSchema: entitySchema[RemoveArgs]("comment", "email", "folder", "label", "location_reminder", "project", "reminder", "section", "shared_label", "task", "upload", "workspace", "workspace_invitation", "workspace_user"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args RemoveArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "remove", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.TodoistSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.TodoistSDK, name string) (sdk.TodoistEntity, error) {
	switch strings.ToLower(name) {
	case "activity":
		return client.Activity(nil), nil
	case "backup":
		return client.Backup(nil), nil
	case "billing_portal_url":
		return client.BillingPortalUrl(nil), nil
	case "collaborator":
		return client.Collaborator(nil), nil
	case "comment":
		return client.Comment(nil), nil
	case "completed_task":
		return client.CompletedTask(nil), nil
	case "credit_state":
		return client.CreditState(nil), nil
	case "email":
		return client.Email(nil), nil
	case "file_url":
		return client.FileUrl(nil), nil
	case "folder":
		return client.Folder(nil), nil
	case "history":
		return client.History(nil), nil
	case "id_mapping":
		return client.IdMapping(nil), nil
	case "label":
		return client.Label(nil), nil
	case "location_reminder":
		return client.LocationReminder(nil), nil
	case "notification_setting":
		return client.NotificationSetting(nil), nil
	case "plan_detail":
		return client.PlanDetail(nil), nil
	case "productivity_stat":
		return client.ProductivityStat(nil), nil
	case "project":
		return client.Project(nil), nil
	case "project_import":
		return client.ProjectImport(nil), nil
	case "project_permission":
		return client.ProjectPermission(nil), nil
	case "reminder":
		return client.Reminder(nil), nil
	case "section":
		return client.Section(nil), nil
	case "shared_label":
		return client.SharedLabel(nil), nil
	case "subscription_info":
		return client.SubscriptionInfo(nil), nil
	case "task":
		return client.Task(nil), nil
	case "template":
		return client.Template(nil), nil
	case "top_up":
		return client.TopUp(nil), nil
	case "upload":
		return client.Upload(nil), nil
	case "usage_summary":
		return client.UsageSummary(nil), nil
	case "user":
		return client.User(nil), nil
	case "workspace":
		return client.Workspace(nil), nil
	case "workspace_invitation":
		return client.WorkspaceInvitation(nil), nil
	case "workspace_project":
		return client.WorkspaceProject(nil), nil
	case "workspace_user":
		return client.WorkspaceUser(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
