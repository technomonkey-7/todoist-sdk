import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Active, ActiveListMatch } from '../TodoistTypes';
declare class ActiveEntity extends TodoistEntityBase<Active> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ActiveEntity): ActiveEntity;
    list(this: any, reqmatch?: ActiveListMatch, ctrl?: Control): Promise<ActiveEntity[]>;
}
export { ActiveEntity };
