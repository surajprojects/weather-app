// Necessary imports
import iconsMap from "./weatherIconMap.js";
import { currentTime, currentDate } from "./dateAndTime.js";

// Targetting necessary elements
const windData = document.querySelector("#windData");
const windStatus = document.querySelector("#windStatus");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const humidityData = document.querySelector("#humidityData");
const currentTempCel = document.querySelector("#currentTempCel");
const currentTempFah = document.querySelector("#currentTempFah");
const currentDayData = document.querySelector("#currentDayData");
const visibilityData = document.querySelector("#visibilityData");
const searchClearBtn = document.querySelector("#searchClearBtn");
const tempDisplayCel = document.querySelector("#tempDisplayCel");
const tempDisplayFah = document.querySelector("#tempDisplayFah");
const humidityStatus = document.querySelector("#humidityStatus");
const currentTimeData = document.querySelector("#currentTimeData");
const visibilityStatus = document.querySelector("#visibilityStatus");
const forecastAllCards = document.querySelector("#forecastAllCards");
const currentTempDataCel = document.querySelector("#currentTempDataCel");
const currentTempDataFah = document.querySelector("#currentTempDataFah");
const currentWeatherLocation = document.querySelector("#currentWeatherLocation");
const currentWeatherIconData = document.querySelector("#currentWeatherIconData");
const currentWeatherCondition = document.querySelector("#currentWeatherCondition");

// Global variables to cache option values
let isCelsius = true;

