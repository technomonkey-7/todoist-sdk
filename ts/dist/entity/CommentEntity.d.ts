import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { Comment, CommentLoadMatch, CommentListMatch, CommentCreateData, CommentUpdateData, CommentRemoveMatch } from '../TodoistTypes';
declare class CommentEntity extends TodoistEntityBase<Comment> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: CommentEntity): CommentEntity;
    load(this: any, reqmatch?: CommentLoadMatch, ctrl?: Control): Promise<CommentEntity>;
    list(this: any, reqmatch?: CommentListMatch, ctrl?: Control): Promise<CommentEntity[]>;
    create(this: any, reqdata?: CommentCreateData, ctrl?: Control): Promise<CommentEntity>;
    update(this: any, reqdata?: CommentUpdateData, ctrl?: Control): Promise<CommentEntity>;
    remove(this: any, reqmatch?: CommentRemoveMatch, ctrl?: Control): Promise<CommentEntity>;
}
export { CommentEntity };
