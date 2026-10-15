import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { MigratePersonalToken, MigratePersonalTokenCreateData } from '../TodoistTypes';
declare class MigratePersonalTokenEntity extends TodoistEntityBase<MigratePersonalToken> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: MigratePersonalTokenEntity): MigratePersonalTokenEntity;
    create(this: any, reqdata?: MigratePersonalTokenCreateData, ctrl?: Control): Promise<MigratePersonalTokenEntity>;
}
export { MigratePersonalTokenEntity };
