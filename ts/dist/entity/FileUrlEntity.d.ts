import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { FileUrl, FileUrlLoadMatch } from '../TodoistTypes';
declare class FileUrlEntity extends TodoistEntityBase<FileUrl> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: FileUrlEntity): FileUrlEntity;
    load(this: any, reqmatch?: FileUrlLoadMatch, ctrl?: Control): Promise<FileUrlEntity>;
}
export { FileUrlEntity };
