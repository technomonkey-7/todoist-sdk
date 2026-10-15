import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Folder, FolderLoadMatch, FolderListMatch, FolderCreateData, FolderRemoveMatch } from '../TodoistTypes';
declare class FolderEntity extends TodoistEntityBase<Folder> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: FolderEntity): FolderEntity;
    load(this: any, reqmatch?: FolderLoadMatch, ctrl?: Control): Promise<FolderEntity>;
    list(this: any, reqmatch?: FolderListMatch, ctrl?: Control): Promise<FolderEntity[]>;
    create(this: any, reqdata?: FolderCreateData, ctrl?: Control): Promise<FolderEntity>;
    remove(this: any, reqmatch?: FolderRemoveMatch, ctrl?: Control): Promise<FolderEntity>;
}
export { FolderEntity };
