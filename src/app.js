function displayTemprature(respone) {
  console.log(respone);
  let tempratureElement = document.querySelector("#temprature");
  tempratureElement.innerHTML = Math.round(respone.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = respone.data.name;
  let description = document.querySelector("#weather-description");
  description.innerHTML = respone.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = respone.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(respone.data.wind.speed);
}

let apiKey = `a1e3ad83f9c55b1988611b4f77512fe8`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemprature);
