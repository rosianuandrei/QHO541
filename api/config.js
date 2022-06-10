const config = {
    client: 'pg',
    connection: {
        host : 'mysterious-wildwood-43310.herokuapp.com',
        user : 'ojewmrompuemji',
        password : '1234567',
        database : 'postgresql-curly-06855'
    },
    pool: { min: 0, max: 30, acquireTimeoutMillis: 60 * 1000 }
};

module.exports = config;