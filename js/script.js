//Takes the 9 grid buttons from the page
const gridButtons = document.querySelectorAll('.grid-item');

// Gathers the X and O elements on page
const turns = document.querySelectorAll('.counter');

let pointsCross = 0;
let pointsNought = 0;

const createElement = (elementType, className, id, innerText, parentDiv) => {
    const newElement = document.createElement(elementType);
    newElement.className = className;
    newElement.id = id;
    newElement.innerText = innerText;
    parentDiv.appendChild(newElement);
}

createElement('div', 'scores', 'scoreCross', pointsCross, document.querySelector('#scores'));
createElement('div', 'scores', 'scoreNought', pointsNought, document.querySelector('#scores'));

const gridButtonsArr = Array.prototype.slice.call(gridButtons).map(value => value.innerText);

const volumeButton = document.querySelector('.sound-button');

volumeButton.addEventListener('click', function() {
    if(volumeButton.id === 'sound-button-on') {
        volumeButton.id = 'sound-button-off';
        volumeButton.src = 'sound-off.png';
    } else if(volumeButton.id === 'sound-button-off') {
        volumeButton.id = 'sound-button-on';
        volumeButton.src = 'sound-on.png';
    }
})

const audio = (filename) => {
    if (volumeButton.id === 'sound-button-on') {
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

const changeCrossScore = (value) => {
    pointsCross = value;
    document.querySelector('#scoreCross').innerText = pointsCross;
}

const changeNoughtScore = (value) => {
    pointsNought = value;
    document.querySelector('#scoreNought').innerText = pointsNought;
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
    const winnerCross = winningCombinations.some(value => value.every(v => v === 'X'));
    const winnerNought = winningCombinations.some(value => value.every(v => v === 'O'));

    // The boardNotFull variable checks if there is still space on the board
    const boardNotFull = gridButtonsArr.some(value => value === '')

    // This if statement prints an outcome to the page when there is one
    if (winnerCross === true) {
        changeCrossScore(pointsCross + 1);
        overlayOn('Cross Wins');
    } else if (winnerNought === true) {
        changeNoughtScore(pointsNought + 1);
        overlayOn('Nought Wins');
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
        turns[0].id = 'current-go';
        turns[1].id = '';
        audio('restart_game.mp3');
    })
}

restartGameButtons.forEach(button => restartGame(button));

const resetGame = (button) => {
    restartGame(button);
    button.addEventListener('click', function() {
        changeCrossScore(0);
        changeNoughtScore(0);
    })
};

const resetGameButtons = document.querySelectorAll('#reset-game');
resetGameButtons.forEach(button => resetGame(button));