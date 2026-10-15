import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { ProjectImport, ProjectImportCreateData } from '../TodoistTypes';
declare class ProjectImportEntity extends TodoistEntityBase<ProjectImport> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ProjectImportEntity): ProjectImportEntity;
    create(this: any, reqdata?: ProjectImportCreateData, ctrl?: Control): Promise<ProjectImportEntity>;
}
export { ProjectImportEntity };
