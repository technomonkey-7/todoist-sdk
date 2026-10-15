import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { IdMapping, IdMappingListMatch } from '../TodoistTypes';
declare class IdMappingEntity extends TodoistEntityBase<IdMapping> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: IdMappingEntity): IdMappingEntity;
    list(this: any, reqmatch?: IdMappingListMatch, ctrl?: Control): Promise<IdMappingEntity[]>;
}
export { IdMappingEntity };
