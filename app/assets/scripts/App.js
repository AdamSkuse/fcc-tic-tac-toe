var cells = document.getElementsByClassName("cell");
var playerXToMove = true;
var movesLog = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalsArray = [];
var winnerDeclared = false;

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

function playerMove(){
    if (this.hasChildNodes()) {
        alert("This space is taken!");
    } else {
      if (playerXToMove === true) {
           var icon = iconX();
        } else {
            var icon = iconO();
        }
        this.appendChild(icon);
        checkForWinner(this.id, playerXToMove);
        playerXToMove = !playerXToMove;
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
    var playerNumber = 0;
    if (playerX === true) {
        playerNumber = 1;
    } else {
        playerNumber = 5;
    }
    movesLog[index] = playerNumber;
    refreshTotalsArray();
    if (totalsArray.includes(3)) {
        var winMessageDiv = document.getElementById("win-message-div");
        var p = document.createElement("p");
        var winMessageText = document.createTextNode("X wins!");
        p.appendChild(winMessageText);
        winMessageDiv.appendChild(p);
        winnerDeclared = true;
    } else if (totalsArray.includes(15)) {
        var winMessageDiv = document.getElementById("win-message-div");
        var p = document.createElement("p");
        var winMessageText = document.createTextNode("0 wins!");
        p.appendChild(winMessageText);
        winMessageDiv.appendChild(p);
        winnerDeclared = true;
    }
    if (winnerDeclared === false) {
        checkForDraw();
    }

}

function checkForDraw() {
   if (!movesLog.includes(0)) {
        var winMessageDiv = document.getElementById("win-message-div");
        var p = document.createElement("p");
        var winMessageText = document.createTextNode("Draw!");
        p.appendChild(winMessageText);
        winMessageDiv.appendChild(p);
   }
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

function computerMove() {
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
  }

  //
  //check for imminent computer win i.e. totalsArray includes '10' - if so, make move
  // if totals includes 10
  // find index in totls that includes 10
  // if index 0 then it is top row, etc. corresponding indices range in moves log will be 0 - 2
  // in corresponding indices range in moves log, find index with value 0
  // make move on board in square that corresponds to this index
  //
  //
  //check for imminent human win - if so, make move to block
  //as above, but for totals of "2"
  //
  //if no imminent win and no one has moved to center square, move to center square
  //
  //
  //if none of above, make a move adjacent to a corner if available
  //look up indices of corner squares in moveslog. move to first empty one
  //
  //if no empty corner is available, move to any space that is available
  //  find value 0 in moves log and move there
  
  //run checkFoWinner();
  //
  
}
