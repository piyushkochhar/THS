const app = document.querySelector('#app');

app.innerHTML = `<div id="battery-level"></div>
<progress></progress>
<div id="battery-info"></div>`;

const batteryLevel = app.querySelector('#battery-level');
const progress = app.querySelector('progress');
const batteryInfo = app.querySelector('#battery-info');

navigator.getBattery().then(function (battery) {
  progress.max = 100;
  progress.value = battery.level * 100;
  setColor(progress.value);
  let text = '';

  batteryLevel.innerText = roundToTwo(progress.value) + '%';

  battery.onlevelchange = function () {
    progress.value = battery.level * 100;
    batteryLevel.innerText = roundToTwo(progress.value) + '%';
    setColor(progress.value);
  };
});

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

function setColor(batteryLevel) {
  console.log(batteryLevel);
  if (batteryLevel <= 30) {
    progress.className = 'low';
  } else if (batteryLevel <= 60) {
    progress.className = 'fair';
  } else {
    progress.className = 'good';
  }
}
