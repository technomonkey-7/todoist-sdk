import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { MemberView, MemberViewListMatch } from '../TodoistTypes';
declare class MemberViewEntity extends TodoistEntityBase<MemberView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: MemberViewEntity): MemberViewEntity;
    list(this: any, reqmatch?: MemberViewListMatch, ctrl?: Control): Promise<MemberViewEntity[]>;
}
export { MemberViewEntity };
