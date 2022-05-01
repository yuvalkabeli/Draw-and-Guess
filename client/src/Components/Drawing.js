import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { AiOutlineUndo, AiOutlineRedo, AiOutlineClose } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import '../Styles/drawing.scss'


export default function Drawing({ socket }) {
  const canvas = useRef()
  const { state: wordData } = useLocation()
  const [score, setScore] = useState(0)
  const { word, points } = JSON.parse(wordData)
  const nav = useNavigate()
  const [color, setColor] = useState('black')
  const [size, setSize] = useState(4)
  const colorRef = useRef()
  const sizeRef = useRef()

  const colorSelected = () => {
    const brushColor = colorRef.current.value
    setColor(brushColor)
  }

  const sizeSelected = () => {
    const brushSize = sizeRef.current.value
    setSize(brushSize)
  }

  useEffect(() => {
    socket.on('switch', (users) => {
      nav('/waiting', { state: users })
    })
    socket.on('end game', () => {
      nav('/waiting')
    })
    socket.on('game results', ({ score, users }) => {
      // add ending notification
      nav('/')
    })
    socket.on('update score', (score) => {
      setScore(score);
    })
    return () => { }
  }, [socket])

  const endGame = () => {
    socket.emit('manual end game')
  }

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


      <div className='drawing' >
        <h4 className='drawing-headline' >SCORE:{score}</h4>
        <h2 className='drawing-headline' >Your Word Is: "{word}" ({points} pts)</h2>
        <ReactSketchCanvas
          ref={canvas}
          width="90vw"
          height="50vh"
          strokeWidth={size}
          strokeColor={color}
          onStroke={() => transferStrokes()}
        />
        <div className="drawing-btns">
          <button onClick={() => transferResetCanvas()} className='clear'><MdDelete /></button>
          <button onClick={() => transferUndo()} className='undo'><AiOutlineUndo /></button>
          <button onClick={() => transferRedo()} className='redo'><AiOutlineRedo /></button>
        </div>
        <div className='pick-color-wrapper'>
          <p className='pick-color'> Pick Brush color / size</p>
          <div className="brush-settings">
            <input ref={colorRef} onChange={() => colorSelected()} className="brush-color" type="color" />
            <input ref={sizeRef} onChange={() => sizeSelected()} className="brush-size" type="range" defaultValue={4} min="1" max="50" />
          </div>
          <button onClick={() => endGame()} className='btn'><AiOutlineClose /></button>
        </div>
      </div>
    </div >
  )

}
