import React, { useRef } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};


export default function Drawing() {
    const canvas = useRef()

  return (
      <div>
        <ReactSketchCanvas
          ref={canvas}
          strokeWidth={5}
          strokeColor="black"
          onChange={async () => {
              //send this to the other canvas
            const l = await canvas.current.exportPaths("png") 
            }
        }
        />
        <button onClick={async()=>{
            canvas.current.resetCanvas()
        }} className='clear'>clear</button>
        <button onClick={async()=>{
            canvas.current.undo()
        }} className='undo'>undo</button>
        <button onClick={async()=>{
            canvas.current.redo()
        }} className='redo'>redo</button>
        </div> 
  )
}
