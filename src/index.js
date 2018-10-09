module.exports = function solveSudoku(matrix) {

  function existInCell3x3(matrix, i, j, n) {
    let row = 3 * (Math.floor(i / 3));
    let column = 3 * (Math.floor(j / 3));
    for(let r = 0; r < 3; ++r) {
      for(let c = 0; c < 3; ++c) {
        if(matrix[r + row][c + column] == n) {
          return false;
        }
      }
    }
    return true;
  }

  function existInRow(matrix, i, n) {
    for(let j = 0; j < matrix.length; ++j) {
      if(matrix[i][j] == n) {
        return false;
      }
    }
    return true;
  }

  function existInColumn(matrix, j, n) {
    for(let i = 0; i < matrix.length; ++i) {
      if(matrix[i][j] == n) {
        return false;
      }
    }
    return true;
  }

  function changeMatrixToSolution(matrix) {
    let success = true;
    let failure = false;
    let arr = [];
    for(let i = 0; i < matrix.length; ++i) {
      for(let j = 0; j < matrix.length; ++j) {
        if(!matrix[i][j]) { // Пустые клетки пушим в стек, запоминая позицию(i и j) и 
          arr.push([i, j, []]);   // массив из возможных цифр на данной позиции
        }
      }
    }
    if(arr.length == 0) { // Если все клетки заполнены
      return success;
    }
    for(let a of arr) {
      for(let i = 1; i <= 9; ++i) {
        if(existInRow(matrix, a[0], i)              // Если в строке нету элемента i
        && existInColumn(matrix, a[1], i)           // Если в столбце нету элемента i
        && existInCell3x3(matrix, a[0], a[1], i)) { // Если в блоке 3x3, где находится данный элемент, нету i
          a[2].push(i); // Пушим данный элемент в массив возможных значений в данной клетке
        }
      }
    }
    let min = arr[0];
    for(let i = 1; i < arr.length; ++i) {
      if(arr[i][2].length < min[2].length) {
        min = arr[i];
      }
    }
    for(let a of min[2]) {
      matrix[min[0]][min[1]] = a;
      let status = changeMatrixToSolution(matrix);
      if(status == success) {
        return success;
      }
      else {
        matrix[min[0]][min[1]] = 0;
      }
    }
    return failure;
  }
  
  changeMatrixToSolution(matrix);
  return matrix;
}