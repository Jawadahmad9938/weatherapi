// Rawalpindi Weather
let rawalpindiTemperature = document.querySelector('.rawalpindi-temp');
let rawalpindiImg = document.querySelector('.rawalpindi-img');
let rawalpindiWind = document.querySelector('.rawalpindi-wind');
let rawalpindiHumidity = document.querySelector('.rawalpindi-humidity');
let rawalpindiWindDegree = document.querySelector('.rawalpindi-wind_degree');
let rawalpindiCondition = document.querySelector('.rawalpindi-condition');

// Custom City Weather
let temperature = document.querySelector('.temp');
let img = document.querySelector('.img');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let windDegree = document.querySelector('.wind_degree');
let cityName = document.querySelector('.city-name');
let condition = document.querySelector('.condition');
let search = document.querySelector('.search');
let button = document.querySelector('button');
let loading = document.getElementById('loading');
let error = document.getElementById('error');

async function weatherDisplayer(city, isRawalpindi = false) {
    const url = `https://api.weatherapi.com/v1/current.json?key=ea38e5e435ff426bbd260806233008&q=${city}&aqi=no`;
    showLoading(true);
    hideError();
    document.querySelectorAll('.temp, .city-name, .wind, .humidity, .wind_degree, .img, .weather-icon').forEach(el => el.style.opacity = '0');

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        let data = await response.json();
        const {
            current: { temp_c, condition: { icon, text }, wind_kph, humidity, wind_degree },
            location: { country, name }
        } = data;
        displayWeather(temp_c, icon, text, wind_kph, humidity, wind_degree, name + (isRawalpindi ? ', PK' : `, ${country}`));
    } catch (e) {
        showError(e.message);
    } finally {
        showLoading(false);
        document.querySelectorAll('.temp, .city-name, .wind, .humidity, .wind_degree, .img, .weather-icon').forEach(el => el.style.opacity = '1');
    }
}

function displayWeather(temp, icon, weatherText, windSpeed, humidityValue, windDeg, city) {
    if (city.includes('Rawalpindi')) {
        rawalpindiTemperature.textContent = `${temp}°`;
        rawalpindiImg.src = icon;
        rawalpindiCondition.textContent = weatherText;
        rawalpindiWind.textContent = windSpeed;
        rawalpindiHumidity.textContent = humidityValue;
        rawalpindiWindDegree.textContent = windDeg;
    } else {
        temperature.textContent = `${temp}°`;
        img.src = icon;
        condition.textContent = weatherText;
        wind.textContent = windSpeed;
        humidity.textContent = humidityValue;
        windDegree.textContent = windDeg;
        cityName.textContent = city;
    }
}

function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
}

function hideError() {
    error.style.display = 'none';
}

// Initial Rawalpindi Weather
weatherDisplayer('Rawalpindi', true);

// Search Functionality
button.addEventListener('click', () => {
    const city = search.value.trim();
    if (city) {
        weatherDisplayer(city);
        search.value = ''; // Clear input
    } else {
        showError('Please enter a city name');
    }
});

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') button.click();
});

// Refresh Rawalpindi Weather every 15 minutes
setInterval(() => weatherDisplayer('Rawalpindi', true), 900000);