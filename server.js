const express=require ("express");
const bodyParser = require('body-parser');
const path=require("path");
const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));   //defined the directory


app.use(bodyParser.json());
app.get('/',(req,res)=>
   {
    res.render('index')
   })
app.get('/explore',(req,res)=>
   {
    res.render('explore')
   })
app.get('/livestream',(req,res)=>
   {
    res.render('livestream')
   })
app.get('/login',(req,res)=>
   {
    res.render('login')
   })
app.listen(3000,(req,res)=>
{
    console.log("app running on 3000");
})