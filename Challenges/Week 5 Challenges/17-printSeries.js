var readlineSync = require('readline-sync');

// O(n)
function printSeries(num) {
  let value = 2;
  let series = '';
  for (let i = 1; i <= num; i++) {
    series += value + ' ';
    value += 13 * i;
  }

  return series;
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let num = parseInt(
      readlineSync.question('Enter Your Number for series ​2 15 41 80 ... : ')
    );
    if (num) console.log(printSeries(num));
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
