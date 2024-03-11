let boxs = document.querySelectorAll(".box");
let personX = true;

const winCondition = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
]

let count = 0;
boxs.forEach((box) => {
    box.addEventListener("click", () => {
        if(personX){
            box.innerText = "X";
            box.style.color = "red";
            personX = false;
        }
        else{
            box.innerText = "O";
            box.style.color = "black";
            personX = true;
        }
        box.disabled = true;

        count++;
        let isWinner = checkWiner();

        if (count === 9 && !isWinner) {
            draw();
        }
    });
});

let found = false;
const checkWiner = () => {
    for(let stbox of winCondition){
        let b1 = boxs[stbox[0]].innerText;
        let b2 = boxs[stbox[1]].innerText;
        let b3 = boxs[stbox[2]].innerText;
        if(b1 !== "" && b2 !== "" && b3 !== ""){
            if(b1 === b2 && b2 === b3){
                console.log(`win ${b1}`);
                showWiner(b1);
                found = true;
            }
        }
    }
}

let msg = document.querySelector("#msg");
let newGame = document.querySelector("#newGame");
let msgCon = document.querySelector(".newMsg");
let clear = document.querySelector(".clear");
let game = document.querySelector(".game");

const disableBox = () => {
    for(let box of boxs){
        box.disabled = true;
    }
}

const enableBox = () => {
    for(let box of boxs){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWiner = (w) => {
    msg.innerText = `Congratulations, '${w}' Win, Start a New Game.`;
    disableBox();
    setTimeout(() => {
        msgCon.classList.remove("hide");
        game.classList.add("hide");
        clear.classList.add("hide");
    }, 1000);
}

const draw = () => {
    msg.innerText = `It's Draw, Start a New Game.`;
    msgCon.classList.remove("hide");
    game.classList.add("hide");
    clear.classList.add("hide");
    disableBox();
}

const resetGame = () => {
    personX = true;
    enableBox();
    msgCon.classList.add("hide");
    game.classList.remove("hide");
    clear.classList.remove("hide");
    count = 0;
}

newGame.addEventListener("click", resetGame);
clear.addEventListener("click", resetGame);
