# Planning Materials

## GitHub Repository
> https://github.com/Tungm92/card-games.git

## The goal:
> I am going to create a Go Fish card game.

## User Stories
> Add multiple user stories below following the _As a [type of user], I want [what the user wants], so that [what it helps accomplish]_ format:

- As a player, I want to be able to start the game myself, so that needs a **Deal** button.
- As a player, I want to select the number of players between 3-6, so that needs a selection **number of players** option above the **deal** button.
- As a player, I want to receive the appropriate number of cards depending on the number of players (*3 player, 7 cards each; any more players, 5 cards each*), so that needs a `if` and `else` condition in the `init`. 
- As a player, I want to be able to see what cards I have at any given time, so this needs to `display` the `p1` array for the player.
- As a player, I want to be able to select the player I am asking a card for with my mouse and/or keyboard, so there should be a *hover* and *selection* effect on the other player icons.
- As a player, I want to be able to select the card I am asking for with my mouse and/or keyboard, so there should be a *hover* and *selection* effect on the cards in the `p1` array `display`.
- As a player, I want to draw a card myself, so there is a `Go fish!` button in my `display`.
- As a player, I want to know what happens when I am out of cards, so the `Go fish!` button should be in my `display` when I have an empty hand on my turn.
- As a player, I want to be able to have my cards organized, so the `p1` array should sequence from lowest to highest number and suits from Spade-Club-Diamond-Heart.
- As a player, I want to be able to reset/forfeit at will, so there needs to be an **end game** button followed by a **play gain** button in the `display`.
- As a player, I want to know the `score` at any given point in the game, so a `scoreboard` is needed in the `display`.
- As a player, I want to know when the game is over and who won, so the `display` should state the end of the game and the winner. 
- As a player, I want to know whose turn it is and when it is my turn, so the `display` will state the current turn at all times.
- As a player, I want to know when another player is asking for a card, so the `display` will state the request "***Player __** asks if you have a _______.*" 
- As a player, I want to be able to know if I can lie, so the `display` prompt will show a `Yes, here's my _____.` and `No, go fish!` when appropriate.
- As a player, I want to track what cards have been asked for and from whom, so I want a `gameLog` in the `display`.

## Pseudocode for the overall gameplay:
> This pseudocode does not need to go into exhaustive detail but should demonstrate that you understand some of the unique challenges you will encounter while building your game.

- Declare var arrays for 1 deck, 6 players, turns, scores, game-log.
- Declare var for result.
- Create HTML divs for the deck, each player, and the display.
- - All cards except the player's should display the back of the card.
- - The player's cards should display the front of the card(s).
- Create cached elements for cards
- The computer players have individual icons.
- Add an event listener for the **Deal** button.
- Add an event listener for the **Number of Players** arrow buttons.
- The `init()`: 
- - structures the number of player icons to match the number of players
- - shuffles the deck
- - deals to the selected number of players
```
if (players === 3) {
    function(deal 7 cards to each)
} else {
    function(deal 5 cards to each player)
}
```
- - sorts the player's hand after dealing
- Connect the `init()` to the **Deal** button.
- - invoke the `render()` function.
- The `render()`:
    - hides the divs containing the non-playing hands
    - organizes the page to show the players' hands
    - shows the `display`
    - states the `gameStatus`: *(x) players have started a game of Go Fish!*
    - pushes `gameStatus` to `gameLog`
- The `display`:
    - shows `scoreboard`
        - shows `scores` for each player
    - shows `gameLog`
    - shows `gameStatus` with the `turns` array: *Player (x) asks player (y) if they have (card).*
        - pushes `gameStatus` to `gameLog`.
    - shows `result` in `gameStatus`.
        - pushes `result` to `gameLog`.
- The `takingTurns()`
    - selects the next player to make a move
- The `checkStatus()`
    - checks if all arrays are empty
    - checks for the highest score amongst the players
    - send message to `gameStatus` if clear winner: *Player (x) has won the game!*
    - send message to `gameStatus` if tie: *It's a tie between Players (x),(y),(z)!*


// game announces winner to have an empty hand 
// game has a forfeit button that checks to confirm a forfeit before ending the game
// the player is able to select which hand they want to ask a card from
// the game iterates through an array of players and repeats until the game is over with the first empty hand array
// the end of the game

// let players = [ ]
// const score [p1Score, p2Score, p3,Score, p4Score, p5Score, p6Score, p7Score, p8Score ] 

// runs this code when game starts 
// shuffles deck into a new randomize array for the hands to pull from 
// const shuffledDeck = function()
// const deal = function () fills each player array
// if players < 4, deals 7 cards,
// shuffledDeck.splice into each hand until the last array.length is 7
// else deals 5 cards
// shuffledDeck.splice into each hand until the last array.length is 5 
const p1 = shuffledDeck.slice[ ]
const p2 = shuffleddeck.slice[ ]
const p3 = shuffledDeck.slice[ ]
const p4 = shuffledDeck.slice[ ]
const p5 = shuffledDeck.slice[ ]
const p6 = shuffleddeck.slice[ ]
const p7 = shuffledDeck.slice[ ]
const p8 = shuffledDeck.slice[ ]
// if (p1 through p8.length &&  shuffledDeck.length=0), game over
// whoever has the highest score wins
// else runs the game's for loop iterating through turns.
// if player's hand is empty, shuffledDeck.splice
// if a player asks for a card and the other player says they have it, the asking player gets 1 point and the respective hand arrays are down one item each.
// else shuffledDeck.splice first item in its array into player's hand.


## Anything Else You'd Like Us to Know

// if I finish this card game with enough time leftover, I may still try to include a second game to increase the challenge for myself.