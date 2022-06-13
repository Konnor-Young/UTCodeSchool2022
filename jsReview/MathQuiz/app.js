function setUp() {
    var a = Math.floor(Math.random()*10);
    var b = Math.floor(Math.random()*10);
    var numX = document.querySelector("#subject");
    var numY = document.querySelector("#change");
    numX.innerHTML = a;
    numY.innerHTML = b;
    return a+b;
}

var answerCheck = document.querySelector("#check");
var goButton = document.querySelector(".submit");
console.log("button = ", goButton);

goButton.onclick = function () {
    var answer = document.querySelector("#answer");
    console.log("x =", answer.value);
    if (answer.value == correctAnswer) {
        answerCheck.innerHTML = "Correct";
        answerCheck.style.color = "#00CC00";
        answer.value = "";
        correctAnswer = setUp()
    }
    else {
        answerCheck.innerHTML = "Incorrect";
        answerCheck.style.color = "#CC0000";
        answer.value = "";
    }
};

var correctAnswer = setUp()