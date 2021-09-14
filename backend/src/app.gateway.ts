import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { NotificationsService } from './notifications/notifications.service';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private notificationsService: NotificationsService) {}

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  sendGridUpdate(payload: any): void {
    this.server.emit('gridUpdate', payload);
  }

  afterInit(server: Server) {
    this.notificationsService.server = server;
    this.logger.log('Websocket Gateway Initialised');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Websocket Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Websocket Client Connected: ${client.id}`);
  }

}
