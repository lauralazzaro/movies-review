const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(() => console.log('Connection to DB failed!'));

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(mongoSanitize());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('', (req, res, next) => {
    res.end('Server Created!');
});

module.exports = app;