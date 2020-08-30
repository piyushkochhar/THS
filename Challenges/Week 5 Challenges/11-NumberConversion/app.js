const app = document.getElementById('app');
import { convert } from './numberLibrary.js';

app.innerHTML = `
<form>
<select name="inputType" id="inputType">
  <option value="decimal">Decimal</option>
  <option value="binary">Binary</option>
  <option value="hex">Hexadecimal</option>
</select>
<select name="outputType" id="outputType">
  <option value="binary">Binary</option>
  <option value="hex">Hexadecimal</option>
  <option value="decimal">Decimal</option>
</select>
<input type="text" id="userInputNumber"/>
<button type="submit">Convert</button>
<label for="result">Result</label>
<textarea id="result" disabled></textarea>
</form>
`;

const form = app.querySelector('form');
const inputType = form.querySelector('#inputType');
const outputType = form.querySelector('#outputType');
const userInputNumber = form.querySelector('#userInputNumber');
const textarea = form.querySelector('#result');
let result = '';

form.onsubmit = function () {
  userInputNumber.value = userInputNumber.value.toUpperCase();
  try {
    if (inputType.value === 'decimal' && outputType.value === 'binary') {
      result = convert.decimalToBinary(parseInt(userInputNumber.value));
    } else if (inputType.value === 'binary' && outputType.value === 'decimal') {
      result = convert.binaryToDecimal(parseInt(userInputNumber.value));
    } else if (inputType.value === 'decimal' && outputType.value === 'hex') {
      result = convert.decimalToHex(parseInt(userInputNumber.value));
    } else if (inputType.value === 'hex' && outputType.value === 'decimal') {
      result = convert.hexToDecimal(userInputNumber.value);
    } else if (inputType.value === 'binary' && outputType.value === 'hex') {
      result = convert.binaryToHex(Number(userInputNumber.value));
    } else if (inputType.value === 'hex' && outputType.value === 'binary') {
      result = convert.hexToBinary(userInputNumber.value);
    } else {
      result = userInputNumber.value;
    }
  } catch (err) {
    console.log(err);
  }

  if (result) renderResult(result);

  return false;
};

function renderResult(result) {
  textarea.value = result;
}
