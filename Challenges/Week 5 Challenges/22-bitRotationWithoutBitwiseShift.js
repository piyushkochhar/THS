var readlineSync = require('readline-sync');

// O(log n)
function toBinary(num) {
  let binary = 0;
  let power = 0;
  while (num > 0) {
    let rem = num % 2;
    num = Math.floor(num / 2);
    binary += rem * Math.pow(10, power++);
  }

  return binary;
}

//O(log n)
function toDecimal(num) {
  let decimal = 0;
  let power = 0;
  while (num > 0) {
    let rem = num % 10;
    num = Math.floor(num / 10);
    decimal += rem * Math.pow(2, power++);
  }
  return decimal;
}

// O(log(n) + log(n) + r)
function bitRotation(type, num, r) {
  let binary = toBinary(num);

  let resultBinary = 0;

  if (type.toLowerCase() === 'l') {
    type = 'Left';
    resultBinary = binary * Math.pow(10, r);
  } else if (type.toLowerCase() === 'r') {
    type = 'Right';
    resultBinary = Math.floor(binary / Math.pow(10, r));
  } else {
    console.log('Enter valid Rotation Type');
    return;
  }

  console.log(`Binary of ${num} = ${binary}`);
  console.log(`${type} rotation of ${r} = ${resultBinary}`);
  console.log(`Decimal Equivalent = ${toDecimal(resultBinary)}`);
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let type = readlineSync.question(
      'Choose type of rotation -> Enter "L" for left and "R" for right : '
    );
    let num = parseInt(readlineSync.question('Enter Your Integer: '));
    let r = parseInt(readlineSync.question('Enter Your Rotations: '));
    if (type && num && r) bitRotation(type, num, r);
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
