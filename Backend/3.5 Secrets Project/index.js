import express from 'express';
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

let isAuthorized = false;

function checkPassword(req, res, next) {
    if (req.body['password'] === 'hi') {
        isAuthorized = true;
    }
    next();
}

app.use(checkPassword);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
    if (isAuthorized) {
        res.sendFile(__dirname + '/public/secret.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
})