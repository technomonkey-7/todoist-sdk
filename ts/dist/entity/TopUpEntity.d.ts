import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { TopUp, TopUpCreateData } from '../TodoistTypes';
declare class TopUpEntity extends TodoistEntityBase<TopUp> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: TopUpEntity): TopUpEntity;
    create(this: any, reqdata?: TopUpCreateData, ctrl?: Control): Promise<TopUpEntity>;
}
export { TopUpEntity };
