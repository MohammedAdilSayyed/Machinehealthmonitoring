'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, User } from 'lucide-react';
import AlertsPanel from './AlertsPanel';
import { alerts } from '@/data/mockData';
import styles from './Header.module.css';

export default function Header() {
    const [showAlerts, setShowAlerts] = useState(false);
    const alertsRef = useRef<HTMLDivElement>(null);

    // Close alerts when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
                setShowAlerts(false);
            }
        }

        if (showAlerts) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAlerts]);

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Machine Health Monitoring</h1>
            <div className={styles.actions}>
                <div className={styles.notificationContainer} ref={alertsRef}>
                    <button
                        className={`${styles.iconButton} ${showAlerts ? styles.active : ''}`}
                        aria-label="Notifications"
                        onClick={() => setShowAlerts(!showAlerts)}
                    >
                        <Bell size={20} />
                        {alerts.length > 0 && (
                            <span className={styles.badge}>{alerts.length}</span>
                        )}
                    </button>
                    {showAlerts && (
                        <div className={styles.alertsDropdown}>
                            <AlertsPanel alerts={alerts} />
                        </div>
                    )}
                </div>
                <button className={styles.iconButton} aria-label="User Profile">
                    <User size={20} />
                </button>
            </div>
        </header>
    );
}
