const app = document.querySelector('#app');

app.innerHTML = `<form >
                    <label for="stringInput">Enter your String:</label>
                    <input type="text" id="stringInput" />
                    <button type="submit">Submit</button>
                </form>`;

let form = app.querySelector('form');
let input = app.querySelector('input');

form.onsubmit = function () {
  getASCII(input.value);
};

function getASCII(str) {
  let result = 'ASCII Values: ';
  let length = str.length;
  for (let i = 0; i < length; i++) {
    result += str[i].charCodeAt(0) + ', ';
  }

  alert(result);
}
