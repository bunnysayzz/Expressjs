const express = require('express');
const app = express();

// Middleware function for logging incoming requests
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
});

// Middleware function to add a custom header to outgoing responses
app.use((req, res, next) => {
    res.setHeader('X-Custom-Header', 'Custom Value');
    res.customMessage = 'Hello from custom middleware!'; // Custom message
    next();
});

// Route handler
app.get('/', (req, res) => {
    res.send(res.customMessage || 'Hello, World!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});