const game = (() => {
    const board = ["","","","","","","","",""];
    const turn = ["", ""];
    const score = [0, 0];
    const newGame = () => {
        document.querySelectorAll(".box").forEach(box => {
            box.textContent = "";
            box.classList.remove("clicked");
            box.classList.remove("finished");
            turn.splice(0, turn.length - 2);
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
    const robotTurn = (board) => {

        return [robotPos, robotMarker]
    }
    
    return { board, turn, newGame, updateBoard, checkWinner, changeTurn, changeScore, robotTurn };
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
        scoreboard.textContent = winner[0] + " : " + winner[1];
    }

    return { printBoard, printWinner }
})()

const makePlayer = (name, marker) => {
    const returnName = () => name;
    const returnMarker = () => marker;
    return { returnName, returnMarker };
}

// Main

let player1;
let player2;

const robot = document.getElementById("robot");
const form1 = document.getElementById("person1");
const form2 = document.getElementById("person2");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");

robot.addEventListener("change", () => {
    if (robot.checked === true){
        form2.textContent = "Mr. Robot";
        form2.disabled = true;
    }
    else {
        form2.textContent = "";
        form2.disabled = false;
    }

})

const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
    let playerName1 = form1.value;
    let playerName2;
    if (robot.checked === true){
        playerName2 = "Mr. Robot"
    }
    else {
        playerName2 = form2.value;
    }
    if (playerName1 === ""){
        playerName1 = "Player 1";
    }   
    if (playerName2 === "") {
        playerName2 = "Player 2";
    }

    player1 = makePlayer(playerName1, "o");
    player2 = makePlayer(playerName2, "x");
    name1.textContent = player1.returnName();
    name2.textContent = player2.returnName();
    form1.disabled = true;
    form2.disabled = true;
    robot.disabled = true;
});

game.newGame();


const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (game.turn.length % 2 > 0){
            game.changeTurn();
            domPrinter.printBoard(game.updateBoard(box.id, player1.returnMarker()));
        }
        else{
            if (form2.textContent === "Mr. Robot"){
                game.changeTurn();
                domPrinter.printBoard(game.updateBoard(robotTurn(board)[0], robotTurn(board)[1]));
            }
            else{
                game.changeTurn();
                domPrinter.printBoard(game.updateBoard(box.id, player2.returnMarker()));
            }
        }
        if(game.checkWinner()[0]) {
            if (box.classList.contains("finished")){
            }
            else {
                game.changeScore(game.checkWinner()[1]);
                domPrinter.printWinner(game.changeScore());
                boxes.forEach(box => box.classList.add("finished"));
            }
        }
    })
})

const playAgain = document.getElementById("playagain");
playAgain.addEventListener("click", () => {
    game.newGame();
    domPrinter.printWinner(game.changeScore());
})
