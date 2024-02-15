// import Express
const express=require('express')
const res = require('express/lib/response')

// import env file
require('dotenv').config()

// import db connection

require('./database/dbconnection')

// import router

const router=require('./routes/routing')

// import cors

const cors=require('cors')

// create server using express

const server=express()

// connect with frontend

server.use(cors())

// to convert all incoming json datas to js

server.use(express.json())

server.use(router)

// server.get('/excgetpath',(req,res)=>{
//     res.send("get request response...")
// })

// server.get('/exclastpath',(req,res)=>{
//     res.send("get request response22...")
// })
// need to set a port 

const port=3006|| process.env.port

//running config 

server.listen(port,()=>{

    console.log(`______server started at port number ${port}___________`);
})
   