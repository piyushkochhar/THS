//Extend AlgoChallenge1 to include error detection using checksum
//Read more about error detection algos on greeksforgeeks

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
//Input: ASCII String
//Output: Array of all binaries
function getBinaries(str){
  return getDecimal(str).map((val) => {
    return binary(val)
    })
}

//Adds two 8-bit binaries
//Input: Takes 2 8-bit binary strings
//Output: Truncated 8-bit binary string
function addBinary(num1,num2){
  let carry = 0;
  let result = '';

  if(Math.max(num1.length,num2.length) > 8){
    console.log('Data exceeds more than 8 bits')
    return addPadding('0')
  }

  for(let i = 7; i >= 0; i--){
    let sum = Number(num1[i]) + Number(num2[i]) + carry;
    if(sum === 0){
      result = 0 + result;
      carry = 0;
    }
    else if(sum === 1){
      result = 1 + result;
      carry = 0;
    }
    if(i !== 0){
      if(sum === 2){
      result = 0 + result;
      carry = 1
    }
      else if(sum === 3){
        result = 1 + result;
        carry = 1
      }
    }
    if( i === 0){
      if(sum === 2){
      result = 10 + result;
      carry = 0
    }
      else if(sum === 3){
        result = 11 + result;
        carry = 1
      }
    }
  }
  return result;
}

//Adds two 8-bit binaries
//Input: Takes 2 8-bit binary strings
//Output: Truncated 8-bit binary string
function getSum(binaries){
  return binaries.reduce((prev,curr) => truncateBinary(addBinary(prev,curr)))
}

//Add extra bits to the rightmost 8 binary bits
//Input: 8-bit binary string
//Output: 8-bit binary string with added bits
function truncateBinary(str){
  let extraBits = str.length - 8;
  if(extraBits > 0){
    return addBinary(str.slice(extraBits),addPadding(str.slice(0,extraBits)))
  }
  return str
}

//Performs 1's complement of the 8-bit binary
//Input: Sum of all binaries
//Output: Inverse of 8-bit binary string
function checksum(sum){
  return sum.split('').map((num,i) => {
    if(num === '0') return '1';
    return '0'
  }).join('')
}

//Sends the data
//Input: ASCII String
//Output: Array of checksum at 0th position followed by
//8-bit binary equivalent string values of each character
function sender(str){
  let binaries = getBinaries(str);
  let chsum = checksum(getSum(binaries));
  let data = [chsum,...binaries]
  console.log("Sending....\n",data)
  return data
}

//Checks the data sent by sender
//Input: Data sent by sender (Array of checksum & 8-bit binaries)
//Output: Sum of all the binaries in input array
function receiver(data){
  console.log("Received...\n",data);
  
  let sum = getSum(data);

  console.log("Sum is",sum);

  if(sum === '11111111') {
    console.log("Data is safely retrieved 😁");
  } else {
    console.log("Sum should be 11111111");
    console.log("Data is corrupted 😱");
  }

  return sum;
}

makeAscii()

let data = sender('CO/DE 2019');

// data[1] = '010000111'

receiver(data)
