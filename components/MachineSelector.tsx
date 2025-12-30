'use client';

import { useState, useRef, useEffect } from 'react';
import { Machine } from '@/types/types';
import { ChevronDown } from 'lucide-react';
import styles from './MachineSelector.module.css';

interface MachineSelectorProps {
    machines: Machine[];
    selectedMachine: Machine;
    onSelectMachine: (machine: Machine) => void;
}

export default function MachineSelector({ machines, selectedMachine, onSelectMachine }: MachineSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getStatusColor = (status: string) => {
        if (status === 'running') return '#10B981';
        if (status === 'warning') return '#F59E0B';
        return '#EF4444';
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <label className={styles.label}>Select Machine</label>
            <button
                className={styles.selector}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className={styles.selectedMachine}>
                    <div
                        className={styles.statusDot}
                        style={{ backgroundColor: getStatusColor(selectedMachine.status) }}
                    />
                    <span className={styles.machineName}>{selectedMachine.name}</span>
                    <span className={styles.machineHealth}>({selectedMachine.health}% health)</span>
                </div>
                <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {machines.map((machine) => (
                        <button
                            key={machine.id}
                            className={`${styles.option} ${machine.id === selectedMachine.id ? styles.optionActive : ''}`}
                            onClick={() => {
                                onSelectMachine(machine);
                                setIsOpen(false);
                            }}
                        >
                            <div
                                className={styles.statusDot}
                                style={{ backgroundColor: getStatusColor(machine.status) }}
                            />
                            <span className={styles.machineName}>{machine.name}</span>
                            <span className={styles.machineHealth}>({machine.health}%)</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
