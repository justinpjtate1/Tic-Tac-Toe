// This class helps to render repetitive elements on the page.

class RepetitiveElements {
    constructor(numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
    }

    loadPlayerElements(elementToClone, parentElement, display) {
        for (let i = 1; i <= this.numberOfPlayers; i++) {
            const newPlayerElement = document.querySelector(elementToClone);
            const clone = newPlayerElement.cloneNode(true);
            this.changeIdOfClonedElement(clone, i);
            document.querySelector(parentElement).appendChild(clone);
            this.changeIdOfClonedChildElements(clone, i);
            

        clone.style.display = display;
        }
        
    }

    changeIdOfClonedElement (clonedElement, newId) {
        clonedElement.id = clonedElement.id.replace("0", `${newId}`);
        clonedElement.innerHTML = clonedElement.innerHTML.replace("0", `${newId}`);
    }

    changeIdOfClonedChildElements (clonedElement, newId) {
        const newPlayerChildElements = clonedElement.childNodes
        newPlayerChildElements.forEach(element => {
            if(element.id) {
                this.changeIdOfClonedElement(element, newId);
                element.childNodes.forEach(element => {
                    if(element.id) {
                        this.changeIdOfClonedElement(element, newId);
                    }
                });
            }
        })
    }

    createNewGridElement(elementType, className, idName, parentDiv) {
        const element = document.createElement(elementType);
        element.className = className;
        element.id = idName;
        document.querySelector(parentDiv).appendChild(element);
    }

    loadGrid() {
        for (let i = 1; i < 10; i++) {
            this.createNewGridElement('div', 'grid-item', `${i}`, '.grid-container');
        }
    }
}


// Invoking the functions that allow us to render the repetitve elements.

const repetitiveElements = new RepetitiveElements(2);
repetitiveElements.loadPlayerElements('#player0-profile', '#game-information', 'block');
repetitiveElements.loadPlayerElements('#counter-0', '#counters', 'inline-block');
repetitiveElements.loadPlayerElements('#player-name-0', '#player-names', 'inline-block');
repetitiveElements.loadPlayerElements('#score-player-0', '#scores', 'inline-block');
repetitiveElements.loadGrid();

// Creating an array of the contents of each grid item.

const gridButtons = document.querySelectorAll('.grid-item');
const gridButtonsArr = Array.prototype.slice.call(gridButtons).map(value => value.innerHTML);


// A function that checks whether the round of Tic Tac Toe is new, or in progress.

const  newRound = () => {
    if(gridButtonsArr.every(value => value === '') === true) {
        return true;
    }
}

// This class loads the player information for each player

class Player {
    constructor(number, symbol) {
        this.number = number;
        this.name = `Player ${this.number}`;
        this.default_symbol = symbol;
        this.custom_symbol;
        this.score;
        this.scoreboard_name = document.querySelector(`#player-name-${this.number}`);
        this.scoreboard_symbol = document.querySelector(`#counter-${this.number}`);
        this.scoreboard_score = document.querySelector(`#score-player-${this.number}`);
        this.submit_name_button = document.querySelector(`#submit-name-${this.number}`);
        this.input_name = document.querySelector(`#name-input-${this.number}`);
        this.submit_symbol_button = document.querySelector(`#submit-symbol-${this.number}`);
        this.input_symbol = document.querySelector(`#symbol-input-${this.number}`);
        this.upload_symbol_button = document.querySelector(`#submit-symbol-file-${this.number}`)
        this.upload_symbol = document.querySelector(`#fileupload-${this.number}`)
    }

    currentScore(value) {
        this.score = +(value);
        this.scoreboard_score.innerHTML = this.score;
    }

    addDetailsToScoreboard() {
        if(localStorage.getItem(`player ${this.number} name`) !== null) {
            this.name = localStorage.getItem(`player ${this.number} name`);
        }
        this.scoreboard_name.innerHTML = this.name;
        if(localStorage.getItem(`player ${this.number} symbol`) !== null) {
            this.custom_symbol = localStorage.getItem(`player ${this.number} symbol`);
            this.scoreboard_symbol.innerHTML = this.custom_symbol;
        } else {
            this.scoreboard_symbol.innerHTML = this.default_symbol;
        }
        if(localStorage.getItem(`player ${this.number} score`) !== null) {
            this.currentScore(localStorage.getItem(`player ${this.number} score`))
        } else {
            this.currentScore(0)
        }   
    }

