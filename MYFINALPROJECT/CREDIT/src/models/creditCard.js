const mongoose=require('mongoose');

let creditSchema=mongoose.Schema({
    cardNumber:{
        type:String,
        required:true,
    },
    cardHolderName: {
		type: String,
		required: true,
	},
	validfrom: {
		type: String,
		required: true,
	},
    expirydate:{
        type:String,
        required:true
    },
    cvv:{
        type:String,
        required:true
    },
    creditLimit:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    typeOfCard:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FormCreditCard',
        required:true
    },
},{timestamps:true})

module.exports=mongoose.model('creditCard',creditSchema,'creditCard');