// Search Input
let searchInput = document.querySelector("#inputLocation");
let findBtn = document.querySelector("#FindBtn")

// First Day
let today = document.querySelector("#currentDay");
let currentDate = document.querySelector("#currentDate");
let currentMonth = document.querySelector("#currentMonth");
let cityName = document.querySelector("#cityName");
let temp = document.querySelector("#temp");
let tempIcon = document.querySelector("#tempIcon");
let text = document.querySelector("#text");
let humidity = document.querySelector("#humidity");
let windKph = document.querySelector("#wind_kph");
let windDir = document.querySelector("#wind_dir");

// Next Day
let nextDay = document.querySelector("#nextDay");
let nextTempIcon = document.querySelector("#nextTempIcon");
let secondTempBig = document.querySelector("#secondTempBig");
let secondTempSmall = document.querySelector("#secondTempSmall");
let secondText = document.querySelector("#secondText");

// Coming Day
let comingDay = document.querySelector("#comingDay");
let thirdIcon = document.querySelector("#thirdIcon");
let thirdTempBig = document.querySelector("#thirdTempBig");
let thirdTempSmall = document.querySelector("#thirdTempSmall");
let thirdText = document.querySelector("#thirdText");

// Array for Next Days
let forecastObj;

// Fetch Api Data
async function getWeatherApi(cityName = "cairo") {
  try {
    let weatherUrl = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=963d2d3998b64b82ae8115926241805&q=${cityName}&days=7`);
    let weatherData = await weatherUrl.json();
    displayFirstDay(weatherData);
    displayNextDay(weatherData);
    displayComingDay(weatherData);
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
}

getWeatherApi();

// Display First Day
function displayFirstDay(apiData) {
  let currentDay = new Date();
  today.innerHTML = currentDay.toLocaleDateString("en-us" , {weekday:"long"});
  currentDate.innerHTML = currentDay.getDate();
  currentMonth.innerHTML = currentDay.toLocaleDateString("en-us" , {month:"long"});
  cityName.innerHTML = apiData.location.name;
  temp.innerHTML = apiData.current.temp_c +'<span id="dgree" class="position-relative text-warning">o</span>'+'C';
  tempIcon.setAttribute("src" ,apiData.current.condition.icon);
  text.innerHTML = apiData.current.condition.text;
  humidity.innerHTML = apiData.current.humidity + '%';
  windKph.innerHTML = apiData.current.wind_kph + 'km/h'
  windDir.innerHTML = apiData.current.wind_dir
}

// Display Next Day
function displayNextDay(apiData) {
  forecastObj = apiData.forecast.forecastday
  let nextDate = new Date(forecastObj[1].date);
  nextDay.innerHTML = nextDate.toLocaleDateString("en-us" , {weekday:"long"});
  nextTempIcon.innerHTML = forecastObj[1].day.condition.icon;
  secondTempBig.innerHTML = forecastObj[1].day.maxtemp_c + '<span class="position-relative sec-dgree text-warning">o</span>C';
  secondTempSmall.innerHTML = forecastObj[1].day.mintemp_c + '<span class="position-relative third-dgree text-warning">o</span>'+'C';
  secondText.innerHTML = forecastObj[1].day.condition.text;
}

// Display Coming Day
function displayComingDay(apiData) {
  forecastObj = apiData.forecast.forecastday
  let comingDate = new Date(forecastObj[2].date);
  comingDay.innerHTML = comingDate.toLocaleDateString("en-us" , {weekday:"long"});
  thirdIcon.innerHTML = forecastObj[2].day.condition.icon;
  thirdTempBig.innerHTML = forecastObj[2].day.maxtemp_c + '<span class="position-relative sec-dgree text-warning">o</span>C';
  thirdTempSmall.innerHTML = forecastObj[2].day.mintemp_c + '<span class="position-relative third-dgree text-warning">o</span>'+'C';
  thirdText.innerHTML = forecastObj[2].day.condition.text;
}

// Focus on Input
findBtn.addEventListener("click", () => {
  searchInput.focus();
});

// Search Api 
searchInput.addEventListener("keyup", ()=> {
  if(searchInput.value.length > 2) { 
    getWeatherApi(searchInput.value);
  } else if (searchInput.value.length === 0) {
    getWeatherApi(); 
  }
});