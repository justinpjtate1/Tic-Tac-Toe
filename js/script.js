//Takes the 9 grid buttons from the page
const gridButtons = document.querySelectorAll('.grid-item');

// Gathers the X and O elements on page
const turns = document.querySelectorAll('#scoreboard>p');

// This function checks if either one of the winning combinations or a tie has been hit and sends a message accordingly

const endOfGame = () => {
    turns.forEach(turn => {
        if(turn.id === 'current-go') {
            turn.id = ''
        }
    })
}
const gameOutcome = () => {
    
    //Makes an array out of the values inside each grid cell
    const gridButtonsArr = Array.prototype.slice.call(gridButtons).map(value => value.innerText);

    // All possible winning combinations in an array
    const winningCombinations = [
    [gridButtonsArr[0], gridButtonsArr[1], gridButtonsArr[2]],
    [gridButtonsArr[3], gridButtonsArr[4], gridButtonsArr[5]],
    [gridButtonsArr[6], gridButtonsArr[7], gridButtonsArr[8]],
    [gridButtonsArr[0], gridButtonsArr[3], gridButtonsArr[6]],
    [gridButtonsArr[1], gridButtonsArr[4], gridButtonsArr[7]],
    [gridButtonsArr[2], gridButtonsArr[5], gridButtonsArr[8]],
    [gridButtonsArr[0], gridButtonsArr[4], gridButtonsArr[8]],
    [gridButtonsArr[2], gridButtonsArr[4], gridButtonsArr[6]]
    ];

    // The winner variable checks if one of the winning combinations has been hit by either the X or O
    const winner = winningCombinations.some(value => value.every(v => v !== '' && v === value[0]));

    // The boardNotFull variable checks if there is still space on the board
    const boardNotFull = gridButtonsArr.some(value => value === '')

    // This if statement prints an outcome to the page when there is one
    if (winner === true) {
        document.querySelector('#result').innerText = 'winner';
        return true;
    } else if (boardNotFull === false) {
        document.querySelector('#result').innerText = 'draw'
        return true;
    }
}

// This function displays the change in turn on the page;
const changeTurn = () => {
    turns.forEach(turn => {
        if(turn.id === 'current-go') {
            turn.id = ''
        } else if (turn.id === '') {
            turn.id = 'current-go'
        }
    })
}

// This function adds an event listener to each tile
const gridEventListener = () => {
    gridButtons.forEach(button => {
        button.addEventListener('click', function() {
            if(button.innerText === '' && gameOutcome() !== true) {
                button.innerText = document.querySelector('#current-go').innerText;
                if(gameOutcome() === true) {
                    gameOutcome();
                    endOfGame();
                } else {
                    changeTurn();
                }
            }
        })
    })
}

// This invokes the event listeners
gridEventListener();

// This restarts the game if you press the Restart Game button
const restartGameButton = document.querySelector('#restart');
const restartGame = () => {
    restartGameButton.addEventListener('click', function() {
        gridButtons.forEach(value => {
            value.innerText = '';
        });
        turns[0].id = 'current-go';
        turns[1].id = '';
        document.querySelector('#result').innerText = '';
    });
};

restartGame();