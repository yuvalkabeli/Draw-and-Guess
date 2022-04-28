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
          strokeColor="none"
          onChange={async () => {
              //recieve stroke from original canvas
            canvas.current.loadPaths()
            }
        }
        />
        <input></input>
        </div> 
  )
}
