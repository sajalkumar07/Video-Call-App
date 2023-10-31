const {Server} = require("socket.io");
const io = new Server(8000,
    {cors: true
})

io.on('connection', socket => {
    console.log(`socket connected `, socket.id)
    socket.on('room:join', data => {
        console.log(data)
    })
});