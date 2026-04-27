import { THINGSPEAK_CONFIG } from '@/config/thingspeak.config';

export interface LatestTelemetry {
    temperature?: number;
    voltage?: number;
    vibration?: number;
}

/**
 * Fetches the latest telemetry data from ThingSpeak via our proxy
 */
export async function fetchLatestTelemetry(): Promise<LatestTelemetry> {
    const { fields, useMockDataOnError } = THINGSPEAK_CONFIG;

    try {
        const response = await fetch('/api/thingspeak?results=1');

        if (!response.ok) {
            throw new Error(`Failed to fetch from proxy: ${response.status}`);
        }

        const data = await response.json();
        const latestFeed = data.feeds?.[0];
        
        if (!latestFeed) {
            return { temperature: 0, voltage: 0, vibration: 0 };
        }

        return {
            voltage: latestFeed[fields.voltage] ? Number(latestFeed[fields.voltage]) : 0,
            temperature: latestFeed[fields.temperature] ? Number(latestFeed[fields.temperature]) : 0,
            vibration: latestFeed[fields.vibration] ? Number(latestFeed[fields.vibration]) : 0,
        };
    } catch (error) {
        console.error('[ThingSpeak Service Error]:', error);
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
    const { fields } = THINGSPEAK_CONFIG;
    
    try {
        const response = await fetch('/api/thingspeak?history=true&results=50');

        if (!response.ok) {
            throw new Error(`Failed to fetch history: ${response.status}`);
        }

        const data = await response.json();
        const feeds = data.feeds || [];

        return feeds.map((feed: any) => {
            const date = new Date(feed.created_at);
            const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return {
                time: timeStr,
                machineId: 1,
                voltage: feed[fields.voltage] ? Number(feed[fields.voltage]) : 0,
                temperature: feed[fields.temperature] ? Number(feed[fields.temperature]) : 0,
                vibration: feed[fields.vibration] ? Number(feed[fields.vibration]) : 0,
            };
        });
    } catch (error) {
        console.error('[History Service Error]:', error);
        return [];
    }
}
