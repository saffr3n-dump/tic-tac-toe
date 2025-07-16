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

    return Object.assign(board, { reset, getMark, setMark });
  })();

  function Player(mark) {
    let score = 0;
    const getScore = () => score;
    const incrementScore = () => ++score;
    return { mark, getScore, incrementScore };
  }

  function getWinPosition() {
    return WIN_POSITIONS.find((cells) => {
      const mark = gameBoard.getMark(cells[0]);
      if (!mark) return false;
      return cells.every((cell) => gameBoard.getMark(cell) === mark);
    });
  }

  const playerX = Player('X');
  const playerO = Player('O');

  function playRound() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      const winPos = getWinPosition();
      if (winPos) return winPos;
      const player = i % 2 === 0 ? playerX : playerO;
      const cell = prompt(`Where to put ${player.mark}?`);
      gameBoard.setMark(cell, player.mark);
    }
  }

  console.log(playRound());
})();
