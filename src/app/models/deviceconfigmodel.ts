import {DhtSensorType} from '../enums/dhtsensortype';
import {DeviceTimerType} from '../enums/devicetimertype';

export interface DeviceConfigModel {
  dhtSensors?: DeviceConfigDhtSensorModel[];
  timers?: DeviceConfigTimerModel[];
  oneWirePin?: number;
}

export interface DeviceConfigDhtSensorModel {
  pin: number;
  type: DhtSensorType;
}

export interface DeviceConfigTimerModel {
  pin: number;
  start: number;
  end: number;
  type: DeviceTimerType;
}
