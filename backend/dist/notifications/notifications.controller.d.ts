import { NotificationsService } from './notifications.service';
import { Notification } from '@prisma/client';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(): Promise<Notification[]>;
}
