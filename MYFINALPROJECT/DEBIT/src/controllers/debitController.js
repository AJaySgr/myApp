
const debit=require('../models/formDebitCard')
const card=require('../models/debitCard');
const nodemailer=require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testapi462@gmail.com',
      pass: 'npprihzhvijriiig'
    }
  });
//user will fill the form
const createdebitDetails= async(req,res)=>{
    console.log(req.userId);

    const {
        firstName,
        lastName,
        phoneNumber,
        gender,
        dob,
        address,
        accountNumber,
        accountType,    
        email,
        }=req.body;

     let newdebit=debit({
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        gender:gender,
        dob:dob,
        address:address,
        accountNumber:accountNumber,
        accountType:accountType,
        email:email,
        userId:req.userId    
    });
    try {
        await newdebit.save();
        res.status(201).send(newdebit);
        var CardRequest = {
            from: email,
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
        res.status(200).send({message:'something went wrong!!'});
    }

}
//user can get basic details by enetering the phone number
const getdebitDetails=async (req,res)=>{

    try {
        
        const Debit=await debit.find({phoneNumber:req.params.phoneNumber}); 
        if(Debit){
            res.status(200).send(Debit);
        }else{
            res.status(200).send({message:"Please check the phone number"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'something went wrong!!'});
    }

}
//user can get his/her debit card by enetering the user ID
const getdebitCard=async (req,res)=>{

    try {
        
        const Card=await card.find({userId:req.userId}); 
        return res.status(200).send(Card);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'something went wrong!!'});
    }

}




module.exports={createdebitDetails,getdebitDetails,getdebitCard};
