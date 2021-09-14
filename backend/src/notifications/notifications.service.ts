import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationsService {

  constructor(private prisma: PrismaService) {}

  public server: Server = null;

  sendGridUpdate(gridId: number, payload: any) {
    this.server.emit(`gridUpdate:${gridId}`, payload);
  }

  async getAll(): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        id: {
          gt: 0
        }
      }
    });
  }

  async createUserNotification(payload: any) {
    console.dir(payload);

    const notification = await this.prisma.notification.create({
      data: payload
    });

    console.dir(notification);

    this.server.emit('notification', payload);
  }

}
