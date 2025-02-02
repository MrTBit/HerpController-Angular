import {Component, Input, OnInit} from '@angular/core';
import {HerpControllerDataService} from '../services/herpcontrollerdata.service';
import {DeviceModel} from '../models/devicemodel';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {SensorApiConfigComponent} from '../sensorapiconfig/sensorapiconfig.component';
import {MatButton} from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {SensorType} from '../enums/sensortype';
import {SensorModel} from '../models/sensormodel';

@Component({
  selector: 'app-deviceapiconfig',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    SensorApiConfigComponent,
    MatButton,
    MatAccordion,
    MatExpansionModule
  ],
  templateUrl: './deviceapiconfig.component.html',
  styleUrl: './deviceapiconfig.component.scss'
})
export class DeviceApiConfigComponent implements OnInit {

  @Input()
  set id(deviceId: number) {
    this.deviceId = deviceId;
  }

  private deviceId?: number;

  device?: DeviceModel;
  deviceForm?: FormGroup;

  constructor(private dataService: HerpControllerDataService) {
  }

  ngOnInit() {
    if (this.deviceId) {
      this.loadDevice(this.deviceId);
    }
  }

  private loadDevice(deviceId: number) {
    this.dataService.getDevicesByIds([deviceId]).subscribe(
      (devices: DeviceModel[]) => {
        this.device = devices[0];
        this.deviceForm = new FormGroup({
          deviceName: new FormControl(this.device.name, {nonNullable: true})
        });
      });
  }

  onSubmit() {
    const formValue = this.deviceForm!.getRawValue();
    const updatedDevice = structuredClone(this.device!);
    updatedDevice.name = formValue.deviceName;
    updatedDevice.sensors = [];

    this.dataService.updateDeviceApiConfig(updatedDevice).subscribe(_ => this.loadDevice(this.deviceId!));
  }

  onSensorUpdated(model: SensorModel) {
    const sensorToUpdate = this.device?.sensors?.find(s => s.id === model.id);
    if (sensorToUpdate) {
      sensorToUpdate.name = model.name;
    }
  }

  protected readonly SensorType = SensorType;
}
