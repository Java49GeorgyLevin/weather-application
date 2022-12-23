export class DataForm {
    #formElement;
    #cityElement;
    #inputElements;
    #dateFromElement;
    #dateToElement;
    #hoursFromElement;
    #hoursToElement;
    #errorMessageElem;
    #arCities;

    constructor (params) {
        this.#formElement = document.getElementById(params.idEnterData);
        this.#cityElement = document.getElementById(params.idSelectCity);
        this.#inputElements = document.querySelectorAll(`#${params.idEnterData} [name]`);
        this.#dateFromElement = document.getElementById(params.idDateFrom);
        this.#dateToElement = document.getElementById(params.idDateTo);
        this.#hoursFromElement = document.getElementById(params.idTimeFrom);
        this.#hoursToElement = document.getElementById(params.idTimeTo);
        this.#errorMessageElem = document.getElementById(params.idErrorMessage);
        this.#arCities = params.arCities;
    }

    addHandler(processFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputData = Array.from(this.#inputElements)
            .reduce((res, cur) => {
                res[cur.name] = cur.value;
                return res;
            } ,{});
            processFun(inputData);
        })
    }

    updateHTML() {
        this.#cityElement.innerHTML += this.listCities();
    }

    listCities() {
        return this.#arCities.map(city =>
            `<option value="${city}">${city}</option>`
            ).join('');
    }
}