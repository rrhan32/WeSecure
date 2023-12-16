const express=require ("express");
const bodyParser = require('body-parser');
const path=require("path");
const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));   //defined the directory

app.use(express.static(path.join(__dirname, 'views')));    // helps reload css files along with html
app.use(express.static(path.join(__dirname, 'css')));     // same as above
app.use(bodyParser.urlencoded({ extended: true }));   //important for reading the fields of req.body

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
    res.render('login_bs')
   })
app.post('/create_account',(req,res)=>
    {
        console.log(req.body);
        res.redirect('login');
    })
app.get('/visitor_log',(req,res)=>
   {
    res.render('log')
   })
app.get('/forgot',(req,res)=>
   {
    res.render('forgot')
   })
app.get('/upload',(req,res)=>
   {
    res.render('page1')
   })
app.get('/create_account',(req,res)=>
   {
    res.render('practice')
   })
app.listen(3000,(req,res)=>
{
    console.log("app running on 3000");
})