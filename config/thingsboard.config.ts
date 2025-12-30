// ThingsBoard Configuration
export const THINGSBOARD_CONFIG = {
    baseUrl: 'http://localhost:9090',

    // REST API Credentials (for JWT Token)
    username: 'mytenant@tenant.com', // Your login email
    password: 'mytenant',               // Your login password

    // The UUID of the device (NOT the access token)
    // You can find this in ThingsBoard -> Devices -> Click on Device -> Copy ID
    deviceId: '6dcf01f0-e576-11f0-8f3d-cb39a93df61c',

    telemetryKeys: {
        temperature: 'temperature',
        voltage: 'voltage',
        vibration: 'vibration',
    },

    refreshInterval: 5000,
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

export default THINGSBOARD_CONFIG;
