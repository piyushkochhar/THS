const app = document.getElementById('app');

app.innerHTML = `<table></table>
                <button class="reset" onClick="reset()">Reset</button>`;

const table = app.querySelector('table');

let state = Array(10)
  .fill(0)
  .map((val, i) => Array(10).fill(0));

function initializeState() {
  for (let i = 0; i < 100; i += 10) {
    for (let j = 0; j < 10; j++) {
      state[i / 10][j] = i + j + 1;
    }
  }
}

function findMultiple(num) {
  state = state.map((row, i) => {
    return row.map((val, i) => {
      if (val % num === 0) {
        return '**';
      }
      return val;
    });
  });

  render();
}

function render() {
  let data = '';

  state.forEach((row) => {
    data += `<tr>`;
    row.forEach((val) => {
      data += `<td onClick='findMultiple(${val})'>${val}</td>`;
    });
    data += `</tr>`;
  });
  table.innerHTML = data;
}

function reset() {
  init();
}

function init() {
  initializeState();
  render();
}

init();
