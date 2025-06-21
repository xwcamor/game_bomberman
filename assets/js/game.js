const ROWS = 11;
const COLS = 13;
const board = [];
const gameBoard = document.getElementById('game-board');

const CELL_TYPES = {
  EMPTY: 0,
  WALL: 1,
  BLOCK: 2,
  PLAYER: 3,
  BOMB: 4,
  EXPLOSION: 5
};

let playerPos = {row: 1, col: 1};
let bombs = [];

function createBoard() {
  for (let r = 0; r < ROWS; r++) {
    board[r] = [];
    for (let c = 0; c < COLS; c++) {
      if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) {
        board[r][c] = CELL_TYPES.WALL;
      } else if (r % 2 === 0 && c % 2 === 0) {
        board[r][c] = CELL_TYPES.WALL;
      } else if (Math.random() < 0.3 && !(r === 1 && c === 1)) {
        board[r][c] = CELL_TYPES.BLOCK;
      } else {
        board[r][c] = CELL_TYPES.EMPTY;
      }
    }
  }
  board[playerPos.row][playerPos.col] = CELL_TYPES.PLAYER;
}

function renderBoard() {
  gameBoard.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      switch(board[r][c]) {
        case CELL_TYPES.WALL:
          cell.classList.add('wall');
          break;
        case CELL_TYPES.BLOCK:
          cell.classList.add('block');
          break;
        case CELL_TYPES.PLAYER:
          cell.classList.add('player');
          cell.textContent = '😀';
          break;
        case CELL_TYPES.BOMB:
          cell.classList.add('bomb');
          cell.textContent = '💣';
          break;
        case CELL_TYPES.EXPLOSION:
          cell.classList.add('explosion');
          cell.textContent = '🔥';
          break;
      }
      gameBoard.appendChild(cell);
    }
  }
}

function movePlayer(dr, dc) {
  const newRow = playerPos.row + dr;
  const newCol = playerPos.col + dc;
  if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) return;
  if (board[newRow][newCol] === CELL_TYPES.EMPTY) {
    board[playerPos.row][playerPos.col] = CELL_TYPES.EMPTY;
    playerPos = {row: newRow, col: newCol};
    board[newRow][newCol] = CELL_TYPES.PLAYER;
    renderBoard();
  }
}

function placeBomb() {
  if (board[playerPos.row][playerPos.col] === CELL_TYPES.PLAYER) {
    board[playerPos.row][playerPos.col] = CELL_TYPES.BOMB;
    bombs.push({row: playerPos.row, col: playerPos.col, timer: 3});
    renderBoard();
  }
}

function explodeBomb(bomb) {
  const {row, col} = bomb;
  const explosionCells = [
    [row, col],
    [row-1, col],
    [row+1, col],
    [row, col-1],
    [row, col+1]
  ];
  explosionCells.forEach(([r,c]) => {
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      if (board[r][c] !== CELL_TYPES.WALL) {
        board[r][c] = CELL_TYPES.EXPLOSION;
      }
    }
  });
  renderBoard();
  setTimeout(() => {
    explosionCells.forEach(([r,c]) => {
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        if (board[r][c] === CELL_TYPES.EXPLOSION) {
          board[r][c] = CELL_TYPES.EMPTY;
        }
      }
    });
    renderBoard();
  }, 1000);
}

function gameLoop() {
  bombs.forEach((bomb, index) => {
    bomb.timer--;
    if (bomb.timer <= 0) {
      explodeBomb(bomb);
      bombs.splice(index, 1);
    }
  });
}

document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowUp': movePlayer(-1, 0); break;
    case 'ArrowDown': movePlayer(1, 0); break;
    case 'ArrowLeft': movePlayer(0, -1); break;
    case 'ArrowRight': movePlayer(0, 1); break;
    case ' ': placeBomb(); break;
  }
});

createBoard();
renderBoard();
setInterval(gameLoop, 1000);