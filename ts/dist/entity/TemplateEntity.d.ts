import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Template, TemplateLoadMatch } from '../TodoistTypes';
declare class TemplateEntity extends TodoistEntityBase<Template> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: TemplateEntity): TemplateEntity;
    load(this: any, reqmatch?: TemplateLoadMatch, ctrl?: Control): Promise<TemplateEntity>;
}
export { TemplateEntity };
