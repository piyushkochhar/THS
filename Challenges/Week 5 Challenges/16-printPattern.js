var readlineSync = require('readline-sync');

// O(n*((n+1)/2))
function printPattern(num) {
  for (let i = 1; i <= num; i++) {
    let data = '';
    for (let j = i; j >= 1; j--) {
      data += j;
    }
    console.log(data);
  }
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let num = Number(readlineSync.question('Enter Your Number : '));
    printPattern(num);
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
