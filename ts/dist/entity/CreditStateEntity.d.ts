import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { CreditState, CreditStateLoadMatch } from '../TodoistTypes';
declare class CreditStateEntity extends TodoistEntityBase<CreditState> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: CreditStateEntity): CreditStateEntity;
    load(this: any, reqmatch?: CreditStateLoadMatch, ctrl?: Control): Promise<CreditStateEntity>;
}
export { CreditStateEntity };
