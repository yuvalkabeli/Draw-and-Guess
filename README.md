# Draw & Guess
A draw & Guess game with front and back ends 
The app is primarily suited for mobile, but also works on PC.

## Description
This is a 2 player game, where the objective is to earn as many points as possible through correctly guessing random words through drawing!
When you enter the game the top score is presented on the welcome screen as well as a username input.
Once you click "Start Game" you will be sent to a waiting room until another player joins the game.
The game starts with the first player choosing 1 out of 3 words that he would like to draw for the other person.
When a word is chosen, one player draws and in the meantime, the other player guesses the word.
Once a word is guessed correctly, the roles switch and the game starts over.
The game will go on until one of the players leaves by:
1.pressing the red X icon on the top left of the screen.
2.exiting the browser.

### Techonologies Used
#### FrontEnd
* React - frontend architecture.
* Socket.IO/client -  for client-side communication with the server.
* Sass - Design for the entire app.
* AWS S3 - Deployment.

#### BackEnd
* Express + Socket.IO - server architecture
* MongoDB - Database for storing game sessions
* Heroku - Deployment.


## Deployment
Game Link : https://bit.ly/3ktXl1h