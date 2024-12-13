const express = require('express');
const fs = require("fs");
const validator = require("./validator.js")



const app = express();
const port = 3000;

// Create form-submissions folder if it doesn't exist
const dir = "./form-submissions/";
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Built in express middleware to parse JSON objects
app.use(express.json());

app.post('/submit-form', (req, res) => {
    const dateNow = new Date();

    const results = validator.validateInput(req);
    if (Object.keys(results).length !== 0) {
        console.log(dateNow.toISOString() + ": invalid request received");
        // Sends errors back to client
        return res.json(results);
    }

    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const message = req.body.message.trim();

    console.log(dateNow.toISOString() + ": request received");
    console.log(req.body);
    const dateString = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + "_" + dateNow.getHours() + '-' +
        // This ternary will add a leading zero in front of single-digit minutes
        (dateNow.getMinutes() < 10 ? '0' : '') + dateNow.getMinutes();

    const path = dir + dateString + ".txt";

    const output = name + " (" + email + "): \n" + message;

    fs.writeFile(path, output, function (err) {
        if (err) {
            console.log(err);
        }
    })

    res.json({"response" : "success"});
});

app.listen(port, () => console.log('Express server listening on port ' + port));