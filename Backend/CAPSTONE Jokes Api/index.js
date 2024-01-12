import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

const API_URL = "https://v2.jokeapi.dev/joke";

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('main.ejs', {joke: ""})
})
app.post('/', async (req, res) => {
    const request = req.body;
    try {
        let url = API_URL + '/';
        let params = {}
        if (request['category-chk'] === 'any') {
            url = url + 'Any'
        } else {
            if (Array.isArray(request['category'])) {
                url = url + request['category'][0]
                url = url + `,${request['category'].slice(1,)}`
                console.log(url)
            } else {
                url = url + request['category']
            }
        }
        let lang;
        if (request['language']) {
            if (request['language'] === 'en') {
            } else {
                lang = request['language']
                params['lang'] = lang;
            }
        }

        let flags = [];
        if (request['flags']) {
            if (Array.isArray(request['flags'])) {
                flags = request['flags']
            } else {
                flags.push(request['flags'])
            }
            params['blacklistFlags'] = flags
        }


        if (request['jokeType']) {
            if (Array.isArray(request['jokeType'])) {
            } else {
                params['type'] = request['jokeType']
            }
        }

        if (request['amount']) {
            if ((request['amount']) === 1) {
            } else {
                params['amount'] = Number(request['amount'])
            }
        }
        const queryString = Object.keys(params)
            .map(key => {
                if (Array.isArray(params[key])) {
                    return `${key}=${params[key].map(encodeURIComponent).join(',')}`;
                } else {
                    return `${key}=${encodeURIComponent(params[key])}`;
                }
            })
            .join('&');
        let final_url = `${url}?${queryString}`
        console.log(final_url)
        const result = await axios.get(final_url)

        if (result.data['error'] === true) {
            res.render('main.ejs', {joke: result.data['message']})
        }
        if (result.data['type'] === 'single') {
            res.render('main.ejs', {joke: result.data['joke']})
        } else {
            let joke = `Setup: ${result.data['setup']} 
            Delivery: ${result.data['delivery']}`
            const joke1 = joke.replace(/\n/g, '<br>');
            res.render('main.ejs', {joke: joke1})
        }

    } catch (error) {
        res.render('main.ejs', {joke: JSON.stringify(error.response.data)})
    }
})
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})