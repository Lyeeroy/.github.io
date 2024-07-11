fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    const { latitude, longitude, city } = data;

    const url = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=°C&metricWind=default&zoom=5&overlay=radar&product=radar&level=surface&lat=${latitude}&lon=${longitude}`;
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "400";
    iframe.height = "450";
    iframe.style.borderRadius = "20px";
    iframe.style.border = "none";
    document.getElementsByClassName("left-column")[0].appendChild(iframe);

    const cityDiv = document.createElement("div");
    cityDiv.classList.add("temperature");
    cityDiv.style.marginTop = "-100px";
    cityDiv.textContent = city;
    document.getElementsByClassName("right-column")[0].appendChild(cityDiv);

    fetchCityWeather(city).then((weatherData) => {
      const weatherDiv = document.createElement("div");
      weatherDiv.classList.add("description");
      weatherDiv.textContent = `${weatherData.temperature}°C ${weatherData.description}`;
      document
        .getElementsByClassName("right-column")[0]
        .appendChild(weatherDiv);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function fetchCityWeather(city) {
  const apiKey = "663fd4369621421eb16214121240907";
  const weatherAPI = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  return fetch(weatherAPI, { mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      return { temperature, description };
    });
}
