import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { NotificationLocationSyncView, NotificationLocationSyncViewLoadMatch, NotificationLocationSyncViewListMatch, NotificationLocationSyncViewCreateData } from '../TodoistTypes';
declare class NotificationLocationSyncViewEntity extends TodoistEntityBase<NotificationLocationSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: NotificationLocationSyncViewEntity): NotificationLocationSyncViewEntity;
    load(this: any, reqmatch?: NotificationLocationSyncViewLoadMatch, ctrl?: Control): Promise<NotificationLocationSyncViewEntity>;
    list(this: any, reqmatch?: NotificationLocationSyncViewListMatch, ctrl?: Control): Promise<NotificationLocationSyncViewEntity[]>;
    create(this: any, reqdata?: NotificationLocationSyncViewCreateData, ctrl?: Control): Promise<NotificationLocationSyncViewEntity>;
}
export { NotificationLocationSyncViewEntity };
