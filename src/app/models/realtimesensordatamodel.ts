export interface RealTimeSensorData {
  deviceId: number;
  SensorData: RealTimeSensorReading[]
}

export interface RealTimeSensorReading {
  SensorId: number;
  Temperature: number;
  Humidity?: number;
}
