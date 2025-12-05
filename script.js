const apiKey = "8e722c1dedfb435394e60369a511c140";

document.getElementById("searchBtn").addEventListener("click", () => {
    let city = document.getElementById("city").value;
    if (city) getWeather(city);
});

document.getElementById("locBtn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
    }, () => alert("Location blocked."));
});

async function getWeather(city) {
    loader.style.display = "block";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    loader.style.display = "none";  

    updateUI(data);
}

async function getWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    updateUI(data);
    getForecast(data.name);
}

function updateUI(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `${data.main.temp}°C`;
    document.getElementById("desc").innerText = data.weather[0].description;


    const iconCode = data.weather[0].icon;
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const weather = data.weather[0].main.toLowerCase();
    document.body.className = "";

    if (weather.includes("clear")) document.body.classList.add("clear");
    else if (weather.includes("cloud")) document.body.classList.add("clouds");
    else if (weather.includes("rain")) document.body.classList.add("rain");
    else if (weather.includes("snow")) document.body.classList.add("snow");
    else if (weather.includes("thunder")) document.body.classList.add("thunder");
    else if (
        weather.includes("haze") ||
        weather.includes("mist") ||
        weather.includes("smoke") ||
        weather.includes("dust")
    ) document.body.classList.add("haze");

    document.getElementById("result").classList.remove("hidden");
}
