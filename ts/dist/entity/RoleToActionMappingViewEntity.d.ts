import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { RoleToActionMappingView, RoleToActionMappingViewListMatch } from '../TodoistTypes';
declare class RoleToActionMappingViewEntity extends TodoistEntityBase<RoleToActionMappingView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: RoleToActionMappingViewEntity): RoleToActionMappingViewEntity;
    list(this: any, reqmatch?: RoleToActionMappingViewListMatch, ctrl?: Control): Promise<RoleToActionMappingViewEntity[]>;
}
export { RoleToActionMappingViewEntity };
