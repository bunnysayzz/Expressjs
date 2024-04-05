const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/get', (req, res) => {
    fs.readFile("file.txt", (err) => {
        if (err) {
            console.error(err);
            return;
        }
        fs.readFile("file.txt", "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            res.download("file.txt", (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("File downloaded successfully");
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});