    changeName() {
        this.submit_name_button.addEventListener('click', () => {
            if(this.input_name.value !== '') {
                this.name = this.input_name.value;
                this.scoreboard_name.innerHTML = this.name;
                localStorage.setItem(`player ${this.number} name`, this.name);
                this.input_name.value = '';
            } else {
                alert("Please ensure the name field isn't blank");
            }
        })
    }

    changeSymbol() {
        this.submit_symbol_button.addEventListener('click', () => {
            if(newRound() === true) {
                if(this.input_symbol.value !== '') {
                    this.custom_symbol = this.input_symbol.value;
                    this.scoreboard_symbol.innerHTML = this.custom_symbol;
                    localStorage.setItem(`player ${this.number} symbol`, this.custom_symbol);
                    this.input_symbol.value = '';
                } else {
                    alert("Please ensure the symbol field isn't blank");
                }
            } else {
                alert('Please no changes to symbol during the game');
            }
        })
    }

    changeSymbolToUploaded() {
        this.upload_symbol.addEventListener('change', (event) => {
            if(newRound() === true) {
                let img = document.createElement('img');
                img.src = URL.createObjectURL(event.target.files[0]);
                img.id = `player-img-${this.number}`
                this.scoreboard_symbol.innerHTML = ''
                this.scoreboard_symbol.appendChild(img);
                this.custom_symbol = img.id
            } else {
                alert("Please no changes to symbol during the game");
            }})
        }       

    addToScore(value) {
        this.score += value;
        this.scoreboard_score.innerHTML = this.score;
        (localStorage.setItem(`player ${this.number} score`, this.score))
    }

    resetName() {
        localStorage.removeItem(`player ${this.number} name`);
        this.name = `Player ${this.number}`;
        this.scoreboard_name.innerHTML = this.name;
    }

    resetSymbol() {
        localStorage.removeItem(`player ${this.number} symbol`);
        this.scoreboard_symbol.innerHTML = this.default_symbol;
    }
}


// Define the players in the game and invoke the information needed.

const player1 = new Player(1, 'X');
player1.addDetailsToScoreboard();

const player2 = new Player(2, 'O');
player2.addDetailsToScoreboard();

player1.changeName();
player2.changeName();
player1.changeSymbol();
player2.changeSymbol();
player1.changeSymbolToUploaded();
player2.changeSymbolToUploaded();


// Determines whether the game is just starting, or whether it's an existing game.
let rounds;
const countOfRounds = () => {
    if(localStorage.getItem(`rounds`) !== null) {
        rounds = +(localStorage.getItem(`rounds`));
    } else {
        rounds = 0;
    }
}

const nextRound = () => {
    rounds += 1;
    localStorage.setItem(`rounds`, rounds);
};

countOfRounds();


// Determines who's turn it is based on how many rounds there's been in the game.

const turns = document.querySelectorAll('.counter');

const firstTurn = () => {
    if(newRound() === true && rounds % 2 !== 0) {
        turns[0].dataset.name = '';
        turns[1].dataset.name = 'current-go';
    } else {
        turns[0].dataset.name = 'current-go';
        turns[1].dataset.name = '';
    }
}

firstTurn();


// Determines whether the volume should be on

const volumeButton = document.querySelector('.sound-button');

const volume = (value) => {
    volumeButton.id = 'resources/sound-button-' + value;
    volumeButton.src = 'resources/sound-' + value + '.png';
}

const volumeToggle = () => {
    if(localStorage.getItem('volume') === 'sound-button-off') {
        volume('off');
        return false
    } else {
        volume('on');
        return true
    }
}

volumeToggle();

volumeButton.addEventListener('click', function() {
    if(volumeToggle() === true) {
        volume('off');
        localStorage.setItem('volume', 'sound-button-off');
    } else {
        volume('on');
        localStorage.setItem('volume', 'sound-button-on');
    }
})

const audio = (filename) => {
    if (volumeToggle() === true) {
        new Audio(filename).play();
    } 
}


// Defines the functionality of the overlay that pops up once the round has ended

const overlayOn = (outcome) => {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "block";
    const overlayText = document.querySelector("#end-round-message");
    overlayText.innerHTML = `End of round: \n${outcome}`;
  }
  
const overlayOff = () => {
    document.querySelector("#overlay").style.display = "none";
  }


// Checks whether the round has ended based on if a player has one or draw

