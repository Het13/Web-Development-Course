let randomNumber = 1 + Math.floor(Math.random() * 6)
let dice = "dice" + randomNumber + ".png"
let randomImage = "images/" + dice

document.getElementById("p1").setAttribute("src", randomImage)

let randomNumber2 = 1 + Math.floor(Math.random() * 6)
let dice2 = "dice" + randomNumber2 + ".png"
let randomImage2 = "images/" + dice2

document.getElementById("p2").setAttribute("src", randomImage2)

if (randomNumber > randomNumber2) {
    document.getElementById("title").innerHTML = "Player 1 Wins"
} else if (randomNumber < randomNumber2) {
    document.getElementById("title").innerHTML = "Player 2 Wins"
} else {
    document.getElementById("title").innerHTML = "Draw"
}