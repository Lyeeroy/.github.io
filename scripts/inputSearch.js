document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  const ipBasedWeather = document.querySelector("#ipBasedWeather");

  if (searchInput && searchButton && ipBasedWeather) {
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && e.target.value) {
        handleSearch(e.target.value);
      }
    });

    searchButton.addEventListener("click", () => {
      handleSearch(searchInput.value);
    });
  }
});

async function handleSearch(city) {
  const apiKey = "663fd4369621421eb16214121240907";
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      displayCityWeather(city);
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error(error);
    createMessageDiv("City not found");
  }
}

async function displayCityWeather(city) {
  const twoColumnLayout = document.createElement("div");
  twoColumnLayout.classList.add("two-column-layout");
  twoColumnLayout.style.marginBottom = "80px";
  twoColumnLayout.style.opacity = "0";
  twoColumnLayout.innerHTML = `
    <div class="left-column"></div>
    <div class="right-column"></div>
`;
  document.body.appendChild(twoColumnLayout);
  setTimeout(() => {
    twoColumnLayout.style.transition = "opacity 1s";
    twoColumnLayout.style.opacity = "1";
  }, 100);

  const firstChild = ipBasedWeather.firstChild;
  ipBasedWeather.insertBefore(twoColumnLayout, firstChild);

  const cityDiv = document.createElement("div");
  cityDiv.classList.add("temperature");
  cityDiv.style.marginTop = "-100px";
  cityDiv.textContent = city.charAt(0).toUpperCase() + city.slice(1);
  document.getElementsByClassName("right-column")[0].appendChild(cityDiv);

  const apiKey = "663fd4369621421eb16214121240907";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherDiv = document.createElement("div");
      weatherDiv.classList.add("description");
      weatherDiv.textContent = `${data.current.temp_c}°C ${data.current.condition.text}`;
      document
        .getElementsByClassName("right-column")[0]
        .appendChild(weatherDiv);
    });

  loadWindyMap(city);
}

async function loadWindyMap(city) {
  const apiKey = "663fd4369621421eb16214121240907";

  try {
    const { latitude, longitude } = await getCoordinates(city, apiKey);
    const windyUrl = generateWindyUrl(latitude, longitude);

    const iframe = document.createElement("iframe");
    iframe.src = windyUrl;
    iframe.width = "400";
    iframe.height = "450";
    iframe.style.borderRadius = "20px";
    iframe.style.border = "none";
    document.getElementsByClassName("left-column")[0].appendChild(iframe);
  } catch (error) {
    console.error(error);
    document.getElementsByClassName("left-column")[0].innerText =
      "Error loading Windy map: " + error.message;
    createMessageDiv("City not found");
  }
}

async function getCoordinates(cityName, apiKey) {
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    return { latitude, longitude };
  } else {
    throw new Error("City not found");
  }
}

function generateWindyUrl(latitude, longitude) {
  return `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=°C&metricWind=default&zoom=5&overlay=radar&product=radar&level=surface&lat=${latitude}&lon=${longitude}`;
}

async function fetchCityWeather(city) {
  const apiKey = "663fd4369621421eb16214121240907";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  const response = await fetch(url);
  const data = await response.json();
  return data.current;
}

function createMessageDiv(text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.textContent = text;
  messageDiv.style.opacity = 0;
  messageDiv.style.transition = "opacity 1s";
  messageDiv.style.zIndex = 100;
  messageDiv.style.position = "fixed";
  messageDiv.style.top = "9%";
  messageDiv.style.left = "50%";
  messageDiv.style.transform = "translate(-50%, -50%)";
  messageDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  messageDiv.style.color = "#fff";
  messageDiv.style.padding = "0.5rem";
  messageDiv.style.paddingLeft = "10rem";
  messageDiv.style.paddingRight = "10rem";
  messageDiv.style.fontSize = "1.2rem";
  messageDiv.style.borderRadius = "0.5rem";
  messageDiv.style.boxShadow = "0 0 1rem rgba(0, 0, 0, 0.5)";
  messageDiv.style.backdropFilter = "blur(0.5rem)";
  messageDiv.style.webkitBackdropFilter = "blur(0.5rem)";
  messageDiv.style.background = "linear-gradient(to right, #0077be, #00ffbb)";
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 500);
  }, 3000);
  document.body.appendChild(messageDiv);
}
