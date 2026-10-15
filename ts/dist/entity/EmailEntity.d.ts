import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Email, EmailUpdateData } from '../TodoistTypes';
declare class EmailEntity extends TodoistEntityBase<Email> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: EmailEntity): EmailEntity;
    update(this: any, reqdata?: EmailUpdateData, ctrl?: Control): Promise<EmailEntity>;
}
export { EmailEntity };
