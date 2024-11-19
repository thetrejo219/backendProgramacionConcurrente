import express from "express"
import morgan from "morgan"
import { Server as SocketServer } from "socket.io"
import http from 'http'
import cors from 'cors'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import router from "./routes/message.js"

var connection = "mongodb+srv://diegotrejo8024:CtzajPpPA5657tee@secundariaesima.fncfr.mongodb.net/"
mongoose.Promise = global.Promise

const app = express()
const PORT = process.env.PORT || 7650
 
const server = http.createServer(app)

const io = new SocketServer(server,{
    cors:{
        origin:'*'
    }
})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api',router)

io.on('connection',(socket)=>{
    console.log(socket.id)
    console.log("Cliente conectado")
    socket.on('message',(message,nickname)=>{
        socket.broadcast.emit('message',{
            body:message,
            from:nickname
        })
    })
})


mongoose.connect(connection,{useNewUrlParser:true}).then(()=>{
    console.log("Conexion extosa a la base de datos")
    server.listen(PORT,()=>{
        console.log('Servidor ejeutandose en http://localhost:',PORT)
    })
})