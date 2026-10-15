import { TodoistEntityBase } from '../TodoistEntityBase';
import type { TodoistSDK } from '../TodoistSDK';
import type { Control } from '../types';
import type { NotificationSetting, NotificationSettingUpdateData } from '../TodoistTypes';
declare class NotificationSettingEntity extends TodoistEntityBase<NotificationSetting> {
    constructor(client: TodoistSDK, entopts: any);
    make(this: NotificationSettingEntity): NotificationSettingEntity;
    update(this: any, reqdata?: NotificationSettingUpdateData, ctrl?: Control): Promise<NotificationSettingEntity>;
}
export { NotificationSettingEntity };
