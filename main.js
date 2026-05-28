let random;
let timer = 30;
let timerInterval;

let guessTimes = document.querySelector(".guess-Times");
let winTimes = document.querySelector(".win-Times");
let allGuessTimes = document.querySelector(".all-guess-Times");

let message = document.querySelector("#message");
let userInput = document.querySelector("#userGuess");
let guessBtn = document.querySelector("#guessBtn");
let historyList = document.querySelector("#historyList");
let difficulty = document.querySelector("#difficulty");

// --------------------------------------------------
// جلوگیری از وارد کردن اعداد بالاتر از رنج (فقط alert)
// --------------------------------------------------
function validateInput() {
    let max = Number(difficulty.value);
    let val = Number(userInput.value);

    if (val > max) {
        alert("Value is higher than allowed range!");
        userInput.value = "";
    }
}
userInput.addEventListener("input", validateInput);

// --------------------------------------------------
// بازی در ابتدا غیرفعال است
// --------------------------------------------------
userInput.disabled = true;
guessBtn.disabled = true;

// --------------------------------------------------
// Start Game
// --------------------------------------------------
document.querySelector("#startGame").addEventListener("click", () => {

    let max = Number(difficulty.value);
    random = Math.floor(Math.random() * max) + 1;

    // تعیین تایمر بر اساس سختی
    if (max === 50) timer = 30;        // Easy
    else if (max === 100) timer = 30;  // Normal
    else if (max === 500) timer = 30; // Hard

    document.querySelector("#timer").innerHTML = timer;

    userInput.disabled = false;
    guessBtn.disabled = false;
    userInput.value = "";

    message.innerHTML = "Game started! Enter your guess.";
    message.style.color = "black";

    startTimer();
});

// --------------------------------------------------
// Stop Game
// --------------------------------------------------
document.querySelector("#stopGame").addEventListener("click", () => {
    clearInterval(timerInterval);
    message.innerHTML = "Game stopped.";
    message.style.color = "black";
    userInput.disabled = true;
    guessBtn.disabled = true;
});

// --------------------------------------------------
// تایمر
// --------------------------------------------------
function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timer--;
        document.querySelector("#timer").innerHTML = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            message.innerHTML = "Time is up!";
            message.style.color = "red";
            userInput.disabled = true;
            guessBtn.disabled = true;
        }
    }, 1000);
}

// --------------------------------------------------
// دکمه Guess
// --------------------------------------------------
guessBtn.addEventListener("click", guessFunction);

function guessFunction() {
    let guess = Number(userInput.value);
    if (!guess) return;

    historyList.innerHTML += `<li>${guess}</li>`;
    guessTimes.innerHTML = Number(guessTimes.innerHTML) + 1;

    let diff = Math.abs(guess - random);

    // WIN
    if (guess === random) {
        message.innerHTML = "🎉 You win!";
        message.style.color = "green";
        winTimes.innerHTML = Number(winTimes.innerHTML) + 1;

        userInput.disabled = true;
        guessBtn.disabled = true;
        clearInterval(timerInterval);
        return;
    }

    // TOO HIGH
    if (guess > random) {
        if (diff <= 5) {
            message.innerHTML = "its so close! go smaller";
            message.style.color = "orange"; 
        } else {
            message.innerHTML = "its bigger than answer";
            message.style.color = "blue";
        }
    }

    // TOO LOW
    else {
        if (diff <= 5) {
            message.innerHTML = "its so close! go bigger";
            message.style.color = "orange";
        } else {
            message.innerHTML = "its smaller than answer";
            message.style.color = "blue";
        }
    }
}

// --------------------------------------------------
// Enter = Guess
// --------------------------------------------------
userInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        guessFunction();
    }
});

// --------------------------------------------------
// Again button
// --------------------------------------------------
document.querySelector("#again").addEventListener("click", () => {

    // اضافه شدن حدس‌های این راند به کل
    allGuessTimes.innerHTML =
        Number(allGuessTimes.innerHTML) + Number(guessTimes.innerHTML);

    guessTimes.innerHTML = 0;
    historyList.innerHTML = "";
    message.innerHTML = "New round! Start guessing.";
    message.style.color = "black";

    userInput.value = "";

    userInput.disabled = false;
    guessBtn.disabled = false;

    // تنظیم تایمر از نو بر اساس سختی
    let max = Number(difficulty.value);

    if (max === 50) timer = 30;
    else if (max === 100) timer = 30;
    else if (max === 500) timer = 30;

    document.querySelector("#timer").innerHTML = timer;

    clearInterval(timerInterval);
    startTimer();
});

// --------------------------------------------------
// Enable Input & Restart Timer button
// --------------------------------------------------
document.querySelector("#restartInput").addEventListener("click", () => {
    userInput.disabled = false;
    guessBtn.disabled = false;

    startTimer();
});
