const express=require('express');
const { newRefreshToken, logoutUser } = require('../Controller/refreshTokenController');
const {signUpUser, logInUser, profileDetails } = require('../Controller/userController');
const auth = require('../middleWare/auth');

const router=express.Router();


router.post('/signup',signUpUser);
router.post('/login',logInUser);
router.get('/profile',auth,profileDetails);
router.post('/refreshToken',newRefreshToken);
router.delete('/logout',logoutUser);



module.exports=router;