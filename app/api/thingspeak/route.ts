import { NextResponse } from 'next/server';
import { THINGSPEAK_CONFIG } from '@/config/thingspeak.config';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const isHistory = searchParams.get('history') === 'true';
    const results = searchParams.get('results') || (isHistory ? '20' : '1');

    const { channelId, readApiKey } = THINGSPEAK_CONFIG;
    
    // ThingSpeak URL: https://api.thingspeak.com/channels/<channel_id>/feeds.json?api_key=<api_key>&results=<results>
    const baseUrl = `https://api.thingspeak.com/channels/${channelId}/feeds.json`;
    const url = `${baseUrl}?api_key=${readApiKey}&results=${results}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            next: { revalidate: 0 } // Disable caching for real-time data
        });

        if (!response.ok) {
            throw new Error(`ThingSpeak fetch failed (${response.status})`);
        }

        const data = await response.json();

        return NextResponse.json({
            channel: data.channel,
            feeds: data.feeds,
            timestamp: Date.now()
        });

    } catch (error: any) {
        console.error('[ThingSpeak Proxy Error]:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
