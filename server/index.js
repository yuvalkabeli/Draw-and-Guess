const express = require('express');
const app = express();
const cors = require('cors');
const socketIo = require('socket.io');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let users = [];
let score=0;
const server = app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}:`);
})

const io = socketIo(server);


io.on('connection', (socket) => {
    socket.on('enter game',(username)=>{
        if(users.length<2){
            users.push({
                username,
                id:socket.id
            })
            socket.emit('users',users)
            if(users.length===2){
                socket.to(users[0].id).emit('start game');
            }
        }
        else{
            io.emit('room full');
        }
    })
    socket.on('start draw',()=>{
        socket.to(users[1].id).emit('start guess');
    })
    socket.on('pass stroke',(stroke)=>{
        console.log(users[1])
        socket.to(users[1].id).emit('load stroke',stroke)
    })
    socket.on('undo',()=>{
        console.log('undo is here')
        socket.to(users[1].id).emit('undo')
    })
    socket.on('redo',()=>{
        console.log('redo is here')
        socket.to(users[1].id).emit('redo')
    })
    socket.on('reset canvas',()=>{
        console.log('reset canvas is here')
        socket.to(users[1].id).emit('reset canvas')
    })

    socket.on("disconnect", () => {
        io.emit("messageBack", { message: "disconnected" });
      });
});

