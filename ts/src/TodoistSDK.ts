// Todoist Ts SDK

import { ActiveEntity } from './entity/ActiveEntity'
import { ActivityEntity } from './entity/ActivityEntity'
import { AnyProjectSyncViewEntity } from './entity/AnyProjectSyncViewEntity'
import { ArchivedEntity } from './entity/ArchivedEntity'
import { AuthorizationEntity } from './entity/AuthorizationEntity'
import { BackupEntity } from './entity/BackupEntity'
import { BillingPortalUrlEntity } from './entity/BillingPortalUrlEntity'
import { ByCompletionDateEntity } from './entity/ByCompletionDateEntity'
import { ByDueDateEntity } from './entity/ByDueDateEntity'
import { CollaboratorEntity } from './entity/CollaboratorEntity'
import { CommentEntity } from './entity/CommentEntity'
import { CreditStateEntity } from './entity/CreditStateEntity'
import { EmailEntity } from './entity/EmailEntity'
import { FileUrlEntity } from './entity/FileUrlEntity'
import { FolderEntity } from './entity/FolderEntity'
import { HistoryEntity } from './entity/HistoryEntity'
import { IdMappingEntity } from './entity/IdMappingEntity'
import { InviteEntity } from './entity/InviteEntity'
import { ItemSyncViewEntity } from './entity/ItemSyncViewEntity'
import { LabelEntity } from './entity/LabelEntity'
import { LabelRestViewEntity } from './entity/LabelRestViewEntity'
import { LocationReminderEntity } from './entity/LocationReminderEntity'
import { MemberViewEntity } from './entity/MemberViewEntity'
import { MigratePersonalTokenEntity } from './entity/MigratePersonalTokenEntity'
import { NoteSyncViewEntity } from './entity/NoteSyncViewEntity'
import { NotificationLocationSyncViewEntity } from './entity/NotificationLocationSyncViewEntity'
import { NotificationSyncViewEntity } from './entity/NotificationSyncViewEntity'
import { PaginatedListAnyProjectSyncViewEntity } from './entity/PaginatedListAnyProjectSyncViewEntity'
import { PaginatedListItemSyncViewEntity } from './entity/PaginatedListItemSyncViewEntity'
import { PaginatedListStrEntity } from './entity/PaginatedListStrEntity'
import { PlanDetailEntity } from './entity/PlanDetailEntity'
import { ProductivityStatEntity } from './entity/ProductivityStatEntity'
import { ProjectEntity } from './entity/ProjectEntity'
import { ProjectImportEntity } from './entity/ProjectImportEntity'
import { ProjectImportCreateResponseWithObjectEntity } from './entity/ProjectImportCreateResponseWithObjectEntity'
import { ReminderEntity } from './entity/ReminderEntity'
import { RemoveWorkspaceUserEntity } from './entity/RemoveWorkspaceUserEntity'
import { RoleToActionMappingViewEntity } from './entity/RoleToActionMappingViewEntity'
import { SectionEntity } from './entity/SectionEntity'
import { SectionSyncViewEntity } from './entity/SectionSyncViewEntity'
import { StatusOkEntity } from './entity/StatusOkEntity'
import { SubscriptionInfoEntity } from './entity/SubscriptionInfoEntity'
import { TaskEntity } from './entity/TaskEntity'
import { TemplateEntity } from './entity/TemplateEntity'
import { TopUpEntity } from './entity/TopUpEntity'
import { UploadEntity } from './entity/UploadEntity'
import { UsageSummaryEntity } from './entity/UsageSummaryEntity'
import { UserEntity } from './entity/UserEntity'
import { WorkspaceEntity } from './entity/WorkspaceEntity'
import { WorkspaceInvitationViewEntity } from './entity/WorkspaceInvitationViewEntity'
import { WorkspaceUserViewEntity } from './entity/WorkspaceUserViewEntity'

