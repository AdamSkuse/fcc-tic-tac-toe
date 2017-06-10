var cells = document.getElementsByClassName('cell');
var startButton = document.getElementById('start-button');
var playerXSelector = document.getElementById('player-x-selector');
var player0Selector = document.getElementById('player-0-selector');
var winMessageDiv = document.getElementById('win-message-div');
var declareWinModal = document.getElementById('declare-win-modal');
var playAgainButton = document.getElementById('play-again-btn');
var resetGameButton = document.getElementById('reset-game-btn');

var playerXToMove = true;
var movesLog = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // each value corresponds to a square. '0' is empty, 'X's are 1, '0's are 5
var totalsArray = []; // an array of the 'scores' for each row, column and diagonal. if any totals '3', that means three 'X's in a row, and thus X has won; if any total 15, then 0 has won
var winnerDeclared = true; //if true, no moves by either computer or human possible
var playerXIsHuman = true;  // default to true
var player0IsHuman = true;   // default to true
var computersTurn = false;  //default to false
var scoreboard = []; //array of previous game results so scoreboard can be redrawn;

function resetGame() {
  declareWinModal.style.display = "none";  
  playerXToMove = true;
  movesLog = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  totalsArray = [];
  scoreboard = [];
  updateScoreboard();
  clearGameBoard();
  winnerDeclared = true;
}

function clearGameBoard() {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].hasChildNodes()) {
      cells[i].removeChild(cells[i].childNodes[0]);
    }
  }
}

function playAgain() {
  console.log('play again');
  declareWinModal.style.display = "none";  
  clearGameBoard();
  movesLog = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  updateScoreboard();
  winnerDeclared = false;
}

// this lists indices in movesLog that correspond to totalsArray
var squaresLookup = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", playerMove);
}

startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', playAgain);
resetGameButton.addEventListener('click', resetGame);

function startGame() {
  if (playerXSelector.value === "computer") {
    playerXIsHuman = false;
    computersTurn = true;
  } else {
    playerXIsHuman = true;
    computersTurn = false;
  }
  if (player0Selector.value === "computer") {
    player0IsHuman = false;
  } else {
    player0IsHuman = true;
  }

  winnerDeclared = false; // this allows user to make move by clicking on the board
  if (computersTurn === true) {
    computerPlanMove();
  }
}

function playerMove(){ //run when player clicks on a square
  if (winnerDeclared === false) { //prevents player making moves on board if game over
    if (!computersTurn) { //prevents player from making moves on comp's turn
      if (this.hasChildNodes()) { //prevents player from moving in already-occupied square
          alert("This space is taken!");
      } else {
        if (playerXToMove === true) { //sets the icon to be drawn in square
             var icon = iconX();
          } else {
              var icon = iconO();
          }
          this.appendChild(icon);
          checkForWinner(this.id, playerXToMove);
          playerXToMove = !playerXToMove;
          if (winnerDeclared === false) {
            if (!playerXIsHuman || !player0IsHuman) { //if the opponent is computer, computer takes turn
              computersTurn = true;
              computerPlanMove();
            }
          }
      }
    }
  }
}

function iconX() {
    var icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-close");
    icon.style="font-size:72px;color:red";
    return icon;
}

function iconO() {
    var icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-genderless");
    icon.style="font-size:72px;color:green";
    return icon;
}

function checkForWinner(index, playerX) {
    var playerNumber = 0; // resets variable
    if (playerX === true) { // each X is codified as "1"
        playerNumber = 1;
    } else {                // each Y is codified as "5"
        playerNumber = 5;
    }
    movesLog[index] = playerNumber; // logs this...should refactor above code into a LogMove function
    refreshTotalsArray();
    if (totalsArray.includes(3)) {
      declareWin('X');
    } else if (totalsArray.includes(15)) {
      declareWin('0');
    }
    if (winnerDeclared === false) {
        checkForDraw();
    }
}

function checkForDraw() {
   if (!movesLog.includes(0)) {
     declareWin('No one');   
   }
}

