import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Task, TaskCreateData, TaskRemoveMatch } from '../TodoistTypes';
declare class TaskEntity extends TodoistEntityBase<Task> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: TaskEntity): TaskEntity;
    create(this: any, reqdata?: TaskCreateData, ctrl?: Control): Promise<TaskEntity>;
    remove(this: any, reqmatch?: TaskRemoveMatch, ctrl?: Control): Promise<TaskEntity>;
}
export { TaskEntity };
