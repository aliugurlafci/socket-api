const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', function() {
        socket.join("chat");
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        //io.emit('chat message', "Tekrarlanan cevap: "+msg);
    });
    socket.on('typing', () => {
      socket.emit('typing', 'A user is typing...');
    });

    socket.on('stop typing', () => {
        socket.emit('stop typing');
    });
});

server.listen(9999, () => {
  console.log('server running at http://localhost:3000');
});