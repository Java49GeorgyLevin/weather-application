export class WeatherDataProcessor {
    #cityGeocodes;
    #baseUrl;
    #baseParams;

constructor() {
    this.#cityGeocodes = [{city:"Tiberias", latitude: 32.7922, longitude: 35.5312},
    {city:"Petah Tikva", latitude: 32.0866, longitude: 34.8851},
    {city:"Maale Adumim", latitude: 31.777369, longitude: 35.297955},
    {city:"Gedera", latitude: 31.81456 , longitude: 34.77998},
    {city:"Eilat", latitude: 29.5581, longitude: 34.9482}];
    this.#baseUrl = "https://api.open-meteo.com/v1/gfs?";
    this.#baseParams = "&hourly=temperature_2m&timezone=IST&";


}
    getData(requestObject) {
        //{city, dateFrom, dateTo, hoursFrom, hoursTo}
        // this.#cityGeocodes.filter(obj => {

        //     requestObject.sity
        // })
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()));

    }
    getUrl(requestObject) {
        const whatCity = this.#cityGeocodes.filter(obj => {
            return requestObject.city == obj.city;
        })
        const latitude = whatCity[0].latitude;
        const longitude = whatCity[0].longitude;
        const dateFrom = requestObject.dateFrom;
        const dateTo = requestObject.dateTo;
        const url = `${this.#baseUrl}latitude=${latitude}&longitude=${longitude}${this.#baseParams}start_date=${dateFrom}&end_date=${dateTo}`
        return url;
    }
    processData(promiseData) {
        return promiseData(data => {
            //TODO
           // return {city, objects: [{date,hour,temperature},...]}
        })
    }
}

processData(promiseData) {
    return promiseData.then(data => {
        return data.hourly.time.map((cur, index) => {
            const dateTime = cur.split("T");
            return {
                date: dateTime[0],
                hour: dateTime[1],
                temperature: data.hourly.temperature_2m[index]
            }
        });
    })        
}