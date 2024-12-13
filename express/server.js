const express = require('express');
const app = express();
const fs = require("fs");
const port = 3000;

// Create form-submissions folder if it doesn't exist
const dir = "./form-submissions/";
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

app.use(express.json());

app.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // TODO: input validation & sanitation
    // note: express-validator is in package.json,
    // it just needs to be implemented properly

    console.log("request received");
    console.log(req.body);
    path = dir + Math.trunc(Math.random() * 100000) + ".txt";

    fs.writeFile(path, name + "\n" + email + "\n" + message, function (err) {
        if (err) {
            console.log(err);
        }
    })

    res.send('Form submitted successfully!');
});

app.listen(port, () => console.log('Express server listening on port ' + port));