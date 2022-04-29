import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};


export default function Drawing({ socket }) {
  const canvas = useRef()
  const nav = useNavigate()
  useEffect(() => {
    socket.on('switch', (users) => {
      console.log(users)
      nav('/waiting', { state: users })
    })
    socket.on('end game', ({ score, users }) => {
      alert(`score: ${score} user1:${users[0].username}   user:${users[1].username}`)
      nav('/waiting')
    })
  }, [socket])
  const transferStrokes = async () => {
    //sends stroke to the other canvas
    const stroke = await canvas.current.exportPaths("png")
    socket.emit('pass stroke', stroke)
  }
  const transferResetCanvas = () => {
    socket.emit('reset canvas')
    canvas.current.resetCanvas()
  }
  const transferUndo = async () => {
    const stroke = await canvas.current.exportPaths("png")
    socket.emit('undo', stroke)
    canvas.current.undo()
  }
  const transferRedo = async () => {
    const stroke = await canvas.current.exportPaths("png")
    socket.emit('redo', stroke)
    canvas.current.redo()
  }
  return (
    <div>
      <ReactSketchCanvas
        ref={canvas}
        strokeWidth={3}
        strokeColor="black"
        onStroke={() => transferStrokes()}
      />
      <button onClick={() => transferResetCanvas()} className='clear'>clear</button>

      <button onClick={() => transferUndo()} className='undo'>undo</button>

      <button onClick={() => transferRedo()} className='redo'>redo</button>
    </div>
  )

}
