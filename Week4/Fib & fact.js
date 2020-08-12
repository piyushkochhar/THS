//Recursive and Iterative solutions for fibonacci and factorial

function fibRec(num,result){
    if(num <= 0){
      return 0;
    }
    if(num === 1){
      return 1
    }
    else{
        fib = fibRec(num-1,result) + fibRec(num-2,result)
        result[num] = fib
        return fib
      }
    }

  function fib(num){
    var result = [0,1]
    if(num === 0) return;
    if(num === 1) return '0';
    var r = fibRec(--num,result);
    console.log(result.join(' '))
  }

//----------------------------------------

function fibIte(num){
  let result = [0,1];

  for(let i = 2; i < num;i++){
    result[i] = result[i-1] + result[i-2];
  }

  if(num === 0) return ;
  if(num === 1) return '0';
  return result.join(' ')
}

fibIte(10)

//----------------------------------------

function factRec(num){
  if(num <= 1) return 1;
  else {
    return num * factRec(num-1)
  }
}

factRec(5)

//----------------------------------------
function factIte(num){
  let result = 1;

  for(let i = 0; i < num; i++){
    result *= (num-i)
  }

  return result

}