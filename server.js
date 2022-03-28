const express=require('express')
const app=express()
const server=require('http').createServer(app)
const port=process.env.PORT || 8000


app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

const io=require('socket.io')(server)
var users={}
io.on('connection',socket=>{
    console.log("connected...")
    socket.on('newuserjoin',(namee)=>{
        users[socket.id]=namee
        console.log(users)
        socket.broadcast.emit('userconnect',namee) 
        io.emit('user_list',users)
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit('userdisconnect',user=users[socket.id]);
        delete users[socket.id] 
        io.emit('user_list',users)
    })
    socket.on('message',(data)=>{
        socket.broadcast.emit('messagee',{user:data.user,msg:data.msg})
    })
})









server.listen(port,()=>{
    console.log(`listening on port ${port}`)
})





