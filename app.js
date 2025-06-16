let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg");
let msg = document.querySelector("#mssg");

let chooseXbtn = document.querySelector("#choose-x");
let chooseObtn = document.querySelector("#choose-o");
let chooseScreen = document.querySelector(".choose-symbol");

let playerSymbol = "X";
let turnO; // Will set after symbol selection

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

// Choose symbol buttons event
chooseXbtn.addEventListener("click", () => {
    playerSymbol = "X";
    turnO = (playerSymbol === "O");
    chooseScreen.style.display = "none";
    resetGame();
});

chooseObtn.addEventListener("click", () => {
    playerSymbol = "O";
    turnO = (playerSymbol === "O");
    chooseScreen.style.display = "none";
    resetGame();
});

const resetGame = () => {
    turnO = (playerSymbol === "O");
    enabledboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;  // prevent overwrite

        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        box.disabled = true;
        turnO = !turnO;
        checkwinner();
    });
});

const disabledboxes = () => {
    boxes.forEach(box => box.disabled = true);
}

const enabledboxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
}

const checkwinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let valA = boxes[a].innerText;
        let valB = boxes[b].innerText;
        let valC = boxes[c].innerText;

        if (valA !== "" && valA === valB && valB === valC) {
            showWinner(valA);
            return;
        }
    }
}

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
