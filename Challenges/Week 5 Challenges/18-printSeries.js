var readlineSync = require('readline-sync');

// O(n)
function printSeries(num) {
  let value = [1, 2];
  let series = '';
  if (num >= 2) {
    series = '1 2 ';
  } else if (num === 1) {
    series = '1';
  }
  let i = 0;
  while (num > 2) {
    value[i] = 3 * value[i];
    series += value[i] + ' ';
    if (i % 2 === 0) i++;
    else i--;
    num--;
  }

  return series;
}

printSeries(10);

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let num = parseInt(
      readlineSync.question('Enter Your Number for series 1 2 3 6 9 ... : ')
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
