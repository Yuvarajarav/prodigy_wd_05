const apiKey = "05d04951d5ceb0d868a2a91f8104f571"; // Replace with your OpenWeatherMap API key

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (city.trim() === "") {
    alert("Please enter a city name.");
    return;
  }
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    }, () => {
      alert("Unable to get location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("temperature").textContent = data.main.temp;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("windSpeed").textContent = (data.wind.speed * 3.6).toFixed(2); // m/s to km/h

      document.getElementById("weatherResult").classList.remove("hidden");
    })
    .catch(error => {
      alert("Error fetching weather data.");
      console.error(error);
    });
}
