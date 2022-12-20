export class TemperaturesList {
    #listElement;
    constructor(idList) {
        this.#listElement = document.getElementById(idList);
    }
    showTemperatures(dataArray) {
        this.#listElement.innerHTML = listOfTemperatures(dataArray);
    }
}
function listOfTemperatures(dataArray) {
    return dataArray.map(el => {
        return `<li class="details-list">
                Data: ${el.date} Time: ${el.hour} Temperature: ${el.temperature}</p>
                </li>`});
}