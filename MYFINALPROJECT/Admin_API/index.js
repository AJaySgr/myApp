const express = require("express");
const app = express();
const adminRouter = require("./routes/adminRoutes"); 
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const mongoose = require("mongoose");
const dotenv=require('dotenv').config();

app.use(express.json());



app.use("/admin", adminRouter);


app.get("/", (req, res) =>{
    res.send("Admin API");
});


const PORT = process.env.PORT;
const MONGOOSE_URL=process.env.MONGOOSE_URL;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoose.connect(MONGOOSE_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server started on port no. " + PORT);
    });
})
.catch((error)=>{
    console.log(error);
})


