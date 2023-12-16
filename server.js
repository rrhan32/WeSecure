const express=require ("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path=require("path");
const bcrypt=require("bcrypt")
const app=express();
const Users=require('./models/login')
const Swal = require('sweetalert2');   //sweetalert to display floating messages

const saltRounds=10;



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));   //defined the directory


//set up MONGODB cluster

const connectionString = 'mongodb+srv://Rohanrj:GkgZMKgI8ozWsKcE@clusterrj.yjeyk.mongodb.net/We_Secure';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



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
app.post('/create_account',async(req,res)=>
    {
     try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log('Hashed Password:', hashedPassword);
        let newuser= req.body;
        newuser.password=hashedPassword;
        delete newuser.confirmPassword;
        console.log(newuser);
        const New_User=new Users(newuser);
        await New_User.save();
        res.status(201).redirect('login');
        }
        catch(e){
            res.status(500).send(e);
        }

    })
app.post('/login',async(req,res)=>{
    try{
    const user=await Users.findOne({email:req.body.email});
    if (!user)
    {
        res.status(404).json({message:"given id does not exist"});
    }
    const isPasswordValid=await bcrypt.compare(req.body.password,user.password)
    if (isPasswordValid) {
        // Passwords match, user is authenticated
        return res.status(200).redirect('livestream');
      } else {
        // Passwords do not match
        Swal.fire({
            icon: 'error',
            title: 'Incorrect email or password',
            text: 'Please try again.',
      })
      console.log(Swal.fire);
    }
    }
     catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
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