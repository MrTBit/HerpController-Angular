import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeviceModel} from '../models/devicemodel';
import {BASE_URL} from '../const/constants';
import {SensorModel} from '../models/sensormodel';

@Injectable({
  providedIn: 'root'
})
export class HerpControllerDataService {
  constructor(private http: HttpClient) {
  }

  getAllDevices() {
    return this.http.get<DeviceModel[]>(`${BASE_URL}/devices/all`);
  }

  getDevicesByIds(deviceIds: number[]) {
    return this.http.get<DeviceModel[]>(`${BASE_URL}/devices/by-id?ids=${deviceIds.join(',')}`)
  }

  updateDeviceApiConfig(device: DeviceModel) {
    return this.http.put<DeviceModel>(`${BASE_URL}/devices/${device.id}`, device);
  }

  updateSensor(sensor: SensorModel) {
    return this.http.put<SensorModel>(`${BASE_URL}/sensors/${sensor.id}`, sensor);
  }

  sendCurrentDeviceConfig(deviceId: number) {
    return this.http.post(`${BASE_URL}/device-commands/${deviceId}/4`, undefined);
  }
}
