const apiKey = "f63971209a53c5f0848a51e899a5ba77"; // Replace with your actual API key
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`;

const outputElement = document.getElementById("output");

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Display data in an HTML element
    outputElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
