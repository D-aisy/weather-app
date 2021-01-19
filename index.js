function showCurrentWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentLocation);
  }
  
  function currentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "18b59ab9c913f7817c8702e31c0cd2e2";
    let urlEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${urlEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
    console.log(position)
  }
  
  function showWeather(response) {
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = `${Math.round(
      response.data.main.temp
    )}°C`;
  
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
  
    //document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed)
    //document.querySelector("#humidity").innerHTML=response.data.main.humidity;
    console.log(response);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#location-input");
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = cityInput.value;
    searchCity(cityInput.value);
  }
  
  function searchCity(city) {
    let apiKey = "354667c76c34f536510049e3d2c575cc";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showWeather);
  }
  
  function todaysDate(date) {
    let currentDate = new Date(date);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let hours = currentDate.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = currentDate.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = days[currentDate.getDay()];
    return `${dayIndex} ${currentDate.getDate()}, ${hours}:${minutes}`;
  }
  let now = new Date();
  let actualDateTime = document.querySelector("#date-time");
  actualDateTime.innerHTML = todaysDate(now);
  
  let form = document.querySelector("#location-search-form");
  form.addEventListener("submit", handleSubmit);
  
  let currentButton = document.querySelector("#current");
  form.addEventListener("click", showCurrentWeather);
  
  searchCity("London");
  