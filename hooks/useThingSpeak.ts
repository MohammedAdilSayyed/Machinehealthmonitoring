'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchLatestTelemetry, fetchSensorHistory, LatestTelemetry } from '@/services/thingspeak';
import { THINGSPEAK_CONFIG } from '@/config/thingspeak.config';

interface UseThingSpeakReturn {
    data: LatestTelemetry | null;
    history: any[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Optimized React hook for real-time ThingSpeak data polling
 */
export function useThingSpeak(): UseThingSpeakReturn {
    const [data, setData] = useState<LatestTelemetry | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const refreshInterval = THINGSPEAK_CONFIG.refreshInterval || 15000;

    const isFetching = useRef(false);

    const fetchData = useCallback(async () => {
        if (isFetching.current) return;

        try {
            isFetching.current = true;
            const [telemetry, sensorHistory] = await Promise.all([
                fetchLatestTelemetry(),
                fetchSensorHistory()
            ]);
            setData(telemetry);
            setHistory(sensorHistory);
            setError(null);
        } catch (err: any) {
            setError(err instanceof Error ? err : new Error(String(err)));
            console.error('[useThingSpeak] Polling Error:', err);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, []);

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, refreshInterval);

        return () => clearInterval(interval);
    }, [fetchData, refreshInterval]);

    return {
        data,
        history,
        loading,
        error,
        refetch: fetchData,
    };
}
