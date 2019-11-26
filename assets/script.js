let start = document.getElementById("start");
let quiz = document.getElementById("quiz");
let question = document.getElementById("question");
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");
let counter = document.getElementById("counter");
let timeGauge = document.getElementById("timeGauge");
let progress = document.getElementById("progress");
let scoreDiv = document.getElementById("scoreContainer");


// Variables 

let lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let questionTime = 20; //10s
let gaugeWidth = 150; // 150px;
let gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//Render Question

function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

//StartQuiz

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); //1000ms is 1 second
}

//Render Progres

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

//Count Render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        //progress color
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            //end quiz
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//Check Answer

function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        //answer is correct
        score++;
        answerIsCorrecrt();
    }else{
        count = count + 5;
        //answer is wrong
        answerIsWrong();
    }
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        //end quiz
        clearInterval(TIMER);
        scoreRender();
    }
}

//progress bar green
function answerIsCorrecrt(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//prgress bar red
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score Render
function scoreRender(){
   
    

    //calculate %
    let scorePerCent = Math.round(100 * score/questions.length);

    //scoreDiv.innerHTML = "";
let text = ["Pretty Smooth" , "Eh You Can Do Better" , "Do you listen to GOOD Music" , "Keep Your Head Up"]
let textContent;

//Form for Initials 
let here = document.getElementById("formIt");

console.log(scorePerCent)
    if (scorePerCent >= 80) {
        textContent = text[0];
    } else if (scorePerCent >= 60 && scorePerCent < 80) {
        textContent = text[1];
    } else if (scorePerCent >= 40 && scorePerCent < 60) {
        textContent = text[2];
     } else {
        textContent = text[3];
    }

        //scoreDiv.innerHTML = text.textContent + ">";
        scoreDiv.innerHTML += "<p>" + textContent + " " + here + " " + scorePerCent + "%</p>";
        scoreDiv.style.display = "block";
        //let name = "score"
        //scoreDiv.innerHTML = textContent
        //return text + scoreDiv.innerHTML; 
         //return text.textContent;
         console.log(text);

         //Local Storage
         localStorage.getItem("Score" , scorePerCent);
         localStorage.getItem("Initials" , here , sub);
         localStorage.setItem("Logged" , here , sub);
         localStorage.setItem("High Score" , scorePerCent);

}

//LOCAL STORAGE

//let message = (scorePerCent >= 80) ? "Pretty Smooth" :
//(scorePerCent >= 60) ? "Eh You Can Do Better" :
//(scorePerCent >= 40) ? "Do you listen to GOOD Music?" :
//(scorePerCent >= 20) ? "Keep Your Head Up Bro!" :