var readlineSync = require('readline-sync');

//O(n)
function xorEncryptDecrypt(str, key) {
  let result = '';
  let length = str.length;
  let keyASCII = key.charCodeAt(0);

  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ keyASCII);
  }

  return result;
}

function getInputs() {
  let str = readlineSync.question('Enter Your String :');
  let key = readlineSync.question('Enter Your Key :');

  if (str && key) console.log(xorEncryptDecrypt(str, key));
}

getInputs();
