import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Invite, InviteCreateData } from '../TodoistTypes';
declare class InviteEntity extends TodoistEntityBase<Invite> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: InviteEntity): InviteEntity;
    create(this: any, reqdata?: InviteCreateData, ctrl?: Control): Promise<InviteEntity>;
}
export { InviteEntity };
