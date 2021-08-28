const city = document.getElementById("city");
const logo = document.getElementById("weather-logo");
const temperature = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");
const desc = document.getElementById("desc");
const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("input");
const speedMS = document.getElementById("speed");
const degree = document.getElementById("deg");

const API_KEY = "d74fbe61405c5b37389c297e730a422a";

window.addEventListener("load", () => {
    let long;
    let lat;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;
        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const { name } = data;
            const { feels_like, temp, temp_max, temp_min } = data.main;
            const { id, icon, main } = data.weather[0];
            ShowData(data)
          });
      });
    }
});

searchBtn.addEventListener("click", function(){
    let city = input.value;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
        fetch(`${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            ShowData(data);
        });
    } catch (error) {
        alert(error);
    }
})

input.addEventListener("keyup", function(){
    city.innerText = input.value.toUpperCase();
})

function ShowData(data){
    let {name} = data;
    let {temp, feels_like, temp_min, temp_max} = data.main;
    let {icon, description} = data.weather[0];
    let {country} = data.sys;
    let {deg, speed} = data.wind;
    
    city.innerText = name+" "+country;
    logo.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    temperature.innerText = Math.round(temp)+"℃";
    desc.innerText = description.toUpperCase();
    feelsLike.innerText = "Feels like: "+Math.round(feels_like)+"℃";
    maxTemp.innerText = "Min Temp: "+Math.round(temp_min)+"℃";
    minTemp.innerText = "Max Temp: "+Math.round(temp_max)+"℃";
    speedMS.innerText = speed+"m/s";
    if(deg === 350 || deg === 360 || deg === 010){ degree.innerText = `N ${deg}°`}
    else if(deg >= 20 && deg <= 30){ degree.innerText = `N/NE ${deg}°`}
    else if(deg >= 40 && deg <= 50){ degree.innerText = `NE ${deg}°`}
    else if(deg >= 60 && deg <= 70){ degree.innerText = `E/NE ${deg}°`}
    else if(deg >= 80 && deg <= 100){ degree.innerText = `E ${deg}°`}
    else if(deg >= 110 && deg <= 120){ degree.innerText = `E/SE ${deg}°`}
    else if(deg >= 130 && deg <= 140){ degree.innerText = `SE ${deg}°`}
    else if(deg >= 150 && deg <= 160){ degree.innerText = `S/SE ${deg}°`}
    else if(deg >= 170 && deg <= 190){ degree.innerText = `S ${deg}°`}
    else if(deg >= 200 && deg <= 210){ degree.innerText = `S/SW ${deg}°`}
    else if(deg >= 220 && deg <= 230){ degree.innerText = `SW ${deg}°`}
    else if(deg >= 240 && deg <= 250){ degree.innerText = `W/SW ${deg}°`}
    else if(deg >= 260 && deg <= 280){ degree.innerText = `W ${deg}°`}
    else if(deg >= 290 && deg <= 300){ degree.innerText = `W/NW ${deg}°`}
    else if(deg >= 310 && deg <= 320){ degree.innerText = `NW ${deg}°`}
    else if(deg >= 330 && deg <= 340){ degree.innerText = `N/NW ${deg}°`}
}