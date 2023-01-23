const express=require('express');
const { sendApprovalOrReject, assignCreditCard, getFormCardDetails, deleteCard, getCards } = require('../controllers/adminController');
const { getCreditDetails } = require('../controllers/CreditController');
const adminauth = require('../middleware/adminauth');
const auth = require('../middleware/auth');
const admintRouter=express.Router();


admintRouter.get('/GetCreditData',adminauth,getFormCardDetails)
admintRouter.post('/send/:userId',adminauth,sendApprovalOrReject)//will send mail
admintRouter.post('/addcard',adminauth,assignCreditCard);//admin will have the userid that user sent when user submit the form then admin put the userid and card will assign to user
admintRouter.get('/allcards',adminauth,getCards);//get all cards from database
admintRouter.delete('/delete/:cardNumber',adminauth,deleteCard);//delete card by giving card Number


module.exports=admintRouter;
