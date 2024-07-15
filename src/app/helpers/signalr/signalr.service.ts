// src/app/services/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private _hubConnection: signalR.HubConnection;

  /**
   * Constructor.
   */
  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7095/chatHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this._startConnection();
  }

  /**
   * AddReceiveMessageListener.
   * @param callback Callback.
   */
  public addReceiveMessageListener(callback: (user: string, message: string) => void): void {
    this._hubConnection.on('ReceiveMessage', callback);
  }
  /**
   * SendMessage.
   * @param user User.
   * @param message Message.
   */
  public sendMessage(user: string, message: string): void {
    this._hubConnection.invoke('SendMessage', user, message).catch((err) => console.error(err));
  }
  /**
   * StartConnection.
   */
  private _startConnection(): void {
    this._hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) => console.log('Error while starting SignalR connection: ' + err));
  }
}
