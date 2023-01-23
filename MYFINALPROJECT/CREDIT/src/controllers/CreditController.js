const Credit=require('../models/formCreditCard');
const card=require('../models/creditCard');
const repay=require('../models/repayment');
const nodemailer=require('nodemailer')
//For mail
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testapi462@gmail.com',
      pass: 'npprihzhvijriiig'
    }
  });


//user will fill the form
const createCreditDetails= async(req,res)=>{
    //console.log(req.userId);

    const {
        firstName,
        lastName,
        phoneNumber,
        panNumber,
        creditScore,
        gender,
        dob,
        address,
        workNumber,
        officeEmail,
        monthlSalary
        }=req.body;

     let newCredit=Credit({
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        panNumber:panNumber,
        creditScore:creditScore,
        gender:gender,
        dob:dob,
        address:address,
        workNumber:workNumber,
        officeEmail:officeEmail,
        monthlSalary:monthlSalary,
        userId:req.userId    
    });
    try {
        await newCredit.save();
        res.status(201).send(newCredit);
        var CardRequest = {
            from: officeEmail,
            to: 'ajau9560@gmail.com',
            subject: 'New Card Request',
            text: `Hi, New card request has been raised by customer's user Id ${req.userId }`
          };
        
          transporter.sendMail(CardRequest, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });


    } catch (error) {
        console.log(error);
        res.status(500).send({message:'something went wrong!!'});
    }

}
//user can get basic details by enetering the phone number
const getCreditDetails=async (req,res)=>{

    try {
        
        const form=await Credit.find({phoneNumber:req.params.phoneNumber}); 
        if(form){
            res.status(200).send(form);
        }else{
            res.status(200).send({message:'Please check the Number once again!!'});
        }
        
    } catch (error) {
        res.status(500).send({message:'something went wrong!!'});
    }

}

//user can get his/her Credit card by enetering the user ID
const getCreditCard=async (req,res)=>{

    try {
        
        const Card=await card.find({userId:req.params.userId}); 
        if(Card){
            res.status(200).send(Card);
        }else{
            res.status(200).send({message:'Please check the Number once again!!'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'something went wrong!!'});
    }

}

//Repay
const getRepaymentData=async(req,res)=>{

    try {
        //console.log(req.params.userId);
        const Card=await repay.find({userId:req.params.userId}); 
        
        if(Card){
            return res.status(200).send({message:" repayement",Card:Card});
        }else{
                return res.status(200).send({message:'There is no repayment for this card'});}
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'something went wrong!!'});
    }
}

module.exports={createCreditDetails,getCreditDetails,getCreditCard,getRepaymentData};
