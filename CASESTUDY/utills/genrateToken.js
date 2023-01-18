const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const UserToken = require('../models/userTokens');

const ACCESS_TOKEN_PRIVATE_KEY=process.env.ACCESS_TOKEN_PRIVATE_KEY;
const REFRESH_TOKEN_PRIVATE_KEY=process.env.REFRESH_TOKEN_PRIVATE_KEY;


const genrateToken=async(user)=>{
    try{
    const payload={_id:user._id,email:user.email};
    const accessToken=jwt.sign(
        payload,
        ACCESS_TOKEN_PRIVATE_KEY,
        {expiresIn:'15m'}
    );
    const refreshToken=jwt.sign(payload,REFRESH_TOKEN_PRIVATE_KEY,{expiresIn:"30d"});

    const usertoken=await UserToken.findOne({userId:user._id});
    if(usertoken) await usertoken.remove();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
		return Promise.resolve({ accessToken, refreshToken });
	} catch (err) {
		return Promise.reject(err);
	}
}

module.exports=genrateToken;