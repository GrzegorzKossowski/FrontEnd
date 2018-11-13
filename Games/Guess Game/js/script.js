/////////////////////////////////////////////
// SIMPLE "GUESS A NUMBER" JAVASCRIPT GAME //
/////////////////////////////////////////////

//Game variables
var mysteryNumber = Math.floor((Math.random() * 100) + 1);
var playersGuess = 0;
var guessRemaining = 10;
var guessMade = 0;
var guessState = "";
var array = new Array;

//The input, output and other fields

var input = document.getElementById("input");
var output = document.getElementById("output");
var state = document.getElementById("state");
var egame = document.getElementById("endgame");
var hist = document.getElementById("history");

//The button

var buttonBtn = document.getElementById("button");
var againBtn = document.getElementById("again");
againBtn.style.display = "none";

//Listeners

buttonBtn.addEventListener("click", clickHandler, false);
againBtn.addEventListener("click", gameInit, false);
window.addEventListener("keydown", keydownHandler, false);

//Functions

function clickHandler() {
    validateInput();    
}

function keydownHandler(event) {

    if(event.keyCode === 13) {
        validateInput();
    }    

}

function validateInput() {

    playersGuess = parseInt(input.value);
    
    if (isNaN(playersGuess)) {
        output.innerHTML = "Give me a number value!";
        input.value="";
    } else {
        playGame();
    }

}

function playGame() {

    guessRemaining--;
    guessMade++;    
    guessState = " Guess: " + guessMade + ". Remaining: " + guessRemaining + ".";
    state.innerHTML = guessState;
    
    // history of inputs
    hist.innerHTML = "";
    array.push(input.value);
    for (i = array.length-1; i>-1; i--) {
        hist.innerHTML = hist.innerHTML + array[i] + "<br/>";
    }

    if (guessRemaining<=0) {
        endGame(false);
    } else {    
        if(playersGuess > mysteryNumber)   {
            output.innerHTML = "That's too high.";                           
        } else if(playersGuess < mysteryNumber) {
            output.innerHTML = "That's too low.";            
        } else if(playersGuess === mysteryNumber) {
            endGame(true);
        }
    }

    input.value="";

}

function endGame(verdict) {
    
    window.removeEventListener("keydown", keydownHandler, false);
    buttonBtn.style.display = "none";
    againBtn.style.display = "";    


    input.disabled=true;            
    input.setAttribute("placeholder", "End");

    if (verdict) {
        output.innerHTML = "Got it!";        
        var audio = new Audio('audio/yeah.mp3');
        audio.play();
    } else {
        input.setAttribute("placeholder", mysteryNumber);
        output.innerHTML = "Looooser!";
        var audio = new Audio('audio/farting.mp3');
        audio.play();
    }

}

function gameInit () {

    window.addEventListener("keydown", keydownHandler, false);
    buttonBtn.style.display = "";
    againBtn.style.display = "none";
    input.disabled=false;
    input.setAttribute("placeholder", "Enter the number...");
    output.innerHTML = "Guess the number 1 - 100.";

    hist.innerHTML = "";
    for (var i = array.length - 1; i >= 0; i--) {
        array.pop();
    };
    
    mysteryNumber = Math.floor((Math.random() * 100) + 1);
    playersGuess = 0;
    guessRemaining = 10;
    guessMade = 0;
    guessState = " Guess: " + guessMade + ". Remaining: " + guessRemaining + ".";
    state.innerHTML = guessState;

    input.focus();
   
}