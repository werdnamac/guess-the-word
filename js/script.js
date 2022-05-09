const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numberRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLettersArray = [];

const addCircles = function (word) {
    const circles = []
    for (let letter of word) {
        circles.push("● ");
    }
    wordInProgress.innerText = circles.join("");
    
};

addCircles(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    
    const guess = inputLetter.value;
    //console.log(input);
    message.innerText = "";
    const goodGuess = validate(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    inputLetter.value = "";

});

const validate = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
        message.innerText = "You didn't enter anything. Please enter a letter."
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That's not a letter! Please enter a letter."
    } else {
        return input;
        
    }

};

const makeGuess = function(guess) {
    let allCapsGuess = guess.toUpperCase();
    
    //they used console.log(guessedLettersArray); here
    if (guessedLettersArray.indexOf(allCapsGuess) !== -1) {
        message.innerText = "You already guessed that letter. Please try again."
    } else {
        guessedLettersArray.push(allCapsGuess);
        console.log(guessedLettersArray);
    }
    
};



