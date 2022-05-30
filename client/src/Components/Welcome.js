import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/welcome.scss'
import { niceAlert } from '../Controller/alerts';
import { getHighScore, getUsers } from '../Controller/socketFunctions';
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
    const enterGame = () => {
        const username = nameRef.current.value
        if (!username) return niceAlert('Please Select A Username', 'error')
        socket.emit('enter game', username)
    }

    useEffect(() => getHighScore(socket), [])
    useEffect(() => {
        getUsers(socket, nav)
        socket.on('room full', () => {
            niceAlert('Room Is Full')
        })
        socket.on('update highScore', (highScore) => {
            const { playerOne, playerTwo, score, time } = highScore[0];
            setPlayers([...[playerOne, playerTwo]]);
            setHighScore(score);
            setTime(time);
        })
        return socket.off()
    }, [socket])
    return (
        <div className="welcome" >
            <div className="welcome-middle">
                <h1 className='welcome-headline'>Draw & Guess</h1>
                <div id="fancy-inputs">
                    <label className="welcome-label">
                        <input className='welcome-input' ref={nameRef} type="text" onBlur={() => handleBlur()} />
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
