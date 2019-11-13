// Letter constructor file 
// PASSED all tests 

// import chalk 
const chalk = require('chalk');

// takes in underlying letter
// is guessed boolean; default is false 
// method that retrieves letter if boolean is true and returns underscore if boolean is false 
// method that checks input to underlying letter
function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;

    this.getLetter = function() {
        if (this.isGuessed) return chalk.green(this.letter);
        else return "_";
    }

    this.letterChecker = function(guess) {
        if (guess === this.letter) this.isGuessed = true;
    }
}

// export Letter constructor
module.exports = Letter;



// ============================================================================================================================================
// TESTING Letter constructor
// const newLetter = new Letter("a");
// console.log("newLetter object", newLetter);

// // expected return is _
// const output = newLetter.getLetter();
// console.log("expect underscore", output);

// // function should flip isGuessed boolean
// newLetter.letterChecker("a");
// // expected return is a 
// console.log("expect a", newLetter.getLetter());