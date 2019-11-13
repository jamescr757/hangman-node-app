// logic for game 
// import chalk, inquirer, and word.js
const chalk = require('chalk');
const inquirer = require('inquirer');
const Word = require('./word.js');

// global game object
// word bank from previous hangman game 
// TODO: save user guesses in an array
const game = {
    wordBank: ["baseball", "hockey", "football", "soccer", "basketball", "rowing", "softball", "volleyball", "golf", "swimming", "tennis", "lacrosse", "gymnastics", "badminton","cricket", "kickball", "skateboarding", "surfing", "snowboarding", "skiing", "wakeboarding", "dodgeball", "quidditch", "frisbee", "cycling", "wrestling", "boxing", "karate", "taekwondo", "billiards", "snooker", "foosball", "rugby", "curling", "triathlon", "polo", "diving", "bandy", "bowling", "darts", "handball", "running", "archery", "equestrian", "sailing", "weightlifting", "luge", "skeleton", "bobsleigh", "judo", "fencing"],
    letterBank: ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', 'p', 'y', 'f', 'g', 'c', 'r', 'l', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z'],
    numGuesses: 0,
    word: "str",
    wordObj: {},
    userGuesses: [],

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

    displayGuessCount() {
        console.log("");
        console.log(`Number of guesses remaining: ${chalk.yellow(game.numGuesses)}`);
        console.log("");
    }, 

    endMessage(message) {
        console.log("");
        console.log(chalk.green(message));
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
                // TODO: add user input validation to be 1 letter and a letter
                // TODO: don't let user guess same letter twice
            }
        ]).then(answer => {
            // if incorrect letter, tell user and display guess count
            // else, tell user correct and display guess count
            // also run check character method to fill-in underscores
            if (!this.word.includes(answer.userLetter)) {
                console.log("");
                console.log("Letter " + chalk.red("incorrect"));
                this.numGuesses--;
            } else {
                this.wordObj.checkCharacter(answer.userLetter);
                console.log("");
                console.log(chalk.green("Correct!"));
            }
    
            // word as displayed to user
            const displayedWord = this.wordObj.displayWord();
    
            // game lost/won or keep playing logic
            if (this.numGuesses === 0) {
                this.endMessage("GAME OVER")
                playGameAgain();
    
            } else if (!displayedWord.includes("_")) {
                // user won the round 
                this.endMessage("YOU WIN!!");
                playGameAgain();
    
            } else {
                this.displayGuessCount();
                console.log(displayedWord);
                console.log("");
    
                playRound();
            } 
                
        }).catch(error => {
            console.log(error);
            console.log("");
            console.log("there has been an error");
        });
    },

    // passed test
    playGame() {
        this.wordGenerator();
        this.numGuessGenerator();

        this.wordObj = new Word(this.word);

        console.log("");
        console.log("current word", this.word);
        console.log("");
        console.log(this.wordObj.displayWord());
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

// TODO: style the console logs with chalk and spaces

// TODO: fill-out, format, and style readme
