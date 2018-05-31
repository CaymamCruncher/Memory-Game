/*
 * Create a list that holds all of your cards
 */
// Declares the value of cards and their values

const cardDeck = document.querySelector(".deck");
const cardValues = document.querySelectorAll(".card>i");
const cardClass = [];
const cards = document.querySelectorAll(".card");
let starNumber = document.querySelectorAll(".fa-star");

// Uses the shuffle function to randomize card values

for (cardValue of cardValues) {
  cardClass.push(cardValue.className);
  cardValue.className = "fa";
}
shuffle(cardClass);
for (let i = 0; i < cardClass.length; i++) {
  cardValues[i].className = cardClass[i];
}

// On card click calls flipCard function
cardDeck.addEventListener("click", flipCard);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
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
  if (event.target.className.includes("card")) {
    event.target.className += " open show";
    console.log("hey");
    checkNumCards();
  }
}

// checkNumCards checks to see if there is more than 1 card clicked and calls cardsMatch
function checkNumCards() {
  let numFlippedCards = document.querySelectorAll(".open");
  if (numFlippedCards.length > 1) {
    cardDeck.removeEventListener("click", flipCard);
    let match = cardsMatch(numFlippedCards);
    if (match) {
      numFlippedCards[0].className = "card match";
      numFlippedCards[1].className = "card match";
      cardDeck.addEventListener("click", flipCard);
      if (gameWon()) {
        endGame();
      }
    } else {
      numFlippedCards[0].className += " wrong";
      numFlippedCards[1].className += " wrong";
      setTimeout(function () {
        numFlippedCards[0].className = "card";
        numFlippedCards[1].className = "card";
        cardDeck.addEventListener("click", flipCard);
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
    if (!card.classList.contains("match")) {
      console.log(card.classList);
      return false;
    }
  }
  cardDeck.removeEventListener("click", flipCard);
  return true;
}

// gamOver ends the game and gives your score and time

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
