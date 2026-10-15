import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Backup, BackupLoadMatch, BackupListMatch } from '../TodoistTypes';
declare class BackupEntity extends TodoistEntityBase<Backup> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: BackupEntity): BackupEntity;
    load(this: any, reqmatch?: BackupLoadMatch, ctrl?: Control): Promise<BackupEntity>;
    list(this: any, reqmatch?: BackupListMatch, ctrl?: Control): Promise<BackupEntity[]>;
}
export { BackupEntity };
