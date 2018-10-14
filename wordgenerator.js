// ---------------------------------------------------------
// Program: wordgenerator.js 
// Purpose: module that specialize in generating random
//          words for the wordgame.js
// ------------------------------------------------------- 

// Main object for generating words
class wordGenerator {
  constructor() {
    // Possible words to guess
    this.wordArr = [
      'javascript',
      'google',
      'amazon',
      'breakfast',
      'university',
      'northwood',
      'planet',
      'movies',
      'avengers'
    ];
  }

  // function to get one random word
  getRandomWord() {
      // get a random number from 0 to array length
      const rndNum = Math.random() * this.wordArr.length;
      // transform the random nun into an integer
      const rndInt = Math.floor(rndNum);
      // get the word base on random number
      const theWord = this.wordArr[rndInt];
      // split word inot a letter array
      const wordArr = theWord.split('');
      // return the word as a letter array
      return wordArr;
    }

    setAnswerArray(wordArr) {
      // create "_" for every target letetr 
      let answerArr = wordArr.map(function () {
        return '_';
      });
      // return answer array
      return answerArr;
    }
}

// export word generator
module.exports = new wordGenerator();