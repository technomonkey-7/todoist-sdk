import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Collaborator, CollaboratorListMatch } from '../TodoistTypes';
declare class CollaboratorEntity extends TodoistEntityBase<Collaborator> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: CollaboratorEntity): CollaboratorEntity;
    list(this: any, reqmatch?: CollaboratorListMatch, ctrl?: Control): Promise<CollaboratorEntity[]>;
}
export { CollaboratorEntity };
