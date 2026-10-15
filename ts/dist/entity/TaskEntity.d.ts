import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Task, TaskLoadMatch, TaskListMatch, TaskCreateData, TaskUpdateData, TaskRemoveMatch } from '../TodoistTypes';
declare class TaskEntity extends TodoistEntityBase<Task> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: TaskEntity): TaskEntity;
    load(this: any, reqmatch?: TaskLoadMatch, ctrl?: Control): Promise<TaskEntity>;
    list(this: any, reqmatch?: TaskListMatch, ctrl?: Control): Promise<TaskEntity[]>;
    create(this: any, reqdata?: TaskCreateData, ctrl?: Control): Promise<TaskEntity>;
    update(this: any, reqdata?: TaskUpdateData, ctrl?: Control): Promise<TaskEntity>;
    remove(this: any, reqmatch?: TaskRemoveMatch, ctrl?: Control): Promise<TaskEntity>;
}
export { TaskEntity };
