"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let NotificationsGateway = class NotificationsGateway {
    constructor() {
        this.logger = new common_1.Logger('AppGateway');
    }
    handleMessage(client, payload) {
        this.server.emit('msgToClient', payload);
    }
    sendGridUpdate(payload) {
        this.server.emit('gridUpdate', payload);
    }
    afterInit(client) {
        this.logger.log('Websocket Gateway Initialised');
    }
    handleDisconnect(client) {
        this.logger.log(`Websocket Client Disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Websocket Client Connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('msgToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], NotificationsGateway.prototype, "handleMessage", null);
NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], NotificationsGateway);
exports.NotificationsGateway = NotificationsGateway;
//# sourceMappingURL=notifications.gateway.js.map