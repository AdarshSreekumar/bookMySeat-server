// import express,dotenv,cors
// loads .env file contents into process.env by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/routing')
require('./config/db')

const seats=require('./model/seatModel')


// create server using express
const seatbookingServer=express()
// enables cors in express server
seatbookingServer.use(cors())

// add json parser to server
seatbookingServer.use(express.json())

// use router in server
seatbookingServer.use(router)

seatbookingServer.use('/uploads', express.static('./uploads'));
// create a port where server should listen in web
const PORT=3000

// server listen in that port
seatbookingServer.listen(PORT,()=>{
    console.log("seat booking server started");
    
})

// resolve http get request to http://localhost:3000/ usong server
seatbookingServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Server Started</h1>")
})

