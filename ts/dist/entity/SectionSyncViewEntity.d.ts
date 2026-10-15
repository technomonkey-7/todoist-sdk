import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { SectionSyncView, SectionSyncViewListMatch, SectionSyncViewCreateData } from '../TodoistTypes';
declare class SectionSyncViewEntity extends TodoistEntityBase<SectionSyncView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: SectionSyncViewEntity): SectionSyncViewEntity;
    list(this: any, reqmatch?: SectionSyncViewListMatch, ctrl?: Control): Promise<SectionSyncViewEntity[]>;
    create(this: any, reqdata?: SectionSyncViewCreateData, ctrl?: Control): Promise<SectionSyncViewEntity>;
}
export { SectionSyncViewEntity };
