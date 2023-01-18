const userModel=require('../models/User');
const bcrypt=require('bcrypt');
const {signupBodyValidation,loginBodyValidation}=require('../utills/validationSchema');
const genrateToken = require('../utills/genrateToken');
const { encryptAlgo, decryptAlgo } = require('../utills/aes256Algo');


const SALT=process.env.SALT;
const signUpUser=async(req,res)=>{
    try {
        const { error } = signupBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

         const User= await userModel.findOne({email:req.body.email});
         if(User)
            return res
                .status(400)
				.json({ error: true, message: "User with given email already exist" });       

        const hasPassword = await encryptAlgo(req.body.password);
        //const hasPassword = await bcrypt.hash(req.body.password,salt);

        await new userModel({...req.body,password:hasPassword}).save()
        res
			.status(201)
			.json({ error: false, message: "Account created sucessfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true,Message:"Internal server error!!"});
        
    }
    
}
const logInUser=async(req,res)=>{

        try {
            const {error}=loginBodyValidation(req.body);
            if(error)
                return res
                    .status(400)
                    .json({ error: true, message: error.details[0].message });

            const user=await userModel.findOne({email:req.body.email});
            if(!user)
                return res  
                        .status(401)
                        .json({error:true,message:"inavalid email or password"});

            const verifiedPassword=await decryptAlgo(user.password);            
            if(verifiedPassword!=req.body.password){
                return res
                        .status(401)
                        .json({error:true,message:"invalid email or password"});
            }else{
            let {accessToken, refreshToken}=await genrateToken(user);
               res
                .status(200)
                .json({
                error: false,
                accessToken,
                refreshToken,
                message: "Logged in sucessfully"
            });}
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true,Message:"Internal server error!!"});
            
        }
}


const profileDetails=async(req,res)=>{
    try {
     
        const user=await userModel.findById(req._id);
        if(user)
            return res  
                    .status(200)
                    .json({error:false,Profile:user});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true,Message:"Internal server error!!"});
        
    }
}

module.exports={signUpUser,logInUser,profileDetails};
