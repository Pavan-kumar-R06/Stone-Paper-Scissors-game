let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

const getCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.textContent = "It's a draw!";
    msg.style.backgroundColor = "#ffc107"; // Yellow
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.textContent = userScore;
        msg.textContent = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "#4caf50";
    } else {
        compScore++;
        compScorePara.textContent = compScore;
        msg.textContent = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "#f44336";
    }

    // End Game at 10 points
    if (userScore === 10 || compScore === 10) {
        setTimeout(() => {
            if (userScore === 10) {
                msg.textContent = "🎉 You won the game!";
                msg.style.backgroundColor = "#4caf50";
            } else {
                msg.textContent = "💻 Computer won the game!";
                msg.style.backgroundColor = "#f44336";
            }
        }, 500);
    }
};

const playGame = (userChoice) => {
    const compChoice = getCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = false;
        if (
            (userChoice === "rock" && compChoice === "scissors") ||
            (userChoice === "paper" && compChoice === "rock") ||
            (userChoice === "scissors" && compChoice === "paper")
        ) {
            userWin = true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (userScore < 10 && compScore < 10) {
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        }
    });
});

// Reset logic
resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.textContent = "0";
    compScorePara.textContent = "0";
    msg.textContent = "Play your move";
    msg.style.backgroundColor = "#081b31";
});

// Optional: Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (userScore < 10 && compScore < 10) {
        if (key === "r") playGame("rock");
        if (key === "p") playGame("paper");
        if (key === "s") playGame("scissors");
    }

    if (key === "enter" || key === " ") {
        resetBtn.click();
    }
});
