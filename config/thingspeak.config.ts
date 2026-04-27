// ThingSpeak Configuration
export const THINGSPEAK_CONFIG = {
    channelId: '3358158',
    readApiKey: 'WSN3GPFAJV89EQKT',
    
    // Field Mapping
    // field1: Voltage
    // field2: Temperature
    // field3: Vibration
    fields: {
        voltage: 'field1',
        temperature: 'field2',
        vibration: 'field3',
    },

    refreshInterval: 15000, // ThingSpeak has a 15s limit for free accounts
    useMockDataOnError: true,

    // Sensor thresholds for status determination
    thresholds: {
        temperature: {
            normal: { min: 0, max: 60 },
            warning: { min: 60, max: 85 },
            fault: { min: 85, max: 100 },
        },
        voltage: {
            normal: { min: 210, max: 230 },
            warning: { min: 200, max: 240 },
            fault: { min: 0, max: 250 },
        },
        vibration: {
            normal: { min: 0, max: 5 },
            warning: { min: 5, max: 7 },
            fault: { min: 7, max: 10 },
        },
    },
};

export default THINGSPEAK_CONFIG;
