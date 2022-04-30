import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/welcome.scss'
import { niceAlert } from '../Controller/alerts';
export default function Welcome({ socket }) {
    const nameRef = useRef()
    const nav = useNavigate()
    const [placeHolder, setPlaceHolder] = useState('')
    const [highScore, setHighScore] = useState(0)
    const [players, setPlayers] = useState([])
    const [time, setTime] = useState('')
    const handleBlur = () => {
        if (nameRef.current.value.length > 0) {
            setPlaceHolder('none')
        }
        else {
            setPlaceHolder('')
        }
    }
    useEffect(() => {
        socket.emit('get highScore')
    }, [])
    const enterGame = () => {
        socket.emit('enter game', nameRef.current.value)
    }
    useEffect(() => {
        socket.on('users', (users) => {
            nav('/waiting', { state: users })
        })
        socket.on('room full', (users) => {
            niceAlert('Room Is Full')
        })
        socket.on('update highScore', (highScore) => {
            const { playerOne, playerTwo, score, time } = highScore[0];
            setPlayers([...[playerOne, playerTwo]]);
            setHighScore(score);
            setTime(time);
        })
    }, [socket])
    return (
        <div className="welcome" >
            <div className="welcome-middle">
                <h1 className='welcome-headline'>Draw & Guess</h1>
                <div id="fancy-inputs">
                    <label className="welcome-label">
                        <input className='welcome-input' ref={nameRef} type="text" />
                        <span><span style={{ display: placeHolder }}>Name</span></span>
                    </label>
                    <button className="welcome-btn" onClick={() => enterGame()}>Start Game</button>
                    <h1 className='welcome-headline'>Top Score:{highScore}</h1>
                    <h1 className='welcome-headline'>Time:{time}</h1>
                    <h4 className='welcome-headline'>players:</h4>
                    <h4 className='welcome-headline'>{players[0]},{players[1]}</h4>
                </div>
            </div>
        </div>
    )
}
