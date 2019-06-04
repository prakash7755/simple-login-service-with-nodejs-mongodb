'use strict';
require('dotenv').config();
const config = require('config');
const express = require('express');
const PORT = process.env.NODE_PORT || 4000;
const IP = config.get('IP');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('uploads'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes')(app);

const onServerStart = () => {
    const ENVIROINMENT = process.env.NODE_ENV || 'development';
    const message = `Server Listening On Port ${PORT}, ENVIROINMENT=${ENVIROINMENT}`;
    console.log(message);
};

app.listen(PORT, IP, onServerStart);