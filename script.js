//PLayer Variables

const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const playerHeading1 = document.querySelector('.player-1-heading');
const playerHeading2 = document.querySelector('.player-2-heading');

//Score Variables

const mainScore1 = document.querySelector('.main-score-1');
const mainScore2 = document.querySelector('.main-score-2');
const currentScore1 = document.querySelector('.current-score-1');
const currentScore2 = document.querySelector('.current-score-2');

//Button Variables

const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.roll-dice');
const hold = document.querySelector('.hold');
const newGame = document.querySelector('.new-game');

//PlayerState

const playerState = {
  player1,
  player2,
  playerHeading1,
  playerHeading2,
  currentScore1,
  currentScore2,
  mainScore1,
  mainScore2,
};
//Initial Variables

let high;
let low;
let activePlayer;
let currentScore;
let mainScoreArr;

//Init Function
const init = function () {
  if (!dice.classList.contains('hidden')) dice.classList.toggle('hidden');
  currentScore = 0;
  mainScoreArr = [0, 0];
  currentScore1.textContent = currentScore;
  currentScore2.textContent = currentScore;
  mainScore1.textContent = currentScore;
  mainScore2.textContent = currentScore;
  high = 6;
  low = 1;
  activePlayer = 1;
};

//Change PLayer
const changePLayer = function () {
  currentScore = 0;
  playerState[`currentScore${activePlayer}`].textContent = currentScore;
  playerState[`player${activePlayer}`].classList.toggle('player-active');
  playerState[`player${activePlayer}`].classList.toggle('player-not-active');
  activePlayer = activePlayer === 1 ? 2 : 1;
  playerState[`player${activePlayer}`].classList.toggle('player-active');
  playerState[`player${activePlayer}`].classList.toggle('player-not-active');
};

//resetPlayer Function
const resetPLayers = function () {
  playerState[`player${activePlayer}`].classList.remove('player-winner');
  playerState[`mainScore${activePlayer}`].classList.remove('winner-score');
  playerState[`playerHeading${activePlayer}`].textContent = `PLAYER ${activePlayer}`;
  if (!player1.classList.contains('player-active')) {
    player1.classList.add('player-active');
    player1.classList.remove('player-not-active');
    player2.classList.remove('player-active');
    player2.classList.add('player-not-active');
  }
};

init();

//ROLL DICE  FUNCTIONALITY

rollDice.addEventListener('click', () => {
  if (mainScoreArr[activePlayer - 1] < 100) {
    //Generate Random Number

    const randomNumber = Math.trunc(Math.random() * (high - low + 1)) + low;

    //Show Dice
    dice.src = `./img/dice-${randomNumber}.png`;
    if (dice.classList.contains('hidden')) dice.classList.remove('hidden');

    //Add to current Score

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      playerState[`currentScore${activePlayer}`].textContent = currentScore;
    } else {
      changePLayer();
    }
  }
});

//HOLD FUNCTIONALITY

hold.addEventListener('click', function () {
  mainScoreArr[activePlayer - 1] += currentScore;
  playerState[`mainScore${activePlayer}`].textContent = mainScoreArr[activePlayer - 1];
  if (mainScoreArr[activePlayer - 1] >= 100) {
    currentScore = 0;
    playerState[`currentScore${activePlayer}`].textContent = currentScore;
    playerState[`player${activePlayer}`].classList.add('player-winner');
    playerState[`playerHeading${activePlayer}`].textContent = 'WINNER';
    playerState[`mainScore${activePlayer}`].classList.add('winner-score');
    dice.classList.add('hidden');
  } else {
    //SWITCH PLAYER
    changePLayer();
  }
});

//NEW GAME FUNCTIONALITY
newGame.addEventListener('click', function () {
  resetPLayers();
  init();
});
