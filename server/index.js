const express = require('express');
const app = express();
const cors = require('cors');
const socketIo = require('socket.io');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let users = [];
let score = 0;
let currentGuessedWord = ''
const server = app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}:`);
})

const io = socketIo(server);


io.on('connection', (socket) => {
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
            io.emit('room full');
        }
    })
    socket.on('start draw', (wordData) => {
        currentGuessedWord = wordData;
        socket.to(users[1].id).emit('start guess');
    })
    socket.on('pass stroke', (stroke) => {
        socket.to(users[1].id).emit('load stroke', stroke);
    })
    socket.on('undo', () => {
        socket.to(users[1].id).emit('undo');
    })
    socket.on('redo', () => {
        socket.to(users[1].id).emit('redo');
    })
    socket.on('reset canvas', () => {
        socket.to(users[1].id).emit('reset canvas');
    })
    socket.on('try guess', (guess) => {
        const { points, word } = currentGuessedWord;
        console.log(word)
        if (guess === word) {
            score += Number(points);
            users.push(users.shift());
            io.emit('switch', users);
        }
    });
    socket.on("disconnect", () => {
        io.emit("messageBack", { message: "disconnected" });
    });
});

