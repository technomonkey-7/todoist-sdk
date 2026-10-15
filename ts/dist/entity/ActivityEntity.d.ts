import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Activity, ActivityListMatch } from '../TodoistTypes';
declare class ActivityEntity extends TodoistEntityBase<Activity> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ActivityEntity): ActivityEntity;
    list(this: any, reqmatch?: ActivityListMatch, ctrl?: Control): Promise<ActivityEntity[]>;
}
export { ActivityEntity };
