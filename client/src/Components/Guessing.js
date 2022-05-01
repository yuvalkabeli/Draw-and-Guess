import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { ToastContainer } from 'react-toastify';
import { errorNotification } from '../Controller/alerts';
import { niceAlert } from '../Controller/alerts';
import '../Styles/guessing.scss'


export default function Drawing({ socket }) {
  const canvas = useRef()
  const guess = useRef()
  const [placeHolder, setPlaceHolder] = useState('')
  const [score, setScore] = useState(0)
  const nav = useNavigate()

  const handleBlur = () => {
    if (guess.current.value.length > 0) {
      setPlaceHolder('none')
    }
    else {
      setPlaceHolder('')
    }
  }

  useEffect(() => {
    socket.on('load stroke', (stroke) => {
      if (!canvas.current) return
      canvas.current.loadPaths(stroke)
    })
    socket.on('reset canvas', () => {
      if (!canvas.current) return
      canvas.current.resetCanvas()
    })
    socket.on('undo', (stroke) => {
      if (!canvas.current) return
      canvas.current.clearCanvas()
      canvas.current.loadPaths(stroke)
      canvas.current.clearCanvas()
      canvas.current.undo()
      canvas.current.undo()

    })
    socket.on('redo', (stroke) => {
      if (!canvas.current) return
      canvas.current.clearCanvas()
      canvas.current.loadPaths(stroke)
      canvas.current.redo()
    })
    socket.on('switch', () => {
      nav('/word-choose')
    })

    socket.on('end game', ({ score, users }) => {
      niceAlert(`Your Score:${score}`);
      nav('/waiting')
    })

    socket.on('wrong guess', () => {

      errorNotification('Wrong guess, try again!', 'bottom-center');
    })

    socket.on('game results', ({ score, users, time }) => {
      niceAlert(`Your Score:${score} <br/> Your Time:${time}`)
      nav('/')
    })
    socket.on('update score', (score) => {
      setScore(score);
    })
    return () => { }
  }, [socket])
  const tryGuess = (e) => {
    e.preventDefault()
    const guessWord = guess.current.value
    socket.emit('try guess', guessWord.toLowerCase())
  }
  const endGame = () => {
    socket.emit('manual end game')
  }
  return (
    <div className="welcome-middle guessing">
      <form id="fancy-inputs" onSubmit={(e) => tryGuess(e)} >
        <h4 className='guessing-headline' >SCORE:{score}</h4>
        <h1 className='guessing-headline'>Guess the draw</h1>
        <ReactSketchCanvas
          ref={canvas}
          width="90vw"
          height="50vh"
          strokeColor="none"
        />
        <label className="input">
          <input className='guessing-input' ref={guess} onBlur={() => handleBlur()} type="text" />
          <span><span style={{ display: placeHolder }} >Write Guess</span></span>
        </label>
        <button className='guessing-btn'>Guess</button>
        <button type='button' onClick={() => endGame()} className='btn'><AiOutlineClose /></button>
      </form>
      <ToastContainer />
    </div>
  )
}
