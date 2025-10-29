const cardGrid = document.getElementById('card-grid');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const newGameBtn = document.getElementById('new-game');
const message = document.getElementById('message');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let seconds = 0;

const images = [
  '🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍒', '🍉'
];

function generateCards() {
  const cardFaces = [...images, ...images];
  cardFaces.sort(() => 0.5 - Math.random());
  return cardFaces;
}

function createCard(face) {
  const card = document.createElement('div');
  card.classList.add('card');

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.textContent = face;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', () => flipCard(card, face));
  return card;
}

function flipCard(card, face) {
  if (flippedCards.length === 2 || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push({ card, face });

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (first.face === second.face) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === images.length) {
      clearInterval(timer);
      message.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove('flip');
      second.card.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
}

function startTimer() {
  clearInterval(timer);
  seconds = 0;
  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Time: ${seconds}s`;
  }, 1000);
}

function startGame() {
  cardGrid.innerHTML = '';
  message.classList.add('hidden');
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  movesDisplay.textContent = 'Moves: 0';
  timerDisplay.textContent = 'Time: 0s';

  const cardFaces = generateCards();
  cardFaces.forEach(face => {
    const card = createCard(face);
    cardGrid.appendChild(card);
  });

  startTimer();
}

newGameBtn.addEventListener('click', startGame);

startGame();