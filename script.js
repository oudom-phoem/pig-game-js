'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore0 = 0;
let currentScore1 = 0;

let currentPlayer = 0;

let totalScore0 = 0;
let totalScore1 = 0;

const switchPlayer = function () {
  if (currentPlayer === 0) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    currentPlayer += 1;
  } else if (currentPlayer === 1) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    currentPlayer -= 1;
  }
};

// ROLL DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  const diceNum = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `./img/dice-${diceNum}.png`;

  if (diceNum !== 1) {
    if (currentPlayer === 0) {
      currentScore0 += diceNum;
      currentScore0El.textContent = currentScore0;
    } else {
      currentScore1 += diceNum;
      currentScore1El.textContent = currentScore1;
    }
  } else {
    if (currentPlayer === 0) {
      currentScore0 = 0;
      currentScore0El.textContent = currentScore0;
      switchPlayer();
    } else {
      currentScore1 = 0;
      currentScore1El.textContent = currentScore1;
      switchPlayer();
    }
  }
});

// USERS HOLD SCORE
btnHold.addEventListener('click', function () {
  if (currentPlayer === 0) {
    totalScore0 += currentScore0;
    currentScore0 = 0;
    currentScore0El.textContent = currentScore0;
    score0El.textContent = totalScore0;
    if (totalScore0 >= 100) {
      player0.classList.add('player--winner');
    }
  } else if (currentPlayer === 1) {
    totalScore1 += currentScore1;
    currentScore1 = 0;
    score1El.textContent = totalScore1;
    currentScore1El.textContent = currentScore1;
    if (totalScore1 >= 100) {
      player1.classList.add('player--winner');
    }
  }
  switchPlayer();
});

// USERS REST GAME
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore0 = 0;
  currentScore1 = 0;
  score0El.textContent = currentScore0;
  score1El.textContent = currentScore1;

  totalScore0 = 0;
  totalScore1 = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  if (currentPlayer === 1) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    currentPlayer -= 1;
  }
});
