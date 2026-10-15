import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Project, ProjectRemoveMatch } from '../TodoistTypes';
declare class ProjectEntity extends TodoistEntityBase<Project> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ProjectEntity): ProjectEntity;
    remove(this: any, reqmatch?: ProjectRemoveMatch, ctrl?: Control): Promise<ProjectEntity>;
}
export { ProjectEntity };
