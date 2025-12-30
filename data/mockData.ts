import { Machine, Alert, SensorData } from '@/types/types';

export const machines: Machine[] = [
    {
        id: 1,
        name: 'Machine 1',
        health: 95,
        status: 'running',
        voltage: {
            label: 'Voltage',
            value: 220,
            unit: 'V',
            status: 'normal',
            min: 0,
            max: 250
        },
        temperature: {
            label: 'Temperature',
            value: 45,
            unit: '°C',
            status: 'normal',
            min: 0,
            max: 100
        },
        vibration: {
            label: 'Vibration',
            value: 3.2,
            unit: 'mm/s',
            status: 'normal',
            min: 0,
            max: 10
        },
        current: {
            label: 'Current',
            value: 12.5,
            unit: 'A',
            status: 'normal',
            min: 0,
            max: 25
        }
    },
    {
        id: 2,
        name: 'Machine 2',
        health: 82,
        status: 'running',
        voltage: {
            label: 'Voltage',
            value: 215,
            unit: 'V',
            status: 'normal',
            min: 0,
            max: 250
        },
        temperature: {
            label: 'Temperature',
            value: 52,
            unit: '°C',
            status: 'normal',
            min: 0,
            max: 100
        },
        vibration: {
            label: 'Vibration',
            value: 4.1,
            unit: 'mm/s',
            status: 'normal',
            min: 0,
            max: 10
        },
        current: {
            label: 'Current',
            value: 14.2,
            unit: 'A',
            status: 'normal',
            min: 0,
            max: 25
        }
    },
    {
        id: 3,
        name: 'Machine 3',
        health: 72,
        status: 'warning',
        voltage: {
            label: 'Voltage',
            value: 210,
            unit: 'V',
            status: 'normal',
            min: 0,
            max: 250
        },
        temperature: {
            label: 'Temperature',
            value: 78,
            unit: '°C',
            status: 'warning',
            min: 0,
            max: 100
        },
        vibration: {
            label: 'Vibration',
            value: 6.8,
            unit: 'mm/s',
            status: 'warning',
            min: 0,
            max: 10
        },
        current: {
            label: 'Current',
            value: 16.8,
            unit: 'A',
            status: 'normal',
            min: 0,
            max: 25
        }
    },
    {
        id: 4,
        name: 'Machine 4',
        health: 58,
        status: 'fault',
        voltage: {
            label: 'Voltage',
            value: 185,
            unit: 'V',
            status: 'warning',
            min: 0,
            max: 250
        },
        temperature: {
            label: 'Temperature',
            value: 92,
            unit: '°C',
            status: 'fault',
            min: 0,
            max: 100
        },
        vibration: {
            label: 'Vibration',
            value: 8.5,
            unit: 'mm/s',
            status: 'fault',
            min: 0,
            max: 10
        },
        current: {
            label: 'Current',
            value: 19.2,
            unit: 'A',
            status: 'warning',
            min: 0,
            max: 25
        }
    },
    {
        id: 5,
        name: 'Machine 5',
        health: 64,
        status: 'fault',
        voltage: {
            label: 'Voltage',
            value: 195,
            unit: 'V',
            status: 'warning',
            min: 0,
            max: 250
        },
        temperature: {
            label: 'Temperature',
            value: 88,
            unit: '°C',
            status: 'fault',
            min: 0,
            max: 100
        },
        vibration: {
            label: 'Vibration',
            value: 7.9,
            unit: 'mm/s',
            status: 'fault',
            min: 0,
            max: 10
        },
        current: {
            label: 'Current',
            value: 18.5,
            unit: 'A',
            status: 'warning',
            min: 0,
            max: 25
        }
    }
];

export const alerts: Alert[] = [
    {
        id: 1,
        title: 'Overheating',
        time: '5 min ago',
        severity: 'critical'
    },
    {
        id: 2,
        title: 'Vibration above threshold',
        time: '1 hour ago',
        severity: 'warning'
    },
    {
        id: 3,
        title: 'High temperature',
        time: '2 hours ago',
        severity: 'warning'
    }
];

