let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer  = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Box was clicked");
        // box.innerText = "Abcd";
        if (turn0) {
            box.innerText = "0";
            box.style.color = "yellow";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "red";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (player) => {
    msg.innerText = `Player ${player} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
            if (pos1Value == pos2Value && pos2Value == pos3Value) {
                // console.log("Player " + pos1Value + " wins!");
                showWinner(pos1Value);
                return true;
            }
        }
    }
}

newBtn.addEventListener(
    "click", resetGame
);

resetBtn.addEventListener(
    "click", resetGame
);

