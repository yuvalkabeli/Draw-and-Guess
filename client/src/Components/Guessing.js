import React, { useRef } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};


export default function Drawing({socket}) {
    const canvas = useRef()

  return (
      <div>
        <ReactSketchCanvas
          ref={canvas}
          strokeColor="none"   
          onChange={async () => {
              //recieve from the other canvas
            const l = await canvas.current.exportPaths("png") 
            }
        }
        />
        </div> 
  )
}
