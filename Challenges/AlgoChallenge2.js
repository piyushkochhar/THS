// Write a  program containing a function that takes in any two numbers but in the form of strings, and returns the sum of both numbers as string.

// Need :The need for this program arises because you cannot store more than 53 bits as a number in pure javascript

//Pads 0's to the smaller number
//Input: Two number strings
//Output: Array of both the equal length number strings
function addPadding(num1,num2){
  let larger = num1.length >= num2.length ? num1 : num2;
  let shorter = num1 === larger ? num2 : num1;

  while(shorter.length !== larger.length){
    shorter = 0 + shorter;
  }

  return [larger,shorter];
}

//Adds two very large numbers
//Input: Two number strings
//Output: Sum of both the numbers as string
function add(num1,num2){
let result = '';
let carry = 0;
let [n1,n2] = addPadding(num1,num2);

for(let i = n1.length - 1; i >= 0 ; i--){
  sum = Number(n1[i]) + Number(n2[i]) + carry;
    if( i !== 0 && sum < 10){
      result = sum + result;
      carry = 0;
  } else if(i !== 0 && sum > 9){
      sum = sum + '';
      result = sum[1] + result;
      carry = Number(sum[0]);
  } else{
    result = sum + result;
    carry = 0;
  }
}
  return result
}

console.log(add("5987342879234789234897", "23489072349807239487"));