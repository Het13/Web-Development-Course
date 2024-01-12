import inquirer from 'inquirer';
import qr from 'qr-image'
import fs from "fs";

inquirer
    .prompt([{
        message: "Type a url", name: "url"
    },])
    .then((answers) => {
        const ans = answers.url
        let qr_png = qr.image(ans)
        qr_png.pipe(fs.createWriteStream("qr_img.png"))
        fs.writeFile("url.txt", ans, (err) => {
            if (err) throw err
            console.log("File saved")
        })
    })
    .catch((error) => {
        console.log("Error")
    });

