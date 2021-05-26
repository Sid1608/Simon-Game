var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    ValidatingUserClickedPattern();
});
$(document).keypress(function () {
    $("#level-title").text("Level " + level);
    if (level == 0)
        nextSequence();
})

function nextSequence() {
    var randomVariable = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomVariable];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function ValidatingUserClickedPattern() {
    var GameOver = 1;
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] != gamePattern[i]) {
            GameOver = 0;
            break;
        }
    }
    if (GameOver == 0){
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        startOver();
    }
    else {
        if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    }

}
function startOver()
{
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}



