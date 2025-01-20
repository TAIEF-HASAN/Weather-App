const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '635b5cf7a522c63b5b57e2e846c9e8b9';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Haze':
                image.src = 'images/mist.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
        
    
    });
});

document.getElementById('search-button').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location) {
        // Simulate fetching weather data
        fetchWeatherData(location);
    }
});

document.getElementById('reload-button').addEventListener('click', function() {
    const weatherBox = document.getElementById('weather-box');
    const weatherDetails = document.getElementById('weather-details');

    weatherBox.classList.remove('fadeIn');
    weatherDetails.classList.remove('fadeIn');
    weatherBox.classList.add('fadeOut');
    weatherDetails.classList.add('fadeOut');

    setTimeout(() => {
        location.reload();
    }, 1000); // Wait for the fadeOut animation to complete
});

function fetchWeatherData(location) {
    // Simulate an API call
    const isValidLocation = Math.random() > 0.5; // Randomly decide if the location is valid

    if (isValidLocation) {
        document.getElementById('not-found').style.display = 'none';
        const weatherBox = document.getElementById('weather-box');
        const weatherDetails = document.getElementById('weather-details');
        const container = document.querySelector('.container');

        // Update weather information
        document.getElementById('weather-icon').src = 'images/weather-icon.png';
        document.getElementById('temperature').textContent = '25°C';
        document.getElementById('description').textContent = 'Sunny';
        document.getElementById('humidity').textContent = 'Humidity: 60%';

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    } else {
        document.getElementById('not-found').style.display = 'block';
        document.getElementById('weather-box').style.display = 'none';
        document.getElementById('weather-details').style.display = 'none';
    }
}
