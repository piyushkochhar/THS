var readlineSync = require('readline-sync');

// O(n*n)
function isIdentityMatrix(matrix) {
  let result = 'Yes';
  let length = matrix.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i === j && matrix[i][j] !== 1) {
        result = 'No';
      } else if (i !== j && matrix[i][j] !== 0) {
        result = 'No';
      }
    }
  }
  return result;
}

// O(n + n)
function makeMatrix(str, size) {
  let matrix = [];
  let data = [];

  str = str.split(',');

  for (let i = 0; i < str.length; i++) {
    let num = Number(str[i]);
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
    let size = Number(readlineSync.question('Size of NxN matrix : '));
    if (size) {
      console.log('Values will be filled row-wise');
      let str = readlineSync.question(
        `Enter ${size * size} comma separated values : `
      );
      let matrix = makeMatrix(str, size);
      console.log('Your matrix is ', matrix);
      console.log(isIdentityMatrix(matrix));
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
