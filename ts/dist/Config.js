"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Todoist',
        slug: "todoist",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://api.todoist.com/",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            active: {},
            activity: {},
            archived: {},
            authorization: {},
            backup: {},
            billing_portal_url: {},
            collaborator: {},
            comment: {},
            completed_task: {},
            credit_state: {},
            email: {},
            file_url: {},
            folder: {},
            history: {},
            id_mapping: {},
            invite: {},
            label: {},
            location_reminder: {},
            member_view: {},
            migrate_personal_token: {},
            notification_location_sync_view: {},
            notification_sync_view: {},
            plan_detail: {},
            productivity_stat: {},
            project: {},
            project_import: {},
            project_import_create_response_with_object: {},
            reminder: {},
            remove_workspace_user: {},
            role_to_action_mapping_view: {},
            section: {},
            shared_label: {},
            status_ok: {},
            subscription_info: {},
            task: {},
            template: {},
            top_up: {},
            upload: {},
            usage_summary: {},
            user: {},
            workspace: {},
            workspace_invitation_view: {},
            workspace_user_view: {},
        }
    };
    entity = {
        "active": {
            "fields": [
                {
                    "name": "access",
                    "title": "Access",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Project access configuration."
                },
                {
                    "name": "archived_date",
                    "title": "Archived Date",
                    "type": "`$ANY`",
                    "short": "Date and time when the project was archived, or `null` if active."
                },
                {
                    "name": "archived_timestamp",
                    "title": "Archived Timestamp",
                    "type": "`$INTEGER`",
                    "short": "Unix timestamp for when the project was archived, or 0 if active."
                },
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$ANY`",
                    "short": "Numeric project color code."
                },
                {
                    "name": "default_order",
                    "title": "Default Order",
                    "type": "`$INTEGER`",
                    "short": "Default order of the project in workspace views."
                },
                {
                    "name": "default_order_key",
                    "title": "Default Order Key",
                    "type": "`$ANY`",
                    "short": "Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together)."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Project description."
                },
                {
                    "name": "folder_id",
                    "title": "Folder Id",
                    "type": "`$STRING`",
                    "short": "Numeric ID of the folder that contains the project, or `null`."
                },
                {
                    "name": "icon",
                    "title": "Icon",
                    "type": "`$ANY`",
                    "short": "Project icon name, or `null` for the default icon."
                },
                {
                    "name": "initiated_by_uid",
                    "title": "Initiated By Uid",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Numeric ID of the user requesting the workspace project."
                },
                {
                    "name": "is_archived",
                    "title": "Is Archived",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the workspace project is archived."
                },
                {
                    "name": "is_frozen",
                    "title": "Is Frozen",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the project is frozen and cannot be modified."
                },
                {
                    "name": "is_invite_only",
                    "title": "Is Invite Only",
                    "type": "`$BOOLEAN`",
                    "short": "Whether joining the workspace project requires an invitation."
                },
                {
                    "name": "is_project_insights_enabled",
                    "title": "Is Project Insights Enabled",
                    "type": "`$BOOLEAN`",
                    "short": "Whether project insights are enabled for the project."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Project name."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the project."
                },
                {
                    "name": "public_access",
                    "title": "Public Access",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the project is publicly accessible."
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$ANY`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Project status."
                },
                {
                    "name": "view_style",
                    "title": "View Style",
                    "type": "`$STRING`",
                    "short": "Project view style."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Numeric ID of the workspace that contains the project."
                }
            ],
            "name": "active",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces/{workspace_id}/projects/active",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "lit": "active"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{workspace_id}",
                                "projects",
                                "active"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.workspace_projects`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.workspace"
                    ]
                ]
            }
        },
        "activity": {
            "fields": [
                {
                    "name": "event_date",
                    "title": "Event Date",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The timestamp when this activity occurred.",
                    "format": "date-time"
                },
                {
                    "name": "event_type",
                    "title": "Event Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of event that occurred."
                },
                {
                    "name": "extra_data",
                    "title": "Extra Data",
                    "type": "`$ANY`",
                    "short": "This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`…"
                },
                {
                    "name": "extra_data_id",
                    "title": "Extra Data Id",
                    "type": "`$STRING`",
                    "short": "Internal ID for the extra activity data row."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "The internal unique identifier for this activity log entry."
                },
                {
                    "name": "initiator_id",
                    "title": "Initiator Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "object_id",
                    "title": "Object Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the object this activity relates to (project, item, note, or section ID)."
                },
                {
                    "name": "object_type",
                    "title": "Object Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of object this activity relates to."
                },
                {
                    "name": "parent_item_id",
                    "title": "Parent Item Id",
                    "type": "`$STRING`",
                    "short": "For note (comment) activities, the ID of the item (task) that the note is attached to."
                },
                {
                    "name": "parent_project_id",
                    "title": "Parent Project Id",
                    "type": "`$STRING`",
                    "short": "The ID of the project that contains the object this activity relates to."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "activity",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/activities",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "activities"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "activities"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "annotate_note",
                                        "orig": "annotate_notes",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "annotate_parent",
                                        "orig": "annotate_parents",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_from",
                                        "orig": "date_from",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_to",
                                        "orig": "date_to",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "ensure_last_state",
                                        "orig": "ensure_last_state",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "event_type",
                                        "orig": "event_type",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "include_child_object",
                                        "orig": "include_child_objects",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "include_parent_object",
                                        "orig": "include_parent_object",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "initiator_id",
                                        "orig": "initiator_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "initiator_id_null",
                                        "orig": "initiator_id_null",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "object_event_type",
                                        "orig": "object_event_types",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "object_id",
                                        "orig": "object_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "object_type",
                                        "orig": "object_type",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "parent_item_id",
                                        "orig": "parent_item_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "parent_project_id",
                                        "orig": "parent_project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "archived": {
            "fields": [
                {
                    "name": "access",
                    "title": "Access",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Project access configuration."
                },
                {
                    "name": "archived_date",
                    "title": "Archived Date",
                    "type": "`$ANY`",
                    "short": "Date and time when the project was archived, or `null` if active."
                },
                {
                    "name": "archived_timestamp",
                    "title": "Archived Timestamp",
                    "type": "`$INTEGER`",
                    "short": "Unix timestamp for when the project was archived, or 0 if active."
                },
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$ANY`",
                    "short": "Numeric project color code."
                },
                {
                    "name": "default_order",
                    "title": "Default Order",
                    "type": "`$INTEGER`",
                    "short": "Default order of the project in workspace views."
                },
                {
                    "name": "default_order_key",
                    "title": "Default Order Key",
                    "type": "`$ANY`",
                    "short": "Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together)."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Project description."
                },
                {
                    "name": "folder_id",
                    "title": "Folder Id",
                    "type": "`$STRING`",
                    "short": "Numeric ID of the folder that contains the project, or `null`."
                },
                {
                    "name": "icon",
                    "title": "Icon",
                    "type": "`$ANY`",
                    "short": "Project icon name, or `null` for the default icon."
                },
                {
                    "name": "initiated_by_uid",
                    "title": "Initiated By Uid",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Numeric ID of the user requesting the workspace project."
                },
                {
                    "name": "is_archived",
                    "title": "Is Archived",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the workspace project is archived."
                },
                {
                    "name": "is_frozen",
                    "title": "Is Frozen",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the project is frozen and cannot be modified."
                },
                {
                    "name": "is_invite_only",
                    "title": "Is Invite Only",
                    "type": "`$BOOLEAN`",
                    "short": "Whether joining the workspace project requires an invitation."
                },
                {
                    "name": "is_project_insights_enabled",
                    "title": "Is Project Insights Enabled",
                    "type": "`$BOOLEAN`",
                    "short": "Whether project insights are enabled for the project."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Project name."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the project."
                },
                {
                    "name": "public_access",
                    "title": "Public Access",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the project is publicly accessible."
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$ANY`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Project status."
                },
                {
                    "name": "view_style",
                    "title": "View Style",
                    "type": "`$STRING`",
                    "short": "Project view style."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Numeric ID of the workspace that contains the project."
                }
            ],
            "name": "archived",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces/{workspace_id}/projects/archived",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "lit": "archived"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{workspace_id}",
                                "projects",
                                "archived"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.workspace_projects`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.workspace"
                    ]
                ]
            }
        },
        "authorization": {
            "fields": [
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The token to be revoked (access token)."
                },
                {
                    "name": "token_type_hint",
                    "title": "Token Type Hint",
                    "type": "`$ANY`",
                    "short": "A hint about the type of the token being revoked (optional)."
                }
            ],
            "name": "authorization",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/revoke",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "revoke"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "revoke"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/access_tokens",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "access_tokens"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "access_tokens"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "access_token",
                                        "orig": "access_token",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "client_id",
                                        "orig": "client_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "client_secret",
                                        "orig": "client_secret",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "access_token",
                                    "client_id",
                                    "client_secret"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "backup": {
            "fields": [
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Backup URL"
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Date and time of the backup version"
                }
            ],
            "name": "backup",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/backups",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "backups"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "backups"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "mfa_token",
                                        "orig": "mfa_token",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/backups/download",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "backups"
                                },
                                {
                                    "lit": "download"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "backups",
                                "download"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "file",
                                        "orig": "file",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "download",
                                "exist": [
                                    "file"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "billing_portal_url": {
            "fields": [
                {
                    "name": "billing_portal_url",
                    "title": "Billing Portal Url",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "reason_description",
                    "title": "Reason Description",
                    "type": "`$STRING`",
                    "short": "Human-readable label of the cancellation reason."
                },
                {
                    "name": "reason_flag",
                    "title": "Reason Flag",
                    "type": "`$STRING`",
                    "short": "Short identifier of the cancellation reason category."
                },
                {
                    "name": "reason_text",
                    "title": "Reason Text",
                    "type": "`$STRING`",
                    "short": "Free-form feedback from the user about the cancellation."
                },
                {
                    "name": "return_url",
                    "title": "Return Url",
                    "type": "`$STRING`",
                    "short": "URL the user is redirected to after completing the flow."
                }
            ],
            "name": "billing_portal_url",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/payments/cancel_plan_with_redirect_to_stripe",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "cancel_plan_with_redirect_to_stripe"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "payments",
                                "cancel_plan_with_redirect_to_stripe"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "collaborator": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user's email address"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user's ID"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user's full name"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "collaborator",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/projects/{project_id}/collaborators",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "collaborators"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "{project_id}",
                                "collaborators"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "public_key",
                                        "orig": "public_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.project"
                    ]
                ]
            }
        },
        "comment": {
            "fields": [
                {
                    "name": "attachment",
                    "title": "Attachment",
                    "type": "`$ANY`",
                    "short": "A [File attachment](#tag/Sync/Comments/File-Attachments) object"
                },
                {
                    "name": "content",
                    "title": "Content",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Comment content."
                },
                {
                    "name": "file_attachment",
                    "title": "File Attachment",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "File attachment metadata, or `null` when the comment has no attachment."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the comment."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the comment is deleted."
                },
                {
                    "name": "posted_at",
                    "title": "Posted At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the comment was posted, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "posted_uid",
                    "title": "Posted Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who posted the comment."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "short": "String ID of the project"
                },
                {
                    "name": "reactions",
                    "title": "Reactions",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Reaction emoji mapped to user IDs that reacted."
                },
                {
                    "name": "task_id",
                    "title": "Task Id",
                    "type": "`$STRING`",
                    "short": "String ID of the task"
                },
                {
                    "name": "uids_to_notify",
                    "title": "Uids To Notify",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "String IDs of users notified by the comment."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "comment",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/comments",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "comments"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "comments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/comments",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "comments"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "comments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "public_key",
                                        "orig": "public_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "task_id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/comments/{comment_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "comments",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/comments/{comment_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "comments",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/comments/{comment_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "comments",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/comments/{comment_id}/reactions",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reactions"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "comments",
                                "{id}",
                                "reactions"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reaction_add",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/comments/{comment_id}/reactions/remove",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reactions"
                                },
                                {
                                    "lit": "remove"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "comments",
                                "{id}",
                                "reactions",
                                "remove"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reaction_remove",
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "completed_task": {
            "fields": [
                {
                    "name": "added_at",
                    "title": "Added At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was created, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "added_by_uid",
                    "title": "Added By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who created the task, or `null` if unknown."
                },
                {
                    "name": "assigned_by_uid",
                    "title": "Assigned By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who assigned the task, or `null` if unassigned."
                },
                {
                    "name": "checked",
                    "title": "Checked",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the task is completed."
                },
                {
                    "name": "child_order",
                    "title": "Child Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Position of the task among sibling tasks."
                },
                {
                    "name": "completed_at",
                    "title": "Completed At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was completed, or `null` if active.",
                    "format": "date-time"
                },
                {
                    "name": "completed_by_uid",
                    "title": "Completed By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who completed the task, or `null` if active."
                },
                {
                    "name": "completed_count",
                    "title": "Completed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of times the task has been marked as completed."
                },
                {
                    "name": "content",
                    "title": "Content",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Task content."
                },
                {
                    "name": "day_order",
                    "title": "Day Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Task order for day-based views."
                },
                {
                    "name": "deadline",
                    "title": "Deadline",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Deadline details for the task, or `null` when the task has no deadline."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Task description."
                },
                {
                    "name": "due",
                    "title": "Due",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Due date details for the task, or `null` when the task has no due date."
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Task duration details, or `null` when the task has no duration."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the task."
                },
                {
                    "name": "is_collapsed",
                    "title": "Is Collapsed",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the task is collapsed in the user's view."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the task is deleted."
                },
                {
                    "name": "labels",
                    "title": "Labels",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Names of labels attached to the task."
                },
                {
                    "name": "note_count",
                    "title": "Note Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "**Deprecated**: only returns 0 and is marked for removal."
                },
                {
                    "name": "order_key",
                    "title": "Order Key",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task."
                },
                {
                    "name": "parent_id",
                    "title": "Parent Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the parent task, or `null` if this is a top-level task."
                },
                {
                    "name": "postponed_count",
                    "title": "Postponed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of times the task's due date has been rescheduled by the user."
                },
                {
                    "name": "priority",
                    "title": "Priority",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Task priority from 1 (normal) to 4 (urgent)."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the project that contains the task."
                },
                {
                    "name": "responsible_uid",
                    "title": "Responsible Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user responsible for the task, or `null` if unassigned."
                },
                {
                    "name": "section_id",
                    "title": "Section Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the section that contains the task, or `null` if the task is not in a section."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was last updated, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the user who owns the task."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "completed_task",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks/completed/by_completion_date",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "lit": "completed"
                                },
                                {
                                    "lit": "by_completion_date"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "completed",
                                "by_completion_date"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "filter_lang",
                                        "orig": "filter_lang",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "filter_query",
                                        "orig": "filter_query",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "parent_id",
                                        "orig": "parent_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "public_key",
                                        "orig": "public_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "section_id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "since",
                                        "orig": "since",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "until",
                                        "orig": "until",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "since",
                                    "until"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks/completed/by_due_date",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "lit": "completed"
                                },
                                {
                                    "lit": "by_due_date"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "completed",
                                "by_due_date"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "filter_lang",
                                        "orig": "filter_lang",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "filter_query",
                                        "orig": "filter_query",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "parent_id",
                                        "orig": "parent_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "section_id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "since",
                                        "orig": "since",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "until",
                                        "orig": "until",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "by_due_date",
                                "exist": [
                                    "since",
                                    "until"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "credit_state": {
            "fields": [
                {
                    "name": "available_amount",
                    "title": "Available Amount",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "`available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726."
                },
                {
                    "name": "available_units",
                    "title": "Available Units",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Balance net of in-flight holds (`available_cached - held`)."
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ISO currency code every amount in this response is in."
                },
                {
                    "name": "depleted",
                    "title": "Depleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "No further runs may start."
                },
                {
                    "name": "is_settled_low_balance",
                    "title": "Is Settled Low Balance",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the settled balance before in-flight holds is at or below the low-balance threshold."
                },
                {
                    "name": "low_balance",
                    "title": "Low Balance",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Balance is at or below the low-balance threshold."
                },
                {
                    "name": "settled_amount",
                    "title": "Settled Amount",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "`settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price."
                },
                {
                    "name": "settled_units",
                    "title": "Settled Units",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Balance after settled credits and debits, before in-flight holds (`available_cached`)."
                },
                {
                    "name": "usage_allowed",
                    "title": "Usage Allowed",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether a new run may start right now."
                },
                {
                    "name": "usage_block_reason",
                    "title": "Usage Block Reason",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Why a new run cannot start, or `null` when it can."
                }
            ],
            "name": "credit_state",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/usage_billing/state",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "usage_billing"
                                },
                                {
                                    "lit": "state"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "usage_billing",
                                "state"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "product",
                                        "orig": "product",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "automations"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Email address for the Todoist object."
                },
                {
                    "name": "obj_id",
                    "title": "Obj Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the Todoist object."
                },
                {
                    "name": "obj_type",
                    "title": "Obj Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Type of Todoist object to create an email for."
                }
            ],
            "name": "email",
            "op": {
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/v1/emails",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "emails"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "emails"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "file_url": {
            "fields": [
                {
                    "name": "file_name",
                    "title": "File Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Name of the exported template file."
                },
                {
                    "name": "file_url",
                    "title": "File Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Temporary URL for downloading the exported template.",
                    "format": "uri"
                }
            ],
            "name": "file_url",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/templates/url",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "lit": "url"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "templates",
                                "url"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "use_relative_date",
                                        "orig": "use_relative_dates",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "folder": {
            "fields": [
                {
                    "name": "child_order",
                    "title": "Child Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "User-specific position of the folder."
                },
                {
                    "name": "default_order",
                    "title": "Default Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Default position of the folder in the workspace."
                },
                {
                    "name": "default_order_key",
                    "title": "Default Order Key",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together)."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the folder."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the folder is deleted."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Folder name."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the workspace that contains the folder."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "folder",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/folders/{folder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "folders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "folder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/folders",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "folders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/folders",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "folders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/folders/{folder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "folders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "folder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/folders/{folder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "folders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "folder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "history": {
            "fields": [
                {
                    "name": "category",
                    "title": "Category",
                    "type": "`$STRING`",
                    "short": "What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`."
                },
                {
                    "name": "charged_amount",
                    "title": "Charged Amount",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "`charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274."
                },
                {
                    "name": "charged_units",
                    "title": "Charged Units",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side."
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "When the entry was written, UTC."
                },
                {
                    "name": "credited_amount",
                    "title": "Credited Amount",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "`credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00."
                },
                {
                    "name": "credited_units",
                    "title": "Credited Units",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Units added to the balance, as a positive number, or `null` on a debit."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Human-readable summary of the entry."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Ledger entry id."
                },
                {
                    "name": "refs",
                    "title": "Refs",
                    "type": "`$OBJECT`",
                    "short": "Free-form attribution for the entry."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "history",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/usage_billing/history",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "usage_billing"
                                },
                                {
                                    "lit": "history"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "usage_billing",
                                "history"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "product",
                                        "orig": "product",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "automations"
                                    },
                                    {
                                        "name": "type",
                                        "orig": "types",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "id_mapping": {
            "fields": [
                {
                    "name": "new_id",
                    "title": "New Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Curent ID for the object."
                },
                {
                    "name": "old_id",
                    "title": "Old Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Legacy ID for the object."
                }
            ],
            "name": "id_mapping",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/id_mappings/{obj_name}/{obj_ids}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "id_mappings"
                                },
                                {
                                    "var": "obj_name"
                                },
                                {
                                    "var": "obj_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "id_mappings",
                                "{obj_name}",
                                "{obj_id}"
                            ],
                            "rename": {
                                "param": {
                                    "obj_ids": "obj_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "obj_id",
                                        "orig": "obj_ids",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "obj_name",
                                        "orig": "obj_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "obj_id",
                                    "obj_name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "invite": {
            "fields": [
                {
                    "name": "app",
                    "title": "App",
                    "type": "`$STRING`",
                    "short": "For first-party clients usage only."
                },
                {
                    "name": "email_list",
                    "title": "Email List",
                    "type": "`$ANY`",
                    "short": "List of user emails to invite to the workspace."
                },
                {
                    "name": "invited_emails",
                    "title": "Invited Emails",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Emails successfully invited to the workspace."
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$ANY`",
                    "short": "Role assigned to invited users."
                }
            ],
            "name": "invite",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/workspaces/{workspace_id}/users/invite",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "lit": "invite"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{workspace_id}",
                                "users",
                                "invite"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.workspace"
                    ]
                ]
            }
        },
        "label": {
            "fields": [
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        },
                        "update": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Label color name."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the label."
                },
                {
                    "name": "is_favorite",
                    "title": "Is Favorite",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Whether the label is marked as a favorite."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Label name."
                },
                {
                    "name": "order",
                    "title": "Order",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        },
                        "update": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Position of the label in the label list, or `null` when no explicit order is set."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "label",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/labels",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/labels/search",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels",
                                "search"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "query"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/labels",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/labels/{label_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "label_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "label_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/labels/{label_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "label_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "label_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/labels/{label_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "label_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "label_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "location_reminder": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "location_reminder",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/location_reminders/{reminder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "location_reminders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "location_reminders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "reminder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "reminder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "member_view": {
            "fields": [
                {
                    "name": "full_name",
                    "title": "Full Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Full name of the workspace member."
                },
                {
                    "name": "image_id",
                    "title": "Image Id",
                    "type": "`$STRING`",
                    "short": "Avatar image ID of the workspace member, or `null`."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the workspace member is deleted."
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Workspace role assigned to the member."
                },
                {
                    "name": "timezone",
                    "title": "Timezone",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Timezone of the workspace member."
                },
                {
                    "name": "user_email",
                    "title": "User Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Email address of the workspace member."
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the workspace member."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the workspace."
                }
            ],
            "name": "member_view",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces/users",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "users"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "users"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.workspace_users`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "id"
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "migrate_personal_token": {
            "fields": [
                {
                    "name": "access_token",
                    "title": "Access Token",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "OAuth access token created from the personal token."
                },
                {
                    "name": "client_id",
                    "title": "Client Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique Client ID of the Todoist application that you registered."
                },
                {
                    "name": "client_secret",
                    "title": "Client Secret",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique Client Secret of the Todoist application that you registered."
                },
                {
                    "name": "expires_in",
                    "title": "Expires In",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Access token lifetime in seconds."
                },
                {
                    "name": "personal_token",
                    "title": "Personal Token",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Token obtained from the email/password authentication."
                },
                {
                    "name": "scope",
                    "title": "Scope",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Scopes of the OAuth token."
                },
                {
                    "name": "token_type",
                    "title": "Token Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "OAuth token type."
                }
            ],
            "name": "migrate_personal_token",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/access_tokens/migrate_personal_token",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "access_tokens"
                                },
                                {
                                    "lit": "migrate_personal_token"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "access_tokens",
                                "migrate_personal_token"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "notification_location_sync_view": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the location reminder"
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the location reminder is deleted"
                },
                {
                    "name": "item_id",
                    "title": "Item Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the task"
                },
                {
                    "name": "loc_lat",
                    "title": "Loc Lat",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Latitude of the location"
                },
                {
                    "name": "loc_long",
                    "title": "Loc Long",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Longitude of the location"
                },
                {
                    "name": "loc_trigger",
                    "title": "Loc Trigger",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Trigger type for the location reminder"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Name of the location"
                },
                {
                    "name": "notify_uid",
                    "title": "Notify Uid",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the user who will receive the reminder"
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the project containing the task"
                },
                {
                    "name": "radius",
                    "title": "Radius",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "Radius in meters"
                },
                {
                    "name": "task_id",
                    "title": "Task Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the task"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "short": "The reminder type"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "notification_location_sync_view",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/location_reminders/{reminder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "location_reminders"
                                },
                                {
                                    "var": "reminder_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "location_reminders",
                                "{reminder_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "reminder_id",
                                        "orig": "reminder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "reminder_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/location_reminders",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "location_reminders"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "location_reminders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/location_reminders",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "location_reminders"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "location_reminders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "task_id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/location_reminders/{reminder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "location_reminders"
                                },
                                {
                                    "var": "reminder_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "location_reminders",
                                "{reminder_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "reminder_id",
                                        "orig": "reminder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "reminder_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.location_reminder"
                    ]
                ]
            }
        },
        "notification_sync_view": {
            "fields": [
                {
                    "name": "due",
                    "title": "Due",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Datetime when the reminder fires, or `null` if unset."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the reminder."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the reminder is deleted."
                },
                {
                    "name": "is_urgent",
                    "title": "Is Urgent",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Whether the reminder should be delivered urgently."
                },
                {
                    "name": "item_id",
                    "title": "Item Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the task that owns the reminder."
                },
                {
                    "name": "minute_offset",
                    "title": "Minute Offset",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Minutes before the task due time for relative reminders."
                },
                {
                    "name": "notify_uid",
                    "title": "Notify Uid",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the user who receives the reminder."
                },
                {
                    "name": "reminder_type",
                    "title": "Reminder Type",
                    "type": "`$STRING`",
                    "short": "Type of the reminder: 'relative' or 'absolute'"
                },
                {
                    "name": "service",
                    "title": "Service",
                    "type": "`$STRING`",
                    "short": "Notification service type: 'email', 'push'."
                },
                {
                    "name": "task_id",
                    "title": "Task Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the task"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Reminder type."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "notification_sync_view",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/reminders/{reminder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "reminders"
                                },
                                {
                                    "var": "reminder_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "reminders",
                                "{reminder_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "reminder_id",
                                        "orig": "reminder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "reminder_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/reminders",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "reminders"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "reminders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/reminders",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "reminders"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "reminders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "task_id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/reminders/{reminder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "reminders"
                                },
                                {
                                    "var": "reminder_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "reminders",
                                "{reminder_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "reminder_id",
                                        "orig": "reminder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "reminder_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.reminder"
                    ]
                ]
            }
        },
        "plan_detail": {
            "fields": [
                {
                    "name": "billing_cycle",
                    "title": "Billing Cycle",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Billing cycle for the listed prices."
                },
                {
                    "name": "prices",
                    "title": "Prices",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Prices available for the billing cycle."
                }
            ],
            "name": "plan_detail",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces/plan_details",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "plan_details"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "plan_details"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "productivity_stat": {
            "fields": [
                {
                    "name": "completed_count",
                    "title": "Completed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Total number of tasks completed by the user (all time)"
                },
                {
                    "name": "days_items",
                    "title": "Days Items",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Daily completion statistics for the last 7 days, ordered chronologically"
                },
                {
                    "name": "goals",
                    "title": "Goals",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "User goals, streaks, and productivity settings"
                },
                {
                    "name": "karma",
                    "title": "Karma",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Current karma score"
                },
                {
                    "name": "karma_graph_data",
                    "title": "Karma Graph Data",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Historical karma data points for graphing, each containing date and karma_avg"
                },
                {
                    "name": "karma_last_update",
                    "title": "Karma Last Update",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Net karma change from the most recent update (positive_karma + negative_karma)"
                },
                {
                    "name": "karma_trend",
                    "title": "Karma Trend",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Karma trend indicator ('up' or 'down')"
                },
                {
                    "name": "karma_update_reasons",
                    "title": "Karma Update Reasons",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Recent karma update events with reasons and amounts"
                },
                {
                    "name": "project_colors",
                    "title": "Project Colors",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'})"
                },
                {
                    "name": "week_items",
                    "title": "Week Items",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Weekly completion statistics for the last 4 weeks, ordered chronologically."
                }
            ],
            "name": "productivity_stat",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks/completed/stats",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "lit": "completed"
                                },
                                {
                                    "lit": "stats"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "completed",
                                "stats"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "project": {
            "fields": [
                {
                    "name": "child_order",
                    "title": "Child Order",
                    "type": "`$ANY`",
                    "short": "Updated position of the project in the hierarchy."
                },
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$ANY`",
                    "short": "Color of the project icon."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Description of the project."
                },
                {
                    "name": "folder_id",
                    "title": "Folder Id",
                    "type": "`$STRING`",
                    "short": "Folder to move the project into."
                },
                {
                    "name": "icon",
                    "title": "Icon",
                    "type": "`$ANY`",
                    "short": "Project icon name."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "is_collapsed",
                    "title": "Is Collapsed",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the project is collapsed."
                },
                {
                    "name": "is_favorite",
                    "title": "Is Favorite",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the project is a favorite for the user."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Name of the project."
                },
                {
                    "name": "next_cursor",
                    "title": "Next Cursor",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Cursor for the next page of results, or `null` when there are no more results."
                },
                {
                    "name": "parent_id",
                    "title": "Parent Id",
                    "type": "`$STRING`",
                    "short": "Parent project ID."
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Objects in the current page of results."
                },
                {
                    "name": "view_style",
                    "title": "View Style",
                    "type": "`$ANY`",
                    "short": "View style of the project."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
                    "type": "`$STRING`",
                    "short": "Workspace ID."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "project",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/projects",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/projects/search",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "search"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "query"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/projects",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "folder_id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/projects/archived",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "lit": "archived"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "archived"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    }
                                ]
                            },
                            "select": {
                                "$action": "archived"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/projects/{project_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/projects/{project_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/projects/{project_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/projects/{project_id}/archive",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "archive"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "{id}",
                                "archive"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "archive",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/projects/{project_id}/join",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "join"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "{id}",
                                "join"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "join",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/projects/{project_id}/unarchive",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "unarchive"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "{id}",
                                "unarchive"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "unarchive",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "project_import": {
            "fields": [
                {
                    "name": "comments",
                    "title": "Comments",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Task comments created by the import."
                },
                {
                    "name": "discarded_fields",
                    "title": "Discarded Fields",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Task properties the importer dropped from one or more imported tasks because the plan in force does not include them."
                },
                {
                    "name": "locale",
                    "title": "Locale",
                    "type": "`$STRING`",
                    "short": "Locale to use for localized template content."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the project to import the template into."
                },
                {
                    "name": "project_notes",
                    "title": "Project Notes",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Project comments created by the import."
                },
                {
                    "name": "project_view_options_defaults",
                    "title": "Project View Options Defaults",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "View options defaults applied to the imported project."
                },
                {
                    "name": "projects",
                    "title": "Projects",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Projects created or updated by the import."
                },
                {
                    "name": "reminders",
                    "title": "Reminders",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Reminders created by the import."
                },
                {
                    "name": "sections",
                    "title": "Sections",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Sections created by the import."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Always `ok` on success."
                },
                {
                    "name": "tasks",
                    "title": "Tasks",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Tasks created by the import."
                },
                {
                    "name": "template_id",
                    "title": "Template Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ID of the saved template to import."
                },
                {
                    "name": "template_type",
                    "title": "Template Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Type of template that was imported."
                }
            ],
            "name": "project_import",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/templates/import_into_project_from_file",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "lit": "import_into_project_from_file"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "templates",
                                "import_into_project_from_file"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "fields": [
                                    {
                                        "binary": true,
                                        "media": "application/octet-stream",
                                        "name": "file"
                                    },
                                    {
                                        "name": "project_id"
                                    }
                                ],
                                "kind": "multipart",
                                "media": "multipart/form-data"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/templates/import_into_project_from_template_id",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "lit": "import_into_project_from_template_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "templates",
                                "import_into_project_from_template_id"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "project_import_create_response_with_object": {
            "fields": [
                {
                    "name": "comments",
                    "title": "Comments",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Task comments created by the import."
                },
                {
                    "name": "discarded_fields",
                    "title": "Discarded Fields",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Task properties the importer dropped from one or more imported tasks because the plan in force does not include them."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ID of the project created from the template."
                },
                {
                    "name": "project_notes",
                    "title": "Project Notes",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Project comments created by the import."
                },
                {
                    "name": "project_view_options_defaults",
                    "title": "Project View Options Defaults",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "View options defaults applied to the imported project."
                },
                {
                    "name": "projects",
                    "title": "Projects",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Projects created by the import."
                },
                {
                    "name": "reminders",
                    "title": "Reminders",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Reminders created by the import."
                },
                {
                    "name": "sections",
                    "title": "Sections",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Sections created by the import."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Always `ok` on success."
                },
                {
                    "name": "tasks",
                    "title": "Tasks",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Tasks created by the import."
                },
                {
                    "name": "template_type",
                    "title": "Template Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Type of template that was imported."
                }
            ],
            "name": "project_import_create_response_with_object",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/templates/create_project_from_file",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "lit": "create_project_from_file"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "templates",
                                "create_project_from_file"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "fields": [
                                    {
                                        "binary": true,
                                        "media": "application/octet-stream",
                                        "name": "file"
                                    },
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "workspace_id"
                                    }
                                ],
                                "kind": "multipart",
                                "media": "multipart/form-data"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "reminder": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "reminder",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/reminders/{reminder_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "reminders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "reminders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "reminder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "reminder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "remove_workspace_user": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "remove_workspace_user",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/workspaces/{workspace_id}/users/{user_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{workspace_id}",
                                "users",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "user_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "user_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.workspace"
                    ]
                ]
            }
        },
        "role_to_action_mapping_view": {
            "fields": [
                {
                    "name": "project_collaborator_actions",
                    "title": "Project Collaborator Actions",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Project collaborator roles and their allowed actions."
                },
                {
                    "name": "workspace_collaborator_actions",
                    "title": "Workspace Collaborator Actions",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Workspace collaborator roles and their allowed actions."
                }
            ],
            "name": "role_to_action_mapping_view",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/projects/permissions",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "lit": "permissions"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "projects",
                                "permissions"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "section": {
            "fields": [
                {
                    "name": "added_at",
                    "title": "Added At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Date and time when the section was created.",
                    "format": "date-time"
                },
                {
                    "name": "archived_at",
                    "title": "Archived At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the section was archived, or `null` if it is active.",
                    "format": "date-time"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Section description, or `null` if it has none."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the section."
                },
                {
                    "name": "is_archived",
                    "title": "Is Archived",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the section is archived."
                },
                {
                    "name": "is_collapsed",
                    "title": "Is Collapsed",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Whether the section is collapsed in the user's view."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the section is deleted."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Section name."
                },
                {
                    "name": "order",
                    "title": "Order",
                    "type": "`$ANY`",
                    "short": "Position of the new section in the project"
                },
                {
                    "name": "order_key",
                    "title": "Order Key",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Fractional-indexing order key: sections sort by comparing keys lexicographically within a project."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the project that contains the section."
                },
                {
                    "name": "section_order",
                    "title": "Section Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Position of the section in the project."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the section was last updated, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the user who owns the section."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "section",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/sections",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/sections/search",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections",
                                "search"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "query"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/sections",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "public_key",
                                        "orig": "public_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/sections/{section_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "section_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "public_key",
                                        "orig": "public_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/sections/{section_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "section_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/sections/{section_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "section_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/sections/{section_id}/archive",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "archive"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections",
                                "{id}",
                                "archive"
                            ],
                            "rename": {
                                "param": {
                                    "section_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "archive",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/sections/{section_id}/unarchive",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sections"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "unarchive"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "sections",
                                "{id}",
                                "unarchive"
                            ],
                            "rename": {
                                "param": {
                                    "section_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "unarchive",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "shared_label": {
            "fields": [
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Current shared label name to rename."
                },
                {
                    "name": "new_name",
                    "title": "New Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "New shared label name to apply to matching tasks."
                },
                {
                    "name": "next_cursor",
                    "title": "Next Cursor",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Cursor for the next page of results, or `null` when there are no more results."
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Objects in the current page of results."
                }
            ],
            "name": "shared_label",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/labels/shared",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                },
                                {
                                    "lit": "shared"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels",
                                "shared"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "omit_personal",
                                        "orig": "omit_personal",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/labels/shared/remove",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                },
                                {
                                    "lit": "shared"
                                },
                                {
                                    "lit": "remove"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels",
                                "shared",
                                "remove"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/labels/shared/rename",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "labels"
                                },
                                {
                                    "lit": "shared"
                                },
                                {
                                    "lit": "rename"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "labels",
                                "shared",
                                "rename"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "status_ok": {
            "fields": [],
            "name": "status_ok",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/emails",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "emails"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "emails"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "obj_id",
                                        "orig": "obj_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "obj_type",
                                        "orig": "obj_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "obj_id",
                                    "obj_type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "subscription_info": {
            "fields": [
                {
                    "name": "activation_method",
                    "title": "Activation Method",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "How the active subscription was purchased."
                },
                {
                    "name": "billing_portal_switch_to_annual_url",
                    "title": "Billing Portal Switch To Annual Url",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible."
                },
                {
                    "name": "billing_portal_url",
                    "title": "Billing Portal Url",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "One-time URL to the Stripe customer portal, if available."
                },
                {
                    "name": "expiration_date",
                    "title": "Expiration Date",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date the current paid period ends, in `YYYY-MM-DD` format."
                },
                {
                    "name": "has_billing_portal",
                    "title": "Has Billing Portal",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "`true` when the user has a Stripe customer with a portal session."
                },
                {
                    "name": "has_billing_portal_switch_to_annual",
                    "title": "Has Billing Portal Switch To Annual",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "`true` when a switch-to-annual flow is available in Stripe."
                },
                {
                    "name": "has_switch_legacy_to_current",
                    "title": "Has Switch Legacy To Current",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "`true` when the user is eligible to switch from a legacy Pro price to the current one."
                },
                {
                    "name": "invoice_credit_balance",
                    "title": "Invoice Credit Balance",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g."
                },
                {
                    "name": "plan",
                    "title": "Plan",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Plan tier the user is currently on."
                },
                {
                    "name": "plan_price",
                    "title": "Plan Price",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Price of the active plan, when known."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Current subscription status."
                }
            ],
            "name": "subscription_info",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/payments/get_subscription_info",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "get_subscription_info"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "payments",
                                "get_subscription_info"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/payments/reactivate_plan",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "reactivate_plan"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "payments",
                                "reactivate_plan"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "task": {
            "fields": [
                {
                    "name": "added_at",
                    "title": "Added At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was created, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "added_by_uid",
                    "title": "Added By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who created the task, or `null` if unknown."
                },
                {
                    "name": "assigned_by_uid",
                    "title": "Assigned By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who assigned the task, or `null` if unassigned."
                },
                {
                    "name": "assignee_id",
                    "title": "Assignee Id",
                    "type": "`$STRING`",
                    "short": "ID of the user to assign the task to."
                },
                {
                    "name": "checked",
                    "title": "Checked",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the task is completed."
                },
                {
                    "name": "child_order",
                    "title": "Child Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "Position of the task among sibling tasks."
                },
                {
                    "name": "completed_at",
                    "title": "Completed At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was completed, or `null` if active.",
                    "format": "date-time"
                },
                {
                    "name": "completed_by_uid",
                    "title": "Completed By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who completed the task, or `null` if active."
                },
                {
                    "name": "completed_count",
                    "title": "Completed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of times the task has been marked as completed."
                },
                {
                    "name": "content",
                    "title": "Content",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Task content."
                },
                {
                    "name": "day_order",
                    "title": "Day Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "Task order for day-based views."
                },
                {
                    "name": "deadline",
                    "title": "Deadline",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Deadline details for the task, or `null` when the task has no deadline."
                },
                {
                    "name": "deadline_date",
                    "title": "Deadline Date",
                    "type": "`$ANY`",
                    "short": "Deadline date in YYYY-MM-DD format",
                    "format": "date"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Task description."
                },
                {
                    "name": "due",
                    "title": "Due",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Due date details for the task, or `null` when the task has no due date."
                },
                {
                    "name": "due_date",
                    "title": "Due Date",
                    "type": "`$ANY`",
                    "short": "Due date in RFC 3339 format or similar."
                },
                {
                    "name": "due_datetime",
                    "title": "Due Datetime",
                    "type": "`$ANY`",
                    "short": "Due date and time."
                },
                {
                    "name": "due_lang",
                    "title": "Due Lang",
                    "type": "`$ANY`",
                    "short": "Due date language code."
                },
                {
                    "name": "due_string",
                    "title": "Due String",
                    "type": "`$ANY`",
                    "short": "Human-readable representation of the due date."
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$NUMBER`"
                        },
                        "update": {
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "Task duration details, or `null` when the task has no duration."
                },
                {
                    "name": "duration_unit",
                    "title": "Duration Unit",
                    "type": "`$ANY`",
                    "short": "Unit of time for duration."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the task."
                },
                {
                    "name": "is_collapsed",
                    "title": "Is Collapsed",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Whether the task is collapsed in the user's view."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the task is deleted."
                },
                {
                    "name": "labels",
                    "title": "Labels",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        },
                        "update": {
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "Names of labels attached to the task."
                },
                {
                    "name": "note_count",
                    "title": "Note Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "**Deprecated**: only returns 0 and is marked for removal."
                },
                {
                    "name": "order",
                    "title": "Order",
                    "type": "`$ANY`",
                    "short": "Position of the task in the project or section"
                },
                {
                    "name": "order_key",
                    "title": "Order Key",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task."
                },
                {
                    "name": "parent_id",
                    "title": "Parent Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "String ID of the parent task, or `null` if this is a top-level task."
                },
                {
                    "name": "postponed_count",
                    "title": "Postponed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of times the task's due date has been rescheduled by the user."
                },
                {
                    "name": "priority",
                    "title": "Priority",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        },
                        "update": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "Task priority from 1 (normal) to 4 (urgent)."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "String ID of the project that contains the task."
                },
                {
                    "name": "responsible_uid",
                    "title": "Responsible Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user responsible for the task, or `null` if unassigned."
                },
                {
                    "name": "section_id",
                    "title": "Section Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "String ID of the section that contains the task, or `null` if the task is not in a section."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was last updated, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the user who owns the task."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "task",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks/quick",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "lit": "quick"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "quick"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "quick"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks/filter",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "lit": "filter"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "filter"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "lang",
                                        "orig": "lang",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "filter",
                                "exist": [
                                    "query"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "ids",
                                        "orig": "ids",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "label",
                                        "orig": "label",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "parent_id",
                                        "orig": "parent_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "section_id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "public_key",
                                        "orig": "public_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks/{task_id}/close",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "close"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}",
                                "close"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "close",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks/{task_id}/move",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "move"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}",
                                "move"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "move",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks/{task_id}/reopen",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reopen"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}",
                                "reopen"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reopen",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "template": {
            "fields": [],
            "name": "template",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/templates/file",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "lit": "file"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "templates",
                                "file"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "use_relative_date",
                                        "orig": "use_relative_dates",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "file",
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "response": {
                                "kind": "raw",
                                "media": "text/plain"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "top_up": {
            "fields": [
                {
                    "name": "amount",
                    "title": "Amount",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Amount to buy, in the currency's minor unit (1000 = $10.00)."
                },
                {
                    "name": "checkout_url",
                    "title": "Checkout Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Hosted Stripe Checkout URL to redirect the user to for payment."
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ISO currency code."
                },
                {
                    "name": "return_url",
                    "title": "Return Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "URL Checkout returns the user to."
                },
                {
                    "name": "session_id",
                    "title": "Session Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The created Stripe Checkout session id."
                }
            ],
            "name": "top_up",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/usage_billing/top_up",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "usage_billing"
                                },
                                {
                                    "lit": "top_up"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "usage_billing",
                                "top_up"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "upload": {
            "fields": [
                {
                    "name": "file_name",
                    "title": "File Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Name of the uploaded file."
                },
                {
                    "name": "file_size",
                    "title": "File Size",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Size of the uploaded file in bytes."
                },
                {
                    "name": "file_type",
                    "title": "File Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "MIME type of the uploaded file."
                },
                {
                    "name": "file_url",
                    "title": "File Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "URL of the uploaded file."
                },
                {
                    "name": "image",
                    "title": "Image",
                    "type": "`$ANY`",
                    "short": "Image URL for image uploads, or `null` for non-image files."
                },
                {
                    "name": "image_height",
                    "title": "Image Height",
                    "type": "`$ANY`",
                    "short": "Image height in pixels, or `null` for non-image files."
                },
                {
                    "name": "image_width",
                    "title": "Image Width",
                    "type": "`$ANY`",
                    "short": "Image width in pixels, or `null` for non-image files."
                },
                {
                    "name": "resource_type",
                    "title": "Resource Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Detected resource type of the upload."
                },
                {
                    "name": "upload_state",
                    "title": "Upload State",
                    "type": "`$STRING`",
                    "short": "Upload processing state."
                }
            ],
            "name": "upload",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/uploads",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "uploads"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "uploads"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "fields": [
                                    {
                                        "binary": true,
                                        "media": "application/octet-stream",
                                        "name": "file"
                                    },
                                    {
                                        "name": "file_name"
                                    },
                                    {
                                        "name": "project_id"
                                    }
                                ],
                                "kind": "multipart",
                                "media": "multipart/form-data"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/uploads",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "uploads"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "uploads"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "file_url",
                                        "orig": "file_url",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_url"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "usage_summary": {
            "fields": [
                {
                    "name": "automation_id",
                    "title": "Automation Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The automation this usage belongs to."
                },
                {
                    "name": "charged_amount",
                    "title": "Charged Amount",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "`charged_units` in money, in microdollars."
                },
                {
                    "name": "charged_units",
                    "title": "Charged Units",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Units the group took off the balance, as a positive number."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The label of the newest usage in the group, so a renamed automation shows its current name."
                },
                {
                    "name": "usage_count",
                    "title": "Usage Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "How many usage events settled in the group."
                }
            ],
            "name": "usage_summary",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/usage_billing/usage_summary",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "usage_billing"
                                },
                                {
                                    "lit": "usage_summary"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "usage_billing",
                                "usage_summary"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.groups`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "group_by",
                                        "orig": "group_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "product",
                                        "orig": "product",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "automations"
                                    },
                                    {
                                        "name": "since",
                                        "orig": "since",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "until",
                                        "orig": "until",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "user": {
            "fields": [
                {
                    "name": "activated_user",
                    "title": "Activated User",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user is considered activated (completed key onboarding actions)"
                },
                {
                    "name": "auto_reminder",
                    "title": "Auto Reminder",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task"
                },
                {
                    "name": "avatar_big",
                    "title": "Avatar Big",
                    "type": "`$ANY`",
                    "short": "The link to a 195x195 pixels image of the user's avatar"
                },
                {
                    "name": "avatar_medium",
                    "title": "Avatar Medium",
                    "type": "`$ANY`",
                    "short": "The link to a 60x60 pixels image of the user's avatar"
                },
                {
                    "name": "avatar_s640",
                    "title": "Avatar S640",
                    "type": "`$ANY`",
                    "short": "The link to a 640x640 pixels image of the user's avatar"
                },
                {
                    "name": "avatar_small",
                    "title": "Avatar Small",
                    "type": "`$ANY`",
                    "short": "The link to a 35x35 pixels image of the user's avatar"
                },
                {
                    "name": "business_account_id",
                    "title": "Business Account Id",
                    "type": "`$STRING`",
                    "short": "The ID of the user's business account"
                },
                {
                    "name": "completed_count",
                    "title": "Completed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Total number of tasks completed by user"
                },
                {
                    "name": "completed_today",
                    "title": "Completed Today",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of tasks completed today by the user"
                },
                {
                    "name": "daily_goal",
                    "title": "Daily Goal",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The daily goal number of completed tasks for karma"
                },
                {
                    "name": "date_format",
                    "title": "Date Format",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1)"
                },
                {
                    "name": "days_off",
                    "title": "Days Off",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday)"
                },
                {
                    "name": "deleted_at",
                    "title": "Deleted At",
                    "type": "`$ANY`",
                    "short": "Date when user was deleted (ISO 8601 format)"
                },
                {
                    "name": "dont_notify",
                    "title": "Dont Notify",
                    "type": "`$ANY`",
                    "short": "Whether notifications should be disabled for the selected type and channel."
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "User's email address"
                },
                {
                    "name": "feature_identifier",
                    "title": "Feature Identifier",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Feature identifier for feature flag evaluations"
                },
                {
                    "name": "features",
                    "title": "Features",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Feature flags and settings for the user"
                },
                {
                    "name": "free_trial_expires",
                    "title": "Free Trial Expires",
                    "type": "`$ANY`",
                    "short": "Date when free trial expires (ISO 8601 format)"
                },
                {
                    "name": "full_name",
                    "title": "Full Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user's real name formatted as Firstname Lastname"
                },
                {
                    "name": "getting_started_guide_projects",
                    "title": "Getting Started Guide Projects",
                    "type": "`$ANY`",
                    "short": "List of project IDs for getting started guide"
                },
                {
                    "name": "has_magic_number",
                    "title": "Has Magic Number",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user has reached a magic number milestone"
                },
                {
                    "name": "has_password",
                    "title": "Has Password",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user has a password set on the account."
                },
                {
                    "name": "has_started_a_trial",
                    "title": "Has Started A Trial",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user has ever started a free trial"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "User ID"
                },
                {
                    "name": "image_id",
                    "title": "Image Id",
                    "type": "`$STRING`",
                    "short": "The ID of the user's avatar"
                },
                {
                    "name": "inbox_project_id",
                    "title": "Inbox Project Id",
                    "type": "`$STRING`",
                    "short": "The ID of the user's Inbox project"
                },
                {
                    "name": "is_celebrations_enabled",
                    "title": "Is Celebrations Enabled",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether celebration animations are enabled"
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the user is deleted"
                },
                {
                    "name": "is_onboarded",
                    "title": "Is Onboarded",
                    "type": "`$BOOLEAN`",
                    "short": "Composite flag: true once all four onboarded_* criteria above are met."
                },
                {
                    "name": "is_premium",
                    "title": "Is Premium",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user has a Todoist Pro subscription (a true or false value)"
                },
                {
                    "name": "joinable_workspace",
                    "title": "Joinable Workspace",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Information about workspaces the user can join"
                },
                {
                    "name": "joined_at",
                    "title": "Joined At",
                    "type": "`$ANY`",
                    "short": "Date when user joined Todoist (ISO 8601 format)"
                },
                {
                    "name": "karma",
                    "title": "Karma",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The user's karma score"
                },
                {
                    "name": "karma_trend",
                    "title": "Karma Trend",
                    "type": "`$ANY`",
                    "short": "The user's karma trend."
                },
                {
                    "name": "lang",
                    "title": "Lang",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user's language"
                },
                {
                    "name": "mfa_enabled",
                    "title": "Mfa Enabled",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether multi-factor authentication is enabled"
                },
                {
                    "name": "next_week",
                    "title": "Next Week",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday)"
                },
                {
                    "name": "notification_type",
                    "title": "Notification Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Notification type to update."
                },
                {
                    "name": "onboarded_dated_tasks_created",
                    "title": "Onboarded Dated Tasks Created",
                    "type": "`$ANY`",
                    "short": "True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks)."
                },
                {
                    "name": "onboarded_desktop_accessed",
                    "title": "Onboarded Desktop Accessed",
                    "type": "`$ANY`",
                    "short": "True once the user has synced from Web, macOS, or Windows."
                },
                {
                    "name": "onboarded_mobile_accessed",
                    "title": "Onboarded Mobile Accessed",
                    "type": "`$ANY`",
                    "short": "True once the user has synced from iOS or Android."
                },
                {
                    "name": "onboarded_tasks_completed",
                    "title": "Onboarded Tasks Completed",
                    "type": "`$ANY`",
                    "short": "True once the user has completed at least 3 tasks."
                },
                {
                    "name": "onboarding_completed",
                    "title": "Onboarding Completed",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user has completed onboarding"
                },
                {
                    "name": "onboarding_initiated",
                    "title": "Onboarding Initiated",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user has initiated onboarding"
                },
                {
                    "name": "onboarding_level",
                    "title": "Onboarding Level",
                    "type": "`$ANY`",
                    "short": "User's self-reported skill level during onboarding"
                },
                {
                    "name": "onboarding_persona",
                    "title": "Onboarding Persona",
                    "type": "`$ANY`",
                    "short": "User's onboarding persona selection"
                },
                {
                    "name": "onboarding_role",
                    "title": "Onboarding Role",
                    "type": "`$ANY`",
                    "short": "User's role selection during onboarding"
                },
                {
                    "name": "onboarding_started",
                    "title": "Onboarding Started",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the user has started onboarding"
                },
                {
                    "name": "onboarding_team_mode",
                    "title": "Onboarding Team Mode",
                    "type": "`$ANY`",
                    "short": "Whether user selected team mode during onboarding"
                },
                {
                    "name": "onboarding_use_cases",
                    "title": "Onboarding Use Cases",
                    "type": "`$ANY`",
                    "short": "Use cases the user selected during onboarding"
                },
                {
                    "name": "premium_status",
                    "title": "Premium Status",
                    "type": "`$ANY`",
                    "short": "Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member"
                },
                {
                    "name": "premium_until",
                    "title": "Premium Until",
                    "type": "`$ANY`",
                    "short": "The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user)."
                },
                {
                    "name": "service",
                    "title": "Service",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Notification channel to update."
                },
                {
                    "name": "share_limit",
                    "title": "Share Limit",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Maximum number of collaborators allowed in shared projects"
                },
                {
                    "name": "sort_order",
                    "title": "Sort Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1)"
                },
                {
                    "name": "start_day",
                    "title": "Start Day",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday)"
                },
                {
                    "name": "start_page",
                    "title": "Start Page",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The user's default view on Todoist."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$ANY`",
                    "short": "The user's status, shared across Todoist and Comms."
                },
                {
                    "name": "theme_appearance",
                    "title": "Theme Appearance",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Whether Todoist uses a light theme, a dark theme, or follows the system appearance"
                },
                {
                    "name": "theme_id",
                    "title": "Theme Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The currently selected Todoist theme (a number between 0 and 13)"
                },
                {
                    "name": "time_format",
                    "title": "Time Format",
                    "type": "`$ANY`",
                    "short": "Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1)"
                },
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "short": "The user's token that should be used to call the other API methods"
                },
                {
                    "name": "tz_info",
                    "title": "Tz Info",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t…"
                },
                {
                    "name": "urgent_reminder_device",
                    "title": "Urgent Reminder Device",
                    "type": "`$ANY`",
                    "short": "The device that should ring urgent reminders."
                },
                {
                    "name": "verification_status",
                    "title": "Verification Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "User's email verification status."
                },
                {
                    "name": "websocket_url",
                    "title": "Websocket Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "WebSocket URL for real-time updates"
                },
                {
                    "name": "weekend_start_day",
                    "title": "Weekend Start Day",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday)"
                },
                {
                    "name": "weekly_goal",
                    "title": "Weekly Goal",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The target number of tasks to complete per week"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "user",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/user",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "user"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "user"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/v1/notification_setting",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "notification_setting"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "notification_setting"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "workspace": {
            "fields": [
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Updated workspace description."
                },
                {
                    "name": "domain_discovery",
                    "title": "Domain Discovery",
                    "type": "`$ANY`",
                    "short": "Updated domain discovery setting."
                },
                {
                    "name": "domain_name",
                    "title": "Domain Name",
                    "type": "`$ANY`",
                    "short": "Updated workspace email domain."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "invite_code",
                    "title": "Invite Code",
                    "type": "`$ANY`",
                    "short": "Regenerate workspace invite code when set."
                },
                {
                    "name": "is_collapsed",
                    "title": "Is Collapsed",
                    "type": "`$BOOLEAN`",
                    "short": "Updated collapse state for current user."
                },
                {
                    "name": "is_guest_allowed",
                    "title": "Is Guest Allowed",
                    "type": "`$BOOLEAN`",
                    "short": "Updated guest access status."
                },
                {
                    "name": "is_link_sharing_enabled",
                    "title": "Is Link Sharing Enabled",
                    "type": "`$BOOLEAN`",
                    "short": "Updated link sharing status."
                },
                {
                    "name": "is_trial_pending",
                    "title": "Is Trial Pending",
                    "type": "`$BOOLEAN`",
                    "short": "Updated trial pending state."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Updated workspace name."
                },
                {
                    "name": "properties",
                    "title": "Properties",
                    "type": "`$ANY`",
                    "short": "Updated workspace properties."
                },
                {
                    "name": "restrict_email_domains",
                    "title": "Restrict Email Domains",
                    "type": "`$ANY`",
                    "short": "Updated email domain restriction setting."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "workspace",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/workspaces/{workspace_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workspace_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/workspaces",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/workspaces/logo",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "logo"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "logo"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "logo"
                            },
                            "body": {
                                "fields": [
                                    {
                                        "name": "delete"
                                    },
                                    {
                                        "binary": true,
                                        "media": "application/octet-stream",
                                        "name": "file"
                                    },
                                    {
                                        "name": "workspace_id"
                                    }
                                ],
                                "kind": "multipart",
                                "media": "multipart/form-data"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces/invitations",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "invitations"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "invitations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "invitation",
                                "exist": [
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces/{workspace_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workspace_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/workspaces/{workspace_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workspace_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "workspace_invitation_view": {
            "fields": [
                {
                    "name": "app",
                    "title": "App",
                    "type": "`$STRING`",
                    "short": "Product the invitation was sent from."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "The ID of the invitation"
                },
                {
                    "name": "inviter_id",
                    "title": "Inviter Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ID of the user user who sent the invitation"
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Workspace role granted by the invitation."
                },
                {
                    "name": "user_email",
                    "title": "User Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The invited person's email."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ID of the workspace"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "workspace_invitation_view",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/workspaces/invitations/delete",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "invitations"
                                },
                                {
                                    "lit": "delete"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "invitations",
                                "delete"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/workspaces/invitations/all",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "invitations"
                                },
                                {
                                    "lit": "all"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "invitations",
                                "all"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/v1/workspaces/invitations/{invite_code}/accept",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "invitations"
                                },
                                {
                                    "var": "invite_code"
                                },
                                {
                                    "lit": "accept"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "invitations",
                                "{invite_code}",
                                "accept"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "invite_code",
                                        "orig": "invite_code",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "invite_code"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/v1/workspaces/invitations/{invite_code}/reject",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "invitations"
                                },
                                {
                                    "var": "invite_code"
                                },
                                {
                                    "lit": "reject"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "invitations",
                                "{invite_code}",
                                "reject"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "invite_code",
                                        "orig": "invite_code",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "invite_code"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "workspace_user_view": {
            "fields": [
                {
                    "name": "custom_sorting_applied",
                    "title": "Custom Sorting Applied",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the user has custom project sorting enabled."
                },
                {
                    "name": "invite_code",
                    "title": "Invite Code",
                    "type": "`$ANY`",
                    "short": "Workspace invite code to join with."
                },
                {
                    "name": "project_sort_preference",
                    "title": "Project Sort Preference",
                    "type": "`$STRING`",
                    "short": "Project sorting preference for the user."
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Workspace role assigned to the user."
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the workspace user."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "String ID of the workspace."
                }
            ],
            "name": "workspace_user_view",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/workspaces/{workspace_id}/users/{user_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "user_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "{workspace_id}",
                                "users",
                                "{user_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "user_id",
                                    "workspace_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/workspaces/join",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "lit": "join"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "workspaces",
                                "join"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.workspace",
                        "$.main.kit.entity.user"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map