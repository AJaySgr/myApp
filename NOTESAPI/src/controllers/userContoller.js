const userModel=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const SECRET_KEY=process.env.SECRET_KEY
const signup= async(req,res)=>{

    //Exsting userCheck
    //Hashed password
    //user creation
    //tocken generate

    const {username,email,password}=req.body;
    try{

        const exstingUser=await userModel.findOne({email:email});
        if(exstingUser){
            return res.status(400).json({message:"User already exists!!"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const result=await userModel.create({
            email:email,
            password:hashedPassword,
            username:username

        });

        const token=jwt.sign({email:result.email,id:result._id},SECRET_KEY);
        return res.status(200).json({user:result,token:token});

    }catch(error){
        console.log(error);
        return res.status(500).send({message:'Something went rong!!'});
    }
}

const signin=async(req,res)=>{
    const {email,password}=req.body;

    try{

        const exstingUser=await userModel.findOne({email:email});
        if(!exstingUser){
           return res.status(404).json({message:"user not found"});

        }

        const matchPassword=await bcrypt.compare(password,exstingUser.password);
        if(!matchPassword){
           return res.status(404).json({message:"Invalid credentails"});
        }

        const token=jwt.sign({email:exstingUser.emaail,id:exstingUser._id},SECRET_KEY);
       return res.status(404).json({User:exstingUser,token:token});

    }catch(error){
        console.log(error);
       return res.status(500).send({message:'Something went rong!!'});
    }
    
    
}


module.exports={signup,signin};