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

function displayTemprature(respone) {
  // console.log(respone.data);
  let tempratureElement = document.querySelector("#temprature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#city-date");

  tempratureElement.innerHTML = Math.round(respone.data.main.temp);
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
search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);
