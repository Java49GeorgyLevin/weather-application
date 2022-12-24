export class WeatherDataProcessor {
    #cityGeocodes;
    #baseUrl;
    #baseParams;

constructor() {
    this.#cityGeocodes = [{city: "Tiberias", latitude: 32.7922, longitude: 35.5312},
    {city: "Petah Tikva", latitude: 32.0866, longitude: 34.8851},
    {city: "Maale Adumim", latitude: 31.777369, longitude: 35.297955},
    {city: "Gedera", latitude: 31.81456 , longitude: 34.77998},
    {city: "Eilat", latitude: 29.5581, longitude: 34.9482},
    {city: "Rehovot", latitude: 31.8928, longitude: 34.8113},
    {city: "Haifa", latitude: 32.7940, longitude: 34.9896},
    {city: "Jerusalem", latitude: 31.7683, longitude: 35.2137},
    {city: "Tel-Aviv", latitude: 32.0853, longitude: 34.7818},
    {city: "Beit Zera", latitude: 32.689296, longitude: 35.574062},
    {city: "Kiryat Yam", latitude: 32.849276, longitude: 35.068929},
];
    this.#baseUrl = "https://api.open-meteo.com/v1/gfs?";
    this.#baseParams = "&hourly=temperature_2m&timezone=IST&";
}

    getListCities() {
        return this.#cityGeocodes.map(obj => obj.city).sort();
    }

    async getData(requestObject) {
        const url = this.getUrl(requestObject);
        const response = await fetch(url);
        return this.processData(await response.json(), requestObject);

    }
    getUrl(requestObject) {
        const whatCity = this.#cityGeocodes.find(obj =>
            requestObject.selectCity == obj.city);
        const latitude = whatCity.latitude;
        const longitude = whatCity.longitude;
        const dateFrom = requestObject.dateFrom;
        const dateTo = requestObject.dateTo;
        const url = `${this.#baseUrl}latitude=${latitude}&longitude=${longitude}${this.#baseParams}start_date=${dateFrom}&end_date=${dateTo}`
        return url;
    }
 
    processData(data, requestObject) {
            const times = data.hourly.time;
            const temperatures = data.hourly.temperature_2m;
            const indexFrom = getIndexOfDate(times, requestObject.dateFrom);
            const indexTo = getIndexOfDate(times, requestObject.dateTo) + 24;
            const timesSelectedDates = times.slice(indexFrom, indexTo);
            const timesSelectedDatesHours = index24(timesSelectedDates);
            // .filter((time, index) =>
            // {
            //     index = index % 24;
            //     return index >= requestObject.timeFrom && index <= requestObject.timeTo;
            // } )

            function index24(ar) {
                return ar.filter((xxx, index) =>
            {
                index = index % 24;
                return index >= requestObject.timeFrom && index <= requestObject.timeTo;
            } )

            }

            const temperaturesSelectedDates = temperatures.slice(indexFrom, indexTo);
            const temperaturesDatesHours = index24(temperaturesSelectedDates);
            // .filter((time, index) =>
            // {
            //     index = index % 24;
            //     return index >= requestObject.timeFrom && index <= requestObject.timeTo;
            // } )

            const hourlyObjects = timesSelectedDatesHours.map((dt, index) => {
                const dateTime = dt.split("T");
                return {date: dateTime[0], hour: dateTime[1], temperature: temperaturesDatesHours[index]}
            } )
            
           return {city: requestObject.selectCity, hourlyObjects};
    }
}
function getIndexOfDate(times, date) {
    return times.findIndex(t => t.includes(date));
}