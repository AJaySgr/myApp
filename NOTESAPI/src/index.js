const express=require('express');
const app=express();
const friends=require('./quotes.json');
const notesRoutes = require('./rouets/notesRoutes');
const userRoutes = require('./rouets/userRoutes');
const dotenv=require('dotenv');
const mongoose=require('mongoose')
const cors=require('cors');
mongoose.connect(process.env.MONGOOSE_URL).then((data)=>{
console.log("database is connected!!");
}).catch((err)=>{
    console.log(err);
})

dotenv.config();
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    console.log("HTTP Method - "+req.method+", URL - "+req.url);
    next();
})
app.use('/users',userRoutes);
app.use('/notes',notesRoutes)
app.get('/',(req,res)=>{
    res.send('Hello');
})

app.get('/get',(req,res)=>{
    let index=Math.floor(Math.random()*friends.length);
    let data=friends[index];
    res.json(data);
})

let port=process.env.PORT||5000
app.listen(port,()=>{
    console.log('Server is running at port',port);
})