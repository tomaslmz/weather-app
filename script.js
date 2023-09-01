const key = '95d400d3858c3f796ff3a343e1745cc4';
const language = 'en';

const getTemp = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("search-input").value}&lang=${language}&appid=${key}&units=metric`

    

    document.querySelector(".temp-container").style.display = 'flex';
    document.querySelector('.container').style.justifyContent = 'space-evenly'
    document.getElementById("image-temp").style.display = 'block';

    try {
        const query = await fetch(url, {
            method: 'GET'
        });

        
    
        const request = await query.json();

        if(!query.ok) {
            throw new Error(request.message);
        }
    
        console.log(request);
    
        const isDay = request.weather[0].icon.indexOf("d") === -1 ? false : true;

        switch(request.weather[0].main) {
            case 'Clear':
                document.getElementById("image-temp").src = isDay ? 'src/svg/clear-sky-d.svg' : 'src/svg/clear-sky-n.svg';
            break;
            case 'Clouds':
                switch(request.weather[0].description) {
                    case 'few clouds':
                        document.getElementById("image-temp").src = isDay ? 'src/svg/few-clouds-d.svg' : 'src/svg/few-clouds-n.svg';
                    break;
                    case 'scattered clouds':
                        document.getElementById("image-temp").src = 'src/svg/scattered-clouds.svg';
                    break;
                    case 'broken clouds':
                        document.getElementById("image-temp").src = 'src/svg/broken-clouds.svg';
                    break;
                    default:
                        document.getElementById("image-temp").src = isDay ? 'src/svg/few-clouds-d.svg' : 'src/svg/few-clouds-n.svg';
                    break;
                }
            break;
            case 'Rain':
            switch(request.weather[0].description) {
                case 'rain':
                    document.getElementById("image-temp").src = isDay ? 'src/svg/rain-d.svg' : 'src/svg/rain-n.svg';
                break;
                case 'shower rain':
                    document.getElementById("image-temp").src = 'src/svg/shower-rain.svg';
                break;
                default:
                    document.getElementById("image-temp").src = isDay ? 'src/svg/rain-d.svg' : 'src/svg/rain-n.svg';
                break;
            }
            break;
            case 'Thunderstorm':
                document.getElementById("image-temp").src = isDay ? 'src/svg/thunderstorm-d.svg' : 'src/svg/thunderstorm-n.svg';
            break;
            case 'Snow':
                document.getElementById("image-temp").src = isDay ? 'src/svg/snow-d.svg' : 'src/svg/snow-n.svg';
            break;
            case 'Mist':
                document.getElementById("image-temp").src = 'src/svg/mist.svg';
            break;
        }

        document.getElementById("name").innerHTML = request.name;
        document.getElementById("temp-text").innerHTML = parseInt(request.main.temp) + '<span class="metric-text">°C</span>';
        document.getElementById("min").innerHTML = 'Minimum: ' + parseInt(request.main.temp_min) + '°C';
        document.getElementById("max").innerHTML = 'Maximum: ' + parseInt(request.main.temp_max) + '°C';
        document.getElementById("pressure").innerHTML = 'Pressure: ' + parseInt(request.main.pressure) + 'hpa';
        document.getElementById("humidity").innerHTML = 'Humidity: ' + parseInt(request.main.humidity) + '%';
    } catch(e) {
        console.log(e);
        document.getElementById("image-temp").src = 'src/svg/cross-icon.svg';
        document.getElementById("name").innerHTML = '';
        const message = e.message.charAt(0).toUpperCase() + e.message.slice(1);
        
        document.getElementById("temp-text").innerHTML = message;
        document.getElementById("min").innerHTML = '';
        document.getElementById("max").innerHTML = '';
        document.getElementById("pressure").innerHTML = '';
        document.getElementById("humidity").innerHTML = '';
    }
    // if(request.weather[0].description === 'clear sky') {
    //     
    //     document.getElementById("image-temp").src = 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/clear-day.png'
    // }
}

// https://basmilius.github.io/weather-icons/index-fill.html
// https://openweathermap.org/weather-conditions