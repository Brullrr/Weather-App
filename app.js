//DOM
const displayCityDiv = document.querySelector('.displayCity');
const displayTemperatureDiv = document.querySelector('.displayTemperature');
const displayWeatherDiv = document.querySelector('.displayWeather');
const citySearch = document.querySelector('.citySearch');
const submitBtn = document.querySelector('.submitBtn');
const degree = document.querySelector('.degree');
const sunnyContainer = document.querySelector('.sunnyContainer');
const mistContainer = document.querySelector('.mistContainer');
const rainContainer = document.querySelector('.rainContainer');
const cloudsContainer = document.querySelector('.cloudsContainer');
const lightningContainer = document.querySelector('.lightningContainer');
const snowContainer = document.querySelector('.snow');

let isFahrenheit = true

const checkWeatherBackground = (backgroundType) => {
    console.log('CheckWeather was changed. background type =  ' + backgroundType)
    switch (backgroundType) {
        case 'Clear' :
            sunnyContainer.style.display = 'flex';
            mistContainer.style.display = 'none';
            rainContainer.style.display = 'none';
            cloudsContainer.style.display = 'none';
            lightningContainer.style.display = 'none';
            snowContainer.style.display = 'none'
        break;
        case 'Clouds' :
            sunnyContainer.style.display = 'none';
            mistContainer.style.display = 'none';
            rainContainer.style.display = 'none';
            cloudsContainer.style.display = 'inline';
            lightningContainer.style.display = 'none';
            snowContainer.style.display = 'none'
        break;
        case 'Drizzle' :
            sunnyContainer.style.display = 'none';
            mistContainer.style.display = 'none';
            rainContainer.style.display = 'flex';
            rainContainer.style.opacity = '0.4';
            cloudsContainer.style.display = 'none';
            lightningContainer.style.display = 'none';
            snowContainer.style.display = 'none'
        break;
        case 'Rain' :
            sunnyContainer.style.display = 'none';
            mistContainer.style.display = 'none';
            rainContainer.style.display = 'flex';
            rainContainer.style.opacity = '0.7';
            cloudsContainer.style.display = 'none';
            lightningContainer.style.display = 'none';
            snowContainer.style.display = 'none'
        break;
        case 'Thunderstorm' :
            rainContainer.style.zIndex = '-1';
            sunnyContainer.style.display = 'none';
            mistContainer.style.display = 'none';
            rainContainer.style.display = 'flex';
            rainContainer.style.opacity = '1';
            cloudsContainer.style.display = 'none';
            lightningContainer.style.display = 'flex';
            setTimeout(() => {
            rainContainer.style.zIndex = '-2';
            }, 2500)
            snowContainer.style.display = 'none'

        break;
        case 'Snow' :
            sunnyContainer.style.display = 'none';
            mistContainer.style.display = 'none';
            rainContainer.style.display = 'none';
            cloudsContainer.style.display = 'none';
            lightningContainer.style.display = 'none';
            snowContainer.style.display = 'flex'
        break;
        case 'Atmosphere' :
            sunnyContainer.style.display = 'none';
            mistContainer.style.display = 'inline';
            rainContainer.style.display = 'none';
            cloudsContainer.style.display = 'none';
            lightningContainer.style.display = 'none';
            snowContainer.style.display = 'none'
        break;
    }
}
// checkWeatherBackground('Clear')
// setTimeout(()=>{
//     checkWeatherBackground('Clouds')
// }, 4000)
// setTimeout(()=>{
//     checkWeatherBackground('Drizzle')
// }, 8000)
// setTimeout(()=>{
//     checkWeatherBackground('Rain')
// }, 12000) 
// setTimeout(()=>{
//     checkWeatherBackground('Snow')
// }, 16000) 
// setTimeout(()=>{
//     checkWeatherBackground('Thunderstorm')
// }, 20000) 
// setTimeout(()=>{
//     checkWeatherBackground('Atmosphere')
// }, 44000) 


const round = (num, places) => {
    let multiplier = Math.pow(10, places)
    return Math.round(num * multiplier) / multiplier
}







let userLatitude, userLongitude
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    userLatitude = position.coords.latitude 
    userLongitude = position.coords.longitude
    getInitialUserDataFromWeatherAPI();
    
  }
  getLocation();
 const getInitialUserDataFromWeatherAPI = async () => {
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&units=imperial&appid=56c738a4592729e859cd7c3e99fefe87`, {mode: 'cors'})
     const  weatherInfo = await response.json()
     console.log(weatherInfo)
     changeDisplayCity(weatherInfo.name)
     changeDisplayTemperature(weatherInfo.main.temp)
     changeDisplayWeather(weatherInfo.weather[0].description)
     checkWeatherBackground(weatherInfo.weather[0].main)
 }



const changeDisplayCity = (displayCityName) => {
    displayCityDiv.innerHTML = displayCityName
}

const changeDisplayTemperature = (temperatureData) => {
    displayTemperatureDiv.innerHTML = round(temperatureData, 10)
    
}

const changeDisplayWeather = (weatherData) => {
    displayWeatherDiv.innerHTML = weatherData.charAt(0).toUpperCase() + weatherData.slice(1);
}

let searchedCity = null;



const getDataFromWeatherAPI = async () => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=imperial&appid=56c738a4592729e859cd7c3e99fefe87`, {mode: 'cors'})
        const  weatherInfo = await response.json()
        console.log(weatherInfo)
        changeDisplayCity(weatherInfo.name)
        changeDisplayTemperature(weatherInfo.main.temp)
        changeDisplayWeather(weatherInfo.weather[0].description)
        console.log(weatherInfo.weather[0].main);
        checkWeatherBackground(weatherInfo.weather[0].main)
    } catch (error) {
        console.log(error)
        
            displayError();
        
    }
    
}

submitBtn.addEventListener('click', () => {
    getDataFromWeatherAPI()
    isFahrenheit = true
    degree.innerHTML = "°F"
})

const convertToC = () => {
    displayTemperatureDiv.innerHTML = round((displayTemperatureDiv.innerHTML - 32) * (5/9), 2)
}

const convertToF = () => {
    displayTemperatureDiv.innerHTML = round(((displayTemperatureDiv.innerHTML * (9/5)) + 32), 2)
}

degree.addEventListener('click', () => {
    if(isFahrenheit) {
        convertToC();
        isFahrenheit = false
        degree.innerHTML = "°C"
    } else {
        convertToF();
        isFahrenheit = true
        degree.innerHTML = "°F"
    }
})

const displayError = () => {
    displayCityDiv.innerHTML = "Please check the city and try again"
    displayWeatherDiv.innerHTML = ""
    displayTemperatureDiv.innerHTML = ""
    degree.innerHTML = ""
}



 



