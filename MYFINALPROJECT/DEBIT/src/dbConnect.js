const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const MONGOOSE_URL=process.env.MONGOOSE_URL;
const dbConnect=()=>{
    const connectionParms={useNewUrlParser:true};
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGOOSE_URL,connectionParms);
   

    mongoose.connection.on("connected",()=>{
        console.log('Connected to database successfully :)');
    })
    mongoose.connection.on("error",(err)=>{
        console.log("Error while connecting to database "+err);
    })
    mongoose.connection.on("disconnected",()=>{
        console.log("MongoDB connection disconnected");
    })
}

module.exports= dbConnect;