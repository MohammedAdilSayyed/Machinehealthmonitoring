export interface SensorReading {
  label: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'fault';
  min: number;
  max: number;
}

export interface Machine {
  id: number;
  name: string;
  health: number;
  status: 'running' | 'warning' | 'fault';
  voltage: SensorReading;
  temperature: SensorReading;
  vibration: SensorReading;
  current: SensorReading;
}

export interface Alert {
  id: number;
  title: string;
  time: string;
  severity: 'critical' | 'warning';
}

export interface SensorData {
  time: string;
  temperature: number;
  vibration: number;
  voltage: number;
  current: number;
  machineId: number;
}

export interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
}
