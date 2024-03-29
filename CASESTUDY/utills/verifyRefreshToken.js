const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const UserToken = require('../models/userTokens');

const REFRESH_TOKEN_PRIVATE_KEY=process.env.REFRESH_TOKEN_PRIVATE_KEY;


const verifyRefreshToken=(refreshtoken)=>{
    const privateKey=REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve,reject)=>{
        UserToken.findOne({token:refreshtoken},(err,doc)=>{
            jwt.verify(refreshtoken, privateKey, (err, tokenDetails) => {
				if (err)
					return reject({ error: true, message: "Invalid refresh token" });
				resolve({
					tokenDetails,
					error: false,
					message: "Valid refresh token",
				});
			});
		}); 
        });
}

module.exports={verifyRefreshToken};