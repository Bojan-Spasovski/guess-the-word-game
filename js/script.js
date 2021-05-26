// Create Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesDisp = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuessesNum = 8;




const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    //  Delimiter you'll use to create the array.
    const wordArray = words.split("\n");
    // Grab a random word from the file, create a variable to pull a random index from the wordArray.
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHold(word);


};
getWord();




// Display our symbols as placeholders for the chosen word's letters
const placeHold = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

placeHold(word);

// Add an Event Listener for the Button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";

    // Let's grab what was entered in the input
    const inputValue = textInput.value;

    // Let's make sure that it is a single letter
    const goodGuess = playerInput(inputValue);
    if (goodGuess) {
        // Make sure that the variable mapped to the result of the function 
        // validates that the player's input is returning a letter 
        makeGuess(inputValue);
    }
    textInput.value = "";
});

// Create a Function to Check Player's Input
// Validate Input in the Button Event Handler

const playerInput = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Enter a single letter";
        // check if they've entered a character that doesn't match the regular expression pattern.
        // Hint: You'll need the .match() method here
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter a single letter from A-Z";
    }
    else {
        return input;
    }
};

// Create a Function to Capture Input

const makeGuess = function (inputValue) {
    // Converting letter parameter to uppercase.
    inputValue = inputValue.toUpperCase();
    if (guessedLetters.includes(inputValue)) {
        message.innerText = "You've already guessed this letter dumbass."
    } else {
        guessedLetters.push(inputValue);
        console.log(guessedLetters);
        showGussedLetters();
        countGuesses(inputValue)
        updateWord(guessedLetters);
    }
};

// Create a Function to Show the Guessed Letters

const showGussedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Create a Function to Update the Word in Progress

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    playerWon();
};

// Create a Function to Count Guesses Remaining

const countGuesses = function (inputValue) {
    const upperWord = word.toUpperCase();

    if (!upperWord.includes(inputValue)) {
        message.innerText = `You have chosen poorly, no ${inputValue} here.`;
        remainingGuessesNum -= 1;
    } else {
        message.innerText = `Good guess, the word contains the letter ${inputValue}`;
    };

    if (remainingGuessesNum === 0) {
        message.innerHTML = `GAME OVER MAN!!! The word was <span class="highlight">${word}</span>.`

        startOver();
    } else if (remainingGuessesNum === 1) {
        remainingGuessesDisp.innerText = `${remainingGuessesNum} guess`;
    } else {
        remainingGuessesDisp.innerText = `${remainingGuessesNum} guesses`;
    }

};


// Create a Function to Check If the Player Won

const playerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide")
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");

    guessedLetters = [];
    remainingGuessesNum = 8;
    remainingGuessesDisp.innerText = `You have ${remainingGuessesNum}`
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    getWord();

    playAgainButton.classList.add("hide");
    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");

});





