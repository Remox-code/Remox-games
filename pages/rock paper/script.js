let userChoose = document.querySelectorAll(".choosed-weapon")
let cpuChoose = document.querySelectorAll(".cpu-choosed-weapon")

let userPoint = document.querySelector("#user-point")
let cpuPoint = document.querySelector("#cpu-point")

let userPointTotal = document.querySelector("#user-point-total")
let cpuPointTotal = document.querySelector("#cpu-point-total")

let result = document.querySelector("#result")

let canChoose = true
let history = []

// انتخاب کاربر
for (let i = 0; i < userChoose.length; i++) {

    userChoose[i].addEventListener("click", () => {

        if (!canChoose) return

        // وقتی انتخاب شد → متن ریزولت پاک شود
        result.innerHTML = ""

        canChoose = false

        hideOthers(i)

        let cpu = cpuAI()

        setTimeout(() => {
            cpuChoose[cpu].classList.remove("hidden")
            game(i, cpu)
        }, 600)

    })
}

// مخفی کردن بقیه
function hideOthers(i) {
    for (let j = 0; j < userChoose.length; j++) {
        if (j !== i) userChoose[j].classList.add("hidden")
    }
}

// CPU هوشمند
function cpuAI() {

    if (history.length < 3)
        return Math.floor(Math.random() * 3)

    let rock = 0, paper = 0, scissors = 0

    history.forEach(v => {
        if (v == 0) rock++
        if (v == 1) paper++
        if (v == 2) scissors++
    })

    if (rock >= paper && rock >= scissors) return 1
    if (paper >= rock && paper >= scissors) return 2
    if (scissors >= rock && scissors >= paper) return 0

    return Math.floor(Math.random() * 3)
}

// گیم اصلی
function game(user, cpu) {

    history.push(user)

    if (user === cpu) {
        result.innerHTML = "Draw!"
        result.style.color = "white"
    }

    else if (
        (user === 0 && cpu === 2) ||
        (user === 1 && cpu === 0) ||
        (user === 2 && cpu === 1)
    ) {
        userPoint.innerHTML++
        result.innerHTML = "You win this round!"
        result.style.color = "lightgreen"
    }

    else {
        cpuPoint.innerHTML++
        result.innerHTML = "CPU wins this round!"
        result.style.color = "red"

        document.body.classList.add("shake")
        setTimeout(() => document.body.classList.remove("shake"), 400)
    }

    checkMatchWinner()
}


// بررسی برنده شدن مچ (3 امتیاز)
function checkMatchWinner() {

    if (userPoint.innerHTML == 3) {

        userPointTotal.innerHTML++

        // امتیازات راند صفر شود
        userPoint.innerHTML = 0
        cpuPoint.innerHTML = 0

        result.innerHTML = "You won the match!"
        result.style.color = "lightgreen"

        resetImages()

        checkTotalWinner()
    }

    else if (cpuPoint.innerHTML == 3) {

        cpuPointTotal.innerHTML++

        // امتیازات راند صفر شود
        userPoint.innerHTML = 0
        cpuPoint.innerHTML = 0

        result.innerHTML = "CPU won the match!"
        result.style.color = "red"

        resetImages()

        checkTotalWinner()
    }
}


// اگر total به 10 رسید
function checkTotalWinner() {

    if (userPointTotal.innerHTML == 10) {
        result.innerHTML = "User reached 10 points! Champion!"
        result.style.color = "gold"
        fullResetKeepText()
    }

    else if (cpuPointTotal.innerHTML == 10) {
        result.innerHTML = "CPU reached 10 points! Champion!"
        result.style.color = "orange"
        fullResetKeepText()
    }
}


// فقط عکس‌ها ریست شود (دکمه again)
function resetImages() {
    for (let i = 0; i < userChoose.length; i++) {
        userChoose[i].classList.remove("hidden")
        cpuChoose[i].classList.add("hidden")
    }

    canChoose = true
}


// FULL RESET ولی متن result باقی بماند
function fullResetKeepText() {

    history = []
    userPoint.innerHTML = 0
    cpuPoint.innerHTML = 0
    userPointTotal.innerHTML = 0
    cpuPointTotal.innerHTML = 0

    resetImages()
}


// دکمه‌ها
document.querySelector("#btn").addEventListener("click", () => {
    resetImages()
})

document.querySelector("#btnRefresh").addEventListener("click", () => {
    fullResetAll()
})


// FULL RESET واقعی (refresh)
function fullResetAll() {

    result.innerHTML = ""

    history = []
    userPoint.innerHTML = 0
    cpuPoint.innerHTML = 0
    userPointTotal.innerHTML = 
    cpuPointTotal.innerHTML = 0

    resetImages()
}


// کلیدهای میانبر
document.addEventListener("keydown", e => {
    if (e.key === "a") resetImages()
    if (e.key === "r") fullResetAll()
})
