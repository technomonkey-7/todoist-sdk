# Todoist SDK

from todoist_sdk.utility.voxgig_struct import voxgig_struct as vs
from todoist_sdk.core.utility_type import TodoistUtility
from todoist_sdk.core.spec import TodoistSpec
from todoist_sdk.core import helpers
from todoist_sdk.utility.prepare_method import allowed
from todoist_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from todoist_sdk.utility import register

# Load features
from todoist_sdk.feature.base_feature import TodoistBaseFeature
from todoist_sdk.features import _has_feature, _make_feature


class TodoistSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = TodoistUtility()
        self._utility = utility

        from todoist_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "TodoistSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return TodoistUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = TodoistSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "TodoistSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("TodoistSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Active(self, data=None) -> "ActiveEntity":
        """Entity factory: client.Active().list() / client.Active().load({"id": ...})."""
        from todoist_sdk.entity.active_entity import ActiveEntity
        return ActiveEntity(self, data)


    def Activity(self, data=None) -> "ActivityEntity":
        """Entity factory: client.Activity().list() / client.Activity().load({"id": ...})."""
        from todoist_sdk.entity.activity_entity import ActivityEntity
        return ActivityEntity(self, data)


    def AnyProjectSyncView(self, data=None) -> "AnyProjectSyncViewEntity":
        """Entity factory: client.AnyProjectSyncView().list() / client.AnyProjectSyncView().load({"id": ...})."""
        from todoist_sdk.entity.any_project_sync_view_entity import AnyProjectSyncViewEntity
        return AnyProjectSyncViewEntity(self, data)


    def Archived(self, data=None) -> "ArchivedEntity":
        """Entity factory: client.Archived().list() / client.Archived().load({"id": ...})."""
        from todoist_sdk.entity.archived_entity import ArchivedEntity
        return ArchivedEntity(self, data)


    def Authorization(self, data=None) -> "AuthorizationEntity":
        """Entity factory: client.Authorization().list() / client.Authorization().load({"id": ...})."""
        from todoist_sdk.entity.authorization_entity import AuthorizationEntity
        return AuthorizationEntity(self, data)


    def Backup(self, data=None) -> "BackupEntity":
        """Entity factory: client.Backup().list() / client.Backup().load({"id": ...})."""
        from todoist_sdk.entity.backup_entity import BackupEntity
        return BackupEntity(self, data)


    def BillingPortalUrl(self, data=None) -> "BillingPortalUrlEntity":
        """Entity factory: client.BillingPortalUrl().list() / client.BillingPortalUrl().load({"id": ...})."""
        from todoist_sdk.entity.billing_portal_url_entity import BillingPortalUrlEntity
        return BillingPortalUrlEntity(self, data)


    def ByCompletionDate(self, data=None) -> "ByCompletionDateEntity":
        """Entity factory: client.ByCompletionDate().list() / client.ByCompletionDate().load({"id": ...})."""
        from todoist_sdk.entity.by_completion_date_entity import ByCompletionDateEntity
        return ByCompletionDateEntity(self, data)


    def ByDueDate(self, data=None) -> "ByDueDateEntity":
        """Entity factory: client.ByDueDate().list() / client.ByDueDate().load({"id": ...})."""
        from todoist_sdk.entity.by_due_date_entity import ByDueDateEntity
        return ByDueDateEntity(self, data)


    def Collaborator(self, data=None) -> "CollaboratorEntity":
        """Entity factory: client.Collaborator().list() / client.Collaborator().load({"id": ...})."""
        from todoist_sdk.entity.collaborator_entity import CollaboratorEntity
        return CollaboratorEntity(self, data)


    def Comment(self, data=None) -> "CommentEntity":
        """Entity factory: client.Comment().list() / client.Comment().load({"id": ...})."""
        from todoist_sdk.entity.comment_entity import CommentEntity
        return CommentEntity(self, data)


    def CreditState(self, data=None) -> "CreditStateEntity":
        """Entity factory: client.CreditState().list() / client.CreditState().load({"id": ...})."""
        from todoist_sdk.entity.credit_state_entity import CreditStateEntity
        return CreditStateEntity(self, data)


    def Email(self, data=None) -> "EmailEntity":
        """Entity factory: client.Email().list() / client.Email().load({"id": ...})."""
        from todoist_sdk.entity.email_entity import EmailEntity
        return EmailEntity(self, data)


    def FileUrl(self, data=None) -> "FileUrlEntity":
        """Entity factory: client.FileUrl().list() / client.FileUrl().load({"id": ...})."""
        from todoist_sdk.entity.file_url_entity import FileUrlEntity
        return FileUrlEntity(self, data)


    def Folder(self, data=None) -> "FolderEntity":
        """Entity factory: client.Folder().list() / client.Folder().load({"id": ...})."""
        from todoist_sdk.entity.folder_entity import FolderEntity
        return FolderEntity(self, data)


    def History(self, data=None) -> "HistoryEntity":
        """Entity factory: client.History().list() / client.History().load({"id": ...})."""
        from todoist_sdk.entity.history_entity import HistoryEntity
        return HistoryEntity(self, data)


    def IdMapping(self, data=None) -> "IdMappingEntity":
        """Entity factory: client.IdMapping().list() / client.IdMapping().load({"id": ...})."""
        from todoist_sdk.entity.id_mapping_entity import IdMappingEntity
        return IdMappingEntity(self, data)


    def Invite(self, data=None) -> "InviteEntity":
        """Entity factory: client.Invite().list() / client.Invite().load({"id": ...})."""
        from todoist_sdk.entity.invite_entity import InviteEntity
        return InviteEntity(self, data)


    def ItemSyncView(self, data=None) -> "ItemSyncViewEntity":
        """Entity factory: client.ItemSyncView().list() / client.ItemSyncView().load({"id": ...})."""
        from todoist_sdk.entity.item_sync_view_entity import ItemSyncViewEntity
        return ItemSyncViewEntity(self, data)


    def Label(self, data=None) -> "LabelEntity":
        """Entity factory: client.Label().list() / client.Label().load({"id": ...})."""
        from todoist_sdk.entity.label_entity import LabelEntity
        return LabelEntity(self, data)


    def LabelRestView(self, data=None) -> "LabelRestViewEntity":
        """Entity factory: client.LabelRestView().list() / client.LabelRestView().load({"id": ...})."""
        from todoist_sdk.entity.label_rest_view_entity import LabelRestViewEntity
        return LabelRestViewEntity(self, data)


    def LocationReminder(self, data=None) -> "LocationReminderEntity":
        """Entity factory: client.LocationReminder().list() / client.LocationReminder().load({"id": ...})."""
        from todoist_sdk.entity.location_reminder_entity import LocationReminderEntity
        return LocationReminderEntity(self, data)


    def MemberView(self, data=None) -> "MemberViewEntity":
        """Entity factory: client.MemberView().list() / client.MemberView().load({"id": ...})."""
        from todoist_sdk.entity.member_view_entity import MemberViewEntity
        return MemberViewEntity(self, data)


    def MigratePersonalToken(self, data=None) -> "MigratePersonalTokenEntity":
        """Entity factory: client.MigratePersonalToken().list() / client.MigratePersonalToken().load({"id": ...})."""
        from todoist_sdk.entity.migrate_personal_token_entity import MigratePersonalTokenEntity
        return MigratePersonalTokenEntity(self, data)


    def NoteSyncView(self, data=None) -> "NoteSyncViewEntity":
        """Entity factory: client.NoteSyncView().list() / client.NoteSyncView().load({"id": ...})."""
        from todoist_sdk.entity.note_sync_view_entity import NoteSyncViewEntity
        return NoteSyncViewEntity(self, data)


    def NotificationLocationSyncView(self, data=None) -> "NotificationLocationSyncViewEntity":
        """Entity factory: client.NotificationLocationSyncView().list() / client.NotificationLocationSyncView().load({"id": ...})."""
        from todoist_sdk.entity.notification_location_sync_view_entity import NotificationLocationSyncViewEntity
        return NotificationLocationSyncViewEntity(self, data)


    def NotificationSyncView(self, data=None) -> "NotificationSyncViewEntity":
        """Entity factory: client.NotificationSyncView().list() / client.NotificationSyncView().load({"id": ...})."""
        from todoist_sdk.entity.notification_sync_view_entity import NotificationSyncViewEntity
        return NotificationSyncViewEntity(self, data)


    def PaginatedListAnyProjectSyncView(self, data=None) -> "PaginatedListAnyProjectSyncViewEntity":
        """Entity factory: client.PaginatedListAnyProjectSyncView().list() / client.PaginatedListAnyProjectSyncView().load({"id": ...})."""
        from todoist_sdk.entity.paginated_list_any_project_sync_view_entity import PaginatedListAnyProjectSyncViewEntity
        return PaginatedListAnyProjectSyncViewEntity(self, data)


    def PaginatedListItemSyncView(self, data=None) -> "PaginatedListItemSyncViewEntity":
        """Entity factory: client.PaginatedListItemSyncView().list() / client.PaginatedListItemSyncView().load({"id": ...})."""
        from todoist_sdk.entity.paginated_list_item_sync_view_entity import PaginatedListItemSyncViewEntity
        return PaginatedListItemSyncViewEntity(self, data)


    def PaginatedListStr(self, data=None) -> "PaginatedListStrEntity":
        """Entity factory: client.PaginatedListStr().list() / client.PaginatedListStr().load({"id": ...})."""
        from todoist_sdk.entity.paginated_list_str_entity import PaginatedListStrEntity
        return PaginatedListStrEntity(self, data)


    def PlanDetail(self, data=None) -> "PlanDetailEntity":
        """Entity factory: client.PlanDetail().list() / client.PlanDetail().load({"id": ...})."""
        from todoist_sdk.entity.plan_detail_entity import PlanDetailEntity
        return PlanDetailEntity(self, data)


    def ProductivityStat(self, data=None) -> "ProductivityStatEntity":
        """Entity factory: client.ProductivityStat().list() / client.ProductivityStat().load({"id": ...})."""
        from todoist_sdk.entity.productivity_stat_entity import ProductivityStatEntity
        return ProductivityStatEntity(self, data)


    def Project(self, data=None) -> "ProjectEntity":
        """Entity factory: client.Project().list() / client.Project().load({"id": ...})."""
        from todoist_sdk.entity.project_entity import ProjectEntity
        return ProjectEntity(self, data)


    def ProjectImport(self, data=None) -> "ProjectImportEntity":
        """Entity factory: client.ProjectImport().list() / client.ProjectImport().load({"id": ...})."""
        from todoist_sdk.entity.project_import_entity import ProjectImportEntity
        return ProjectImportEntity(self, data)


    def ProjectImportCreateResponseWithObject(self, data=None) -> "ProjectImportCreateResponseWithObjectEntity":
        """Entity factory: client.ProjectImportCreateResponseWithObject().list() / client.ProjectImportCreateResponseWithObject().load({"id": ...})."""
        from todoist_sdk.entity.project_import_create_response_with_object_entity import ProjectImportCreateResponseWithObjectEntity
        return ProjectImportCreateResponseWithObjectEntity(self, data)


    def Reminder(self, data=None) -> "ReminderEntity":
        """Entity factory: client.Reminder().list() / client.Reminder().load({"id": ...})."""
        from todoist_sdk.entity.reminder_entity import ReminderEntity
        return ReminderEntity(self, data)


    def RemoveWorkspaceUser(self, data=None) -> "RemoveWorkspaceUserEntity":
        """Entity factory: client.RemoveWorkspaceUser().list() / client.RemoveWorkspaceUser().load({"id": ...})."""
        from todoist_sdk.entity.remove_workspace_user_entity import RemoveWorkspaceUserEntity
        return RemoveWorkspaceUserEntity(self, data)


    def RoleToActionMappingView(self, data=None) -> "RoleToActionMappingViewEntity":
        """Entity factory: client.RoleToActionMappingView().list() / client.RoleToActionMappingView().load({"id": ...})."""
        from todoist_sdk.entity.role_to_action_mapping_view_entity import RoleToActionMappingViewEntity
        return RoleToActionMappingViewEntity(self, data)


    def Section(self, data=None) -> "SectionEntity":
        """Entity factory: client.Section().list() / client.Section().load({"id": ...})."""
        from todoist_sdk.entity.section_entity import SectionEntity
        return SectionEntity(self, data)


    def SectionSyncView(self, data=None) -> "SectionSyncViewEntity":
        """Entity factory: client.SectionSyncView().list() / client.SectionSyncView().load({"id": ...})."""
        from todoist_sdk.entity.section_sync_view_entity import SectionSyncViewEntity
        return SectionSyncViewEntity(self, data)


    def StatusOk(self, data=None) -> "StatusOkEntity":
        """Entity factory: client.StatusOk().list() / client.StatusOk().load({"id": ...})."""
        from todoist_sdk.entity.status_ok_entity import StatusOkEntity
        return StatusOkEntity(self, data)


    def SubscriptionInfo(self, data=None) -> "SubscriptionInfoEntity":
        """Entity factory: client.SubscriptionInfo().list() / client.SubscriptionInfo().load({"id": ...})."""
        from todoist_sdk.entity.subscription_info_entity import SubscriptionInfoEntity
        return SubscriptionInfoEntity(self, data)


    def Task(self, data=None) -> "TaskEntity":
        """Entity factory: client.Task().list() / client.Task().load({"id": ...})."""
        from todoist_sdk.entity.task_entity import TaskEntity
        return TaskEntity(self, data)


    def Template(self, data=None) -> "TemplateEntity":
        """Entity factory: client.Template().list() / client.Template().load({"id": ...})."""
        from todoist_sdk.entity.template_entity import TemplateEntity
        return TemplateEntity(self, data)


    def TopUp(self, data=None) -> "TopUpEntity":
        """Entity factory: client.TopUp().list() / client.TopUp().load({"id": ...})."""
        from todoist_sdk.entity.top_up_entity import TopUpEntity
        return TopUpEntity(self, data)


    def Upload(self, data=None) -> "UploadEntity":
        """Entity factory: client.Upload().list() / client.Upload().load({"id": ...})."""
        from todoist_sdk.entity.upload_entity import UploadEntity
        return UploadEntity(self, data)


    def UsageSummary(self, data=None) -> "UsageSummaryEntity":
        """Entity factory: client.UsageSummary().list() / client.UsageSummary().load({"id": ...})."""
        from todoist_sdk.entity.usage_summary_entity import UsageSummaryEntity
        return UsageSummaryEntity(self, data)


    def User(self, data=None) -> "UserEntity":
        """Entity factory: client.User().list() / client.User().load({"id": ...})."""
        from todoist_sdk.entity.user_entity import UserEntity
        return UserEntity(self, data)


    def Workspace(self, data=None) -> "WorkspaceEntity":
        """Entity factory: client.Workspace().list() / client.Workspace().load({"id": ...})."""
        from todoist_sdk.entity.workspace_entity import WorkspaceEntity
        return WorkspaceEntity(self, data)


    def WorkspaceInvitationView(self, data=None) -> "WorkspaceInvitationViewEntity":
        """Entity factory: client.WorkspaceInvitationView().list() / client.WorkspaceInvitationView().load({"id": ...})."""
        from todoist_sdk.entity.workspace_invitation_view_entity import WorkspaceInvitationViewEntity
        return WorkspaceInvitationViewEntity(self, data)


    def WorkspaceUserView(self, data=None) -> "WorkspaceUserViewEntity":
        """Entity factory: client.WorkspaceUserView().list() / client.WorkspaceUserView().load({"id": ...})."""
        from todoist_sdk.entity.workspace_user_view_entity import WorkspaceUserViewEntity
        return WorkspaceUserViewEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "TodoistSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from todoist_sdk.entity.active_entity import ActiveEntity
    from todoist_sdk.entity.activity_entity import ActivityEntity
    from todoist_sdk.entity.any_project_sync_view_entity import AnyProjectSyncViewEntity
    from todoist_sdk.entity.archived_entity import ArchivedEntity
    from todoist_sdk.entity.authorization_entity import AuthorizationEntity
    from todoist_sdk.entity.backup_entity import BackupEntity
    from todoist_sdk.entity.billing_portal_url_entity import BillingPortalUrlEntity
    from todoist_sdk.entity.by_completion_date_entity import ByCompletionDateEntity
    from todoist_sdk.entity.by_due_date_entity import ByDueDateEntity
    from todoist_sdk.entity.collaborator_entity import CollaboratorEntity
    from todoist_sdk.entity.comment_entity import CommentEntity
    from todoist_sdk.entity.credit_state_entity import CreditStateEntity
    from todoist_sdk.entity.email_entity import EmailEntity
    from todoist_sdk.entity.file_url_entity import FileUrlEntity
    from todoist_sdk.entity.folder_entity import FolderEntity
    from todoist_sdk.entity.history_entity import HistoryEntity
    from todoist_sdk.entity.id_mapping_entity import IdMappingEntity
    from todoist_sdk.entity.invite_entity import InviteEntity
    from todoist_sdk.entity.item_sync_view_entity import ItemSyncViewEntity
    from todoist_sdk.entity.label_entity import LabelEntity
    from todoist_sdk.entity.label_rest_view_entity import LabelRestViewEntity
    from todoist_sdk.entity.location_reminder_entity import LocationReminderEntity
    from todoist_sdk.entity.member_view_entity import MemberViewEntity
    from todoist_sdk.entity.migrate_personal_token_entity import MigratePersonalTokenEntity
    from todoist_sdk.entity.note_sync_view_entity import NoteSyncViewEntity
    from todoist_sdk.entity.notification_location_sync_view_entity import NotificationLocationSyncViewEntity
    from todoist_sdk.entity.notification_sync_view_entity import NotificationSyncViewEntity
    from todoist_sdk.entity.paginated_list_any_project_sync_view_entity import PaginatedListAnyProjectSyncViewEntity
    from todoist_sdk.entity.paginated_list_item_sync_view_entity import PaginatedListItemSyncViewEntity
    from todoist_sdk.entity.paginated_list_str_entity import PaginatedListStrEntity
    from todoist_sdk.entity.plan_detail_entity import PlanDetailEntity
    from todoist_sdk.entity.productivity_stat_entity import ProductivityStatEntity
    from todoist_sdk.entity.project_entity import ProjectEntity
    from todoist_sdk.entity.project_import_entity import ProjectImportEntity
    from todoist_sdk.entity.project_import_create_response_with_object_entity import ProjectImportCreateResponseWithObjectEntity
    from todoist_sdk.entity.reminder_entity import ReminderEntity
    from todoist_sdk.entity.remove_workspace_user_entity import RemoveWorkspaceUserEntity
    from todoist_sdk.entity.role_to_action_mapping_view_entity import RoleToActionMappingViewEntity
    from todoist_sdk.entity.section_entity import SectionEntity
    from todoist_sdk.entity.section_sync_view_entity import SectionSyncViewEntity
    from todoist_sdk.entity.status_ok_entity import StatusOkEntity
    from todoist_sdk.entity.subscription_info_entity import SubscriptionInfoEntity
    from todoist_sdk.entity.task_entity import TaskEntity
    from todoist_sdk.entity.template_entity import TemplateEntity
    from todoist_sdk.entity.top_up_entity import TopUpEntity
    from todoist_sdk.entity.upload_entity import UploadEntity
    from todoist_sdk.entity.usage_summary_entity import UsageSummaryEntity
    from todoist_sdk.entity.user_entity import UserEntity
    from todoist_sdk.entity.workspace_entity import WorkspaceEntity
    from todoist_sdk.entity.workspace_invitation_view_entity import WorkspaceInvitationViewEntity
    from todoist_sdk.entity.workspace_user_view_entity import WorkspaceUserViewEntity
