const gridButtons = document.querySelectorAll('.grid-item');
const gridButtonsArr = Array.prototype.slice.call(gridButtons);
const turns = document.querySelectorAll('#scoreboard>p');

const gameOver = () => {
    const winningConditions = [
        [gridButtons[0].innerText, gridButtons[1].innerText, gridButtons[2].innerText],
        [gridButtons[3].innerText, gridButtons[4].innerText, gridButtons[5].innerText],
        [gridButtons[6].innerText, gridButtons[7].innerText, gridButtons[8].innerText],
        [gridButtons[0].innerText, gridButtons[3].innerText, gridButtons[6].innerText],
        [gridButtons[1].innerText, gridButtons[4].innerText, gridButtons[7].innerText],
        [gridButtons[2].innerText, gridButtons[5].innerText, gridButtons[8].innerText],
        [gridButtons[0].innerText, gridButtons[4].innerText, gridButtons[8].innerText],
        [gridButtons[2].innerText, gridButtons[4].innerText, gridButtons[6].innerText]
    ];

    const winner = winningConditions.some(value => value.every(v => v !== '' && v === value[0]))
    const boardNotFull = gridButtonsArr.some(value => value.innerText === '')

    if (boardNotFull === true && winner === true) {
        document.querySelector('#result').innerText = 'winner'
    } else if (boardNotFull === false && winner === true) {
        document.querySelector('#result').innerText = 'winner'
    } else if (boardNotFull === false) {
        document.querySelector('#result').innerText = 'draw'
    }
}

const changeTurn = () => {
    turns.forEach(turn => {
        if(turn.id === 'current-go') {
            turn.id = ''
        } else if (turn.id === '') {
            turn.id = 'current-go'
        }
    })
}

const gridEventListener = () => {
    gridButtons.forEach(value => {
        value.addEventListener('click', function() {
            if(value.innerText === '' && document.querySelector('#result').innerText === '') {
                value.innerText = document.querySelector('#current-go').innerText;
                changeTurn();
                gameOver();
            }
        })
    })
}

gridEventListener();

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