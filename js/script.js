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


const getWord = async function(){
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordsArray = words.split("\n");

    selectRandomWord(wordsArray);
    
};

getWord();

const selectRandomWord = function(wordsArray) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    word = wordsArray[randomIndex].trim();
    addCircles(word);
};



const addCircles = function (word) {
    const circles = []
    for (let letter of word) {
        circles.push("● ");
    }
    wordInProgress.innerText = circles.join("");
    
};



guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    
    const guess = inputLetter.value;
    //console.log(input);
    
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
    guess = guess.toUpperCase();
    
    //they used guessedLettersArray.includes(allCapsGuess)
    if (guessedLettersArray.indexOf(guess) !== -1) {
        message.innerText = "You already guessed that letter. Please try again."
    } else {
        guessedLettersArray.push(guess);
        remainingGuessesCounter(guess);
        updateWordInProgress(guessedLettersArray);
    }
    
};


const updateWordInProgress = function(guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const lettersInWord = wordUpper.split("");
    const evolvingGuess = [];
    for (let letter of lettersInWord) {
        if (guessedLettersArray.includes(letter)) {
            evolvingGuess.push(letter);
        }   else {
            evolvingGuess.push("● ");
            };
        
    };
    wordInProgress.innerText = evolvingGuess.join("");
    didPlayerWin(wordInProgress);
    console.log(wordInProgress);
    
};

const remainingGuessesCounter = function(guess) {
    const wordUpper = word.toUpperCase();
    const allCapsGuess = guess.toUpperCase();
    if (!wordUpper.includes(allCapsGuess)) {
        message.innerText = `Nope! ${allCapsGuess} is not in the word!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes! ${allCapsGuess} is in the word!`;
    }; 

    if (remainingGuesses === 0) {
        message.innerText = `Sorry. ${allCapsGuess} isn't in the word. That was your last guess. Game over! The word was ${wordUpper}.`;

    } else {
        numberRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    };

};

const didPlayerWin = function(evolvingGuess) {
    console.log(evolvingGuess);
    console.log(word);
    if (evolvingGuess.innerText === word.toUpperCase() ) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You won! Hooray! Great work!</p>';
        console.log("You win")
    }
};
