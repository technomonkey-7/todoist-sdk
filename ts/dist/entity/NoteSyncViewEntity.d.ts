import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { NoteSyncView, NoteSyncViewLoadMatch, NoteSyncViewListMatch, NoteSyncViewCreateData } from '../TodoistTypes';
declare class NoteSyncViewEntity extends TodoistEntityBase<NoteSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: NoteSyncViewEntity): NoteSyncViewEntity;
    load(this: any, reqmatch?: NoteSyncViewLoadMatch, ctrl?: Control): Promise<NoteSyncViewEntity>;
    list(this: any, reqmatch?: NoteSyncViewListMatch, ctrl?: Control): Promise<NoteSyncViewEntity[]>;
    create(this: any, reqdata?: NoteSyncViewCreateData, ctrl?: Control): Promise<NoteSyncViewEntity>;
}
export { NoteSyncViewEntity };
