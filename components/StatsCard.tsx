import { StatsCardProps } from '@/types/types';
import styles from './StatsCard.module.css';

export default function StatsCard({ icon, title, value, bgColor }: StatsCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper} style={{ background: bgColor }}>
                {icon}
            </div>
            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                <h3 className={styles.value}>{value}</h3>
            </div>
        </div>
    );
}
