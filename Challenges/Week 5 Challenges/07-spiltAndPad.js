var readlineSync = require('readline-sync');

// O(n)
function splitAndPad(str) {
  let length = str.length;
  let even = '000';
  let odd = '000';

  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      even += str[i];
    } else {
      odd += str[i];
    }
  }

  console.log(even + '111');
  console.log(odd + '111');
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let str = readlineSync.question('Enter Your String : ');
    splitAndPad(str);
    let input = readlineSync.question(
      "Press 'N' to Terminate or any other character to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
