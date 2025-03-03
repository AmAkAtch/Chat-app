const express = require("express");
const cors = require("cors");
const http = require("http");
const { Socket } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Socket(server, {
    cors:{origin:"*"}
});

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>console.log("DB connection successful"))
.catch(err=>console.log("DB connection failed", err));

io.on("connection", (socket)=>{
    console.log("User has joined:", socket.id);
    socket.on("disconnect", ()=>{
        console.log("User Disconnected:", socket.id);
    });
})


const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`Server starter on Port ${PORT}`);
})
