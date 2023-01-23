const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv=require('dotenv').config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const SECRET_KEY = process.env.SECRET_KEY;

 

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testapi462@gmail.com',
    pass: 'npprihzhvijriiig'
  }
});



const signup = async (req, res) =>{

    const {username, email, password} = req.body;
    try {

        const existingUser = await userModel.findOne({ email : email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        
      return res.status(201).json({user: result});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}
const signin = async (req, res)=>{
    
    const {email, password} = req.body;

    try {
        
        const existingUser = await userModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){

          var wrongPassAlert = {
            from: 'testapi462@gmail.com',
            to: existingUser.email,
            subject: 'Wrong Password Alert!!!',
            text: 'someone try to access your account!'
          };

          transporter.sendMail(wrongPassAlert, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
              
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, SECRET_KEY);

        var AccoundLoggedIn = {
          from: 'testapi462@gmail.com',
          to: existingUser.email,
          subject: 'LoggedIn Successfully',
          text: 'you have logged in successfully if not you then immediately call on this number 102'
        };
        
        
        transporter.sendMail(AccoundLoggedIn, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
       return res.status(200).json({user: existingUser, token: token});


    } catch (error) {
        console.log(error);
      return  res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = { signup, signin };