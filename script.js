// Initialize Game
// START GAME
//   SETUP deck of 52 cards | done
//   SHUFFLE deck | done
//   DEAL 5 cards to each player (7 for 2 players) | done
//   SET current player to Player 1 | done 

// Main Game Loop
// WHILE no player has won
//   DISPLAY current player's hand | done
//   DISPLAY current backs of cards for all other players | done

// Player's Turn
//   MAKE the comCards playerCards match own cards at the start of the game
//   ASK current player to choose another player to request a card from | done
//   ASK current player to choose a card to request | done

// Check if other player has the requested card
//   IF chosen player has the card requested | done
//     TRANSFER card requested from chosen player to current player | done
//     DISPLAY successful transfer message | done
//   ELSE
//     DISPLAY "Go Fish" message | done
//     DRAW a card from the deck for the current player | done
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

const gameLog = [];


const names = ['you', 'the computer']
const scores = [0, 0];
const playerCards = [];
const comCards = [];
const matches =[];
const playerPairs = []
const comPairs = []

let deck = ["dA0","dQ0","dK0","dJ0","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA0","hQ0","hK0","hJ0","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA0","cQ0","cK0","cJ0","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA0","sQ0","sK0","sJ0","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
let currentPlayer
let rank
let message





// cached element references

let handEl = document.querySelector('.hand');
let comEl = document.querySelector('.computer-player');
let deckEl = document.querySelector('#deck');

// functions 

const deal = () => {
    while (playerCards.length < 7) {
        comCards.push(deck.pop())
        playerCards.push(deck.pop())
    }
}

const checkCards = () => {

    // this checks for matches in the computer's hand
    if (deck.length === 0 && playerHand.length === 0) {
        message = `Great game! Let's check the final score.`
        gameLog.push(message)
        currentPlayer = 'game over'
        finalScore()
    } else {
        return
    }
};

const shuffle = (deck) => {
    for (var i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp
    }
}

const showHands = () => {
    playerCards.forEach(card => {
        const newCardEl = document.createElement('li')
        newCardEl.classList.add("card", card)
        handEl.appendChild(newCardEl)
    });
    comCards.forEach(card => {
        const newCardEl = document.createElement('li')
        newCardEl.classList.add("card","back-blue", card)
        comEl.appendChild(newCardEl)
    });
}

const turns = () => {
    if (currentPlayer === 'Player 1') {
        message = `It's your turn. Click on the card you want to make a pair with.`
        gameLog.push(message)
    }
}

const init = () => {
    shuffle(deck)
    deal()
    // checkCards()
    showHands()
    currentPlayer = 'Player 1'
    turns()
};

//testing area
init()
console.log(`these are the com's cards ${comCards}, and these are your cards ${playerCards}`)
    for (i=0;i<playerCards.length;i++) {
        let tempArray = [...playerCards]
        let rank = playerCards[i][1]+playerCards[i][2]
        tempArray.splice(i,1,'')
        for (idx of tempArray) {
            if (idx !== '') {
                let match = idx[1]+idx[2]
                if (rank === match) {
                        console.log(playerCards)
                        playerPairs.push(playerCards[i])
                        playerCards.splice(i,1)
                        playerPairs.push(playerCards[playerCards.findIndex(element => element.includes(`${match}`))])
                        playerCards.splice(playerCards.findIndex(element => element.includes(`${match}`)),1)
                        // use the partial match with the .includes function
                        console.log(playerCards)

                    // pairs.push(idx)
                    // pairs.push(playerCards[i])
                    // if (pairs.length === 2) {
                        // const playerCardEl1 = document.getElementsByClassName(idx)
                        // const playerCardEl2 = document.getElementsByClassName(playerCards[i])
                        // scores[0]=scores[0]+1
                        // playerCardEl1[0].parentNode.removeChild(playerCardEl1[0])
                        // playerCardEl2[0].parentNode.removeChild(playerCardEl2[0])
                        // pairs.length=0
                    // }
                    // remove elements from hand
                    // this removes an odd number of cards, how do I make it only pairs?
                    // push the cards into a pairs array and remove the elements through that
                }
            }
        }

            //         // remove elements from hand

            //         // remove values from playerCards
            //         // console.log(playerCards)
            //     }
            //     }
            // })
            // console.log(`this is the ${card} loop`)
        }
// close of testing area


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

const render = () => {
    checkCards()
}

// event listeners

handEl.addEventListener('click', (event) => {
    rank = String(event.target.classList[1][1])+String(event.target.classList[1][2])
    if (currentPlayer === 'Player 1' && rank !== '') {
        for (let i = 0; i < comCards.length; i++) {
            let comCardEl = document.getElementsByClassName(comCards[i])
            let match = String(comCards[i][1]+comCards[i][2])
            let myCard = event.target.classList[1]
            if (rank === match) {
                scores[0] = scores[0]+1 // increase player score by 1
                matches.push(myCard) // saving this to show the player's card in the middle of the table
                matches.push(comCards[i]) // saving this to show the computer's card in the middle of the table
                message = `It's a match! The computer had a ${comCards[i]}. You have ${playerScore} points.`
                gameLog.push(message)
                event.target.remove() // this removes the HTML element from .hand
                playerCards.splice(playerCards.indexOf(myCard),1) // this removes the corresponding array element
                comCardEl[0].parentNode.removeChild(comCardEl[0]) // this removes the HTML element from computer
                comCards.splice(i,1) // this removes the corresponding array element
                currentPlayer = 'Computer'
                console.log("it's a girl!", scores)
                return
            }
        }
        const newCardEl = document.createElement('li')
        message = `Oops, looks like the computer doesn't have a match. Let's go fish!`
        gameLog.push(message)
        playerCards.push(deck.pop())
        newCardEl.classList.add("card", playerCards[playerCards.length-1])
        handEl.appendChild(newCardEl)
        currentPlayer = 'Computer'
        checkCards()
    }
});