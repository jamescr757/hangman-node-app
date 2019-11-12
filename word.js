// Word constructor file 
// PASSED all single word tests


// import Letter from letter.js
const Letter = require('./letter');

// constructor has no inputs 
// a word array filled with Letter objects
const Word = function(word) {
    // input word 
    // push to letters array new Letter objects
    this.lettersArray = [];

    for (let i = 0; i < word.length; i++) {
        this.lettersArray.push(new Letter(word[i]));
    }
    
    // call getLetter function to return underscores/letters depending on user guesses 
    this.displayWord = function() {
        let displayedWord = " ";

        for (let i = 0; i < this.lettersArray.length; i++) {
            displayedWord += `${this.lettersArray[i].getLetter()} `;
        }

        return displayedWord;
    }

    // input a character to check
    // loop through lettersArray and call letterChecker
    this.checkCharacter = function(character) {
        this.lettersArray.forEach(element => element.letterChecker(character));
    }

}

// export Word constructor
module.exports = Word;



// ============================================================================================================================================
// TESTING Word constructor 
// const newWordObj = new Word("equestrian");
// expected output is array of letter objects
// passed test
// console.log("expect array of letter objects", newWordObj.lettersArray);
// console.log("");

// expect 10 underscores with spaces in between 
// console.log("10 underscores", newWordObj.displayWord());
// console.log("");

// // going to guess some letters
// // expect displayWord() to not output all underscores
// newWordObj.checkCharacter("a");
// console.log("expect an a with all underscores", newWordObj.displayWord());
// console.log("");

// newWordObj.checkCharacter("e");
// console.log("expect an a and 2 e's with all underscores", newWordObj.displayWord());
// console.log("");

// newWordObj.checkCharacter("y");
// console.log("expect an a and 2 e's with all underscores", newWordObj.displayWord());
// console.log("");

// newWordObj.checkCharacter("f");
// console.log("expect an a and 2 e's with all underscores", newWordObj.displayWord());
// console.log("");