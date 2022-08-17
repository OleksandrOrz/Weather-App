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
  console.log(res);
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
