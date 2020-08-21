const app = document.getElementById('app');

app.innerHTML = `<h3><img src="https://static.wixstatic.com/media/fef1e4_141cd29fc9624b23a4d2ad922dbcb149~mv2.png/v1/fill/w_220,h_220,al_c,q_85,usm_0.66_1.00_0.01/trophy.webp" class="trophy-head"/> : <span id="trophies"></span></h3>
                <table></table>
                <button class="reset" onClick="reset()">Reset</button>
                <audio id="pop" src="https://felgo.com/web-assets/pop.wav"></audio>
                <audio id="game-over" src="game-over-sound-effect.mp3"></audio>`;

const table = app.querySelector('table');
const h3 = app.querySelector('h3');
const trophies = app.querySelector('#trophies');
const btn = app.querySelector('.reset');
const audio = app.querySelector('#pop');
const audioEnd = app.querySelector('#game-over');

let state = {
  data: [],
  trophies: null,
  bombs: [],
};

function initState() {
  for (let i = 0; i < 100; i++) {
    let value = getRandom();
    let isBomb = false;
    state.data[i] = {
      value,
      isBomb,
    };
  }
  state.trophies = 0;
  state.bombs = Array.from({ length: 3 }).map((val) => getRandom());
}

function getRandom() {
  return Math.floor(Math.floor(Math.random() * (100 - 1) + 1));
}

function findMultiples(num) {
  audio.play();
  state.data.forEach((data) => {
    // if (findBomb(num) && num === data.value) {
    //   data.isBomb = true;
    // }
    if (data.value % num === 0 && !findBomb(data.value)) {
      state.trophies++;
      data.value = '**';
    } else if (data.value % num === 0 && findBomb(data.value)) {
      data.isBomb = true;
    }
  });

  render();
}

function findBomb(num) {
  return state.bombs.includes(num);
}

function render() {
  let data = '';
  let value = null;
  state.data.forEach((val, i) => {
    if (val.value === '**') {
      value = `<td><img src="https://static.wixstatic.com/media/fef1e4_141cd29fc9624b23a4d2ad922dbcb149~mv2.png/v1/fill/w_220,h_220,al_c,q_85,usm_0.66_1.00_0.01/trophy.webp" class="trophy-img"/></td>`;
    } else if (val.isBomb) {
      value = `<td><img src="https://media.giphy.com/media/l378c6HXBGxfyF92E/giphy.gif" class="bomb-img"/></td>`;
      stylesOnBomb();
      audioEnd.play();
    } else {
      value = `<td onClick='findMultiples(${val.value})'>${val.value}</td>`;
    }

    if ((i + 1) % 10 === 1) {
      data += '<tr>';
      data += value;
    } else if ((i + 1) % 10 === 0) {
      data += value;
      data += '</tr>';
    } else {
      data += value;
    }
  });

  table.innerHTML = data;
  trophies.innerText = state.trophies;
}

function stylesOnBomb() {
  btn.innerText = 'Start Over';
  btn.style.backgroundColor = '#cf1b1b';
  h3.innerText = `You Lost! Try Again `;
}

function resetStyles() {
  btn.innerText = 'Reset';
  btn.style.backgroundColor = '#00d4ff';
  h3.innerHTML = `<img src="https://static.wixstatic.com/media/fef1e4_141cd29fc9624b23a4d2ad922dbcb149~mv2.png/v1/fill/w_220,h_220,al_c,q_85,usm_0.66_1.00_0.01/trophy.webp" class="trophy-head"/> : <span id="trophies">${state.trophies}</span>`;
}

function reset() {
  init();
  resetStyles();
}

function init() {
  // O(n)
  initState();
  // O(n)
  render();
  console.log(state.bombs);
}

init();
