var readlineSync = require('readline-sync');

// O(n*n)
function countEvenOdd(matrix, row, col) {
  let even = 0;
  let odd = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] % 2 === 0) {
        ++even;
      } else {
        ++odd;
      }
    }
  }
  console.log(`Even Frequency : ${even}`);
  console.log(`Odd Frequency : ${odd}`);
}

// O(n + n)
function makeMatrix(str, row, col) {
  let matrix = [];
  let data = [];

  str = str.split(',');

  for (let i = 0; i < str.length; i++) {
    let num = Number(str[i]);
    if ((i + 1) % col !== 0) {
      data.push(num);
    } else {
      data.push(num);
      matrix.push(data);
      data = [];
    }
    if (matrix.length === row) break;
  }

  return matrix;
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let rows = Number(readlineSync.question('Enter Number of Rows : '));
    let cols = Number(readlineSync.question('Enter Number of Columns : '));
    if (rows && cols) {
      console.log('Values will be filled row-wise');
      console.log('Extra values will be ignored');
      let str = readlineSync.question(
        `Enter ${rows * cols} comma separated values : `
      );
      let matrix = makeMatrix(str, rows, cols);
      console.log('Your matrix is ', matrix);
      countEvenOdd(matrix, rows, cols);
    }
    let input = readlineSync.question(
      "Press 'N' to Terminate or any other character to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
