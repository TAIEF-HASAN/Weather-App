const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const reloadButton = document.getElementById('reload-button');

// Initialize Google Places Autocomplete
const locationInput = document.getElementById('location-input');
let autocomplete;

locationInput.addEventListener('input', () => {
    if (locationInput.value.length >= 3) {
        if (!autocomplete) {
            autocomplete = new google.maps.places.Autocomplete(locationInput);
        }
    } else {
        if (autocomplete) {
            google.maps.event.clearInstanceListeners(locationInput);
            autocomplete = null;
        }
    }
});

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

reloadButton.addEventListener('click', () => {
    weatherBox.classList.remove('fadeIn');
    weatherDetails.classList.remove('fadeIn');
    weatherBox.classList.add('fadeOut');
    weatherDetails.classList.add('fadeOut');

    setTimeout(() => {
        location.reload();
    }, 1000); // Wait for the fadeOut animation to complete
});

document.getElementById('reload-button').addEventListener('click', function() {
    document.body.style.transition = 'opacity 2s';
            document.body.style.opacity = '0';
            setTimeout(function() {
                location.reload();
            }, 500);
    document.querySelector('.search-box input').value = '';
    location.reload();
});


window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});