const game = (() => {
    const board = ["","","","","","","","",""];
    const turn = [];
    const score = [0, 0];
    const newGame = () => {
        document.querySelectorAll(".box").forEach(box => {
            box.textContent = "";
            box.classList.remove("clicked");
            turn.splice(0, turn.length);
            for (let i = 0; i < board.length; i++){
                board[i] = "";
            }
        })
    };
    const updateBoard = (pos, marker) => {
        if (document.getElementById(pos).classList.contains("clicked")){
            return board;
        }
        board[pos] = marker;
        document.getElementById(pos).classList.add("clicked");
        return board;
    };
    const checkWinner = () => {
        const winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
                        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
                        [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < winners.length; i++) {
            if (board[winners[i][0]] !== "") {
                if (board[winners[i][0]] === board[winners[i][1]] && board[winners[i][0]] === board[winners[i][2]]) {
                    document.querySelectorAll(".box").forEach(box => {
                        box.classList.add("clicked");
                    });
                    return [true, board[winners[i][0]]];
                }
            }
        }
        return false;

    };
    const changeTurn = () => {
        turn.push("");
        return turn;
    };
    const changeScore = (winner) => {
        if (winner === "x"){
            score[0] += 1;
        }
        if (winner === "o"){
            score[1] += 1;
        }
        return score;
    }
    

    return { board, turn, newGame, updateBoard, checkWinner, changeTurn, changeScore };
})();

const domPrinter = (() => {
    const printBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            let box = document.getElementById(i);
            box.textContent = board[i];
        }
    }
    const printWinner = (winner) =>{
        const scoreboard = document.getElementById("scoreboard");
        scoreboard.textContent = winner;
    }

    return { printBoard, printWinner }
})()

const makePlayer = (name, marker) => {
    const returnName = () => name;
    const returnMarker = () => marker;
    return { returnName, returnMarker };
}

// Main
const player1 = makePlayer("Player 1", "o");
const player2 = makePlayer("Player 2", "x");

game.newGame();

const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (game.turn.length % 2 > 0){
            game.changeTurn();
            domPrinter.printBoard(game.updateBoard(box.id, player1.returnMarker()));
        }
        else{
            game.changeTurn();
            domPrinter.printBoard(game.updateBoard(box.id, player2.returnMarker()));
        }
        if(game.checkWinner()[0]) {
            domPrinter.printWinner(game.changeScore());
            game.changeScore(game.checkWinner()[1]);
          
        }
    })
})

const playAgain = document.getElementById("playagain");
playAgain.addEventListener("click", () => {
    game.newGame();
    domPrinter.printWinner(game.changeScore());
})
