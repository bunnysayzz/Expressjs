const express = require('express');
const app = express();

// Middleware function
app.use((req, res, next) => {
    console.log('This is a middleware function');
    next(); // Call the next middleware function
});

// Route handler
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});