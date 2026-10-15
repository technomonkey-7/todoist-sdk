import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Section, SectionLoadMatch, SectionListMatch, SectionCreateData, SectionRemoveMatch } from '../TodoistTypes';
declare class SectionEntity extends TodoistEntityBase<Section> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: SectionEntity): SectionEntity;
    load(this: any, reqmatch?: SectionLoadMatch, ctrl?: Control): Promise<SectionEntity>;
    list(this: any, reqmatch?: SectionListMatch, ctrl?: Control): Promise<SectionEntity[]>;
    create(this: any, reqdata?: SectionCreateData, ctrl?: Control): Promise<SectionEntity>;
    remove(this: any, reqmatch?: SectionRemoveMatch, ctrl?: Control): Promise<SectionEntity>;
}
export { SectionEntity };
