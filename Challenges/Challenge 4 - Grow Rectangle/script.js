let rectangle = document.getElementById('rectangle');
let recStyles = window.getComputedStyle(rectangle);

let width = parseInt(recStyles.getPropertyValue('width'));
let height = parseInt(recStyles.getPropertyValue('height'));

let grows = setInterval(grow, 10);

function grow() {
  if (width < 800) {
    rectangle.style.width = `${width}px`;
    rectangle.style.height = `${height}px`;
    width += 2;
    height++;
    return;
  }
  clearInterval(grows);
}
