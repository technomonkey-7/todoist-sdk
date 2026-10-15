import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { LabelRestView, LabelRestViewListMatch } from '../TodoistTypes';
declare class LabelRestViewEntity extends TodoistEntityBase<LabelRestView> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: LabelRestViewEntity): LabelRestViewEntity;
    list(this: any, reqmatch?: LabelRestViewListMatch, ctrl?: Control): Promise<LabelRestViewEntity[]>;
}
export { LabelRestViewEntity };
