const game = document.querySelector(".Game");
const cells = document.querySelectorAll(".cell");
const containerBtn = document.querySelector(".container");
const restartBtn = document.querySelector("#restart");
const popup = document.querySelector(".popUp");
const message = document.querySelector(".message");
const newgamebtn = document.querySelector(".newGame");
const turn = document.querySelector(".turns");

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// set the first go for "X"
let xTurn = true;
let count = 0;

const disableButton = () => {
  cells.forEach(
    (element) => ((element.disabled = true), (element.style.display = "none"))
  );
  popup.style.display = "block";
};

// const enableBtns = () => {
//   cells.forEach((element) => {
//     // element.innerText = "";
//     element.disabled = false;
//   });
//   popup.style.display = "none";
// };

// New game
newgamebtn.addEventListener("click", () => {
  count = 0;
  containerBtn.forEach((element) => (element.style.display = "block"));
  popup.style.display = "none";
  // location.reload();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  cells.forEach((element) => (element.innerText = ""));
});

const winFunction = (letter) => {
  disableButton();
  if (letter === "X") {
    message.innerHTML = `The Winner:${letter} `;
  } else {
    message.innerHTML = `The Winner:${letter}`;
  }
};

const drawFunction = () => {
  disableButton();
  message.innerHTML = "&#x1F60E; <br> It's a Draw";
};

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      cells[i[0]].innerText,
      cells[i[1]].innerText,
      cells[i[2]].innerText,
    ];

    // Check if every element has filled
    if (element1 !== "" && element2 !== "" && element3 !== "") {
      if (element1 === element2 && element2 === element3) {
        winFunction(element1);
        return true;
      }
    }
  }
  return false;
};

// Display X/O on click
cells.forEach((element) => {
  element.addEventListener("click", () => {
    if (!element.disabled) {
      if (xTurn) {
        xTurn = false;
        element.innerText = "X";
        turn.innerText = "O's turn";
      } else {
        xTurn = true;
        element.innerText = "O";
        turn.innerText = "X's turn";
      }
      element.disabled = true; // Disable the button after setting text

      count += 1;
      if (winChecker()) {
        return;
      }
      if (count === 9) {
        drawFunction();
      }
    }
  });
});

window.onload = enableBtns;
