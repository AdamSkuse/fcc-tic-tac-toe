var cells = document.getElementsByClassName("cell");
var playerXToMove = true;
var movesLog = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalsArray = [];
var winnerDeclared = false;


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
    totalsArray = [];
    totalsArray.push(movesLog[0] + movesLog[1] + movesLog[2]);
    totalsArray.push(movesLog[3] + movesLog[4] + movesLog[5]);
    totalsArray.push(movesLog[6] + movesLog[7] + movesLog[8]);
    totalsArray.push(movesLog[0] + movesLog[3] + movesLog[6]);
    totalsArray.push(movesLog[1] + movesLog[4] + movesLog[7]);
    totalsArray.push(movesLog[2] + movesLog[5] + movesLog[8]);
    totalsArray.push(movesLog[0] + movesLog[4] + movesLog[8]);
    totalsArray.push(movesLog[2] + movesLog[4] + movesLog[6]);

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
