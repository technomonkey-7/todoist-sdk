import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { AnyProjectSyncView, AnyProjectSyncViewLoadMatch, AnyProjectSyncViewListMatch, AnyProjectSyncViewCreateData } from '../TodoistTypes';
declare class AnyProjectSyncViewEntity extends TodoistEntityBase<AnyProjectSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: AnyProjectSyncViewEntity): AnyProjectSyncViewEntity;
    load(this: any, reqmatch?: AnyProjectSyncViewLoadMatch, ctrl?: Control): Promise<AnyProjectSyncViewEntity>;
    list(this: any, reqmatch?: AnyProjectSyncViewListMatch, ctrl?: Control): Promise<AnyProjectSyncViewEntity[]>;
    create(this: any, reqdata?: AnyProjectSyncViewCreateData, ctrl?: Control): Promise<AnyProjectSyncViewEntity>;
}
export { AnyProjectSyncViewEntity };
