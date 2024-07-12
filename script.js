// declare variables

const gameLog = [];
const names = ['you', 'the computer'];
const scores = [0, 0];


let deck = ["dA0","dQ0","dK0","dJ0","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA0","hQ0","hK0","hJ0","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA0","cQ0","cK0","cJ0","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA0","sQ0","sK0","sJ0","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
let playerCards = [];
let comCards = [];
let rank
let message
let comTurn = false;
let gameOn = false;
let handEmpty = false;
let comEmpty = false;
let deckEmpty = false;
let noMatch = false;
let playerTurn = true;

// cached element references

let handEl = document.querySelector('.hand');
let comEl = document.querySelector('.computer-player');
let deckEl = document.querySelector('#deck');
let newCardEl = document.createElement('li');
let btnEl = document.querySelector('#btn');
let displayEl = document.querySelector('#display');

// functions 

// shuffle the cards
const shuffle = (deck) => {
    for (var i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    };
};

// push the cards into the hands of the player(s)
const deal = () => { 
    while (playerCards.length < 7) {
        comCards.push(deck.pop());
        playerCards.push(deck.pop());
    };
};

// render the cards in browser
const showHands = () => { 
    
    // render player hand
    playerCards.forEach(card => {
        let newCardEl = document.createElement('li');
        newCardEl.classList.add("card", card);
        handEl.appendChild(newCardEl);
    });

    // render back of comCards
    comCards.forEach(card => {
        let newCardEl = document.createElement('li');
        newCardEl.classList.add("card","back-blue", card);
        comEl.appendChild(newCardEl);
    });
};

// check the state of the game
const checkCards = () => {
    
    // check player cards
    if (playerCards.length === 0) {
        handEmpty = true;
    };

    // check computer cards
    if (comCards.length === 0) {
        comEmpty = true;
    };

    // check deck
    if (deck.length === 0) {
        deckEmpty = true
    }

};

// run check of game
const isGameOn = () => {
    if (handEmpty && comEmpty && deckEmpty) {
        gameOn = false}
};

// render Go Fish btn -- call after checkCards()
const canGoFish = () => {
    
    // check if game is on
    if (gameOn) {

        // check if it is the player's turn
        if (!comTurn) {

            // if either hand is empty, you can't ask for a card
            if (comEmpty || handEmpty) {
                message = `Looks like someone is out of cards. Go fish.`;
                updateLog(message);
                btnEl.innerText = 'Go fish!';
                btnEl.style.visibility = 'visible';

            // if you tried asking for a card and failed
            } else if (noMatch) {
                btnEl.innerText = 'Go fish!';
                btnEl.style.visibility = 'visible';

            // you can't goFish otherwise
            } else {
                btnEl.innerText = '';
                btnEl.style.visibility = 'hidden';
            };
        };
    };
};

// check for a matching card after selecting a card, works with match var
const findMatch = (oppCards) => {
    
    // create a temporary array that will match the hand being checked
    let tempArray = []

    // check array of opponent for a match
    for (let i = 0; i <oppCards.length; i++) {
        if (rank === oppCards[i][1]+oppCards[i][2]) {

            // if a match, change the value to something indexOf will find
            tempArray[i] = ''
        }

        // push cards one by one into tempArray, a match will instead be ''
        tempArray.push(oppCards[i])
    };

    // return the index of the matching card
    return tempArray.indexOf('');
};

// take the card and change the HTML elements
const takeCard = (activePlayerCards, otherCards, activePlayerHandEl) => {

    // change active player array values
    activePlayerCards.push(otherCards[match]);
  
    // delete the existing HTML element
    let lostCardEl = document.getElementsByClassName(otherCards[match]);
    
    // because cards are being set by classes, the object is an array
    lostCardEl[0].parentNode.removeChild(lostCardEl[0]);
  
    // create HTML element for active player
    let newCardEl = document.createElement('li');
    newCardEl.classList.add("card", activePlayerCards[activePlayerCards.length-1]);
    activePlayerHandEl.appendChild(newCardEl);
    
    // change opponent array values
    otherCards.splice(match,1);
};

// create a function to remove pairs at any point in the game
const removePairs = (arrayOfCards) => {

    for (i = 0; i < arrayOfCards.length; i++) {
        // store the value of the card that we are comparing to the rest of the deck
        let firstCard = arrayOfCards[i][1]+arrayOfCards[i][2];

        for (j = 0; j < arrayOfCards.length; j++) {

            // skip the card if it is the same index as firstCard
            // or if it has already been spliced
            if (j !== i && arrayOfCards[i] !== '' && arrayOfCards[j] !== '') {

                // store the value of the card that we are comparing the firstCard agaist
                let secondCard = arrayOfCards[j][1]+arrayOfCards[j][2];

                // if there is a match, set the card values to ''
                if (firstCard === secondCard) {

                    // log the points for the player
                    if (arrayOfCards === playerCards) {
                        scores[0] = scores[0]+1
                        message = `You paired your ${arrayOfCards[i]} with your ${arrayOfCards[j]}. Your score is now ${scores[0]}.`
                        gameLog.push(message)
                        updateLog()
                    }

                    // log the points for the computer
                    if (arrayOfCards === comCards) {
                        scores[1] = scores[1]+1
                        message = `The computer put away a pair of ${firstCard}s. Their score is now ${scores[1]}.`
                        gameLog.push(message)
                        updateLog()
                    }
                    
                    // cache the element before they are changed
                    let cardEl1 = document.getElementsByClassName(arrayOfCards[i])
                    let cardEl2 = document.getElementsByClassName(arrayOfCards[j])               

                    // console.log(arrayOfCards[i])
                    // console.log(arrayOfCards[j])
                    // remove html using i and j as indexes to find matching value
                    console.log(cardEl1, cardEl1[0])
                    cardEl1[0].parentNode.removeChild(cardEl1[0])
                    console.log(cardEl2, cardEl2[0])
                    cardEl2[0].parentNode.removeChild(cardEl2[0])

                    // make all pairs an empty string to avoid three of a kinds
                    arrayOfCards.splice(i, 1, '');
                    arrayOfCards.splice(j, 1, '');
                }
            }            
        }        
    }

    // after we have found all pairs, filter the array for values that are not '' (do not have a pair)
    let result = arrayOfCards.filter((card) => card !== '');
    console.log('after comCards.filter(): ', comCards)
    console.log('after playerCards.filter(): ', playerCards)
    return result;
}

const computerTurn = () => {
    
    // check if gameOn
    if (gameOn) {

        // player-turn variables reset
        noMatch = false;

        // check if comTurn
        while (comTurn) {
            console.log('running while loop')
            // check if cards are in hand or available
            checkCards();

            // conditions and potential paths for computer
            // gameOn covers if all are empty

            // if either hand empty, goFish() sequence (fish, pair, check)
            // turn is off
            if (comEmpty) {
                message = `Looks like the computer is out of cards. They grab a new card from the deck.`
                updateLog(message);
                goFish(comCards);
                comCards = removePairs(comCards);
                checkCards();
                comTurn = false;
            };

                // the computer will draw another card because the player's hand is empty
                // stop the loop before that
                if (!comTurn) break;

            if (handEmpty) {
                message = `Looks like you're out of cards. The computer grabs a new card from the deck.`
                updateLog(message);
                goFish(comCards);
                comCards = removePairs(comCards);
                checkCards();
                comTurn = false;
            };

            // stop loop if turn is over
            if (!comTurn) break;

            // if it is STILL the computer's turn, it can begin choosing a card.

            // the computer selects a card
            let comCard = comCards[Math.floor(Math.random()*comCards.length)];
            rank = comCard[1]+comCard[2];

            // message the card selected
            message = `The computer asks for a ${comCard}.`
            updateLog(message);

            // compare the selected card with the player's cards
            for (let i=0; i < playerCards.length; i++) {
                let playerCard = playerCards[i];
                let match = playerCard[1]+playerCard[2];
                
                // set the element in case of a match
                let playerCardEl = document.getElementsByClassName(playerCard);

                // if there is a match
                if (rank === match) {
                    
                    // message the result
                    message = `Looks like they got your ${playerCard}.`;
                    updateLog(message);

                    // move the card to the comCards array
                    comCards.push(playerCard);

                    // create element
                    let newCardEl = document.createElement('li');
                    newCardEl.classList.add("card", "back-blue", comCards[comCards.length-1]);
                    comEl.appendChild(newCardEl);

                    // remove the card from the array and browser
                    playerCards.splice(i,1);
                    console.log(playerCardEl, playerCardEl[0]);
                    playerCardEl[0].parentNode.removeChild(playerCardEl[0]);
                    
                    // remove the pair using the removePairs()
                    comCards = removePairs(comCards);

                    console.log(comCards)
                    // check game state
                    checkCards();

                // else because there is no match
                } else {
                    console.log('What is the comCard', comCard)
                    // message the result
                    message = `You don't have a ${comCard}. The computer has to go fish.`

                    // goFish sequence (fish, pair, check)
                    goFish(comCards);
                    comCards = removePairs(comCards);
                    checkCards();

                    // end turn
                    comTurn = false;
                    playerTurn = true;   

                    // before a player can start their turn
                    // check if the game is still on
                    // check if the btn element should be playable
                    // check if gameOver

                    isGameOn();
                    canGoFish();
                    gameOver();
                };
            };
        };

        if(!comTurn) {
            console.log(`computer turn over. comTurn is now ${comTurn}`)
        }
            
    };
    // run gameOver if gameOn is false
    gameOver();
};

const goFish = (arrayOfCards) => {

    if (gameOn) {

        // if computer's turn, add new card to the computer's hand
        if (comTurn) {
            console.log('com goes fish')
            console.log('this is the computer turn')
            console.log('this is the deck ', deck)

            // add new card to the array 
            arrayOfCards.push(deck.pop());

            // render card for the computer
            let newCardEl = document.createElement('li');
            newCardEl.classList.add("card", "back-blue", comCards[comCards.length-1]);
            console.log(`new comCardEl, ${newCardEl}`)
            comEl.appendChild(newCardEl);

            // message the results
            message = `The computer picked up a card.`
            updateLog();
        };
        
        // if fishing during player turn
        if (!comTurn) {
            console.log('player goes fish')
            console.log('this is the player turn')
            console.log('this is the deck ', deck)
            
            // add new card to the array 
            arrayOfCards.push(deck.pop());

    // if player's turn add new card to the player's hand
    if (playerTurn) {
        console.log('this is the player cards', playerCards)
        let newCardEl = document.createElement('li');
        newCardEl.classList.add("card", playerCards[playerCards.length-1]);
        handEl.appendChild(newCardEl);
        
        // message the results
        message = `You picked up a ${playerCards[playerCards.length-1]}.`
        updateLog();

            // remove pairs
            playerCards = removePairs(playerCards);
            console.log(playerCards)
            
            // check cards
            checkCards(playerCards);

        // change turns
        if (gameOn) {
            playerTurn = false;
            turns();
        }
    }
    
    // if computer's turn add new card to the computer's hand
    if (!playerTurn) {
        console.log('this is the computer turn')
        console.log('this is the deck ', deck)
        
        let newCardEl = document.createElement('li');
        newCardEl.classList.add("card", "back-blue", comCards[comCards.length-1]);
        console.log(`new comCardEl, ${newCardEl}`)
        comEl.appendChild(newCardEl);

        // message the results
        message = `The computer picked up a card.`
        updateLog();

        // check for pairs
        comCards = removePairs(comCards);
        console.log(comCards)

        // check state of the game
        checkCards(comCards);

            // change turns
            computerTurn();
        };
    };
};

const gameOver = () => {
    
    // this is always called after isGameOn()
    if (!gameOn) {
        let highScore = Math.max.apply(Math, scores);

        // tie condition
        if (scores[0] === scores[1]) {
            message = `It's a tie! You both scored ${scores[0]}!`;
            updateLog();
            btnEl.innerText = 'Play again?';
            btnEl.style.visibility = 'visible';

        // clear winner
        } else {

        // get the index of the highest score
        let scoreIndex = scores.indexOf(highScore);
        let winner = names[scoreIndex];
        message = `And the winner is... ${winner}! Want to play again?`;
        updateLog();
        btnEl.innerText = 'Play again?';
        btnEl.style.visibility = 'visible';
        };
    };
};

// after writing a new message, run this code to update the display
const updateLog = (v) => {
    gameLog.push(message)
    const newMessageEl = document.createElement('li');
    newMessageEl.innerText = gameLog[gameLog.length-1];
    displayEl.appendChild(newMessageEl);
};

const resetGame = () => {
    scores[0] = 0;
    scores[1] = 0;
    deck = ["dA0","dQ0","dK0","dJ0","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA0","hQ0","hK0","hJ0","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA0","cQ0","cK0","cJ0","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA0","sQ0","sK0","sJ0","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
};

const render = () => {
    showHands();;
    console.log(`removing player cards`);    
    playerCards = removePairs(playerCards);

    comCards = removePairs(comCards);
    displayEl.style.visibility = 'visible';
};

const init = () => {
    shuffle(deck);
    deal();
    gameOn = true;
    render();
};

const handleTurn = (event) => {

    // create a var to hold the card selected
    rank = event.target.classList[1][1]+event.target.classList[1][2];

    // set a condition for when a card is pickable and unpickable
    if (playerTurn && btnEl.innerText === '') {

        // check comCards for a match
        for (let i = 0; i <comCards.length; i++) {
            let comCard = comCards[i];
            let match = comCards[i][1]+comCards[i][2];

            // set the element in case of a match
            comCardEl = document.getElementsByClassName(comCard);

            if (rank === match) {
                
                // message the results
                message = `It's a match! They also had a ${rank}!`;
                updateLog();
                
                // move the card to the playerCards array
                playerCards.push(comCard);
                let newCardEl = document.createElement('li');
                newCardEl.classList.add("card", playerCards[playerCards.length-1]);
                handEl.appendChild(newCardEl);

                // remove the card from origin
                comCards.splice(i,1);
                comCardEl[0].parentNode.removeChild(comCardEl[0]);

                // remove the pair
                playerCards = removePairs(playerCards);

                // check cards and game state if last move
                checkCards();
                isGameOn();
                canGoFish();
                gameOver();

                // end function if over
                if (gameOn) break;

                // if game continues, player draws if either hand empty
                if (playerEmpty || comEmpty) {
                    message = `Looks like one of you is out of cards. Go fish.`;
                    updateLog(message);
                    canGoFish();
                };

                console.log(playerCards)
                // return to allow the player to pick another card
                return;

            } else {

                // use a boolean to be switched on after the loop show's no match
                noMatch = true;
            };

        if (noMatch) continue;
        
        // message result
        message = `Oops! Looks like the computer doesn't have a match for ${rank}. Go fish.`;
        updateLog(message)
        canGoFish();
        };
    };
};   


// event listeners

// picking a card
handEl.addEventListener('click', (event) => {
    if (btnEl.visibility !== 'visible') {
        handlePick(event)
    };
});

// clicking button
btnEl.addEventListener('click', (event) => {
    if (event.target.innerText === 'Go fish!') {
        goFish(playerCards);
        btnEl.style.visibility = 'hidden';
    }
    if (event.target.innerText.includes('Play')) {
        init();
        btnEl.style.visibility = 'hidden';
    }
})