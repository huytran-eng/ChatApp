const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

app.get('/', (req, res, next) => res.send('Hello world!'));
const http = require('http');

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
    secure: false,
    path: '/myapp'
});

app.use('/', peerServer);

server.listen(9000);