import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Authorization, AuthorizationCreateData, AuthorizationRemoveMatch } from '../TodoistTypes';
declare class AuthorizationEntity extends TodoistEntityBase<Authorization> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: AuthorizationEntity): AuthorizationEntity;
    create(this: any, reqdata?: AuthorizationCreateData, ctrl?: Control): Promise<AuthorizationEntity>;
    remove(this: any, reqmatch?: AuthorizationRemoveMatch, ctrl?: Control): Promise<AuthorizationEntity>;
}
export { AuthorizationEntity };
