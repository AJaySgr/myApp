const mongoose=require('mongoose');

let repaymentData=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'creditCard',
        required:true
    },
    repaymentAmount:{
        type:Number,
        required:true,
        default:0      
    },
},{timestamps:true});

module.exports=mongoose.model("repay",repaymentData);
