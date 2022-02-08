function weekInfo() {
  let weekDays = document.querySelector("#weekDay");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  weekDays.innerHTML = day;
}

function dayMonthHourInfo() {
  let dayMonth = document.querySelector("#dayMonth");
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  dayMonth.innerHTML = date + " " + month + " " + hours + ":" + minutes;
}

function showTemp(response) {
  document.querySelector("#cityName-Principal").innerHTML = response.data.name;
  document.querySelector("#temp-days").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  let iconElement = document.querySelector("#icon-principal");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
  event.preventDefault();
  let apiKey = "67913d7d175725fbd0ee22887fbda235";
  let city = document.querySelector("#enter-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let now = new Date();
let cityInput = document.querySelector("#submit-city");
weekInfo(now);
dayMonthHourInfo(now);
cityInput.addEventListener("submit", search);
