import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private _hubConnection: signalR.HubConnection;
  private listeners: { [key: string]: (user: string, message: string) => void } = {};

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
    const listenerId = this._generateListenerId(callback);
    this.listeners[listenerId] = callback;
    this._hubConnection.on('ReceiveMessage', callback);
  }

  /**
   * RemoveReceiveMessageListener.
   * @param callback Callback.
   */
  public removeReceiveMessageListener(callback: (user: string, message: string) => void): void {
    const listenerId = this._generateListenerId(callback);
    if (this.listeners[listenerId]) {
      this._hubConnection.off('ReceiveMessage', this.listeners[listenerId]);
      delete this.listeners[listenerId];
    }
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

  /**
   * GenerateListenerId.
   * @param callback Callback.
   * @returns ListenerId.
   */
  private _generateListenerId(callback: (user: string, message: string) => void): string {
    return callback.toString();
  }
}
