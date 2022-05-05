const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numberRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";

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
    
    const input = inputLetter.value;
    console.log(input);
    inputLetter.value = "";

});

