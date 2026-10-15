import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { PaginatedListAnyProjectSyncView, PaginatedListAnyProjectSyncViewListMatch } from '../TodoistTypes';
declare class PaginatedListAnyProjectSyncViewEntity extends TodoistEntityBase<PaginatedListAnyProjectSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: PaginatedListAnyProjectSyncViewEntity): PaginatedListAnyProjectSyncViewEntity;
    list(this: any, reqmatch?: PaginatedListAnyProjectSyncViewListMatch, ctrl?: Control): Promise<PaginatedListAnyProjectSyncViewEntity[]>;
}
export { PaginatedListAnyProjectSyncViewEntity };
