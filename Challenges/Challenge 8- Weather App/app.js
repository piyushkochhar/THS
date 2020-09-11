const app = document.getElementById('app');
const secretkey = config.SECRET_KEY;

app.innerHTML = `      
<div class="search-bar">
    <form onSubmit="return false">
        <input type="text" placeholder="Enter your city" id="search" />
        <button type="submit" id="submit" onClick="getWeather()">
        <img src="https://www.pngfind.com/pngs/m/432-4323226_search-icon-transparent-search-button-png-png-download.png"/>
        </button>
    </form>
</div>
<div class="card visibility"></div>
<footer>
<p>
  Copyright &copy;<span id="year"></span>
  piyushkochhar.com. All Rights Reserved.
</p>
</footer>
`;

const form = app.querySelector('form');
const searchInput = app.querySelector('#search');
const submitBtn = app.querySelector('#submit');
const card = app.querySelector('.card');

const date = new Date();
const day = date.toString().slice(0, 15);

const getCityWeather = (cityName) => {
  const key = secretkey;
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=`;
  const apiCall = `${URL}${cityName}&appid=${key}`;
  return axios.get(apiCall);
};

const weather = {};

function getWeather() {
  getCityWeather(searchInput.value)
    .then((res) => {
      weather.temp = (res.data.main.temp - 273.15).toFixed(2);
      weather.feels = (res.data.main.feels_like - 273.15).toFixed(2);
      weather.humidity = res.data.main.humidity;
      weather.country = res.data.sys.country;
      weather.city = res.data.name;
      weather.type = res.data.weather[0].main;
      weather.icon = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
    })
    .then(() => {
      card.classList.remove('visibility');
      render();
    })
    .catch((err) => {
      card.classList.add('visibility');
      alert('Please Enter A Valid City!');
    });

  //   console.log(weather);
}

function render() {
  card.innerHTML = `
    <div class="card-top">
          <div class="weather-info">
            <div class="weather-temp">${weather.temp} &degC</div>
            <div class="weather-desc">${weather.type}</div>
          </div>
          <div class="weather-icon"><img src="${weather.icon}"></div>
        </div>
    <div class="card-bottom">
        <div class="country-info">
            <div class="city">${weather.city}, ${weather.country}</div>
            <div class="day">${day}</div>
        </div>
        <div class="weather-extra">
            <div class="humidity"><div class="title">Humidity</div><div class="weather-bottom-info">${weather.humidity}</div></div>
            <div class="feels"><div class="title">Feels Like</div><div class="weather-bottom-info">${weather.feels} &degC</div></div>
        </div>
    </div>
    `;
}
