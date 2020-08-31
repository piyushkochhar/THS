const goldenRatioDivs = document.querySelectorAll('.golden-ratio-div');

goldenRatioDivs.forEach((div) => {
  div.style.backgroundColor = `rgb(${getRandom()}, ${getRandom()},${getRandom()})`;
});

// Between0And255
function getRandom() {
  return Math.floor(Math.random() * (255 - 0 + 1) + 0);
}
