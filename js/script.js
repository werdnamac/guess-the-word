const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const numberRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLettersArray = [];
let remainingGuesses = 8;


const getWord = async function(){
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordsArray = words.split("\n");

    selectRandomWord(wordsArray);
    
};

// start game
getWord();

// select a random word
const selectRandomWord = function(wordsArray) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    word = wordsArray[randomIndex].trim();
    addCircles(word);
};


// create placeholder circles for all the unguessed letters in the word
const addCircles = function (word) {
    const circles = []
    for (let letter of word) {
        circles.push("● ");
    }
    wordInProgress.innerText = circles.join("");
    
};


// clicking the guessButton 
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    
    // get value of guessed letter and validate it
    const guess = inputLetter.value;
    const goodGuess = validate(guess);

    // if letter passes the validation, make a guess
    if (goodGuess) {
        makeGuess(guess);
    }

    // make the input Letter box blank again
    inputLetter.value = "";

});

// validate the guess
const validate = function (input) {
    // create a variable that contains/is all letters a-z and A-Z
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
        message.innerText = "You didn't enter anything. Please enter a letter."
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That's not a letter! Please enter a letter."
    } else {
        // if the guess makes it all the way to here, this function has a result and the variable goodGuess is True
        return input;
        
    }

};

// make the guess
const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    
    //they used guessedLettersArray.includes(allCapsGuess)
    if (guessedLettersArray.indexOf(guess) !== -1) {
        message.innerText = "You already guessed that letter. Please try again."
    } else {
        // the following is done when the guess is both valid and a new letter:
        guessedLettersArray.push(guess);
        remainingGuessesCounter(guess);
        updateWordInProgress(guessedLettersArray);
        showGuessedLetters();
    }
    
};

// create a list to show all the guessed letters
const showGuessedLetters = function () {
    // Clear the list first
    guessedLetters.innerHTML = "";
    for (const letter of guessedLettersArray) {
      const li = document.createElement("li");
      li.innerText = letter;
      guessedLetters.append(li);
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
    // evolvingGuess is an array with all the guessed letters in the word in their proper order, 
    // with dots in place of letters for all the spots where the player has not yet guessed the correct letter.
    // here we turn that array into a word with circles for all the unguessed letters
    wordInProgress.innerText = evolvingGuess.join("");
    didPlayerWin(wordInProgress);
};

// counting how many guesses the player has left
// this function also updates the message to tell the player whether or not their guessed letter is in the word.
const remainingGuessesCounter = function(guess) {
    const wordUpper = word.toUpperCase();
    const allCapsGuess = guess.toUpperCase();
    if (!wordUpper.includes(allCapsGuess)) {
        message.innerText = `Nope! ${allCapsGuess} is not in the word!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes! ${allCapsGuess} is in the word!`;
    }; 

    // make sure the player isn't out of guesses
    if (remainingGuesses === 0) {
        message.innerText = `Sorry. ${allCapsGuess} isn't in the word. That was your last guess. Game over! The word was ${wordUpper}.`;
        // if player loses, game ends
        startOver();
    
    } else {
        numberRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    };

};

// check to see if player won
const didPlayerWin = function(evolvingGuess) {

    // player wins when they have guessed all the letters in the word
    if (evolvingGuess.innerText === word.toUpperCase() ) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You won! Hooray! Great work!</p>';
        // if player wins, game ends
        startOver();
    }
};

// when game ends, the remaining guesses and the Guess button are hidden
// and the Start Over button is unhidden
const startOver = function() {
    remainingGuessesDisplay.classList.add("hide");
    playAgainButton.classList.remove("hide");
    guessButton.classList.add("hide");
    
}

// player starts new game by clicing Play Again button
playAgainButton.addEventListener("click", function() {

    // remove "win" class; reset remaining guesses to 8 and the remaining guesses display to 8
    message.classList.remove("win");
    remainingGuesses = 8;
    numberRemainingGuesses.innerText = "8 guesses";
    // clear the guessed word from the previous game
    wordInProgress.innerText = "";
    
    // clear the message and remove all list items from the guessed letters list
    // also empty the guessed letters array
    message.innerText = "";
    guessedLettersArray = [];
    guessedLetters.innerHTML = "";

    // show the Guess button and hide the Play Again button
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    // show the remaining guesses again
    remainingGuessesDisplay.classList.remove("hide");

    // get a new word
    getWord();
   
 
});