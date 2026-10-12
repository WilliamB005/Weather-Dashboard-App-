const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error-message");
const weatherCard = document.getElementById("weather-card");

const cityNameEl = document.getElementById("city-name");
const weatherIconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const weatherDescEl = document.getElementById("weather-description");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  await fetchWeather(city);
});

async function fetchWeather(city) {
  
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
  weatherCard.classList.add("hidden");

  try {
    //  using Open-Meteo Geocoding API (No key needed)
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("Network error while searching for city.");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Please check the spelling.");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    //  Fetching  current weather using coordinates (No key needed) because we are using openMeteo API
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data. Please try again later.");
    }

    const weatherData = await weatherResponse.json();
    displayWeather(name, country, weatherData.current);

  } catch (error) {
    showError(error.message);
  } finally {
    loadingEl.classList.add("hidden");
  }
}

function displayWeather(cityName, country, current) {
  cityNameEl.textContent = country ? `${cityName}, ${country}` : cityName;
  temperatureEl.textContent = Math.round(current.temperature_2m);
  humidityEl.textContent = `${current.relative_humidity_2m}%`;
  windSpeedEl.textContent = `${current.wind_speed_10m} km/h`;

  const weatherInfo = getWeatherDetails(current.weather_code);
  weatherDescEl.textContent = weatherInfo.description;
  weatherIconEl.textContent = weatherInfo.icon;

  weatherCard.classList.remove("hidden");
}

// Helper function to map WMO weather codes to descriptions and emojis also
function getWeatherDetails(code) {
    if (code === 0) return { description: "Clear sky", icon: "☀️" };
    if (code >= 1 && code <= 3) return { description: "Partly cloudy", icon: "⛅" };
    if (code === 45 || code === 48) return { description: "Foggy", icon: "🌫️" };
    if (code >= 51 && code <= 55) return { description: "Drizzle", icon: "🌦️" };
    if (code >= 61 && code <= 65) return { description: "Rain", icon: "🌧️" };
    if (code >= 71 && code <= 75) return { description: "Snow", icon: "❄️" };
    if (code === 95) return { description: "Thunderstorm", icon: "⛈️" };
    
    return { description: "Fair conditions", icon: "🌤️" };
  }

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}