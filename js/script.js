const gridButtons = document.querySelectorAll('.grid-item');
const turns = document.querySelectorAll('#scoreboard>p');

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