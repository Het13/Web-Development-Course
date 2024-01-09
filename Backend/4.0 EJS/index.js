import express from "express"

const app = express()

let dayType = '';
let advice = '';

app.get('/', (req, res) => {
    const d = new Date();
    let day = d.getDay();

    if (day === 0 || day === 6) {
        dayType = 'weekend';
        advice = "let's have fun";
    } else {
        dayType = 'weekday';
        advice = "let's work hard";
    }

    res.render('index.ejs',
        {
            dayType: dayType,
            advice: advice
        });
})

app.listen(3000, () => {
    console.log("listening on 3000");
});