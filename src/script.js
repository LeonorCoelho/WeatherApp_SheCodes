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

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let forecastHTML = ``;

  

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `              <div class="row day">
              <div class="col forecastIcon">
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="Clear" id="icon-day-week" width="30" />
              </div>
              <div class="col forecastDay">
                                    ${forecastDay.dt}<br />
                    <span class="forecast-temp-max">
                      ${forecastDay.temp.max}
                    </span>
                    <span class="forecast-temp-min">${forecastDay.temp.min}</small>
                    </div>a
            </div><br/>`;
  });
  forecastHTML = forecastHTML;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "67913d7d175725fbd0ee22887fbda235";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "67913d7d175725fbd0ee22887fbda235";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  search(city);
}

let now = new Date();
let cityInput = document.querySelector("#submit-city");
weekInfo(now);
dayMonthHourInfo(now);
search("Lisbon");
cityInput.addEventListener("submit", handleSubmit);
