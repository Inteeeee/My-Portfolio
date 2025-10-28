const board = document.getElementById("board");
    const winnerText = document.getElementById("winner");
    let currentPlayer = "X";
    let cells = ["", "", "", "", "", "", "", "", ""];

    function renderBoard() {
      board.innerHTML = "";
      cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = cell;
        div.addEventListener("click", () => makeMove(index));
        board.appendChild(div);
      });
    }

    function makeMove(index) {
      if (cells[index] === "" && !checkWinner()) {
        cells[index] = currentPlayer;
        if (checkWinner()) {
          winnerText.textContent = `${currentPlayer} wins! 🎉`;
        } else if (cells.every(cell => cell !== "")) {
          winnerText.textContent = "It's a draw!";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
        renderBoard();
      }
    }

    function checkWinner() {
      const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];

      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
      });
    }

    function resetGame() {
      cells = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      winnerText.textContent = "";
      renderBoard();
    }

    renderBoard();
  