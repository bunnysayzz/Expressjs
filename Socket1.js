const express = require('express');
const socketIO = require('socket.io'); // Corrected require statement

const app = express();
const server = app.listen(3000, () => { // Corrected arrow function syntax
    console.log("Server running on port 3000");
});

const io = socketIO(server); // Initialize socket.io with the server

