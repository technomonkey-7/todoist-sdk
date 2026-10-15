import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { WorkspaceInvitationView, WorkspaceInvitationViewListMatch, WorkspaceInvitationViewCreateData, WorkspaceInvitationViewUpdateData } from '../TodoistTypes';
declare class WorkspaceInvitationViewEntity extends TodoistEntityBase<WorkspaceInvitationView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: WorkspaceInvitationViewEntity): WorkspaceInvitationViewEntity;
    list(this: any, reqmatch?: WorkspaceInvitationViewListMatch, ctrl?: Control): Promise<WorkspaceInvitationViewEntity[]>;
    create(this: any, reqdata?: WorkspaceInvitationViewCreateData, ctrl?: Control): Promise<WorkspaceInvitationViewEntity>;
    update(this: any, reqdata?: WorkspaceInvitationViewUpdateData, ctrl?: Control): Promise<WorkspaceInvitationViewEntity>;
}
export { WorkspaceInvitationViewEntity };
