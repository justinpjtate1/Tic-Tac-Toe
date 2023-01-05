# Tic-Tac-Toe
Tic-Tac-Toe game

MVP Features:

As a user, I should be able to start a new tic tac toe game:
- On page load, the page should display an empty tic tac toe board with the default being a cross. Possibly this is simple HTML - flexbox and flexgrid? Maybe not even flexgrid. I think the grid will need an indiviual element for each tile because we will need event listeners for each [NEEDS RESEARCH]

As a user, I should be able to click on a square to add X first and then O, and so on
- The game should start with the cross' turn by default
- No square should be allowed to be clicked twice. You'd want to use event listeners and have a condition based on the elements innertext


As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
- Need some images of X and O that highlight depending on who's turn it is.


As a user, I should not be able to click the same square twice
- Possibly use event listeners and have conditions based on the element's innertext. If innertext is blank, allow it to be filled by whichever symbol's turn it is.

As a user, I should be shown a message when I win, lose or tie
- There should also be a popup showing the outcome when the game is finished, with a button to start a new game. [NEEDS RESEARCH]

As a user, I should not be able to continue playing once I win, lose, or tie
- The pop-up should not be clicked out of unless the user wants to play again.

As a user, I should be able to play the game again without refreshing the page
- There should be a restart button that's visible that empties the board and starts a new game with the default being a cross
