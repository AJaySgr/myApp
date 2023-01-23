const express=require('express');
const { createdebitDetails, getdebitDetails, getdebitCard} = require('../controllers/debitController');

const auth = require('../middleware/auth');

const userRoutes=express.Router();


userRoutes.post('/Form',auth,createdebitDetails);// will send the notification to admin by email[userId]
userRoutes.get('/FormStatus/:phoneNumber',auth,getdebitDetails) //check for approval if admin approved or not
userRoutes.get('/debitcard',auth,getdebitCard)//check the card that assigned by admin

module.exports=userRoutes;