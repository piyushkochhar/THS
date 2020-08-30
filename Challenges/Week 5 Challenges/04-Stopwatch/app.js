const app = document.getElementById('app');

app.innerHTML = `
<div id="stopwatch">
    <audio src="click.mp3" id="click"></audio>
    <audio src="ticking.mp3" id="tick" loop></audio>
    <div class="time">
    <span id="minutes"></span>
    <span id="seconds"></span>
    <span id="milliseconds"></span>
    </div>
    <div class="controls">
        <button class="btn start visibility" onClick="init();playTick()">Start</button>
        <button class="btn stop"  onClick="stop();">Stop</button>
        <button class="btn resume " onClick="resume();">Resume</button>
        <button class="btn reset " onClick="reset();">Reset</button>
    </div>
</div>
`;

let isStopped = false;

const event = new Date();
let interval = null;

const time = app.querySelector('.time');
const minutes = time.querySelector('#minutes');
const seconds = time.querySelector('#seconds');
const milliseconds = time.querySelector('#milliseconds');
const buttons = app.querySelectorAll('button');
const clickSound = app.querySelector('#click');
const tickSound = app.querySelector('#tick');

function playClick() {
  clickSound.play();
}

function playTick() {
  tickSound.play();
}

function reset() {
  event.setMinutes(0);
  event.setSeconds(0);
  event.setMilliseconds(0);

  stop();
  render();
  toggleStyles();
}

function render() {
  minutes.innerText = event.getMinutes();
  seconds.innerText = ' : ' + event.getSeconds();
  let ms = event.getMilliseconds();
  if (ms === 0) {
    milliseconds.innerText = ' : ' + ms + '0';
  } else {
    milliseconds.innerText = ' : ' + ms / 10;
  }
}

function resume() {
  if (isStopped) {
    tickSound.play();
    interval = setInterval(function () {
      let ms = event.getMilliseconds();
      render();
      ms += 100;
      event.setMilliseconds(ms);
    }, 100);

    isStopped = false;
    render();
  }
}

function stop() {
  isStopped = true;
  tickSound.pause();
  clearInterval(interval);
}

function toggleStyles() {
  buttons.forEach((btn, i) => {
    btn.classList.toggle('visibility');
    btn.addEventListener('click', playClick);
  });
}

function init() {
  reset();
  resume();
}

reset();
