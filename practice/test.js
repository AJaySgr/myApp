// console.log('Hello');
// console.log("HEllo babe");

const http = require("http");
const fs=require('fs');
const os=require("os")
// fs.writeFile('text.txt',"Hola brader how you doing!!!",(err)=>{
//     if(!err){
//         console.log("data have been written sucessfully");
//     }
// })

// fs.readFile("text.txt",(err,data)=>{
//     console.log(data.toString());
// })


console.log(os.hostname());
let server=http.createServer((req,res)=>{
    //res.end("Holla!!!!!!");
    fs.readFile('index.html',(err,data)=>{
        
        if(!err){
            res.setHeader('Content-type',"text/html");
            res.end(data);}
    })
})


server.listen('4000',(err)=>{
    if(!err){
        console.log("Server is running ar port 4000");
    }
})

const util = require('./script');
console.log(util.display("hola"));
console.log(util.mul(12,13));