/*
Write an Algorithm to extract input English Language sentence characters andconvert the characters to the 8-bit BINARY patterns.
Import the ASCII Object attached into your source code.

Note :
(a)Binary Conversion Should be done using Recursion only.   
(No Built-In libraries allowed)
(b)Take Command Line Input for Sentence (readline-sync module)
(c)OutPut should be ​8BIT​ Binaries only.
(d) Input can have special characters like /;:  etc.

Sample Input 1:AB CD
Sample Output 1 into output.txt:
[ '01000001', '01000010', '00100000', '01000011', '01000100' ]
Sample Input 2 into output.txt: CO/DE 2019
[  '01000011', '01001111',  '00101111', '01000100',  '01000101', '00100000',  '00110010', '00110000',  '00110001', '00111001']

*/

let ascii = {};

//Create an ASCII obejct
//Output: Object { char: decimal_value}
function makeAscii(){
  for(let i = 0; i < 128; i++){
    ascii[String.fromCharCode(i)] = i
  }
}

//Converts string into it's decimal equivalent
//Input: Binary string
//Output: Array of Decimal values for each charcater
function getDecimal(str){
  return str.split('').map((val) => ascii[val]);
}

//Converts decimal into binary
//Input: Decimal number
//Output: 8-bit binary string
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

//Pads 0's to binary string 
//Input: Binary string
//Output: 8-bit binary string
function addPadding(str){
  let length = str.length;
  
  for(let i = length; i < 8; i++){
    str= 0 + str;
  }

  return str;

}

//Get Binaries for all decimals values
//Input: String
//Output: Array of all binaries
function getBinaries(str){
  return getDecimal(str).map((val) => {
    return binary(val)
    })
}

makeAscii()
getBinaries('CO/DE 2019')