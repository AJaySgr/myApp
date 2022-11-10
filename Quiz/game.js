const question = document.getElementById("ques");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score =  0;
let questionCounter = 0;
let availableQuestions = [];


let questions =[
    {
        question : "what is the scope of let variable?",
        choice1  : "Global Scope",
        choice2  : "Local Scope",
        choice3  : "Blocked Scope",
        choice4  : "Only Scope",
        answer   : 3
    },
    {
        question : "Inside which HTML element do we put the javaScript??",
        choice1  : "script tag",
        choice2  : "javascript tag",
        choice3  : "js tag",
        choice4  : "sripting tag",
        answer   : 1
    },
    {
        question : "What is right way to represent constant variable?",
        choice1  : "constant",
        choice2  : "let",
        choice3  : "Const",
        choice4  : "const",
        answer   : 4
    },
    {
        question : "How do we write 'Hello world' in an alert box?",
        choice1  : "alert('Hello world')",
        choice2  : "msgbox('Hello world')",
        choice3  : "alertBox('Hello world')",
        choice4  : "msg('Hello world')",
        answer   : 1
    }
];


//Constants
const CORRECT_BONUS=10;
const MAX_QUESTIONS=3;

startGame =()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions]
    //console.log('Questions ',availableQuestions);
    getNewQuestion();
}

getNewQuestion = () =>{

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign('./end.html');
    }
    
    questionCounter++;
   // questionCounterText.innerText = questionCounter + "/"+ MAX_QUESTIONS;
   questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    console.log("Current Questions :",currentQuestion);
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;
};

choices.forEach(choice =>{
    choice.addEventListener("click",e =>{
        if(!acceptingAnswers)return;

        acceptingAnswers = false;
        const selectedChoice =e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        

        const classToApply
          = selectedAnswer == currentQuestion.answer? "correct" : "incorrect";
        // console.log(classToApply);

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
        

    });
});

incrementScore = num=>{
    score+=num;
    scoreText.innerText=score;
}

startGame();