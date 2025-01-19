const button = document.getElementById("searchbtn");
const input = document.getElementById("cityinp");
const cityname = document.getElementById("cityname");
const citytime = document.getElementById("citytime");
const citytemp = document.getElementById("citytemp");

async function getData(cityName) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=43faf9f688e04e96b49113812240909&q=${cityName}&aqi=no`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim();
    if (!value) {
        alert("Please enter a city name");
        return;
    }

    const result = await getData(value);
    
    if (result) {
        cityname.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        citytime.innerText = result.location.localtime;
        citytemp.innerText = `Temperature: ${result.current.temp_c}°C`;
    }
});

