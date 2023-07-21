function readGrid() {
  let inputs = document.getElementsByTagName("input");
  let rows = 9, cols = 9;
  let gridArray = [];
  for (let i = 0; i < rows; i++) {
    let rowArray = [];
    for (let j = 0; j < cols; j++) {
      let inputValue = parseInt(inputs[i * cols + j].value);
      rowArray.push(inputValue);
    }
    gridArray.push(rowArray);
  }
  solveSudoku(gridArray)
  printGrid(gridArray)
}
function solveSudoku(board) {
  const size = 9;
  const boxSize = 3;

  function isSafe(row, col, num) {
    for (let d = 0; d < size; d++) {
      if (board[row][d] === num) return false;
    }
    for (let r = 0; r < size; r++) {
      if (board[r][col] === num) return false;
    }
    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;
    for (let r = 0; r < boxSize; r++) {
      for (let c = 0; c < boxSize; c++) {
        if (board[boxRow + r][boxCol + c] === num) return false;
      }
    }
    return true;
  }
  function solve() {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0 || board[row][col] === null) {
          for (let num = 1; num <= size; num++) {
            if (isSafe(row, col, num)) {
              board[row][col] = num;
              if (solve()) return true;
               else board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  if (solve()) return board;
   else return "No solution exists.";
}

function printGrid(gridArray) {
  let cnt = 0
  for(let i=0; i<9; i++) {
    let String = "";
    for(let j=0; j<9; j++) {
      document.getElementsByTagName('input')[cnt].value = gridArray[i][j]
      cnt++
      String += gridArray[i][j]
    }
    console.log(String)
  }
}

document.getElementById('reset').addEventListener('click',()=>{
  location.reload()
})
document.getElementById('solve').addEventListener('click',()=>{
  console.log("readgrid")
  readGrid()
})
