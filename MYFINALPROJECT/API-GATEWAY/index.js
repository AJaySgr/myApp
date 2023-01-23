const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs=require('fs');
const morgan=require('morgan');
const path=require('path');
const dotenv=require('dotenv').config();
const debitCard = require('../DEBIT/src/models/debitCard');



const app = express();
const port = process.env.PORT; 

const {
    ADMIN_API_URL,
    USER_API_URL,
    DEBIT_API_URL,
    CREDIT_API_URL,
} = require('./urls');

const optionsAdmin = {
  target: ADMIN_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsUser = {
  target: USER_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsDebit = {
    target: DEBIT_API_URL,
    changeOrigin: true, 
    logger: console,
  };
  
  
const optionsCredit = {
  target: CREDIT_API_URL,
  changeOrigin: true, 
  logger: console,
};

const AdminProxy = createProxyMiddleware(optionsAdmin);
const UserProxy = createProxyMiddleware(optionsUser);
const DebitProxy = createProxyMiddleware(optionsDebit);
const CreditProxy = createProxyMiddleware(optionsCredit);

var LogStream=fs.createWriteStream(path.join(__dirname,'cardLog.log'),{ flags: 'a' })
app.use(morgan('combined',{stream:LogStream}))

app.get('/', (req, res) => res.send('Hello Gateway Credit and debit API'));
//Admin
app.post('/admin/signup',AdminProxy);
app.post('/admin/signin',AdminProxy);

//User
app.post('/users/signup',UserProxy);
app.post('/users/signin',UserProxy);


//---------DEBIT--------

//for User
app.post('/users/Form',DebitProxy);
app.get('/users/FormStatus/:phoneNumber',DebitProxy);
app.get('/users/debitcard',DebitProxy)

//for Admin

app.get('/admin/GetDebitData',DebitProxy);
app.post('/admin/send',DebitProxy);
app.post('/admin/addcard',DebitProxy);
app.get('/admin/Cards',DebitProxy);
app.delete('/admin/delete/:cardNumber',DebitProxy);


//-------CREDIT----------

//for User
app.post('/users/Form',CreditProxy);
app.get('/users/FormStatus/:phoneNumber',CreditProxy);
app.get('/users/Creditcard/:userId',CreditProxy);
app.get('/users/Creditcard/repayment/:userId',CreditProxy);

//for Admin

app.get('/admin/GetCreditData',CreditProxy);
app.post('/admin/send/:userId',CreditProxy);
app.post('/admin/addcard',CreditProxy);
app.get('/admin/allcards',CreditProxy);
app.delete('/admin/delete/:cardNumber',CreditProxy);

app.listen(port, () => console.log(`Example app listening on port ${port}`));