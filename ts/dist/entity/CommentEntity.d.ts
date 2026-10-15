import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Comment, CommentCreateData, CommentRemoveMatch } from '../TodoistTypes';
declare class CommentEntity extends TodoistEntityBase<Comment> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: CommentEntity): CommentEntity;
    create(this: any, reqdata?: CommentCreateData, ctrl?: Control): Promise<CommentEntity>;
    remove(this: any, reqmatch?: CommentRemoveMatch, ctrl?: Control): Promise<CommentEntity>;
}
export { CommentEntity };
