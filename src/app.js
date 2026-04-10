const express = require('express');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { requestArrivalTime, notFound, errorHandler } = require('./middlewares');

const app = express();
 
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(requestArrivalTime);

const employees = require('./routes/employees');
const users = require('./routes/users');

app.use('/api/employees', employees);
app.use('/api/users', users);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
