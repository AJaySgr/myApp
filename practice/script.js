// IIFE immdietely invoked function expression
(function(){
    console.log("Hoolla form IIFE immdietely invoked function expression");
})();

display=(str)=>{
    return ("Data :"+str);
}

mul=(a,b)=>{
    return a*b;
}

module.exports={display,mul};