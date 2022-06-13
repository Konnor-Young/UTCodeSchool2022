var allTiles = document.querySelectorAll(".tile");
console.log("tiles :", allTiles);

var heading = document.querySelector("#turnBoard");
var game = document.querySelector("#playing");
var scoreScreen = document.querySelector("#gameOver");
var restart = document.querySelector("#restart")

var turns = "X";
var turnCount = 1;
function switchTurn (){
    if (turns == "X"){
        turns = "O";
    }else{
        turns = "X";
    }
}

function ifTaken (elm){
    if(elm.classList.contains("X")){
        return true;
    }else if(elm.classList.contains("O")){
        return true;
    }
}

function checkWinner (player){
    var playerWin = false;
    var sets = ["row1", "row2", "row3", "col1", "col2", "col3", "diag1", "diag2"]
    sets.forEach(function (set) {
        var selector = "."+set+"."+player;
        var tiles = document.querySelectorAll(selector);
        if(tiles.length == 3){
            playerWin = true;
        }
    });
    return playerWin;
}

function gameWin(player){
    game.style.display = "none"
    scoreScreen.innerHTML = player+" Wins!";
    scoreScreen.classList.add(player);
    scoreScreen.style.display = "block";
    restart.style.display = "block";
}

heading.innerHTML = turns+"'s Turn";

allTiles.forEach( function (tile) {
    tile.onclick = function () {
        if(ifTaken(tile)){
            heading.innerHTML = "Tile is already taken"
        }else{
            tile.innerHTML = turns;
            tile.classList.add(turns);
            if(checkWinner(turns)){
                gameWin(turns)
            }else{
                if(turnCount == 9){
                    heading.innerHTML = "It's a Draw"
                    restart.style.display = "block"
                }else{
                    switchTurn()
                    heading.innerHTML = turns+"'s Turn";
                    turnCount = turnCount + 1;
                }
            }
        }
    };
});

restart.onclick = function () {
    turns = "X";
    turnCount = 1;
    game.style.display = "block"
    scoreScreen.innerHTML = "";
    scoreScreen.classList.remove("X");
    scoreScreen.classList.remove("O");
    scoreScreen.style.display = "none";
    restart.style.display = "none";
    heading.innerHTML = turns+"'s Turn";
    allTiles.forEach( function (tile) {
        tile.innerHTML = "";
        tile.classList.remove("X");
        tile.classList.remove("O");
    });
};