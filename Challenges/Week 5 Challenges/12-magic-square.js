var readlineSync = require('readline-sync');

// O(n * n)
function isMagicSquare(matrix) {
  let rowSums = [];
  let primaryDiagnolSum = 0;
  let secondaryDiagnolSum = 0;
  let length = matrix.length;
  let colSums = Array(length).fill(0);
  let isMagicSquare = matrix.length > 0 ? true : false;

  for (let i = 0; i < length; i++) {
    let sumRow = 0;

    for (let j = 0; j < length; j++) {
      //row
      sumRow += matrix[i][j];
      //primary diagnol
      if (i === j) {
        primaryDiagnolSum += matrix[i][j];
      }
      //secondary diagnol
      if (i + j + 1 === length) {
        secondaryDiagnolSum += matrix[i][j];
      }
      //column
      colSums[j] += matrix[i][j];
    }
    rowSums.push(sumRow);
  }

  if (primaryDiagnolSum !== secondaryDiagnolSum) {
    isMagicSquare = false;
    return isMagicSquare;
  }

  for (let i = 0; i < rowSums.length; i++) {
    if (rowSums[i] !== colSums[i] || rowSums[i] !== primaryDiagnolSum) {
      isMagicSquare = false;
      break;
    }
  }

  return isMagicSquare;
}

// O(n + n)
function makeMatrix(str, size) {
  let matrix = [];
  let data = [];

  str = str.split(',');

  for (let i = 0; i < str.length; i++) {
    let num = parseInt(str[i]);
    if (Number.isNaN(num)) break;
    if ((i + 1) % size !== 0) {
      data.push(num);
    } else {
      data.push(num);
      matrix.push(data);
      data = [];
    }
    if (matrix.length === size) break;
  }

  return matrix;
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let size = parseInt(readlineSync.question('Size of NxN matrix : '));
    if (size) {
      console.log('Values will be filled row-wise');
      console.log(`New row will begin after every ${size} value`);

      let str = readlineSync.question(
        `Enter ${size * size} comma separated values : `
      );
      let matrix = makeMatrix(str, size);
      console.log('Your matrix is ', matrix);
      console.log('Is your matrix a magic square : ', isMagicSquare(matrix));
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
