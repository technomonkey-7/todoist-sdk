import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { ProjectImportCreateResponseWithObject, ProjectImportCreateResponseWithObjectCreateData } from '../TodoistTypes';
declare class ProjectImportCreateResponseWithObjectEntity extends TodoistEntityBase<ProjectImportCreateResponseWithObject> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ProjectImportCreateResponseWithObjectEntity): ProjectImportCreateResponseWithObjectEntity;
    create(this: any, reqdata?: ProjectImportCreateResponseWithObjectCreateData, ctrl?: Control): Promise<ProjectImportCreateResponseWithObjectEntity>;
}
export { ProjectImportCreateResponseWithObjectEntity };
