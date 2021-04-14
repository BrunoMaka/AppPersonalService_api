var express = require('express');
var path = require('path');
var logger = require('morgan');
require ('./config/database')
var cors = require('cors')

var main_usersRouter = require('./app/routes/main_users');
var prof_usersRouter = require('./app/routes/prof_users');
var local_usersRouter = require('./app/routes/local_users');
var service_classRouter = require('./app/routes/service_class');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/main_users', main_usersRouter);
app.use('/prof_users', prof_usersRouter);
app.use('/local_users', local_usersRouter);
app.use('/service_class', service_classRouter);

module.exports = app;
