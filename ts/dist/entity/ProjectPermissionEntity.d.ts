import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { ProjectPermission, ProjectPermissionListMatch } from '../TodoistTypes';
declare class ProjectPermissionEntity extends TodoistEntityBase<ProjectPermission> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ProjectPermissionEntity): ProjectPermissionEntity;
    list(this: any, reqmatch?: ProjectPermissionListMatch, ctrl?: Control): Promise<ProjectPermissionEntity[]>;
}
export { ProjectPermissionEntity };