export const sensorData: SensorData[] = [
    // Machine 1 - Normal operation
    { time: '12:00', temperature: 45, vibration: 3.2, voltage: 220, current: 12.5, machineId: 1 },
    { time: '12:30', temperature: 46, vibration: 3.3, voltage: 219, current: 12.6, machineId: 1 },
    { time: '13:00', temperature: 45, vibration: 3.1, voltage: 221, current: 12.4, machineId: 1 },
    { time: '13:30', temperature: 47, vibration: 3.4, voltage: 220, current: 12.7, machineId: 1 },
    { time: '14:00', temperature: 46, vibration: 3.2, voltage: 220, current: 12.5, machineId: 1 },
    { time: '14:30', temperature: 45, vibration: 3.3, voltage: 219, current: 12.6, machineId: 1 },
    { time: '15:00', temperature: 46, vibration: 3.2, voltage: 220, current: 12.5, machineId: 1 },

    // Machine 2 - Normal operation
    { time: '12:00', temperature: 50, vibration: 4.0, voltage: 215, current: 14.0, machineId: 2 },
    { time: '12:30', temperature: 51, vibration: 4.1, voltage: 214, current: 14.1, machineId: 2 },
    { time: '13:00', temperature: 52, vibration: 4.2, voltage: 215, current: 14.2, machineId: 2 },
    { time: '13:30', temperature: 51, vibration: 4.0, voltage: 216, current: 14.0, machineId: 2 },
    { time: '14:00', temperature: 52, vibration: 4.1, voltage: 215, current: 14.2, machineId: 2 },
    { time: '14:30', temperature: 51, vibration: 4.0, voltage: 215, current: 14.1, machineId: 2 },
    { time: '15:00', temperature: 52, vibration: 4.1, voltage: 215, current: 14.2, machineId: 2 },

    // Machine 3 - Warning levels
    { time: '12:00', temperature: 70, vibration: 6.0, voltage: 212, current: 16.0, machineId: 3 },
    { time: '12:30', temperature: 72, vibration: 6.3, voltage: 211, current: 16.3, machineId: 3 },
    { time: '13:00', temperature: 74, vibration: 6.5, voltage: 210, current: 16.5, machineId: 3 },
    { time: '13:30', temperature: 76, vibration: 6.7, voltage: 211, current: 16.7, machineId: 3 },
    { time: '14:00', temperature: 78, vibration: 6.8, voltage: 210, current: 16.8, machineId: 3 },
    { time: '14:30', temperature: 77, vibration: 6.6, voltage: 210, current: 16.6, machineId: 3 },
    { time: '15:00', temperature: 78, vibration: 6.8, voltage: 210, current: 16.8, machineId: 3 },

    // Machine 4 - Fault levels
    { time: '12:00', temperature: 85, vibration: 7.8, voltage: 190, current: 18.5, machineId: 4 },
    { time: '12:30', temperature: 87, vibration: 8.0, voltage: 188, current: 18.8, machineId: 4 },
    { time: '13:00', temperature: 89, vibration: 8.2, voltage: 187, current: 19.0, machineId: 4 },
    { time: '13:30', temperature: 91, vibration: 8.4, voltage: 186, current: 19.1, machineId: 4 },
    { time: '14:00', temperature: 92, vibration: 8.5, voltage: 185, current: 19.2, machineId: 4 },
    { time: '14:30', temperature: 91, vibration: 8.3, voltage: 186, current: 19.0, machineId: 4 },
    { time: '15:00', temperature: 92, vibration: 8.5, voltage: 185, current: 19.2, machineId: 4 },

    // Machine 5 - Fault levels
    { time: '12:00', temperature: 82, vibration: 7.5, voltage: 198, current: 18.0, machineId: 5 },
    { time: '12:30', temperature: 84, vibration: 7.6, voltage: 197, current: 18.2, machineId: 5 },
    { time: '13:00', temperature: 86, vibration: 7.8, voltage: 196, current: 18.4, machineId: 5 },
    { time: '13:30', temperature: 87, vibration: 7.9, voltage: 195, current: 18.5, machineId: 5 },
    { time: '14:00', temperature: 88, vibration: 7.9, voltage: 195, current: 18.5, machineId: 5 },
    { time: '14:30', temperature: 87, vibration: 7.8, voltage: 196, current: 18.4, machineId: 5 },
    { time: '15:00', temperature: 88, vibration: 7.9, voltage: 195, current: 18.5, machineId: 5 }
];
