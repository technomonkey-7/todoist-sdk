import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { LocationReminder, LocationReminderRemoveMatch } from '../TodoistTypes';
declare class LocationReminderEntity extends TodoistEntityBase<LocationReminder> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: LocationReminderEntity): LocationReminderEntity;
    remove(this: any, reqmatch?: LocationReminderRemoveMatch, ctrl?: Control): Promise<LocationReminderEntity>;
}
export { LocationReminderEntity };
