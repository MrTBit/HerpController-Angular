import {Component, input} from '@angular/core';
import {SensorModel} from '../models/sensormodel';
import {SignalrService} from '../services/signalr.service';
import {SensorType} from '../enums/sensortype';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-realtimesensor',
  imports: [
    DecimalPipe
  ],
  templateUrl: './realtimesensor.component.html',
  styleUrl: './realtimesensor.component.scss'
})
export class RealTimeSensorComponent {
  protected readonly SensorType = SensorType;

  deviceId = input.required<number>();
  sensor = input.required<SensorModel>();

  temp?: number;
  humidity?: number;

  constructor(private signalRService: SignalrService) {
    signalRService.sensorDataSubject.subscribe(data => {
      if (data.DeviceId !== this.deviceId()) {
        return;
      }

      const sensorData = data.SensorData.find(sd => sd.SensorId === this.sensor().id);

      if (sensorData) {
        this.temp = sensorData.Temperature;
        this.humidity = sensorData.Humidity;
      }
    });
  }
}
