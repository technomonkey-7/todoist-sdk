import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { PaginatedListItemSyncView, PaginatedListItemSyncViewListMatch } from '../TodoistTypes';
declare class PaginatedListItemSyncViewEntity extends TodoistEntityBase<PaginatedListItemSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: PaginatedListItemSyncViewEntity): PaginatedListItemSyncViewEntity;
    list(this: any, reqmatch?: PaginatedListItemSyncViewListMatch, ctrl?: Control): Promise<PaginatedListItemSyncViewEntity[]>;
}
export { PaginatedListItemSyncViewEntity };
