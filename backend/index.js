const express = require('express');
require('dotenv').config();


const app = express();

app.use(express.json())

//enviromental variables
const PORT = process.env.PORT ||3300;




app.listen(PORT,()=>{console.log("server is up")})

app.post('/',(req,res)=>{
    const data = req?.body
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

