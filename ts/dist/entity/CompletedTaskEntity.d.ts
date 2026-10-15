import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { CompletedTask, CompletedTaskListMatch } from '../TodoistTypes';
declare class CompletedTaskEntity extends TodoistEntityBase<CompletedTask> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: CompletedTaskEntity): CompletedTaskEntity;
    list(this: any, reqmatch?: CompletedTaskListMatch, ctrl?: Control): Promise<CompletedTaskEntity[]>;
}
export { CompletedTaskEntity };
