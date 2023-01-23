const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const ASECRET_KEY=process.env.ASECRET_KEY

const adminauth=(req,res,next)=>
{
        try {
            let token=req.headers.authorization;
            
            if(token){
                
                let user=jwt.verify(token,ASECRET_KEY);
            }else{
               return res.status(401).json({message:'Unauthorized user'})
            }
            next();
            
        } catch (error) {
            console.log(error);
            res.status(401).json({message:'Unauthorized user'})
        }
    }
        module.exports = adminauth;