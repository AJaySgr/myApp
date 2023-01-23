const mongoose=require('mongoose');

let debitSchema=mongoose.Schema({
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
    accountNumber:{
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
        ref:'FormDebitCard',
        required:true
    },
},{timestamps:true})

module.exports=mongoose.model('debitCard',debitSchema,'debitCard');