const creditCard = require("../models/creditCard");
const formCreditCard = require("../models/formCreditCard");
const nodemailer=require('nodemailer')

//For mail
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testapi462@gmail.com',
      pass: 'npprihzhvijriiig'
    }
  });




//this function will return the approval of card 
const getapproval=(dob,creditScore,monthlSalary)=>{
    let cScore=parseInt(creditScore),salary=parseInt(monthlSalary),DOB=parseInt(dob[8]+dob[9]);
    birthYear=DOB
    date=new Date();
    currentYear=date.getFullYear();
    currentYear=currentYear%100;
    let currentAge=(100-birthYear)+currentYear;
    let count=(currentAge.toString()).length;
    if((count===3)){
        currentAge=currentAge%100 
    }
    
    if(currentAge>=18 && salary>=20000 && cScore>=710){
        return [true,"Congreatulation you that you are eligible for Credit Card:) "];
    }else{
        return[false, "Regret to inform you that you are not eligible for Credit Card"];
    }
}
//this function will return valid date and expiry date
const getValidDateExpiryDate=()=>{
    date=new Date();
    currentMonth=date.getMonth()
    currentYear=date.getFullYear();
    currentMonth++;
    currentYear=currentYear%100

    return [`${currentMonth+1}/${currentYear%100}`,`${currentMonth+1}/${currentYear%100 + 4}`]
}
//This function will return the creditLimit and card Type
const getCreditLimit=(creditScore,monthlSalary)=>{
    let cScore=parseInt(creditScore),salary=parseInt(monthlSalary);

    if(((salary>=20000) && (salary<=25000))||((cScore>=720)&&(cScore<=750))){
        return [creditLimit='30000',cardType="Classic MasterCard"];
    }else if(((salary>=25000) && (salary<=35000))||((cScore>=750)&&(cScore<=780))){
        return [creditLimit='80000',cardType="Platinum MasterCard"];
    }else if(((salary>=35000) && (salary<=45000))||((cScore>=780)&&(cScore<=810))){
        return [creditLimit='100000',cardType="VISA"];
    }else if(((salary>=45000) && (salary<=70000))||((cScore>=810)&&(cScore<=830))){
        return [creditLimit='250000',cardType="Premium VISA"];
    }else if(((salary>=70000) && (salary<=100000))||((cScore>=840)&&(cScore<=850))){
        return [creditLimit='450000',cardType="Gold VISA"];
    }else if(((salary>=100000) && (salary<=1000000))||((cScore>=840)&&(cScore<=900))){
        return [creditLimit='600000',cardType="Diamond VISA"];
    }else{
        return [creditLimit='20000',cardType="MasterCard"];
    }
}
//Form of Credit Card as admin for check
const getFormCardDetails= async(req,res)=>{
    try {
        
        const data=await formCreditCard.find({}); 
        res.status(200).send(data);
    } catch (error) {
        //console.log(error);
        res.status(500).send({message:'something went wrong!!'});
    }
}
//admin will send the approval or rejection to user
const sendApprovalOrReject = async(req,res)=>{
    var aprStatus='';
    try {
        let exstingCard=await formCreditCard.findOne({userId:req.params.userId});
            console.log(req.params.userId);
        if(!exstingCard){
            return res.status(400).json({message:"Form is not exists!!"});
        }else{
            
            var apr=getapproval(exstingCard.dob,exstingCard.creditScore,exstingCard.monthlSalary);
            
            if(apr[0]==true){
                //console.log(apr[1])//send this via mail to user
                aprStatus='approved'
                var data=await formCreditCard.updateOne({status:exstingCard.status},{status:aprStatus});
                

            }else{
                  //  console.log(apr[1])//send this via mail to user
                    aprStatus='reject'
                    data=await formCreditCard.updateOne({status:exstingCard.status},{status:aprStatus});
                }
        
        if(data){
            var CardRequest = {
                from: 'ajau9560@gmail.com',
                to: exstingCard.officeEmail,
                subject: 'Status of Credit Card',
                text: `Hi, \n\n\n\nCard request has been  ${aprStatus} of customer's user Id ${req.params.userId}\n and ${apr[1]}`
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
        res.status(500).send({message:'something went wrong!!'});
    }
}

//Admin will assign the credit card if user gets approval
const assignCreditCard= async(req,res)=>{
    let assignCardNumber=Math.floor(Math.random() * 10000000000000000) + 1111111;//It will generate card Number
    let assignCvv=Math.floor(Math.random()*100)+ 111;//it will generate cvv number
    let assignDate=getValidDateExpiryDate(); //this function will return valid date and expiry date
    let assignValiDate=assignDate[0],assignExpiryDate=assignDate[1]; 
    

    
    
    //Admin will put the two details in body i.e userId and phoneNumber
    const {
    userId,   
    phoneNumber,
    }=req.body


    

    try{

        

        const exstingCard=await creditCard.findOne({userId:userId});
        if(exstingCard){
            return res.status(400).json({message:"Card already exists!!"});
        }else{
          //Get the User Credit Card Form
         var Form=await formCreditCard.findOne({userId:userId});
         if(Form){
            //here will get the credit limit and cardType
            var data=getCreditLimit(Form.creditScore,Form.monthlSalary);
            let card= await creditCard.create({
                cardNumber:assignCardNumber,
                cardHolderName:Form.firstName,
                validfrom:assignValiDate,
                expirydate:assignExpiryDate,
                cvv:assignCvv,
                creditLimit:data[0],
                phoneNumber:phoneNumber,
                typeOfCard:data[1],
                userId:userId    
        
            });
            var CardRequest = {
                from: 'ajau9560@gmail.com',
                to: Form.officeEmail,
                subject: 'New Credit Card',
                text: `Hi, \n\n\n\nCredit Card has been assigned to the customer & user Id ${userId} and check card by phone Number ${phoneNumber}`
              };
            
              transporter.sendMail(CardRequest, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
            
        return res.status(200).json({Details:card,message:"New card assigned to the user!!"});
        //will send the mail of card number with phone number
        }  
    }
        
        
       
        

    }catch(error){
        console.log(error);
        return res.status(500).send({message:'Something went rong!!'});
    }
}

const getCards=async(req,res)=>{
    try {
        
        const data=await creditCard.find({}); 
        if(!data){
            res.status(200).send({message:"There is no data!!"});
        }else{
            res.status(200).send({Cards:data});
        }
        
    } catch (error) {
        //console.log(error);
        res.status(500).send({message:'something went wrong!!'});
    }

}
const deleteCard=async(req,res)=>{
    try {
        
        const data=await creditCard.findOneAndDelete({cardNumber:req.params.cardNumber}); 
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

module.exports={sendApprovalOrReject,assignCreditCard,getFormCardDetails,getCards,deleteCard}