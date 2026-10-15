"use strict";
// Todoist Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.TodoistSDK = exports.TodoistEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const ActiveEntity_1 = require("./entity/ActiveEntity");
const ActivityEntity_1 = require("./entity/ActivityEntity");
const AnyProjectSyncViewEntity_1 = require("./entity/AnyProjectSyncViewEntity");
const ArchivedEntity_1 = require("./entity/ArchivedEntity");
const AuthorizationEntity_1 = require("./entity/AuthorizationEntity");
const BackupEntity_1 = require("./entity/BackupEntity");
const BillingPortalUrlEntity_1 = require("./entity/BillingPortalUrlEntity");
const ByCompletionDateEntity_1 = require("./entity/ByCompletionDateEntity");
const ByDueDateEntity_1 = require("./entity/ByDueDateEntity");
const CollaboratorEntity_1 = require("./entity/CollaboratorEntity");
const CommentEntity_1 = require("./entity/CommentEntity");
const CreditStateEntity_1 = require("./entity/CreditStateEntity");
const EmailEntity_1 = require("./entity/EmailEntity");
const FileUrlEntity_1 = require("./entity/FileUrlEntity");
const FolderEntity_1 = require("./entity/FolderEntity");
const HistoryEntity_1 = require("./entity/HistoryEntity");
const IdMappingEntity_1 = require("./entity/IdMappingEntity");
const InviteEntity_1 = require("./entity/InviteEntity");
const ItemSyncViewEntity_1 = require("./entity/ItemSyncViewEntity");
const LabelEntity_1 = require("./entity/LabelEntity");
const LabelRestViewEntity_1 = require("./entity/LabelRestViewEntity");
const LocationReminderEntity_1 = require("./entity/LocationReminderEntity");
const MemberViewEntity_1 = require("./entity/MemberViewEntity");
const MigratePersonalTokenEntity_1 = require("./entity/MigratePersonalTokenEntity");
const NoteSyncViewEntity_1 = require("./entity/NoteSyncViewEntity");
const NotificationLocationSyncViewEntity_1 = require("./entity/NotificationLocationSyncViewEntity");
const NotificationSyncViewEntity_1 = require("./entity/NotificationSyncViewEntity");
const PaginatedListAnyProjectSyncViewEntity_1 = require("./entity/PaginatedListAnyProjectSyncViewEntity");
const PaginatedListItemSyncViewEntity_1 = require("./entity/PaginatedListItemSyncViewEntity");
const PaginatedListStrEntity_1 = require("./entity/PaginatedListStrEntity");
const PlanDetailEntity_1 = require("./entity/PlanDetailEntity");
const ProductivityStatEntity_1 = require("./entity/ProductivityStatEntity");
const ProjectEntity_1 = require("./entity/ProjectEntity");
const ProjectImportEntity_1 = require("./entity/ProjectImportEntity");
const ProjectImportCreateResponseWithObjectEntity_1 = require("./entity/ProjectImportCreateResponseWithObjectEntity");
const ReminderEntity_1 = require("./entity/ReminderEntity");
const RemoveWorkspaceUserEntity_1 = require("./entity/RemoveWorkspaceUserEntity");
const RoleToActionMappingViewEntity_1 = require("./entity/RoleToActionMappingViewEntity");
const SectionEntity_1 = require("./entity/SectionEntity");
const SectionSyncViewEntity_1 = require("./entity/SectionSyncViewEntity");
const StatusOkEntity_1 = require("./entity/StatusOkEntity");
const SubscriptionInfoEntity_1 = require("./entity/SubscriptionInfoEntity");
const TaskEntity_1 = require("./entity/TaskEntity");
const TemplateEntity_1 = require("./entity/TemplateEntity");
const TopUpEntity_1 = require("./entity/TopUpEntity");
const UploadEntity_1 = require("./entity/UploadEntity");
const UsageSummaryEntity_1 = require("./entity/UsageSummaryEntity");
const UserEntity_1 = require("./entity/UserEntity");
const WorkspaceEntity_1 = require("./entity/WorkspaceEntity");
const WorkspaceInvitationViewEntity_1 = require("./entity/WorkspaceInvitationViewEntity");
const WorkspaceUserViewEntity_1 = require("./entity/WorkspaceUserViewEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const TodoistEntityBase_1 = require("./TodoistEntityBase");
Object.defineProperty(exports, "TodoistEntityBase", { enumerable: true, get: function () { return TodoistEntityBase_1.TodoistEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class TodoistSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('TodoistSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('TodoistSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('TodoistSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Active().list()` / `client.Active().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Active(entopts) {
        const self = this;
        return new ActiveEntity_1.ActiveEntity(self, entopts);
    }
    // Entity access: `client.Activity().list()` / `client.Activity().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Activity(entopts) {
        const self = this;
        return new ActivityEntity_1.ActivityEntity(self, entopts);
    }
    // Entity access: `client.AnyProjectSyncView().list()` / `client.AnyProjectSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AnyProjectSyncView(entopts) {
        const self = this;
        return new AnyProjectSyncViewEntity_1.AnyProjectSyncViewEntity(self, entopts);
    }
    // Entity access: `client.Archived().list()` / `client.Archived().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Archived(entopts) {
        const self = this;
        return new ArchivedEntity_1.ArchivedEntity(self, entopts);
    }
    // Entity access: `client.Authorization().list()` / `client.Authorization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Authorization(entopts) {
        const self = this;
        return new AuthorizationEntity_1.AuthorizationEntity(self, entopts);
    }
    // Entity access: `client.Backup().list()` / `client.Backup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Backup(entopts) {
        const self = this;
        return new BackupEntity_1.BackupEntity(self, entopts);
    }
    // Entity access: `client.BillingPortalUrl().list()` / `client.BillingPortalUrl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingPortalUrl(entopts) {
        const self = this;
        return new BillingPortalUrlEntity_1.BillingPortalUrlEntity(self, entopts);
    }
    // Entity access: `client.ByCompletionDate().list()` / `client.ByCompletionDate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ByCompletionDate(entopts) {
        const self = this;
        return new ByCompletionDateEntity_1.ByCompletionDateEntity(self, entopts);
    }
    // Entity access: `client.ByDueDate().list()` / `client.ByDueDate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ByDueDate(entopts) {
        const self = this;
        return new ByDueDateEntity_1.ByDueDateEntity(self, entopts);
    }
    // Entity access: `client.Collaborator().list()` / `client.Collaborator().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Collaborator(entopts) {
        const self = this;
        return new CollaboratorEntity_1.CollaboratorEntity(self, entopts);
    }
    // Entity access: `client.Comment().list()` / `client.Comment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Comment(entopts) {
        const self = this;
        return new CommentEntity_1.CommentEntity(self, entopts);
    }
    // Entity access: `client.CreditState().list()` / `client.CreditState().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreditState(entopts) {
        const self = this;
        return new CreditStateEntity_1.CreditStateEntity(self, entopts);
    }
    // Entity access: `client.Email().list()` / `client.Email().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Email(entopts) {
        const self = this;
        return new EmailEntity_1.EmailEntity(self, entopts);
    }
    // Entity access: `client.FileUrl().list()` / `client.FileUrl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    FileUrl(entopts) {
        const self = this;
        return new FileUrlEntity_1.FileUrlEntity(self, entopts);
    }
    // Entity access: `client.Folder().list()` / `client.Folder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Folder(entopts) {
        const self = this;
        return new FolderEntity_1.FolderEntity(self, entopts);
    }
    // Entity access: `client.History().list()` / `client.History().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    History(entopts) {
        const self = this;
        return new HistoryEntity_1.HistoryEntity(self, entopts);
    }
    // Entity access: `client.IdMapping().list()` / `client.IdMapping().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IdMapping(entopts) {
        const self = this;
        return new IdMappingEntity_1.IdMappingEntity(self, entopts);
    }
    // Entity access: `client.Invite().list()` / `client.Invite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Invite(entopts) {
        const self = this;
        return new InviteEntity_1.InviteEntity(self, entopts);
    }
    // Entity access: `client.ItemSyncView().list()` / `client.ItemSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ItemSyncView(entopts) {
        const self = this;
        return new ItemSyncViewEntity_1.ItemSyncViewEntity(self, entopts);
    }
    // Entity access: `client.Label().list()` / `client.Label().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Label(entopts) {
        const self = this;
        return new LabelEntity_1.LabelEntity(self, entopts);
    }
    // Entity access: `client.LabelRestView().list()` / `client.LabelRestView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LabelRestView(entopts) {
        const self = this;
        return new LabelRestViewEntity_1.LabelRestViewEntity(self, entopts);
    }
    // Entity access: `client.LocationReminder().list()` / `client.LocationReminder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LocationReminder(entopts) {
        const self = this;
        return new LocationReminderEntity_1.LocationReminderEntity(self, entopts);
    }
    // Entity access: `client.MemberView().list()` / `client.MemberView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MemberView(entopts) {
        const self = this;
        return new MemberViewEntity_1.MemberViewEntity(self, entopts);
    }
    // Entity access: `client.MigratePersonalToken().list()` / `client.MigratePersonalToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MigratePersonalToken(entopts) {
        const self = this;
        return new MigratePersonalTokenEntity_1.MigratePersonalTokenEntity(self, entopts);
    }
    // Entity access: `client.NoteSyncView().list()` / `client.NoteSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NoteSyncView(entopts) {
        const self = this;
        return new NoteSyncViewEntity_1.NoteSyncViewEntity(self, entopts);
    }
    // Entity access: `client.NotificationLocationSyncView().list()` / `client.NotificationLocationSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NotificationLocationSyncView(entopts) {
        const self = this;
        return new NotificationLocationSyncViewEntity_1.NotificationLocationSyncViewEntity(self, entopts);
    }
    // Entity access: `client.NotificationSyncView().list()` / `client.NotificationSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NotificationSyncView(entopts) {
        const self = this;
        return new NotificationSyncViewEntity_1.NotificationSyncViewEntity(self, entopts);
    }
    // Entity access: `client.PaginatedListAnyProjectSyncView().list()` / `client.PaginatedListAnyProjectSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PaginatedListAnyProjectSyncView(entopts) {
        const self = this;
        return new PaginatedListAnyProjectSyncViewEntity_1.PaginatedListAnyProjectSyncViewEntity(self, entopts);
    }
    // Entity access: `client.PaginatedListItemSyncView().list()` / `client.PaginatedListItemSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PaginatedListItemSyncView(entopts) {
        const self = this;
        return new PaginatedListItemSyncViewEntity_1.PaginatedListItemSyncViewEntity(self, entopts);
    }
    // Entity access: `client.PaginatedListStr().list()` / `client.PaginatedListStr().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PaginatedListStr(entopts) {
        const self = this;
        return new PaginatedListStrEntity_1.PaginatedListStrEntity(self, entopts);
    }
    // Entity access: `client.PlanDetail().list()` / `client.PlanDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PlanDetail(entopts) {
        const self = this;
        return new PlanDetailEntity_1.PlanDetailEntity(self, entopts);
    }
    // Entity access: `client.ProductivityStat().list()` / `client.ProductivityStat().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductivityStat(entopts) {
        const self = this;
        return new ProductivityStatEntity_1.ProductivityStatEntity(self, entopts);
    }
    // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Project(entopts) {
        const self = this;
        return new ProjectEntity_1.ProjectEntity(self, entopts);
    }
    // Entity access: `client.ProjectImport().list()` / `client.ProjectImport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectImport(entopts) {
        const self = this;
        return new ProjectImportEntity_1.ProjectImportEntity(self, entopts);
    }
    // Entity access: `client.ProjectImportCreateResponseWithObject().list()` / `client.ProjectImportCreateResponseWithObject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectImportCreateResponseWithObject(entopts) {
        const self = this;
        return new ProjectImportCreateResponseWithObjectEntity_1.ProjectImportCreateResponseWithObjectEntity(self, entopts);
    }
    // Entity access: `client.Reminder().list()` / `client.Reminder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Reminder(entopts) {
        const self = this;
        return new ReminderEntity_1.ReminderEntity(self, entopts);
    }
    // Entity access: `client.RemoveWorkspaceUser().list()` / `client.RemoveWorkspaceUser().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RemoveWorkspaceUser(entopts) {
        const self = this;
        return new RemoveWorkspaceUserEntity_1.RemoveWorkspaceUserEntity(self, entopts);
    }
    // Entity access: `client.RoleToActionMappingView().list()` / `client.RoleToActionMappingView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RoleToActionMappingView(entopts) {
        const self = this;
        return new RoleToActionMappingViewEntity_1.RoleToActionMappingViewEntity(self, entopts);
    }
    // Entity access: `client.Section().list()` / `client.Section().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Section(entopts) {
        const self = this;
        return new SectionEntity_1.SectionEntity(self, entopts);
    }
    // Entity access: `client.SectionSyncView().list()` / `client.SectionSyncView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SectionSyncView(entopts) {
        const self = this;
        return new SectionSyncViewEntity_1.SectionSyncViewEntity(self, entopts);
    }
    // Entity access: `client.StatusOk().list()` / `client.StatusOk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StatusOk(entopts) {
        const self = this;
        return new StatusOkEntity_1.StatusOkEntity(self, entopts);
    }
    // Entity access: `client.SubscriptionInfo().list()` / `client.SubscriptionInfo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SubscriptionInfo(entopts) {
        const self = this;
        return new SubscriptionInfoEntity_1.SubscriptionInfoEntity(self, entopts);
    }
    // Entity access: `client.Task().list()` / `client.Task().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Task(entopts) {
        const self = this;
        return new TaskEntity_1.TaskEntity(self, entopts);
    }
    // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Template(entopts) {
        const self = this;
        return new TemplateEntity_1.TemplateEntity(self, entopts);
    }
    // Entity access: `client.TopUp().list()` / `client.TopUp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TopUp(entopts) {
        const self = this;
        return new TopUpEntity_1.TopUpEntity(self, entopts);
    }
    // Entity access: `client.Upload().list()` / `client.Upload().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Upload(entopts) {
        const self = this;
        return new UploadEntity_1.UploadEntity(self, entopts);
    }
    // Entity access: `client.UsageSummary().list()` / `client.UsageSummary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UsageSummary(entopts) {
        const self = this;
        return new UsageSummaryEntity_1.UsageSummaryEntity(self, entopts);
    }
    // Entity access: `client.User().list()` / `client.User().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    User(entopts) {
        const self = this;
        return new UserEntity_1.UserEntity(self, entopts);
    }
    // Entity access: `client.Workspace().list()` / `client.Workspace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Workspace(entopts) {
        const self = this;
        return new WorkspaceEntity_1.WorkspaceEntity(self, entopts);
    }
    // Entity access: `client.WorkspaceInvitationView().list()` / `client.WorkspaceInvitationView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkspaceInvitationView(entopts) {
        const self = this;
        return new WorkspaceInvitationViewEntity_1.WorkspaceInvitationViewEntity(self, entopts);
    }
    // Entity access: `client.WorkspaceUserView().list()` / `client.WorkspaceUserView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkspaceUserView(entopts) {
        const self = this;
        return new WorkspaceUserViewEntity_1.WorkspaceUserViewEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new TodoistSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return TodoistSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Todoist' };
    }
    toString() {
        return 'Todoist ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.TodoistSDK = TodoistSDK;
const SDK = TodoistSDK;
exports.SDK = SDK;
//# sourceMappingURL=TodoistSDK.js.map