'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { SensorData } from '@/types/types';
import styles from './SensorChart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface SensorChartProps {
    data: SensorData[];
    machineId: number;
}

export default function SensorChart({ data, machineId }: SensorChartProps) {
    // Filter data for selected machine
    const machineData = data.filter(d => d.machineId === machineId);

    const chartData = {
        labels: machineData.map(d => d.time),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: machineData.map(d => d.temperature),
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
            {
                label: 'Vibration (mm/s)',
                data: machineData.map(d => d.vibration),
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
            {
                label: 'Voltage (V)',
                data: machineData.map(d => d.voltage),
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                align: 'start' as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'line',
                    padding: 20,
                    font: {
                        size: 13,
                        family: 'Inter, sans-serif',
                    },
                },
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
                titleFont: {
                    size: 13,
                    family: 'Inter, sans-serif',
                },
                bodyFont: {
                    size: 12,
                    family: 'Inter, sans-serif',
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 11,
                        family: 'Inter, sans-serif',
                    },
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    color: '#E5E7EB',
                },
                ticks: {
                    font: {
                        size: 11,
                        family: 'Inter, sans-serif',
                    },
                },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    };

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.title}>Live Sensor Trends</h3>
            <div className={styles.chart}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
