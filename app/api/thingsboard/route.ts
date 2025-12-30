import { NextResponse } from 'next/server';
import { THINGSBOARD_CONFIG } from '@/config/thingsboard.config';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const isHistory = searchParams.get('history') === 'true';

    const { baseUrl, username, password, deviceId, telemetryKeys } = THINGSBOARD_CONFIG;
    const keys = Object.values(telemetryKeys).join(',');

    try {
        // 1. LOGIN to get JWT Token
        const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!loginRes.ok) {
            const errorText = await loginRes.text();
            throw new Error(`Login failed (${loginRes.status}): ${errorText}`);
        }

        const { token } = await loginRes.json();

        // 2. FETCH TELEMETRY (REST API)
        let telemetryUrl = `${baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keys}`;

        // If history is requested, fetch data from last 2 hours (or whatever represents "live trends")
        if (isHistory) {
            const endTs = Date.now();
            const startTs = endTs - (2 * 60 * 60 * 1000); // Last 2 hours
            telemetryUrl += `&startTs=${startTs}&endTs=${endTs}&limit=100`;
        }

        const telRes = await fetch(telemetryUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            }
        });

        if (!telRes.ok) {
            const errorText = await telRes.text();
            throw new Error(`Telemetry fetch failed (${telRes.status}): ${errorText}`);
        }

        const telData = await telRes.json();

        return NextResponse.json({
            telemetry: telData,
            timestamp: Date.now()
        });

    } catch (error: any) {
        console.error('[ThingsBoard Proxy Error]:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
