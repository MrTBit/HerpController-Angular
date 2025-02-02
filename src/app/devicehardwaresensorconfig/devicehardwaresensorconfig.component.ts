import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DhtSensorType} from '../enums/dhtsensortype';
import {DeviceConfigDhtSensorModel} from '../models/deviceconfigmodel';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-devicehardwaresensorconfig',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './devicehardwaresensorconfig.component.html',
  styleUrl: './devicehardwaresensorconfig.component.scss'
})
export class DeviceHardwareSensorConfigComponent {
  deviceSensorForm = new FormGroup({
    pin: new FormControl(0, {nonNullable: true}),
    type: new FormControl(DhtSensorType.DHT22, {nonNullable: true})
  });

  getFormValue(): DeviceConfigDhtSensorModel {
    return this.deviceSensorForm.value as DeviceConfigDhtSensorModel;
  }

  protected readonly DhtSensorType = DhtSensorType;
}
