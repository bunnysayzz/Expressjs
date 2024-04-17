// 1. Setup Express.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 2. Create a basic HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 3. Implement WebSocket communication
io.on('connection', (socket) => {
    // 4. Handle user connections
    socket.on('join', (username) => {
        socket.username = username;
        io.emit('user joined', username);
    });

    socket.on('disconnect', () => {
        io.emit('user left', socket.username);
    });

    // 5. Display messages and user names
    socket.on('chat message', (msg) => {
        io.emit('chat message', { username: socket.username, message: msg });
    });
});

// 6. Auto-scrolling
// This can be implemented on the client-side using JavaScript.

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
