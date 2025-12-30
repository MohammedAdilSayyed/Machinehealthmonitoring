import { THINGSBOARD_CONFIG } from '@/config/thingsboard.config';

export interface LatestTelemetry {
    temperature?: number;
    voltage?: number;
    vibration?: number;
}

/**
 * Fetches the latest telemetry data from our Next.js API Proxy
 */
export async function fetchLatestTelemetry(): Promise<LatestTelemetry> {
    const { telemetryKeys, useMockDataOnError } = THINGSBOARD_CONFIG;

    try {
        const response = await fetch('/api/thingsboard');

        if (!response.ok) {
            throw new Error(`Failed to fetch from proxy: ${response.status}`);
        }

        const data = await response.json();
        const telData = data.telemetry;
        const latestData: LatestTelemetry = {};

        if (telData) {
            Object.keys(telemetryKeys).forEach((key) => {
                const tbKey = (telemetryKeys as any)[key];
                // REST API returns an array for each key: { "key": [{ "ts": ..., "value": "..." }] }
                if (telData[tbKey] && telData[tbKey].length > 0) {
                    const latestEntry = telData[tbKey][0];
                    latestData[key as keyof LatestTelemetry] = Number(latestEntry.value);
                }
            });
        }

        // Return real data if found
        if (Object.keys(latestData).length > 0) {
            return latestData;
        }

        return { temperature: 0, voltage: 0, vibration: 0 };
    } catch (error) {
        console.error('[Service Error]:', error);
        if (useMockDataOnError) {
            return { temperature: 0, voltage: 0, vibration: 0 };
        }
        throw error;
    }
}

/**
 * Fetches historical telemetry data for the graph
 */
export async function fetchSensorHistory(): Promise<any[]> {
    try {
        const response = await fetch('/api/thingsboard?history=true');

        if (!response.ok) {
            throw new Error(`Failed to fetch history: ${response.status}`);
        }

        const data = await response.json();
        const telData = data.telemetry;

        if (!telData) return [];

        // ThingsBoard returns: { "temp": [{ts: 1, value: 2}, ...], "volt": [...] }
        // We need to transform it to: [{ time: "10:00", temp: 2, volt: 3 ... }, ...]

        // 1. Get all unique timestamps across all sensors
        const allTimestamps = new Set<number>();
        Object.values(telData).forEach((entries: any) => {
            if (Array.isArray(entries)) {
                entries.forEach((e: any) => allTimestamps.add(e.ts));
            }
        });

        // 2. Sort timestamps and build the array
        const sortedTs = Array.from(allTimestamps).sort((a, b) => a - b);

        return sortedTs.map(ts => {
            const date = new Date(ts);
            const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const entry: any = {
                time: timeStr,
                machineId: 1 // Focusing on Machine 1
            };

            // Map each sensor value if available for this timestamp
            Object.keys(THINGSBOARD_CONFIG.telemetryKeys).forEach(key => {
                const tbKey = (THINGSBOARD_CONFIG.telemetryKeys as any)[key];
                const match = telData[tbKey]?.find((e: any) => e.ts === ts);
                if (match) {
                    entry[key] = Number(match.value);
                }
            });

            return entry;
        });
    } catch (error) {
        console.error('[History Service Error]:', error);
        return [];
    }
}
