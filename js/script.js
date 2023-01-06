//Takes the 9 grid buttons from the page
const gridButtons = document.querySelectorAll('.grid-item');

// Gathers the X and O elements on page
const turns = document.querySelectorAll('#scoreboard>p');

let pointsCross = 0;
let pointsNought = 0;



const gridButtonsArr = Array.prototype.slice.call(gridButtons).map(value => value.innerText);
   
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
    const winnerCross = winningCombinations.some(value => value.every(v => v === 'X'));
    const winnerNought = winningCombinations.some(value => value.every(v => v === 'O'));

    // The boardNotFull variable checks if there is still space on the board
    const boardNotFull = gridButtonsArr.some(value => value === '')

    // This if statement prints an outcome to the page when there is one
    if (winnerCross === true) {
        document.querySelector('#result').innerText = `winner X`;
        console.log(pointsCross += 1);
    } else if (winnerNought === true) {
        document.querySelector('#result').innerText = `winner O`;
        console.log(pointsNought += 1);
    } else if (boardNotFull === false) {
        document.querySelector('#result').innerText = 'draw'
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
                if(isGameEnded() === true) {
                    gameOutcome();
                    changeTurn(false);
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
const restartGameButton = document.querySelector('#restart');
const restartGame = () => {
    restartGameButton.addEventListener('click', function() {
        gridButtons.forEach(value => {
            value.innerText = '';
        });
        gridButtonsArr.forEach((value, index) => gridButtonsArr[index] = '');
        turns[0].id = 'current-go';
        turns[1].id = '';
        document.querySelector('#result').innerText = '';
    });
};

restartGame();