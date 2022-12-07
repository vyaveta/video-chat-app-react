const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
        methods: ['GET', 'POST']
    }
});

app.use(cors())
const PORT = process.env.PORT || 7000;

app.get('/' , (req,res) => {
    res.status(200).send("App succesfully running in the local host")
})


io.on('connection' , (socket) => {
    socket.emit('me' , socket.id)

    socket.on('disconnect' , () => {
        socket.broadcast.emit('Call Ended')
    })

    socket.on("callUser" , ({userToCall , signalData , from , name}) => {
        io.to(userToCall).emit('callUser' , {signal: signalData , from , name})
    })

    socket.on('answerCall' , (data) => {
        io.to(data.to).emit('callAccepted' , data.signal)
    })
})

server.listen(PORT , () => console.log(`server listening on port ${PORT}`))