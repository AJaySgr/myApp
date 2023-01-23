const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRouter = require('./routes/AdminRoutes');
const dbConnect=require('./dbConnect');

dbConnect();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log("HTTP Method - "+req.method+", URL - "+req.url);
    next();
})
app.use('/users',userRoutes);
app.use('/admin',adminRouter);

app.get('/',(req,res)=>{
    res.send('DEBIT Card Services');
})


let PORT=process.env.PORT||5002
app.listen(PORT,()=>{
    console.log('Server is running at port',PORT);
})