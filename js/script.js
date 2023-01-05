const gridButtons = document.querySelectorAll('.grid-item');
const turns = document.querySelectorAll('#scoreboard>p');

gridButtons.forEach(value => {
    value.addEventListener('click', function() {
        value.innerText = document.querySelector('#current-go').innerText;
    })
})

// turns.forEach(turn => {
//     if(turn.id = 'current-go') {
//         turn.id = '';
//     } if(turn.id = '') {
//         turn.id = 'current-go';
//     }
// })
