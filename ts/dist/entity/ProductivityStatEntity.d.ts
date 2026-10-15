import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { ProductivityStat, ProductivityStatListMatch } from '../TodoistTypes';
declare class ProductivityStatEntity extends TodoistEntityBase<ProductivityStat> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: ProductivityStatEntity): ProductivityStatEntity;
    list(this: any, reqmatch?: ProductivityStatListMatch, ctrl?: Control): Promise<ProductivityStatEntity[]>;
}
export { ProductivityStatEntity };
