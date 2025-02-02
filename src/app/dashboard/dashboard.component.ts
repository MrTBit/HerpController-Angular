import { Component } from '@angular/core';
import {SignalrService} from '../services/signalr.service';
import {HerpControllerDataService} from '../services/herpcontrollerdata.service';
import {DeviceModel} from '../models/devicemodel';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private _devices: DeviceModel[] = [];

  constructor(public signalRService: SignalrService, public dataService: HerpControllerDataService) {
  }


  ngOnInit(): void {
    this.dataService.getAllDevices().subscribe(devices => {
      this._devices = devices;
    });
  }
}
