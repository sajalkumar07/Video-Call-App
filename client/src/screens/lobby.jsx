import React, {useState, useCallback} from 'react'

const Lobby = () => {
    const [email, setEmail] = useState("")
    const [room, setRoom] = useState("")

    const handleSubmitForm = useCallback ((e) => {
        e.preventDefault();
        console.log({
            email,
            room,
        });
    }, [])

  return (
    <div>
        <h1>Lobby</h1>
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