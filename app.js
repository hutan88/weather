const timeZone = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const degree = document.querySelector('.degree');
const tempDesc = document.querySelector('.temp-desc');
const degreeSec = document.querySelector('.degree-section');
const unit=  document.querySelector('.unit');


const getLoc =async ()=>
{
    const urlIP="http://ip-api.com/json/?fields=country,city,lat,lon,timezone";
    const response  = await fetch(urlIP);
    const data = await response.json();
    timeZone.textContent = `${data.timezone}`;
    return data;
    
}

const getWeather=async (lat,lon)=>
{
const urlWeather=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9bd1e4553c53b771c19ecb669bdaf92b`;   

    const response =  await fetch(urlWeather);
    const data = await response.json();
    return data;
}

function getDayOrNight()
{
    let dayOrNight;
   let d =new Date();
   if (d.getHours() >= 6 && d.getHours() <=19) {
    dayOrNight = "Day"
   }
   else
   {
    dayOrNight="Night"
   }
}

function getIcon(weMain)
{
    let icon;
    switch (weMain) {
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const dayOrNight = getDayOrNight();
            icon = `${weMain}.svg`;
            break;
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
    
    }
    return icon;
}

function getTemp(weTemp)
{
    const k = weTemp;
    const f = (k - 273.15) * 9/5 +32; 
    const c = k - 273.15;
    return temp ={kel:Math.floor(k) , far:Math.floor(f),can:Math.floor(c)};
}


getLoc().then(locData=>
    {
        return getWeather(locData.lat,locData.lon);
    }).then(weData=>
        {
            const weTemp=  Math.floor(weData.main.temp);
            degree.textContent =weTemp;
            tempDesc.textContent= weData.weather[0].description;
            unit.textContent="K";
            const gotIcon= getIcon( weData.weather[0].main);
            icon.innerHTML=`<img src="./image/${gotIcon}" >`;

            setInterval(()=>
            {
                switch (unit.textContent) {
                    case 'K':
                        degree.textContent = getTemp(weTemp).far
                        unit.textContent = "F"
                        break;
                    case 'F':
                        degree.textContent = getTemp(weTemp).can
                        unit.textContent = "C"
                        break;
                    case 'C':
                        degree.textContent = getTemp(weTemp).kel
                        unit.textContent = "K"
                        break;
                }
    
            },6000)

            degreeSec.addEventListener('click',e=>
            {
                e.preventDefault;
               switch (unit.textContent) {
                case 'K':
                    degree.textContent = getTemp(weTemp).far
                    unit.textContent = "F"
                    break;
                case 'F':
                    degree.textContent = getTemp(weTemp).can
                    unit.textContent = "C"
                    break;
                case 'C':
                    degree.textContent = getTemp(weTemp).kel
                    unit.textContent = "K"
                    break;
         
               }
            })
        });

    
        
     