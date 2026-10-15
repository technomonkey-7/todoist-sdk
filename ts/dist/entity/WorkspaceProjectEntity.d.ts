import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { WorkspaceProject, WorkspaceProjectListMatch } from '../TodoistTypes';
declare class WorkspaceProjectEntity extends TodoistEntityBase<WorkspaceProject> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: WorkspaceProjectEntity): WorkspaceProjectEntity;
    list(this: any, reqmatch?: WorkspaceProjectListMatch, ctrl?: Control): Promise<WorkspaceProjectEntity[]>;
}
export { WorkspaceProjectEntity };
