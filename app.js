const searchLocation = document.querySelector("#searchLocation");
const btnSearch = document.querySelector("#btnSearch");
const showResult = document.querySelector("#showResult");

async function searchWeather(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6c4429b3eb4d4691ad5114853242901&q=${location}&aqi=no`);
        const result = await response.json();
        if (response.ok) {
            console.log(result)
            displayResult(result)
        }
    }
    catch (error) {
        console.error("Unable to get data, something went wrong!!!");
    }
};

btnSearch.addEventListener("click", function (e) {
    e.preventDefault();
    let inputLocation = searchLocation.value;
    if (inputLocation.length > 0) {
        searchWeather(inputLocation);
        searchLocation.value = "";
    }
});

function displayResult(result) {
    showResult.textContent = "";
    const cityName = document.createElement("h4");
    cityName.id = "cityName";
    cityName.textContent = `City Name - ${result.location.name}`;
    showResult.appendChild(cityName);

    const countryName = document.createElement("h5");
    countryName.id = "countryName";
    countryName.textContent = `Country Name - ${result.location.country}`;
    showResult.appendChild(countryName);

    const weatherIcon = document.createElement("img");
    weatherIcon.id = "weatherIcon";
    weatherIcon.alt = "weatherIcon";
    weatherIcon.src = result.current.condition.icon;
    showResult.appendChild(weatherIcon);

    const weatherCondition = document.createElement("p");
    weatherCondition.id = "weatherCondition";
    weatherCondition.textContent = `Condition - ${result.current.condition.text}`;
    showResult.appendChild(weatherCondition);

    const temperatureC = document.createElement("p");
    temperatureC.id = "temperatureC";
    temperatureC.textContent = `Temp - ${result.current.temp_c} C`;
    showResult.appendChild(temperatureC);

    const temperatureF = document.createElement("p");
    temperatureF.id = "temperatureF";
    temperatureF.textContent = `Temp - ${result.current.temp_f} F`;
    showResult.appendChild(temperatureF);

    const windSpeedK = document.createElement("p");
    windSpeedK.id = "windSpeedK";
    windSpeedK.textContent = `Wind Speed - ${result.current.wind_kph} KPH`;
    showResult.appendChild(windSpeedK);

    const windSpeedM = document.createElement("p");
    windSpeedM.id = "windSpeedM";
    windSpeedM.textContent = `Wind Speed - ${result.current.wind_mph} MPH`;
    showResult.appendChild(windSpeedM);

    const humidity = document.createElement("p");
    humidity.id = "humidity";
    humidity.textContent = `Humidity - ${result.current.humidity}`;
    showResult.appendChild(humidity);

    const feelsLikeTempC = document.createElement("p");
    feelsLikeTempC.id = "feelsLikeTempC";
    feelsLikeTempC.textContent = `Feels Like Temp - ${result.current.feelslike_c} C`;
    showResult.appendChild(feelsLikeTempC);

    const feelsLikeTempF = document.createElement("p");
    feelsLikeTempF.id = "feelsLikeTempF";
    feelsLikeTempF.textContent = `Feels Like Temp - ${result.current.feelslike_f} F`;
    showResult.appendChild(feelsLikeTempF);



}
