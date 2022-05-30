export const getHighScore = (socket) => {
    socket.emit('get highScore')
}
export const getUsers = (socket, nav) => {
    socket.on('users', (users) => {
        nav('/waiting', { state: users })
    })
}
// export const 