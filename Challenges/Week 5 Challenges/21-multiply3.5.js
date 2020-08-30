var readlineSync = require('readline-sync');

function multiplyByThreeAndHalf(num) {
  let offset = 0;

  //To find odd number
  if ((num & 1) === 1) {
    ++offset;
  }
  return (num << 2) - (num >> 1) - offset;
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let num = Number(readlineSync.question('Enter Your Number : '));
    console.log('Result is : ' + multiplyByThreeAndHalf(num));
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
