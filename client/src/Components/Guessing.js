import React, { useEffect, useRef } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};


export default function Drawing({socket}) {
    const canvas = useRef()
    useEffect(()=>{
      socket.on('load stroke',(stroke)=>{
        canvas.current.loadPaths(stroke)
      })
      socket.on('undo',()=>{
        console.log("undo is also here")
        canvas.current.undo()
      })
    },[socket])
  return (
      <div>
        <ReactSketchCanvas
          ref={canvas}
          strokeColor="none"   
        />
        <input type="text" />
        </div> 
  )
}
