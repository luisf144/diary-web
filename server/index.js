const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models');
const indexRoute = require('./routes');

const app = express();
//define basedir in global
global.__basedir = __dirname;

//Database connection
//{ force: true } to execute the queries.
db.sequelize.sync(
     { force: true }
).then(() => { console.log("Connected to DB") }).catch((err) => {console.log(err)});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('resources/static/assets/uploads'))

// all the api routes
app.use('/api', indexRoute);

// port initialized
const PORT = process.env.PORT || 5000;

app.listen(PORT);
