

const city = document.querySelector('.loc');
const icon = document.querySelector('.icon');


const getLoc =async ()=>
{
    const urlIP="http://ip-api.com/json/?fields=country,city,lat,lon,timezone";
    const response  = await fetch(urlIP);
    const data = await response.json();
    const lat = data.lat;
    const lan = data.lon;
    city.textContent = `${data.timezone}`;
    return data;
    
}

getLoc()

const getWeather=async ()=>
{
const urlWeather=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9bd1e4553c53b771c19ecb669bdaf92b`;   

    const response =  await fetch(urlWeather);
    const data = await response.json();
    return data;
}

function getDayOrNight()
{
   
}