import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Waiting({socket}) {
  let {state:users} = useLocation()
  const nav = useNavigate()
  useEffect(()=>{
    socket.on('start game',()=>{
      console.log(users);
          nav('/word-choose',{state:users[0]})
          users.shift();
          console.log(users)
      
    })
    socket.on('start draw',()=>{
      nav('/guessing')
    })

  },[socket])
  useEffect(()=>{
    // for alerts: 
    // 1.player is waiting to start a game 
    // 2.player is waiting for the other to pick a word 
  },[users])
  const log = ()=>{
    console.log(users)
  }
  return (
    <div>
      pls Wait
      <button onClick={()=>log()}>log</button>
      </div>
    
  )
}
