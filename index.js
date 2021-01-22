/* global axios */
function showWeather(response) {
  document.querySelector('#current-city').innerHTML = response.data.name;
  document.querySelector('#temp').innerHTML = `${Math.round(
    response.data.main.temp,
  )}°C`;
  document.querySelector('#weather-description').innerHTML = response.data.weather[0].main;
  document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
}

function currentLocation(position) {
  const { latitude, longitude } = position.coords;
  const apiKey = '18b59ab9c913f7817c8702e31c0cd2e2';
  const urlEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
  const apiUrl = `${urlEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function searchCity(city) {
  const apiKey = '354667c76c34f536510049e3d2c575cc';
  const units = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInput = document.querySelector('#location-input');
  const currentCity = document.querySelector('#current-city');
  currentCity.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function todaysDate(date) {
  const currentDate = new Date(date);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const dayIndex = days[currentDate.getDay()];
  return `${dayIndex} ${currentDate.getDate()}, ${hours}:${minutes}`;
}
const now = new Date();
const actualDateTime = document.querySelector('#date-time');
actualDateTime.innerHTML = todaysDate(now);

const form = document.querySelector('#location-search-form');
form.addEventListener('submit', handleSubmit);

const currentButton = document.querySelector('#current');

currentButton.addEventListener('click', showCurrentWeather);

searchCity('London');
