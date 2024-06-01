const express = require('express');
const app = express();

var cookieParser = require('cookie-parser');

app.use(cookieParser());

// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());
app.use(express.static("public"));


const SocketService = require('./src/services/SocketService');

_io.on('connection', SocketService.connection);

module.exports = app;