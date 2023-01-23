const express=require('express');
const { sendApprovalOrReject,getFormCardDetails, assigndebitCard,getAllCard, deleteCard } = require('../controllers/adminController');
const adminauth=require('../middleware/adminauth')
const admintRouter=express.Router();


admintRouter.get('/GetDebitData',adminauth,getFormCardDetails)
admintRouter.post('/send',adminauth,sendApprovalOrReject)//will send mail[first class or second class]
admintRouter.post('/addcard',adminauth,assigndebitCard);//assigned to user
admintRouter.get('/Cards',adminauth,getAllCard);//All Cards
admintRouter.delete('/delete/:cardNumber',adminauth,deleteCard);



module.exports=admintRouter;
