import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { ByCompletionDate, ByCompletionDateListMatch } from '../TodoistTypes';
declare class ByCompletionDateEntity extends TodoistEntityBase<ByCompletionDate> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ByCompletionDateEntity): ByCompletionDateEntity;
    list(this: any, reqmatch?: ByCompletionDateListMatch, ctrl?: Control): Promise<ByCompletionDateEntity[]>;
}
export { ByCompletionDateEntity };
