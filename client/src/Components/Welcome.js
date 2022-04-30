import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/welcome.scss'
export default function Welcome({ socket }) {
    const nameRef = useRef()
    const nav = useNavigate()
    const [placeHolder, setPlaceHolder] = useState('')
    const [highScore, setHighScore] = useState(0)
    const [players, setPlayers] = useState(['bob', 'ross'])
    const handleBlur = () => {
        if (nameRef.current.value.length > 0) {
            setPlaceHolder('none')
        }
        else {
            setPlaceHolder('')
        }
    }
    useEffect(() => {
        socket.emit('get HighScore')
    }, [])
    const enterGame = () => {
        socket.emit('enter game', nameRef.current.value)
    }
    useEffect(() => {
        socket.on('set HighScore', (highScoreData) => {
            const { users, score } = highScoreData;
            setPlayers([...users[0].username, users[1].username])
            setHighScore(score)
        })
        socket.on('users', (users) => {
            nav('/waiting', { state: users })
        })
        socket.on('room full', () => {
            console.log('room is full')
        })

    }, [socket])
    return (
        <div className="welcome" >
            <div className="welcome-middle">
                <h1 className='welcome-headline'>Draw & Guess</h1>
                <div id="fancy-inputs">
                    <label className="welcome-label">
                        <input className='welcome-input' ref={nameRef} onBlur={() => handleBlur()} type="text" />
                        <span><span style={{ display: placeHolder }}>Name</span></span>
                    </label>
                    <button className="welcome-btn" onClick={() => enterGame()}>Start Game</button>
                    <h1 className='welcome-headline'>Top Score:{highScore}</h1>
                    <h4 className='welcome-headline'>players:{players[0]},{players[1]}</h4>
                </div>
            </div>
        </div>
    )
}
