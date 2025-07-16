(() => {
  const BOARD_SIZE = 9;
  const WIN_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const gameBoard = (function () {
    const board = new Array(BOARD_SIZE).fill(null);

    function isValidCell(cell) {
      return cell >= 0 && cell < BOARD_SIZE;
    }

    function get() {
      return Object.freeze([...board]);
    }

    function reset() {
      board.fill(null);
    }

    function getMark(cell) {
      if (!isValidCell(cell)) throw new RangeError('Out of game board bounds');
      return board[cell];
    }

    function setMark(cell, mark) {
      if (!isValidCell(cell)) throw new RangeError('Out of game board bounds');
      if (getMark(cell)) throw new Error('Cell is already taken');
      board[cell] = mark;
    }

    return { get, reset, getMark, setMark };
  })();

  function Player(mark) {
    function getMark() {
      return mark;
    }

    return { getMark };
  }

  function getWinPosition() {
    return WIN_POSITIONS.find((cells) => {
      const mark = gameBoard.getMark(cells[0]);
      if (!mark) return false;
      for (let i = 1; i < cells.length; i++) {
        if (gameBoard.getMark(cells[i]) !== mark) return false;
      }
      return true;
    });
  }

  const playerX = Player('x');
  const playerO = Player('o');

  const turnEl = document.querySelector('.turn');
  const winnerEl = document.querySelector('.winner');
  const boardEl = document.querySelector('.board');
  const restartBtn = document.querySelector('button');

  let turn = 0;
  boardEl.addEventListener('click', function game(e) {
    if (e.target.className !== 'cell') return;

    const cell = e.target.getAttribute('data-id');
    if (gameBoard.getMark(cell)) return;

    const [currPlayer, nextPlayer] =
      turn % 2 === 0 ? [playerX, playerO] : [playerO, playerX];

    gameBoard.setMark(cell, currPlayer.getMark());
    e.target.textContent = currPlayer.getMark();
    turnEl.querySelector('span').textContent = nextPlayer.getMark();
    turn++;

    const winPos = getWinPosition();
    if (!winPos && turn < BOARD_SIZE) return;

    boardEl.removeEventListener('click', game);
    turnEl.style.display = 'none';
    winnerEl.style.display = 'block';

    if (winPos) {
      winnerEl.querySelector('span').textContent = currPlayer.getMark();
    } else {
      winnerEl.textContent = 'Tie game!';
    }
  });

  restartBtn.onclick = () => window.location.reload();
})();
