// ---------------------------------------------------------
// Program: wordgame.js 
// Purpose: module that encapsulate all teh game logic.
//          The program must be executed using playgame.js
//          It has a dependency on the module wordgenerator.js
// --------------------------------------------------------- 

// modules
const wordGen = require('./wordgenerator.js');

// main object for the WordGame
class wordGame {
    constructor() {
        this.maxGuesses = 12;
        this.targetArr = [];
        this.answerArr = [];
        this.remLetters = 0;
        this.remGuesses = 0,
        this.prevLetters = [];
        this.isGameStarted = false;
        this.totalGames = 0;
    }

    
    initGame() {
        // Initialize values
        this.targetArr = wordGen.getRandomWord();
        this.answerArr = wordGen.setAnswerArray(this.targetArr)
        this.remLetters = this.answerArr.length;
        this.remGuesses = this.maxGuesses;
        this.prevLetters = [];
        this.isGameStarted = true;
        this.totalGames++;
    }

    incorrectGuessAction() {
        if (this.remGuesses === 0) {
            console.log("**** You lose,no more guesses!");
            this.isGameStarted = false;
        } else {
            console.log("Wrong letter, try again ...");
        }
    }

    correctGuessAction() {
        if (this.remLetters === 0) {
            // user wins the game 
            console.log("**** You win!!! Congrats");
            this.remGuesses = 0;
            this.isGameStarted = false;
        } else {
            console.log("Cool you found a letter!");
        }
    }

    isLetterInWord(userGuess) {
        // Check if player guess is a letter in the secret word
        var isInWord = false;
        for (var i = 0; i < this.targetArr.length; i++) {
            // if the user guess mathces a leteter
            // replace the letter in the anwer array
            if (this.targetArr[i] === userGuess) {
                this.answerArr[i] = userGuess;
                this.remLetters--; // must be here to reduce all possible matches
                isInWord = true;
            }
        }
        return isInWord;
    }

    isValidKey(userGuess) {
        // it is a valid key if, 
        // 1. userGuess is a number or a lower/upper case letter
        // make sure spaces are valid
        userGuess = userGuess.trim();
        if ((userGuess.charCodeAt(0) >= 48 && userGuess.charCodeAt(0) <= 57) ||
            (userGuess.charCodeAt(0) >= 65 && userGuess.charCodeAt(0) <= 90) ||
            (userGuess.charCodeAt(0) >= 97 && userGuess.charCodeAt(0) <= 122)) {
            return true;
        }
        return false;
    }

    isRepeatedKey(userGuess) {
        // Is the guess a repeated letter
        var isInArray = this.prevLetters.indexOf(userGuess);
        return isInArray < 0 ? false : true;
    }
}

// export word generator
module.exports = new wordGame();