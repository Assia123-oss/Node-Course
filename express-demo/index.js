const debug= require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require("joi");
const logger = require('./middleware/logger');
const express = require("express");
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses); 
app.use('/', home);

//configuration
console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
console.log('Mail Password:' + config.get('mail.password'));

if (app.get('env') === 'development') {
app.use(morgan('tiny'));
debug('Morgan enabled...');
}

//Db Work
// dbDebugger('Connected to the database...');

app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`)); 
