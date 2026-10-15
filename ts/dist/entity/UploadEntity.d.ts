import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Upload, UploadCreateData, UploadRemoveMatch } from '../TodoistTypes';
declare class UploadEntity extends TodoistEntityBase<Upload> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: UploadEntity): UploadEntity;
    create(this: any, reqdata?: UploadCreateData, ctrl?: Control): Promise<UploadEntity>;
    remove(this: any, reqmatch?: UploadRemoveMatch, ctrl?: Control): Promise<UploadEntity>;
}
export { UploadEntity };
