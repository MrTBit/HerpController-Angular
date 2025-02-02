import {BaseModel} from './basemodel';
import {SensorModel} from './sensormodel';

export interface DeviceModel extends BaseModel {
  hardwareId: string;
  name: string;
  sensors?: SensorModel[];
}
