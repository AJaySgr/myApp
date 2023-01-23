const { default: mongoose } = require("mongoose");

let FormDebitCardSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber: {
		type: String,
		required: true,
		unique: true,
	},
    accountNumber: {
		type: String,
		required: true,
		unique: true,
	},
    accountType:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['request', 'reject','approved'],
        default: 'request' 
    },
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },{timestamps:true});

    module.exports=mongoose.model("FormDebitCard",FormDebitCardSchema);