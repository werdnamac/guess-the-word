const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const numberRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLettersArray = [];
let remainingGuesses = 8;

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
    
    //they used guessedLettersArray.includes(allCapsGuess)
    if (guessedLettersArray.indexOf(allCapsGuess) !== -1) {
        message.innerText = "You already guessed that letter. Please try again."
    } else {
        guessedLettersArray.push(allCapsGuess);
        console.log(guessedLettersArray);
    }
    updateWordInProgress(guessedLettersArray);
};


const updateWordInProgress = function(guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const currentWord = [];
    for (let letter of wordArray) {
        if (guessedLettersArray.includes(letter)) {
            currentWord.push(letter)
        }   else {
            currentWord.push("● ")
            };
        
    };
    wordInProgress.innerText = currentWord.join("");
    didPlayerWin(wordInProgress);
    console.log(wordInProgress);
    
};


const didPlayerWin = function(wordInProgress) {
    
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You won! Hooray! Great work!</p>';
    }
};
