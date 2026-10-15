import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { ByDueDate, ByDueDateListMatch } from '../TodoistTypes';
declare class ByDueDateEntity extends TodoistEntityBase<ByDueDate> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ByDueDateEntity): ByDueDateEntity;
    list(this: any, reqmatch?: ByDueDateListMatch, ctrl?: Control): Promise<ByDueDateEntity[]>;
}
export { ByDueDateEntity };
