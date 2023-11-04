import React, {useEffect, useCallback, useState} from 'react'
import ReactPlayer from 'react-player'
import peer from "../service/peer"
import { useSocket } from '../context/socketprovider';

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null)
  const [myStream, setMyStream]  = useState(null)

  const handleUserJoined = useCallback(({email, id})=>{
      console.log(`Email ${email} joined room`);
      setRemoteSocketId(id)
  },[])

  const handleUserCall = useCallback(async()=>{
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      })
      const offer = await peer.getOffer();
      socket.emit("user:call", {to: remoteSocketId, offer})
      setMyStream(stream)
  },[remoteSocketId, socket])

  const handleIncommingCall = useCallback(async({from, offer})=>{
    setRemoteSocketId(from)
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      })
      setMyStream(stream)
      console.log(`Icomming Call`, from, offer)
      const ans = await peer.createAnswer(offer)
      socket.emit('call:accepted', {to: from, ans})

  }, [])

  const handleCallAccepted = useCallback(async({from,ans})=>{
    peer.setLocalDescription(ans)
    console.log('Call Accepted')
  },[])

  useEffect(()=>{
    socket.on("user:joined", handleUserJoined);
    socket.on('incomming:call', handleIncommingCall)
    socket.on("call:accepted", handleCallAccepted)

    return ()=>{
      socket.off('user:joined', handleUserJoined)
      socket.off("incomming:call", handleIncommingCall)
      socket.off("call:accepted", handleCallAccepted)
    }
  
  },[socket, handleUserJoined,  handleIncommingCall, handleCallAccepted])

 
  return (
    <div>
        <h1>Room</h1>
        <h4>{remoteSocketId ? 'Connected' : "No on in room  "}</h4>
        {
          remoteSocketId && <button onClick={handleUserCall}>CALL</button>
        }
        {
          myStream && 
          <>
          <h1>Host</h1>
          <ReactPlayer 
          playing 
          muted  
          height="300px" 
          width="300" 
          url={myStream}
          />
          </>
        }
    </div>
  )
}

export default RoomPage