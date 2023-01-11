const joi=require('joi');
const passwordComplexity=require('joi-password-complexity');


const signupBodyValidation = (body)=>{
    const schema=joi.object({
        userName:joi.string().required().label('User Name'),
        email:joi.string().email().required().label('Email'),
        password:passwordComplexity().required().label('Password'),
        
    });
    return schema.validate(body);
}

const loginBodyValidation=(body)=>{
    const schema=joi.object({
        email:joi.string().email().required().label('Email'),
        password:joi.string().required().label('Password'),
    })

    return schema.validate(body);
}
const refreshTokenBodyValidation=(body)=>{
	const schema = joi.object({
		refreshtoken: joi.string().required().label("Refresh Token"),
	})
	return schema.validate(body);
};

module.exports={refreshTokenBodyValidation,signupBodyValidation,loginBodyValidation};

