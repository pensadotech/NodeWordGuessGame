// ---------------------------------------------------------
// Program: playgame.js 
// Purpose: this is the main driver for the game
//          execut as follows: node playgame.js
//          It has a dependecy in wordgame.js
// ------------------------------------------------------- 

// modules
const inquirer = require('inquirer');
const wordGame = require('./wordgame.js');

// Start the game
askForNewGame();

// Funcitons --------------------------------------------
function askForNewGame() {
    let inqMsg = '';
    if (wordGame.totalGames === 0) {
        inqMsg = "Hi, Do you want to play a game?";
    } else {
        inqMsg = "Do you want to play again?";
    }

    // ask to start a new game
    inquirer.prompt([{
            type: 'confirm',
            name: "isNewGame",
            message: inqMsg
        }])
        .then(function (answers) {
            if (answers.isNewGame) {
                // initialize game 
                wordGame.initGame();
                // play the game
                playGame();
            } else {
                console.log("Ok, maybe next time!")
            }
        })
        .catch(e => console.log(e))
}

function playGame() {
    // word to guess
    if (wordGame.isGameStarted) {
        // console.log(`targetArr: ${wordGame.targetArr}`);
        console.log(`Secret word: ${wordGame.answerArr}`)
        console.log(`Remaining guesses: ${wordGame.remGuesses}`)
    }

    if (wordGame.remGuesses > 0) {
        inquirer.prompt([{
                name: "userGuess",
                message: "what is your guess?"
            }])
            .then(function (answers) {

                let newGuess = answers.userGuess.toLowerCase();

                if (wordGame.isValidKey(newGuess)) {

                    if (!wordGame.isRepeatedKey(newGuess)) {
                        wordGame.remGuesses--;
                        wordGame.prevLetters.push(newGuess);
                        let isCorrectGuess = wordGame.isLetterInWord(newGuess);
                       
                        if (!isCorrectGuess) {
                            // incorrect guess 
                            wordGame.incorrectGuessAction();
                        } else {
                            // correct action
                            wordGame.correctGuessAction();
                        }
                    } else {
                        console.log("The key has been enter before, try again...")
                    }
                    // Continue playing the game 
                    playGame()
                } else {
                    console.log("Invalid key key")
                     // Continue playing the game 
                     playGame()
                }
            })
            .catch(e => console.log(e))

    } else {
        console.log("Game over!")
        // askForAnotherGame();
        askForNewGame()
    }
}