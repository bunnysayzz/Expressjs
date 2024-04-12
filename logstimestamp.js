const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
    const logData = `${new Date().toISOString()} -- ${req.method} ${req.url}\n`;
    fs.appendFile('request.log', logData, () => {});
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, Azhar!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});