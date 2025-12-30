'use client';

import { useState, useMemo } from 'react';
import MachineSelector from '@/components/MachineSelector';
import SensorCard from '@/components/SensorCard';
import SensorChart from '@/components/SensorChart';
import { machines, sensorData } from '@/data/mockData';
import { useThingsBoard } from '@/hooks/useThingsBoard';
import { createSensorReading } from '@/utils/sensorStatus';
import { Machine } from '@/types/types';
import { AlertCircle, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const [selectedMachine, setSelectedMachine] = useState(machines[0]);
  const { data: thingsBoardData, history: thingsBoardHistory, loading, error } = useThingsBoard();

  // Create Machine 1 with live ThingsBoard data
  const machine1WithLiveData: Machine = useMemo(() => {
    if (thingsBoardData && selectedMachine.id === 1) {
      return {
        ...machines[0],
        voltage: createSensorReading(
          'Voltage',
          thingsBoardData.voltage ?? machines[0].voltage.value,
          'V',
          'voltage',
          0,
          250
        ),
        temperature: createSensorReading(
          'Temperature',
          thingsBoardData.temperature ?? machines[0].temperature.value,
          '°C',
          'temperature',
          0,
          100
        ),
        vibration: createSensorReading(
          'Vibration',
          thingsBoardData.vibration ?? machines[0].vibration.value,
          'mm/s',
          'vibration',
          0,
          10
        ),
      };
    }
    return selectedMachine;
  }, [thingsBoardData, selectedMachine]);

  // Use live data for Machine 1, mock data for others
  const displayMachine = selectedMachine.id === 1 ? machine1WithLiveData : selectedMachine;

  // Use live history for Machine 1 if available
  const displayHistory = (selectedMachine.id === 1 && thingsBoardHistory.length > 0)
    ? thingsBoardHistory
    : sensorData;

  return (
    <div className={styles.container}>
      {/* Machine Selector */}
      <div className={styles.selectorSection}>
        <MachineSelector
          machines={machines}
          selectedMachine={selectedMachine}
          onSelectMachine={setSelectedMachine}
        />

        {/* Live data indicator for Machine 1 */}
        {selectedMachine.id === 1 && (
          <div className={styles.liveIndicator}>
            {loading ? (
              <div className={styles.loadingBadge}>
                <Loader2 size={14} className={styles.spinner} />
                <span>Connecting...</span>
              </div>
            ) : error ? (
              <div className={styles.errorBadge}>
                <AlertCircle size={14} />
                <span>Offline - Using cached data</span>
              </div>
            ) : (
              <div className={styles.liveBadge}>
                <span className={styles.liveDot}></span>
                <span>Live Data</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sensor Cards Grid */}
      <div className={styles.sensorGrid}>
        <SensorCard sensor={displayMachine.voltage} />
        <SensorCard sensor={displayMachine.temperature} />
        <SensorCard sensor={displayMachine.vibration} />
      </div>

      {/* Live Sensor Trends */}
      <div className={styles.chartSection}>
        <SensorChart data={displayHistory} machineId={selectedMachine.id} />
      </div>
    </div>
  );
}
