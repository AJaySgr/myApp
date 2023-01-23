const { default: mongoose } = require("mongoose");

let FormCreditCardSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    panNumber:{
        type:String,
        required:true
    },
    creditScore:{
        type:String,
        required:true
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
    workNumber: {
		type: String,
		required: true,
		unique: true,
	},
    officeEmail:{
        type:String,
        required:true
    },
    monthlSalary:{
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

    module.exports=mongoose.model("FormCreditCard",FormCreditCardSchema);