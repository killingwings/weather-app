class Forcast{
    constructor(){
        this.key ='zDUP2r2tiMaIXfpsGLiNRGZyzX5LihP4';
        this.cityURl='http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURl='http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city){
        const citydets = await this.getCityCode(city);
        const weather = await this.getCurrentConditions(citydets.Key);
        return {citydets, weather};

    }
    async getCityCode(cityname){
        const query = `?apikey=${this.key}&q=${cityname}`;
        // console.log(typeof(url));
        const response = await fetch(this.cityURl+query);
        const data = await response.json();
        return data[0];

    }
    async getCurrentConditions(citycode){
        const query=`${citycode}?apikey=${this.key}`;
        const response = await fetch(this.weatherURl+query);
        const data = await response.json();
        return data[0];
    }
}