function declareWin(result) {
  var scoreboardEntry = result + " wins!";
  scoreboard.push(scoreboardEntry);
  updateScoreboard();
  winnerDeclared = true;
  var winnerDeclaration = document.getElementById('winner-declaration');
  winnerDeclaration.innerHTML = scoreboardEntry;
  declareWinModal.style.display = "initial";  
}

function updateScoreboard() {
  while (winMessageDiv.hasChildNodes()) {
		winMessageDiv.removeChild(winMessageDiv.firstChild);
	}
  scoreboard.forEach(function(item) {
    var p = document.createElement("p");
    var winMessageText = document.createTextNode(item);
    p.appendChild(winMessageText);
    winMessageDiv.appendChild(p);
  });
}

function declareDraw(){

}

function refreshTotalsArray() {
    totalsArray = [];
    totalsArray.push(movesLog[0] + movesLog[1] + movesLog[2]); // 0 top row
    totalsArray.push(movesLog[3] + movesLog[4] + movesLog[5]); // 1 middle row
    totalsArray.push(movesLog[6] + movesLog[7] + movesLog[8]); // 2 bottom row
    totalsArray.push(movesLog[0] + movesLog[3] + movesLog[6]); // 3 first column
    totalsArray.push(movesLog[1] + movesLog[4] + movesLog[7]); // 4 second column
    totalsArray.push(movesLog[2] + movesLog[5] + movesLog[8]); // 5 third column
    totalsArray.push(movesLog[0] + movesLog[4] + movesLog[8]); // 6 diagonal: top-left to bottom-right
    totalsArray.push(movesLog[2] + movesLog[4] + movesLog[6]); // 7 diagonal: top-right to bottom-left
}

function computerPlanMove() {
// computer is '0s'
  var squareToMoveTo;
  refreshTotalsArray();
  if (totalsArray.includes(10)) {
    var totalsArrayindex = totalsArray.indexOf(10);
    // look up corresponding range in moveslog, and find which index in that range has value 0
    var lookups = squaresLookup[totalsArrayindex]; // makes lookups an array of the three indices to lookup in moves log
    lookups.forEach(function(lookup){
      if (movesLog[lookup] === 0) {
        squareToMoveTo = lookup;
      }
    });
    //so now the index of moveslog that the computer should move to = squareToMoveTo;
    console.log("case 1: " + squareToMoveTo); // logging index of square to move to

  } else if (totalsArray.includes(2)) {
    var totalsArrayindex = totalsArray.indexOf(2);
    // look up corresponding range in moveslog, and find which index in that range has value 0
    var lookups = squaresLookup[totalsArrayindex]; // makes lookups an array of the three indices to lookup in moves log
    lookups.forEach(function(lookup){
      if (movesLog[lookup] === 0) {
        squareToMoveTo = lookup;
      }
    });
    //so now the index of moveslog that the computer should move to = squareToMoveTo;
    console.log("case 2: " + squareToMoveTo); // logging index of square to move to
  } else if (movesLog[4] === 0) { //if center square clear
    squareToMoveTo = 4; 
    console.log("center: " + squareToMoveTo);
  } else if (movesLog[0] === 0) {
    squareToMoveTo = 0;
    console.log("corner: " + squareToMoveTo);
  } else if (movesLog[2] === 0) {
    squareToMoveTo = 2;
    console.log("corner: " + squareToMoveTo);
  } else if (movesLog[6] === 0) {
    squareToMoveTo = 6;
    console.log("corner: " + squareToMoveTo);
  } else if (movesLog[8] === 0) {
    squareToMoveTo = 8;
    console.log("corner: " + squareToMoveTo);
  } else {
    squareToMoveTo = movesLog.indexOf(0);
    console.log("wherever!: " +squareToMoveTo);
  }
  drawComputerMove(squareToMoveTo);
  checkForWinner(squareToMoveTo, playerXToMove);
  playerXToMove = !playerXToMove;
    if (playerXIsHuman || player0IsHuman) {
      computersTurn = false;
    } else if (winnerDeclared === false) {
      computerPlanMove();
    }
}

function drawComputerMove(squareToMoveTo) {
  if (playerXToMove === true) {
       var icon = iconX();
    } else {
        var icon = iconO();
    }
    cells[squareToMoveTo].appendChild(icon);
}
