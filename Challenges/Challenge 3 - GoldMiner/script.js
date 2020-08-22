const app = document.getElementById('app');

app.innerHTML = `<h3><img src="https://pngimage.net/wp-content/uploads/2019/05/facebook-logo-gold-png-.png" class="gold-head"/> : <span id="trophies"></span></h3>
                <table></table>
                <button class="reset" onClick="reset()">Reset</button>
                <audio id="pop" src="https://felgo.com/web-assets/pop.wav"></audio>
                <audio id="game-over" src="game-over-sound-effect.mp3"></audio>`;

const table = app.querySelector('table');
const h3 = app.querySelector('h3');
const h3Content = h3.innerHTML;
const trophies = app.querySelector('#trophies');
const btn = app.querySelector('.reset');
const audio = app.querySelector('#pop');
const audioEnd = app.querySelector('#game-over');

let state = {
  data: [],
  trophies: null,
  bombs: [],
  gameOver: null,
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
  state.gameOver = false;
}

function getRandom() {
  return Math.floor(Math.floor(Math.random() * (100 - 2) + 2));
}

function findMultiples(num) {
  audio.play();
  state.data.forEach((data) => {
    if (data.value % num === 0 && !findBomb(data.value)) {
      ++state.trophies;
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
      value = `<td><img src="https://cdn3.iconfinder.com/data/icons/finance-152/64/29-512.png" class="gold-img"/></td>`;
    } else if (val.isBomb) {
      value = `<td><img src="https://media.giphy.com/media/l378c6HXBGxfyF92E/giphy.gif" class="bomb-img"/></td>`;
      state.gameOver ? state.gameOver : (state.gameOver = stylesOnBomb());
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
  var node = document.createElement('P');
  var textnode = document.createTextNode('You Lost! Try Again.'); // Create a text node
  node.appendChild(textnode);
  h3.append(node);
  return true;
}

function resetStyles() {
  btn.innerText = 'Reset';
  btn.style.backgroundColor = '#00d4ff';
  if (h3.querySelector('p')) {
    h3.removeChild(h3.querySelector('p'));
  }
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
  // console.log(state.bombs);
}

init();
