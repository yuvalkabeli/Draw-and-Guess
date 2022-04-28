import React, { useRef } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};


export default function Drawing({socket}) {
    const canvas = useRef()
    const transferStrokes = async () => {
        //sends stroke to the other canvas
        
        const stroke = await canvas.current.exportPaths("png") 
    }

    return (
      <div>
        <ReactSketchCanvas
          ref={canvas}
          strokeWidth={5}
          strokeColor="black"
          onChange={()=>transferStrokes()}
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
