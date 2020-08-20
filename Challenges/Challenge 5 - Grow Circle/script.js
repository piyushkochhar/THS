let = document.getElementById('circle');
let circStyles = window.getComputedStyle(circle);

//Or use circStyles.height
// console.log(circStyles.height);

let width = parseInt(circStyles.getPropertyValue('width'));
let height = parseInt(circStyles.getPropertyValue('height'));

function grow() {
  circle.style.width = `${width}px`;
  circle.style.height = `${height}px`;
  width += 2;
  height += 2;
  if (width >= 800) {
    clearInterval(grows);
  }
}

let grows = setInterval(grow, 10);
