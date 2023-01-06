const gridButtons = document.querySelectorAll('.grid-item');
const gridButtonsArr = Array.prototype.slice.call(gridButtons);
const turns = document.querySelectorAll('#scoreboard>p');

const gameOver = () => {
    if(gridButtonsArr.every(value => value.innerText !== '')) {
        document.querySelector('#result').innerText = 'draw'
    }
}

// const winningConditions = [
//     [gridButtons[0].innerText, gridButtons[1].innerText, gridButtons[2].innerText],
//     [gridButtons[3].innerText, gridButtons[4].innerText, gridButtons[5].innerText],
//     [gridButtons[6].innerText, gridButtons[7].innerText, gridButtons[8].innerText],
// ]

// for (let i = 0; i < winningConditions.length; i++) {
//     if(winningConditions[i][0] === winningConditions[i][1] === winningConditions[i][2] && winningConditions[i][0] !== '') {
//         return document.querySelector('#result').innerText = 'winner'
//     }
// }

// const gameOver2 = () => {
//     gridButtons2 = document.querySelectorAll('.grid-item');
//     for (let i = 0; i < gridButtons2.length; i++) {
//         if (gridButtons2[i].innerText !== '' && gridButtons2[i].innerText === gridButtons2[i+1].innerText === gridButtons2[i+2].innerText) {
//             document.querySelector('#result').innerText = 'winner'
//         }
//     }
// }

const gameOver3 = () => {
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
    
    winningConditions.forEach(value => {
        if(value.every(v => v !== '' && v === value[0])) {
            document.querySelector('#result').innerText = 'winner'
        }
    })


    // if(winningConditions.forEach(value => {
    //     value.every(v => v !== '' && v === value[0])
    // }) === true) {
    //     document.querySelector('#result').innerText = 'winner'
    // } else if (gridButtonsArr.every(v => v.innerText !== '')) {
    //     document.querySelector('#result').innerText = 'draw'
    // }
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
            if(value.innerText === '') {
                value.innerText = document.querySelector('#current-go').innerText;
                changeTurn();
                gameOver3();
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
    });
};

restartGame();