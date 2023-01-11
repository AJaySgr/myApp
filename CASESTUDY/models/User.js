const mongoose=require('mongoose');
const schema=mongoose.Schema;
const userSchema= new schema({
    userName:{
        type:String,
        required:true,
    },
    email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
    
})    
   
const User=mongoose.model('User',userSchema);

module.exports=User;