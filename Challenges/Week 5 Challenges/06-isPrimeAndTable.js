var readlineSync = require('readline-sync');

//O(sqrt(n))
function isPrime(num) {
  for (let i = 2; i * i <= num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}

//O(sqrt(n))
function printTable(num) {
  let prime = isPrime(num);
  if (prime) {
    console.log(`${num} is a Prime Number`);
    for (let i = 1; i <= 10; i++) {
      console.log(`${num} x ${i} = ${num * i}`);
    }
  } else {
    console.log(`${num} is not a Prime Number`);
  }

  return prime;
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let num = Number(readlineSync.question('Enter Your Number :'));
    if (!Number(num)) break;
    printTable(num);
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue :"
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
