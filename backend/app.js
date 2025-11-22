import express from 'express'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import { ConnectDB } from './lib/db.js'
import { connect } from 'mongoose'
dotenv.config({debug: true})
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.get('/',(req,res)=>{
  
   res.status(200).send()
})
 
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log( "The server is listening at port " + PORT)
    ConnectDB()
})