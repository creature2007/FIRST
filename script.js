const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreTies = document.getElementById("score-ties");
const cells = Array.from(document.querySelectorAll(".cell"));

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let boardState = Array(9).fill("");
let scores = {
  X: 0,
  O: 0,
  ties: 0,
};
let gameActive = true;

const updateStatus = () => {
  statusText.textContent = gameActive
    ? `Player ${currentPlayer}'s turn`
    : statusText.textContent;
};

const renderScores = () => {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreTies.textContent = scores.ties;
};

const highlightWinningCells = (line) => {
  line.forEach((index) => {
    cells[index].classList.add("cell--win");
  });
};

const checkWinner = () => {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      gameActive = false;
      highlightWinningCells(line);
      statusText.textContent = `Player ${boardState[a]} wins!`;
      scores[boardState[a]] += 1;
      renderScores();
      return true;
    }
  }

  if (!boardState.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a tie!";
    scores.ties += 1;
    renderScores();
    return true;
  }

  return false;
};

const handleCellClick = (event) => {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  if (!gameActive || boardState[index]) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    cells.forEach((button) => {
      button.disabled = true;
    });
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
};

const resetBoard = () => {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("cell--win");
  });
};

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("cell")) {
    handleCellClick(event);
  }
});

resetButton.addEventListener("click", resetBoard);

updateStatus();
renderScores();
