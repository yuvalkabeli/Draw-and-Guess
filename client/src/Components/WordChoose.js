import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findWordByLength } from '../Controller/helpers'
import '../Styles/wordChoose.scss'

export default function WordChoose({ socket }) {
  const [easyWord, setEasyWord] = useState('')
  const [mediumWord, setMediumWord] = useState('')
  const [hardWord, setHardWord] = useState('')
  const nav = useNavigate()


  useEffect(() => {
    setEasyWord(findWordByLength(3, 4))
    setMediumWord(findWordByLength(5))
    setHardWord(findWordByLength(6, 9))
  }, [])

  useEffect(() => {
    socket.on('end game', () => {
      nav('/waiting')
    })
  }, [socket])
  const sendWord = (e) => {
    const wordData = e.target.getAttribute('datawordinfo')
    socket.emit('start draw', wordData)
    nav('/drawing', { state: wordData })
  }
  return (
    <div className="words-wrapper">
      <h1 className='words-headline'>Choose A Word</h1>
      <div className="words-container">
        <div datawordinfo={JSON.stringify({ word: easyWord, points: 1 })} onClick={(e) => sendWord(e)} className="words-card easy">
          {easyWord}
          <br />
          <br />
          Points - 1
        </div>
        <div datawordinfo={JSON.stringify({ word: mediumWord, points: 3 })} onClick={(e) => sendWord(e)} className="words-card medium">
          {mediumWord}
          <br />
          <br />
          Points - 3
        </div>
        <div datawordinfo={JSON.stringify({ word: hardWord, points: 5 })} onClick={(e) => sendWord(e)} className="words-card hard">
          {hardWord}
          <br />
          <br />
          Points - 5
        </div>
      </div>
    </div>
  )
}
