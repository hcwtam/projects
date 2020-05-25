// Model

class Player {
    constructor() {
        this.score = 6;
        this.choice = '';
    }
}

function selectPokemon(e) {
    if (e.code === 'Digit1') player1.choice = 1;
    if (e.code === 'Digit2') player1.choice = 2;
    if (e.code === 'Digit3') player1.choice = 3;
    if (e.code === 'Digit7') player2.choice = 7;
    if (e.code === 'Digit8') player2.choice = 8;
    if (e.code === 'Digit9') player2.choice = 9;
};


function clearChoices() {
    player1.choice = "";
    player2.choice = "";
}

function player1Wins() {
    // Turn choice 2 pokemon grey
    elements.choice2.classList.toggle("grey");

    player2.score--;

    // Deduct player 2 health
    document.querySelector(`.health2-${player2.score}`).classList.add("grey");

    // Clear choices
    clearChoices();
}

function player2Wins() {
    // Turn choice 1 pokemon grey
    elements.choice1.classList.toggle("grey");

    player1.score--;

    // Deduct player 1 health
    document.querySelector(`.health1-${player1.score}`).classList.add("grey");

    // Clear choices
    clearChoices();
}

function draw() {
    // Clear choices
    clearChoices();
}

function determineWinner() {
    // 1 grass 2 grass, draw
    if (player1.choice === 1 && player2.choice === 7) draw();

    // 1 grass 2 fire, 2 wins
    if (player1.choice === 1 && player2.choice === 8) player2Wins();

    // 1 grass 2 water, 1 wins
    if (player1.choice === 1 && player2.choice === 9) player1Wins();

    // 1 fire 2 grass, 1 wins
    if (player1.choice === 2 && player2.choice === 7) player1Wins();

    // 1 grass 2 grass, draw
    if (player1.choice === 2 && player2.choice === 8) draw();

    // 1 fire 2 water, 2 wins
    if (player1.choice === 2 && player2.choice === 9) player2Wins();

    // 1 water 2 grass, 2 wins
    if (player1.choice === 3 && player2.choice === 7) player2Wins();
    
    // 1 water 2 fire, 1 wins
    if (player1.choice === 3 && player2.choice === 8) player1Wins();

    // 1 water 2 water, draw
    if (player1.choice === 3 && player2.choice === 9) draw();
}

// View
 const elements = {
    choice1: document.querySelector('.choice1'),
    choice2: document.querySelector('.choice2'),
    winner: document.querySelector('.winner-text')
 };

 const images = [
    '<img src="images/bulbasaur.png" alt="grass type">',
    '<img src="images/charmander.png" alt="fire type">',
    '<img src="images/squirtle.png" alt="water type">',
    '<img src="images/treecko.png" alt="grass type">',
    '<img src="images/torchic.png" alt="fire type">',
    '<img src="images/mudkip.png" alt="water type">'
 ]

function hidePokemon(choice) {
    document.querySelector(`.poke${choice}`).classList.toggle("hide");
};

function hidePokemons() {
    if (player1.choice !== '' && player2.choice !== '') {
        hidePokemon(player1.choice);
        hidePokemon(player2.choice);
    }
}

function showChoices() {
    if (player1.choice !== '' && player2.choice !== '') {
        elements.choice1.insertAdjacentHTML('beforeend', images[player1.choice - 1]); //First three of images array
        elements.choice2.insertAdjacentHTML('beforeend', images[player2.choice - 4]);//Last three of images array
    }
}

function displayWinner() {

    

    if (player2.score === 0) {
        // Open winner modal
        document.querySelector('.modal-overlay').classList.add('open-modal');
        elements.winner.textContent = "Player 1 is the champion!";
    }

    if (player1.score === 0) {
        // Open winner modal
        document.querySelector('.modal-overlay').classList.add('open-modal');
        elements.winner.textContent = "Player 2 is the champion!";
    }
}

// Control
let player1 = new Player();
let player2 = new Player();


// Init
function init() {
    elements.choice1.textContent = '';
    elements.choice2.textContent = '';
    document.querySelector(`.poke1`).classList.remove("hide");
    document.querySelector(`.poke2`).classList.remove("hide");
    document.querySelector(`.poke3`).classList.remove("hide");
    document.querySelector(`.poke7`).classList.remove("hide");
    document.querySelector(`.poke8`).classList.remove("hide");
    document.querySelector(`.poke9`).classList.remove("hide");
    document.querySelector(`.choice1`).classList.remove("grey");
    document.querySelector(`.choice2`).classList.remove("grey");
}

window.addEventListener('load', ()=> {
    init();
});

window.addEventListener('keyup', (e)=> {
    // Clear stage
    init();

    // Players choose their pokemon
    selectPokemon(e);

    // Hide pokemons when both players chose
    hidePokemons();

    // Display chosen pokemons
    showChoices();

    // Determine winner, adjust score, clear choices;
    determineWinner();

    // If a player's score reaches 0, display winner
    displayWinner();

});

document.querySelector('.close-btn').onclick = () => {
    document.querySelector('.modal-overlay').classList.remove('open-modal');
}


