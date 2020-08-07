//Algo Solutions 1 – 10

//helper functions
function isNotInteger(num){
  //check for strings, objects, null, undefined, NaN and floating point
    
  let result = false;
  if(typeof num !== 'number' || Number.isNaN(num) || Number(num) === num && num % 1 !== 0){
    result = true;
  }

  if(result){
    console.log(`Please enter a valid number`)
  }

  return result;
}

//Write a program to given input Check whether Even or odd.

function isEvenOdd(num){
  if(isNotInteger(num)) return;
  result = 'Odd'
  if(num%2==0){result = 'Even'};
  
  return `${num} is ${result}`
}


//Write a program to Generate Even and Odd Number less than N and Generate ‘N’ Even and Odd Numbers.

function evenOddLessThanN(num){
  if(isNotInteger(num)) return;

  for(let i = 0; i < num; i++){
    if(i%2 == 0){console.log(`${i} is Even`)}
    else {
     console.log(`${i} is Odd`)
    }
  }
}


function evenOddN(num){
  if(isNotInteger(num)) return;

  let even = '';
  let odd = '';

  for(let i = 0; i < num*2; i++){
    if(i%2 == 0) even += `${i} `;
    else {
     odd += `${i} `;
    }
  }

  console.log(`Even: ${even}\n Odd: ${odd}`);
}


//Write a program to decide given N is Prime or not.

function isPrime(num){
  if(isNotInteger(num)) return;

  let isPrime = true
  
  for(let i = 2 ; i <= num/2; i++){
    if(num % i === 0){
      isPrime = false
      break;
    }
  }
  if(isPrime){return true}
  return false
}

//Write a program to subtract two integers without using Minus (-) operator

function subtract(num1,num2){
  if(isNotInteger(num1) || isNotInteger(num2)) return;
  return (num1) + (~num2) + 1
}

//Write a program to find remainder of two numbers without using modulus (%) operator

function remainder(num1,num2){
  if(isNotInteger(num1) || isNotInteger(num2)) return;
  let q = Math.floor(num1/num2);
  return num1 - q*num2
}

//Write a program to generate Prime Numbers less than N and Generate ‘N’ Prime Numbers/in given range.

function allPrimes(num){
  if(isNotInteger(num)) return;
  let primes = '';
  
  for(let i = 1; i < num; i++){
    if(isPrime(i)) primes += `${i} `;
  }
  return primes;
}

function allPrimesRange(start,end){
  if(isNotInteger(start) || isNotInteger(end)) return;
  let primes = '';
  
  for(let i = start; i <= end; i++){
    if(isPrime(i)) primes += `${i} `;
  }
  return primes;
}

//Write a program that prints the numbers from 1 to 100 and for multiples of '3' print "Fizz" instead of the number and for the multiples of '5' print "Buzz".

function fizzBuzz(){
  for(let i = 1; i <= 100; i++){
    if(i % 15 == 0){
      console.log("FizzBuzz")
    } else if(i % 5 == 0){
      console.log("FizzBuzz")
    }
    else if(i % 3 == 0){
      console.log("Fizz")
    }
    else {
      console.log(i)
    }
  }
}

//Write a program to find GCD (Greatest Common Divisor) or HCF (Highest Common Factor) of two numbers is the largest number that divides both of them using recursion.

function GCD(num1, num2, i = Math.min(num1,num2)){

  if(isNotInteger(num1) || isNotInteger(num2)) return;

  if(i === 1){return 1;}
  else if(num1 % i === 0 && num2 % i === 0){
    return i;
  }
  else {
    return GCD(num1,num2,i-1)
  }
}

//Write a program find GCD of the array elements given an array of numbers,

function GCD2(...nums){
  min = Math.min(...nums)

  if(nums.some((num) => isNotInteger(num))) return;

  for(let i = min; i > 0; i--){
    if(nums.every((num) => num%i === 0)){
      return i
    }
  }
}

//Write a program given an array of ‘N’ numbers, find LCM of it.

function LCM(...nums){

  if(nums.some((num) => isNotInteger(num))) return;

  return nums.reduce((num1,num2) => num1*num2/GCD(num1,num2))
}

