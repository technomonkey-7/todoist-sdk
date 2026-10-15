import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { SharedLabel, SharedLabelListMatch, SharedLabelUpdateData, SharedLabelRemoveMatch } from '../TodoistTypes';
declare class SharedLabelEntity extends TodoistEntityBase<SharedLabel> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: SharedLabelEntity): SharedLabelEntity;
    list(this: any, reqmatch?: SharedLabelListMatch, ctrl?: Control): Promise<SharedLabelEntity[]>;
    update(this: any, reqdata?: SharedLabelUpdateData, ctrl?: Control): Promise<SharedLabelEntity>;
    remove(this: any, reqmatch?: SharedLabelRemoveMatch, ctrl?: Control): Promise<SharedLabelEntity>;
}
export { SharedLabelEntity };
