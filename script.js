const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    return {board}
})();

const factoryPlayers = (name) => {
    const score = 0;
    return {name, score}
}; 

const displayController = (() => {
    let tour = 1;
    let changeTurn = () => {
        if (displayController.tour == 1) {
            displayController.tour = 2;
        } else {
            displayController.tour = 1;
        }
    };
    return {tour, changeTurn}
})();

const positions = document.querySelectorAll('.position');

positions.forEach(position => position.addEventListener('click', action));

function action(e) {
    let tableIndex = parseInt(e.target.id);
    if (this.textContent != "") {
        return;
    }
    if(displayController.tour == 1) {
        this.textContent = "X";
        gameBoard.board[tableIndex] = "X";
        displayController.changeTurn();
        checkWin("X", tableIndex);
    } else {
        this.textContent = "O";
        gameBoard.board[tableIndex] = "O";
        displayController.changeTurn();
        checkWin("O", tableIndex);
    }
};

const player1 = factoryPlayers("Player 1");
const player2 = factoryPlayers("Player 2");

function checkWin(playerSymbol, boardIndex) {
    let win = false;
    switch(boardIndex) {
        case 0:
            if(gameBoard.board[boardIndex] == gameBoard.board[1] && gameBoard.board[boardIndex] == gameBoard.board[2]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[3] && gameBoard.board[boardIndex] == gameBoard.board[6]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[4] && gameBoard.board[boardIndex] == gameBoard.board[8]) {
                win = true;
            }
            break;
        case 1:
            if(gameBoard.board[boardIndex] == gameBoard.board[0] && gameBoard.board[boardIndex] == gameBoard.board[2]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[4] && gameBoard.board[boardIndex] == gameBoard.board[7]) {
                win = true;
            }
            break;
        case 2:
            if(gameBoard.board[boardIndex] == gameBoard.board[0] && gameBoard.board[boardIndex] == gameBoard.board[1]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[5] && gameBoard.board[boardIndex] == gameBoard.board[8]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[4] && gameBoard.board[boardIndex] == gameBoard.board[6]) {
                win = true;
            }
            break;
        case 3:
            if(gameBoard.board[boardIndex] == gameBoard.board[0] && gameBoard.board[boardIndex] == gameBoard.board[6]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[4] && gameBoard.board[boardIndex] == gameBoard.board[5]) {
                win = true;
            }
            break;
        case 4:
            if(gameBoard.board[boardIndex] == gameBoard.board[1] && gameBoard.board[boardIndex] == gameBoard.board[7]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[3] && gameBoard.board[boardIndex] == gameBoard.board[5]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[0] && gameBoard.board[boardIndex] == gameBoard.board[8]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[2] && gameBoard.board[boardIndex] == gameBoard.board[6]) {
                win = true;
            }
            break;
        case 5:
            if(gameBoard.board[boardIndex] == gameBoard.board[2] && gameBoard.board[boardIndex] == gameBoard.board[8]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[3] && gameBoard.board[boardIndex] == gameBoard.board[4]) {
                win = true;
            }
            break;
        case 6:
            if(gameBoard.board[boardIndex] == gameBoard.board[0] && gameBoard.board[boardIndex] == gameBoard.board[3]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[7] && gameBoard.board[boardIndex] == gameBoard.board[8]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[2] && gameBoard.board[boardIndex] == gameBoard.board[4]) {
                win = true;
            }
            break;
        case 7:
            if(gameBoard.board[boardIndex] == gameBoard.board[1] && gameBoard.board[boardIndex] == gameBoard.board[4]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[6] && gameBoard.board[boardIndex] == gameBoard.board[8]) {
                win = true;
            }
            break;
        case 8:
            if(gameBoard.board[boardIndex] == gameBoard.board[0] && gameBoard.board[boardIndex] == gameBoard.board[4]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[2] && gameBoard.board[boardIndex] == gameBoard.board[5]) {
                win = true;
            } else if (gameBoard.board[boardIndex] == gameBoard.board[6] && gameBoard.board[boardIndex] == gameBoard.board[7]) {
                win = true;
            }
            break;
    }
    if (win && playerSymbol == "X") {
        winner(player1, '.player1');
    } else if (win && playerSymbol == "O") {
        winner(player2, '.player2');
    } else if (win == false && !gameBoard.board.includes('')) {
        tie();
    }
}

function tie() {
    empty();
    const displayOutcome = document.querySelector('.winner');
    displayOutcome.textContent = "Tie, no winner !";
}

function winner(player, classElement) {
    empty();
    player.score += 1;
    const scoreDiv = document.querySelector(classElement);
    scoreDiv.textContent = player.score;
    const displayOutcome = document.querySelector('.winner');
    displayOutcome.textContent = `${player.name} won the game !!!`;
}

function empty() {
    const positions = document.querySelectorAll('.position');
    positions.forEach(position => position.innerHTML = "");
    for (values in gameBoard.board) {
        gameBoard.board[values] = "";
    }
}

const retry = document.querySelector('.retry');
retry.addEventListener('click', empty);
