import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {MessagePackHubProtocol} from '@microsoft/signalr-protocol-msgpack';
import {RealTimeSensorData} from '../models/RealTimeSensorDataModel';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection?: HubConnection;
  private connectionUrl = 'https://service.mrtbit.com/sensorData';

  constructor() { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      //  .configureLogging(LogLevel.Trace)
      .build();
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err));
  }

  private addListeners() {
    this.hubConnection?.on("ReceivedRealTimeSensorData", (data: RealTimeSensorData) => {
      console.log("message received from Hub")
      console.log(data);
    });
  }
}
