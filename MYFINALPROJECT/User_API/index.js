const express = require("express");
const app = express();
const dotenv=require('dotenv').config();
const userRouter = require("./routes/userRoutes"); 
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


const mongoose = require("mongoose");

app.use(express.json());



app.use("/users", userRouter);


app.get("/", (req, res) =>{
    res.send("Users API");
});


const PORT = process.env.PORT;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const MONGOOSE_URL=process.env.MONGOOSE_URL;
mongoose.connect(MONGOOSE_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server started on port no. " + PORT);
    });
})
.catch((error)=>{
    console.log(error);
})


