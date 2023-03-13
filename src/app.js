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
  console.log(respone);
  let tempratureElement = document.querySelector("#temprature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#city-date");

  tempratureElement.innerHTML = Math.round(respone.data.main.temp);
  cityElement.innerHTML = respone.data.name;
  description.innerHTML = respone.data.weather[0].description;
  humidityElement.innerHTML = respone.data.main.humidity;
  windElement.innerHTML = Math.round(respone.data.wind.speed);
  dateElement.innerHTML = formatDate(respone.data.dt * 1000);
}

let apiKey = `0a521eaf234a3a56f45252fac3c737ad`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemprature);
