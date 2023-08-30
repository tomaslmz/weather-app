const key = '95d400d3858c3f796ff3a343e1745cc4';
const language = 'en';

const getTemp = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("search-input").value}&lang=${language}&appid=${key}&units=metric`

    const query = await fetch(url, {
        method: 'GET'
    });

    const request = await query.json();

    if(request.weather[0].description === 'clear sky') {
        document.getElementById("image-temp").style.display = 'block';
        document.getElementById("image-temp").src = 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/clear-day.png'
    }
    console.log(request);
}

// https://basmilius.github.io/weather-icons/index-fill.html
// https://openweathermap.org/weather-conditions