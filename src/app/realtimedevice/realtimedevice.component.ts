import {Component, input} from '@angular/core';
import {DeviceModel} from '../models/devicemodel';
import {RealTimeSensorComponent} from '../realtimesensor/realtimesensor.component';

@Component({
  selector: 'app-realtimedevice',
  imports: [
    RealTimeSensorComponent
  ],
  templateUrl: './realtimedevice.component.html',
  styleUrl: './realtimedevice.component.scss'
})
export class RealtimedeviceComponent {
  device = input.required<DeviceModel>();
}
