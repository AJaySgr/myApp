const { compareSync } = require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const USECRET_KEY=process.env.USECRET_KEY

const auth=(req,res,next)=>
{
    try {
        let token=req.headers.authorization;
        if(token){
            
            let user=jwt.verify(token,USECRET_KEY);
            req.userId=user.id;
        }else{
           return res.status(401).json({message:'Unauthorized user'})
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'Unauthorized user'})
    }
}

module.exports=auth;