const jwt=require('jsonwebtoken');
const ACCESS_TOKEN_PRIVATE_KEY='UserApiTokenKey';

const auth=async(req,res,next)=>{
    const token=req.headers.authorization;
    
    if(!token)
        return res
            .status(403)
            .json({error:true,message:"Access denied: NO TOKEN PROVIDED!!!"});
    

    try {
        
        const tokenDetails=jwt.verify(token,ACCESS_TOKEN_PRIVATE_KEY);
        req.user=tokenDetails;
        req._id=tokenDetails._id;
        next();

    } catch (error) {
        //console.log(error);
		res
			.status(403)
			.json({ error: true, message: "Access Denied: Invalid token  "+error });
 
    }
};

module.exports=auth;