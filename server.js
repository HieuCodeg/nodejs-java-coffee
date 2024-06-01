const express = require('express')();
require('dotenv').config();

const http = require('http').Server(express);
const io = require('socket.io')(http);

io.set('origins', '*:*');

global.__basedir = __dirname;
global._io = io;

const app = require('./app');

const PORT = process.env.PORT || '25002';

express.use(app);

http.listen(PORT, () => {
    console.log('server running at ' + PORT);
});
