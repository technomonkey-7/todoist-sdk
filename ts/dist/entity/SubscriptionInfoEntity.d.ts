import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { SubscriptionInfo, SubscriptionInfoCreateData } from '../TodoistTypes';
declare class SubscriptionInfoEntity extends TodoistEntityBase<SubscriptionInfo> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: SubscriptionInfoEntity): SubscriptionInfoEntity;
    create(this: any, reqdata?: SubscriptionInfoCreateData, ctrl?: Control): Promise<SubscriptionInfoEntity>;
}
export { SubscriptionInfoEntity };
