// Initialize Game
// START GAME
//   SETUP deck of 52 cards
//   SHUFFLE deck
//   DEAL 5 cards to each player (7 for 2 players)
//   SET current player to Player 1

// Main Game Loop
// WHILE no player has won
//   DISPLAY current player's hand
//   DISPLAY current backs of cards for all other players

// Player's Turn
//   ASK current player to choose another player to request a card from
//   ASK current player to choose a card to request

// Check if other player has the requested card
//   IF chosen player has the card requested
//     TRANSFER card requested from chosen player to current player
//     DISPLAY successful transfer message
//   ELSE
//     DISPLAY "Go Fish" message
//     DRAW a card from the deck for the current player
//     IF drawn card matches the card
//       DISPLAY "You drew the card you asked for!" message

// Check if deck is empty
//   IF deck is empty
//     END game and determine winner based on number of cards

// Switch turn to next player
//   SET next player as current player

// End Game
// DISPLAY winner based on who has the most cards
// DISPLAY final hands of all players
// END GAME


// declare variables

const gameLog = [''];
const message = '';

const names = ['you', 'the computer', 'the second computer', 'the third computer']
const scores = [0, 0];
const playerScore = scores[0];
const comScore = scores[1];
const playerCards = [];
const comCards = [];

const init = () => {
    deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
};



// cached element references

// let player = document.querySelector('#player');
// let com = document.querySelector('#computer');
// let deck = document.querySelector('#deck');


// functions 


const finalScore = () => {
    let highScore = Math.max.apply(Math, scores);
    if (playerScore === comScore) {
        console.log(`It's a tie! You both scored ${playerScore}!`)
    } else {
    let scoreIndex = scores.indexOf(highScore); // this gets index of the highest score in the scores array
    let winner = names[scoreIndex];
    console.log(`And the winner is... ${winner}`)
    }
}
finalScore()
const checkCards = () => {
    if (deck.length === 0 && playerHand.length === 0) {
        finalScore()
    } else {
        return
    }
};

const render = () => {
    checkCards()
}

// event listeners

// // Declare variables
// const deck1 = []
// const deck2 = []
// const p1 = []
// const p2 = []
// const p3 = []
// const p4 = []
// const p5 = []
// const p6 = []
// const turns = []
// const scores = []
// const gameLog = []
// const gameStatus = ""
// const gameSize = [3, 4, 5, 6]
// const table = [
//     '', '', '', '', '',
// ]

// let currentTurn
// let cardToRemove


// // Cached element references
// let deck1El = document.querySelector('#deck-1')
// let deck2El = document.querySelector('#deck-2')
// let deal = document.querySelector('#btn')

// // Functions

// /*
// const takingTurns = () => {
//     if (turns[turns.length-1] === 'p1') {
//         playerTurn()
//     } else if (turns[turns.length-1] === 'p2') {
//         p2Turn()
//     } else if (turns[turns.length-1] === 'p3') {
//         p3Turn()
//     } else if (turns[turns.length-1] === 'p4') {
//         p4Turn()
//     } else if (turns[turns.length-1] === 'p5') {
//         p5Turn()
//     } else if (turns[turns.length-1] === 'p6') {
//         p6Turn()
//     }
//     const playerTurn = () => {
//         p1SelectPlayer()
//         p1SelectCard()
//         ask()
//         addPoint()
//         turns.push('p2')
//     }
//     const p2Turn = () => {
//         comSelectPlayer()
//         comSelectCard()
//         ask()
//         addPoint()
//         turns.push('p3')
//     }
//     const p3Turn = () => {
//         comSelectPlayer()
//         comSelectCard()
//         ask()
//         addPoint()
//         if (players > 3) {
//         turns.push('p4')
//         } else {
//         turns.push('p1')
//         }
//     }
//     const p4Turn = () => {
//         comSelectPlayer()
//         comSelectCard()
//         ask()
//         addPoint()
//         if (players > 4) {
//         turns.push('p5')
//         } else {
//         turns.push('p1')
//         }
//     }
//     const p5Turn = () => {
//         comSelectPlayer()
//         comSelectCard()
//         ask()
//         addPoint()
//         if (players > 5) {
//         turns.push('p6')
//         } else {
//         turns.push('p1')
//         }
//     }
//     const p6Turn = () => {
//         comSelectPlayer()
//         comSelectCard()
//         ask()
//         addPoint()
//         turns.push('p1')
//     }
// }
// */

// // Initialize deck 1 with array of 52 cards
// const init = () => {
//     deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
//   }
//   // invoke the function
//   init()

// const render = (cardPicked) => {
//     // Remove outline class when first card is picked
//     if (deck2.length === 1) {
//         deck2El.classList.remove("outline")
//     }
//     // Removes previously picked card from deck 2 class list
//     if (deck2.length >1) {
//         deck2El.classList.remove(cardToRemove)
//     }
//     // Add current card picked to deck 2 element
//     deck2El.classList.add(cardPicked)
//     cardToRemove = cardPicked
//     // Adjust shadow when deck gets above/below halfway full
//     if (deck2.length === 26) {
//         deck2El.classList.add("shadow");
//         deck1El.classList.remove("shadow");
//     }
//     // Remove card back color and add outline when last card is picked
//     if (deck1.length === 0) {
//         deck1El.classList.add("outline");
//         deck1El.classList.remove("back-blue");
//     }
// }

// // Function to handle a button click:
// const handleDeal = () => {
//     if (deck1.length > 0) {
//     let randomIdx = Math.floor(Math.random() * deck1.length)
//     let cardPicked = deck1.splice(randomIdx, 1)[0]
//     deck2.push(cardPicked)
//     render(cardPicked)
// }
//     // Randomly select number from total cards remaining
//     // Assign card with the random index to a variable
//     // Add card picked to deck 2
//     // Pass card picked to render function to display
//   };

// // Event listeners

// deal.addEventListener('click', handleDeal)








// // player selection

// /*

// const p1SelectPlayer = () => {
//     let player = }

// */

// // how to add points

// /*

// const addPoint = () => {
//     if }

// */

// // number of players
// // it knows the number of players based on my selection
// // i select from an array how many players

// /*

// const numPlayers = () = >{
//     }

// */

// // result
// /* 

// const result = () => {
//     if the selected player's hand has the card, remove it and add one point
//     if not then say there was no match
//     selectedPlayer.forEach(card) => {
//         if (card === selectedCard) {
//         selectedPlayer.splice(card, 1)

//         } else {gameStatus.push(`Player ${turn} asks )}}
// */

// // to deal the cards

// /*

// const handleDeal = () => {
//     if }

// */