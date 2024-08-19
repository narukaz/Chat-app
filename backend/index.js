const express = require('express');
require('dotenv').config();
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors');



const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const io = new Server(server, 
    {cors:{
        origin: "http://localhost:5173",
        methods:["GET", "POST"]
    }});





//scoket io code
io.on("connection", (socket)=>{
    

     socket.on("connectTo", (data)=>{
        socket.join(data);
        console.log(data)
     });
     socket.on("send_message", (data)=>{
        socket.to(data.id).emit("received_message", data);
        console.log(data.message)
     })
     
    
     

     
})

//enviromental variables


const PORT = process.env.PORT ||3000;
server.listen(PORT,()=>{console.log("server is up")})

app.post('/',(req,res)=>{
    const data = req?.body;
    console.log(typeof data);
    if ((Object.keys(data).length === 0)) {
        return res.json({ error: "User data is missing or invalid" });
    }
    if (!data.user) {
        return res.json({ error: "Please input username" });
    }
    if (!data.password) {
        return res.json({ error: "Please input password" });
    }
    // If all checks pass
    return res.send("Success");
});

app.post('/sign-up',(req,res)=>{  
    if (Object.keys((req.body)).length===0) {
        return res.json({ error: "User data is missing or invalid" });
    }
    console.log(req.body)
    const {user,email,password} = req?.body;

    if (!user) {
        return res.json({ error: "Please input username" });
    }
    if (!email) {
        return res.json({ error: "Please input email" });
    }
    if (!password) {
        return res.json({ error: "Please input password" });
    }
    // db logic
    return res.send("Success");
});

