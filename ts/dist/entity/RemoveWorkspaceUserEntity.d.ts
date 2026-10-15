import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { RemoveWorkspaceUser, RemoveWorkspaceUserRemoveMatch } from '../TodoistTypes';
declare class RemoveWorkspaceUserEntity extends TodoistEntityBase<RemoveWorkspaceUser> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: RemoveWorkspaceUserEntity): RemoveWorkspaceUserEntity;
    remove(this: any, reqmatch?: RemoveWorkspaceUserRemoveMatch, ctrl?: Control): Promise<RemoveWorkspaceUserEntity>;
}
export { RemoveWorkspaceUserEntity };
