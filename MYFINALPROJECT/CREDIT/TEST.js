let dob='13/07/2011',creditScore='720',monthlSalary='28000';

const getapproval=(dob,creditScore,monthlSalary)=>{
    let cScore=parseInt(creditScore),salary=parseInt(monthlSalary),DOB=parseInt(dob[8]+dob[9]);
    birthYear=DOB
    date=new Date();
    currentYear=date.getFullYear();
    currentYear=currentYear%100;
    let currentAge=(100-birthYear)+currentYear;
    let count=(currentAge.toString()).length;
    if((count===3)){
        currentAge=currentAge%100 
    }
    
    if(currentAge>=18 && salary>=20000 && cScore>=710){
        return [true,"Congreatulation you that you are eligible for Credit Card:) "];
    }else{
        return[false, "Regret to inform you that you are not eligible for Credit Card"];
    }
}
// console.log(getapproval(dob,creditScore,monthlSalary));
 let apr=getapproval(dob,creditScore,monthlSalary)
 if(apr[0]==true){
    console.log(apr[1]);
 }else{
    console.log(apr[1])
 }

const getCreditLimit=(creditScore,monthlSalary)=>{
    let cScore=parseInt(creditScore),salary=parseInt(monthlSalary),creditLimit,cardType;

    if(((salary>=20000) && (salary<=25000))||((cScore>=720)&&(cScore<=750))){
        return [creditLimit='30000',cardType="Classic MasterCard"];
    }else if(((salary>=25000) && (salary<=35000))||((cScore>=750)&&(cScore<=780))){
        return [creditLimit='80000',cardType="Platinum MasterCard"];
    }else if(((salary>=35000) && (salary<=45000))||((cScore>=780)&&(cScore<=810))){
        return [creditLimit='100000',cardType="VISA"];
    }else if(((salary>=45000) && (salary<=70000))||((cScore>=810)&&(cScore<=830))){
        return [creditLimit='250000',cardType="Premium VISA"];
    }else if(((salary>=70000) && (salary<=100000))||((cScore>=840)&&(cScore<=850))){
        return [creditLimit='450000',cardType="Gold VISA"];
    }else if(((salary>=100000) && (salary<=1000000))||((cScore>=840)&&(cScore<=900))){
        return [creditLimit='600000',cardType="Diamond VISA"];
    }else{
        return [creditLimit='20000',cardType="MasterCard"];
    }
}

// // let s=getCreditLimit('710','35000');
// // let creditLimit=s[0];
// // let cardType=s[1];
// // console.log("1 "+getCreditLimit('700','20000'));
// // console.log("2 "+getCreditLimit('730','15000'));
// // console.log("3 "+getCreditLimit('757','30000'));
// // console.log("4 "+getCreditLimit('790','45000'));
// // console.log("5 "+getCreditLimit('803','65000'));
// // console.log("6 "+getCreditLimit('815','55000'));
// // console.log("7 "+getCreditLimit('896','160000'));
// // //console.log(creditLimit,cardType);

// // const {
// //     cardNumber,
// //     cardHolderName,
// // 	validfrom,
// //     expirydate,
// //     cvv,
// //     accountNumber,
// //     phoneNumber,
// //     typeOfCard
// //     }=new Array();
    
let cardNumber=Math.floor(Math.random() * 10000000000000000) + 1111111
let cvv=Math.floor(Math.random()*100)+ 111
//console.log(cvv) 


const getValidDateExpiryDate=function(){
    date=new Date();
    currentMonth=date.getMonth()
    currentYear=date.getFullYear();
    currentMonth++;
    currentYear=currentYear%100

    return [`${currentMonth+1}/${currentYear%100}`,`${currentMonth+1}/${currentYear%100 + 4}`]
}

const s=getValidDateExpiryDate();


const  getTypeOFCard=(typeofAcount)=>{
    typeofAcount=typeofAcount.toLowerCase();
  if(typeofAcount=='saving'){
    return ['Rupay']
  }else if(typeofAcount=='current'){
    return ['MasterCard']
  }else if(typeofAcount=='salary'){
        return ['Visa']
  }
};

// console.log(getTypeOFCard('SAving'))