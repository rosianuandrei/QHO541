const app = require('./app');


let port = process.env.PORT || 3000;


/** The port that the application is running */
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});