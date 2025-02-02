import {Component, OnInit} from '@angular/core';
import {HerpControllerDataService} from '../services/herpcontrollerdata.service';
import {DeviceModel} from '../models/devicemodel';
import {RealtimedeviceComponent} from '../realtimedevice/realtimedevice.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RealtimedeviceComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  devices: DeviceModel[] = [];

  constructor(private dataService: HerpControllerDataService) {
  }

  ngOnInit(): void {
    this.dataService.getAllDevices().subscribe(devices => {
      this.devices = devices;
    });
  }
}
