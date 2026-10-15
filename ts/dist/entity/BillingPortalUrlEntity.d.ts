import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { BillingPortalUrl, BillingPortalUrlCreateData } from '../TodoistTypes';
declare class BillingPortalUrlEntity extends TodoistEntityBase<BillingPortalUrl> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: BillingPortalUrlEntity): BillingPortalUrlEntity;
    create(this: any, reqdata?: BillingPortalUrlCreateData, ctrl?: Control): Promise<BillingPortalUrlEntity>;
}
export { BillingPortalUrlEntity };
