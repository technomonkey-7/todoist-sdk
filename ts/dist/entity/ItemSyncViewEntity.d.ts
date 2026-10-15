import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { ItemSyncView, ItemSyncViewLoadMatch, ItemSyncViewListMatch, ItemSyncViewCreateData } from '../TodoistTypes';
declare class ItemSyncViewEntity extends TodoistEntityBase<ItemSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ItemSyncViewEntity): ItemSyncViewEntity;
    load(this: any, reqmatch?: ItemSyncViewLoadMatch, ctrl?: Control): Promise<ItemSyncViewEntity>;
    list(this: any, reqmatch?: ItemSyncViewListMatch, ctrl?: Control): Promise<ItemSyncViewEntity[]>;
    create(this: any, reqdata?: ItemSyncViewCreateData, ctrl?: Control): Promise<ItemSyncViewEntity>;
}
export { ItemSyncViewEntity };
