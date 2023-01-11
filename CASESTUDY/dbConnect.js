const mongoose=require('mongoose');
const url_need="mongodb://127.0.0.1/USERSYS";
const dbConnect=()=>{
    const connectionParms={useNewUrlParser:true};
    mongoose.set('strictQuery', false);
    mongoose.connect(url_need,connectionParms);
   

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