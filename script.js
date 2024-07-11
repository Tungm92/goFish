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
let handEmpty = false;
let comEmpty = false;
let deckEmpty = false;

// cached element references

let handEl = document.querySelector('.hand');
let comEl = document.querySelector('.computer-player');
let deckEl = document.querySelector('#deck');
let newCardEl = document.createElement('li');
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
        finalScore();
    } 

    if (deck.length > 0 && arrayOfCards.length < 1) {

        if (playerTurn) {
            message = `Looks like you're out of cards. Go fish!`;
            updateLog();
            btnEl.innerText = 'Go fish!';
            btnEl.style.visibility = 'visible';
        } else {
            message = `The computer is out of cards so it draws a new card.`;
            updateLog();
            goFish(comCards)
    

    // what are the ways cards can be empty during a playerTurn?
    // deck empty, hand empty, opponent empty
    // deck empty, hand last card, opponent last card
    // deck !empty, hand empty, opponent hand empty
    // deck !empty, hand empty, opponent hand !empty
    // deck !empty, hand !empty, opponent empty
    // deck !empty, hand !empty, opponent !empty

    // what are the points you checkCards?
    // at the start of turn?
    // after goFish can be at the start of a turn
    // after a match of cards

    // why not make a boolean for each hand? 
    // handEmpty = false
    // comEmpty = false
    // deckEmpty = false
    // const isGameOn = () => {
    // if (handEmpty && comEmpty && deckEmpty) {
    // gameOn = false}} 

    // operate the btnEl on two conditions:
    // if (playerTurn && handEmpty) {
    // btnEl.style.visibility = 'visible'}
    // } else {
    // btn.El.style.visibility = 'hidden'}

    // this will style.visibility the btn
    // this will send the message if a palyer is out of cards
    // this will send the goFish message of either player and their result
    // this will save your life
        };
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
                    // console.log(cardEl1, cardEl1[0])
                    cardEl1[0].parentNode.removeChild(cardEl1[0])
                    // console.log(cardEl2, cardEl2[0])
                    cardEl2[0].parentNode.removeChild(cardEl2[0])

                    // make all pairs an empty string to avoid three of a kinds
                    arrayOfCards.splice(i, 1, '');
                    arrayOfCards.splice(j, 1, '');
                }
            }            
        }        
    }
    // console.log(comCards.length)
    // console.log(comCards)
    // console.log(playerCards.length)
    // console.log(playerCards)

    // after we have found all pairs, filter the array for values that are not '' (do not have a pair)
    let result = arrayOfCards.filter((card) => card !== '');
    console.log('after filter(): ', comCards)
    console.log('after filter(): ', playerCards)
    return result;
}


// create a function to take turns
const turns = () => {
    if (gameOn === true) {
        
        // clear that the computer has more than one card
        if (comCards.length > 0) {

            // create computer logic for the computer's turn
            if (playerTurn === false) {

                // the computer selects a card
                let comCard = comCards[Math.floor(Math.random()*comCards.length)]
                rank = comCard[1]+comCard[2]
    
                // message the result
                message = `The computer asks for a ${comCard}.`
                updateLog(message)
    
                // compare the selected card with the player's cards
                for (let i=0; i < playerCards.length; i++) {
                    let playerCard = playerCards[i]
                    let match = playerCard[1]+playerCard[2]
                    
                    // set the element in case of a match
                    let playerCardEl = document.getElementsByClassName(playerCard)
                    
                    if (rank === match) {
                        
                        // message the result
                        message = `Looks like they got your ${playerCard}.`
                        updateLog(message)
    
                        // move the card to the comCards array
                        comCards.push(playerCard);
                        newCardEl.classList.add("card", "back-blue", comCards[comCards.length-1]);
                        comEl.appendChild(newCardEl);
    
                        // remove the card from the array and browser
                        playerCards.splice(i,1);
                        playerCardEl[0].parentNode.removeChild(playerCardEl[0]);
                        
                        // remove the pair using the removePairs()
                        comCards = removePairs(comCards);
    
                        // check game state
                        checkCards();
    
                        // add a condition to continue picking cards
                        if (comCards.length > 0) {
                            comCard = comCards[Math.floor(Math.random()*comCards.length)]
                            rank = comCard[1]+comCard[2]
                            playerCardEl = document.getElementsByClassName(playerCard)
                        }
                    }
                }
    
                // message computer's results
                message = `But you don't have one so it had to go fish!`;
                updateLog();
                
                // computer grabs a card and end turn
                goFish(comCards);
                message = `Now it's your turn. Pick a card.`
                updateLog(message)
            } 
        }
        if (comCards.length === 0) {
            // empty computer hand draws a card
            goFish(comCards);
            message = `Now it's your turn. Pick a card.`
            updateLog(message)
        }
    }
}

