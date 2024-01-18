import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config'

const app = express();
const port = 3000;

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
})
db.connect()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    const email = req.body.username
    const password = req.body.password
    try {
        const result = await db.query('SELECT * FROM USERS WHERE EMAIL = $1', [email])

        if (result.rows.length > 0) {
            console.log('email exist')
        } else {
            await db.query('INSERT INTO USERS(EMAIL,PASSWORD) VALUES($1,$2)', [email, password])
            res.render('secrets.ejs')
        }
    } catch (error) {
        console.log(error)
    }

});

app.post("/login", async (req, res) => {
    const email = req.body.username
    const password = req.body.password

    try {
        const result = await db.query('SELECT * FROM USERS WHERE EMAIL = $1', [email])

        if (result.rows.length > 0) {
            const result = await db.query('SELECT PASSWORD FROM USERS WHERE EMAIL = $1', [email])
            const dbPassword = result.rows[0].password
            if (password === dbPassword) {
                res.render('secrets.ejs')
            } else {
                console.log('incorrect password')
            }
        } else {
            console.log('user not found')
        }
    } catch (error) {
        console.log(error)
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
