var readlineSync = require('readline-sync');

// O(n*n)
function bubbleSort(arr) {
  let temp;
  let swaps = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      arr[i] = Number(arr[i]);
      arr[j] = Number(arr[j]);
      if (arr[i] > arr[j]) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        swaps++;
      }
    }
  }
  console.log('Sorted Array : ', arr);
  console.log('No of Swaps : ', swaps);
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let arr = readlineSync.question('Enter comma separated array values : ');
    if (arr.length > 0) bubbleSort(arr.split(','));
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
