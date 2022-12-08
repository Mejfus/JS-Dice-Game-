'use strict';
//  Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
initialization();
// Kako ce se menjati ko je activePlayer
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Ranije gore smo definisali da je activePlayer =0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //Active player je active player tj player0 , osim ako nije 1 u svakom drugom slucaju je 0
  //  Toggle menja aktivnog plejera, tj ako jedan ima klasu active izbrisace je, i dodeliti drugom
  player0El.classList.toggle('player--active'); //Player 0 Player0El dobija class active ako je nema i ako je ima oduzima mu se
  player1El.classList.toggle('player--active'); //Player 1 Player1El dobiaja class active ako je nema i ako je ima oduzima mu se
};
// Generating dice roll and saving score

btnRoll.addEventListener('click', function () {
  // Playing je uslov koji smo postavili true i samo ako je playing === true kod ce biti aktivan
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //Obratiti paznju na ovo!!

    // 3. Check for rolled 1, switch to next player
    if (dice !== 1) {
      currentScore += dice; // Na current score se dodaje sledeci dice roll
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //U zavisnosti od toga koji je activePlayer dodaje mu se currentScore = currentScore+dice
    } else {
      switchPlayer();
    }
  }
});

// 1. Add current score to active player's score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score <= 100;

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialization);
