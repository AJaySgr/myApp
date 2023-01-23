const debitCard = require('../models/debitCard')
const formdebitCard = require('../models/formDebitCard');

const nodemailer=require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testapi462@gmail.com',
      pass: 'npprihzhvijriiig'
    }
  });




//this function will return valid date and expiry date
const getValidDateExpiryDate=()=>{
    date=new Date();
    currentMonth=date.getMonth()
    currentYear=date.getFullYear();
    currentMonth++;
    currentYear=currentYear%100

    return [`${currentMonth+1}/${currentYear%100}`,`${currentMonth+1}/${currentYear%100 + 4}`]
}
//this will return the type of card
const  getTypeOFCard=(typeofAccount)=>{
    let typeofAccount1=typeofAccount.toLowerCase();
   if(typeofAccount1=='saving'){
     return ['Rupay']
   }else if(typeofAccount1=='current'){
     return ['MasterCard']
   }else if(typeofAccount1=='salary'){
         return ['Visa']
   }
 }
//Form of debit Card as admin for check
const getFormCardDetails= async(req,res)=>{
    try {
        //console.log("HEllo")
        const data=await formdebitCard.find({});
        if(data){
            return res.status(200).send(data);
        }{
            return res.status(200).send({message:"No debit card"});
        } 
        
    } catch (error) {
       
       return res.status(200).send({message:'something went wrong!!'});
    }
}

//admin will send the approval or rejection to user
const sendApprovalOrReject = async(req,res)=>{
    const {userId,status}=req.body;
    try {
        const exstingUser=await formdebitCard.findOne({userId:userId});
        if(!exstingUser){
            return res.status(400).json({message:"Form is not exists!!"});
        }else{
        const data=await formdebitCard.updateOne({status:exstingUser.status},{status:status});
        if(data){

           
            var CardRequest = {
                from: 'ajau9560@gmail.com',
                to: exstingUser.email,
                subject: 'Status',
                text: `Hi, Your card request has been ${status}. Check the status by giving the phone number ${exstingUser.phoneNumber}`
              };
            
              transporter.sendMail(CardRequest, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
                
                return res.status(400).json({message:"Please Check the mail!!!"});
        
            }
    }
        
    } catch (error) {
        console.log(error);
        res.status(200).send({message:'something went wrong!!'});
    }
}

//Admin will assign the debit card if user gets approval
const assigndebitCard= async(req,res)=>{
    let assignCardNumber=Math.floor(Math.random() * 10000000000000000) + 1111111;//It will generate card Number
    let assignCvv=Math.floor(Math.random()*100)+ 111;//it will generate cvv number
    let assignDate=getValidDateExpiryDate(); //this function will return valid date and expiry date
    let assignValiDate=assignDate[0],assignExpiryDate=assignDate[1]; 
    
    
    const {userId,phoneNumber }=req.body
    

    try{
        const exstingCard=await debitCard.findOne({userId:userId});
        if(exstingCard){
            return res.status(400).json({message:"Card already exists!!"});
        }else{
        const Form=await formdebitCard.findOne({userId:userId});
        
         if(Form){
            //here will get the credit limit and cardType
            
             var assigncardType=getTypeOFCard(Form.accountType);
    
        var debit= await debitCard.create({
            cardNumber:assignCardNumber,
            cardHolderName:Form.firstName,
            validfrom:assignValiDate,
            expirydate:assignExpiryDate,
            cvv:assignCvv,
            accountNumber:Form.accountNumber,
            phoneNumber:phoneNumber,
            typeOfCard:assigncardType.toString(),
            userId:userId} );

            debit.save();
        
        }
        var CardRequest = {
            from: 'ajau9560@gmail.com',
            to: Form.email,
            subject: 'Debit Card',
            text: `Hi, Card request has been assigned to user id ${userId}. Check the card details with using user id.`
          };
        
          transporter.sendMail(CardRequest, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

        return res.status(200).json({Details:debit,message:"New card assigned to the user!!"});
    }
    }catch(error){
        console.log(error);
        return res.status(500).send({message:'Something went rong!!'});
    }
}

const getAllCard=async (req,res)=>{

    try {
        
        const Card=await debitCard.find({}); 
        return res.status(200).send({Cards:Card});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'something went wrong!!'});
    }

}

const deleteCard=async(req,res)=>{
    try {
        
        const data=await debitCard.findOneAndDelete({cardNumber:req.params.cardNumber}); 
        if(!data){
            res.status(200).send({message:"There is no such card !!"});
        }else{
            res.status(200).send({message:"Card has been disabled from system"});
        }
        
    } catch (error) {
        //console.log(error);
        res.status(500).send({message:'something went wrong!!'});
    }


}






    

module.exports={sendApprovalOrReject,assigndebitCard,getFormCardDetails,getAllCard,deleteCard};