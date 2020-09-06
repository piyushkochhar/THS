const app = document.getElementById('app');

let nRows = 3;

let state = {
  numbers: Array((nRows * (nRows + 1)) / 2).fill(null),
  filledValuesCount: 0,
};

// min and max to generate numbers in pascal triangle
function generateValues(min = 1, max = 10, defautlValueCount = 2) {
  let indexVisited = [];
  while (defautlValueCount > 0) {
    index = Math.floor(getRandomIntInclusive(0, state.numbers.length - 1));
    if (!indexVisited.includes(index)) {
      indexVisited.push(index);
      state.numbers[index] = getRandomIntInclusive(min, max);
      defautlValueCount--;
      state.filledValuesCount++;
    }
  }
  //   state.numbers[1] = getRandomIntInclusive(min, max);
  //   state.numbers[5] = getRandomIntInclusive(min, max);
  //   state.filledValuesCount = defautlValueCount;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function generateRows(rows) {
  let data = '<table>';
  let index = 0;
  for (let i = 0; i < rows; i++) {
    let row = 0;
    data += '<tr>';
    while (row <= i) {
      let value = parseInt(state.numbers[index])
        ? state.numbers[index]
        : `<input type="text" onChange="addValue(event)" id=${index}></input>`;
      data += `<td>${value}</td>`;
      row++;
      index++;
    }
    data += '</tr>';
  }
  data += '</table>';
  app.innerHTML = data;
}

function checkWin() {
  if (state.filledValuesCount === state.numbers.length) {
    alert('You Win');
  }
}

function checkAddCondition(index) {
  let flag = true;
  for (let i = 0; i < nRows; i++) {
    if (i === 0) {
      if (state.numbers[0]) {
        if (!!state.numbers[i + 1] && !!state.numbers[i + 2]) {
          //   console.log('here');
          if (
            state.numbers[i] !==
            state.numbers[i + 1] + state.numbers[i + 2]
          ) {
            alert(
              `${state.numbers[i]} does not equal ${state.numbers[i + 1]} + ${
                state.numbers[i + 2]
              }`
            );
            flag = false;
            break;
          }
        }
      }
    }
    if (i >= 1) {
      if (state.numbers[i]) {
        if (!!state.numbers[i + 2] && !!state.numbers[i + 3]) {
          //   console.log('nohere', i);
          if (
            state.numbers[i] !==
            state.numbers[i + 2] + state.numbers[i + 3]
          ) {
            alert(
              `${state.numbers[i]} does not equal ${state.numbers[i + 2]} + ${
                state.numbers[i + 3]
              }`
            );
            flag = false;
            break;
          }
        }
      }
    }
  }

  return flag;
}

function addValue(event) {
  let index = Number(event.target.id);

  if (!!Number(event.target.value)) {
    state.numbers[index] = parseInt(event.target.value);
    state.filledValuesCount++;
    if (!checkAddCondition(index)) {
      state.numbers[index] = '';
      event.target.value = '';
      state.filledValuesCount--;
    }
  } else {
    event.target.value = '';
  }

  checkWin();
}

generateValues();
generateRows(nRows);
