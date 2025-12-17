import { Machine, Alert, SensorData } from '@/types/types';

export const machines: Machine[] = [
    {
        id: 1,
        name: 'Machine 1',
        health: 95,
        status: 'running',
        metrics: [
            { label: 'Running', value: '' },
            { label: 'Vibration', value: '' }
        ]
    },
    {
        id: 2,
        name: 'Machine 2',
        health: 82,
        status: 'running',
        metrics: [
            { label: 'Running', value: '' },
            { label: 'Vibration', value: '' }
        ]
    },
    {
        id: 3,
        name: 'Machine 3',
        health: 92,
        status: 'warning',
        metrics: [
            { label: 'Warning', value: '' },
            { label: 'Current A', value: '' }
        ]
    },
    {
        id: 4,
        name: 'Machine 4',
        health: 92,
        status: 'fault',
        metrics: [
            { label: 'Fault', value: '' },
            { label: 'Current A', value: '' }
        ]
    },
    {
        id: 5,
        name: 'Machine 5',
        health: 64,
        status: 'fault',
        metrics: [
            { label: 'Fault', value: '' },
            { label: 'Current A', value: '' }
        ]
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
    { time: '12:00', temperature: 6.5, vibration: 5.0, voltage: 4.2 },
    { time: '12:30', temperature: 6.3, vibration: 5.2, voltage: 4.1 },
    { time: '13:00', temperature: 6.8, vibration: 5.1, voltage: 4.0 },
    { time: '13:30', temperature: 6.6, vibration: 5.3, voltage: 4.2 },
    { time: '14:00', temperature: 6.5, vibration: 5.0, voltage: 4.3 },
    { time: '14:30', temperature: 6.4, vibration: 5.2, voltage: 4.4 },
    { time: '15:00', temperature: 7.2, vibration: 6.8, voltage: 5.0 },
    { time: '15:30', temperature: 6.8, vibration: 6.5, voltage: 5.2 },
    { time: '16:00', temperature: 8.5, vibration: 7.5, voltage: 5.1 },
    { time: '16:30', temperature: 7.8, vibration: 7.2, voltage: 5.0 },
    { time: '17:00', temperature: 7.5, vibration: 6.8, voltage: 4.9 },
    { time: '17:30', temperature: 8.2, vibration: 7.0, voltage: 5.0 },
    { time: '18:00', temperature: 7.8, vibration: 6.9, voltage: 4.8 },
    { time: '18:30', temperature: 7.3, vibration: 6.7, voltage: 4.9 },
    { time: '19:00', temperature: 7.0, vibration: 6.5, voltage: 5.0 }
];
