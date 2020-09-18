const axios = require('axios');

// Get ip address, find timezone on that ip and create date obj
async function getClientDate() {
  try {
    console.clear();
    const res = await axios.get('https://api.ipify.org');
    const ip = res.data;
    const location = await axios.get(`http://ip-api.com/json/${ip}`);
    const dateString = new Date().toLocaleString('en-US', {
      timeZone: `${location.data.timezone}`,
    });

    const [month, date, year] = [...dateString.split(',', 1)[0].split('/')];

    return new Date(year, month, date);
  } catch (err) {
    console.log(err);
  }
}

//Get Tomorrow's date
// O(1)
async function getTomorrow() {
  try {
    const currDate = await getClientDate();

    const date = currDate.getDate();
    const month = currDate.getMonth();
    const year = currDate.getFullYear();

    const tomorrowDate = new Date(year, month, date + 1);

    console.log('Tomorrow is : ' + tomorrowDate.toLocaleDateString());
    console.log('-----------------------------------------');
  } catch (err) {
    console.log(err);
  }
}

// ----------------------------------------

// Get Weekends in a month

// O(days in a month)
async function getMonthWeekends(date) {
  try {
    let currDate = null;

    if (!date) {
      currDate = await getClientDate();
    } else {
      currDate = date;
    }

    //Set current date to 0 to get total days
    currDate.setDate(0);

    //Total Weekends
    let weekends = 0;

    const days = currDate.getDate();

    for (let i = 1; i <= days; i++) {
      currDate.setDate(i);

      let day = currDate.getDay();
      let dateString = currDate.toLocaleDateString() + ' is';

      switch (day) {
        case 0:
          console.log(`${dateString} Sunday`);
          weekends++;
          break;
        case 6:
          console.log(`${dateString} Saturday`);
          weekends++;
          break;
      }
    }
    console.log('-----------------------------------------');
    return weekends;
  } catch (err) {
    console.log(err);
  }
}

// -----------------------------------
//Print all Weekend dates in a year and count them.

// O(total days in a year)
async function getYearWeekends(year) {
  const currDate = await getClientDate();
  currDate.setFullYear(year);

  let totalWeekends = 0;

  for (let i = 1; i <= 12; i++) {
    currDate.setMonth(i);
    totalWeekends += await getMonthWeekends(currDate);
  }

  console.log(`Total Weekend Days in ${year} are : ${totalWeekends}`);
  console.log('-----------------------------------------');
}

// getTomorrow();
// getMonthWeekends();
getYearWeekends(1995);
