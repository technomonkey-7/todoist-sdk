import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { PaginatedListStr, PaginatedListStrListMatch } from '../TodoistTypes';
declare class PaginatedListStrEntity extends TodoistEntityBase<PaginatedListStr> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: PaginatedListStrEntity): PaginatedListStrEntity;
    list(this: any, reqmatch?: PaginatedListStrListMatch, ctrl?: Control): Promise<PaginatedListStrEntity[]>;
}
export { PaginatedListStrEntity };
