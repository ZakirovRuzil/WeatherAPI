const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const APIKey = 'a802c1cd797bb75c3d77f768c81fb1a4';
const searchInput = document.querySelector('.search-box input');

search.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = searchInput.value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => handleWeatherData(json))
        .catch(error => handleFetchError(error));
});

function handleWeatherData(json) {
    const CLIENT_ERR_CODE = '404';

    if (json.cod === CLIENT_ERR_CODE) {
        displayError();
        return;
    }

    hideError();
    renderWeatherData(json);
    container.classList.add('expanded');
}

function handleFetchError(error) {
    console.error('Error fetching weather data:', error);
    displayError();
    container.classList.remove('expanded');
}

function displayError() {
    container.classList.add('error-state');
    weatherBox.classList.add('gl-hide');
    weatherDetails.classList.add('gl-hide');
    error404.classList.add('gl-show', 'fadeIn');
    container.classList.remove('expanded');
}

function hideError() {
    error404.classList.remove('gl-show', 'fadeIn');
    error404.classList.add('gl-hide');
}

function renderWeatherData(json) {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.humidity span');
    const wind = document.querySelector('.wind span');

    const weatherMain = json.weather[0].main.toLowerCase();
    if (json.weather[0].icon === '50d') weatherMain = json.weather[0].icon;
    image.src = `images/container/${weatherMain}.png`;

    temperature.innerText = `${parseInt(json.main.temp)}°C`;
    description.innerText = `${json.weather[0].description}`;
    humidity.innerText = `${json.main.humidity}%`;
    wind.innerText = `${parseInt(json.wind.speed)}Km/h`;

    weatherBox.classList.remove('gl-hide');
    weatherDetails.classList.remove('gl-hide');
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
}
