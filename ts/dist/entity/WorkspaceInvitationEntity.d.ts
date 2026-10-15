import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { WorkspaceInvitation, WorkspaceInvitationListMatch, WorkspaceInvitationUpdateData, WorkspaceInvitationRemoveMatch } from '../TodoistTypes';
declare class WorkspaceInvitationEntity extends TodoistEntityBase<WorkspaceInvitation> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: WorkspaceInvitationEntity): WorkspaceInvitationEntity;
    list(this: any, reqmatch?: WorkspaceInvitationListMatch, ctrl?: Control): Promise<WorkspaceInvitationEntity[]>;
    update(this: any, reqdata?: WorkspaceInvitationUpdateData, ctrl?: Control): Promise<WorkspaceInvitationEntity>;
    remove(this: any, reqmatch?: WorkspaceInvitationRemoveMatch, ctrl?: Control): Promise<WorkspaceInvitationEntity>;
}
export { WorkspaceInvitationEntity };
