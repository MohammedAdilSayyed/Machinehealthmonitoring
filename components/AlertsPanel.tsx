'use client';

import { Alert } from '@/types/types';
import { AlertCircle } from 'lucide-react';
import styles from './AlertsPanel.module.css';

interface AlertsPanelProps {
    alerts: Alert[];
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
    return (
        <div className={styles.panel}>
            <h3 className={styles.title}>Alerts</h3>
            <div className={styles.alertsList}>
                {alerts.map((alert) => (
                    <div key={alert.id} className={styles.alertItem}>
                        <div
                            className={styles.alertIcon}
                            style={{
                                background: alert.severity === 'critical' ? '#FFEBEE' : '#FFF9C4',
                                color: alert.severity === 'critical' ? '#F44336' : '#FFC107'
                            }}
                        >
                            <AlertCircle size={18} />
                        </div>
                        <div className={styles.alertContent}>
                            <p className={styles.alertTitle}>{alert.title}</p>
                            <p className={styles.alertTime}>{alert.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
