const express = require('express');
const fs = require('fs');
const myapp = express();

myapp.get('/', (req, res) => {
    fs.readFile("file.txt", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    });
});

myapp.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});