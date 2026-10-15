import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Archived, ArchivedListMatch } from '../TodoistTypes';
declare class ArchivedEntity extends TodoistEntityBase<Archived> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ArchivedEntity): ArchivedEntity;
    list(this: any, reqmatch?: ArchivedListMatch, ctrl?: Control): Promise<ArchivedEntity[]>;
}
export { ArchivedEntity };
