import {Component, EventEmitter, input, OnInit, Output} from '@angular/core';
import {SensorModel} from '../models/sensormodel';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HerpControllerDataService} from '../services/herpcontrollerdata.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-sensorapiconfig',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './sensorapiconfig.component.html',
  styleUrl: './sensorapiconfig.component.scss'
})
export class SensorApiConfigComponent implements OnInit {
  sensor = input.required<SensorModel>();

  @Output() sensorUpdatedEvent = new EventEmitter<SensorModel>();

  sensorForm?: FormGroup;

  constructor(private dataService: HerpControllerDataService) {
  }

  ngOnInit() {
    this.sensorForm = new FormGroup({
      name: new FormControl(this.sensor().name, {nonNullable: true}),
      minTemp: new FormControl(this.sensor().minimumTemperature),
      maxTemp: new FormControl(this.sensor().maximumTemperature),
      minHumidity: new FormControl(this.sensor().minimumHumidity),
      maxHumidity: new FormControl(this.sensor().maximumHumidity)
    });
  }

  onSubmit() {
    const formValue = this.sensorForm!.value as SensorModel;
    formValue.id = this.sensor().id;

    this.dataService.updateSensor(formValue).subscribe(sensorModel => this.sensorUpdatedEvent.emit(sensorModel));
  }
}
