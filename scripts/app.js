const local = document.querySelector('.change-location');
const showdetails = document.querySelector('.details');
const setimg = document.querySelector('.time');
const seticon = document.querySelector('.icon img');
const setcard = document.querySelector('.card');
const forcast = new Forcast();

const updateUI =(data)=>{
    citydets =data.citydets;
    weather = data.weather;
    showdetails.innerHTML = `
        <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${citydets.EnglishName}</h5>
            <div class="my-3 ">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>
    `;
    setDayNight(weather.IsDayTime);
    setcard.classList.remove("d-none");
    // console.log(weather);
    setIconImg(weather.WeatherIcon);

}

local.addEventListener('submit',e=>{
    e.preventDefault();

    const cityvalue=local.city.value.trim();

    local.reset();
    forcast.updateCity(cityvalue)
        .then(data=> updateUI(data))
        .catch(err=> console.log(err));

    localStorage.setItem('city',cityvalue);
        
    
});

const setDayNight = b =>{
    if(b){
        setimg.setAttribute("src","img/day.svg");
    }
    else{
        setimg.setAttribute("src","img/night.svg");
    }
}
const setIconImg=(n) =>{
    seticon.setAttribute("src",`img/icons/${n}.svg`);
}
// console.log(localStorage.getItem("city"));
if(localStorage.getItem('city')){
    forcast.updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(err =>console.log(err));
}
