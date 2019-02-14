/*
 * Create a list that holds all of your cards
 */
// Declares the value of cards and their values

const cardDeck = document.querySelector('.deck');
const cardValues = document.querySelectorAll('.card>i');
const cardClass = [];
const cards = document.querySelectorAll('.card');
const container = document.querySelector('.container');
const victoryScreen = document.querySelector('.victory');
const starNumber = document.querySelector('.stars');
const restartButton = document.querySelectorAll('.fa-repeat');
const resetStar = document.querySelectorAll('.stars>li');
let timerStarted = false;
let timer = document.querySelector('.timer');
let interval;
let minutes = 0;
let seconds = 0;
let restarting = false;
let score = document.querySelector('.score');
let moveCount = document.querySelector('.moves');
let moveValue = 0;
let starLoss = 15;
let starScore = 3;

// Uses the shuffle function to randomize card values
randomizeCards();

// On card click calls flipCard function
cardDeck.addEventListener('click', flipCard);
console.log(resetStar)

// On restart button click calls shuffle
restartButton[0].addEventListener('click', restartGame);
restartButton[1].addEventListener('click', restartGame);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function that flips cards on call and calls cardsMatch if more than 1 is open

function flipCard(event) {
  if (!timerStarted) {
    startTimer();
  }
  if (event.target.className.includes('card') && !event.target.className.includes('match')) {
    event.target.className += ' open show';
    checkNumCards();
  }
}

// checkNumCards checks to see if there is more than 1 card clicked and calls cardsMatch
function checkNumCards() {
  let numFlippedCards = document.querySelectorAll('.open');
  if (numFlippedCards.length > 1) {
    cardDeck.removeEventListener('click', flipCard);
    moveValue += 1;
    moveCount.textContent = moveValue;
    loseStar();
    let match = cardsMatch(numFlippedCards);
    // if cards match then sets them to matched and checks if game is won
    if (match) {
      numFlippedCards[0].className = 'card match';
      numFlippedCards[1].className = 'card match';
      cardDeck.addEventListener('click', flipCard);
      if (gameWon()) {
        endGame();
      }
    // if cards don't match then it sets them to wrong and plays an animation
    } else {
      numFlippedCards[0].className += ' wrong';
      numFlippedCards[1].className += ' wrong';
      setTimeout(function () {
        numFlippedCards[0].className = 'card';
        numFlippedCards[1].className = 'card';
        cardDeck.addEventListener('click', flipCard);
      },900);
    }
  }
}

// cardsMatch function checks to see if 2 cards match and returns true or false

function cardsMatch(cards) {
  if (cards[0].firstElementChild.className === cards[1].firstElementChild.className) {
    return true;
  } else {
    return false;
  }
}

// gameWon function checks to see if all the cards match

function gameWon() {
  for (card of cards) {
    if (!card.classList.contains('match')) {
      return false;
    }
  }
  cardDeck.removeEventListener('click', flipCard);
  return true;
}

// endGame ends the game and gives your score and time

function endGame() {
  container.style.display = 'none';
  victoryScreen.style.display = 'flex';
  score.textContent = 'You won in ' + moveValue + ' moves with ' + starScore + ' stars! Your final time was ' + timer.textContent;
  stopTimer();
}

// loseStar checks to see if you have enough moves to lose stars

function loseStar() {
  if (moveValue >= starLoss) {
    if (starLoss > 25) {
      return;
    }
    starNumber.removeChild(starNumber.firstElementChild);
    starLoss += 10;
    starScore -= 1;
  }
}

// restartGame resets moveCount and all the cards

function restartGame() {
  let restartCards = document.querySelectorAll('.deck>li');
  for (let i = 0; i < starNumber.children.length; i++) {
    starNumber.append(resetStar[i]);
  }
// loops through all the cards and makes sure they're all closed
  for (let p = 0; p < restartCards.length; p++) {
    restartCards[p].className = 'card';
  }
  moveValue = 0;
  moveCount.textContent = 0;
  starLoss = 15;
  starScore = 3;
  restarting = true;
  container.style.display = 'flex';
  victoryScreen.style.display = 'none';
  cardDeck.addEventListener('click', flipCard);
  stopTimer();
  randomizeCards();
}

// randomizeCards calls shuffle function to randomize all the cards

function randomizeCards() {
  for (cardValue of cardValues) {
    if (!restarting) {
      cardClass.push(cardValue.className);
    }
    cardValue.className = 'fa';
  }
  shuffle(cardClass);
  for (let i = 0; i < cardClass.length; i++) {
    cardValues[i].className = cardClass[i];
  }
}

// startTimer function starts once the user clicks a card.

function startTimer() {
  timerStarted = true;
  interval = setInterval(function () {
    seconds += 1;
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
    if (seconds < 10) {
      timer.textContent = minutes + ':0' + seconds;
    } else {
      timer.textContent = minutes + ':' + seconds;
    }
  },1000);

}

// stopTimer function stops the timer once the game ends

function stopTimer() {
  clearInterval(interval);
  if (!gameWon()) {
    seconds = 0;
    minutes = 0;
    timerStarted = false;
    timer.textContent = '00:00';
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
