/*
WriteanAlgorithmtoextractinputEnglishLanguagesentencecharactersandconvertthecharacterstothe8-bitBINARYpatterns.ImporttheASCIIObjectattached into your source code.

Note :(a)Binary Conversion Should be done using Recursion only.   (No Built-In libraries allowed)(b)Take Command Line Input for Sentence (readline-sync module)(c)OutPut should be ​8BIT​ Binaries only.(d) Input can have special characters like /;:  etc.

WriteanAlgorithmtoextractinputEnglishLanguagesentencecharactersandconvertthecharacterstothe8-bitBINARYpatterns.ImporttheASCIIObjectattached into your source code.
Note :
(a)Binary Conversion Should be done using Recursion only.   (No Built-In libraries allowed)
(b)Take Command Line Input for Sentence (readline-sync module)
(c)OutPut should be ​8BIT​ Binaries only.
(d) Input can have special characters like /;:  etc.,
Sample Input 1:AB CD
Sample Output 1 into output.txt:
[ '01000001', '01000010', '00100000', '01000011', '01000100' ]
Sample Input 2 into output.txt: CO/DE 2019
[  '01000011', '01001111',  '00101111', '01000100',  '01000101', '00100000',  '00110010', '00110000',  '00110001', '00111001']

(e) Add error detection using checksum

*/

let ascii = {};

function makeAscii(){
  for(let i = 0; i < 128; i++){
    ascii[String.fromCharCode(i)] = i
  }
}

makeAscii()

function getDecimal(str){
  return str.split('').map((val) => ascii[val]);
}

function binary(num){
  let result = '';

  function calcBinary(num){
    if(num === 0) {
      result = 0 + result;
      return;
    };
    result = (num%2) + result;
    return calcBinary(Math.floor(num/2));
  }

  calcBinary(num)
  return addPadding(result);

}

function addPadding(num){
  let length = num.length;
  
  for(let i = length; i < 8; i++){
    num = 0 + num;
  }

  return num;

}

function getBinaries(str){
  return getDecimal(str).map((val) => {
    return binary(val)
    })
}

getBinaries('CO/DE 2019')