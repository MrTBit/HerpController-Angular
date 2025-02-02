import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {MessagePackHubProtocol} from '@microsoft/signalr-protocol-msgpack';
import {RealTimeSensorData} from '../models/realtimesensordatamodel';
import {Subject} from 'rxjs';
import {BASE_URL} from '../const/constants';
import {AuthService} from './auth.service';
import {DeviceConfigModel} from '../models/deviceconfigmodel';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public readonly sensorDataSubject = new Subject<RealTimeSensorData>();
  public readonly deviceConfigSubject = new Subject<SignalRDeviceConfigModel>();

  private hubConnection?: HubConnection;
  private deviceCommandConnection?: HubConnection;
  private connectionUrl = `${BASE_URL}/sensorData`;
  private deviceCommandConnectionUrl = `${BASE_URL}/deviceCommands`;

  constructor(private authService: AuthService) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public connectAuthed = () => {
    this.startAuthedConnection();
    this.addDeviceCommandListeners();
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      //  .configureLogging(LogLevel.Trace)
      .build();
  }

  private getAuthedConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.deviceCommandConnectionUrl, {headers: {'Authorization': `Bearer ${this.authService.getToken()}`}})
      .withHubProtocol(new MessagePackHubProtocol())
      .build();
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err));
  }

  private startAuthedConnection() {
    this.deviceCommandConnection = this.getAuthedConnection();

    this.deviceCommandConnection.start()
      .then(() => console.log('device command connection started, state: ' + this.deviceCommandConnection?.state))
      .catch((err) => console.log('error while establishing signalr device command connection: ' + err))
  }

  private addListeners() {
    this.hubConnection?.on("ReceivedRealTimeSensorData", (data: RealTimeSensorData) => {
      this.sensorDataSubject.next(data);
    });
  }

  private addDeviceCommandListeners() {
    this.deviceCommandConnection?.on("DeviceConfigResponse", (deviceId: number, configModel: DeviceConfigModel) => {
      this.deviceConfigSubject.next({deviceId: deviceId, configModel: configModel});
    })
  }
}

export interface SignalRDeviceConfigModel {
  deviceId: number;
  configModel: DeviceConfigModel;
}
