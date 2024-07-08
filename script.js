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
//   MAKE the comCards playerCards match own cards at the start of the game | done
//   ASK current player to choose another player to request a card from | done
//   ASK current player to choose a card to request | done

// Check if other player has the requested card
//   IF chosen player has the card requested | done
//     TRANSFER card requested from chosen player to current player | done
//     DISPLAY successful transfer message | done
//   ELSE
//     DISPLAY "Go Fish" message | done
//     DRAW a card from the deck for the current player |
//     IF drawn card matches the card 
//       DISPLAY "You drew the card you asked for!" message | done

// Check if deck is empty | done
//   IF deck is empty | done
//     END game and determine winner based on number of cards | done

// Switch turn to next player | done
//   SET next player as current player | done

// End Game
// DISPLAY winner based on who has the most cards
// DISPLAY final hands of all players
// END GAME


// declare variables

const gameLog = [];
const names = ['you', 'the computer'];
const scores = [0, 0];


let deck = ["dA0","dQ0","dK0","dJ0","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA0","hQ0","hK0","hJ0","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA0","cQ0","cK0","cJ0","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA0","sQ0","sK0","sJ0","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
let playerCards = [];
let comCards = [];
let rank
let message
let playerTurn = false;
let gameOn = false;

// cached element references

let handEl = document.querySelector('.hand');
let comEl = document.querySelector('.computer-player');
let deckEl = document.querySelector('#deck');
let btnEl = document.querySelector('#btn');
let displayEl = document.querySelector('#display');


// functions 

// push the cards into the hands of the player(s)
const deal = () => { 
    while (playerCards.length < 7) {
        comCards.push(deck.pop());
        playerCards.push(deck.pop());
    };
};

// check the state of the game
const checkCards = () => {
    if (deck.length === 0 && playerHand.length === 0) {
        message = `Great game! Let's check the final score.`;
        updateLog();
        playerTurn = false;
        gameOn = false
        finalScore();
    } 
    if (deck.length > 0 && playerCards.length < 1) {
        message = `Looks like you're out of cards. Go fish!`;
        updateLog();
    };
};

// shuffle the cards
const shuffle = (deck) => {
    for (var i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    };
};

// render the cards in browser
const showHands = () => { 
    playerCards.forEach(card => {
        const newCardEl = document.createElement('li');
        newCardEl.classList.add("card", card);
        handEl.appendChild(newCardEl);
    });
    comCards.forEach(card => {
        const newCardEl = document.createElement('li');
        newCardEl.classList.add("card","back-blue", card);
        comEl.appendChild(newCardEl);
    });
};

// create a function to remove pairs at any point in the game
const removePairs = (arrayOfCards) => {

    for (i = 0; i < arrayOfCards.length; i++) {
        // store the value of the card that we are comparing to the rest of the deck
        let firstCard = arrayOfCards[i][1]+arrayOfCards[i][2];

        for (j = 0; j < arrayOfCards.length; j++) {

            // skip the card if it is the same index as firstCard
            // or if it has already been spliced
            if (j != i && arrayOfCards[i] != '' && arrayOfCards[j] != '') {

                // store the value of the card that we are comparing the firstCard agaist
                let secondCard = arrayOfCards[j][1]+arrayOfCards[j][2];

                //console.log(i, j, firstCard, secondCard);

                // if there is a match, set the card values to ''
                if (firstCard === secondCard) {

                    // log the points for the player
                    if (arrayOfCards === playerCards) {
                        scores[0] = scores[0]+1
                        message = `You paired your ${firstCard} with your ${secondCard}. Your score is now ${scores[0]}.`
                        gameLog.push(message)
                        updateLog()
                    }

                    // log the points for the computer
                    if (arrayOfCards === comCards) {
                        scores[1] = scores[1]+1
                        message = `The computer had a pair of ${firstCard}'s. Their score is now ${scores[1]}.`
                        gameLog.push(message)
                        updateLog()
                    }
                    
                    // cache the element before they are changed
                    let cardEl1 = document.getElementsByClassName(arrayOfCards[i])
                    let cardEl2 = document.getElementsByClassName(arrayOfCards[j])               
                    
                    // make all pairs an empty string to avoid three of a kinds
                    arrayOfCards.splice(i, 1, '');
                    arrayOfCards.splice(j, 1, '');
                    
                    // remove html using i and j as indexes to find matching value
                    cardEl1[0].parentNode.removeChild(cardEl1[0])
                    cardEl2[0].parentNode.removeChild(cardEl2[0])
                    
                }
            }            
        }        
    }
    // after we have found all pairs, filter the array for values that are not '' (do not have a pair)
    let result = arrayOfCards.filter((card) => card != '');
    return result;
}


// create a function to take turns
// const turns = () => {
//     while (gameOn = true) {
//         if (playerTurn = true) {
//             message = `It's your turn. Click on the card you want to make a pair with.`;
//             updateLog();
//         }

//         // create computer logic for the computer's turn
//         if (playerTurn = false) {

//             // the computer selects a card
//             let comCard = comCards[Math.floor(Math.random()*comCards.length)]
//             rank = comCard[1]+comCard[2]

//             message = `The computer asks for a ${comCard}.`
//             updateLog(message)
            
//             // compare the selected card with the player's cards
//             for (let i=0; i < playerCards; i++) {
//                 let playerCard = playerCards[i]
//                 let match = playerCards[i][1]+playerCards[i][2]

//                 // set the element in case of a match
//                 let playerCardEl = document.getElementsByClassName(playerCard)
                
//                 if (rank === match) {
//                     // move the card to the comCards array
//                     comCards.push(playerCard);

//                     // remove the card from the array and browser
//                     playerCards.splice(i,1);
//                     playerCardEl[0].parentNode.removeChild(playerCardEl[0]);
                    
//                     // remove the pair using the removePairs()
//                     removePairs(comCards);

//                     // check game state
//                     checkCards();
//                 }

//                 // message computer's results
//                 message = `The computer asked for a ${rank} but you didn't have one so it had to go fish!`;
//                 updateLog();
                
//                 // computer grabs a card and end turn
//                 goFish(comCards);
//             }
//         }
//     }
// }
    
const goFish = (arrayOfCards) => {
    
    // add new card to the array
    const newCardEl = document.createElement('li');
    arrayOfCards.push(deck.pop());

    // if player's turn add new card to the player's hand
    if (arrayOfCards === playerCards) {
        newCardEl.classList.add("card", playerCards[playerCards.length-1]);
        handEl.appendChild(newCardEl);

        // message the results
        message = `You picked up a ${playerCards[playerCards.length-1]}.`
        updateLog();

        // check for pairs
        playerCards = removePairs(playerCards);
        
        // check state of the game
        checkCards();

        // change turns
        playerTurn = false;
    }
    
    // if computer's turn add new card to the computer's hand
    if (arrayOfCards === comCards) {
        newCardEl.classList.add("card", "back-blue", comCards[comCards.length-1]);
        comEl.appendChild(newCardEl);

        // message the results
        message = `The computer picked up a card!`
        updateLog();

        // check for pairs
        comCards = removePairs(comCards);

        // check state of the game
        checkCards();

        // change turns
        playerTurn = true;
    }
};

const finalScore = () => {
    let highScore = Math.max.apply(Math, scores);
    if (playerScore === comScore) {
        message = `It's a tie! You both scored ${playerScore}!`;
        updateLog();
        btnEl.style.visibility = 'visible'
    } else {
        
        // get the index of the highest score
        let scoreIndex = scores.indexOf(highScore);
        let winner = names[scoreIndex];
        message = `And the winner is... ${winner}`;
        updateLog();
        btnEl.innerText = 'Start a New Game';
        btnEl.style.visibility = 'visible';
    }
}

const updateLog = (v) => {
    gameLog.push(message)
    const newMessageEl = document.createElement('li');
    newMessageEl.innerText = gameLog[gameLog.length-1];
    displayEl.appendChild(newMessageEl);
    displayEl.style.visibility = 'visible';
}

const handleTurn = (event) => {
    // create a var to hold the value card selected
    rank = event.target.classList[1][1]+event.target.classList[1][2]
    
    // set a condition for when a card is pickable and unpickable
    while (playerTurn = true) {
        if (btnEl.innerText !== 'Go fish!') {
            
            // check comCards for a match
            for (let i = 0; i <comCards.length; i++) {
                let comCard = comCards[i];
                let match = comCards[i][1]+comCards[i][2];

                // set the element in case of a match
                comCardEl = document.getElementsByClassName(comCard);

                if (rank === match) {
                    // move the card to the playerCards array
                    playerCards.push(comCard);

                    // remove the card from origin
                    comCards.splice(i,1);
                    comCardEl[0].parentNode.removeChild(comCardEl[0]);

                    // remove the pair
                    removePairs(playerCards);

                    // check game state
                    checkCards()
                }
            }
        }
        // create failure message
        message = `Oops, looks like the computer doesn't have a match. Let's go fish!`
        updateLog()
        btnEl.innerText = 'Go fish!'
        btnEl.style.visibility = 'visible'
    }
}

const render = () => {
    showHands();
    // turns();
    // console.log(playerCards, 'start playerCards');
    // console.log(comCards, 'start comCards');    
    playerCards = removePairs(playerCards);
    comCards = removePairs(comCards);
    // console.log(playerCards, 'end player cards');
    // console.log(comCards, 'end com cards');
    checkCards();
    displayEl.style.visibility = 'visible';
}

const init = () => {
    shuffle(deck);
    deal();
    render();
    
    gameOn = true;
    playerTurn = true;
    console.log(`these are the com's cards ${comCards}, and these are your cards ${playerCards}`);
};

// event listeners

handEl.addEventListener('click', (event) => {
    handleTurn(event)
});

btnEl.addEventListener('click', (event) => {
    if (event.target.innerText === 'Go fish!') {
        goFish();
        btnEl.style.visibility = 'hidden';
    }
    if (event.target.innerText === 'Start a Game') {
        init();
        btnEl.style.visibility = 'hidden';
    }
})