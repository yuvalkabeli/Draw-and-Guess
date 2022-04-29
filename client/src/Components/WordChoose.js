import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import findWordByLength from '../Controller/helpers'


export default function WordChoose({ socket }) {
  const [easyWord, seteasyWord] = useState('')
  const [mediumWord, setMediumWord] = useState('')
  const [hardWord, setHardWord] = useState('')
  const nav = useNavigate()


  useEffect(() => {
    seteasyWord(findWordByLength(3, 4))
    setMediumWord(findWordByLength(5))
    setHardWord(findWordByLength(6, 9))
  }, [])

  useEffect(() => {
    socket.on('end game', ({ score, users }) => {
      alert(`score: ${score} user1:${users[0].username}   user:${users[1].username}`)
      nav('/waiting')
    })
  }, [socket])
  const sendWord = (e) => {
    const wordData = { points: e.target.value, word: e.target.innerText }
    socket.emit('start draw', wordData)
    nav('/drawing')
  }
  return (
    <div>choose a word
      <button value={1} className='word' onClick={(e) => sendWord(e)}>{easyWord}</button>
      <button value={3} className='word' onClick={(e) => sendWord(e)}>{mediumWord}</button>
      <button value={5} className='word' onClick={(e) => sendWord(e)}>{hardWord}</button>
    </div>
  )
}
