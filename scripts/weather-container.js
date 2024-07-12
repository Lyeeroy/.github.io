document.addEventListener("DOMContentLoaded", () => {
  const city = [
    "London",
    "Los Angeles",
    "Tokyo",
    "New York",
    "Prague",
    "Sydney",
    "Seoul",
  ];

  const apiKey = "663fd4369621421eb16214121240907";

  const fetchCityWeather = (city) => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    return fetch(apiUrl, { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Data not found");
          } else if (response.status === 500) {
            throw new Error("Server error");
          } else {
            throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
      .then((data) => {
        const temperature = Math.round(data.current.temp_c);
        const weatherDescription = data.current.condition.text;

        const weatherContainer = createWeatherContainer(
          temperature,
          weatherDescription,
          city
        );

        const contentElement = document.querySelector(".content");
        contentElement.appendChild(weatherContainer);
      })
      .catch((error) => {
        const contentElement = document.querySelector(".content");
        contentElement.textContent = `We are so sorry. API error accurred and server could not process request. Try again later.`;
        console.error("Error:", error);
      });
  };

  const createWeatherContainer = (temperature, weatherDescription, city) => {
    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weather-container");

    const weatherIcon = document.createElement("div");
    weatherIcon.classList.add("weather-icon");
    weatherContainer.appendChild(weatherIcon);

    const temperatureElement = document.createElement("div");
    temperatureElement.classList.add("temperature");
    temperatureElement.textContent = `${temperature}°C`;
    weatherContainer.appendChild(temperatureElement);

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("description");
    descriptionElement.textContent = weatherDescription;
    weatherContainer.appendChild(descriptionElement);

    const locationElement = document.createElement("div");
    locationElement.classList.add("location");
    locationElement.textContent = city;
    weatherContainer.appendChild(locationElement);

    return weatherContainer;
  };

  for (let i = 0; i < city.length; i++) {
    const cityToFetch = city[i];
    fetchCityWeather(cityToFetch);
  }
});
