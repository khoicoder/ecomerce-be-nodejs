const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// THIS IS REQUIRED !!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use('/v1/api', require('./routes/index'));

require('./dbs/init.mongodb')
const {checkOverload} = require('./helpers/check.connect')
checkOverload();

module.exports = app;
