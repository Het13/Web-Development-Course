import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1><p>My name is Het</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact</h1><p>Phone: 3483123346</p>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
