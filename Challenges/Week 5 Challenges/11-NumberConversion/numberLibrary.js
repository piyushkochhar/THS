//O(log n)
function binaryToDecimal(num) {
  let decimal = 0;
  let power = 0;
  while (num > 0) {
    let rem = num % 10;
    num = Math.floor(num / 10);
    decimal += rem * Math.pow(2, power++);
  }
  return decimal;
}

// O(log n)
function decimalToBinary(num) {
  let binary = 0;
  let power = 0;
  while (num > 0) {
    let rem = num % 2;
    num = Math.floor(num / 2);
    binary += rem * Math.pow(10, power++);
  }

  return binary;
}

// O(log n)
function decimalToHex(num) {
  let values = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F',
  };
  let hex = '';
  while (num > 0) {
    let rem = num % 16;
    num = Math.floor(num / 16);
    if (values[rem]) hex = values[rem] + hex;
    else {
      hex = rem + hex;
    }
  }

  return hex;
}

// O(log n)
function hexToDecimal(hex) {
  let values = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };
  let decimal = 0;
  let length = hex.length;

  for (let i = 0; i < length; i++) {
    if (values[hex[i]]) {
      decimal += values[hex[i]] * Math.pow(16, length - i - 1);
    } else {
      decimal += hex[i] * Math.pow(16, length - i - 1);
    }
  }

  return decimal;
}

// O(log n * log n)
function binaryToHex(num) {
  let values = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F',
  };
  let hex = '';

  while (num != 0) {
    let rem = num % 10000;
    num = Math.floor(num / 10000);
    let decimal = binaryToDecimal(rem);
    if (values[decimal]) {
      hex = values[decimal] + hex;
    } else {
      hex = decimal + hex;
    }
  }

  return hex;
}

function padZero(str) {
  while (str.length !== 4) {
    str = '0' + str;
  }
  return str;
}

// O(log n * log n)
function hexToBinary(hex) {
  let values = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };
  let binary = '';
  let length = hex.length;
  for (let i = 0; i < length; i++) {
    if (values[hex[i]]) {
      binary += padZero('' + decimalToBinary(values[hex[i]]));
    } else {
      binary += padZero('' + decimalToBinary(hex[i]));
    }
  }

  return binary;
}

export const convert = {
  binaryToDecimal,
  decimalToBinary,
  decimalToHex,
  hexToDecimal,
  binaryToHex,
  hexToBinary,
};
