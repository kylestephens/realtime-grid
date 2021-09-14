import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private socket: Socket,
    private http: HttpClient
  ) {
  }

  public getNotifications() {
    return this.http.get(`${this.apiUrl}/notifications`);
  }

  public receiveGridUpdates(gridId: number) {
    return this.socket.fromEvent(`gridUpdate:${gridId}`);
  }

  public receiveNotifications() {
    return this.socket.fromEvent('notification');
  }

}
