let apiKey = "b0ce35cd54f47a37e37cfe580baaccdd";
// Current day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = now.getHours();
let min = now.getMinutes();

if (hour < 10) {
  hour = "0" + hour;
}
if (min < 10) {
  min = "0" + hour;
}
document.querySelector("#time").innerHTML = `${
  days[now.getDay()]
} ${hour}:${min}. `;

// City search
function currentWeatherCity(res) {
  document.querySelector("h1").innerHTML = `${res.data.name}`;
  document.querySelector("#humidity").innerHTML = `${res.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    res.data.wind.speed
  )} km/h`;
  document.querySelector("#temp").innerHTML = Math.round(res.data.main.temp);
  document.querySelector("#description").innerHTML =
    res.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
    );
  celTemperature = res.data.main.temp;

  forecastApi(res.data.coord);
}
function citySearch(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
    document.querySelector("input").value
  }&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeatherCity);
}
document.querySelector("form").addEventListener("submit", citySearch);

// City by default
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(currentWeatherCity);

// Weather in current location
function findLoc(res) {
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${res.coords.latitude}&lon=${res.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeatherCity);
}
function curLoc() {
  let navig = navigator.geolocation.getCurrentPosition(findLoc);
  console.log(navig);
}
document.querySelector("#currentLocation").addEventListener("click", curLoc);
// celsius and fahrenheit
function fahrConvertation(event) {
  event.preventDefault();
  cel.classList.remove("active");
  fahr.classList.add("active");
  document.querySelector("#temp").innerHTML = Math.round(
    celTemperature * 1.8 + 32
  );
}
function celConvertation(event) {
  event.preventDefault();
  cel.classList.add("active");
  fahr.classList.remove("active");
  document.querySelector("#temp").innerHTML = Math.round(celTemperature);
}
let celTemperature = null;
document.querySelector("#fahr").addEventListener("click", fahrConvertation);
document.querySelector("#cel").addEventListener("click", celConvertation);

// day transform
function day(ms) {
  let day = new Date(ms * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayF = day.getDay();
  return days[dayF];
}
// forecast
function forecast(res) {
  let forecastDays = res.data.daily;
  let forecast = "";
  forecastDays.forEach(function (forecastW, index) {
    if (index < 6) {
      console.log(forecastW);
      forecast =
        forecast +
        `
  <div class="col-sm forecastW">
   <div class="forecastDay">${day(forecastW.dt)}</div>
   <div class="forecastIcon"><img src="http://openweathermap.org/img/wn/${
     forecastW.weather[0].icon
   }@2x.png" width=70></div>
   <div class="forecastTemp">
     <span class="forecastMaxTemp">${Math.round(forecastW.temp.max)}°</span>
     <span class="forecastMinTemp">${Math.round(forecastW.temp.min)}° </span>
   </div>
  </div>`;
    }
  });

  document.querySelector("#forecast").innerHTML = forecast;
}

function forecastApi(res) {
  let apiUrlF = `https://api.openweathermap.org/data/2.5/onecall?lat=${res.lat}&lon=${res.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlF).then(forecast);
}
