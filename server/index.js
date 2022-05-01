const express = require('express');
const app = express();
const cors = require('cors');
const socketIo = require('socket.io');
const { getHighScore, saveSession } = require('./DB/MongoDB');
const { getTime } = require('./Controller/helpers');
require('dotenv').config();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5000
let users = [];
let score = 0;
let currentGuessedWord = ''
let startTime

const server = app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}:`);
})

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"]
    },
});

io.on('connection', (socket) => {
    socket.on('get highScore', async () => {
        const highScore = await getHighScore();
        io.emit('update highScore', (highScore))
    })
    socket.on('enter game', (username) => {
        if (users.length < 2) {
            users.push({
                username,
                id: socket.id
            })
            socket.emit('users', users)
            if (users.length === 2) {
                socket.to(users[0].id).emit('start game');
            }
        }
        else {
            io.emit('room full', users);
        }
    })
    socket.on('start draw', (wordData) => {
        currentGuessedWord = JSON.parse(wordData);
        socket.to(users[1].id).emit('start guess');
        io.emit('update score', score)
        if (!startTime) startTime = new Date();
    })
    socket.on('pass stroke', (stroke) => {
        socket.to(users[1].id).emit('load stroke', stroke);
    })
    socket.on('undo', (stroke) => {
        socket.to(users[1].id).emit('undo', stroke);
    })
    socket.on('redo', (stroke) => {
        socket.to(users[1].id).emit('redo', stroke);
    })
    socket.on('reset canvas', () => {
        socket.to(users[1].id).emit('reset canvas');
    })
    socket.on('try guess', (guess) => {
        const { points, word } = currentGuessedWord;
        console.log(word);
        if (guess === word) {
            score += Number(points);
            users.push(users.shift());
            io.emit('switch', users);
        }
        else {
            socket.emit('wrong guess');
        }
    });
    socket.on('manual end game', async () => {
        const time = getTime(startTime, new Date())
        io.emit('game results', { score, users, time });
        await saveSession({
            playerOne: users[0].username,
            playerTwo: users[1].username,
            score,
            time
        })
        users = [];
        score = 0;
        startTime = null
    })
    socket.on("disconnect", async () => {
        if (users.length === 0) return
        const usersCopy = [...users];
        if (users === 2 && score > 0) {
            await saveSession({
                playerOne: users[0].username,
                playerTwo: users[1].username,
                score,
                time: getTime(startTime, new Date())
            })
        }
        users = users.filter((user) => user.id !== socket.id);
        if (users.length === 1 && usersCopy.length === 2) {
            io.to(users[0].id).emit('end game', { score, users: usersCopy });
            score = 0;
            startTime = null

        }
    });
});

