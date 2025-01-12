const apiKey = '836aafa548938c7dd47e15776ced5845'; // Replace with your valid OpenWeather API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch the current weather
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

// Display the weather data
function displayWeather(data) {
    const texts = translations[currentLang]; // Use the current language
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = `${texts.description}: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `${texts.temperature}: ${data.main.temp} °C`;
    document.getElementById('humidity').textContent = `${texts.humidity}: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${texts.wind}: ${data.wind.speed} m/s`;
}

// Fetch the 7-day forecast
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

// Display the forecast data
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = `<h3>${translations[currentLang].forecast}</h3>`; // Reset forecast title
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
            <p>${translations[currentLang].temp}: ${temp} °C</p>
        `;
        forecastContainer.appendChild(forecastDiv);
    });
}

// Translations object
const translations = {
    en: {
        title: "Weather App",
        searchPlaceholder: "Enter city name",
        searchButton: "Search",
        description: "Description",
        temperature: "Temperature",
        humidity: "Humidity",
        wind: "Wind Speed",
        forecast: "7-Day Forecast",
        temp: "Temperature",
        weather: "Weather",
        daysOfWeek: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        noForecast: "No forecast available",
    },
    sr: {
        title: "Vremenska Prognoza",
        searchPlaceholder: "Unesite naziv grada",
        searchButton: "Pretraži",
        description: "Opis",
        temperature: "Temperatura",
        humidity: "Vlažnost",
        wind: "Brzina vetra",
        forecast: "Prognoza za 7 dana",
        temp: "Temperatura",
        weather: "Vreme",
        daysOfWeek: [
            "Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"
        ],
        noForecast: "Nema prognoze",
    },
};

// Default language
let currentLang = 'en';

// Language selector buttons
const langButtons = document.querySelectorAll('.language-selector button');

// Elements to translate
const elementsToTranslate = {
    title: document.getElementById('app-title'),
    searchPlaceholder: document.getElementById('city'),
    searchButton: document.getElementById('searchBtn'),
    description: document.getElementById('description'),
    temperature: document.getElementById('temperature'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind'),
    forecast: document.querySelector('#forecast h3'),
};

// Update language based on selected language
function updateLanguage(lang) {
    currentLang = lang; // Update the current language
    const texts = translations[lang];

    elementsToTranslate.title.textContent = texts.title;
    elementsToTranslate.searchPlaceholder.placeholder = texts.searchPlaceholder;
    elementsToTranslate.searchButton.textContent = texts.searchButton;

    // Only update weather-related fields if they contain default placeholders
    if (elementsToTranslate.description.textContent.includes(': --')) {
        elementsToTranslate.description.textContent = `${texts.description}: --`;
        elementsToTranslate.temperature.textContent = `${texts.temperature}: -- °C`;
        elementsToTranslate.humidity.textContent = `${texts.humidity}: --%`;
        elementsToTranslate.wind.textContent = `${texts.wind}: -- m/s`;
    }

    elementsToTranslate.forecast.textContent = texts.forecast;
}

// Add event listeners to language buttons
langButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const lang = button.id.split('-')[1];
        updateLanguage(lang);
    });
});

// Add translation map for weather descriptions
const weatherDescriptions = {
    en: {
        "clear sky": "Clear Sky",
        "few clouds": "Few Clouds",
        "scattered clouds": "Scattered Clouds",
        "broken clouds": "Broken Clouds",
        "overcast clouds": "Overcast Clouds",
        "shower rain": "Shower Rain",
        "rain": "Rain",
        "thunderstorm": "Thunderstorm",
        "snow": "Snow",
        "mist": "Mist",
    },
    sr: {
        "clear sky": "Vedro nebo",
        "few clouds": "Malo oblaka",
        "scattered clouds": "Rasuti oblaci",
        "broken clouds": "Prekinuti oblaci",
        "overcast clouds": "Oblačno",
        "shower rain": "Kišni pljusak",
        "rain": "Kiša",
        "thunderstorm": "Grmljavina",
        "snow": "Sneg",
        "mist": "Magla",
    },
};



// Function to translate weather description
function translateDescription(description) {
    return weatherDescriptions[currentLang][description] || description;
}

// Display the weather data
function displayWeather(data) {
    const texts = translations[currentLang]; // Use the current language
    const weatherDescription = data.weather[0].description;
    const translatedDescription = translateDescription(weatherDescription); // Translate the description

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = `${texts.description}: ${translatedDescription}`;
    document.getElementById('temperature').textContent = `${texts.temperature}: ${data.main.temp} °C`;
    document.getElementById('humidity').textContent = `${texts.humidity}: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${texts.wind}: ${data.wind.speed} m/s`;
}
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = `<h3>${translations[currentLang].forecast}</h3>`; // Reset forecast title

    // Ensure the 'list' array is not empty
    const dailyData = data.list.filter((item) => item.dt_txt.includes('12:00:00')); // Filter midday forecasts
    if (dailyData.length === 0) {
        forecastContainer.innerHTML += `<p>${translations[currentLang].noForecast}</p>`;
        return;
    }

    dailyData.forEach((day) => {
        const date = new Date(day.dt_txt).toDateString();
        const temp = day.main.temp;
        const description = day.weather[0].description;
        const icon = day.weather[0].icon;

        // Use translateDescription to translate the weather description
        const translatedDescription = translateDescription(description);

        const dayName = translations[currentLang].daysOfWeek[new Date(day.dt_txt).getDay()]; // Get translated day name
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast-day';
        forecastDiv.innerHTML = `
            <h4>${dayName}</h4>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
            <p>${translatedDescription}</p>  <!-- Use translated description here -->
            <p>${translations[currentLang].temp}: ${temp} °C</p>
        `;
        forecastContainer.appendChild(forecastDiv);
    });
}


// Set default language
updateLanguage(currentLang);


