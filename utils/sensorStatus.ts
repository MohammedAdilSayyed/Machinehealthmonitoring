import { SensorReading } from '@/types/types';
import { THINGSBOARD_CONFIG } from '@/config/thingsboard.config';

type SensorType = 'temperature' | 'voltage' | 'vibration';

/**
 * Determines the status of a sensor based on its value and thresholds
 */
export function determineSensorStatus(
    value: number,
    sensorType: SensorType
): 'normal' | 'warning' | 'fault' {
    const thresholds = THINGSBOARD_CONFIG.thresholds[sensorType];

    if (!thresholds) {
        return 'normal';
    }

    // Check for fault condition
    if (value >= thresholds.fault.min && value <= thresholds.fault.max) {
        // Special case: voltage fault is outside the warning range
        if (sensorType === 'voltage') {
            if (value < thresholds.warning.min || value > thresholds.warning.max) {
                return 'fault';
            }
        } else if (value >= thresholds.fault.min) {
            return 'fault';
        }
    }

    // Check for warning condition
    if (value >= thresholds.warning.min && value <= thresholds.warning.max) {
        // For voltage, warning is when outside normal but not fault
        if (sensorType === 'voltage') {
            if (value < thresholds.normal.min || value > thresholds.normal.max) {
                return 'warning';
            }
        } else if (value >= thresholds.warning.min) {
            return 'warning';
        }
    }

    // Check for normal condition
    if (value >= thresholds.normal.min && value <= thresholds.normal.max) {
        return 'normal';
    }

    // Default to warning if outside all defined ranges
    return 'warning';
}

/**
 * Converts raw telemetry value to SensorReading format
 */
export function createSensorReading(
    label: string,
    value: number,
    unit: string,
    sensorType: SensorType,
    min: number = 0,
    max: number = 100
): SensorReading {
    return {
        label,
        value,
        unit,
        status: determineSensorStatus(value, sensorType),
        min,
        max,
    };
}
