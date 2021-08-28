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
  let {all} = data.clouds;
  let {deg, speed} = data.wind;

  city.innerText = name+" "+country;
  logo.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  temperature.innerText = Math.round(temp)+"℃";
  desc.innerText = description.toUpperCase();
  feelsLike.innerText = "Feels like: "+Math.round(feels_like)+"℃";
  maxTemp.innerText = "Min Temp: "+Math.round(temp_min)+"℃";
  minTemp.innerText = "Max Temp: "+Math.round(temp_max)+"℃";
  speedMS.innerText = speed+"m/s";
  degree.innerText = `${Degree(deg)} ${deg}°`
  if(all <= 25){
    document.body.style.backgroundImage = "url('Bg/25%.jpg')";
    document.body.style.backgroundSize = "cover";
  }
  else if(all < 50 && all > 25){
    document.body.style.backgroundImage = "url('Bg/50%.jpg')";
    document.body.style.backgroundSize = "cover";
    console.log(all)
  }
  else if(all <= 75 && all > 50){
    document.body.style.backgroundImage = "url('Bg/75%.jpg')";
    document.body.style.backgroundSize = "cover";
    console.log(all)
  }
  else if(all <= 100 && all > 75){
    document.body.style.backgroundImage = "url('Bg/100%.jpg')";
    document.body.style.backgroundSize = "cover";
    console.log(all)
  }
  console.log(data)
}


function Degree(deg){
  if(deg === 350 || deg === 360 || deg === 010){ return "N"}
  else if(deg >= 20 && deg <= 30){ return "N/NE"}
  else if(deg >= 40 && deg <= 50){ return "NE"}
  else if(deg >= 60 && deg <= 70){ return "E/NE"}
  else if(deg >= 80 && deg <= 100){ return "E"}
  else if(deg >= 110 && deg <= 120){ return "E/SE"}
  else if(deg >= 130 && deg <= 140){ return "SE"}
  else if(deg >= 150 && deg <= 160){ return "S/SE"}
  else if(deg >= 170 && deg <= 190){ return "S"}
  else if(deg >= 200 && deg <= 210){ return "S/SW"}
  else if(deg >= 220 && deg <= 230){ return "SW"}
  else if(deg >= 240 && deg <= 250){ return "W/SW"}
  else if(deg >= 260 && deg <= 280){ return "W"}
  else if(deg >= 290 && deg <= 300){ return "W/NW"}
  else if(deg >= 310 && deg <= 320){ return "NW"}
  else(deg >= 330 && deg <= 340)
  { 
    return "N/NW"
  }
}