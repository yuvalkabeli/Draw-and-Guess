# Draw and Guess Game

## Introduction
"Draw and Guess" is an interactive online game where players challenge each other in a fun drawing and guessing game. Upon clicking "Start Game," players are taken to a waiting room until another player joins. The game alternates roles between drawing and guessing, with players taking turns to either illustrate or identify words.

## Gameplay
- **Starting the Game**: Click "Start Game" to enter the waiting room. The game will commence when another player joins.
- **Game Process**:
  1. The first player selects one of three words to draw.
  2. The chosen player draws, while the other guesses the word.
  3. Once the word is correctly guessed, roles are switched, and the process repeats.
- **Ending the Game**: Players can leave the game at any time by:
  - Clicking the red X icon on the top left of the screen.
  - Exiting the browser.

## Technologies Used

### FrontEnd
- **React**: Used for the frontend architecture.
- **Socket.IO/client**: Facilitates client-side communication with the server.
- **Sass**: Provides styling for the app.
- **AWS S3**: Handles deployment.

### BackEnd
- **Express + Socket.IO**: Forms the server architecture.
- **MongoDB**: Database used for storing game sessions.
- **Heroku**: Deployment platform.(no longer active)

## Deployment
The game was previously available at [this link](https://bit.ly/3ktXl1h). However, it is currently inactive as the server is not live. The source code for the server is still available on the GitHub page for anyone interested in setting up their server to host the game.

## Access to Code
The complete source code and server implementation details are available in this repository. This allows developers to view, use, or modify the code for their purposes, and potentially revive the game for new environments or uses.