export type * from './TodoistTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { TodoistEntityBase } from './TodoistEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class TodoistSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
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
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('TodoistSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('TodoistSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('TodoistSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Active().list()` / `client.Active().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Active(entopts?: Record<string, any>) {
    const self = this
    return new ActiveEntity(self, entopts)
  }


  // Entity access: `client.Activity().list()` / `client.Activity().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Activity(entopts?: Record<string, any>) {
    const self = this
    return new ActivityEntity(self, entopts)
  }


  // Entity access: `client.AnyProjectSyncView().list()` / `client.AnyProjectSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AnyProjectSyncView(entopts?: Record<string, any>) {
    const self = this
    return new AnyProjectSyncViewEntity(self, entopts)
  }


  // Entity access: `client.Archived().list()` / `client.Archived().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Archived(entopts?: Record<string, any>) {
    const self = this
    return new ArchivedEntity(self, entopts)
  }


  // Entity access: `client.Authorization().list()` / `client.Authorization().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Authorization(entopts?: Record<string, any>) {
    const self = this
    return new AuthorizationEntity(self, entopts)
  }


  // Entity access: `client.Backup().list()` / `client.Backup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Backup(entopts?: Record<string, any>) {
    const self = this
    return new BackupEntity(self, entopts)
  }


  // Entity access: `client.BillingPortalUrl().list()` / `client.BillingPortalUrl().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BillingPortalUrl(entopts?: Record<string, any>) {
    const self = this
    return new BillingPortalUrlEntity(self, entopts)
  }


  // Entity access: `client.ByCompletionDate().list()` / `client.ByCompletionDate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ByCompletionDate(entopts?: Record<string, any>) {
    const self = this
    return new ByCompletionDateEntity(self, entopts)
  }


  // Entity access: `client.ByDueDate().list()` / `client.ByDueDate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ByDueDate(entopts?: Record<string, any>) {
    const self = this
    return new ByDueDateEntity(self, entopts)
  }


  // Entity access: `client.Collaborator().list()` / `client.Collaborator().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Collaborator(entopts?: Record<string, any>) {
    const self = this
    return new CollaboratorEntity(self, entopts)
  }


  // Entity access: `client.Comment().list()` / `client.Comment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Comment(entopts?: Record<string, any>) {
    const self = this
    return new CommentEntity(self, entopts)
  }


  // Entity access: `client.CreditState().list()` / `client.CreditState().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreditState(entopts?: Record<string, any>) {
    const self = this
    return new CreditStateEntity(self, entopts)
  }


  // Entity access: `client.Email().list()` / `client.Email().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Email(entopts?: Record<string, any>) {
    const self = this
    return new EmailEntity(self, entopts)
  }


  // Entity access: `client.FileUrl().list()` / `client.FileUrl().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FileUrl(entopts?: Record<string, any>) {
    const self = this
    return new FileUrlEntity(self, entopts)
  }


  // Entity access: `client.Folder().list()` / `client.Folder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Folder(entopts?: Record<string, any>) {
    const self = this
    return new FolderEntity(self, entopts)
  }


  // Entity access: `client.History().list()` / `client.History().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  History(entopts?: Record<string, any>) {
    const self = this
    return new HistoryEntity(self, entopts)
  }


  // Entity access: `client.IdMapping().list()` / `client.IdMapping().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IdMapping(entopts?: Record<string, any>) {
    const self = this
    return new IdMappingEntity(self, entopts)
  }


  // Entity access: `client.Invite().list()` / `client.Invite().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Invite(entopts?: Record<string, any>) {
    const self = this
    return new InviteEntity(self, entopts)
  }


  // Entity access: `client.ItemSyncView().list()` / `client.ItemSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ItemSyncView(entopts?: Record<string, any>) {
    const self = this
    return new ItemSyncViewEntity(self, entopts)
  }


  // Entity access: `client.Label().list()` / `client.Label().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Label(entopts?: Record<string, any>) {
    const self = this
    return new LabelEntity(self, entopts)
  }


  // Entity access: `client.LabelRestView().list()` / `client.LabelRestView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LabelRestView(entopts?: Record<string, any>) {
    const self = this
    return new LabelRestViewEntity(self, entopts)
  }


  // Entity access: `client.LocationReminder().list()` / `client.LocationReminder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LocationReminder(entopts?: Record<string, any>) {
    const self = this
    return new LocationReminderEntity(self, entopts)
  }


  // Entity access: `client.MemberView().list()` / `client.MemberView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MemberView(entopts?: Record<string, any>) {
    const self = this
    return new MemberViewEntity(self, entopts)
  }


  // Entity access: `client.MigratePersonalToken().list()` / `client.MigratePersonalToken().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MigratePersonalToken(entopts?: Record<string, any>) {
    const self = this
    return new MigratePersonalTokenEntity(self, entopts)
  }


  // Entity access: `client.NoteSyncView().list()` / `client.NoteSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NoteSyncView(entopts?: Record<string, any>) {
    const self = this
    return new NoteSyncViewEntity(self, entopts)
  }


  // Entity access: `client.NotificationLocationSyncView().list()` / `client.NotificationLocationSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NotificationLocationSyncView(entopts?: Record<string, any>) {
    const self = this
    return new NotificationLocationSyncViewEntity(self, entopts)
  }


  // Entity access: `client.NotificationSyncView().list()` / `client.NotificationSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NotificationSyncView(entopts?: Record<string, any>) {
    const self = this
    return new NotificationSyncViewEntity(self, entopts)
  }


  // Entity access: `client.PaginatedListAnyProjectSyncView().list()` / `client.PaginatedListAnyProjectSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PaginatedListAnyProjectSyncView(entopts?: Record<string, any>) {
    const self = this
    return new PaginatedListAnyProjectSyncViewEntity(self, entopts)
  }


  // Entity access: `client.PaginatedListItemSyncView().list()` / `client.PaginatedListItemSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PaginatedListItemSyncView(entopts?: Record<string, any>) {
    const self = this
    return new PaginatedListItemSyncViewEntity(self, entopts)
  }


  // Entity access: `client.PaginatedListStr().list()` / `client.PaginatedListStr().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PaginatedListStr(entopts?: Record<string, any>) {
    const self = this
    return new PaginatedListStrEntity(self, entopts)
  }


  // Entity access: `client.PlanDetail().list()` / `client.PlanDetail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PlanDetail(entopts?: Record<string, any>) {
    const self = this
    return new PlanDetailEntity(self, entopts)
  }


  // Entity access: `client.ProductivityStat().list()` / `client.ProductivityStat().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProductivityStat(entopts?: Record<string, any>) {
    const self = this
    return new ProductivityStatEntity(self, entopts)
  }


  // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Project(entopts?: Record<string, any>) {
    const self = this
    return new ProjectEntity(self, entopts)
  }


  // Entity access: `client.ProjectImport().list()` / `client.ProjectImport().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectImport(entopts?: Record<string, any>) {
    const self = this
    return new ProjectImportEntity(self, entopts)
  }


  // Entity access: `client.ProjectImportCreateResponseWithObject().list()` / `client.ProjectImportCreateResponseWithObject().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectImportCreateResponseWithObject(entopts?: Record<string, any>) {
    const self = this
    return new ProjectImportCreateResponseWithObjectEntity(self, entopts)
  }


  // Entity access: `client.Reminder().list()` / `client.Reminder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Reminder(entopts?: Record<string, any>) {
    const self = this
    return new ReminderEntity(self, entopts)
  }


  // Entity access: `client.RemoveWorkspaceUser().list()` / `client.RemoveWorkspaceUser().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RemoveWorkspaceUser(entopts?: Record<string, any>) {
    const self = this
    return new RemoveWorkspaceUserEntity(self, entopts)
  }


  // Entity access: `client.RoleToActionMappingView().list()` / `client.RoleToActionMappingView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RoleToActionMappingView(entopts?: Record<string, any>) {
    const self = this
    return new RoleToActionMappingViewEntity(self, entopts)
  }


  // Entity access: `client.Section().list()` / `client.Section().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Section(entopts?: Record<string, any>) {
    const self = this
    return new SectionEntity(self, entopts)
  }


  // Entity access: `client.SectionSyncView().list()` / `client.SectionSyncView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SectionSyncView(entopts?: Record<string, any>) {
    const self = this
    return new SectionSyncViewEntity(self, entopts)
  }


  // Entity access: `client.StatusOk().list()` / `client.StatusOk().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  StatusOk(entopts?: Record<string, any>) {
    const self = this
    return new StatusOkEntity(self, entopts)
  }


  // Entity access: `client.SubscriptionInfo().list()` / `client.SubscriptionInfo().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SubscriptionInfo(entopts?: Record<string, any>) {
    const self = this
    return new SubscriptionInfoEntity(self, entopts)
  }


  // Entity access: `client.Task().list()` / `client.Task().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Task(entopts?: Record<string, any>) {
    const self = this
    return new TaskEntity(self, entopts)
  }


  // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Template(entopts?: Record<string, any>) {
    const self = this
    return new TemplateEntity(self, entopts)
  }


  // Entity access: `client.TopUp().list()` / `client.TopUp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TopUp(entopts?: Record<string, any>) {
    const self = this
    return new TopUpEntity(self, entopts)
  }


  // Entity access: `client.Upload().list()` / `client.Upload().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Upload(entopts?: Record<string, any>) {
    const self = this
    return new UploadEntity(self, entopts)
  }


  // Entity access: `client.UsageSummary().list()` / `client.UsageSummary().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UsageSummary(entopts?: Record<string, any>) {
    const self = this
    return new UsageSummaryEntity(self, entopts)
  }


  // Entity access: `client.User().list()` / `client.User().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  User(entopts?: Record<string, any>) {
    const self = this
    return new UserEntity(self, entopts)
  }


  // Entity access: `client.Workspace().list()` / `client.Workspace().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Workspace(entopts?: Record<string, any>) {
    const self = this
    return new WorkspaceEntity(self, entopts)
  }


  // Entity access: `client.WorkspaceInvitationView().list()` / `client.WorkspaceInvitationView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WorkspaceInvitationView(entopts?: Record<string, any>) {
    const self = this
    return new WorkspaceInvitationViewEntity(self, entopts)
  }


  // Entity access: `client.WorkspaceUserView().list()` / `client.WorkspaceUserView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WorkspaceUserView(entopts?: Record<string, any>) {
    const self = this
    return new WorkspaceUserViewEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new TodoistSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return TodoistSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Todoist' }
  }

  toString() {
    return 'Todoist ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = TodoistSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  TodoistEntityBase,

  TodoistSDK,
  SDK,
}


export type { DirectResult }
