//Based on szunjic/Hangman-game && m-wolowicz/Hangman-game
//Global variables
//===================================================================
//Create an array of artists
const artists = ['madonna', 'blur', 'm38', 'daftpunk', 'leftfield'];
//Word chosen by computer;
let chosenArtist = "";
//Userguess
let userGuess;
//Arrays to capture letters
let currWrdLtrs = [];//array that holds the actual letters in the chosenArtist;
let numBlanks = 0;//Holds the number of blanks in the chosenArtist;
let answerDisplay =[];//Array to store the answer as it displays;
let wrongGuess = [];//stores all the wrong letter guesses
//to answers
//Counters
let wins = 0;
let allowedGuesses = 9;
//DOM manipulaton
let docWins = document.getElementById('wins');
let docAnswerDisplay = document.getElementById('answer-display');
let docGuessesLeft = document.getElementById('allowedGuesses'); 
let docWrongGuess = document.getElementById('wrongGuess'); 
let docSongAnswer = document.getElementById('song-answer');

//===========================================================

function newGame () {
    chosenArtist = artists[Math.floor(Math.random()*artists.length)];
    console.log('The current word chose is ' + chosenArtist);
    
    currWrdLtrs = chosenArtist.split("");
    console.log('The current letters in the word are ' + currWrdLtrs);

    numBlanks = currWrdLtrs.length;
    console.log('The number of letters in the word are ' + numBlanks);

    allowedGuesses = 9;
    wrongGuess = [];
    answerDisplay = [];

    for (var i = 0; i < numBlanks; i++) {
        answerDisplay.push("_");
        console.log(answerDisplay);
    }

    docWins.innerHTML = "Number of wins: " + wins;
    docAnswerDisplay.innerHTML = answerDisplay.join(" ");
    docGuessesLeft.innerHTML = "Guesses: " + allowedGuesses;
    docWrongGuess.innerHTML = "Letters guessed: " + wrongGuess;
}

function checkLetters(letter) {
        var correctLetter = false;
        for (var i = 0; i < numBlanks; i++) {
            if (chosenArtist[i] === letter) {
                correctLetter = true;
            }
        }
        if (correctLetter) {
            for (var j = 0; j < numBlanks; j++) {
            if (chosenArtist[j] === letter) {
                answerDisplay[j] = letter;
            }
        }
        }
    else {
        wrongGuess.push(letter);
        allowedGuesses--;
    }
    console.log(answerDisplay);
};


function roundComplete () {
    docGuessesLeft.innerHTML = "Guesses: " + allowedGuesses;
    docAnswerDisplay.innerHTML = answerDisplay.join(" ");
    docWrongGuess.innerHTML = "Letters guessed: " + wrongGuess;

    if (currWrdLtrs.toString() === answerDisplay.toString()) {
        wins++;
        alert("You guessed " + chosenArtist + " correctly. Try another round.")
        console.log("You win")
        docWins.innerHTML = "Number of wins: " + wins;
        newGame();
    }
    else if (allowedGuesses === 0) {
        alert("You have 0 guesses left. Try again.")
        newGame();
    }
};

newGame();

document.onkeyup = function (event) {
    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("You have guessed the letter: " + userGuess);
    checkLetters(userGuess);
    roundComplete();
};

