const express = require('express');
const users = require('./routes/users');
const applications = require('./routes/applications');

const app = express();
app.use(express.json());

app.use('/api/users', users);
app.use('/api/applications', applications);

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});