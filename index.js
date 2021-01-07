const express = require("express");
const mysql = require('./database');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    return res.send({
        error: false, 
        message: "welcome to RESTFUL CRUD API",
        written_by: "Rattnon"
    })
})

app.get('/books', (req,res)=>{
    mysql.query("SELECT * FROM students", (err,rs)=>{
        if(err) throw err;

        let message = ""
        if(rs === undefined || rs.length == 0){
            message = "Books table is empty";
        }
        else{
            message = "Successfully";
        }
        return res.send({error: false, data:rs, message:message});
    })
})

//app a new book
app.post('/book', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    if(!username || !password){
        return res.status(400).send({error:true, message: "plz provide book"});
    }
    else{
        mysql.query("INSERT INTO students (username, password) VALUES (?, ?)",[username,password],(err,rs)=>{
            if(err) throw err
            return res.send({error: false, data:rs, message:"NEW STUDENTS"})
        })
    }
})

//retrieve book by id
app.get('/book/:id',(req,res)=>{
    let id = req.params.id;
    if(!id){
        return res.status(400).send({error:true,message:"plz provide id"});
    }
    else{
        mysql.query("SELECT * FROM students WHERE id = ?",id,(err,rs)=>{
            if(err) throw err
            let message = ""
            if(rs === undefined || rs.length == 0){
                message = "Book not found";
            }
            else{
                message = "Successfuly"
            }
            return res.send({error:false,data:rs[0],message:message});
        })
    }
})

//update
app.put('/book', (req,res)=>{
    let id = req.body.id;
    let username = req.body.username;
    let password = req.body.password;
    if(!id || !username || !password){
        return res.status(400),send({error:true,message:"Plz Enter your information"});
    }
    else{
        mysql.query("UPDATE students SET username = ?, password = ? WHERE id = ? ",[username,password,id],(err,rs)=>{
            if(err) throw err

            let message = "";
            if(rs === undefined || rs.length == 0){
                message = "You should Enter";
            }
            else{
                message = "UPDATE SUCCESSFULY";
            }
            return res.send({error:false, data:rs[0], message:message});
        })
    }
})

//delete

app.delete('/book',(req,res)=>{
    let id = req.body.id;
    if(!id){
        res.status(400).send({error:true, message:"Plz Provide"});
    }
    else{
        mysql.query("DELETE FROM students WHERE id = ?",id,(err,rs)=>{
            if(err) throw err
            
            let message = "";
            if(rs.affectedRows == 0){
                message = "Not found";
            }
            else{
                message = "Successfully Delete";
            }
            return res.send({error:false,data:rs,message:message});
        })
    }
})


app.listen(3000,()=> console.log("Server is running"))

module.exports = app