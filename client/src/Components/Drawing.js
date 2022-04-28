import React, { useRef } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};


export default function Drawing({socket}) {
    const canvas = useRef()
    const transferStrokes = async () => {
      console.log('saasa')
        //sends stroke to the other canvas
        const stroke = await canvas.current.exportPaths("png") 
        socket.emit('pass stroke',stroke)
    }
    const transferResetCanvas=()=>{
socket.emit('reset canvas')
 canvas.current.resetCanvas()
    }
    const transferUndo=()=>{
socket.emit('undo')
 canvas.current.undo()
    }
    const transferRedo=()=>{
socket.emit('redo')
canvas.current.redo()
    }
    return (
      <div>
        <ReactSketchCanvas
          ref={canvas}
          strokeWidth={3}
          strokeColor="black"
          onChange={()=>transferStrokes()}
          />
        <button onClick={()=>transferResetCanvas()} className='clear'>clear</button>
        
        <button onClick={()=>transferUndo()} className='undo'>undo</button>

        <button onClick={()=>transferRedo()} className='redo'>redo</button>
        </div> 
  )
  
}
