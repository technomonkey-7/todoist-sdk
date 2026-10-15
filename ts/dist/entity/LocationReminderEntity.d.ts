import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { LocationReminder, LocationReminderLoadMatch, LocationReminderListMatch, LocationReminderCreateData, LocationReminderUpdateData, LocationReminderRemoveMatch } from '../TodoistTypes';
declare class LocationReminderEntity extends TodoistEntityBase<LocationReminder> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: LocationReminderEntity): LocationReminderEntity;
    load(this: any, reqmatch?: LocationReminderLoadMatch, ctrl?: Control): Promise<LocationReminderEntity>;
    list(this: any, reqmatch?: LocationReminderListMatch, ctrl?: Control): Promise<LocationReminderEntity[]>;
    create(this: any, reqdata?: LocationReminderCreateData, ctrl?: Control): Promise<LocationReminderEntity>;
    update(this: any, reqdata?: LocationReminderUpdateData, ctrl?: Control): Promise<LocationReminderEntity>;
    remove(this: any, reqmatch?: LocationReminderRemoveMatch, ctrl?: Control): Promise<LocationReminderEntity>;
}
export { LocationReminderEntity };
