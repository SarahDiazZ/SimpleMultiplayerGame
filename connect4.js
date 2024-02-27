var pRed = "R";
var pYellow = "Y";
var curPlayer = pRed; //Makes player red go first

var gameOver = false;
var board;
var curCols;

//Controls the number of rows and columns on the board
var rows = 6;
var cols = 7;

//When the page loads
window.onload = function() {
    setGame();
    let restart = document.getElementById("restartBtn").addEventListener("click", restartGame);
}

function setGame() {
    board = []
    curCols = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push(' ');

            //html
            //<div id="0-0" class="tile">
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setChip);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

//Adds the chips onto the board when user clicks
function setChip() {
    if (gameOver) {
        return;
    }

    let coor = this.id.split("-"); //"0-0" --> ["0", "0"]
    let r = parseInt(coor[0]);
    let c = parseInt(coor[1]);

    r = curCols[c];
    if (r < 0) {
        return;
    }

    board[r][c] = curPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.classList.add("falling", "rotating");

    if (curPlayer == pRed) {
        tile.classList.add("red-chip");
        curPlayer = pYellow; //Makes chip alternate
    }
    else {
        tile.classList.add("yellow-chip");
        curPlayer = pRed;
    }
    tile.addEventListener("animation_end", function() {
        tile.classList.remove("falling", "rotating");
    }, {once: true});

    r -= 1; //Updates the row height for the column
    curCols[c] = r; //Update the array

    checkWinner();
}

function checkWinner() {
    //horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) { //checks 3 ahead of us before going out of bounds
            if (board[r][c] != ' ') { //checks if board has a chip
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //vertical
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");

    //Displays text
    if (board[r][c] == pRed) {
        winner.innerText = "Red Wins!";
    }
    else {
        winner.innerText = "Yellow Wins!";
    }

    let restart = document.getElementById("restartBtn").addEventListener("click", restartGame);
    gameOver = true;

}

function restartGame() {
    window.location.reload(); //Reloads the page
}