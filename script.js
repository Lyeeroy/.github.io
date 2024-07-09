const apiKey = "663fd4369621421eb16214121240907";
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;

fetch(apiUrl)
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
    outputElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
