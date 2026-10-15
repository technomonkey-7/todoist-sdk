import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { PlanDetail, PlanDetailListMatch } from '../TodoistTypes';
declare class PlanDetailEntity extends TodoistEntityBase<PlanDetail> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: PlanDetailEntity): PlanDetailEntity;
    list(this: any, reqmatch?: PlanDetailListMatch, ctrl?: Control): Promise<PlanDetailEntity[]>;
}
export { PlanDetailEntity };
