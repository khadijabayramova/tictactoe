let headText = document.querySelector(".header");
let getcontainer = document.querySelector(".container");
let getstatus = document.querySelector(".status");
let cells = document.querySelectorAll(".cell");
let resetBtn = document.querySelector(".resetbtn");
let popup = document.querySelector(".popUp");
let message = document.querySelector(".message");
let newGamebtn = document.querySelector(".newGame");
let getXscore = document.querySelector(".scoreX");
let getOscore = document.querySelector(".scoreO");
let winnerPattern = [
  [0, 1, 2],
  [0, 4, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let xTurn = true;
let count = 0;
let xscore = 0;
let oscore = 0;
startgame();
//  F u n t i o n s //
const disableAllcells = () => {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
};

function startgame() {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.disabled = false;
    getstatus.innerText = "X's Turn";
  });
}

function scorechecker() {
  if (winner === "X") {
    xscore += 1;
    getXscore.innerText = `X : ${xscore}`;
  } else if (winner === "O") {
    oscore += 1;
    getOscore.innerText = `X : ${xscore}`;
  }
}
// C e l l s      i n s i d e//
cells.forEach((element) =>
  element.addEventListener("click", () => {
    if (!element.disabled) {
      if (xTurn) {
        xTurn = false;
        element.innerText = "X";
        getstatus.innerText = "O's Turn";
      } else {
        xTurn = true;
        element.innerText = "O";
        getstatus.innerText = "X's Turn";
      }
    }
    element.disabled = true;

    count += 1;
    if (winchecker()) {
      scorechecker(winchecker());
    }
    winchecker();
  })
);

// c o m p a r i n g
const winchecker = () => {
  for (let i of winnerPattern) {
    let [element1, element2, element3] = [
      cells[i[0]].innerText,
      cells[i[1]].innerText,
      cells[i[2]].innerText,
    ];

    //conditions
    if (element1 !== "" && element2 !== "" && element3 !== "") {
      if (element1 === element2 && element2 === element3) {
        message.classList.add("visible");
        message.innerText = `🎉 Player ${element1} Won`;
        getcontainer.classList.add("hidden");
        headText.classList.add("hidden");
        getstatus.classList.add("hidden");
        resetBtn.classList.add("hidden");
        newGamebtn.classList.add("visible");
        disableAllcells();
        scorechecker();

        return openpopup();
      }
    }
  }
};

// B u t t o n s
newGamebtn.addEventListener("click", () => {
  location.reload();
});

resetBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.disabled = false;
  });
  getstatus.innerHTML = "X's Turn";
  xTurn = true;
  count = 0;
});
