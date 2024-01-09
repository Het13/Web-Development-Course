let buttonColors = ["red", "green", "blue", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let started = false

function nextSequence() {
    userClickedPattern =[]
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100)
    let audio = new Audio("sounds/" + randomChosenColor + ".mp3")
    audio.play()
    level++
    $("#level-title").html("Level " + level)

}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 100)
        }
    } else {
        new Audio("sounds/wrong.mp3").play()
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
        console.log("wrong")
    }
}

function startOver(){
    level = 0
    gamePattern =[]
    started = false
}

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
    }

})
