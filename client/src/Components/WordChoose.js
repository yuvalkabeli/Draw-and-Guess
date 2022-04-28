import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function WordChoose({socket}) {
  const nav = useNavigate()
  const sendWord = (e)=>{
    const wordData = {points:e.target.value,word:e.target.innerText}
    console.log('should go to drawing')
    socket.emit('start draw')
    nav('/drawing',{state:wordData})
  }
  return (
    <div>choose a word
        <button value={1} className='word' onClick={(e)=>sendWord(e)}>word 1</button>
        <button value={3} className='word' onClick={(e)=>sendWord(e)}>word 2</button>
        <button value={5} className='word' onClick={(e)=>sendWord(e)}>word 3</button>
    </div>
  )
}
