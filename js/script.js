const gridButtons = document.querySelectorAll('.grid-item');

const changeTurn = () => {
    const turns = document.querySelectorAll('#scoreboard>p');
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
            value.innerText = document.querySelector('#current-go').innerText;
            changeTurn();
        })
    })
}

gridEventListener();