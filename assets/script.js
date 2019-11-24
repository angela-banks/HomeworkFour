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
let questionTime = 15; //10s
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
        count = 0;
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
        //answer is wrong
        answerIsWrong();
    }
    count = 0;
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
    document.getElementById(runningQuestion).style.backgroundcolor = "#f00";
}

//score Render
function scoreRender(){
    scoreDiv.style.display = "block";

    //calculate %
    let scorePerCent = Math.round(100 * score/questions.length);

    //scoreDiv.innerHTML = "";
}
