const app = document.getElementById('app');
app.innerHTML = `
<header>
<h1>Calendar</h1>
<h2 id="monthAndYear"></h2>
</header>
<table id="calendar-table">

</table>
<div class="buttons">
    <button type="button" id="prev">Previous</button>
    <button type="button" id="next">Next</button>
</div>
`;

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const currMonth = month;
const currYear = year;
const currDate = date.getDate();

const monthAndYear = app.querySelector('#monthAndYear');
const calendar = app.querySelector('#calendar-table');
const btnPrev = app.querySelector('#prev');
const btnNext = app.querySelector('#next');

btnPrev.addEventListener('click', getPreviousMonth);
btnNext.addEventListener('click', getNextMonth);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function initTable() {
  monthAndYear.innerText = months[date.getMonth()] + ', ' + date.getFullYear();

  calendar.innerHTML = `
  <thead>
      <tr>
      <th id="0">Sun</th>
      <th id="1">Mon</th>
      <th id="2">Tue</th>
      <th id="3">Wed</th>
      <th id="4">Thu</th>
      <th id="5">Fri</th>
      <th id="6">Sat</th>
    </tr>
  </thead>
      `;
}

function getPreviousMonth() {
  if (month === 0) {
    month = 11;
    date = new Date(--year, month);
  } else {
    date.setMonth(--month);
  }
  render();
}

function getNextMonth() {
  if (month === 11) {
    month = 0;
    date = new Date(++year, month);
  } else {
    date.setMonth(++month);
  }
  render();
}

function render() {
  initTable();

  //To get correct month & number of days
  const new_date = new Date(year, month + 1);
  new_date.setDate(0);

  const days = new_date.getDate();

  let data = '<tr>';

  let rows = 5;

  let totalElements = 0;

  for (let i = 1; i <= days; i++) {
    new_date.setDate(i);
    const day = new_date.getDay();

    if (i === 1) {
      let spaces = day;
      while (spaces > 0) {
        data += `<td></td>`;
        spaces--;
        totalElements++;
      }
    }

    if (currDate === i && currMonth === month && currYear === year) {
      data += `<td id="current-date">${i}</td>`;
    } else if (day === 0) {
      data += `<td class="holiday">${i}</td>`;
    } else {
      data += `<td>${i}</td>`;
    }

    if (day === 6) {
      data += '</tr>';
      rows--;
    }

    totalElements++;
  }

  //To make the table of equal size for each month
  if (rows === 1 || totalElements % 7 === 0) {
    data += `<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
  }

  calendar.innerHTML += data;
}

render();
