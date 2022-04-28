import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Waiting({socket}) {
  const {state:users} = useLocation()
  const waitingUsers = users
  const nav = useNavigate()
  useEffect(()=>{
    socket.on('start game',()=>{
          nav('/word-choose',{state:waitingUsers[0]})
      
    })
    socket.on('start guess',()=>{
      nav('/guessing')
    })

  },[socket])
  useEffect(()=>{
    // for alerts: 
    // 1.player is waiting to start a game 
    // 2.player is waiting for the other to pick a word 
  },[users])
  const log = ()=>{
    console.log(waitingUsers)
  }
  return (
    <div>
      pls Wait
      <button onClick={()=>log()}>log</button>
      </div>
    
  )
}
