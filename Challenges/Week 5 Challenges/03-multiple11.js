var readlineSync = require('readline-sync');
var num = null;

while (true) {
  num = Number(readlineSync.question('Enter Your Number :'));
  if (num % 11 === 0) break;
  console.log(`${num} is not multiple of 11.Try again.`);
}
