import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { NotificationsService } from './notifications/notifications.service';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    server: Server;
    private logger;
    handleMessage(client: Socket, payload: string): void;
    sendGridUpdate(payload: any): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
