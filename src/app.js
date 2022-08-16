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
let time = document.querySelector("#time");
time.innerHTML = `${days[now.getDay()]} ${hour}:${min}`;
