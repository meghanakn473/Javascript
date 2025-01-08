// Variables for modes and scores
let mode = ""; // "easy" or "hard"
let userScore = 0;
let compScore = 0;

// DOM elements
const difficultySelection = document.querySelector("#difficulty-selection");
const gameContainer = document.querySelector("#game");
const msg = document.querySelector("#msg");
const userScoreSpan = document.querySelector("#user-score");
const compScoreSpan = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset");
const choices = document.querySelectorAll(".choice");
const modeBtn = document.querySelector("#mode");
const easyModeBtn = document.querySelector("#easy-mode");
const hardModeBtn = document.querySelector("#hard-mode");

// Dark/Light mode toggle
let body = document.querySelector("body");
let currMode = body.classList.contains("dark") ? "dark" : "light";
modeBtn.addEventListener("click", () => {
    if (currMode === "light") {
        currMode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
    } else {
        currMode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
});

// Reset game
resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    updateScores();
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
});

// Select difficulty mode
easyModeBtn.addEventListener("click", () => {
    mode = "easy";
    startGame();
});

hardModeBtn.addEventListener("click", () => {
    mode = "hard";
    startGame();
});

// Start the game by showing the game container
const startGame = () => {
    difficultySelection.style.display = "none";
    gameContainer.style.display = "block";
};

// Generate computer's choice
const genCompChoice = (userChoice) => {
    const options = ["rock", "paper", "scissors"];
    if (mode === "easy") {
        // Random choice in Easy mode
        return options[Math.floor(Math.random() * 3)];
    } else if (mode === "hard") {
        // Smarter choice in Hard mode
        if (userChoice === "rock") return "paper"; // Paper beats Rock
        if (userChoice === "paper") return "scissors"; // Scissors beats Paper
        if (userChoice === "scissors") return "rock"; // Rock beats Scissors
    }
};

// Determine the winner
const determineWinner = (userChoice, compChoice) => {
    if (userChoice === compChoice) {
        drawGame();
    } else if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        showWinner(true, userChoice, compChoice);
    } else {
        showWinner(false, userChoice, compChoice);
    }
};

// Update scores
const updateScores = () => {
    userScoreSpan.innerText = userScore;
    compScoreSpan.innerText = compScore;
};

// Draw game
const drawGame = () => {
    msg.innerText = "It's a draw!";
    msg.style.backgroundColor = "#081b31";
};

// Show winner
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScoreSpan.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScoreSpan.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "red";
    }
};

// Handle user choice
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.id;
        const compChoice = genCompChoice(userChoice);
        determineWinner(userChoice, compChoice);
    });
});
