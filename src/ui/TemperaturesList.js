export class TemperaturesList {
    #listElement;
    #cityElement;
    constructor(idList, idSelectedCity) {
        this.#listElement = document.getElementById(idList);
        this.#cityElement = document.getElementById(idSelectedCity);
    }
    showTemperatures(dataObj) {
        console.log(dataObj);
        this.#cityElement.innerHTML = dataObj.city;
       
        this.#listElement.innerHTML = listOfTemperatures(dataObj.hourlyObjects);
    }
}
function listOfTemperatures(arHourlyObj) {
    return arHourlyObj.map(obj => 
        `<li class="details-list">
       <p class="paragraph-data"> Data: ${obj.date} </p>
       <p class="paragraph-data"> Time: ${obj.hour} </p>
       <p class="paragraph-data"> Temperature: ${obj.temperature}&deg;C </p>
        </li>`).join('');
}