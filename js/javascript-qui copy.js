// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");
let quizapp=document.querySelector(".quiz-app");
let arr=[];
let arr2=[];
let viewRuselt=document.getElementById("view_result");
let answers = document.getElementsByName("question");
history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};
window.onbeforeunload = function() {
  return "Are you sure you want to leave this page?";
};
// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Start CountDown
      countdown(3, qCount);
      
  
      // Click On Submit
      submitButton.onclick = () => {
        
  
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        let selectedAnswer = getSelectedAnswer();

        if (selectedAnswer === null) {
          return;
        }
      

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Handle Bullets Class
        handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(3, qCount);

        // Show Results
        showResults(qCount);
      };
    }
    function getSelectedAnswer() {
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
          return answers[i].dataset.answer;
        }
      }
      return null;
    }
  };

  myRequest.open("GET","javascript_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "on";
    }

    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
     
    

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
 
  let theChoosenAnswer;
  arr2.push(rAnswer);
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
  arr.push(theChoosenAnswer);
  
  
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  let view_result=document.getElementById("viewResult");
  let view_result1=document.getElementById("viewResult1");
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }
    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
    view_result.innerHTML="view result";
    view_result.style.display="block";
    view_result1.style.display="block";
    view_result1.innerHTML="Back";
   
  }
}

function countdown(duration, count) {
  duration=40;
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 20 ? `0${minutes}` : minutes;
      seconds = seconds < 20 ? `${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
// Get the reference to the button and the HTML div
const viewResult = document.querySelector("#viewResult");
const outputDiv = document.querySelector("#outputDiv");
const viewResult1 = document.querySelector("#viewResult1");
// Add a click event listener to the button
viewResult.addEventListener("click", function(rAnswer) {
  quizapp.style.height="auto";
  // Clear the output div before adding new content
  outputDiv.innerHTML = "";
console.log(rAnswer);
  // Loop through the array and create a div for each element
  for (let i = 0; i < arr.length; i++) {
    if(arr[i]==arr2[i]){
      const div = document.createElement("div");
      const text = document.createTextNode(arr[i]);
      div.style.padding="15px";
      div.className="";
      div.className="w3-panel w3-pale-green w3-border";
      div.appendChild(text);
      outputDiv.appendChild(div);

    }
    else{
      const div = document.createElement("div");
      const text = document.createTextNode(arr[i]);
      div.style.backgroundColor = "red"; 
      div.style.border="1px black solid";
      div.style.padding="15px";
      div.className="alert"
      div.className="w3-panel w3-pale-red w3-border";
      div.appendChild(text);
      outputDiv.appendChild(div);
    }
    console.log(arr
      );
      console.log(arr2);

  }
});
viewResult1.addEventListener("click",function () {
  window.location.assign("http://127.0.0.1:5500/user.html");
})

