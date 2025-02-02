import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HerpControllerDataService} from '../services/herpcontrollerdata.service';
import {DeviceConfigModel} from '../models/deviceconfigmodel';
import {SignalrService} from '../services/signalr.service';

@Component({
  selector: 'app-devicehardwareconfig',
  imports: [],
  templateUrl: './devicehardwareconfig.component.html',
  styleUrl: './devicehardwareconfig.component.scss'
})
export class DeviceHardwareConfigComponent implements OnInit {
  @Input()
  set id(deviceId: number) {
    this.deviceId = deviceId;
  }

  currentDeviceConfig?: DeviceConfigModel;

  private deviceId?: number;

  constructor(private dataService: HerpControllerDataService, private signalRService: SignalrService) {
  }

  ngOnInit() {
    //send get current device config command
    this.dataService.sendCurrentDeviceConfig(this.deviceId!).subscribe();

    this.signalRService.deviceConfigSubject.subscribe(data => {
      console.log('received device config data: ' + data);
      if (data.deviceId !== this.deviceId) {
        return;
      }

      this.currentDeviceConfig = data.configModel;
    })
  }

  deviceForm = new FormGroup({
    oneWirePin: new FormControl(0)
  });
}
