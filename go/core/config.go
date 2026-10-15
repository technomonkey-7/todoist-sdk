package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Todoist",
			"slug": "todoist",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.todoist.com/",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"activity": map[string]any{},
				"backup": map[string]any{},
				"billing_portal_url": map[string]any{},
				"collaborator": map[string]any{},
				"comment": map[string]any{},
				"completed_task": map[string]any{},
				"credit_state": map[string]any{},
				"email": map[string]any{},
				"file_url": map[string]any{},
				"folder": map[string]any{},
				"history": map[string]any{},
				"id_mapping": map[string]any{},
				"label": map[string]any{},
				"location_reminder": map[string]any{},
				"notification_setting": map[string]any{},
				"plan_detail": map[string]any{},
				"productivity_stat": map[string]any{},
				"project": map[string]any{},
				"project_import": map[string]any{},
				"project_permission": map[string]any{},
				"reminder": map[string]any{},
				"section": map[string]any{},
				"shared_label": map[string]any{},
				"subscription_info": map[string]any{},
				"task": map[string]any{},
				"template": map[string]any{},
				"top_up": map[string]any{},
				"upload": map[string]any{},
				"usage_summary": map[string]any{},
				"user": map[string]any{},
				"workspace": map[string]any{},
				"workspace_invitation": map[string]any{},
				"workspace_project": map[string]any{},
				"workspace_user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"activity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "event_date",
						"title": "Event Date",
						"type": "`$STRING`",
						"req": true,
						"short": "The timestamp when this activity occurred.",
						"format": "date-time",
					},
					map[string]any{
						"name": "event_type",
						"title": "Event Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The type of event that occurred.",
					},
					map[string]any{
						"name": "extra_data",
						"title": "Extra Data",
						"type": "`$ANY`",
						"short": "This object contains at least the `name` of the project, or the `content` of an item or comment, and optionally the `last_name` if a project was renamed, the `last_content` if an item or note was renamed, the `due_date` and `last_due_date`…",
					},
					map[string]any{
						"name": "extra_data_id",
						"title": "Extra Data Id",
						"type": "`$STRING`",
						"short": "Internal ID for the extra activity data row.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The internal unique identifier for this activity log entry.",
					},
					map[string]any{
						"name": "initiator_id",
						"title": "Initiator Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object_id",
						"title": "Object Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique identifier of the object this activity relates to (project, item, note, or section ID).",
					},
					map[string]any{
						"name": "object_type",
						"title": "Object Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The type of object this activity relates to.",
					},
					map[string]any{
						"name": "parent_item_id",
						"title": "Parent Item Id",
						"type": "`$STRING`",
						"short": "For note (comment) activities, the ID of the item (task) that the note is attached to.",
					},
					map[string]any{
						"name": "parent_project_id",
						"title": "Parent Project Id",
						"type": "`$STRING`",
						"short": "The ID of the project that contains the object this activity relates to.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "activity",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/activities",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "activities",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"activities",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "annotate_note",
											"orig": "annotate_notes",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "annotate_parent",
											"orig": "annotate_parents",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_from",
											"orig": "date_from",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_to",
											"orig": "date_to",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "ensure_last_state",
											"orig": "ensure_last_state",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "event_type",
											"orig": "event_type",
											"type": "`$ANY`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "include_child_object",
											"orig": "include_child_objects",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "include_parent_object",
											"orig": "include_parent_object",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "initiator_id",
											"orig": "initiator_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "initiator_id_null",
											"orig": "initiator_id_null",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "object_event_type",
											"orig": "object_event_types",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "object_id",
											"orig": "object_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "object_type",
											"orig": "object_type",
											"type": "`$ANY`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "parent_item_id",
											"orig": "parent_item_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "parent_project_id",
											"orig": "parent_project_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"backup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Backup URL",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"short": "Date and time of the backup version",
					},
				},
				"name": "backup",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/backups",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "backups",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"backups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "mfa_token",
											"orig": "mfa_token",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/backups/download",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "backups",
									},
									map[string]any{
										"lit": "download",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"backups",
									"download",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "file",
											"orig": "file",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "download",
									"exist": []any{
										"file",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"billing_portal_url": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "billing_portal_url",
						"title": "Billing Portal Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "reason_description",
						"title": "Reason Description",
						"type": "`$STRING`",
						"short": "Human-readable label of the cancellation reason.",
					},
					map[string]any{
						"name": "reason_flag",
						"title": "Reason Flag",
						"type": "`$STRING`",
						"short": "Short identifier of the cancellation reason category.",
					},
					map[string]any{
						"name": "reason_text",
						"title": "Reason Text",
						"type": "`$STRING`",
						"short": "Free-form feedback from the user about the cancellation.",
					},
					map[string]any{
						"name": "return_url",
						"title": "Return Url",
						"type": "`$STRING`",
						"short": "URL the user is redirected to after completing the flow.",
					},
				},
				"name": "billing_portal_url",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/payments/cancel_plan_with_redirect_to_stripe",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "cancel_plan_with_redirect_to_stripe",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"payments",
									"cancel_plan_with_redirect_to_stripe",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"collaborator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "The user's email address",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The user's ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The user's full name",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "collaborator",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/projects/{project_id}/collaborators",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "collaborators",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"{project_id}",
									"collaborators",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "public_key",
											"orig": "public_key",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
					},
				},
			},
			"comment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attachment",
						"title": "Attachment",
						"type": "`$ANY`",
						"short": "A [File attachment](#tag/Sync/Comments/File-Attachments) object",
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$ANY`",
							},
						},
						"short": "Comment content.",
					},
					map[string]any{
						"name": "file_attachment",
						"title": "File Attachment",
						"type": "`$ANY`",
						"req": true,
						"short": "File attachment metadata, or `null` when the comment has no attachment.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the comment.",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the comment is deleted.",
					},
					map[string]any{
						"name": "posted_at",
						"title": "Posted At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the comment was posted, or `null` if unknown.",
						"format": "date-time",
					},
					map[string]any{
						"name": "posted_uid",
						"title": "Posted Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user who posted the comment.",
					},
					map[string]any{
						"name": "project_id",
						"title": "Project Id",
						"type": "`$STRING`",
						"short": "String ID of the project",
					},
					map[string]any{
						"name": "reactions",
						"title": "Reactions",
						"type": "`$ANY`",
						"req": true,
						"short": "Reaction emoji mapped to user IDs that reacted.",
					},
					map[string]any{
						"name": "task_id",
						"title": "Task Id",
						"type": "`$STRING`",
						"short": "String ID of the task",
					},
					map[string]any{
						"name": "uids_to_notify",
						"title": "Uids To Notify",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "String IDs of users notified by the comment.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "comment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/comments",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "comments",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"comments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/comments",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "comments",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"comments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "public_key",
											"orig": "public_key",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "task_id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/comments/{comment_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"comments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"comment_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "comment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/comments/{comment_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"comments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"comment_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "comment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/comments/{comment_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"comments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"comment_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "comment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/comments/{comment_id}/reactions",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "reactions",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"comments",
									"{id}",
									"reactions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"comment_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "comment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "reaction_add",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/comments/{comment_id}/reactions/remove",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "reactions",
									},
									map[string]any{
										"lit": "remove",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"comments",
									"{id}",
									"reactions",
									"remove",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"comment_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "comment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "reaction_remove",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"completed_task": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "added_at",
						"title": "Added At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the task was created, or `null` if unknown.",
						"format": "date-time",
					},
					map[string]any{
						"name": "added_by_uid",
						"title": "Added By Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user who created the task, or `null` if unknown.",
					},
					map[string]any{
						"name": "assigned_by_uid",
						"title": "Assigned By Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user who assigned the task, or `null` if unassigned.",
					},
					map[string]any{
						"name": "checked",
						"title": "Checked",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the task is completed.",
					},
					map[string]any{
						"name": "child_order",
						"title": "Child Order",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Position of the task among sibling tasks.",
					},
					map[string]any{
						"name": "completed_at",
						"title": "Completed At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the task was completed, or `null` if active.",
						"format": "date-time",
					},
					map[string]any{
						"name": "completed_by_uid",
						"title": "Completed By Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user who completed the task, or `null` if active.",
					},
					map[string]any{
						"name": "completed_count",
						"title": "Completed Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of times the task has been marked as completed.",
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"req": true,
						"short": "Task content.",
					},
					map[string]any{
						"name": "day_order",
						"title": "Day Order",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Task order for day-based views.",
					},
					map[string]any{
						"name": "deadline",
						"title": "Deadline",
						"type": "`$ANY`",
						"req": true,
						"short": "Deadline details for the task, or `null` when the task has no deadline.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
						"short": "Task description.",
					},
					map[string]any{
						"name": "due",
						"title": "Due",
						"type": "`$ANY`",
						"req": true,
						"short": "Due date details for the task, or `null` when the task has no due date.",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Task duration details, or `null` when the task has no duration.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the task.",
					},
					map[string]any{
						"name": "is_collapsed",
						"title": "Is Collapsed",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the task is collapsed in the user's view.",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the task is deleted.",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Names of labels attached to the task.",
					},
					map[string]any{
						"name": "note_count",
						"title": "Note Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "**Deprecated**: only returns 0 and is marked for removal.",
					},
					map[string]any{
						"name": "order_key",
						"title": "Order Key",
						"type": "`$ANY`",
						"req": true,
						"short": "Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task.",
					},
					map[string]any{
						"name": "parent_id",
						"title": "Parent Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the parent task, or `null` if this is a top-level task.",
					},
					map[string]any{
						"name": "postponed_count",
						"title": "Postponed Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of times the task's due date has been rescheduled by the user.",
					},
					map[string]any{
						"name": "priority",
						"title": "Priority",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Task priority from 1 (normal) to 4 (urgent).",
					},
					map[string]any{
						"name": "project_id",
						"title": "Project Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the project that contains the task.",
					},
					map[string]any{
						"name": "responsible_uid",
						"title": "Responsible Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user responsible for the task, or `null` if unassigned.",
					},
					map[string]any{
						"name": "section_id",
						"title": "Section Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the section that contains the task, or `null` if the task is not in a section.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the task was last updated, or `null` if unknown.",
						"format": "date-time",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the user who owns the task.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "completed_task",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/tasks/completed/by_completion_date",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"lit": "completed",
									},
									map[string]any{
										"lit": "by_completion_date",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"completed",
									"by_completion_date",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_lang",
											"orig": "filter_lang",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_query",
											"orig": "filter_query",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "parent_id",
											"orig": "parent_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "public_key",
											"orig": "public_key",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "section_id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "until",
											"orig": "until",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"since",
										"until",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/tasks/completed/by_due_date",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"lit": "completed",
									},
									map[string]any{
										"lit": "by_due_date",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"completed",
									"by_due_date",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_lang",
											"orig": "filter_lang",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_query",
											"orig": "filter_query",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "parent_id",
											"orig": "parent_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "section_id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "until",
											"orig": "until",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "by_due_date",
									"exist": []any{
										"since",
										"until",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"credit_state": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "available_amount",
						"title": "Available Amount",
						"type": "`$INTEGER`",
						"req": true,
						"short": "`available_units` in money, in microdollars (millionths of one `currency` unit), so 8372600 is $8.3726.",
					},
					map[string]any{
						"name": "available_units",
						"title": "Available Units",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Balance net of in-flight holds (`available_cached - held`).",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO currency code every amount in this response is in.",
					},
					map[string]any{
						"name": "depleted",
						"title": "Depleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "No further runs may start.",
					},
					map[string]any{
						"name": "is_settled_low_balance",
						"title": "Is Settled Low Balance",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the settled balance before in-flight holds is at or below the low-balance threshold.",
					},
					map[string]any{
						"name": "low_balance",
						"title": "Low Balance",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Balance is at or below the low-balance threshold.",
					},
					map[string]any{
						"name": "settled_amount",
						"title": "Settled Amount",
						"type": "`$INTEGER`",
						"req": true,
						"short": "`settled_units` in money, in microdollars (millionths of one `currency` unit), using the account's pinned price.",
					},
					map[string]any{
						"name": "settled_units",
						"title": "Settled Units",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Balance after settled credits and debits, before in-flight holds (`available_cached`).",
					},
					map[string]any{
						"name": "usage_allowed",
						"title": "Usage Allowed",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether a new run may start right now.",
					},
					map[string]any{
						"name": "usage_block_reason",
						"title": "Usage Block Reason",
						"type": "`$ANY`",
						"req": true,
						"short": "Why a new run cannot start, or `null` when it can.",
					},
				},
				"name": "credit_state",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/usage_billing/state",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "usage_billing",
									},
									map[string]any{
										"lit": "state",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"usage_billing",
									"state",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "product",
											"orig": "product",
											"type": "`$STRING`",
											"kind": "query",
											"example": "automations",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "Email address for the Todoist object.",
					},
					map[string]any{
						"name": "obj_id",
						"title": "Obj Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the Todoist object.",
					},
					map[string]any{
						"name": "obj_type",
						"title": "Obj Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Type of Todoist object to create an email for.",
					},
				},
				"name": "email",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/emails",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "emails",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"emails",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "obj_id",
											"orig": "obj_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "obj_type",
											"orig": "obj_type",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"obj_id",
										"obj_type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/emails",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "emails",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"emails",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"file_url": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "file_name",
						"title": "File Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the exported template file.",
					},
					map[string]any{
						"name": "file_url",
						"title": "File Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Temporary URL for downloading the exported template.",
						"format": "uri",
					},
				},
				"name": "file_url",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/templates/url",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"lit": "url",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"templates",
									"url",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "use_relative_date",
											"orig": "use_relative_dates",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"folder": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "child_order",
						"title": "Child Order",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "User-specific position of the folder.",
					},
					map[string]any{
						"name": "default_order",
						"title": "Default Order",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Default position of the folder in the workspace.",
					},
					map[string]any{
						"name": "default_order_key",
						"title": "Default Order Key",
						"type": "`$ANY`",
						"req": true,
						"short": "Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together).",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the folder.",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the folder is deleted.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Folder name.",
					},
					map[string]any{
						"name": "workspace_id",
						"title": "Workspace Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the workspace that contains the folder.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "folder",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/folders",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"folders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/folders",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"folders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/folders/{folder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"folders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"folder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "folder_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/folders/{folder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"folders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"folder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "folder_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/folders/{folder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"folders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"folder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "folder_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"history": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
						"short": "What produced the entry, within its `type`: `automation_run`, `paid`, `promotional` or `stripe`.",
					},
					map[string]any{
						"name": "charged_amount",
						"title": "Charged Amount",
						"type": "`$ANY`",
						"req": true,
						"short": "`charged_units` in money, in microdollars (millionths of one page-level `currency` unit), so 27400 is $0.0274.",
					},
					map[string]any{
						"name": "charged_units",
						"title": "Charged Units",
						"type": "`$ANY`",
						"req": true,
						"short": "Units taken off the balance, as a positive number, or `null` on a credit, which has no debit side.",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"short": "When the entry was written, UTC.",
					},
					map[string]any{
						"name": "credited_amount",
						"title": "Credited Amount",
						"type": "`$ANY`",
						"req": true,
						"short": "`credited_units` in money, in microdollars (millionths of one page-level `currency` unit), so 10000000 is $10.00.",
					},
					map[string]any{
						"name": "credited_units",
						"title": "Credited Units",
						"type": "`$ANY`",
						"req": true,
						"short": "Units added to the balance, as a positive number, or `null` on a debit.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Human-readable summary of the entry.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Ledger entry id.",
					},
					map[string]any{
						"name": "refs",
						"title": "Refs",
						"type": "`$OBJECT`",
						"short": "Free-form attribution for the entry.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Outcome of the run this entry settles: `success`, `failed`, `cancelled`, `timed_out` or `partial`.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "What moved the balance: `usage_settled`, `top_up`, `adjustment`, `void`, `expiry` or `chargeback`.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "history",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/usage_billing/history",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "usage_billing",
									},
									map[string]any{
										"lit": "history",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"usage_billing",
									"history",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.entries`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "product",
											"orig": "product",
											"type": "`$STRING`",
											"kind": "query",
											"example": "automations",
										},
										map[string]any{
											"name": "type",
											"orig": "types",
											"type": "`$ANY`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"id_mapping": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "new_id",
						"title": "New Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Curent ID for the object.",
					},
					map[string]any{
						"name": "old_id",
						"title": "Old Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Legacy ID for the object.",
					},
				},
				"name": "id_mapping",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/id_mappings/{obj_name}/{obj_ids}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "id_mappings",
									},
									map[string]any{
										"var": "obj_name",
									},
									map[string]any{
										"var": "obj_id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"id_mappings",
									"{obj_name}",
									"{obj_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"obj_ids": "obj_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "obj_id",
											"orig": "obj_ids",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "obj_name",
											"orig": "obj_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"obj_id",
										"obj_name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"label": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "color",
						"title": "Color",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Label color name.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the label.",
					},
					map[string]any{
						"name": "is_favorite",
						"title": "Is Favorite",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Whether the label is marked as a favorite.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Label name.",
					},
					map[string]any{
						"name": "order",
						"title": "Order",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Position of the label in the label list, or `null` when no explicit order is set.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "label",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/labels",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/labels/search",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"query",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/labels",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/labels/{label_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"label_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "label_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/labels/{label_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"label_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "label_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/labels/{label_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"label_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "label_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"location_reminder": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the location reminder",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the location reminder is deleted",
					},
					map[string]any{
						"name": "item_id",
						"title": "Item Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the task",
					},
					map[string]any{
						"name": "loc_lat",
						"title": "Loc Lat",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Latitude of the location",
					},
					map[string]any{
						"name": "loc_long",
						"title": "Loc Long",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Longitude of the location",
					},
					map[string]any{
						"name": "loc_trigger",
						"title": "Loc Trigger",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Trigger type for the location reminder",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Name of the location",
					},
					map[string]any{
						"name": "notify_uid",
						"title": "Notify Uid",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the user who will receive the reminder",
					},
					map[string]any{
						"name": "project_id",
						"title": "Project Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the project containing the task",
					},
					map[string]any{
						"name": "radius",
						"title": "Radius",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
							"update": map[string]any{
								"type": "`$NUMBER`",
							},
						},
						"short": "Radius in meters",
					},
					map[string]any{
						"name": "task_id",
						"title": "Task Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the task",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The reminder type",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "location_reminder",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/location_reminders",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "location_reminders",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"location_reminders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/location_reminders",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "location_reminders",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"location_reminders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "task_id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/location_reminders/{reminder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "location_reminders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"location_reminders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reminder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "reminder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/location_reminders/{reminder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "location_reminders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"location_reminders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reminder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "reminder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/location_reminders/{reminder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "location_reminders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"location_reminders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reminder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "reminder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"notification_setting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dont_notify",
						"title": "Dont Notify",
						"type": "`$ANY`",
						"short": "Whether notifications should be disabled for the selected type and channel.",
					},
					map[string]any{
						"name": "notification_type",
						"title": "Notification Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Notification type to update.",
					},
					map[string]any{
						"name": "service",
						"title": "Service",
						"type": "`$STRING`",
						"req": true,
						"short": "Notification channel to update.",
					},
				},
				"name": "notification_setting",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/notification_setting",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "notification_setting",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"notification_setting",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"plan_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "billing_cycle",
						"title": "Billing Cycle",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing cycle for the listed prices.",
					},
					map[string]any{
						"name": "prices",
						"title": "Prices",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Prices available for the billing cycle.",
					},
				},
				"name": "plan_detail",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces/plan_details",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "plan_details",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"plan_details",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"productivity_stat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "completed_count",
						"title": "Completed Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Total number of tasks completed by the user (all time)",
					},
					map[string]any{
						"name": "days_items",
						"title": "Days Items",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Daily completion statistics for the last 7 days, ordered chronologically",
					},
					map[string]any{
						"name": "goals",
						"title": "Goals",
						"type": "`$OBJECT`",
						"req": true,
						"short": "User goals, streaks, and productivity settings",
					},
					map[string]any{
						"name": "karma",
						"title": "Karma",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Current karma score",
					},
					map[string]any{
						"name": "karma_graph_data",
						"title": "Karma Graph Data",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Historical karma data points for graphing, each containing date and karma_avg",
					},
					map[string]any{
						"name": "karma_last_update",
						"title": "Karma Last Update",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Net karma change from the most recent update (positive_karma + negative_karma)",
					},
					map[string]any{
						"name": "karma_trend",
						"title": "Karma Trend",
						"type": "`$STRING`",
						"req": true,
						"short": "Karma trend indicator ('up' or 'down')",
					},
					map[string]any{
						"name": "karma_update_reasons",
						"title": "Karma Update Reasons",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Recent karma update events with reasons and amounts",
					},
					map[string]any{
						"name": "project_colors",
						"title": "Project Colors",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Mapping of project IDs to their color names (e.g., {'2aB3cD4eF5gH6iJ7': 'blue', '8kL9mN0oP1qR2sT3': 'red'})",
					},
					map[string]any{
						"name": "week_items",
						"title": "Week Items",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Weekly completion statistics for the last 4 weeks, ordered chronologically.",
					},
				},
				"name": "productivity_stat",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/tasks/completed/stats",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"lit": "completed",
									},
									map[string]any{
										"lit": "stats",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"completed",
									"stats",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"project": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "child_order",
						"title": "Child Order",
						"type": "`$ANY`",
						"short": "Updated position of the project in the hierarchy.",
					},
					map[string]any{
						"name": "color",
						"title": "Color",
						"type": "`$ANY`",
						"short": "Color of the project icon.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the project.",
					},
					map[string]any{
						"name": "folder_id",
						"title": "Folder Id",
						"type": "`$STRING`",
						"short": "Folder to move the project into.",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$ANY`",
						"short": "Project icon name.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_collapsed",
						"title": "Is Collapsed",
						"type": "`$BOOLEAN`",
						"short": "Whether the project is collapsed.",
					},
					map[string]any{
						"name": "is_favorite",
						"title": "Is Favorite",
						"type": "`$BOOLEAN`",
						"short": "Whether the project is a favorite for the user.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Name of the project.",
					},
					map[string]any{
						"name": "next_cursor",
						"title": "Next Cursor",
						"type": "`$ANY`",
						"req": true,
						"short": "Cursor for the next page of results, or `null` when there are no more results.",
					},
					map[string]any{
						"name": "parent_id",
						"title": "Parent Id",
						"type": "`$STRING`",
						"short": "Parent project ID.",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Objects in the current page of results.",
					},
					map[string]any{
						"name": "view_style",
						"title": "View Style",
						"type": "`$ANY`",
						"short": "View style of the project.",
					},
					map[string]any{
						"name": "workspace_id",
						"title": "Workspace Id",
						"type": "`$STRING`",
						"short": "Workspace ID.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "project",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/projects",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/projects/search",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"query",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/projects",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "folder_id",
											"orig": "folder_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/projects/archived",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"lit": "archived",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"archived",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
									},
								},
								"select": map[string]any{
									"$action": "archived",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/projects/{project_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/projects/{project_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/projects/{project_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/projects/{project_id}/archive",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "archive",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"{id}",
									"archive",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "archive",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/projects/{project_id}/join",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "join",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"{id}",
									"join",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "join",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/projects/{project_id}/unarchive",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "unarchive",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"{id}",
									"unarchive",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "unarchive",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"project_import": map[string]any{
				"fields": []any{},
				"name": "project_import",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/templates/import_into_project_from_file",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"lit": "import_into_project_from_file",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"templates",
									"import_into_project_from_file",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "from_file",
								},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"binary": true,
											"media": "application/octet-stream",
											"name": "file",
										},
										map[string]any{
											"name": "project_id",
										},
									},
									"kind": "multipart",
									"media": "multipart/form-data",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/templates/import_into_project_from_template_id",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"lit": "import_into_project_from_template_id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"templates",
									"import_into_project_from_template_id",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "from_template",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/templates/create_project_from_file",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"lit": "create_project_from_file",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"templates",
									"create_project_from_file",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "new_project_from_file",
								},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"binary": true,
											"media": "application/octet-stream",
											"name": "file",
										},
										map[string]any{
											"name": "name",
										},
										map[string]any{
											"name": "workspace_id",
										},
									},
									"kind": "multipart",
									"media": "multipart/form-data",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"project_permission": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "project_collaborator_actions",
						"title": "Project Collaborator Actions",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Project collaborator roles and their allowed actions.",
					},
					map[string]any{
						"name": "workspace_collaborator_actions",
						"title": "Workspace Collaborator Actions",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Workspace collaborator roles and their allowed actions.",
					},
				},
				"name": "project_permission",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/projects/permissions",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"lit": "permissions",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"projects",
									"permissions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reminder": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "due",
						"title": "Due",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Datetime when the reminder fires, or `null` if unset.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the reminder.",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the reminder is deleted.",
					},
					map[string]any{
						"name": "is_urgent",
						"title": "Is Urgent",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Whether the reminder should be delivered urgently.",
					},
					map[string]any{
						"name": "item_id",
						"title": "Item Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the task that owns the reminder.",
					},
					map[string]any{
						"name": "minute_offset",
						"title": "Minute Offset",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Minutes before the task due time for relative reminders.",
					},
					map[string]any{
						"name": "notify_uid",
						"title": "Notify Uid",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the user who receives the reminder.",
					},
					map[string]any{
						"name": "reminder_type",
						"title": "Reminder Type",
						"type": "`$STRING`",
						"short": "Type of the reminder: 'relative' or 'absolute'",
					},
					map[string]any{
						"name": "service",
						"title": "Service",
						"type": "`$STRING`",
						"short": "Notification service type: 'email', 'push'.",
					},
					map[string]any{
						"name": "task_id",
						"title": "Task Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the task",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Reminder type.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "reminder",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/reminders",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "reminders",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"reminders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/reminders",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "reminders",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"reminders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "task_id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/reminders/{reminder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "reminders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"reminders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reminder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "reminder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/reminders/{reminder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "reminders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"reminders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reminder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "reminder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/reminders/{reminder_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "reminders",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"reminders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reminder_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "reminder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"section": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "added_at",
						"title": "Added At",
						"type": "`$STRING`",
						"req": true,
						"short": "Date and time when the section was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "archived_at",
						"title": "Archived At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the section was archived, or `null` if it is active.",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Section description, or `null` if it has none.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the section.",
					},
					map[string]any{
						"name": "is_archived",
						"title": "Is Archived",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the section is archived.",
					},
					map[string]any{
						"name": "is_collapsed",
						"title": "Is Collapsed",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Whether the section is collapsed in the user's view.",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the section is deleted.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Section name.",
					},
					map[string]any{
						"name": "order",
						"title": "Order",
						"type": "`$ANY`",
						"short": "Position of the new section in the project",
					},
					map[string]any{
						"name": "order_key",
						"title": "Order Key",
						"type": "`$ANY`",
						"req": true,
						"short": "Fractional-indexing order key: sections sort by comparing keys lexicographically within a project.",
					},
					map[string]any{
						"name": "project_id",
						"title": "Project Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the project that contains the section.",
					},
					map[string]any{
						"name": "section_order",
						"title": "Section Order",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Position of the section in the project.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the section was last updated, or `null` if unknown.",
						"format": "date-time",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the user who owns the section.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "section",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/sections",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/sections/search",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"query",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/sections",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "public_key",
											"orig": "public_key",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/sections/{section_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"section_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "public_key",
											"orig": "public_key",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/sections/{section_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"section_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/sections/{section_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"section_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/sections/{section_id}/archive",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "archive",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
									"{id}",
									"archive",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"section_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "archive",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/sections/{section_id}/unarchive",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sections",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "unarchive",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"sections",
									"{id}",
									"unarchive",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"section_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "unarchive",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"shared_label": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Current shared label name to rename.",
					},
					map[string]any{
						"name": "new_name",
						"title": "New Name",
						"type": "`$STRING`",
						"req": true,
						"short": "New shared label name to apply to matching tasks.",
					},
					map[string]any{
						"name": "next_cursor",
						"title": "Next Cursor",
						"type": "`$ANY`",
						"req": true,
						"short": "Cursor for the next page of results, or `null` when there are no more results.",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Objects in the current page of results.",
					},
				},
				"name": "shared_label",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/labels/shared",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
									map[string]any{
										"lit": "shared",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
									"shared",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "omit_personal",
											"orig": "omit_personal",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/labels/shared/remove",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
									map[string]any{
										"lit": "shared",
									},
									map[string]any{
										"lit": "remove",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
									"shared",
									"remove",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/labels/shared/rename",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "labels",
									},
									map[string]any{
										"lit": "shared",
									},
									map[string]any{
										"lit": "rename",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"labels",
									"shared",
									"rename",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"subscription_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "activation_method",
						"title": "Activation Method",
						"type": "`$STRING`",
						"req": true,
						"short": "How the active subscription was purchased.",
					},
					map[string]any{
						"name": "billing_portal_switch_to_annual_url",
						"title": "Billing Portal Switch To Annual Url",
						"type": "`$ANY`",
						"req": true,
						"short": "One-time URL to a Stripe portal flow for switching from monthly to annual billing, if eligible.",
					},
					map[string]any{
						"name": "billing_portal_url",
						"title": "Billing Portal Url",
						"type": "`$ANY`",
						"req": true,
						"short": "One-time URL to the Stripe customer portal, if available.",
					},
					map[string]any{
						"name": "expiration_date",
						"title": "Expiration Date",
						"type": "`$ANY`",
						"req": true,
						"short": "Date the current paid period ends, in `YYYY-MM-DD` format.",
					},
					map[string]any{
						"name": "has_billing_portal",
						"title": "Has Billing Portal",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "`true` when the user has a Stripe customer with a portal session.",
					},
					map[string]any{
						"name": "has_billing_portal_switch_to_annual",
						"title": "Has Billing Portal Switch To Annual",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "`true` when a switch-to-annual flow is available in Stripe.",
					},
					map[string]any{
						"name": "has_switch_legacy_to_current",
						"title": "Has Switch Legacy To Current",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "`true` when the user is eligible to switch from a legacy Pro price to the current one.",
					},
					map[string]any{
						"name": "invoice_credit_balance",
						"title": "Invoice Credit Balance",
						"type": "`$ANY`",
						"req": true,
						"short": "Stripe customer credit balance, keyed by ISO 4217 currency code, with values in the smallest currency unit (e.g.",
					},
					map[string]any{
						"name": "plan",
						"title": "Plan",
						"type": "`$STRING`",
						"req": true,
						"short": "Plan tier the user is currently on.",
					},
					map[string]any{
						"name": "plan_price",
						"title": "Plan Price",
						"type": "`$ANY`",
						"req": true,
						"short": "Price of the active plan, when known.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Current subscription status.",
					},
				},
				"name": "subscription_info",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/payments/get_subscription_info",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "get_subscription_info",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"payments",
									"get_subscription_info",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/payments/reactivate_plan",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "reactivate_plan",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"payments",
									"reactivate_plan",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "reactivate_plan",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"task": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "added_at",
						"title": "Added At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the task was created, or `null` if unknown.",
						"format": "date-time",
					},
					map[string]any{
						"name": "added_by_uid",
						"title": "Added By Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user who created the task, or `null` if unknown.",
					},
					map[string]any{
						"name": "assigned_by_uid",
						"title": "Assigned By Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user who assigned the task, or `null` if unassigned.",
					},
					map[string]any{
						"name": "assignee_id",
						"title": "Assignee Id",
						"type": "`$STRING`",
						"short": "ID of the user to assign the task to.",
					},
					map[string]any{
						"name": "checked",
						"title": "Checked",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the task is completed.",
					},
					map[string]any{
						"name": "child_order",
						"title": "Child Order",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "Position of the task among sibling tasks.",
					},
					map[string]any{
						"name": "completed_at",
						"title": "Completed At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the task was completed, or `null` if active.",
						"format": "date-time",
					},
					map[string]any{
						"name": "completed_by_uid",
						"title": "Completed By Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user who completed the task, or `null` if active.",
					},
					map[string]any{
						"name": "completed_count",
						"title": "Completed Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of times the task has been marked as completed.",
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Task content.",
					},
					map[string]any{
						"name": "day_order",
						"title": "Day Order",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "Task order for day-based views.",
					},
					map[string]any{
						"name": "deadline",
						"title": "Deadline",
						"type": "`$ANY`",
						"req": true,
						"short": "Deadline details for the task, or `null` when the task has no deadline.",
					},
					map[string]any{
						"name": "deadline_date",
						"title": "Deadline Date",
						"type": "`$ANY`",
						"short": "Deadline date in YYYY-MM-DD format",
						"format": "date",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Task description.",
					},
					map[string]any{
						"name": "due",
						"title": "Due",
						"type": "`$ANY`",
						"req": true,
						"short": "Due date details for the task, or `null` when the task has no due date.",
					},
					map[string]any{
						"name": "due_date",
						"title": "Due Date",
						"type": "`$ANY`",
						"short": "Due date in RFC 3339 format or similar.",
					},
					map[string]any{
						"name": "due_datetime",
						"title": "Due Datetime",
						"type": "`$ANY`",
						"short": "Due date and time.",
					},
					map[string]any{
						"name": "due_lang",
						"title": "Due Lang",
						"type": "`$ANY`",
						"short": "Due date language code.",
					},
					map[string]any{
						"name": "due_string",
						"title": "Due String",
						"type": "`$ANY`",
						"short": "Human-readable representation of the due date.",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$NUMBER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$NUMBER`",
							},
							"update": map[string]any{
								"type": "`$NUMBER`",
							},
						},
						"short": "Task duration details, or `null` when the task has no duration.",
					},
					map[string]any{
						"name": "duration_unit",
						"title": "Duration Unit",
						"type": "`$ANY`",
						"short": "Unit of time for duration.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the task.",
					},
					map[string]any{
						"name": "is_collapsed",
						"title": "Is Collapsed",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Whether the task is collapsed in the user's view.",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the task is deleted.",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
							"update": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "Names of labels attached to the task.",
					},
					map[string]any{
						"name": "note_count",
						"title": "Note Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "**Deprecated**: only returns 0 and is marked for removal.",
					},
					map[string]any{
						"name": "order",
						"title": "Order",
						"type": "`$ANY`",
						"short": "Position of the task in the project or section",
					},
					map[string]any{
						"name": "order_key",
						"title": "Order Key",
						"type": "`$ANY`",
						"req": true,
						"short": "Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task.",
					},
					map[string]any{
						"name": "parent_id",
						"title": "Parent Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "String ID of the parent task, or `null` if this is a top-level task.",
					},
					map[string]any{
						"name": "postponed_count",
						"title": "Postponed Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of times the task's due date has been rescheduled by the user.",
					},
					map[string]any{
						"name": "priority",
						"title": "Priority",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
							"update": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "Task priority from 1 (normal) to 4 (urgent).",
					},
					map[string]any{
						"name": "project_id",
						"title": "Project Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "String ID of the project that contains the task.",
					},
					map[string]any{
						"name": "responsible_uid",
						"title": "Responsible Uid",
						"type": "`$ANY`",
						"req": true,
						"short": "String ID of the user responsible for the task, or `null` if unassigned.",
					},
					map[string]any{
						"name": "section_id",
						"title": "Section Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "String ID of the section that contains the task, or `null` if the task is not in a section.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$ANY`",
						"req": true,
						"short": "Date and time when the task was last updated, or `null` if unknown.",
						"format": "date-time",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the user who owns the task.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "task",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/tasks",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/tasks/quick",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"lit": "quick",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"quick",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "quick",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/tasks/filter",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"lit": "filter",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"filter",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "filter",
									"exist": []any{
										"query",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/tasks",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "ids",
											"orig": "ids",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "label",
											"orig": "label",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "parent_id",
											"orig": "parent_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "section_id",
											"orig": "section_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/tasks/{task_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "public_key",
											"orig": "public_key",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/tasks/{task_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/tasks/{task_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/tasks/{task_id}/close",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "close",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"{id}",
									"close",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "close",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/tasks/{task_id}/move",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "move",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"{id}",
									"move",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "move",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/tasks/{task_id}/reopen",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "reopen",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"tasks",
									"{id}",
									"reopen",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "reopen",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"template": map[string]any{
				"fields": []any{},
				"name": "template",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/templates/file",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"lit": "file",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"templates",
									"file",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "use_relative_date",
											"orig": "use_relative_dates",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "file",
									"exist": []any{
										"project_id",
									},
								},
								"response": map[string]any{
									"kind": "raw",
									"media": "text/plain",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"top_up": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"title": "Amount",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Amount to buy, in the currency's minor unit (1000 = $10.00).",
					},
					map[string]any{
						"name": "checkout_url",
						"title": "Checkout Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Hosted Stripe Checkout URL to redirect the user to for payment.",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO currency code.",
					},
					map[string]any{
						"name": "return_url",
						"title": "Return Url",
						"type": "`$STRING`",
						"req": true,
						"short": "URL Checkout returns the user to.",
					},
					map[string]any{
						"name": "session_id",
						"title": "Session Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The created Stripe Checkout session id.",
					},
				},
				"name": "top_up",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/usage_billing/top_up",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "usage_billing",
									},
									map[string]any{
										"lit": "top_up",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"usage_billing",
									"top_up",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"upload": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "file_name",
						"title": "File Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the uploaded file.",
					},
					map[string]any{
						"name": "file_size",
						"title": "File Size",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Size of the uploaded file in bytes.",
					},
					map[string]any{
						"name": "file_type",
						"title": "File Type",
						"type": "`$STRING`",
						"req": true,
						"short": "MIME type of the uploaded file.",
					},
					map[string]any{
						"name": "file_url",
						"title": "File Url",
						"type": "`$STRING`",
						"req": true,
						"short": "URL of the uploaded file.",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$ANY`",
						"short": "Image URL for image uploads, or `null` for non-image files.",
					},
					map[string]any{
						"name": "image_height",
						"title": "Image Height",
						"type": "`$ANY`",
						"short": "Image height in pixels, or `null` for non-image files.",
					},
					map[string]any{
						"name": "image_width",
						"title": "Image Width",
						"type": "`$ANY`",
						"short": "Image width in pixels, or `null` for non-image files.",
					},
					map[string]any{
						"name": "resource_type",
						"title": "Resource Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Detected resource type of the upload.",
					},
					map[string]any{
						"name": "upload_state",
						"title": "Upload State",
						"type": "`$STRING`",
						"short": "Upload processing state.",
					},
				},
				"name": "upload",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/uploads",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "uploads",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"uploads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"binary": true,
											"media": "application/octet-stream",
											"name": "file",
										},
										map[string]any{
											"name": "file_name",
										},
										map[string]any{
											"name": "project_id",
										},
									},
									"kind": "multipart",
									"media": "multipart/form-data",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/uploads",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "uploads",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"uploads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "file_url",
											"orig": "file_url",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"file_url",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"usage_summary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "automation_id",
						"title": "Automation Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The automation this usage belongs to.",
					},
					map[string]any{
						"name": "charged_amount",
						"title": "Charged Amount",
						"type": "`$INTEGER`",
						"req": true,
						"short": "`charged_units` in money, in microdollars.",
					},
					map[string]any{
						"name": "charged_units",
						"title": "Charged Units",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Units the group took off the balance, as a positive number.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
						"short": "The label of the newest usage in the group, so a renamed automation shows its current name.",
					},
					map[string]any{
						"name": "usage_count",
						"title": "Usage Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "How many usage events settled in the group.",
					},
				},
				"name": "usage_summary",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/usage_billing/usage_summary",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "usage_billing",
									},
									map[string]any{
										"lit": "usage_summary",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"usage_billing",
									"usage_summary",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.groups`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "group_by",
											"orig": "group_by",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "product",
											"orig": "product",
											"type": "`$STRING`",
											"kind": "query",
											"example": "automations",
										},
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "until",
											"orig": "until",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "activated_user",
						"title": "Activated User",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user is considered activated (completed key onboarding actions)",
					},
					map[string]any{
						"name": "auto_reminder",
						"title": "Auto Reminder",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task",
					},
					map[string]any{
						"name": "avatar_big",
						"title": "Avatar Big",
						"type": "`$ANY`",
						"short": "The link to a 195x195 pixels image of the user's avatar",
					},
					map[string]any{
						"name": "avatar_medium",
						"title": "Avatar Medium",
						"type": "`$ANY`",
						"short": "The link to a 60x60 pixels image of the user's avatar",
					},
					map[string]any{
						"name": "avatar_s640",
						"title": "Avatar S640",
						"type": "`$ANY`",
						"short": "The link to a 640x640 pixels image of the user's avatar",
					},
					map[string]any{
						"name": "avatar_small",
						"title": "Avatar Small",
						"type": "`$ANY`",
						"short": "The link to a 35x35 pixels image of the user's avatar",
					},
					map[string]any{
						"name": "business_account_id",
						"title": "Business Account Id",
						"type": "`$STRING`",
						"short": "The ID of the user's business account",
					},
					map[string]any{
						"name": "completed_count",
						"title": "Completed Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Total number of tasks completed by user",
					},
					map[string]any{
						"name": "completed_today",
						"title": "Completed Today",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of tasks completed today by the user",
					},
					map[string]any{
						"name": "daily_goal",
						"title": "Daily Goal",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The daily goal number of completed tasks for karma",
					},
					map[string]any{
						"name": "date_format",
						"title": "Date Format",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1)",
					},
					map[string]any{
						"name": "days_off",
						"title": "Days Off",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Array of integers representing user's days off (between 1 and 7, where 1 is Monday and 7 is Sunday)",
					},
					map[string]any{
						"name": "deleted_at",
						"title": "Deleted At",
						"type": "`$ANY`",
						"short": "Date when user was deleted (ISO 8601 format)",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "User's email address",
					},
					map[string]any{
						"name": "feature_identifier",
						"title": "Feature Identifier",
						"type": "`$STRING`",
						"req": true,
						"short": "Feature identifier for feature flag evaluations",
					},
					map[string]any{
						"name": "features",
						"title": "Features",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Feature flags and settings for the user",
					},
					map[string]any{
						"name": "free_trial_expires",
						"title": "Free Trial Expires",
						"type": "`$ANY`",
						"short": "Date when free trial expires (ISO 8601 format)",
					},
					map[string]any{
						"name": "full_name",
						"title": "Full Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The user's real name formatted as Firstname Lastname",
					},
					map[string]any{
						"name": "getting_started_guide_projects",
						"title": "Getting Started Guide Projects",
						"type": "`$ANY`",
						"short": "List of project IDs for getting started guide",
					},
					map[string]any{
						"name": "has_magic_number",
						"title": "Has Magic Number",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user has reached a magic number milestone",
					},
					map[string]any{
						"name": "has_password",
						"title": "Has Password",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user has a password set on the account.",
					},
					map[string]any{
						"name": "has_started_a_trial",
						"title": "Has Started A Trial",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user has ever started a free trial",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "User ID",
					},
					map[string]any{
						"name": "image_id",
						"title": "Image Id",
						"type": "`$STRING`",
						"short": "The ID of the user's avatar",
					},
					map[string]any{
						"name": "inbox_project_id",
						"title": "Inbox Project Id",
						"type": "`$STRING`",
						"short": "The ID of the user's Inbox project",
					},
					map[string]any{
						"name": "is_celebrations_enabled",
						"title": "Is Celebrations Enabled",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether celebration animations are enabled",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"short": "Whether the user is deleted",
					},
					map[string]any{
						"name": "is_onboarded",
						"title": "Is Onboarded",
						"type": "`$BOOLEAN`",
						"short": "Composite flag: true once all four onboarded_* criteria above are met.",
					},
					map[string]any{
						"name": "is_premium",
						"title": "Is Premium",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user has a Todoist Pro subscription (a true or false value)",
					},
					map[string]any{
						"name": "joinable_workspace",
						"title": "Joinable Workspace",
						"type": "`$ANY`",
						"req": true,
						"short": "Information about workspaces the user can join",
					},
					map[string]any{
						"name": "joined_at",
						"title": "Joined At",
						"type": "`$ANY`",
						"short": "Date when user joined Todoist (ISO 8601 format)",
					},
					map[string]any{
						"name": "karma",
						"title": "Karma",
						"type": "`$NUMBER`",
						"req": true,
						"short": "The user's karma score",
					},
					map[string]any{
						"name": "karma_trend",
						"title": "Karma Trend",
						"type": "`$ANY`",
						"short": "The user's karma trend.",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"req": true,
						"short": "The user's language",
					},
					map[string]any{
						"name": "mfa_enabled",
						"title": "Mfa Enabled",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether multi-factor authentication is enabled",
					},
					map[string]any{
						"name": "next_week",
						"title": "Next Week",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday)",
					},
					map[string]any{
						"name": "onboarded_dated_tasks_created",
						"title": "Onboarded Dated Tasks Created",
						"type": "`$ANY`",
						"short": "True once the user has created at least 1 task with a due date that includes a time component (excluding auto-seeded getting-started-guide tasks).",
					},
					map[string]any{
						"name": "onboarded_desktop_accessed",
						"title": "Onboarded Desktop Accessed",
						"type": "`$ANY`",
						"short": "True once the user has synced from Web, macOS, or Windows.",
					},
					map[string]any{
						"name": "onboarded_mobile_accessed",
						"title": "Onboarded Mobile Accessed",
						"type": "`$ANY`",
						"short": "True once the user has synced from iOS or Android.",
					},
					map[string]any{
						"name": "onboarded_tasks_completed",
						"title": "Onboarded Tasks Completed",
						"type": "`$ANY`",
						"short": "True once the user has completed at least 3 tasks.",
					},
					map[string]any{
						"name": "onboarding_completed",
						"title": "Onboarding Completed",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user has completed onboarding",
					},
					map[string]any{
						"name": "onboarding_initiated",
						"title": "Onboarding Initiated",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user has initiated onboarding",
					},
					map[string]any{
						"name": "onboarding_level",
						"title": "Onboarding Level",
						"type": "`$ANY`",
						"short": "User's self-reported skill level during onboarding",
					},
					map[string]any{
						"name": "onboarding_persona",
						"title": "Onboarding Persona",
						"type": "`$ANY`",
						"short": "User's onboarding persona selection",
					},
					map[string]any{
						"name": "onboarding_role",
						"title": "Onboarding Role",
						"type": "`$ANY`",
						"short": "User's role selection during onboarding",
					},
					map[string]any{
						"name": "onboarding_started",
						"title": "Onboarding Started",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the user has started onboarding",
					},
					map[string]any{
						"name": "onboarding_team_mode",
						"title": "Onboarding Team Mode",
						"type": "`$ANY`",
						"short": "Whether user selected team mode during onboarding",
					},
					map[string]any{
						"name": "onboarding_use_cases",
						"title": "Onboarding Use Cases",
						"type": "`$ANY`",
						"short": "Use cases the user selected during onboarding",
					},
					map[string]any{
						"name": "premium_status",
						"title": "Premium Status",
						"type": "`$ANY`",
						"short": "Outlines why a user is premium, possible values are: not_premium, current_personal_plan, legacy_personal_plan or teams_business_member",
					},
					map[string]any{
						"name": "premium_until",
						"title": "Premium Until",
						"type": "`$ANY`",
						"short": "The date when the user's Todoist Pro subscription ends (null if not a Todoist Pro user).",
					},
					map[string]any{
						"name": "share_limit",
						"title": "Share Limit",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Maximum number of collaborators allowed in shared projects",
					},
					map[string]any{
						"name": "sort_order",
						"title": "Sort Order",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Whether to show projects in an oldest dates first order (if set to 0), or a oldest dates last order (if set to 1)",
					},
					map[string]any{
						"name": "start_day",
						"title": "Start Day",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday)",
					},
					map[string]any{
						"name": "start_page",
						"title": "Start Page",
						"type": "`$STRING`",
						"req": true,
						"short": "The user's default view on Todoist.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$ANY`",
						"short": "The user's status, shared across Todoist and Comms.",
					},
					map[string]any{
						"name": "theme_appearance",
						"title": "Theme Appearance",
						"type": "`$STRING`",
						"req": true,
						"short": "Whether Todoist uses a light theme, a dark theme, or follows the system appearance",
					},
					map[string]any{
						"name": "theme_id",
						"title": "Theme Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The currently selected Todoist theme (a number between 0 and 13)",
					},
					map[string]any{
						"name": "time_format",
						"title": "Time Format",
						"type": "`$ANY`",
						"short": "Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1)",
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"short": "The user's token that should be used to call the other API methods",
					},
					map[string]any{
						"name": "tz_info",
						"title": "Tz Info",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The user's timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of t…",
					},
					map[string]any{
						"name": "urgent_reminder_device",
						"title": "Urgent Reminder Device",
						"type": "`$ANY`",
						"short": "The device that should ring urgent reminders.",
					},
					map[string]any{
						"name": "verification_status",
						"title": "Verification Status",
						"type": "`$STRING`",
						"req": true,
						"short": "User's email verification status.",
					},
					map[string]any{
						"name": "websocket_url",
						"title": "Websocket Url",
						"type": "`$STRING`",
						"req": true,
						"short": "WebSocket URL for real-time updates",
					},
					map[string]any{
						"name": "weekend_start_day",
						"title": "Weekend Start Day",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The day used when a user chooses to schedule a task for the 'Weekend' (between 1 and 7, where 1 is Monday and 7 is Sunday)",
					},
					map[string]any{
						"name": "weekly_goal",
						"title": "Weekly Goal",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The target number of tasks to complete per week",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/user",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "user",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"workspace": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the workspace.",
					},
					map[string]any{
						"name": "domain_discovery",
						"title": "Domain Discovery",
						"type": "`$BOOLEAN`",
						"short": "Whether users with matching email domains can discover this workspace.",
					},
					map[string]any{
						"name": "domain_name",
						"title": "Domain Name",
						"type": "`$ANY`",
						"short": "Workspace email domain.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "invite_code",
						"title": "Invite Code",
						"type": "`$ANY`",
						"short": "Regenerate workspace invite code when set.",
					},
					map[string]any{
						"name": "is_collapsed",
						"title": "Is Collapsed",
						"type": "`$BOOLEAN`",
						"short": "Updated collapse state for current user.",
					},
					map[string]any{
						"name": "is_guest_allowed",
						"title": "Is Guest Allowed",
						"type": "`$BOOLEAN`",
						"short": "Whether guests are allowed in the workspace.",
					},
					map[string]any{
						"name": "is_link_sharing_enabled",
						"title": "Is Link Sharing Enabled",
						"type": "`$BOOLEAN`",
						"short": "Whether link sharing is enabled for the workspace.",
					},
					map[string]any{
						"name": "is_trial_pending",
						"title": "Is Trial Pending",
						"type": "`$BOOLEAN`",
						"short": "Whether the workspace is waiting for trial confirmation.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the workspace.",
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$ANY`",
						"short": "Workspace properties.",
					},
					map[string]any{
						"name": "restrict_email_domains",
						"title": "Restrict Email Domains",
						"type": "`$BOOLEAN`",
						"short": "Whether workspace invites are restricted to workspace domain.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "workspace",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/workspaces",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/workspaces/logo",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "logo",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"logo",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "logo",
								},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"name": "delete",
										},
										map[string]any{
											"binary": true,
											"media": "application/octet-stream",
											"name": "file",
										},
										map[string]any{
											"name": "workspace_id",
										},
									},
									"kind": "multipart",
									"media": "multipart/form-data",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces/invitations",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "invitations",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"invitations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "invitation",
									"exist": []any{
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces/{workspace_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workspace_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/workspaces/{workspace_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workspace_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/workspaces/{workspace_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workspace_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"workspace_invitation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "app",
						"title": "App",
						"type": "`$STRING`",
						"short": "Product the invitation was sent from.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The ID of the invitation",
					},
					map[string]any{
						"name": "inviter_id",
						"title": "Inviter Id",
						"type": "`$STRING`",
						"req": true,
						"short": "ID of the user user who sent the invitation",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
						"req": true,
						"short": "Workspace role granted by the invitation.",
					},
					map[string]any{
						"name": "user_email",
						"title": "User Email",
						"type": "`$STRING`",
						"req": true,
						"short": "The invited person's email.",
					},
					map[string]any{
						"name": "workspace_id",
						"title": "Workspace Id",
						"type": "`$STRING`",
						"req": true,
						"short": "ID of the workspace",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "workspace_invitation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces/invitations/all",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "invitations",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"invitations",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/workspaces/invitations/delete",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "invitations",
									},
									map[string]any{
										"lit": "delete",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"invitations",
									"delete",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/workspaces/invitations/{invite_code}/accept",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "invitations",
									},
									map[string]any{
										"var": "invite_code",
									},
									map[string]any{
										"lit": "accept",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"invitations",
									"{invite_code}",
									"accept",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "invite_code",
											"orig": "invite_code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "accept",
									"exist": []any{
										"invite_code",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/workspaces/invitations/{invite_code}/reject",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "invitations",
									},
									map[string]any{
										"var": "invite_code",
									},
									map[string]any{
										"lit": "reject",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"invitations",
									"{invite_code}",
									"reject",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "invite_code",
											"orig": "invite_code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "reject",
									"exist": []any{
										"invite_code",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"workspace_project": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access",
						"title": "Access",
						"type": "`$ANY`",
						"req": true,
						"short": "Project access configuration.",
					},
					map[string]any{
						"name": "archived_date",
						"title": "Archived Date",
						"type": "`$ANY`",
						"short": "Date and time when the project was archived, or `null` if active.",
					},
					map[string]any{
						"name": "archived_timestamp",
						"title": "Archived Timestamp",
						"type": "`$INTEGER`",
						"short": "Unix timestamp for when the project was archived, or 0 if active.",
					},
					map[string]any{
						"name": "color",
						"title": "Color",
						"type": "`$ANY`",
						"short": "Numeric project color code.",
					},
					map[string]any{
						"name": "default_order",
						"title": "Default Order",
						"type": "`$INTEGER`",
						"short": "Default order of the project in workspace views.",
					},
					map[string]any{
						"name": "default_order_key",
						"title": "Default Order Key",
						"type": "`$ANY`",
						"short": "Fractional-indexing key for the workspace's shared default-ordering scope (folders and workspace projects together).",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Project description.",
					},
					map[string]any{
						"name": "folder_id",
						"title": "Folder Id",
						"type": "`$STRING`",
						"short": "Numeric ID of the folder that contains the project, or `null`.",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$ANY`",
						"short": "Project icon name, or `null` for the default icon.",
					},
					map[string]any{
						"name": "initiated_by_uid",
						"title": "Initiated By Uid",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Numeric ID of the user requesting the workspace project.",
					},
					map[string]any{
						"name": "is_archived",
						"title": "Is Archived",
						"type": "`$BOOLEAN`",
						"short": "Whether the workspace project is archived.",
					},
					map[string]any{
						"name": "is_frozen",
						"title": "Is Frozen",
						"type": "`$BOOLEAN`",
						"short": "Whether the project is frozen and cannot be modified.",
					},
					map[string]any{
						"name": "is_invite_only",
						"title": "Is Invite Only",
						"type": "`$BOOLEAN`",
						"short": "Whether joining the workspace project requires an invitation.",
					},
					map[string]any{
						"name": "is_project_insights_enabled",
						"title": "Is Project Insights Enabled",
						"type": "`$BOOLEAN`",
						"short": "Whether project insights are enabled for the project.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Project name.",
					},
					map[string]any{
						"name": "project_id",
						"title": "Project Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the project.",
					},
					map[string]any{
						"name": "public_access",
						"title": "Public Access",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the project is publicly accessible.",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Project status.",
					},
					map[string]any{
						"name": "view_style",
						"title": "View Style",
						"type": "`$STRING`",
						"short": "Project view style.",
					},
					map[string]any{
						"name": "workspace_id",
						"title": "Workspace Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Numeric ID of the workspace that contains the project.",
					},
				},
				"name": "workspace_project",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces/{workspace_id}/projects/active",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"lit": "active",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{workspace_id}",
									"projects",
									"active",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace_projects`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces/{workspace_id}/projects/archived",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"lit": "archived",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{workspace_id}",
									"projects",
									"archived",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace_projects`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
									},
								},
								"select": map[string]any{
									"$action": "archived",
									"exist": []any{
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.workspace",
						},
					},
				},
			},
			"workspace_user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "custom_sorting_applied",
						"title": "Custom Sorting Applied",
						"type": "`$BOOLEAN`",
						"short": "Whether the user has custom project sorting enabled.",
					},
					map[string]any{
						"name": "full_name",
						"title": "Full Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Full name of the workspace member.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image_id",
						"title": "Image Id",
						"type": "`$STRING`",
						"short": "Avatar image ID of the workspace member, or `null`.",
					},
					map[string]any{
						"name": "invite_code",
						"title": "Invite Code",
						"type": "`$ANY`",
						"short": "Workspace invite code to join with.",
					},
					map[string]any{
						"name": "is_deleted",
						"title": "Is Deleted",
						"type": "`$BOOLEAN`",
						"short": "Whether the workspace member is deleted.",
					},
					map[string]any{
						"name": "project_sort_preference",
						"title": "Project Sort Preference",
						"type": "`$STRING`",
						"short": "Project sorting preference for the user.",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Workspace role assigned to the user.",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
						"req": true,
						"short": "Timezone of the workspace member.",
					},
					map[string]any{
						"name": "user_email",
						"title": "User Email",
						"type": "`$STRING`",
						"req": true,
						"short": "Email address of the workspace member.",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"req": true,
						"short": "String ID of the workspace user.",
					},
					map[string]any{
						"name": "workspace_id",
						"title": "Workspace Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "String ID of the workspace.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "workspace_user",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/workspaces/{workspace_id}/users/invite",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "invite",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{workspace_id}",
									"users",
									"invite",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "invite",
									"exist": []any{
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/workspaces/join",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "join",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"join",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/workspaces/users",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"lit": "users",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"users",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace_users`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id",
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/workspaces/{workspace_id}/users/{user_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{workspace_id}",
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"user_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/workspaces/{workspace_id}/users/{user_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"workspaces",
									"{workspace_id}",
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"user_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.workspace",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
