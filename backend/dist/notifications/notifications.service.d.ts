import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '@prisma/client';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    server: Server;
    sendGridUpdate(gridId: number, payload: any): void;
    getAll(): Promise<Notification[]>;
    createUserNotification(payload: any): Promise<void>;
}
