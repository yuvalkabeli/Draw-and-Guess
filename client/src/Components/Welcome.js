import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Welcome({ socket }) {
    const nameInput = useRef()
    const nav = useNavigate()
    const enterGame = () => {
        socket.emit('enter game', nameInput.current.value)
    }
    useEffect(() => {
        socket.on('users', (users) => {
            nav('/waiting', { state: users })
        })
        socket.on('room full', () => {
            console.log('room is full')
        })
    }, [socket])
    return (
        <div>
            welcome
            <input type="text" ref={nameInput} />
            <br />
            <button className='enterGame' onClick={() => enterGame()}>aaaa</button>
        </div>
    )
}
