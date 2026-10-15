import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "active",
    "accessor": "Active",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/workspaces/{workspace_id}/projects/active",
    "args": [
      {
        "name": "workspace_id",
        "wire": "workspace_id",
        "value": "p1"
      }
    ],
    "select": {
      "cursor": "v1",
      "limit": 100
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "has_more": true,
      "next_cursor": "x",
      "workspace_projects": [
        {
          "initiated_by_uid": 1,
          "project_id": "x",
          "workspace_id": 1,
          "public_access": true,
          "access": {
            "visibility": "restricted",
            "configuration": {}
          },
          "folder_id": 1,
          "is_invite_only": true,
          "is_archived": true,
          "archived_timestamp": 1,
          "archived_date": "2026-01-01T00:00:00Z",
          "is_frozen": true,
          "name": "x",
          "color": 1,
          "icon": "x",
          "view_style": "LIST",
          "description": "x",
          "status": "PLANNED",
          "default_order": 1,
          "default_order_key": "x",
          "is_project_insights_enabled": true,
          "_role": "CREATOR"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "activity",
    "accessor": "Activity",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/activities",
    "args": [],
    "select": {
      "annotate_note": "v1",
      "annotate_parent": "v1",
      "cursor": "v1",
      "date_from": "v1",
      "date_to": "v1",
      "ensure_last_state": "v1",
      "event_type": "v1",
      "include_child_object": "v1",
      "include_parent_object": "v1",
      "initiator_id": "v1",
      "initiator_id_null": "v1",
      "limit": 50,
      "object_event_type": "v1",
      "object_id": "v1",
      "object_type": "v1",
      "parent_item_id": "v1",
      "parent_project_id": "v1",
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "object_type",
      "object_id",
      "parent_project_id",
      "parent_item_id",
      "include_parent_object",
      "include_child_objects",
      "initiator_id",
      "initiator_id_null",
      "event_type",
      "ensure_last_state",
      "object_event_types",
      "workspace_id",
      "annotate_notes",
      "annotate_parents",
      "cursor",
      "limit",
      "date_from",
      "date_to"
    ],
    "queryArgs": [
      {
        "name": "annotate_note",
        "wire": "annotate_notes"
      },
      {
        "name": "annotate_parent",
        "wire": "annotate_parents"
      },
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "date_from",
        "wire": "date_from"
      },
      {
        "name": "date_to",
        "wire": "date_to"
      },
      {
        "name": "ensure_last_state",
        "wire": "ensure_last_state"
      },
      {
        "name": "event_type",
        "wire": "event_type"
      },
      {
        "name": "include_child_object",
        "wire": "include_child_objects"
      },
      {
        "name": "include_parent_object",
        "wire": "include_parent_object"
      },
      {
        "name": "initiator_id",
        "wire": "initiator_id"
      },
      {
        "name": "initiator_id_null",
        "wire": "initiator_id_null"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "object_event_type",
        "wire": "object_event_types"
      },
      {
        "name": "object_id",
        "wire": "object_id"
      },
      {
        "name": "object_type",
        "wire": "object_type"
      },
      {
        "name": "parent_item_id",
        "wire": "parent_item_id"
      },
      {
        "name": "parent_project_id",
        "wire": "parent_project_id"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "object_type": "project",
          "object_id": "x",
          "event_type": "x",
          "event_date": "2026-01-01T00:00:00Z",
          "id": 1,
          "parent_project_id": "x",
          "parent_item_id": "x",
          "initiator_id": "x",
          "extra_data_id": 1,
          "extra_data": {}
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "archived",
    "accessor": "Archived",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/workspaces/{workspace_id}/projects/archived",
    "args": [
      {
        "name": "workspace_id",
        "wire": "workspace_id",
        "value": "p1"
      }
    ],
    "select": {
      "cursor": "v1",
      "limit": 100
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "has_more": true,
      "next_cursor": "x",
      "workspace_projects": [
        {
          "initiated_by_uid": 1,
          "project_id": "x",
          "workspace_id": 1,
          "public_access": true,
          "access": {
            "visibility": "restricted",
            "configuration": {}
          },
          "folder_id": 1,
          "is_invite_only": true,
          "is_archived": true,
          "archived_timestamp": 1,
          "archived_date": "2026-01-01T00:00:00Z",
          "is_frozen": true,
          "name": "x",
          "color": 1,
          "icon": "x",
          "view_style": "LIST",
          "description": "x",
          "status": "PLANNED",
          "default_order": 1,
          "default_order_key": "x",
          "is_project_insights_enabled": true,
          "_role": "CREATOR"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "authorization",
    "accessor": "Authorization",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/revoke",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "authorization",
    "accessor": "Authorization",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/access_tokens",
    "args": [],
    "select": {
      "access_token": "v1",
      "client_id": "v1",
      "client_secret": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "client_id",
      "client_secret",
      "access_token"
    ],
    "queryArgs": [
      {
        "name": "access_token",
        "wire": "access_token"
      },
      {
        "name": "client_id",
        "wire": "client_id"
      },
      {
        "name": "client_secret",
        "wire": "client_secret"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "backup",
    "accessor": "Backup",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/backups",
    "args": [],
    "select": {
      "mfa_token": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "mfa_token"
    ],
    "queryArgs": [
      {
        "name": "mfa_token",
        "wire": "mfa_token"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "version": "x",
        "url": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "backup",
    "accessor": "Backup",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/backups/download",
    "action": "download",
    "args": [],
    "select": {
      "file": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "file"
    ],
    "queryArgs": [
      {
        "name": "file",
        "wire": "file"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "billing_portal_url",
    "accessor": "BillingPortalUrl",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/payments/cancel_plan_with_redirect_to_stripe",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "billing_portal_url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "collaborator",
    "accessor": "Collaborator",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/projects/{project_id}/collaborators",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "public_key": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor",
      "limit",
      "public_key"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "public_key",
        "wire": "public_key"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "name": "x",
          "email": "x"
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/comments",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "posted_uid": "x",
      "content": "x",
      "file_attachment": {},
      "uids_to_notify": [
        "x"
      ],
      "is_deleted": true,
      "posted_at": "x",
      "reactions": {}
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/comments",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "project_id": "v1",
      "public_key": "v1",
      "task_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "project_id",
      "task_id",
      "cursor",
      "limit",
      "public_key"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "public_key",
        "wire": "public_key"
      },
      {
        "name": "task_id",
        "wire": "task_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "posted_uid": "x",
          "content": "x",
          "file_attachment": {},
          "uids_to_notify": [
            "x"
          ],
          "is_deleted": true,
          "posted_at": "x",
          "reactions": {}
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/comments/{comment_id}",
    "args": [
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "posted_uid": "x",
      "content": "x",
      "file_attachment": {},
      "uids_to_notify": [
        "x"
      ],
      "is_deleted": true,
      "posted_at": "x",
      "reactions": {}
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/comments/{comment_id}",
    "args": [
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/comments/{comment_id}",
    "args": [
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "posted_uid": "x",
      "content": "x",
      "file_attachment": {},
      "uids_to_notify": [
        "x"
      ],
      "is_deleted": true,
      "posted_at": "x",
      "reactions": {}
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/comments/{comment_id}/reactions",
    "action": "reaction_add",
    "args": [
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "posted_uid": "x",
      "content": "x",
      "file_attachment": {},
      "uids_to_notify": [
        "x"
      ],
      "is_deleted": true,
      "posted_at": "x",
      "reactions": {}
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/comments/{comment_id}/reactions/remove",
    "action": "reaction_remove",
    "args": [
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "completed_task",
    "accessor": "CompletedTask",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/tasks/completed/by_completion_date",
    "args": [],
    "select": {
      "since": "v1",
      "until": "v1",
      "cursor": "v1",
      "filter_lang": "v1",
      "filter_query": "v1",
      "limit": 50,
      "parent_id": "v1",
      "project_id": "v1",
      "public_key": "v1",
      "section_id": "v1",
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "since",
      "until",
      "workspace_id",
      "project_id",
      "section_id",
      "parent_id",
      "filter_query",
      "filter_lang",
      "cursor",
      "limit",
      "public_key"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "filter_lang",
        "wire": "filter_lang"
      },
      {
        "name": "filter_query",
        "wire": "filter_query"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "parent_id",
        "wire": "parent_id"
      },
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "public_key",
        "wire": "public_key"
      },
      {
        "name": "section_id",
        "wire": "section_id"
      },
      {
        "name": "since",
        "wire": "since"
      },
      {
        "name": "until",
        "wire": "until"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "user_id": "x",
          "id": "x",
          "project_id": "x",
          "section_id": "x",
          "parent_id": "x",
          "added_by_uid": "x",
          "assigned_by_uid": "x",
          "responsible_uid": "x",
          "labels": [
            "x"
          ],
          "deadline": {},
          "duration": {},
          "is_collapsed": true,
          "checked": true,
          "is_deleted": true,
          "added_at": "x",
          "completed_at": "x",
          "completed_by_uid": "x",
          "updated_at": "x",
          "due": {},
          "priority": 1,
          "child_order": 1,
          "order_key": "x",
          "content": "x",
          "description": "x",
          "note_count": 1,
          "day_order": 1,
          "completed_count": 1,
          "postponed_count": 1
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "completed_task",
    "accessor": "CompletedTask",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/tasks/completed/by_due_date",
    "action": "by_due_date",
    "args": [],
    "select": {
      "since": "v1",
      "until": "v1",
      "cursor": "v1",
      "filter_lang": "v1",
      "filter_query": "v1",
      "limit": 50,
      "parent_id": "v1",
      "project_id": "v1",
      "section_id": "v1",
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "since",
      "until",
      "workspace_id",
      "project_id",
      "section_id",
      "parent_id",
      "filter_query",
      "filter_lang",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "filter_lang",
        "wire": "filter_lang"
      },
      {
        "name": "filter_query",
        "wire": "filter_query"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "parent_id",
        "wire": "parent_id"
      },
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "section_id",
        "wire": "section_id"
      },
      {
        "name": "since",
        "wire": "since"
      },
      {
        "name": "until",
        "wire": "until"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "user_id": "x",
          "id": "x",
          "project_id": "x",
          "section_id": "x",
          "parent_id": "x",
          "added_by_uid": "x",
          "assigned_by_uid": "x",
          "responsible_uid": "x",
          "labels": [
            "x"
          ],
          "deadline": {},
          "duration": {},
          "is_collapsed": true,
          "checked": true,
          "is_deleted": true,
          "added_at": "x",
          "completed_at": "x",
          "completed_by_uid": "x",
          "updated_at": "x",
          "due": {},
          "priority": 1,
          "child_order": 1,
          "order_key": "x",
          "content": "x",
          "description": "x",
          "note_count": 1,
          "day_order": 1,
          "completed_count": 1,
          "postponed_count": 1
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "credit_state",
    "accessor": "CreditState",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/usage_billing/state",
    "args": [],
    "select": {
      "product": "automations"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "product"
    ],
    "queryArgs": [
      {
        "name": "product",
        "wire": "product"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "available_units": 1,
      "available_amount": 1,
      "settled_units": 1,
      "settled_amount": 1,
      "currency": "x",
      "usage_allowed": true,
      "low_balance": true,
      "is_settled_low_balance": true,
      "usage_block_reason": "temporarily_unavailable",
      "depleted": true
    },
    "idField": "id"
  },
  {
    "entity": "email",
    "accessor": "Email",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/emails",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "email": "x"
    },
    "idField": "id"
  },
  {
    "entity": "file_url",
    "accessor": "FileUrl",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/templates/url",
    "args": [],
    "select": {
      "project_id": "v1",
      "use_relative_date": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "project_id",
      "use_relative_dates"
    ],
    "queryArgs": [
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "use_relative_date",
        "wire": "use_relative_dates"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "file_name": "x",
      "file_url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/folders/{folder_id}",
    "args": [
      {
        "name": "id",
        "wire": "folder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "workspace_id": "x",
      "default_order": 1,
      "default_order_key": "x",
      "child_order": 1,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/folders",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "workspace_id": "x",
      "default_order": 1,
      "default_order_key": "x",
      "child_order": 1,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/folders",
    "args": [],
    "select": {
      "workspace_id": "v1",
      "cursor": "v1",
      "limit": 50
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspace_id",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "name": "x",
          "workspace_id": "x",
          "default_order": 1,
          "default_order_key": "x",
          "child_order": 1,
          "is_deleted": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/folders/{folder_id}",
    "args": [
      {
        "name": "id",
        "wire": "folder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "workspace_id": "x",
      "default_order": 1,
      "default_order_key": "x",
      "child_order": 1,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/folders/{folder_id}",
    "args": [
      {
        "name": "id",
        "wire": "folder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "history",
    "accessor": "History",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/usage_billing/history",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "product": "automations",
      "type": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "product",
      "types",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "product",
        "wire": "product"
      },
      {
        "name": "type",
        "wire": "types"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "currency": "x",
      "entries": [
        {
          "id": 1,
          "type": "x",
          "created_at": "x",
          "category": "x",
          "status": "x",
          "charged_units": 1,
          "charged_amount": 1,
          "credited_units": 1,
          "credited_amount": 1,
          "refs": {},
          "description": "x"
        }
      ],
      "has_more": true,
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "id_mapping",
    "accessor": "IdMapping",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/id_mappings/{obj_name}/{obj_ids}",
    "args": [
      {
        "name": "obj_id",
        "wire": "obj_ids",
        "value": "p1"
      },
      {
        "name": "obj_name",
        "wire": "obj_name",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "old_id": "x",
        "new_id": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "invite",
    "accessor": "Invite",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/workspaces/{workspace_id}/users/invite",
    "args": [
      {
        "name": "workspace_id",
        "wire": "workspace_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "invited_emails": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "label",
    "accessor": "Label",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/labels",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "color": "x",
      "order": 1,
      "is_favorite": true
    },
    "idField": "id"
  },
  {
    "entity": "label",
    "accessor": "Label",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/labels/search",
    "action": "search",
    "args": [],
    "select": {
      "query": "v1",
      "cursor": "v1",
      "limit": 50
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "query",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "query",
        "wire": "query"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "name": "x",
          "color": "x",
          "order": 1,
          "is_favorite": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "label",
    "accessor": "Label",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/labels",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "name": "x",
          "color": "x",
          "order": 1,
          "is_favorite": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "label",
    "accessor": "Label",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/labels/{label_id}",
    "args": [
      {
        "name": "id",
        "wire": "label_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "color": "x",
      "order": 1,
      "is_favorite": true
    },
    "idField": "id"
  },
  {
    "entity": "label",
    "accessor": "Label",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/labels/{label_id}",
    "args": [
      {
        "name": "id",
        "wire": "label_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "label",
    "accessor": "Label",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/labels/{label_id}",
    "args": [
      {
        "name": "id",
        "wire": "label_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "color": "x",
      "order": 1,
      "is_favorite": true
    },
    "idField": "id"
  },
  {
    "entity": "location_reminder",
    "accessor": "LocationReminder",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/location_reminders/{reminder_id}",
    "args": [
      {
        "name": "id",
        "wire": "reminder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "member_view",
    "accessor": "MemberView",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/workspaces/users",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 100,
      "sort": "id",
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspace_id",
      "cursor",
      "limit",
      "sort"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "has_more": true,
      "next_cursor": "x",
      "workspace_users": [
        {
          "user_id": "x",
          "workspace_id": "x",
          "user_email": "x",
          "full_name": "x",
          "timezone": "x",
          "role": "ADMIN",
          "image_id": "x",
          "is_deleted": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "migrate_personal_token",
    "accessor": "MigratePersonalToken",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/access_tokens/migrate_personal_token",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "access_token": "x",
      "token_type": "x",
      "expires_in": 1
    },
    "idField": "id"
  },
  {
    "entity": "notification_location_sync_view",
    "accessor": "NotificationLocationSyncView",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/location_reminders/{reminder_id}",
    "args": [
      {
        "name": "reminder_id",
        "wire": "reminder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "item_id": "x",
      "project_id": "x",
      "notify_uid": "x",
      "name": "x",
      "loc_lat": "x",
      "loc_long": "x",
      "loc_trigger": "on_enter",
      "radius": 1,
      "is_deleted": true,
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "notification_location_sync_view",
    "accessor": "NotificationLocationSyncView",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/location_reminders",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "item_id": "x",
      "project_id": "x",
      "notify_uid": "x",
      "name": "x",
      "loc_lat": "x",
      "loc_long": "x",
      "loc_trigger": "on_enter",
      "radius": 1,
      "is_deleted": true,
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "notification_location_sync_view",
    "accessor": "NotificationLocationSyncView",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/location_reminders",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "task_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "task_id",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "task_id",
        "wire": "task_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "item_id": "x",
          "project_id": "x",
          "notify_uid": "x",
          "name": "x",
          "loc_lat": "x",
          "loc_long": "x",
          "loc_trigger": "on_enter",
          "radius": 1,
          "is_deleted": true,
          "type": "x"
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "notification_location_sync_view",
    "accessor": "NotificationLocationSyncView",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/location_reminders/{reminder_id}",
    "args": [
      {
        "name": "reminder_id",
        "wire": "reminder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "item_id": "x",
      "project_id": "x",
      "notify_uid": "x",
      "name": "x",
      "loc_lat": "x",
      "loc_long": "x",
      "loc_trigger": "on_enter",
      "radius": 1,
      "is_deleted": true,
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "notification_sync_view",
    "accessor": "NotificationSyncView",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/reminders/{reminder_id}",
    "args": [
      {
        "name": "reminder_id",
        "wire": "reminder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "item_id": "x",
      "notify_uid": "x",
      "is_deleted": true,
      "is_urgent": true,
      "type": "x",
      "minute_offset": 1,
      "due": {}
    },
    "idField": "id"
  },
  {
    "entity": "notification_sync_view",
    "accessor": "NotificationSyncView",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/reminders",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "item_id": "x",
      "notify_uid": "x",
      "is_deleted": true,
      "is_urgent": true,
      "type": "x",
      "minute_offset": 1,
      "due": {}
    },
    "idField": "id"
  },
  {
    "entity": "notification_sync_view",
    "accessor": "NotificationSyncView",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/reminders",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "task_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "task_id",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "task_id",
        "wire": "task_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "item_id": "x",
          "notify_uid": "x",
          "is_deleted": true,
          "is_urgent": true,
          "type": "x",
          "minute_offset": 1,
          "due": {}
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "notification_sync_view",
    "accessor": "NotificationSyncView",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/reminders/{reminder_id}",
    "args": [
      {
        "name": "reminder_id",
        "wire": "reminder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "item_id": "x",
      "notify_uid": "x",
      "is_deleted": true,
      "is_urgent": true,
      "type": "x",
      "minute_offset": 1,
      "due": {}
    },
    "idField": "id"
  },
  {
    "entity": "plan_detail",
    "accessor": "PlanDetail",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/workspaces/plan_details",
    "args": [],
    "select": {
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspace_id"
    ],
    "queryArgs": [
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "current_member_count": 1,
      "current_plan": "Business",
      "current_plan_status": "Active",
      "downgrade_at": "x",
      "current_active_projects": 1,
      "maximum_active_projects": 1,
      "price_list": [
        {
          "billing_cycle": "monthly",
          "prices": [
            {
              "currency": "x",
              "unit_amount": 1,
              "tax_behavior": "x"
            }
          ]
        }
      ],
      "workspace_id": 1,
      "is_trialing": true,
      "trial_ends_at": "x",
      "cancel_at_period_end": true,
      "has_trialed": true,
      "plan_price": {
        "amount": "x",
        "raw_amount": 1,
        "currency": "x",
        "billing_cycle": "monthly",
        "tax_behavior": "exclusive"
      },
      "has_billing_portal": true,
      "has_billing_portal_switch_to_annual": true
    },
    "idField": "id"
  },
  {
    "entity": "productivity_stat",
    "accessor": "ProductivityStat",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/tasks/completed/stats",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "days_items": [
        {
          "date": "2026-01-01",
          "items": [
            {
              "id": "x",
              "completed": 1
            }
          ],
          "total_completed": 1
        }
      ],
      "week_items": [
        {
          "from": "2026-01-01",
          "to": "2026-01-01",
          "items": [
            {
              "id": "x",
              "completed": 1
            }
          ],
          "total_completed": 1
        }
      ],
      "project_colors": {},
      "completed_count": 1,
      "karma": 1,
      "karma_trend": "x",
      "karma_graph_data": [
        {
          "date": "x",
          "karma_avg": 1
        }
      ],
      "karma_last_update": 1,
      "karma_update_reasons": [
        {
          "time": "x",
          "new_karma": 1,
          "positive_karma": 1,
          "negative_karma": 1,
          "positive_karma_reasons": [
            1
          ],
          "negative_karma_reasons": [
            50
          ]
        }
      ],
      "goals": {
        "user": "x",
        "user_id": "x",
        "daily_goal": 1,
        "weekly_goal": 1,
        "ignore_days": [
          1
        ],
        "vacation_mode": 1,
        "karma_disabled": 1,
        "current_daily_streak": {
          "count": 1,
          "start": "2026-01-01",
          "end": "2026-01-01"
        },
        "current_weekly_streak": {
          "count": 1,
          "start": "2026-01-01",
          "end": "2026-01-01"
        },
        "last_daily_streak": {
          "count": 1,
          "start": "2026-01-01",
          "end": "2026-01-01"
        },
        "last_weekly_streak": {
          "count": 1,
          "start": "2026-01-01",
          "end": "2026-01-01"
        },
        "max_daily_streak": {
          "count": 1,
          "start": "2026-01-01",
          "end": "2026-01-01"
        },
        "max_weekly_streak": {
          "count": 1,
          "start": "2026-01-01",
          "end": "2026-01-01"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/projects",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "can_assign_tasks": true,
      "can_comment": true,
      "child_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "color": "x",
      "icon": "x",
      "creator_uid": "x",
      "created_at": "x",
      "is_archived": true,
      "is_deleted": true,
      "is_favorite": true,
      "is_frozen": true,
      "name": "x",
      "is_shared": true,
      "updated_at": "x",
      "view_style": "x",
      "default_order": 1,
      "default_order_key": "x",
      "description": "x",
      "public_key": "x",
      "access": {
        "visibility": "restricted",
        "configuration": {}
      },
      "role": "x",
      "parent_id": "x",
      "inbox_project": true
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/projects/search",
    "action": "search",
    "args": [],
    "select": {
      "query": "v1",
      "cursor": "v1",
      "limit": 50
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "query",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "query",
        "wire": "query"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "can_assign_tasks": true,
          "can_comment": true,
          "child_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "color": "x",
          "icon": "x",
          "creator_uid": "x",
          "created_at": "x",
          "is_archived": true,
          "is_deleted": true,
          "is_favorite": true,
          "is_frozen": true,
          "name": "x",
          "is_shared": true,
          "updated_at": "x",
          "view_style": "x",
          "default_order": 1,
          "default_order_key": "x",
          "description": "x",
          "public_key": "x",
          "access": {
            "visibility": "restricted"
          },
          "role": "x",
          "parent_id": "x",
          "inbox_project": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/projects",
    "args": [],
    "select": {
      "cursor": "v1",
      "folder_id": "v1",
      "limit": 50,
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "folder_id",
      "workspace_id",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "folder_id",
        "wire": "folder_id"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "can_assign_tasks": true,
          "can_comment": true,
          "child_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "color": "x",
          "icon": "x",
          "creator_uid": "x",
          "created_at": "x",
          "is_archived": true,
          "is_deleted": true,
          "is_favorite": true,
          "is_frozen": true,
          "name": "x",
          "is_shared": true,
          "updated_at": "x",
          "view_style": "x",
          "default_order": 1,
          "default_order_key": "x",
          "description": "x",
          "public_key": "x",
          "access": {
            "visibility": "restricted"
          },
          "role": "x",
          "parent_id": "x",
          "inbox_project": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/projects/archived",
    "action": "archived",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "can_assign_tasks": true,
          "can_comment": true,
          "child_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "color": "x",
          "icon": "x",
          "creator_uid": "x",
          "created_at": "x",
          "is_archived": true,
          "is_deleted": true,
          "is_favorite": true,
          "is_frozen": true,
          "name": "x",
          "is_shared": true,
          "updated_at": "x",
          "view_style": "x",
          "default_order": 1,
          "default_order_key": "x",
          "description": "x",
          "public_key": "x",
          "access": {
            "visibility": "restricted"
          },
          "role": "x",
          "parent_id": "x",
          "inbox_project": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/projects/{project_id}",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "can_assign_tasks": true,
      "can_comment": true,
      "child_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "color": "x",
      "icon": "x",
      "creator_uid": "x",
      "created_at": "x",
      "is_archived": true,
      "is_deleted": true,
      "is_favorite": true,
      "is_frozen": true,
      "name": "x",
      "is_shared": true,
      "updated_at": "x",
      "view_style": "x",
      "default_order": 1,
      "default_order_key": "x",
      "description": "x",
      "public_key": "x",
      "access": {
        "visibility": "restricted",
        "configuration": {}
      },
      "role": "x",
      "parent_id": "x",
      "inbox_project": true
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/projects/{project_id}",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/projects/{project_id}",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "can_assign_tasks": true,
      "can_comment": true,
      "child_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "color": "x",
      "icon": "x",
      "creator_uid": "x",
      "created_at": "x",
      "is_archived": true,
      "is_deleted": true,
      "is_favorite": true,
      "is_frozen": true,
      "name": "x",
      "is_shared": true,
      "updated_at": "x",
      "view_style": "x",
      "default_order": 1,
      "default_order_key": "x",
      "description": "x",
      "public_key": "x",
      "access": {
        "visibility": "restricted",
        "configuration": {}
      },
      "role": "x",
      "parent_id": "x",
      "inbox_project": true
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/projects/{project_id}/archive",
    "action": "archive",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "can_assign_tasks": true,
      "can_comment": true,
      "child_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "color": "x",
      "icon": "x",
      "creator_uid": "x",
      "created_at": "x",
      "is_archived": true,
      "is_deleted": true,
      "is_favorite": true,
      "is_frozen": true,
      "name": "x",
      "is_shared": true,
      "updated_at": "x",
      "view_style": "x",
      "default_order": 1,
      "default_order_key": "x",
      "description": "x",
      "public_key": "x",
      "access": {
        "visibility": "restricted",
        "configuration": {}
      },
      "role": "x",
      "parent_id": "x",
      "inbox_project": true
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/projects/{project_id}/join",
    "action": "join",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "project": {
        "id": "x",
        "can_assign_tasks": true,
        "can_comment": true,
        "child_order": 1,
        "order_key": "x",
        "is_collapsed": true,
        "color": "x",
        "icon": "x",
        "creator_uid": "x",
        "created_at": "x",
        "is_archived": true,
        "is_deleted": true,
        "is_favorite": true,
        "is_frozen": true,
        "name": "x",
        "is_shared": true,
        "updated_at": "x",
        "view_style": "x",
        "default_order": 1,
        "default_order_key": "x",
        "description": "x",
        "public_key": "x",
        "access": {
          "visibility": "restricted",
          "configuration": {}
        },
        "role": "x",
        "parent_id": "x",
        "inbox_project": true
      },
      "tasks": [
        {
          "user_id": "x",
          "id": "x",
          "project_id": "x",
          "section_id": "x",
          "parent_id": "x",
          "added_by_uid": "x",
          "assigned_by_uid": "x",
          "responsible_uid": "x",
          "labels": [
            "x"
          ],
          "deadline": {},
          "duration": {},
          "is_collapsed": true,
          "checked": true,
          "is_deleted": true,
          "added_at": "x",
          "completed_at": "x",
          "completed_by_uid": "x",
          "updated_at": "x",
          "due": {},
          "priority": 1,
          "child_order": 1,
          "order_key": "x",
          "content": "x",
          "description": "x",
          "note_count": 1,
          "day_order": 1,
          "completed_count": 1,
          "postponed_count": 1
        }
      ],
      "sections": [
        {
          "id": "x",
          "user_id": "x",
          "project_id": "x",
          "added_at": "2026-01-01T00:00:00Z",
          "updated_at": "x",
          "archived_at": "x",
          "name": "x",
          "description": "x",
          "section_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "is_archived": true,
          "is_deleted": true
        }
      ],
      "comments": [
        {
          "id": "x",
          "posted_uid": "x",
          "content": "x",
          "file_attachment": {},
          "uids_to_notify": [
            "x"
          ],
          "is_deleted": true,
          "posted_at": "x",
          "reactions": {},
          "project_id": "x"
        }
      ],
      "collaborators": [
        {
          "id": "x",
          "full_name": "x",
          "email": "x",
          "timezone": "x",
          "image_id": "x",
          "status": {
            "message": "x",
            "emoji": "x",
            "active_until": "2026-01-01T00:00:00Z",
            "effects": {}
          },
          "is_deleted": true
        }
      ],
      "collaborator_states": [
        {}
      ],
      "folder": {
        "workspace_id": "x",
        "name": "x",
        "is_deleted": true,
        "id": "x",
        "default_order": 1,
        "default_order_key": "x",
        "child_order": 1
      },
      "subprojects": [
        {
          "id": "x",
          "can_assign_tasks": true,
          "can_comment": true,
          "child_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "color": "x",
          "icon": "x",
          "creator_uid": "x",
          "created_at": "x",
          "is_archived": true,
          "is_deleted": true,
          "is_favorite": true,
          "is_frozen": true,
          "name": "x",
          "is_shared": true,
          "updated_at": "x",
          "view_style": "x",
          "default_order": 1,
          "default_order_key": "x",
          "description": "x",
          "public_key": "x",
          "access": {
            "visibility": "restricted"
          },
          "role": "x",
          "parent_id": "x",
          "inbox_project": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/projects/{project_id}/unarchive",
    "action": "unarchive",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "can_assign_tasks": true,
      "can_comment": true,
      "child_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "color": "x",
      "icon": "x",
      "creator_uid": "x",
      "created_at": "x",
      "is_archived": true,
      "is_deleted": true,
      "is_favorite": true,
      "is_frozen": true,
      "name": "x",
      "is_shared": true,
      "updated_at": "x",
      "view_style": "x",
      "default_order": 1,
      "default_order_key": "x",
      "description": "x",
      "public_key": "x",
      "access": {
        "visibility": "restricted",
        "configuration": {}
      },
      "role": "x",
      "parent_id": "x",
      "inbox_project": true
    },
    "idField": "id"
  },
  {
    "entity": "project_import_create_response_with_object",
    "accessor": "ProjectImportCreateResponseWithObject",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/templates/create_project_from_file",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "project_view_options_defaults": [
        {
          "project_id": "x",
          "view_mode": "LIST",
          "calendar_settings": {
            "layout": "WEEK",
            "visible_day_count": 1,
            "color": "PRIORITY"
          }
        }
      ],
      "status": "x",
      "project_id": "x",
      "template_type": "x",
      "projects": [
        {
          "id": "x",
          "can_assign_tasks": true,
          "can_comment": true,
          "child_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "color": "x",
          "icon": "x",
          "creator_uid": "x",
          "created_at": "x",
          "is_archived": true,
          "is_deleted": true,
          "is_favorite": true,
          "is_frozen": true,
          "name": "x",
          "is_shared": true,
          "updated_at": "x",
          "view_style": "x",
          "default_order": 1,
          "default_order_key": "x",
          "description": "x",
          "public_key": "x",
          "access": {
            "visibility": "restricted"
          },
          "role": "x",
          "parent_id": "x",
          "inbox_project": true
        }
      ],
      "sections": [
        {
          "id": "x",
          "user_id": "x",
          "project_id": "x",
          "added_at": "2026-01-01T00:00:00Z",
          "updated_at": "x",
          "archived_at": "x",
          "name": "x",
          "description": "x",
          "section_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "is_archived": true,
          "is_deleted": true
        }
      ],
      "tasks": [
        {
          "user_id": "x",
          "id": "x",
          "project_id": "x",
          "section_id": "x",
          "parent_id": "x",
          "added_by_uid": "x",
          "assigned_by_uid": "x",
          "responsible_uid": "x",
          "labels": [
            "x"
          ],
          "deadline": {},
          "duration": {},
          "is_collapsed": true,
          "checked": true,
          "is_deleted": true,
          "added_at": "x",
          "completed_at": "x",
          "completed_by_uid": "x",
          "updated_at": "x",
          "due": {},
          "priority": 1,
          "child_order": 1,
          "order_key": "x",
          "content": "x",
          "description": "x",
          "note_count": 1,
          "day_order": 1,
          "completed_count": 1,
          "postponed_count": 1
        }
      ],
      "comments": [
        {
          "id": "x",
          "posted_uid": "x",
          "content": "x",
          "file_attachment": {},
          "uids_to_notify": [
            "x"
          ],
          "is_deleted": true,
          "posted_at": "x",
          "reactions": {},
          "item_id": "x"
        }
      ],
      "project_notes": [
        {
          "id": "x",
          "posted_uid": "x",
          "content": "x",
          "file_attachment": {},
          "uids_to_notify": [
            "x"
          ],
          "is_deleted": true,
          "posted_at": "x",
          "reactions": {},
          "project_id": "x"
        }
      ],
      "reminders": [
        {
          "id": "x",
          "item_id": "x",
          "notify_uid": "x",
          "is_deleted": true,
          "is_urgent": true,
          "type": "x",
          "minute_offset": 1,
          "due": {}
        }
      ],
      "discarded_fields": [
        {
          "field": "deadline",
          "reason": "personal_plan_limit"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "reminder",
    "accessor": "Reminder",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/reminders/{reminder_id}",
    "args": [
      {
        "name": "id",
        "wire": "reminder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "remove_workspace_user",
    "accessor": "RemoveWorkspaceUser",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/workspaces/{workspace_id}/users/{user_id}",
    "args": [
      {
        "name": "id",
        "wire": "user_id",
        "value": "p1"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "role_to_action_mapping_view",
    "accessor": "RoleToActionMappingView",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/projects/permissions",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "project_collaborator_actions": [
        {
          "name": "CREATOR",
          "actions": [
            {
              "name": "x"
            }
          ]
        }
      ],
      "workspace_collaborator_actions": [
        {
          "name": "CREATOR",
          "actions": [
            {
              "name": "x"
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/sections",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "user_id": "x",
      "project_id": "x",
      "added_at": "2026-01-01T00:00:00Z",
      "updated_at": "x",
      "archived_at": "x",
      "name": "x",
      "description": "x",
      "section_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "is_archived": true,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/sections/search",
    "action": "search",
    "args": [],
    "select": {
      "query": "v1",
      "cursor": "v1",
      "limit": 50,
      "project_id": "v1",
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "query",
      "project_id",
      "workspace_id",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "query",
        "wire": "query"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "user_id": "x",
          "project_id": "x",
          "added_at": "2026-01-01T00:00:00Z",
          "updated_at": "x",
          "archived_at": "x",
          "name": "x",
          "description": "x",
          "section_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "is_archived": true,
          "is_deleted": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/sections",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "project_id": "v1",
      "public_key": "v1",
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "project_id",
      "workspace_id",
      "cursor",
      "limit",
      "public_key"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "public_key",
        "wire": "public_key"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "user_id": "x",
          "project_id": "x",
          "added_at": "2026-01-01T00:00:00Z",
          "updated_at": "x",
          "archived_at": "x",
          "name": "x",
          "description": "x",
          "section_order": 1,
          "order_key": "x",
          "is_collapsed": true,
          "is_archived": true,
          "is_deleted": true
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/sections/{section_id}",
    "args": [
      {
        "name": "id",
        "wire": "section_id",
        "value": "p1"
      }
    ],
    "select": {
      "public_key": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "public_key"
    ],
    "queryArgs": [
      {
        "name": "public_key",
        "wire": "public_key"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "user_id": "x",
      "project_id": "x",
      "added_at": "2026-01-01T00:00:00Z",
      "updated_at": "x",
      "archived_at": "x",
      "name": "x",
      "description": "x",
      "section_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "is_archived": true,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/sections/{section_id}",
    "args": [
      {
        "name": "id",
        "wire": "section_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/sections/{section_id}",
    "args": [
      {
        "name": "id",
        "wire": "section_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "user_id": "x",
      "project_id": "x",
      "added_at": "2026-01-01T00:00:00Z",
      "updated_at": "x",
      "archived_at": "x",
      "name": "x",
      "description": "x",
      "section_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "is_archived": true,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/sections/{section_id}/archive",
    "action": "archive",
    "args": [
      {
        "name": "id",
        "wire": "section_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "user_id": "x",
      "project_id": "x",
      "added_at": "2026-01-01T00:00:00Z",
      "updated_at": "x",
      "archived_at": "x",
      "name": "x",
      "description": "x",
      "section_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "is_archived": true,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "section",
    "accessor": "Section",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/sections/{section_id}/unarchive",
    "action": "unarchive",
    "args": [
      {
        "name": "id",
        "wire": "section_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "user_id": "x",
      "project_id": "x",
      "added_at": "2026-01-01T00:00:00Z",
      "updated_at": "x",
      "archived_at": "x",
      "name": "x",
      "description": "x",
      "section_order": 1,
      "order_key": "x",
      "is_collapsed": true,
      "is_archived": true,
      "is_deleted": true
    },
    "idField": "id"
  },
  {
    "entity": "shared_label",
    "accessor": "SharedLabel",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/labels/shared",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "omit_personal": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "omit_personal",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "omit_personal",
        "wire": "omit_personal"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        "x"
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "shared_label",
    "accessor": "SharedLabel",
    "op": "remove",
    "method": "POST",
    "path": "/api/v1/labels/shared/remove",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "shared_label",
    "accessor": "SharedLabel",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/labels/shared/rename",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "status_ok",
    "accessor": "StatusOk",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/emails",
    "args": [],
    "select": {
      "obj_id": "v1",
      "obj_type": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "obj_type",
      "obj_id"
    ],
    "queryArgs": [
      {
        "name": "obj_id",
        "wire": "obj_id"
      },
      {
        "name": "obj_type",
        "wire": "obj_type"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/tasks",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "user_id": "x",
      "id": "x",
      "project_id": "x",
      "section_id": "x",
      "parent_id": "x",
      "added_by_uid": "x",
      "assigned_by_uid": "x",
      "responsible_uid": "x",
      "labels": [
        "x"
      ],
      "deadline": {},
      "duration": {},
      "is_collapsed": true,
      "checked": true,
      "is_deleted": true,
      "added_at": "x",
      "completed_at": "x",
      "completed_by_uid": "x",
      "updated_at": "x",
      "due": {},
      "priority": 1,
      "child_order": 1,
      "order_key": "x",
      "content": "x",
      "description": "x",
      "note_count": 1,
      "day_order": 1,
      "completed_count": 1,
      "postponed_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/tasks/quick",
    "action": "quick",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/tasks/filter",
    "action": "filter",
    "args": [],
    "select": {
      "query": "v1",
      "cursor": "v1",
      "lang": "v1",
      "limit": 50
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "query",
      "lang",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "query",
        "wire": "query"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "user_id": "x",
          "id": "x",
          "project_id": "x",
          "section_id": "x",
          "parent_id": "x",
          "added_by_uid": "x",
          "assigned_by_uid": "x",
          "responsible_uid": "x",
          "labels": [
            "x"
          ],
          "deadline": {},
          "duration": {},
          "is_collapsed": true,
          "checked": true,
          "is_deleted": true,
          "added_at": "x",
          "completed_at": "x",
          "completed_by_uid": "x",
          "updated_at": "x",
          "due": {},
          "priority": 1,
          "child_order": 1,
          "order_key": "x",
          "content": "x",
          "description": "x",
          "note_count": 1,
          "day_order": 1,
          "completed_count": 1,
          "postponed_count": 1
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/tasks",
    "args": [],
    "select": {
      "cursor": "v1",
      "ids": "v1",
      "label": "v1",
      "limit": 50,
      "parent_id": "v1",
      "project_id": "v1",
      "section_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "project_id",
      "section_id",
      "parent_id",
      "label",
      "ids",
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "ids",
        "wire": "ids"
      },
      {
        "name": "label",
        "wire": "label"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "parent_id",
        "wire": "parent_id"
      },
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "section_id",
        "wire": "section_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "user_id": "x",
          "id": "x",
          "project_id": "x",
          "section_id": "x",
          "parent_id": "x",
          "added_by_uid": "x",
          "assigned_by_uid": "x",
          "responsible_uid": "x",
          "labels": [
            "x"
          ],
          "deadline": {},
          "duration": {},
          "is_collapsed": true,
          "checked": true,
          "is_deleted": true,
          "added_at": "x",
          "completed_at": "x",
          "completed_by_uid": "x",
          "updated_at": "x",
          "due": {},
          "priority": 1,
          "child_order": 1,
          "order_key": "x",
          "content": "x",
          "description": "x",
          "note_count": 1,
          "day_order": 1,
          "completed_count": 1,
          "postponed_count": 1
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/tasks/{task_id}",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {
      "public_key": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "public_key"
    ],
    "queryArgs": [
      {
        "name": "public_key",
        "wire": "public_key"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user_id": "x",
      "id": "x",
      "project_id": "x",
      "section_id": "x",
      "parent_id": "x",
      "added_by_uid": "x",
      "assigned_by_uid": "x",
      "responsible_uid": "x",
      "labels": [
        "x"
      ],
      "deadline": {},
      "duration": {},
      "is_collapsed": true,
      "checked": true,
      "is_deleted": true,
      "added_at": "x",
      "completed_at": "x",
      "completed_by_uid": "x",
      "updated_at": "x",
      "due": {},
      "priority": 1,
      "child_order": 1,
      "order_key": "x",
      "content": "x",
      "description": "x",
      "note_count": 1,
      "day_order": 1,
      "completed_count": 1,
      "postponed_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/tasks/{task_id}",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/tasks/{task_id}",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "user_id": "x",
      "id": "x",
      "project_id": "x",
      "section_id": "x",
      "parent_id": "x",
      "added_by_uid": "x",
      "assigned_by_uid": "x",
      "responsible_uid": "x",
      "labels": [
        "x"
      ],
      "deadline": {},
      "duration": {},
      "is_collapsed": true,
      "checked": true,
      "is_deleted": true,
      "added_at": "x",
      "completed_at": "x",
      "completed_by_uid": "x",
      "updated_at": "x",
      "due": {},
      "priority": 1,
      "child_order": 1,
      "order_key": "x",
      "content": "x",
      "description": "x",
      "note_count": 1,
      "day_order": 1,
      "completed_count": 1,
      "postponed_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/tasks/{task_id}/close",
    "action": "close",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/tasks/{task_id}/move",
    "action": "move",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "user_id": "x",
      "id": "x",
      "project_id": "x",
      "section_id": "x",
      "parent_id": "x",
      "added_by_uid": "x",
      "assigned_by_uid": "x",
      "responsible_uid": "x",
      "labels": [
        "x"
      ],
      "deadline": {},
      "duration": {},
      "is_collapsed": true,
      "checked": true,
      "is_deleted": true,
      "added_at": "x",
      "completed_at": "x",
      "completed_by_uid": "x",
      "updated_at": "x",
      "due": {},
      "priority": 1,
      "child_order": 1,
      "order_key": "x",
      "content": "x",
      "description": "x",
      "note_count": 1,
      "day_order": 1,
      "completed_count": 1,
      "postponed_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "update",
    "method": "POST",
    "path": "/api/v1/tasks/{task_id}/reopen",
    "action": "reopen",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "template",
    "accessor": "Template",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/templates/file",
    "action": "file",
    "args": [],
    "select": {
      "project_id": "v1",
      "use_relative_date": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "text/plain"
    ],
    "query": [
      "project_id",
      "use_relative_dates"
    ],
    "queryArgs": [
      {
        "name": "project_id",
        "wire": "project_id"
      },
      {
        "name": "use_relative_date",
        "wire": "use_relative_dates"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "top_up",
    "accessor": "TopUp",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/usage_billing/top_up",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "session_id": "x",
      "checkout_url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "upload",
    "accessor": "Upload",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/uploads",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "file_url": "x",
      "file_name": "x",
      "file_size": 1,
      "file_type": "x",
      "resource_type": "x",
      "image": "x",
      "image_width": 1,
      "image_height": 1,
      "upload_state": "pending"
    },
    "idField": "id"
  },
  {
    "entity": "upload",
    "accessor": "Upload",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/uploads",
    "args": [],
    "select": {
      "file_url": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "file_url"
    ],
    "queryArgs": [
      {
        "name": "file_url",
        "wire": "file_url"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": "x",
    "idField": "id"
  },
  {
    "entity": "usage_summary",
    "accessor": "UsageSummary",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/usage_billing/usage_summary",
    "args": [],
    "select": {
      "category": "v1",
      "group_by": "v1",
      "product": "automations",
      "since": "v1",
      "until": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "product",
      "category",
      "since",
      "until",
      "group_by"
    ],
    "queryArgs": [
      {
        "name": "category",
        "wire": "category"
      },
      {
        "name": "group_by",
        "wire": "group_by"
      },
      {
        "name": "product",
        "wire": "product"
      },
      {
        "name": "since",
        "wire": "since"
      },
      {
        "name": "until",
        "wire": "until"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "currency": "x",
      "usage_count": 1,
      "charged_units": 1,
      "charged_amount": 1,
      "groups": [
        {
          "automation_id": "x",
          "description": "x",
          "usage_count": 1,
          "charged_units": 1,
          "charged_amount": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/user",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "email": "x",
      "full_name": "x",
      "has_password": true,
      "verification_status": "unverified",
      "mfa_enabled": true,
      "token": "x",
      "is_premium": true,
      "premium_status": "not_premium",
      "premium_until": "x",
      "free_trial_expires": "x",
      "has_started_a_trial": true,
      "joined_at": "x",
      "is_deleted": true,
      "deleted_at": "x",
      "business_account_id": 1,
      "date_format": 0,
      "time_format": 0,
      "sort_order": 0,
      "theme_id": "x",
      "theme_appearance": "light",
      "start_day": 1,
      "weekend_start_day": 1,
      "next_week": 1,
      "auto_reminder": 1,
      "urgent_reminder_device": {
        "device_platform": "ios",
        "device_id": "x",
        "device_token": "x",
        "device_name": "x"
      },
      "status": {
        "message": "x",
        "emoji": "x",
        "active_until": "2026-01-01T00:00:00Z",
        "effects": {
          "pause_notifications": {
            "scope": {}
          },
          "pause_activity": {
            "scope": {}
          }
        }
      },
      "start_page": "x",
      "inbox_project_id": "x",
      "lang": "cs",
      "tz_info": {},
      "karma": 1,
      "karma_trend": "up",
      "daily_goal": 1,
      "weekly_goal": 1,
      "days_off": [
        1
      ],
      "is_celebrations_enabled": true,
      "completed_count": 1,
      "completed_today": 1,
      "share_limit": 1,
      "features": {},
      "feature_identifier": "x",
      "joinable_workspace": {},
      "onboarding_completed": true,
      "onboarding_initiated": true,
      "onboarding_started": true,
      "onboarding_level": "beginner",
      "onboarding_persona": "analog",
      "onboarding_role": "leader",
      "onboarding_team_mode": "x",
      "onboarding_use_cases": [
        "personal"
      ],
      "getting_started_guide_projects": [
        "x"
      ],
      "onboarded_dated_tasks_created": true,
      "onboarded_tasks_completed": true,
      "onboarded_mobile_accessed": true,
      "onboarded_desktop_accessed": true,
      "is_onboarded": true,
      "activated_user": true,
      "has_magic_number": true,
      "image_id": "x",
      "avatar_big": "x",
      "avatar_medium": "x",
      "avatar_s640": "x",
      "avatar_small": "x",
      "websocket_url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/notification_setting",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/workspaces/{workspace_id}",
    "args": [
      {
        "name": "id",
        "wire": "workspace_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/workspaces",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/workspaces/logo",
    "action": "logo",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "creator_id": "x",
      "created_at": "x",
      "is_deleted": true,
      "is_collapsed": true,
      "role": "ADMIN",
      "plan": "STARTER",
      "pending_invitations": [
        "x"
      ],
      "is_link_sharing_enabled": true,
      "is_guest_allowed": true,
      "is_trial_pending": true,
      "invite_code": "x",
      "limits": {
        "current": {
          "plan_name": "x",
          "max_projects": 1,
          "max_collaborators": 1,
          "upload_limit_mb": 1,
          "automatic_backups": true,
          "reminders": true,
          "reminders_at_due": true,
          "max_guests_per_workspace": 1,
          "max_folders_per_workspace": 1,
          "advanced_permissions": true,
          "durations": true,
          "calendar_layout": true,
          "email_forwarding": true,
          "email_ai_forwarding": true,
          "project_icons": true,
          "max_live_notifications": 1,
          "max_monthly_capture": 1,
          "max_monthly_ramble": 1,
          "admin_tools": true,
          "security_controls": true,
          "max_filters": 1,
          "max_workspace_users": 1,
          "max_workspaces": 1,
          "max_workspace_templates": 1,
          "project_insights": true
        },
        "next": {
          "plan_name": "x",
          "max_projects": 1,
          "max_collaborators": 1,
          "upload_limit_mb": 1,
          "automatic_backups": true,
          "reminders": true,
          "reminders_at_due": true,
          "max_guests_per_workspace": 1,
          "max_folders_per_workspace": 1,
          "advanced_permissions": true,
          "durations": true,
          "calendar_layout": true,
          "email_forwarding": true,
          "email_ai_forwarding": true,
          "project_icons": true,
          "max_live_notifications": 1,
          "max_monthly_capture": 1,
          "max_monthly_ramble": 1,
          "admin_tools": true,
          "security_controls": true,
          "max_filters": 1,
          "max_workspace_users": 1,
          "max_workspaces": 1,
          "max_workspace_templates": 1,
          "project_insights": true
        }
      },
      "current_member_count": 1,
      "current_active_projects": 1,
      "domain_name": "x",
      "domain_discovery": true,
      "restrict_email_domains": true,
      "admin_sorting_applied": true,
      "user_sorting_applied": true,
      "project_sort_preference": "MANUAL",
      "default_collaborators": {
        "user_ids": [
          1
        ],
        "predefined_group_ids": [
          "x"
        ]
      },
      "properties": {},
      "logo_s640": "x",
      "logo_big": "x",
      "logo_medium": "x",
      "logo_small": "x",
      "current_template_count": 1,
      "pending_invites_by_type": {},
      "member_count_by_type": {}
    },
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/workspaces/invitations",
    "action": "invitation",
    "args": [],
    "select": {
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspace_id"
    ],
    "queryArgs": [
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      "x"
    ],
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/workspaces",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {}
    ],
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/workspaces/{workspace_id}",
    "args": [
      {
        "name": "id",
        "wire": "workspace_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/workspaces/{workspace_id}",
    "args": [
      {
        "name": "id",
        "wire": "workspace_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "workspace_invitation_view",
    "accessor": "WorkspaceInvitationView",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/workspaces/invitations/delete",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "inviter_id": "x",
      "user_email": "x",
      "workspace_id": "x",
      "role": "ADMIN",
      "id": "x",
      "app": "todoist"
    },
    "idField": "id"
  },
  {
    "entity": "workspace_invitation_view",
    "accessor": "WorkspaceInvitationView",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/workspaces/invitations/all",
    "args": [],
    "select": {
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspace_id"
    ],
    "queryArgs": [
      {
        "name": "workspace_id",
        "wire": "workspace_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "inviter_id": "x",
        "user_email": "x",
        "workspace_id": "x",
        "role": "ADMIN",
        "id": "x",
        "app": "todoist"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "workspace_user_view",
    "accessor": "WorkspaceUserView",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/workspaces/{workspace_id}/users/{user_id}",
    "args": [
      {
        "name": "user_id",
        "wire": "user_id",
        "value": "p1"
      },
      {
        "name": "workspace_id",
        "wire": "workspace_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "user_id": "x",
      "workspace_id": "x",
      "role": "ADMIN",
      "custom_sorting_applied": true,
      "project_sort_preference": "MANUAL"
    },
    "idField": "id"
  },
  {
    "entity": "workspace_user_view",
    "accessor": "WorkspaceUserView",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/workspaces/join",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "user_id": "x",
      "workspace_id": "x",
      "role": "ADMIN",
      "custom_sorting_applied": true,
      "project_sort_preference": "MANUAL"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
