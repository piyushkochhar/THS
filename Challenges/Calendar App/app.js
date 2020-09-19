const app = document.getElementById('app');
app.innerHTML = `
<header>
<h1>Calendar App</h1>
<h2 id="month"></h2>
</header>
<table id="month-table">

</table>
    <button type="button" id="prev">Previous</button>
    <button type="button" id="next">Next</button>
`;

const month = app.querySelector('#month');
const monthTable = app.querySelector('#month-table');
const monthDays = monthTable.querySelector('#month-days');
const btnPrev = app.querySelector('#prev');
const btnNext = app.querySelector('#next');
btnPrev.addEventListener('click', getPreviousMonth);
btnNext.addEventListener('click', getNextMonth);

const date = new Date();

const currDay = date.getDate();
const currMonth = date.getMonth();
const currYear = date.getFullYear();

let monthVal = currMonth;

//set the current month
date.setMonth(currMonth + 1);

//get total days in a month
date.setDate(0);

const totalDays = date.getDate();

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
  monthTable.innerHTML = `
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

function render() {
  initTable();

  let _month = date.getMonth();
  let _year = date.getFullYear();
  //   console.log(_month);

  let data = '<tr>';
  for (let i = 1; i <= totalDays; i++) {
    date.setDate(i);
    let day = date.getDay();
    // let _month = date.getMonth();
    //to get spaces in cells if day doesnt start on sunday
    if (i === 1) {
      let spaces = day;
      while (spaces > 0) {
        data += `<td></td>`;
        spaces--;
      }
    }

    if (currDay === i && currMonth === _month && currYear === _year) {
      data += `<td id="current-date">${i}</td>`;
    } else if (day == 0) {
      data += `<td class="holiday">${i}</td>`;
    } else {
      data += `<td>${i}</td>`;
    }

    if (day === 6) {
      data += '</tr>';
    }
  }
  data += '</tr>';

  month.innerText = months[_month] + ', ' + date.getFullYear();
  monthTable.innerHTML += data;
}

function getPreviousMonth() {
  date.setMonth(--monthVal);
  console.log(date.getMonth(), monthVal);
  render();
}

function getNextMonth() {
  date.setMonth(++monthVal);
  //   console.log(date.getMonth());
  render();
}

render();
