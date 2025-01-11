const apiKey = '836aafa548938c7dd47e15776ced5845'; // Replace with your valid OpenWeather API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === "200") {
            displayForecast(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error fetching the forecast data:', error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '<h3>7-Day Forecast</h3>'; // Clear previous forecast
    const dailyData = data.list.filter((item) => item.dt_txt.includes('12:00:00')); // Midday forecasts
    dailyData.forEach((day) => {
        const date = new Date(day.dt_txt).toDateString();
        const temp = day.main.temp;
        const description = day.weather[0].description;
        const icon = day.weather[0].icon;

        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast-day';
        forecastDiv.innerHTML = `
            <h4>${date}</h4>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
            <p>${description}</p>
            <p>Temp: ${temp} °C</p>
        `;
        forecastContainer.appendChild(forecastDiv);
    });
}
