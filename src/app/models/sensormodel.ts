import {SensorType} from '../enums/sensortype';
import {BaseModel} from './basemodel';

export interface SensorModel extends BaseModel {
  hardwareId: string;
  name: string;
  type: SensorType;
  minimumTemperature?: number;
  maximumTemperature?: number;
  minimumHumidity?: number;
  maximumHumidity?: number;
}
