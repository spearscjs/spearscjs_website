const express = require('express');
const fs = require("fs");
const cors = require('cors');
const validator = require("./validator.js");
require('dotenv').config();
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;


const app = express();
const port = 3000;

// Create form-submissions folder if it doesn't exist
const dir = "./form-submissions/";
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Built in express middleware to parse JSON objects
app.use(express.json());
app.use(cors());

app.post('/submit-form', async (req, res) => {
    const dateNow = new Date();

    // reCAPTCHA validation
    let captchaResult = await validator.validateReCAPTCHA(req.body.token, RECAPTCHA_SECRET_KEY);
    if(!captchaResult){
        console.log(dateNow.toISOString() + " : invalid captcha result");
        return res.json({error: "invalid captcha result"});
    }

    // Input validation
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

let isSecretPresent = RECAPTCHA_SECRET_KEY ? "yes" : "no";

app.listen(port, () => console.log('Express server listening on port ' + port + "\nreCAPTCHA secret key present: "
    + isSecretPresent));