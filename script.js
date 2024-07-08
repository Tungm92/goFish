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
const playerCards = [];
const comCards = [];
const matches =[];

let deck = ["dA0","dQ0","dK0","dJ0","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA0","hQ0","hK0","hJ0","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA0","cQ0","cK0","cJ0","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA0","sQ0","sK0","sJ0","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
let currentPlayer
let rank
let message





// cached element references

let handEl = document.querySelector('.hand');
let comEl = document.querySelector('.computer-player');
let deckEl = document.querySelector('#deck');
let btnEl = document.querySelector('#btn');
let displayEl = document.querySelector('#display');


// functions 

const deal = () => { // this pushes the cards into the hands of the player(s) 
    while (playerCards.length < 7) {
        comCards.push(deck.pop());
        playerCards.push(deck.pop());
    };
};

const checkCards = () => { // this checks the state of the game and if it is over 

    // this checks for matches in the computer's hand
    if (deck.length === 0 && playerHand.length === 0) {
        message = `Great game! Let's check the final score.`;
        gameLog.push(message);
        gameLogging();
        currentPlayer = 'game over';
        finalScore();
    } 
    if (deck.length > 0 && playerCards.length < 1) {
        message = `Looks like you're out of cards. Go fish!`;
        gameLog.push(message);
        gameLogging();
    };
};

const shuffle = (deck) => { // this shuffles the deck array 
    for (var i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    };
};

const showHands = () => { // this creates the card elements in the browser 
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

const checkStart = () => { // checking the both hands for matches at start
    for (i = 0; i < playerCards.length; i++) {
        let rank = playerCards[i][1]+playerCards[i][2];
        let tempArray = [...playerCards];
        tempArray.splice(i,1,'');
        for (idx of tempArray) {
            if (idx !== '') {
                let match = idx[1]+idx[2];
                if (match === rank) {
                    let playerCardEl1 = document.getElementsByClassName(playerCards[i]);
                    playerCardEl1[0].parentNode.removeChild(playerCardEl1[0]);
                    playerCards.splice(i,1); // removes the card from the hand
                    tempArray.splice(i,1); // tempArray has to match the array length and positions of the original
                    // card2 has to be declared after the splice of card1 or else it removes the wrong card
                    let playerCardEl2 = document.getElementsByClassName(playerCards[playerCards.findIndex(element => element.includes(`${match}`))]);
                    playerCardEl2[0].parentNode.removeChild(playerCardEl2[0]);
                    playerCards.splice(playerCards.findIndex(element => element.includes(`${match}`)),1);
                    tempArray.splice(tempArray.findIndex(element => element.includes(`${match}`)),1);
                    match = idx[1]+idx[2]; // updating the match card ensures it only removes pairs and three-of-a-kind
                    scores[0] = scores[0]+1; // this increments the score by 1 each successful pairing
                    message = `You got a pair of ${rank}'s! Let's put that away. Your score is now ${scores[0]}.`;
                    gameLog.push(message);
                    gameLogging();
                };  
            };
        };
    };
    for (i = 0; i < comCards.length; i++) {
        let rank = comCards[i][1]+comCards[i][2];
        let tempArray = [...comCards];
        tempArray.splice(i,1,'');
        for (idx of tempArray) {
            if (idx !== '') {
                let match = idx[1]+idx[2];
                if (match === rank) {
                    let playerCardEl1 = document.getElementsByClassName(comCards[i])
                    playerCardEl1[0].parentNode.removeChild(playerCardEl1[0])
                    comCards.splice(i,1) // removes the card from the hand
                    tempArray.splice(i,1) // tempArray has to match the array length and positions of the original
                    // card2 has to be declared after the splice of card1 or else it removes the wrong card
                    let playerCardEl2 = document.getElementsByClassName(comCards[comCards.findIndex(element => element.includes(`${match}`))])
                    playerCardEl2[0].parentNode.removeChild(playerCardEl2[0])
                    comCards.splice(comCards.findIndex(element => element.includes(`${match}`)),1)
                    tempArray.splice(tempArray.findIndex(element => element.includes(`${match}`)),1)
                    match = idx[1]+idx[2] // updating the match card ensures it only removes pairs and three-of-a-kind
                    scores[1] = scores[1]+1 // this increments the score by 1 each successful pairing
                };  
            };
        };
    };
};

const turns = () => {
    if (currentPlayer === 'Player 1') {
        message = `It's your turn. Click on the card you want to make a pair with.`;
        gameLog.push(message);
        gameLogging();
    }
    while (currentPlayer === 'Computer') {
        
    }
}
const goFish = () => {
    const newCardEl = document.createElement('li');
    playerCards.push(deck.pop());
    newCardEl.classList.add("card", playerCards[playerCards.length-1]);
    handEl.appendChild(newCardEl);
    currentPlayer = 'Computer';
    checkStart(); // this checks if the new drawn card matches with the player's hand or the com's hand.
    checkCards();
};
const comFish = () => {
    if (currentPlayer === 'Computer') {
    comCards.push(deck.pop());
    newCardEl.classList.add("card", "back-blue", comCards[comCards.length-1]);
    comEl.appendChild(newCardEl);
    currentPlayer = 'Player 1';
    };
}

const finalScore = () => {
    let highScore = Math.max.apply(Math, scores);
    if (playerScore === comScore) {
        message = `It's a tie! You both scored ${playerScore}!`;
        gameLog.push(message);
        gameLogging();
        btnEl.style.visibility = 'visible'
    } else {
        let scoreIndex = scores.indexOf(highScore); // this gets index of the highest score in the scores array
        let winner = names[scoreIndex];
        message = `And the winner is... ${winner}`;
        gameLog.push(message);
        gameLogging();
        btnEl.innerText = 'Start a New Game'
        btnEl.style.visibility = 'visible'
    }
}

const gameLogging = () => {
    const newMessageEl = document.createElement('li');
    newMessageEl.innerText = gameLog[gameLog.length-1];
    displayEl.appendChild(newMessageEl);
    displayEl.style.visibility = 'visible';
}

const render = () => {
    checkCards();
    showHands();
    checkStart();
    currentPlayer = 'Player 1';
    turns();
}

const init = () => {
    shuffle(deck);
    deal();
    render();
    console.log(`these are the com's cards ${comCards}, and these are your cards ${playerCards}`)
};

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
                message = `It's a match! The computer had a ${comCards[i]}. You have ${scores[0]} points.`
                gameLog.push(message)
                gameLogging()
                event.target.remove() // this removes the HTML element from .hand
                playerCards.splice(playerCards.indexOf(myCard),1) // this removes the corresponding array element
                comCardEl[0].parentNode.removeChild(comCardEl[0]) // this removes the HTML element from computer
                comCards.splice(i,1) // this removes the corresponding array element
                return
            }
        }
        message = `Oops, looks like the computer doesn't have a match. Let's go fish!`
        gameLog.push(message)
        gameLogging()
        currentPlayer = 'Fishing'
        btnEl.innerText = 'Go fish!'
        btnEl.style.visibility = 'visible'
    }
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