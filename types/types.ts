export interface Machine {
  id: number;
  name: string;
  health: number;
  status: 'running' | 'warning' | 'fault';
  metrics: {
    label: string;
    value: string;
  }[];
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
}

export interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
}
