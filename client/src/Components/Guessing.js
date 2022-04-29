import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};


export default function Drawing({ socket }) {
  const canvas = useRef()
  const guess = useRef()
  // const [forceRender, setForceRender] = useState(0)
  const nav = useNavigate()
  useEffect(() => {
    socket.on('load stroke', (stroke) => {
      if (!canvas.current) return
      canvas.current.loadPaths(stroke)
    })
    socket.on('reset canvas', () => {
      if (!canvas.current) return
      canvas.current.resetCanvas()
    })
    socket.on('undo', () => {
      if (!canvas.current) return
      canvas.current.undo()
    })
    socket.on('redo', () => {
      if (!canvas.current) return
      canvas.current.redo()
    })

    socket.on('switch', () => {
      console.log('you win')
      nav('/word-choose')
    })
  }, [socket])
  const tryGuess = () => {
    console.log('try guess')
    socket.emit('try guess', guess.current.value)
  }
  return (
    <div>
      <ReactSketchCanvas
        ref={canvas}
        strokeWidth={3}
        strokeColor="none"
      />
      <input type="text" ref={guess} />
      <button onClick={() => tryGuess()}>Guess!</button>
    </div>
  )
}
