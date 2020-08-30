var readlineSync = require('readline-sync');

// O(n)
function removeDuplicates(arr) {
  let frequency = {};
  let result = [];

  arr.forEach((val) => {
    if (!frequency[val]) {
      frequency[val] = 1;
      result.push(Number(val));
    }
  });

  console.log('Output : ', result);
  console.log('Number of Elements Removed : ', arr.length - result.length);
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let str = readlineSync.question('Enter Your Numbers comma separated : ');
    removeDuplicates(str.split(','));
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
