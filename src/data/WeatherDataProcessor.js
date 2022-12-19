export class WeatherDataProcessor {
#cityGeocodes
constructor() {
    this.#cityGeocodes = [{city:"Tiberias", latitude: 32.7922, longitude: 35.5312},
    {city:"Petah Tikva", latitude: 32.0866, longitude: 34.8851},
    {city:"Maale Adumim", latitude: 31.777369, longitude: 35.297955},
    {city:"Gedera", latitude: 31.81456 , longitude: 34.77998},
    {city:"Eilat", latitude: 29.5581, longitude: 34.9482}]

}
    getData(requestObject) {
        //{city, dateFrom, dateTo, hoursFrom, hoursTo}
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()));

    }
    getUrl(requestObject) {
        //TODO creates URL for request and returns it
    }
    processData(promiseData) {
        return promiseData(data => {
            //TODO
           // return {city, objects: [{date,hour,temperature},...]}
        })
    }
}