import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const yourUsername = "tycho";
const yourPassword = "tycho";
const yourAPIKey = "70a49c04-d9e4-4fda-9063-c52bd434acb0";
const yourBearerToken = "392696b7-194d-40a4-8544-7b8476e2cefb";

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "API Response."});
});

app.get("/noAuth", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/random");
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/basicAuth", async (req, res) => {
    try {
        const result = await axios.get(
            API_URL + "/all?page=2",
            {},
            {
                auth: {
                    username: yourUsername,
                    password: yourPassword,
                },
            }
        );
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/apiKey", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/filter", {
            params: {
                score: 5,
                apiKey: yourAPIKey,
            },
        });
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

const config = {
    headers: {Authorization: `Bearer ${yourBearerToken}`},
};

app.get("/bearerToken", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/secrets/2", config);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
