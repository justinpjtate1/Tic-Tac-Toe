const gridButtons = document.querySelectorAll('.grid-item');
const gridButtonsArr = Array.prototype.slice.call(gridButtons).map(value => value.innerText);

const newGame = () => {
    if(gridButtonsArr.every(value => value === '') === true) {
        return true;
    }
}

class Player {
    constructor(number, symbol) {
        this.number = number;
        this.name = `Player ${this.number}`;
        this.default_symbol = symbol;
        this.custom_symbol;
        this.score;
        this.scoreboard_name = document.querySelector(`#player-name-${this.number}`);
        this.scoreboard_symbol = document.querySelector(`[data-number*="counter-${this.number}"]`);
        this.scoreboard_score = document.querySelector(`#score-player-${this.number}`);
        this.submit_name_button = document.querySelector(`#submit-name-${this.number}`);
        this.input_name = document.querySelector(`#name-input-${this.number}`);
        this.submit_symbol_button = document.querySelector(`#submit-symbol-${this.number}`);
        this.input_symbol = document.querySelector(`#symbol-input-${this.number}`);
    }

    currentScore(value) {
        this.score = +(value);
        this.scoreboard_score.innerText = this.score;
    }

    addDetailsToScoreboard() {
        if(localStorage.getItem(`player ${this.number} name`) !== null) {
            this.name = localStorage.getItem(`player ${this.number} name`);
        }
        this.scoreboard_name.innerText = this.name;
        if(localStorage.getItem(`player ${this.number} symbol`) !== null) {
            this.custom_symbol = localStorage.getItem(`player ${this.number} symbol`);
            this.scoreboard_symbol.innerText = this.custom_symbol;
        } else {
            this.scoreboard_symbol.innerText = this.default_symbol;
        }
        if(localStorage.getItem(`player ${this.number} score`) !== null) {
            this.currentScore(localStorage.getItem(`player ${this.number} score`))
        } else {
            this.currentScore(0)
        }   
    }

    changeName() {
        this.submit_name_button.addEventListener('click', () => {
            this.name = this.input_name.value;
            this.scoreboard_name.innerText = this.name;
            localStorage.setItem(`player ${this.number} name`, this.name);
            this.input_name.value = '';
        })
    }

    changeSymbol() {
        this.submit_symbol_button.addEventListener('click', () => {
            if(newGame() === true) {
                this.custom_symbol = this.input_symbol.value;
                this.scoreboard_symbol.innerText = this.custom_symbol;
                localStorage.setItem(`player ${this.number} symbol`, this.custom_symbol);
                this.input_symbol.value = '';
            } else {
                alert('Please no changes to symbol during the game');
            }
        })
    }

    addToScore(value) {
        this.score += value;
        this.scoreboard_score.innerText = this.score;
        (localStorage.setItem(`player ${this.number} score`, this.score))
    }

    resetName() {
        localStorage.removeItem(`player ${this.number} name`);
        this.name = `Player ${this.number}`;
        this.scoreboard_name.innerText = this.name;
    }

    resetSymbol() {
        localStorage.removeItem(`player ${this.number} symbol`);
        this.scoreboard_symbol.innerText = this.default_symbol;
    }
}

const player1 = new Player(1, 'X');
player1.addDetailsToScoreboard();

const player2 = new Player(2, 'O');
player2.addDetailsToScoreboard();

player1.changeName();
player2.changeName();
player1.changeSymbol();
player2.changeSymbol();

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

const turns = document.querySelectorAll('.counter');

const firstTurn = () => {
    if(newGame() === true && rounds % 2 !== 0) {
        turns[0].id = '';
        turns[1].id = 'current-go';
    } else {
        turns[0].id = 'current-go';
        turns[1].id = '';
    }
}
const volumeButton = document.querySelector('.sound-button');

const volume = (value) => {
    volumeButton.id = 'sound-button-' + value;
    volumeButton.src = 'sound-' + value + '.png';
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

const overlayOn = (outcome) => {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "block";
    const overlayText = document.querySelector("#overlay>div>p");
    overlayText.innerText = `End of round: \n${outcome}`;
  }
  
const overlayOff = () => {
    document.querySelector("#overlay").style.display = "none";
  }

const isGameEnded = () => {

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

const gameOutcome = () => {
    // The winner variable checks if one of the winning combinations has been hit by either the X or O

    const player1Win = winningCombinations.some(value => value.every(v => (v === player1.default_symbol) || (v === player1.custom_symbol)));
    const player2Win = winningCombinations.some(value => value.every(v => (v === player2.default_symbol) || (v=== player2.custom_symbol)));

    // The boardNotFull variable checks if there is still space on the board
    const boardNotFull = gridButtonsArr.some(value => value === '')

    // This if statement prints an outcome to the page when there is one. Use this.number maybe to cut down the if?
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

// This function displays the change in turn on the page;
const changeTurn = (nextGo) => {
    turns.forEach(turn => {
        if(turn.id === 'current-go') {
            turn.id = ''
        } else if (turn.id === '' && nextGo === true) {
            turn.id = 'current-go'
        }
    })
}

// This function adds an event listener to each tile
const gridEventListener = () => {
    gridButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if(button.innerText === '' && isGameEnded() !== true) {
                button.innerText = document.querySelector('#current-go').innerText;
                gridButtonsArr[index] = button.innerText;
                audio('click_sound.mp3');
                button.id = 'clicked';
                if(isGameEnded() === true) {
                    gameOutcome();
                    changeTurn(false);
                    audio('end_game_sound.mp3');
                } else {
                    changeTurn(true);
                }
            }
        })
    })
}

// This invokes the event listeners
gridEventListener();

// This restarts the game if you press the Restart Game button
const restartGameButtons = document.querySelectorAll('#restart');

const restartGame = (button) => {
    button.addEventListener('click', function() {
        overlayOff();
        gridButtons.forEach((value, index) => {
            value.innerText = '';
            value.id = index;
        });
        gridButtonsArr.forEach((value, index) => gridButtonsArr[index] = '');
        audio('restart_game.mp3');
        newGame();
        if(button.textContent === "Next Round!") {
            nextRound();
            firstTurn();
        }
        firstTurn();
    })
}

restartGameButtons.forEach(button => restartGame(button));

const resetGame = (button) => {
    restartGame(button);
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

resetPlayerButton.addEventListener('click', () => {
    if(newGame() === true) {
        resetPlayers();
    } else {
        alert('Please no changing players during the game');
    }
})