import StatsCard from '@/components/StatsCard';
import MachineStatusCard from '@/components/MachineStatusCard';
import SensorChart from '@/components/SensorChart';
import { machines, sensorData } from '@/data/mockData';
import { BarChart3, Play, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const totalMachines = machines.length;
  const runningMachines = machines.filter(m => m.status === 'running').length;
  const idleMachines = machines.filter(m => m.status === 'fault').length;

  return (
    <div className={styles.container}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatsCard
          icon={<BarChart3 size={24} />}
          title="Total Machines"
          value={totalMachines}
          bgColor="#4A90E2"
        />
        <StatsCard
          icon={<Play size={24} />}
          title="Running"
          value={runningMachines}
          bgColor="#4CAF50"
        />
        <StatsCard
          icon={<Clock size={24} />}
          title="Idle"
          value={idleMachines}
          bgColor="#FFC107"
        />
      </div>

      {/* Machine Status Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Machine Status</h2>
        <div className={styles.machineGrid}>
          {machines.map((machine) => (
            <MachineStatusCard key={machine.id} machine={machine} />
          ))}
        </div>
      </div>

      {/* Live Sensor Trends */}
      <div className={styles.section}>
        <SensorChart data={sensorData} />
      </div>
    </div>
  );
}
