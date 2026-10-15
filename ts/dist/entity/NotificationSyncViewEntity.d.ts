import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { NotificationSyncView, NotificationSyncViewLoadMatch, NotificationSyncViewListMatch, NotificationSyncViewCreateData } from '../TodoistTypes';
declare class NotificationSyncViewEntity extends TodoistEntityBase<NotificationSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: NotificationSyncViewEntity): NotificationSyncViewEntity;
    load(this: any, reqmatch?: NotificationSyncViewLoadMatch, ctrl?: Control): Promise<NotificationSyncViewEntity>;
    list(this: any, reqmatch?: NotificationSyncViewListMatch, ctrl?: Control): Promise<NotificationSyncViewEntity[]>;
    create(this: any, reqdata?: NotificationSyncViewCreateData, ctrl?: Control): Promise<NotificationSyncViewEntity>;
}
export { NotificationSyncViewEntity };
