<div id="header" align="center">

  <img src="https://media.istockphoto.com/id/1365567894/vector/hand-drawn-vector-tic-tac-toe-game-noughts-and-crosses-doodle-sketch.jpg?s=612x612&w=0&k=20&c=pSs72urXBp6V8pnXvuJIfX3krtUoFhHaX6fG2g1PxUQ=" width="500" height="500">

</div>

# Tic-Tac-Toe

## Deployment

This app is available [here](https://justinpjtate1.github.io/Tic-Tac-Toe/). 

## Description

The aim of the project was to create a 2 player game of Tic Tic Toe using just HTML, CSS and JS. 

## Getting Started/Code Installation

All code is available in the main branch. To install the code, simply fork and clone the repo.

## Timeframe

This was a solo project. I spent 6 days on this project.

Firstly, I wanted to achieve an MVP, which included applying the game logic and 2 players being able to play a round on the same device.

The next step was to build on this and add some additional features. I wanted to keep score of the games between the 2 users and I wanted the users to be able to customise their player by having custom tokens and even uploaded tokens.

After this I refactored the code to make more sense and fixed some bugs that came up.

## Technologies used
- Code Editor: VSCode
- Languages: HTML, CSS, JS
- Design: Wireframe.cc

## Planning
I had the following goals that I wanted to achieve in the MVP:
- Build a web application from scratch, without a starter codebase
- Use your programming skills to work out the game logic for a simple game like Tic Tac Toe
- Separate HTML, CSS, and JavaScript files in your application
- Build an application to a specification that someone else gives you
- Build a dynamic game that allows two players to compete from the same computer

And I had the following user stories for the MVP:
- As a user, I should be able to start a new tic tac toe game
- As a user, I should be able to click on a square to add X first and then O, and so on
- As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next.
- As a user, I should not be able to click the same square twice
- As a user, I should be shown a message when I win, lose or tie
- As a user, I should not be able to continue playing once I win, lose, or tie
- As a user, I should be able to play the game again without refreshing the page

With the following stories for extra features:
- As a user, I want to keep track of multiple game rounds with a scoreboard
- As a user, I want to customize the tokens
- As a user, I want to customize the tokens with an uploaded image
- As a user, I want the scores to be saved so I can come back to it another time
- As a user, I want to hear some sounds when interacting with the game
- As a user, I want to play the game on a mobile phone

## Build Code Process

Some of the pieces of code I would highlight:

1. The RepetitveElements class and the Player class

    ![](./resources/Repetitve%20Elements.png)
    ![](./resources/Player%20Class.png)

    These classes rendered repetitive HTML elements so adding multiple players became easier.

2. The game logic

    ![](./resources/Game%20Logic.png)

    The function that determines if the game should be over and if there's a winner. I have some nested arrays that list all the possible winning combinations of grid buttons. I then use an array method on the parent array to check if there is 1 nested array where all 3 values match and are not blank. It also checks if there are some empty spaces on the board to determine if there should be another turn.

3. Upload image functionality

    ![](./resources/Upload%20Image.png)

    The function that allows image uploads for each player's cursor

4. Getting the chalk theme

    ![](./resources/Chalk%20theme.png)
    
## Challenges

- Keeping the code dry when there were quite a lot of repetitve elements
- Doing an image upload for the first time
- Sometimes had to refactor code to be able to add some of the extra features

## Wins

- Retro design
- Logic worked well
- Very few bugs in current version of code

## Key Learnings

- Solidified a lot of JavaScript knowledge (as this was my first project)
- Learnt a lot of new array methods
- I would have done some of the CSS styling a lot later in the process

## Future Improvements
- Allowing 2 players to play online
- Allowing games against the AI
- Adding the image upload to local storage for future sessions