const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (room) => {
        socket.join(room);
        io.to(room).emit('update', 'Welcome to Tic Tac Toe');
    });

    socket.on('move', (move) => {
        // Handle the move
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
