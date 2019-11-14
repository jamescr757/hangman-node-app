// logic for game 
// import chalk, inquirer, and word.js
const chalk = require('chalk');
const inquirer = require('inquirer');
const Word = require('./word.js');

// global game object
// word bank from previous hangman game 
const game = {
    wordBank: ["baseball", "football", "soccer", "basketball", "rowing", "softball", "volleyball", "golf", "swimming", "tennis", "lacrosse", "gymnastics", "badminton","cricket", "kickball", "skateboarding", "surfing", "snowboarding", "skiing", "wakeboarding", "dodgeball", "quidditch", "cycling", "wrestling", "boxing", "karate", "taekwondo", "billiards", "snooker", "foosball", "rugby", "curling", "triathlon", "diving", "bandy", "bowling", "darts", "handball", "running", "archery", "sailing", "weightlifting", "luge", "skeleton", "bobsleigh", "judo", "fencing", "ice hockey", "horse racing", "track and field", "motorcyle racing", "table tennis", "beach volleyball", "ultimate", "rock climbing", "mixed martial arts", "jousting", "rodeo", "fly fishing", "sport fishing", "disc golf", "miniature golf", "trapeze", "water polo", "figure skating", "speed skating", "four square", "pickleball", "racquetball", "squash", "field hockey", "formula racing", "hunger games", "roller derby", "tetherball", "axe throwing", "logrolling", "wallball", "wood chopping"],
    letterBank: ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', 'p', 'y', 'f', 'g', 'c', 'r', 'l', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z'],
    numGuesses: 0,
    userGuesses: [],
    word: "str",
    wordObj: {},
    displayedWord: "letters and underscores",
    userGuesses: [],
    stopThisRound: false,

    // passed test
    wordGenerator() {
        const randomNum = Math.floor(Math.random() * this.wordBank.length);
        this.word = this.wordBank[randomNum];
    },

    // passed test
    numGuessGenerator() {
        if (this.word.length > 9) this.numGuesses = 10; 
        else this.numGuesses = this.word.length + 1;
    },

    displayGuess() {
        console.log("");
        console.log(`Number of guesses remaining: ${chalk.yellow(this.numGuesses)}`);
        console.log("");
        console.log(`Letters already guessed: ${chalk.yellow(this.userGuesses.join(', ').toUpperCase())}`);
        console.log("");
    }, 

    answerMessage(color, message) {
        console.log("");
        console.log(chalk[color](message));
    },

    endMessage(color, message) {
        // display correct word - need to flip isGuessed property to true and run displayWord()
        this.wordObj.flipAllCharacters();
        this.displayedWord = this.wordObj.displayWord();
        console.log(""); console.log("");
        console.log(this.displayedWord);
        console.log(""); 

        this.answerMessage(color, message);
        console.log("");
        console.log(chalk.yellow("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"));
        console.log("");
    },

    // prompt user to input a letter
    // need to validate that it's only one letter and that it's a letter
    // passed test 
    playRound() {
        inquirer.prompt([
            {
                name: "userLetter",
                message: "Guess a letter:",
                // tried to use validate but didn't work
                // created my own validation process in next if/else statement below
            }
        ]).then(answer => {
            // cases to stop the round: input is not a letter, letter already guessed, input is not 1 character
            // need seperate if statement because user message will be different
            // else, push guess into userGuess array
            if (!(answer.userLetter.length === 1) || !this.letterBank.includes(answer.userLetter)) {
                this.stopRound("yellow", "Please input 1 letter");
 
            } else if (this.userGuesses.includes(answer.userLetter)) {
                this.stopRound("yellow", "That letter has already been guessed");

            } else {
                this.userGuesses.push(answer.userLetter);
                this.stopThisRound = false;
            }
            
            // if incorrect letter, tell user and display guess count
            // else, tell user correct and display guess count
            // also run check character method to fill-in underscores
            if (!this.word.includes(answer.userLetter) && !this.stopThisRound) {
                this.answerMessage("red", "Incorrect!")
                this.numGuesses--;
            } else if (!this.stopThisRound) {
                this.wordObj.checkCharacter(answer.userLetter);
                this.answerMessage("green", "Correct!");
            }
    
            // word as displayed to user
            this.displayedWord = this.wordObj.displayWord();
    
            // game lost/won or keep playing logic
            if (this.numGuesses === 0 && !this.stopThisRound) {
                this.endMessage("red", "GAME OVER")
                this.playGameAgain();
    
            } else if (!this.displayedWord.includes("_") && !this.stopThisRound) {
                // user won the round 
                this.endMessage("green", "YOU WIN!!");
                this.playGameAgain();
    
            } else if (!this.stopThisRound) {
                this.playAnotherRound();
            } 
                
        }).catch(error => {
            console.log(error);
            console.log("");
            console.log("there has been an error");
        });
    },

    stopRound(color, message) {
        this.answerMessage(color, message);
        this.playAnotherRound();
        this.stopThisRound = true;
    },

    // displaying number of guesses, user view of word and prompting the user to guess a letter
    playAnotherRound() {
        this.displayGuess();
        console.log(this.displayedWord);
        console.log("");

        this.playRound();
    },

    // passed test
    playGame() {
        this.userGuesses = [];
        this.wordGenerator();
        this.numGuessGenerator();

        this.wordObj = new Word(this.word);
        this.displayedWord = this.wordObj.displayWord();

        console.log("");
        console.log("current word", this.word);
        console.log("");
        console.log(this.displayedWord);
        console.log("");

        this.playRound();
    },

    // inquire user with confirm to play game again
    // if yes, reset game variables and playRound()
    // if no, process.exit()
    // passed test
    playGameAgain() {
        inquirer.prompt([
            {
                name: "playAgain",
                message: "Do you want to play again?",
                type: "confirm"
            }
        ]).then(answer => {
            if (answer.playAgain) {
                this.playGame();
    
            } else process.exit();
    
        }).catch(error => {
            console.log("there has been an error");
            console.log(error);
        });
    }
}

game.playGame();

// TODO: style the game output and add stick figure

// TODO: fill-out, format, and style readme
