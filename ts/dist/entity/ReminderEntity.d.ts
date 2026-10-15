import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Reminder, ReminderRemoveMatch } from '../TodoistTypes';
declare class ReminderEntity extends TodoistEntityBase<Reminder> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ReminderEntity): ReminderEntity;
    remove(this: any, reqmatch?: ReminderRemoveMatch, ctrl?: Control): Promise<ReminderEntity>;
}
export { ReminderEntity };
