/*

Update AlgoChallenge 1 to include error detection

(e) Add error detection using checksum

*/

let ascii = {};

function makeAscii(){
  for(let i = 0; i < 128; i++){
    ascii[String.fromCharCode(i)] = i
  }
}

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

function addPadding(str){
  let length = str.length;
  
  for(let i = length; i < 8; i++){
    str= 0 + str;
  }

  return str;

}

function getBinaries(str){
  return getDecimal(str).map((val) => {
    return binary(val)
    })
}

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

function getSum(binaries){
  return binaries.reduce((prev,curr) => truncateBinary(addBinary(prev,curr)))
}

function truncateBinary(str){
  let extraBits = str.length - 8;
  if(extraBits > 0){
    return addBinary(str.slice(extraBits),addPadding(str.slice(0,extraBits)))
  }
  return str
}

function checksum(str){
  return str.split('').map((num,i) => {
    if(num === '0') return '1';
    return '0'
  }).join('')
}

function getBinaries(str){
  return getDecimal(str).map((val) => {
    return binary(val)
    })
}

function sender(str){
  let binaries = getBinaries(str);
  let chsum = checksum(getSum(binaries));
  let data = [chsum,...binaries]
  console.log("Sending....\n",data)
  return data
}

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
