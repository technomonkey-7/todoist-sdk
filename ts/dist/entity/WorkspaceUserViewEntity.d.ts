import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { WorkspaceUserView, WorkspaceUserViewCreateData } from '../TodoistTypes';
declare class WorkspaceUserViewEntity extends TodoistEntityBase<WorkspaceUserView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: WorkspaceUserViewEntity): WorkspaceUserViewEntity;
    create(this: any, reqdata?: WorkspaceUserViewCreateData, ctrl?: Control): Promise<WorkspaceUserViewEntity>;
}
export { WorkspaceUserViewEntity };