const goFish = (arrayOfCards) => {

    // add new card to the array 
    arrayOfCards.push(deck.pop());
    console.log('this is the deck ', deck)
    // if player's turn add new card to the player's hand
    if (arrayOfCards === playerCards) {
        console.log(arrayOfCards, ' this is the player cards', playerCards)
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
        turns();

        // console.log('player turn')
    }
    
    // if computer's turn add new card to the computer's hand
    if (arrayOfCards === comCards) {

        newCardEl.classList.add("card", "back-blue", comCards[comCards.length-1]);
        comEl.appendChild(newCardEl);

        // message the results
        message = `The computer picked up a card.`
        updateLog();

        // check for pairs
        comCards = removePairs(comCards);

        // check state of the game
        checkCards();

        // change turns
        playerTurn = true;

        // console.log('com turn')
    }
};

const finalScore = () => {
    playerTurn = false;
    gameOn = false;
    let highScore = Math.max.apply(Math, scores);
    if (playerScore === comScore) {
        message = `It's a tie! You both scored ${playerScore}!`;
        updateLog();
        btnEl.innerText = 'Start a Game';
        btnEl.style.visibility = 'visible';
    } else {

        // get the index of the highest score
        let scoreIndex = scores.indexOf(highScore);
        
        let winner = names[scoreIndex];
        message = `And the winner is... ${winner}! Want to play again?`;
        updateLog();
        btnEl.innerText = 'Start a Game';
        btnEl.style.visibility = 'visible';
    }
}

const updateLog = (v) => {
    gameLog.push(message)
    const newMessageEl = document.createElement('li');
    newMessageEl.innerText = gameLog[gameLog.length-1];
    displayEl.appendChild(newMessageEl);
}

const render = () => {
    showHands();;    
    playerCards = removePairs(playerCards);
    comCards = removePairs(comCards);
    displayEl.style.visibility = 'visible';
    turns();
}

const init = () => {
    shuffle(deck);
    deal();
    gameOn = true;
    playerTurn = true;
    render();
};

const handleTurn = (event) => {
    
    // make the 

    // create a var to hold the value card selected
    rank = event.target.classList[1][1]+event.target.classList[1][2]

    // set a condition for when a card is pickable and unpickable
    if (playerTurn === true && btnEl.innerText !== 'Go fish!') {
        
        // check if computer has any cards
        if (comCards.length > 0) {

            // check comCards for a match
            for (let i = 0; i <comCards.length; i++) {
                let comCard = comCards[i];
                let match = comCards[i][1]+comCards[i][2];

                // set the element in case of a match
                comCardEl = document.getElementsByClassName(comCard);

                if (rank === match) {
                    // message the results
                    message = `It's a match! They also had a ${rank}!`
                    updateLog()
                    
                    // move the card to the playerCards array
                    playerCards.push(comCard);
                    newCardEl.classList.add("card", playerCards[playerCards.length-1]);
                    handEl.appendChild(newCardEl);

                    // remove the card from origin
                    comCards.splice(i,1);
                    comCardEl[0].parentNode.removeChild(comCardEl[0]);

                    // remove the pair
                    playerCards = removePairs(playerCards);

                    // check game state
                    checkCards()

                    // return to allow the player to pick another card
                    rank = '';
                    return;
                }
            }
        } else {
            message = `Looks like the computer has no cards to ask for. Go fish.`
            btnEl.innerText = 'Go fish!'
            btnEl.style.visibility = 'visible'
        }
    // create failure message
    message = `Oops, looks like the computer doesn't have a match for a ${rank}. Let's go fish!`;
    updateLog();
    btnEl.innerText = 'Go fish!';
    btnEl.style.visibility = 'visible';
    }
}   


// event listeners

handEl.addEventListener('click', (event) => {
    handleTurn(event)
});

btnEl.addEventListener('click', (event) => {
    if (event.target.innerText === 'Go fish!') {
        goFish(playerCards);
        btnEl.style.visibility = 'hidden';
    }
    if (event.target.innerText === 'Start a Game') {
        init();
        btnEl.style.visibility = 'hidden';
    }
})