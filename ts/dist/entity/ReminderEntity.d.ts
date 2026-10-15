import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Reminder, ReminderLoadMatch, ReminderListMatch, ReminderCreateData, ReminderUpdateData, ReminderRemoveMatch } from '../TodoistTypes';
declare class ReminderEntity extends TodoistEntityBase<Reminder> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ReminderEntity): ReminderEntity;
    load(this: any, reqmatch?: ReminderLoadMatch, ctrl?: Control): Promise<ReminderEntity>;
    list(this: any, reqmatch?: ReminderListMatch, ctrl?: Control): Promise<ReminderEntity[]>;
    create(this: any, reqdata?: ReminderCreateData, ctrl?: Control): Promise<ReminderEntity>;
    update(this: any, reqdata?: ReminderUpdateData, ctrl?: Control): Promise<ReminderEntity>;
    remove(this: any, reqmatch?: ReminderRemoveMatch, ctrl?: Control): Promise<ReminderEntity>;
}
export { ReminderEntity };