const isRoundEnded = () => {

    winningCombinations = [
        [gridButtonsArr[0], gridButtonsArr[1], gridButtonsArr[2]],
        [gridButtonsArr[0], gridButtonsArr[1], gridButtonsArr[2]],
        [gridButtonsArr[3], gridButtonsArr[4], gridButtonsArr[5]],
        [gridButtonsArr[6], gridButtonsArr[7], gridButtonsArr[8]],
        [gridButtonsArr[0], gridButtonsArr[3], gridButtonsArr[6]],
        [gridButtonsArr[1], gridButtonsArr[4], gridButtonsArr[7]],
        [gridButtonsArr[2], gridButtonsArr[5], gridButtonsArr[8]],
        [gridButtonsArr[0], gridButtonsArr[4], gridButtonsArr[8]],
        [gridButtonsArr[2], gridButtonsArr[4], gridButtonsArr[6]]
    ];

    const winner = winningCombinations.some(value => value.every(v => v !== '' && v === value[0]));
    const boardNotFull = gridButtonsArr.some(value => value === '');

    if(winner === true) {
        return true;
    } else if (boardNotFull === false) {
        return true;
    }
}

// Checks which player has won once the game has ended, or if it's a draw. Updates scores accordingly

const gameOutcome = () => {

    const player1Win = winningCombinations.some(value => value.every(v => (v === player1.default_symbol) || (typeof(player1.custom_symbol) !== 'undefined' && v.search(player1.custom_symbol) !== -1)));
    const player2Win = winningCombinations.some(value => value.every(v => (v === player2.default_symbol) || (typeof(player1.custom_symbol) !== 'undefined' && v.search(player2.custom_symbol) !== -1)));

    const boardNotFull = gridButtonsArr.some(value => value === '')

    if (player1Win === true) {
        player1.addToScore(1);
        overlayOn(`${player1.name} wins`);
    } else if (player2Win === true) {
        player2.addToScore(1);
        overlayOn(`${player2.name} wins`);
    } else if (boardNotFull === false) {
        overlayOn('Draw');
    }
}

// Changes player turn when invoked

const changeTurn = (nextGo) => {
    for (let i = 0; i < turns.length; i++) {
        if(turns[i].dataset.name === 'current-go') {
            turns[i].dataset.name = '';
        } else if (turns[i].dataset.name === '' && nextGo === true) {
            turns[i].dataset.name = 'current-go'
        }
    }
}

// This function adds an event listener to each tile.
// It checks if the round has ended and if the tile has been clicked already
// If the round hasn't ended and the tile is vacant, it adds the symbol of the player who's turn it is
// It then checks if the game has ended. 
// If true, it invokes the overlay if the result.
// If the game hasn't ended, it changes turn.

const gridEventListener = () => {
    gridButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if(button.innerHTML === '' && isRoundEnded() !== true) {
                button.innerHTML = document.querySelector(`[data-name*="current-go"]`).innerHTML;
                gridButtonsArr[index] = button.innerHTML;
                audio('resources/click_sound.mp3');
                button.id = 'clicked';
                if(isRoundEnded() === true) {
                    gameOutcome();
                    changeTurn(false);
                    audio('resources/end_game_sound.mp3');
                } else {
                    changeTurn(true);
                }
            }
        })
    })
}

// This invokes the event listeners

gridEventListener();

const restartRoundButtons = document.querySelectorAll('.restart-button');


// This restarts the round if you press the Restart Round button
// It also starts the next round if the Next Round button is pressed
// Tracks turns accordingly

const restartRound = (button) => {
    button.addEventListener('click', function() {
        overlayOff();
        gridButtons.forEach((value, index) => {
            value.innerHTML = '';
            value.id = index;
        });
        gridButtonsArr.forEach((value, index) => gridButtonsArr[index] = '');
        audio('resources/restart_game.mp3');
        newRound();
        if(button.textContent === "Next Round!") {
            nextRound();
            firstTurn();
        }
        firstTurn();
    })
}

restartRoundButtons.forEach(button => restartRound(button));

// Resets the whole game when the Reset Game buttons are clicked

const resetGame = (button) => {
    restartRound(button);
    button.addEventListener('click', function() {
        player1.currentScore(0);
        player2.currentScore(0);
        localStorage.removeItem('player 1 score');
        localStorage.removeItem('player 2 score');
        localStorage.removeItem('rounds');
        countOfRounds();
        firstTurn();
    })
};

const resetGameButtons = document.querySelectorAll('#reset-game');
resetGameButtons.forEach(button => resetGame(button));

const resetPlayers = () => {
    player1.resetName();
    player2.resetName();
    player1.resetSymbol();
    player2.resetSymbol();
}

const resetPlayerButton = document.querySelector('#reset-players')

// Resets the players to their defaults

resetPlayerButton.addEventListener('click', () => {
    if(newRound() === true) {
        resetPlayers();
    } else {
        alert('Please no changing players during the game');
    }
})