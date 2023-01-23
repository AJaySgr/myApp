const express=require('express');
const { createCreditDetails, getCreditDetails, getCreditCard, getRepaymentData } = require('../controllers/CreditController');
const auth = require('../middleware/auth');

const userRoutes=express.Router();


userRoutes.post('/Form',auth,createCreditDetails);// will send the notification to admin by email[userId]
userRoutes.get('/FormStatus/:phoneNumber',auth,getCreditDetails) //check for approval if admin approved or not
userRoutes.get('/Creditcard/:userId',auth,getCreditCard)//check the card that assigned by admin
userRoutes.get('/Creditcard/repayment/:userId',auth,getRepaymentData)//get the repayment amount

module.exports=userRoutes;