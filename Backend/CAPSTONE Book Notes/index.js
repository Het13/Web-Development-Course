import pg from "pg"
import bodyParser from "body-parser"
import express from "express"
import axios from "axios";

const app = express()
const PORT = 3000
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "new",
    password: "Het@2102",
    port: 5432
})
db.connect()

let books = []
let notes = []


async function getBooks() {
    let query = "SELECT * FROM books"
    const result = await db.query(query)
    books = result.rows
}

await getBooks()
let sort_parameter = 'id'


app.get('/', async (req, res) => {
    try {
        res.render('index.ejs', {books: books})
    } catch (error) {
        console.log(error)
    }
})

app.get('/sort/:parameter', async (req, res) => {
    sort_parameter = req.params.parameter
    try {
        let sorted_books = []
        if (sort_parameter === 'title') {
            sorted_books = books.sort(
                (b1, b2) => (b1[sort_parameter] > b2[sort_parameter]) ? 1 : (b1[sort_parameter] < b2[sort_parameter]) ? -1 : 0
            )
        } else {
            sorted_books = books.sort(
                (b1, b2) => (b1[sort_parameter] > b2[sort_parameter]) ? -1 : (b1[sort_parameter] < b2[sort_parameter]) ? 1 : 0
            )
        }
        books = sorted_books
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


app.get('/add', (req, res) => {
    res.render('new.ejs')
})

app.post('/books', async (req, res) => {
    try {
        const img = await axios.get(`https://covers.openlibrary.org/b/isbn/${req.body['isbn']}-M.jpg`)
        const book = [
            req.body['title'],
            req.body['author'],
            req.body['read-date'],
            req.body['rating'],
            req.body['summary'],
            `https://covers.openlibrary.org/b/isbn/${req.body['isbn']}-M.jpg`,
            req.body['isbn']
        ]
        await db.query('INSERT INTO books(title, author, date, rating, summary, img, isbn) VALUES ($1,$2,$3,$4,$5,$6,$7)', book)
        await getBooks()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

app.get('/notes/:id', async (req, res) => {
    const book_id = parseInt(req.params.id)
    try {
        const notes_result = await db.query('SELECT note FROM notes WHERE book_id = $1', [book_id])
        notes = notes_result.rows
        const book_result = await db.query("SELECT * FROM books WHERE id = $1", [book_id])
        const book = book_result.rows[0]
        res.render('notes.ejs', {notes: notes, book: book})
    } catch (error) {
        console.log(error)
    }
})

app.post('/rating/:id', async (req, res) => {
    const book_id = parseInt(req.params.id)
    try {
        const new_rating = req.body["newRating"]
        await db.query("UPDATE books SET rating = $1 WHERE id = $2", [new_rating, book_id])
        let edited_book = books.find((book) => book.id === book_id)
        edited_book.rating = new_rating
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

app.post('/books/:id/notes', async (req, res) => {
    const book_id = req.params.id
    try {
        const note = req.body['newNote']
        await db.query("INSERT INTO notes(book_id,note) VALUES($1,$2)", [book_id, note])
        res.redirect(`/notes/${book_id}`)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})