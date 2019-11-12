// logic for game 
// import chalk, inquirer, and word.js
const chalk = require('chalk');
const inquirer = require('inquirer');
const Word = require('./word.js');

// global game object
// word bank from previous hangman game 
const game = {
    wordBank: ["baseball", "hockey", "football", "soccer", "basketball", "rowing", "softball", "volleyball", "golf", "swimming", "tennis", "lacrosse", "gymnastics", "badminton","cricket", "kickball", "skateboarding", "surfing", "snowboarding", "skiing", "wakeboarding", "dodgeball", "quidditch", "frisbee", "cycling", "wrestling", "boxing", "karate", "taekwondo", "billiards", "snooker", "foosball", "rugby", "curling", "triathlon", "polo", "diving", "bandy", "bowling", "darts", "handball", "running", "archery", "equestrian", "sailing", "weightlifting", "luge", "skeleton", "bobsleigh", "judo", "fencing"],
    numGuesses: 0,
    word: "str",
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
    }
}

game.wordGenerator();
game.numGuessGenerator();
const currentWord = new Word(game.word);

console.log("");
console.log("current word", game.word);
console.log("");
console.log("display underscores", currentWord.displayWord());
console.log("");




