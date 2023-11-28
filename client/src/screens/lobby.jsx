import React, {useState, useCallback, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSocket} from '../context/socketprovider'


const Lobby = () => {
    const [email, setEmail] = useState("")
    const [room, setRoom] = useState("")

    const socket = useSocket()
    const navigate = useNavigate()

    const handleSubmitForm = useCallback ((e) => {
        e.preventDefault();
        socket.emit('room:join',{email, room})
    }, [email, room, socket])//dependency array

    const handleJoinRoom = useCallback ((data) => {
      const {email, room} = data
      navigate(`/room/${room}`);
    },[navigate])

    useEffect(()=>{
      socket.on('room:join', handleJoinRoom)
      return () => {
        socket.off('room: join', handleJoinRoom)
      }
    }, [socket, handleJoinRoom])
        
  

  return (
    <div>
        <h1 id='title'>Lobby</h1>
        <form onSubmit={handleSubmitForm}>
            <label htmlFor="">Email</label>
            <input type="email" id='email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <br></br>
            <label htmlFor="">Room ID</label>
            <input type="text" id='room' value={room} onChange={e=>setRoom(e.target.value)} />  
            <br></br>
            <button>join</button>  
        </form>
    </div>
    
  )
}

export default Lobby