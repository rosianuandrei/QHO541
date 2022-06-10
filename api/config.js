const config = {
    client: 'pg',
    /*connection: {
        host : 'mysterious-wildwood-43310.herokuapp.com',
        user : 'ojewmrompuemji',
        password : '1234567',
        database : 'postgresql-curly-06855',
    },*/
    connection: 'postgres://ojewmrompuemji:c2eff6c3a73441a1e4c5201cf1c8259b7e330c25fa8a1c2a7dddfdd7134ec10c@ec2-34-225-159-178.compute-1.amazonaws.com:5432/d80poge5f70ke8',
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