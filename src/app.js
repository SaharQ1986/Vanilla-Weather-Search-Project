function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuts = date.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}  ${hours}:${minuts}`;
}
function setDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forcastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  //
  dailyForecast.forEach(function (forecastDay, index) {
    let maxTemp = Math.round(forecastDay.temp.max);
    let minTemp = Math.round(forecastDay.temp.min);
    let dailyIcon = forecastDay.weather[0].icon;
    if (index < 6) {
      forecastHTML += `
              <div class="col-2">
                <div class="weather-forcast-day">${setDay(forecastDay.dt)}</div>
                
                <img
                  src="http://openweathermap.org/img/wn/${dailyIcon}@2x.png"
                  alt=""
                  width="50"
                />
                <div class="weather-forcast-temps">
                  <span class="maximum-temp">${maxTemp}°</span>
                  <span class="minimum-temp">${minTemp}°</span>
                </div>
              </div>`;
    }
  });

  forecastHTML += `</div>`;
  forcastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `203fa770242fcd2b9555d832a88ea567`;

  let apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiCall).then(showForecast);
}

function displayTemprature(respone) {
  // console.log(respone.data);
  let tempratureElement = document.querySelector("#temprature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#city-date");

  celsiusTemperature = respone.data.main.temp;

  tempratureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = respone.data.name;
  description.innerHTML = respone.data.weather[0].description;
  humidityElement.innerHTML = respone.data.main.humidity;
  windElement.innerHTML = Math.round(respone.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${respone.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", respone.data.weather[0].description);
  dateElement.innerHTML = formatDate(respone.data.dt * 1000);

  getForecast(respone.data.coord);
}

function search(city) {
  let apiKey = `203fa770242fcd2b9555d832a88ea567`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemprature);
}

function handlesubmit(e) {
  e.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput);
  search(cityInput.value);
}

function displayFahrenheitTemprature(e) {
  e.preventDefault();
  let tempratureElement = document.querySelector("#temprature");
  //remove the active class celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemprature = Math.round(celsiusTemperature * 1.8 + 32);
  tempratureElement.innerHTML = fahrenheitTemprature;
}

function displayCelsiusTemprature(e) {
  e.preventDefault();
  let tempratureElement = document.querySelector("#temprature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  tempratureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemprature);

fahrenheitLink.addEventListener("click", displayFahrenheitTemprature);

search("New York");
// showForecast();
