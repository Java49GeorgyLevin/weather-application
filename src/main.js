import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const weatherProcessor = new WeatherDataProcessor();
const arCities = weatherProcessor.getListCities();
console.log(arCities);
const params = {idEnterData: "enter-data", idSelectCity: "select-city",
idDateFrom: "date-from", idDateTo: "date-to",
idTimeFrom: "time-from", idTimeTo: "time-to", idErrorMessage: "error-message", arCities};
const dataForm = new DataForm(params);
// dataForm.updateHTML();
const temperatureList = new TemperaturesList("weather-list", "selected-city");
dataForm.addHandler(async (dataFromForm) => {
    const promiseData = weatherProcessor.getData(dataFromForm);
    temperatureList.showTemperatures(await promiseData);

})



