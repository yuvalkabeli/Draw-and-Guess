import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../Styles/waiting.scss'
export default function Waiting({ socket }) {
  const { state: users } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    socket.on('start game', () => {
      nav('/word-choose')

    })
    socket.on('start guess', () => {
      nav('/guessing')
    })
    socket.on('end game', ({ score, users }) => {
      alert(`score: ${score} user1:${users[0].username}   user:${users[1].username}`)
      nav('/waiting')
    })
  }, [socket])
  useEffect(() => {
    // for alerts: 
    // 1.player is waiting to start a game 
    // 2.player is waiting for the other to pick a word 
  }, [users])
  return (
    <div className="loader">
      <h2 className="loader-header">Waiting for another player...</h2>
      <div className="loader-center">
        <div className="loader-pencil">
          <div className="loader-top"></div>
        </div>
        <div className="loader-stroke"></div>
      </div>
    </div>

  )
}
