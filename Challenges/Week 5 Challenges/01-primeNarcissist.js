var readlineSync = require('readline-sync');
//O(sqrt(n))
function isPrime(num) {
  for (let i = 2; i * i <= num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true && num !== 1;
}

//O(log n * log n)
function isNarcissistic(number) {
  let sum = 0;
  let result = false;
  let num = number;
  let power = Math.floor(Math.log10(number) + 1);

  while (num !== 0) {
    sum += Math.pow(num % 10, power);
    num = parseInt(num / 10);
  }
  if (number === sum) {
    result = true;
  }
  return result;
}

//O(sqrt(n)) + O((log n * log n)
function getPrimesAndNarcissistic(arr) {
  let primes = 0;
  let nars = 0;
  let result = [];
  let primeResult, narResult;

  arr.forEach((num) => {
    primeResult = isPrime(Number(num));
    narResult = isNarcissistic(Number(num));

    if (primeResult && narResult) {
      primes++;
      nars++;
    } else if (primeResult) {
      primes++;
    } else if (narResult) {
      nars++;
    } else {
      result.push(num);
    }
  });

  console.log('Prime Numbers Count : ', primes);
  console.log('Narcissistic Numbers Count : ', nars);
  console.log('The updated array : ', result);
}

function getInputs() {
  let takeInputs = true;
  while (takeInputs) {
    let arr = readlineSync.question('Enter comma separated array values : ');
    if (arr.length > 0) getPrimesAndNarcissistic(arr.split(','));
    let input = readlineSync.question(
      "Press 'N' to Terminate or 'Y' to continue : "
    );

    if (input === 'N' || input === 'n') {
      takeInputs = false;
    }
  }
}

getInputs();
