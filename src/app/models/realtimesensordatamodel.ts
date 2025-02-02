export interface RealTimeSensorData {
  DeviceId: number;
  SensorData: RealTimeSensorReading[]
}

export interface RealTimeSensorReading {
  SensorId: number;
  Temperature: number;
  Humidity?: number;
}
