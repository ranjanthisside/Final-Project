const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='; 
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': "81e68ae4e8mshe4f2922c243beb5p15c986jsn6703c710b08f",
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const cloud_pct = document.getElementById("cloud_pct");
const temp = document.getElementById("temp");
const feels_like = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const wind_speed = document.getElementById("wind_speed");
const wind_degrees = document.getElementById("wind_degrees");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const submit = document.getElementById("submit"); 


const getweather = (city) => {
  cityName.innerHTML = city;
  const fullUrl = url + encodeURIComponent(city); 

  (async () => {
    try {
      const response = await fetch(fullUrl, options);
      const result = await response.json();

      console.log(result);
      cloud_pct.innerHTML = result.cloud_pct;
      temp.innerHTML = result.temp;
      feels_like.innerHTML = result.feels_like;
      humidity.innerHTML = result.humidity;
      min_temp.innerHTML = result.min_temp;
      max_temp.innerHTML = result.max_temp;
      wind_speed.innerHTML = result.wind_speed;
      wind_degrees.innerHTML = result.wind_degrees;
      sunrise.innerHTML = result.sunrise;
      sunset.innerHTML = result.sunset;

      
    } catch (error) {
      console.error(error);
    }
  })();
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getweather(cityInput.value); 
});


getweather("Delhi");

// Array of city names for filling datas in the table made below
const cities = ["Mumbai", "Kolkata", "Bangalore", "Chennai", "Patna", "Kanpur"];
const delay = 200;
//delay for not getting the error of too many requests 

const fillCityWeatherData = async () => {
  const table = document.querySelector('.table');
  
  for (const city of cities) {
    const cityUrl = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    
    try {
      const response = await fetch(cityUrl, options);
      if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }

      //above line was added after receiving a boundation of rate limit exceeded 
      const result = await response.json();
      const newRow = table.insertRow(-1);
      
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);
      const cell5 = newRow.insertCell(4);
      const cell6 = newRow.insertCell(5);
      const cell7 = newRow.insertCell(6);
      const cell8 = newRow.insertCell(7);
      
      cell1.innerHTML = city;
      cell2.innerHTML = result.temp;
      cell3.innerHTML = result.feels_like; 
      cell4.innerHTML = result.humidity; 
      cell5.innerHTML = result.max_temp; 
      cell6.innerHTML = result.min_temp;
      cell7.innerHTML = result.cloud_pct;
      cell8.innerHTML = result.wind_speed;
      await new Promise(resolve => setTimeout(resolve, delay));
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  }
};

fillCityWeatherData();
