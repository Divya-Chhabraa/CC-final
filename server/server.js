const express = require("express");
const mysql = require("mysql")
const cors = require("cors");

const app=express();
app.use(express.json());

app.use(cors({
    origin: 'http://192.168.242.4:3000', // Replace with your IP address and port
    credentials: true // If you're using cookies for authentication
  }));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup"
})

app.post("/signup", (req, res)=>{
    const sql="INSERT INTO login(`name`, `email`, `password`) VALUES(?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post("/login", (req, res)=>{
    const sql="SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    
    db.query(sql, [req.body.email,req.body.password], (err, data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("success");
        }else{
            return res.json("fail");
        }
    })
})

app.listen(8081, ()=>{
    console.log("listening");
})