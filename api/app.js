const cors = require('cors');
 const express = require('express');
 const users = require('./routes/users');
 const applications = require('./routes/applications');
 
 const app = express();
 app.use(cors());
 
 /** Express middlware that parses incoming request with JSON payloads and is based on body-parser */
 app.use(express.json());
 
 /** Express middleware that configure the route for users */
 app.use('/api/users', users);
 
 /** Express middleware that configure the route for users */
 app.use('/api/applications', applications);
 
 module.exports = app;