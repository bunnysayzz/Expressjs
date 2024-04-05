const express = require('express');
const fs = require('fs');

const userdata = express();
const port = 3000;

userdata.use(express.urlencoded({ extended: true }));

userdata.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

userdata.get('/userdata', (req, res) => {
  fs.readFile('userdetails.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading user data');
    }

    const userLines = data.split('\n');
    const users = userLines.map(line => {
      try {
        return JSON.parse(line);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    });
    const validUsers = users.filter(user => user !== null);
    res.json(validUsers);
  });
});

userdata.get('/signup', (req, res) => {
  const { username, email } = req.query;

  if (!username || !email) {
    return res.status(400).send('Username and email are required');
  }

  const userDetails = { username, email };
  const userDetailsString = JSON.stringify(userDetails);

  fs.writeFile('userdetails.txt', userDetailsString + '\n', { flag: 'a+' }, (err) => {
    if (err) {
      console.error('Error saving user details:', err);
      return res.status(500).send('Error saving user details');
    }
    console.log('User details saved to userdetails.txt');
    res.send('Signup successful!');
  });
});

userdata.listen(port, () => {
  console.log(`Signup page running at http://localhost:${port}`);
});
