var readlineSync = require('readline-sync');

// O(log n)
function inSeries(num) {
  for (let i = 0; i < num; i++) {
    let seriesNum = 4 << (2 * i);
    if (seriesNum === num) return 'yes';
    if (seriesNum > num) return 'no';
  }
}

//
function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let num = Number(readlineSync.question('Enter Your Number : '));
    console.log(inSeries(num));
    let input = readlineSync.question(
      "Press 'N' to Terminate or any other character to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
