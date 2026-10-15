import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { WorkspaceUser, WorkspaceUserListMatch, WorkspaceUserCreateData, WorkspaceUserUpdateData, WorkspaceUserRemoveMatch } from '../TodoistTypes';
declare class WorkspaceUserEntity extends TodoistEntityBase<WorkspaceUser> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: WorkspaceUserEntity): WorkspaceUserEntity;
    list(this: any, reqmatch?: WorkspaceUserListMatch, ctrl?: Control): Promise<WorkspaceUserEntity[]>;
    create(this: any, reqdata?: WorkspaceUserCreateData, ctrl?: Control): Promise<WorkspaceUserEntity>;
    update(this: any, reqdata?: WorkspaceUserUpdateData, ctrl?: Control): Promise<WorkspaceUserEntity>;
    remove(this: any, reqmatch?: WorkspaceUserRemoveMatch, ctrl?: Control): Promise<WorkspaceUserEntity>;
}
export { WorkspaceUserEntity };
