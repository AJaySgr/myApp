const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const UserToken = require('../models/userTokens');
const { refreshTokenBodyValidation } = require('../utills/validationSchema');
const { verifyRefreshToken } = require('../utills/verifyRefreshToken');
const ACCESS_TOKEN_PRIVATE_KEY=process.env.ACCESS_TOKEN_PRIVATE_KEY;
const newRefreshToken=(req,res)=>{
    const {error} = refreshTokenBodyValidation(req.body);
    if(error)
    return res
        .status(400)
        .json({ error: true, message: error.details[0].message,message});

    verifyRefreshToken(req.body.refreshtoken)
    .then(({ tokenDetails }) => {
        const payload = { _id: tokenDetails._id};
        const accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "15m" }
        );
        res.status(200).json({
            error: false,
            accessToken,
            message: "Access token created successfully",
        });
    })
    .catch((err) => res.status(400).json(err));
}

const logoutUser=async(req,res)=>{
    try {
		const { error } = refreshTokenBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const userToken = await UserToken.findOne({ token: req.body.refreshtoken });
		if (!userToken)
			return res
				.status(200)
				.json({ error: false, message: "Already Logged Out Sucessfully" });

		await userToken.remove();
		res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
}


module.exports={newRefreshToken,logoutUser};

   