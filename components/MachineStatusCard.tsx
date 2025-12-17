'use client';

import { Machine } from '@/types/types';
import { Circle, AlertTriangle } from 'lucide-react';
import styles from './MachineStatusCard.module.css';

interface MachineStatusCardProps {
    machine: Machine;
}

export default function MachineStatusCard({ machine }: MachineStatusCardProps) {
    const getStatusColor = () => {
        if (machine.status === 'running') return '#4CAF50';
        if (machine.status === 'warning') return '#FFC107';
        return '#F44336';
    };

    const getStatusIcon = () => {
        if (machine.status === 'running') return <Circle size={14} />;
        if (machine.status === 'warning') return <AlertTriangle size={14} />;
        return <Circle size={14} />;
    };

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (machine.health / 100) * circumference;

    return (
        <div className={styles.card}>
            <h4 className={styles.machineName}>{machine.name}</h4>

            <div className={styles.progressContainer}>
                <svg className={styles.progressRing} width="120" height="120">
                    <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke={getStatusColor()}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className={styles.progressCircle}
                    />
                </svg>
                <div className={styles.percentage} style={{ color: getStatusColor() }}>
                    {machine.health}%
                </div>
            </div>

            <div className={styles.metrics}>
                {machine.metrics.map((metric, index) => (
                    <div key={index} className={styles.metric}>
                        {getStatusIcon()}
                        <span>{metric.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
