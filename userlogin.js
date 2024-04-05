const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read userdetails.txt file
    fs.readFile('userdetails.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.send('Error reading user details file');
            return;
        }

        const users = data.split('\n').map(line => {
            try {
                return JSON.parse(line);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return null;
            }
        });

        const user = users.find(u => u && u.username === username && u.password === password);

        if (user) {
            res.send('Login successful');
        } else {
            res.send('Please sign up');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});