// Async function which makes api call to get weather data
async function searchWeather(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6c4429b3eb4d4691ad5114853242901&q=${location}&aqi=no&days=3`);
        const result = await response.json();
        if (response.ok) {
            displayData(result);
        } else {
            alert("Please enter correct location name.")
        }
    }
    catch (error) {
        console.error("Unable to get data, something went wrong!!!");
        alert("Unable to get data, something went wrong!!!");
    }
};

// Function which return humidity status based on humidity data
function getHumidityStatus(humidityData) {
    if (humidityData <= 30) {
        return "Dry";
    } else if (humidityData <= 50) {
        return "Comfortable";
    } else if (humidityData <= 60) {
        return "Slightly Humid";
    } else if (humidityData <= 70) {
        return "Humid";
    } else {
        return "Very Humid";
    }
};

// Function which return wind speed status based on wind speed data
function getWindSpeedStatus(windSpeedKph) {
    if (windSpeedKph <= 5) {
        return "Calm";
    } else if (windSpeedKph <= 15) {
        return "Light Breeze";
    } else if (windSpeedKph <= 30) {
        return "Moderate Wind";
    } else if (windSpeedKph <= 50) {
        return "Strong Wind";
    } else {
        return "Very Windy / Stormy";
    }
};

// Function which return visibility status based on visibility data
function getVisibilityStatus(visibilityKm) {
    if (visibilityKm >= 10) {
        return "Excellent";
    } else if (visibilityKm >= 6) {
        return "Good";
    } else if (visibilityKm >= 3) {
        return "Moderate";
    } else if (visibilityKm >= 1) {
        return "Poor";
    } else {
        return "Very Poor";
    }
};

// Function which return weather icon name based on weather condition from api
function getWeatherIcon(description) {
    // Removing extra space
    const iconName = description.trim();
    // Getting and returning weather icon name if found
    if (iconsMap[iconName]) return iconsMap[iconName];

    // Fallback logic if weather icon not found
    if (iconName.includes("rain")) return "wi-rain";
    if (iconName.includes("snow")) return "wi-snow";
    if (iconName.includes("cloud")) return "wi-cloudy";
    if (iconName.includes("fog") || iconName.includes("mist")) return "wi-fog";
    if (iconName.includes("thunder")) return "wi-thunderstorm";
    if (iconName.includes("sleet")) return "wi-sleet";
    if (iconName.includes("hail")) return "wi-hail";

    // Default icon if there is nothing matched
    return "wi-na";
};

// Function which adds new forecast card to the forecast section
function addForecastCard(time = 14, icon = "wi-na", temp_c = 12) {
    // Create p tag for card title
    const cardTitle = document.createElement("p");
    cardTitle.className = "cardTitle forecastCardTitle";
    cardTitle.textContent = `${time > 12 ? time - 12 : time}:00 ${time > 12 ? "PM" : "AM"} `;

    // Create i tag for card icon
    const cardIcon = document.createElement("i");
    cardIcon.className = `wi ${getWeatherIcon(icon)}`;

    // Create div tag for card body
    const cardBody = document.createElement("div");
    cardBody.className = "forecastCardBody";

    // Add card icon element to card body element
    cardBody.append(cardIcon);

    // Create span tag for temperature in celsius
    const tempCspan = document.createElement("span");
    tempCspan.innerHTML = `${Math.floor(temp_c)}&deg;C`
    tempCspan.className = "forecastStatus";

    // Create p tag for card description
    const cardDescription = document.createElement("p");
    cardDescription.className = "cardDescription";

    // Add temperature in celsius element to card description
    cardDescription.append(tempCspan);

    // Create div tag for forecast card parent
    const forecastCard = document.createElement("div");
    forecastCard.className = "weatherInfoCard weatherInfoCardForecast";

    // Add card title, card body, and card description elements to forecast card parent element
    forecastCard.append(cardTitle);
    forecastCard.append(cardBody);
    forecastCard.append(cardDescription);

    // Add forecast card parent element to forecast all cards element
    forecastAllCards.append(forecastCard)
};

// Function which displays multiple forecast cards based on forecast data from api
function displayForecast(forecastData) {
    forecastAllCards.innerHTML = "";
    if (forecastData.length < 1) return;
    const dataLength = forecastData.length > 5 ? 5 : forecastData.length;

    for (let i = 0; i < dataLength; i++) {
        addForecastCard(forecastData[i].time.slice(11, 13), forecastData[i].condition.text, forecastData[i].temp_c);
    }
};

// Function which display weather details based on weather data from api
function displayData(weatherData) {
    // Current Temperature in Celsius
    currentTempDataCel.textContent = Math.floor(weatherData.current.temp_c);
    // Current Temperature in Fahrenheit
    currentTempDataFah.textContent = Math.floor(weatherData.current.temp_f);
    // Current weather condtion 
    currentWeatherCondition.textContent = weatherData.current.condition.text;
    // Current weather location 
    currentWeatherLocation.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
    // Current day
    currentDayData.textContent = currentDate().fullDay;
    // Getting current time
    const hrs = currentTime().hrs;
    const mins = currentTime().mins;
    // Current time
    currentTimeData.textContent = `${hrs > 12 ? hrs - 12 : hrs}:${mins < 10 ? `0${mins}` : mins} ${hrs > 12 ? "PM" : "AM"}`;
    // Current humidity in percentage
    humidityData.textContent = Math.floor(weatherData.current.humidity);
    // Current humidity status
    humidityStatus.textContent = getHumidityStatus(weatherData.current.humidity);
    // Current wind speed in KPH
    windData.textContent = Math.floor(weatherData.current.wind_kph);
    // Current wind speed status
    windStatus.textContent = getWindSpeedStatus(weatherData.current.wind_kph);
    // Current visibility in km
    visibilityData.textContent = Math.floor(weatherData.current.vis_km);
    // Current visibility status
    visibilityStatus.textContent = getVisibilityStatus(weatherData.current.vis_km);
    // Current weather icon
    currentWeatherIconData.className = `wi ${getWeatherIcon(weatherData.current.condition.text)} currentWeatherIcon`;
    // Extracting forecast data
    const forecastData = weatherData.forecast.forecastday[0].hour.filter((forecastData) => {
        if (Number(forecastData.time.slice(11, 13)) > Number(new Date().toTimeString().slice(0, 2))) {
            return forecastData;
        }
    });
    // Passing forecast data to display forecast function
    displayForecast(forecastData);
};

// Add eventlistner to get weather data and clear search input field
searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    searchWeather(searchInput.value);
    searchInput.value = "";
});

// Add eventlistner to clear search input field
searchClearBtn.addEventListener("click", () => {
    searchInput.value = "";
});

// Add eventlistner to display current temperature in celsius 
tempDisplayCel.addEventListener("click", () => {
    isCelsius = true;
    tempDisplayCel.className = "tempDisplay tempDisplaySelected";
    tempDisplayFah.className = "tempDisplay";
    currentTempFah.className = "hideElement";
    currentTempCel.className = "";
});

// Add eventlistner to display current temperature in fahrenheit
tempDisplayFah.addEventListener("click", () => {
    isCelsius = false;
    tempDisplayFah.className = "tempDisplay tempDisplaySelected";
    tempDisplayCel.className = "tempDisplay";
    currentTempCel.className = "hideElement";
    currentTempFah.className = "";
});