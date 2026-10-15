import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { History, HistoryListMatch } from '../TodoistTypes';
declare class HistoryEntity extends TodoistEntityBase<History> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: HistoryEntity): HistoryEntity;
    list(this: any, reqmatch?: HistoryListMatch, ctrl?: Control): Promise<HistoryEntity[]>;
}
export { HistoryEntity };
