import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Label, LabelLoadMatch, LabelListMatch, LabelCreateData, LabelUpdateData, LabelRemoveMatch } from '../TodoistTypes';
declare class LabelEntity extends TodoistEntityBase<Label> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: LabelEntity): LabelEntity;
    load(this: any, reqmatch?: LabelLoadMatch, ctrl?: Control): Promise<LabelEntity>;
    list(this: any, reqmatch?: LabelListMatch, ctrl?: Control): Promise<LabelEntity[]>;
    create(this: any, reqdata?: LabelCreateData, ctrl?: Control): Promise<LabelEntity>;
    update(this: any, reqdata?: LabelUpdateData, ctrl?: Control): Promise<LabelEntity>;
    remove(this: any, reqmatch?: LabelRemoveMatch, ctrl?: Control): Promise<LabelEntity>;
}
export { LabelEntity };
