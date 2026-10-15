import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { StatusOk, StatusOkRemoveMatch } from '../TodoistTypes';
declare class StatusOkEntity extends TodoistEntityBase<StatusOk> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: StatusOkEntity): StatusOkEntity;
    remove(this: any, reqmatch?: StatusOkRemoveMatch, ctrl?: Control): Promise<StatusOkEntity>;
}
export { StatusOkEntity };
