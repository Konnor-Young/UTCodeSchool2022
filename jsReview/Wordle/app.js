var ATTEMPTS = 6;
var LENGTH = 5;

var guesses = [];
var currentGuess = [];
var word = "";
var guess = "";
var playerWin = false;
var tryCount = 0;
var game = true;
var answers = [];
var winningWord = "";
var gamesPlayed = 0;
var winLoss = 0;
var turnsTaken = [];

var boardDiv = document.querySelector("#board");
var replayDiv = document.querySelector("#replay");
var errorDiv = document.querySelector("#error");
var gamesDiv = document.querySelector("#games");
var percentDiv = document.querySelector("#winLoss");
var turnsDiv = document.querySelector("#turns");
var navDiv = document.querySelector(".navContainer");

function fetchWords () {
    fetch("https://api.jsonbin.io/b/629f9937402a5b38021f6b38").then(function (response) {
        response.json().then(function (data) {
            answers = data.answers;
            getNewRandomWord();
        });
    });
}
function getWoTM(){
    var dateString = moment().format('YYYYMMDDHHmm');
    var dateNumber = parseInt(dateString, 10);
    winningWord = answers[dateNumber % answers.length];
    console.log(dateString, dateNumber);
    saveState();
}
function getNewRandomWord () {
    if (winningWord) {
        console.log(winningWord);
    }else{
        var index = Math.floor(Math.random() * answers.length);
        winningWord = answers[index];
        console.log(winningWord);
        saveState();
    }
}
function checkWord (word, WoTD){
    var letterList = ["","","","",""]
    for(var k = 0; k<word.length; k+=1){
        if(word[k] == WoTD[k]){
            letterList[k] = 'correct';
            WoTD = WoTD.replace(word[k], " ");
        }
    }
    for(var l = 0; l<word.length; l+=1){
        if(WoTD.includes(word[l])){
            if (letterList[l] == ''){
            letterList[l] = 'contains'
            WoTD = WoTD.replace(word[l], " ");
            }
        }else{
            if (letterList[l] == ''){
            letterList[l] = 'tried'
            }
        }
    }
    return letterList
}
function showBoard () {
    boardDiv.innerHTML = "";
    for (var i = 0; i < ATTEMPTS; i += 1){
        var wordDiv = document.createElement("div");
        wordDiv.classList.add("word");
        boardDiv.appendChild(wordDiv);
        var WoTD = winningWord;
        if(guesses[i]){
            word = guesses[i];
            var letterList = checkWord(word, WoTD)
        }else{
            word = "";
        }
        for(var j = 0; j < LENGTH; j += 1){
            var letterDiv = document.createElement("div");
            letterDiv.classList.add("letter");
            
            if(word){
                letterDiv.innerHTML = word[j];
                letterDiv.classList.add(letterList[j]);
            }
            if (i == guesses.length && j < guess.length){
                letterDiv.innerHTML = currentGuess[j];
            }
            wordDiv.appendChild(letterDiv);
        }
        if(word == winningWord){
            playerWin = true;
        }
    }
}
function submitGuess (){
    if(guess.length == 5){
        guesses.push(guess);
        console.log(guesses);
        tryCount += 1;
        showBoard();
    }else{
        errorDiv.innerHTML = "I can only accept 5 letter words..."
    }
    if(playerWin){
        game = false;
        loadPlayerStats();
        gamesPlayed += 1;
        winLoss += 100;
        turnsTaken.push(tryCount);
        savePlayerStats();
        errorDiv.innerHTML = "You Win!";
        replayDiv.innerHTML = "Press any number to play again.";
    }else if(tryCount == 6){
        game = false;
        loadPlayerStats();
        gamesPlayed += 1;
        winLoss += 0;
        savePlayerStats();
        errorDiv.innerHTML = "Game Over.";
        replayDiv.innerHTML = "Press any number to play again.";
    }
    if (game == false){
        navDiv.style.display = "flex";
        gamesDiv.innerHTML = "Games Played: "+gamesPlayed;
        percentDiv.innerHTML = "Win/Loss Percentage: "+Math.floor(winLoss/gamesPlayed)+"%";
        if((winLoss/gamesPlayed) >= 75){
            navDiv.style.backgroundColor = "green";
        }else if((winLoss/gamesPlayed) >= 50){
            navDiv.style.backgroundColor = "yellow";
        }
        turnsDiv.innerHTML = "It usually takes you "+getAverage(turnsTaken)+" turns."
    }
    saveState();
}
function getAverage (list){
    var total = 0;
    var count = 0;
    list.forEach(function(numb){
        total += numb;
        count += 1;
    });
    var ave = Math.floor(total/count);
    return ave;
}
function restartGame (){
    guesses = [];
    guess = "";
    word = "";
    playerWin = false;
    tryCount = 0;
    game = true;
    answers = [];
    winningWord = null;
    errorDiv.innerHTML = "";
    replayDiv.innerHTML = "";
    navDiv.style.display = "none";
    fetchWords();
    setUpGame();
    showBoard();
}
function setUpGame (){
        document.onkeydown = function (event) {
                // console.log("key", event);
                if (!event.altKey && !event.ctrlKey && !event.metaKey){
                    if(48 <= event.keyCode && event.keyCode <= 57){
                        // console.log(event.key.toLocaleLowerCase());
                        restartGame();
                    }
                    if(game){
                        if(65 <= event.keyCode && event.keyCode <= 90){
                            // console.log(event.key.toLowerCase());
                            guess += event.key;
                            currentGuess += event.key;
                            console.log(guess);
                    }else if(event.keyCode == 8){
                        guess = guess.slice(0, -1);
                        currentGuess = currentGuess.slice(0, -1);
                        console.log(guess);
                        // console.log("backspace");
                    }else if(event.keyCode == 13){
                        // console.log("enter");
                        submitGuess();
                        guess = "";
                        currentGuess = [];
                    }
                }
            }
        showBoard();
    };
}
function saveState (){
    localStorage.setItem("winningWord", JSON.stringify(winningWord));
    localStorage.setItem("guesses", JSON.stringify(guesses));
    localStorage.setItem("playerWin", JSON.stringify(playerWin));
    localStorage.setItem("game", JSON.stringify(game));
    localStorage.setItem("tryCount", JSON.stringify(tryCount));
}
function loadState(){
    winningWord = JSON.parse(localStorage.getItem("winningWord"));
    guesses = JSON.parse(localStorage.getItem("guesses"));
    playerWin = JSON.parse(localStorage.getItem("playerWin"));
    game = JSON.parse(localStorage.getItem("game"));
    tryCount = JSON.parse(localStorage.getItem("tryCount"));
    if (!guesses){
        guesses = [];
    }
    if (!game){
        game = true;
    }
}
function savePlayerStats(){
    localStorage.setItem("gamesPlayed", JSON.stringify(gamesPlayed));
    localStorage.setItem("turnsTaken", JSON.stringify(turnsTaken));
    localStorage.setItem("winLoss", JSON.stringify(winLoss));
}
function loadPlayerStats(){
    gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));
    turnsTaken = JSON.parse(localStorage.getItem("turnsTaken"));
    winLoss = JSON.parse(localStorage.getItem("winLoss"));
    if (!turnsTaken){
        turnsTaken = [];
    }
}

loadState();
fetchWords();
setUpGame();
showBoard();