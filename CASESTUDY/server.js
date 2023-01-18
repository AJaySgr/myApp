const express=require('express');
const morgan = require('morgan');
const  dbConnect  = require('./dbConnect');
const dotenv=require('dotenv').config();
const app=express();
const userrouter=require('./Routes/Userrouter')
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
dbConnect();


app.use(morgan('tiny'));

app.use('/Start',(req,res)=>{
    res.end("WelCOME TO USER MODULE");
})

app.use('/user',userrouter);


//let PORT=process.env.PORT||3001
let PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running at port : ${PORT}`);
})