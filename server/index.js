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
            io.to(socket.id).emit('users',users)
            if(users.length===2){
                console.log('im here');
                socket.to(users[0].id).emit('start game')
            }
        }
        else{
            io.to().emit('room full')
            console.log(users);
        }
    })
});


process.on('unhandledRejection', (err) => {

  console.error(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});