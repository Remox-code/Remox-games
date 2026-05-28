let currentPlayer = 1;
let gameStarted = false;

let scores = {
    p1Total: 0,
    p2Total: 0,
    p1Current: 0,
    p2Current: 0
};

const startBtn = document.getElementById("startBtn");
const rollBtn = document.getElementById("rollBtn");
const holdBtn = document.getElementById("holdBtn");
const diceImg = document.getElementById("dice");

function updateUI() {
    document.getElementById("p1Total").textContent = scores.p1Total;
    document.getElementById("p2Total").textContent = scores.p2Total;
    document.getElementById("p1Current").textContent = scores.p1Current;
    document.getElementById("p2Current").textContent = scores.p2Current;

    document.getElementById("p1").classList.toggle("active", currentPlayer === 1);
    document.getElementById("p2").classList.toggle("active", currentPlayer === 2);

}

function resetGame() {
    scores = { p1Total: 0, p2Total: 0, p1Current: 0, p2Current: 0 };
    currentPlayer = 1;
    updateUI();
}

function switchPlayer(autoHold = false) {
    if (autoHold) {
        if (currentPlayer === 1) {
            scores.p1Total += scores.p1Current;
            scores.p1Current = 0;
        } else {
            scores.p2Total += scores.p2Current;
            scores.p2Current = 0;
        }
    } else {
        if (currentPlayer === 1) scores.p1Current = 0;
        else scores.p2Current = 0;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateUI();
}

function checkWinner() {
    if (scores.p1Total >= 100) {
        alert("Player One Wins!");
        gameStarted = false;
    }
    if (scores.p2Total >= 100) {
        alert("Player Two Wins!");
        gameStarted = false;
    }
}

/* =============================
            START
============================= */
startBtn.onclick = () => {
    gameStarted = true;
    resetGame();
    rollBtn.disabled = false;
    holdBtn.disabled = false;
    diceImg.style.display = "none";
};

/* =============================
            ROLL
============================= */
rollBtn.onclick = () => {
    if (!gameStarted) return;

    let roll = Math.floor(Math.random() * 6) + 1;
    diceImg.src = `../../img/dice${roll}.png`;
    diceImg.style.display = "block";

    let currentKey = currentPlayer === 1 ? "p1Current" : "p2Current";
    let totalKey = currentPlayer === 1 ? "p1Total" : "p2Total";

    if (roll === 1) {
        scores[currentKey] = 0;
        switchPlayer();
        return;
    }

    scores[currentKey] += roll;

    // اگر رسید به ۱۵ → خودکار Hold شود
    if (scores[currentKey] >= 15) {
        switchPlayer(true);
    }

    updateUI();
};

/* =============================
            HOLD
============================= */
holdBtn.onclick = () => {
    if (!gameStarted) return;

    if (currentPlayer === 1) {
        scores.p1Total += scores.p1Current;
        scores.p1Current = 0;
    } else {
        scores.p2Total += scores.p2Current;
        scores.p2Current = 0;
    }

    checkWinner();
    switchPlayer(true);
};
