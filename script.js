// Select elements from the HTML document
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.getElementById("guesses");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const correctWordDisplay = document.getElementById("correctWord");
const hintDisplay = document.getElementById("hint");

// Declare variables and constants
let currentWord, correctLetters = [], wrongGuessCount;
const maxGuesses = 6;
const wordList = [
    {
        word: "CRYPTOGRAPHY",
        hint: "The art of writing or solving codes and ciphers"
    },
    {
        word: "MICROSCOPIC",
        hint: "So tiny that it can only be seen under a microscope"
    },
    {
        word: "EPHEMERAL",
        hint: "Lasting for a very short time, fleeting"
    },
    {
        word: "PYROTECHNICS",
        hint: "The art and science of fireworks and explosives"
    },
    {
        word: "EQUINOX",
        hint: "The two times in a year when day and night are approximately of equal length"
    },
    {
        word: "CHAMELEON",
        hint: "A lizard that can change its color to blend into its surroundings"
    },
    {
        word: "QUINTESSENTIAL",
        hint: "The most perfect example of something"
    },
    {
        word: "PHOTOSYNTHESIS",
        hint: "The process by which plants convert sunlight into energy"
    },
    {
        word: "SOPHISTICATED",
        hint: "Elegant and refined, involving complex or advanced features"
    },
    {
        word: "EXUBERANT",
        hint: "Filled with energy, excitement, and enthusiasm"
    },
    {
        word: "ASTROPHYSICS",
        hint: "The branch of astronomy that deals with the physical properties of celestial bodies"
    },
    {
        word: "ENTOMOLOGIST",
        hint: "A scientist who studies insects"
    },
    {
        word: "PHILOSOPHER",
        hint: "A thinker or scholar who explores questions about existence and knowledge"
    },
    {
        word: "RESONANCE",
        hint: "The reinforcement or prolongation of sound or other phenomena"
    },
    {
        word: "SURREPTITIOUS",
        hint: "Done secretly or stealthily"
    },
    {
        word: "MAGNIFICENT",
        hint: "Impressively beautiful, grand, or splendid"
    },
    {
        word: "BEAUTIFUL",
        hint: "Pleasing to the senses or attractive."
    },
    {
        word: "GRAND",
        hint: "Referring to something large, impressive, or important."
    },
    {
        word: "SPLENDID",
        hint: "Excellent, impressive, or exceptionally good."
    },
    {
        word: "IMPRESSIVELY",
        hint: "In a way that leaves a strong or favorable impact."
    },
    {
        word: "WONDERFUL",
        hint: "Extremely good or delightful."
    },
    {
        word: "ANOMALOUS",
        hint: "Deviating from what is standard, normal, or expected"
    }
];

// Reset the game
function resetGame() {
    correctLetters = [];
    wrongGuessCount = 0;
    updateHangmanImage();
    updateGuessesText();
    enableAllButtons();
    resetWordDisplay();
    hideGameModal();
}

// Update the hangman image
function updateHangmanImage() {
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
}

// Update the guesses text
function updateGuessesText() {
    guessesText.textContent = `${wrongGuessCount} / ${maxGuesses}`;
}

// Enable all keyboard buttons
function enableAllButtons() {
    const buttons = keyboardDiv.querySelectorAll("button");
    buttons.forEach(button => button.disabled = false);
}

// Reset the word display
function resetWordDisplay() {
    const wordLetters = currentWord.split("").map(letter => {
        if (letter === " ") {
            return '<li class="space"></li>';
        }
        return '<li class="letter"></li>';
    }).join("");
    wordDisplay.innerHTML = wordLetters;
}

// Hide the game modal
function hideGameModal() {
    gameModal.classList.remove("show");
}

// Get a random word from the word list
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const { word, hint } = wordList[randomIndex];
    currentWord = word.toUpperCase();
    hintDisplay.textContent = `Hint: ${hint}`;
    resetGame();
}

// Game over logic
function gameOver(isVictory) {
    setTimeout(() => {
        const modalText = isVictory ? "You found the correct word:" : "Game Over!";
        const imgSrc = `images/${isVictory ? "victory" : "lost"}.gif`;
        gameModal.querySelector("img").src = imgSrc;
        gameModal.querySelector("h4").textContent = isVictory ? "Congrats" : "Game Over!";
        correctWordDisplay.textContent = currentWord;
        gameModal.classList.add("show");
    }, 600);
}

// Initialize the game
function handleGuess(button, clickedLetter) {
    if (currentWord.includes(clickedLetter) && !correctLetters.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(clickedLetter);
                updateWordDisplay(index, clickedLetter);
            }
        });
    } else {
        wrongGuessCount++;
        updateHangmanImage();
    }

    disableButton(button);
    updateGuessesText();

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.replace(/ /g, "").length) return gameOver(true);
}

// Function to update the displayed word
function updateWordDisplay(index, letter) {
    const letterElements = wordDisplay.querySelectorAll(".letter");
    letterElements[index].textContent = letter;
    letterElements[index].classList.add("guessed");
}

// Disable a button
function disableButton(button) {
    button.disabled = true;
}

// Add a keydown event listener to capture keyboard input
document.addEventListener("keydown", (event) => {
    if (/^[A-Z]$/.test(event.key.toUpperCase())) {
        const key = event.key.toUpperCase();
        const buttons = keyboardDiv.querySelectorAll("button");
        for (const button of buttons) {
            if (button.textContent === key && !button.disabled) {
                handleGuess(button, key);
                break;
            }
        }
    }
});

// Create the keyboard buttons and add event listeners
for (let letterCharCode = 65; letterCharCode <= 90; letterCharCode++) {
    const letter = String.fromCharCode(letterCharCode);
    const button = document.createElement("button");
    button.textContent = letter;
    keyboardDiv.appendChild(button);
    button.addEventListener("click", () => handleGuess(button, letter));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
