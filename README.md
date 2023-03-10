# Tic-Tac-Toe (GA Project 1)
## Project Overview

The aim of the project was to create a game of Tic Tic Toe using just HTML, CSS and JS. 

https://justinpjtate1.github.io/Tic-Tac-Toe/

## Technologies used
- Code Editor: VSCode
- Languages: HTML, CSS, JS
- Design: Wireframe.cc

## Big Goals
- [DONE] Build a web application from scratch, without a starter codebase
- [DONE] Use your programming skills to work out the game logic for a simple game like Tic Tac Toe
- [DONE] Separate HTML, CSS, and JavaScript files in your application
- [DONE] Build an application to a specification that someone else gives you
- [DONE] Build a dynamic game that allows two players to compete from the same computer

## Features

### MVP Features:

- [DONE] As a user, I should be able to start a new tic tac toe game:
    - Used some JS that rendered a tic tac toe grid upon page load.
    - I also used some JS to render the 2 players. On page load, the 2 players have the default settings, but these can modified and saved.

- [DONE] As a user, I should be able to click on a square to add X first and then O, and so on
    - I added a click event listener that would run a function to switch the turn between the 2 players. The click event listener would also insert the counter of the relevant player.

- [DONE] As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next.
    - The click event listener would run a function that switched the player turn. 
    - When the player turn was switch, I ran a function that would change the styling of the player's counter so it was clear who's turn it was. 
    - I also used an overlay that would activate once a winning combination was hit. The overlay would insert the result.

- [DONE] As a user, I should not be able to click the same square twice
    - The click event listener on each grid square checked the contents of each square and would only enter the player's counter if the square was empty.
    - I also added some cursor styling in CSS, so it's clear to the user that the square cannot be clicked again.

- [DONE] As a user, I should be shown a message when I win, lose or tie
    - I also used an overlay that would activate once a winning combination was hit (or a tie). The overlay would insert the result. This was all handled in JS. I used a 2D array to store all the possible winning combinations. When a user clicks on any vacant square, the click event listener would evaluate the grid against the winning conditions set. If hit, the overlay would display.

- [DONE] As a user, I should not be able to continue playing once I win, lose, or tie
    - The overlay activating as above solved this problem, but also I added some logic into the click event listener that if one of the combinations were hit, the square couldn't be clicked, regardless of whether there was a counter in there or not.

- [DONE] As a user, I should be able to play the game again without refreshing the page
    - Added a 'next round' button on the overlay and a 'restart round' button on the actual Tic-Tac-Toe page. This cleared the board and all the arrays used to check the results.

### Extra Features:

- [DONE] Keep track of multiple game rounds with a win, lose and tie counter
    - I defined player 1 and player 2 using classes. Within each class, I defined a score. The score would update once a winning condition was hit. If it was a draw, neither score would update. I also created a rounds variable to keep track of rounds.

- [DONE] Allow players to customize their tokens (X, O, name, picture, etc)
    - Within the player class, there would be a default symbol and name that was defined when the player 1 and 2 objects were defined. These would load onto the page on page load
    - I added 2 text input bars and a file input for each player to enable the user to customise each player. These would store under a custom symbol and custom name key in each player's object. If these were activated by the user, they would render to the page as the new name/counter. Again using event listeners. 

- [DONE] Use localStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
    - The custom names, symbols and the scores and round count were all inputted into local storage when they update. This allows the players to continue exactly where they left off. 

- [DONE] Involve Audio in your game
    - Also stored the audio preference in local storage. Used the Audio constructor and used event listeners on the volume button to determine whether the user preferred the volume on or off. The audio files would only render when the volume button is toggled on.

- [DONE] Make your site fully responsive so that it is playable from a mobile phone

- [DONE] Get inventive with your styling e.g. use hover effects or animations

- Create an AI opponent: teach JavaScript to play an unbeatable game against you

- Allow 2 players to play online with each other using any means such as WebSockets, Firebase, or other 3rd-party services.

## Planning

My first goal was to create a plan that included all of the MVP features. Firstly I thought about how the web page application would look and drafted some simple wireframes.

<img width="350" alt="Wireframe 1" src="https://user-images.githubusercontent.com/119341279/212289697-0348b252-011b-4cc2-84be-77dfdc9b43f7.png">
<img width="350" alt="Wireframe 2" src="https://user-images.githubusercontent.com/119341279/212289704-b3d8a35e-2626-4fa7-9e16-29b8fe7afd97.png">

I knew I would need individual sections for the scoreboard, the playing board and the reset buttons. I also knew I would need a div for the overlay that didn't show initially.

To avoid repeating code for the 2 players, I defined the HTML for a player and used JS logic to clone the nodes for the second player. 

The biggest piece of planning was to work out how to best to define the winning conditions and look them up against the current state of the board. I decided as the winning conditions weren't going to change, I could add these manually in a 2D array. I also had to think about some functionality that checked the board against this 2D array to see if any conditions held true. I decided this should be done on the click event for each tile, so I also knew that the current board would need it's own array and updated on every click.

Decided to use class IDs on page to show who's turn it is and this would alternate on the click event.

Restart button had to clear the current board array.

I also did some research into how to create an overlay with the end result.
