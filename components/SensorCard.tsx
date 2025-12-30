'use client';

import { SensorReading } from '@/types/types';
import styles from './SensorCard.module.css';

interface SensorCardProps {
    sensor: SensorReading;
}

export default function SensorCard({ sensor }: SensorCardProps) {
    const getStatusColor = () => {
        if (sensor.status === 'normal') return '#10B981'; // Green
        if (sensor.status === 'warning') return '#F59E0B'; // Yellow
        return '#EF4444'; // Red
    };

    const getStatusText = () => {
        if (sensor.status === 'normal') return 'Normal';
        if (sensor.status === 'warning') return 'Warning';
        return 'Fault';
    };

    // Calculate percentage for gauge
    const percentage = ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100;

    // SVG gauge parameters
    const size = 160;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.label}>{sensor.label}</h3>
                <span
                    className={styles.status}
                    style={{ color: getStatusColor() }}
                >
                    {getStatusText()}
                </span>
            </div>

            <div className={styles.gaugeContainer}>
                <svg width={size} height={size} className={styles.gauge}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={getStatusColor()}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className={styles.progressCircle}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                <div className={styles.valueContainer}>
                    <div className={styles.value} style={{ color: getStatusColor() }}>
                        {sensor.value}
                    </div>
                    <div className={styles.unit}>{sensor.unit}</div>
                </div>
            </div>
        </div>
    );
}
