//Algo Solutions 1 – 15

//helper functions
function isNotInteger(num,noFloats = true){
  //check for strings, objects, null, undefined, NaN and floating point
    
  let result = false;
  if(typeof num !== 'number' || Number.isNaN(num) || noFloats && Number(num) === num && num % 1 !== 0){
    result = true;
  }

  if(result){
    console.log(`Please enter a valid number`)
  }

  return result;
}

function trimFloats(num){
  return Number(num.toFixed(2))
}

function validateArr(arr,noFloats = true){
  let result;
    for(let i = 0; i < arr.length; i++){
      result = isNotInteger(arr[i],noFloats)
      if(result) return false;
    }
    return true;
}

function isArray(arr){
  if(!Array.isArray(arr)){
    console.log("Please enter an array");
    return false;
  }
  return true
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
  return isPrime
}


//Write a program to subtract two integers without using Minus (-) operator

function subtract(num1,num2){
  if(isNotInteger(num1,false) || isNotInteger(num2,false)) return;
  console.log("Subtract ",trimFloats((num1) + (~num2) + 1))
}


//Write a program to find remainder of two numbers without using modulus (%) operator

function remainder(num1,num2){
  if(isNotInteger(num1) || isNotInteger(num2)) return;
  let q = Math.floor(num1/num2);
    console.log("Remainder ",num1 - q*num2)
}

//Write a program to generate Prime Numbers less than N and Generate ‘N’ Prime Numbers/in given range.

function allPrimes(num){
  if(isNotInteger(num)) return;
  let primes = '';
  
  for(let i = 1; i < num; i++){
    if(isPrime(i)) primes += `${i} `;
  }
    console.log("Primes ",primes)
  return primes;
}

function allPrimesRange(start,end){
  if(isNotInteger(start) || isNotInteger(end)) return;
  let primes = '';
  
  for(let i = start; i <= end; i++){
    if(isPrime(i)) primes += `${i} `;
  }
    console.log("Primes ", primes)
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


/
//Write a program find GCD of the array elements given an array of numbers,

function GCD2(nums){
  if(!isArray(nums)) return
  if(!validateArr(nums)) return

  min = Math.min(...nums);
  for(let i = min; i > 0; i--){
    if(nums.every((num) => num%i === 0)){
      console.log("GCD2 ",i)
      return i
    }
  }
}

//Write a program given an array of ‘N’ numbers, find LCM of it.

function LCM(nums){
  let lcm;
  if(!isArray(nums)) return
  if(!validateArr(nums)) return

  lcm =  nums.reduce((num1,num2) => num1*num2/GCD(num1,num2))
  console.log("LCM ",lcm)
  return lcm
}

//Write a program to find the Sum of Array Elements.

function sumArr(nums){
  if(!isArray(nums)) return
  if(!validateArr(nums,false)) return

  console.log("Sum ",trimFloats(nums.reduce((curr,prev) => curr + prev)))
}

//Write a program for swapping of two arrays

function swapArr(arr1,arr2){
  if(!(isArray(arr1) && isArray(arr2))) return
  if(!validateArr(arr1,false)) return;
  if(!validateArr(arr2,false)) return;

  let temp = [];

  for(let i = arr1.length-1; i >= 0; i--){
    temp[i] = arr1[i]
    arr1.pop()
  }

  for(let i = arr2.length-1; i >= 0; i--){
    arr1[i] = arr2[i]
    arr2.pop()
  }

  for(let i = temp.length-1; i >= 0; i--){
    arr2[i] = temp[i]
    temp.pop()
  }

  console.log(arr1,arr2)
}

//Write a program to find the maximum number in an array using function

function maxNum(nums){
  if(!isArray(nums)) return
  if(!validateArr(nums,false)) return

  return trimFloats(nums.reduce((curr,prev) => {
    return curr > prev ? curr : prev
  }))
}


//Write a program to find Median of the given Array?

function median(nums){
  if(!isArray(nums)) return
  if(!validateArr(nums,false)) return

  nums.sort((a,b) => a - b);
  if(nums.length % 2 !== 0){
    return trimFloats(nums[Math.floor((nums.length)/2)]);
  }
  return trimFloats((nums[Math.floor((nums.length)/2)] + nums[Math.floor((nums.length-1)/2)])/2);
}

//Write a program to find the highest and the lowest number in array

function maxMin(nums){
  if(!isArray(nums)) return
  if(!validateArr(nums,false)) return

  let max = nums[0];
  let min = nums[0];
  let len = nums.length;

  for(let i = 0; i < len; i++){
    if(nums[i] > max) max = nums[i]
    if(nums[i] < min) min = nums[i]
  }

  max = trimFloats(max)
  min = trimFloats(min)

  console.log(max,min)
}
