const hitSound = new Audio('hit.mp3');
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const moles = document.querySelectorAll('.mole');
const overlay = document.querySelector('.overlay');
const status = document.querySelector('.status');
const button = document.querySelector('button');
let lastHole;
let timeUp = false;
let score = 0;
let timeLeft;
let timerInterval;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    holes.forEach(hole => hole.classList.remove('up'));
    scoreBoard.textContent = 0;
    timerDisplay.textContent = 20;
    timerDisplay.classList.remove('critical');
    timeUp = false;
    score = 0;
    timeLeft = 20;
    
    startSound.play();
    
    overlay.classList.remove('active');
    peep();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if(timeLeft <= 5) {
            timerDisplay.classList.add('critical');
        }
        
        if(timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    timeUp = true;
    overlay.classList.add('active');
    status.textContent = `Game Over! Score: ${score}`;
    button.textContent = 'Play Again';
    endSound.play();
}

function wack(e) {
    if (!e.isTrusted || timeUp) return;
    hitSound.currentTime = 0;
    hitSound.play();
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack));
