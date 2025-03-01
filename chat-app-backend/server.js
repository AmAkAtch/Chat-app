const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const {Server} = require("socket.io")
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:"*"}});

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongo_URI,{
    useNewUrlParser :true,
    useUnifiedTopology: true
})
.then(()=>{console.log("MongoDB connection successful")})
.catch((err)=>{console.log(`Database connection Error:`,err)});

io.on("connection",(socket)=>{
    console.log("New User Connected", socket.id);
    socket.on("disconnect", ()=>{console.log("User disconnected", socket.id)});
})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> {console.log(`Server running on ${PORT}`)});
