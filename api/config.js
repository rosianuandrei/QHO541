const config = {
    client: 'pg',
    connection: {
        host : 'mysterious-wildwood-43310.herokuapp.com',
        user : 'ojewmrompuemji',
        password : '1234567',
        database : 'postgresql-curly-06855',
    },
    pool: { "min": 0,
    "max": 10000,
    "createTimeoutMillis": 3000,
    "acquireTimeoutMillis": 30000,
    "idleTimeoutMillis": 30000,
    "reapIntervalMillis": 1000,
    "createRetryIntervalMillis": 100,
    "propagateCreateError": false // <- default is true, set to false 
    }
};

module.exports = config;