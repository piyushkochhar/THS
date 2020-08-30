const app = document.getElementById('app');

app.innerHTML = `
<form id="alarm-clock">
      <audio src="alarm-ring.mp3" id="alarm-audio" loop></audio>
      <div id="form-inputs">
        <div class="form-input">
        <label for="date"></label>
        <input type="date" id="date" name="date" required />
        </div>
        <div class="form-input">
        <label for="time"></label>
        <input type="time" id="time" name="time" required />
        </div>
      </div>
      <div id="form-buttons">
        <button type="submit" id="set-alarm" class="visibility">Set</button>
        <button type="button" id="stop-alarm" onClick="stopAlarm()" class="visibility">Stop</button>
      </div>    
</form>
`;

const form = app.querySelector('form');

const datePicker = form.querySelector('#date');

const timePicker = form.querySelector('#time');

const btnSet = form.querySelector('#set-alarm');

const btnStop = form.querySelector('#stop-alarm');

const alarmAudio = form.querySelector('#alarm-audio');

let isAlarmSet = false;

let interval = null;

form.onsubmit = function () {
  if (!isAlarmSet) {
    isAlarmSet = true;
    setAlarm();

    toggleVisibility();
  }
  return false;
};

function setAlarm() {
  isAlarmSet = false;
  interval = setInterval(function () {
    const currDate = new Date();
    if (
      datePicker.value === currDate.toISOString().slice(0, 10) &&
      timePicker.value === currDate.toTimeString().slice(0, 5)
    ) {
      alarmAudio.play();
      clearInterval(interval);
    }
  }, 1000);
}

function stopAlarm() {
  alarmAudio.pause();
  toggleVisibility();
}

function toggleVisibility() {
  btnStop.classList.toggle('visibility');
  btnSet.classList.toggle('visibility');
}

function init() {
  const currDate = new Date();
  datePicker.value = currDate.toISOString().slice(0, 10);
  timePicker.value = currDate.toTimeString().slice(0, 5);

  btnSet.classList.toggle('visibility');
}

init();
