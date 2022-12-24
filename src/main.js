import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const weatherProcessor = new WeatherDataProcessor();
const arCities = weatherProcessor.getListCities();
const period = weatherProcessor.periodDayFuture();
const params = {idEnterData: "enter-data", idSelectCity: "select-city",
idDateFrom: "date-from", idDateTo: "date-to",
idTimeFrom: "time-from", idTimeTo: "time-to", idErrorMessage: "error-message", arCities, period};
const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList("weather-list", "selected-city");
dataForm.addHandler(async (dataFromForm) => {
    const promiseData = weatherProcessor.getData(dataFromForm);
    temperatureList.showTemperatures(await promiseData);

})



