import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { User, UserListMatch, UserUpdateData } from '../TodoistTypes';
declare class UserEntity extends TodoistEntityBase<User> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
    update(this: any, reqdata?: UserUpdateData, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
