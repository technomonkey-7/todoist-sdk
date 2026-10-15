import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { UsageSummary, UsageSummaryListMatch } from '../TodoistTypes';
declare class UsageSummaryEntity extends TodoistEntityBase<UsageSummary> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: UsageSummaryEntity): UsageSummaryEntity;
    list(this: any, reqmatch?: UsageSummaryListMatch, ctrl?: Control): Promise<UsageSummaryEntity[]>;
}
export { UsageSummaryEntity };
