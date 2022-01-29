
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}))

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "samsquare",
    database : "user_registration"
})

db.connect(()=>{
    console.log("connected to db");
})

app.post('/signin', (req,res)=>{
    // console.log("user registration route");
    const userName  = req.body.userName;
    const password = req.body.password;
    const signin_query = "SELECT * FROM loginDetails where userName = ? and password = ?";
    db.query(signin_query, [userName, password], (err,result)=>{
        if(err) res.send("err : err");
        if(result.length >0) res.send(result);
        else res.send({message : "wrong login credentials / user dosen't exist "});

    });
})

app.post('/register', (req,res)=>{
    // console.log("user registration route");
    const userName  = req.body.regUserName;
    const password = req.body.regPassword;
    const reg_query = "INSERT INTO loginDetails (userName, password) values (?,?)";
    db.query(reg_query, [userName, password], (err,result)=>{
        if(result) res.send(result);
        else res.send({message : "Registration failed"});
    });
})

//routes :
app.get('/',(req,res)=>{
    res.send("Hello users");
})



app.listen(5000, ()=>{
    console.log("server started on port 5000");
})