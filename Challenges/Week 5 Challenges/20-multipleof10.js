var readlineSync = require('readline-sync');

// O(1)
function multipleOf10(num) {
  if (num % 10 === 0) {
    return (num << 4) - (num << 2) - (num << 1);
  }
  return num << 3;
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let num = Number(readlineSync.question('Enter Your Number :'));
    if (!Number(num)) break;
    console.log(multipleOf10(num));
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue :"
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
