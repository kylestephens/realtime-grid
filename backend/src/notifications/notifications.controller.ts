import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from '@prisma/client';

@Controller('notifications')
export class NotificationsController {

  constructor(
    private notificationsService: NotificationsService
  ) {}

  @Get('/')
  async getNotifications(): Promise<Notification[]> {
    return this.notificationsService.getAll();
  }

}
