// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// Default key = 710d78cb0fa0f5e946b69eb4768739d5
// key 2 = b5e11344a96129c20d631821aae657c7
const weatherApi = {
  key: "b5e11344a96129c20d631821aae657c7",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

// EventListener Function on keypress
const searchInputBox = document.getElementById("input-box");
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-details").style.display = "block";
  }
});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
  console.log(weather);
  let city = document.getElementById("city");
  city.innerText = `${weather.name},${weather.sys.country}`;
  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C(max)`;
  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clearimg.jpg')";
  } else if (weatherType.textContent == "Sunny") {
    document.body.style.backgroundImage = "url('images/sunny.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloudimg.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/cloudimg.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rainimg.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snowfall.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
  }
}

// Date Manage
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let day = days[dateArg.getDay()];
  let date = dateArg.getDate();

  return `${date} ${month} (${day}) ${year}`;
}
