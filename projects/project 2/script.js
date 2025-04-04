const hitSound = new Audio('hit.mp3');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const overlay = document.querySelector('.overlay');
const status = document.querySelector('.status');
const button = document.querySelector('button');
let lastHole;
let timeUp = false;
let score = 0;


function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000); 
    const hole = randomHole(holes); 
    hole.classList.add('up'); 
    setTimeout(() => {
        hole.classList.remove('up'); 
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    holes.forEach(hole => hole.classList.remove('up'));
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    overlay.classList.remove('active');
    peep();
    setTimeout(() => {
        timeUp = true;
        overlay.classList.add('active'); 
        status.textContent = `Game Over! Your score: ${score}`;
        button.textContent = 'Play Again';
    }, 15000);
}

function wack(e) {
    if (!e.isTrusted || timeUp) return;
    const hitSound = new Audio('hit.mp3');
    hitSound.play();
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack));
