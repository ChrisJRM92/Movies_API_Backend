const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
const watcher = require('./utils/chokidar');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

watcher;
app.use('/api/v1', router);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.get('/', (req, res) => {
    return res.send("Welcome to express!");
})

app.use(errorHandler)

module.exports = app;