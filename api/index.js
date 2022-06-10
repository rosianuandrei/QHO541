const express = require('express');
const users = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/api/users', users);

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});