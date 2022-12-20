export class DataForm {
    #formElement;
    #sityElement;
    #dateFromElement;
    #dateToElement;
    #hoursFromElement;
    #hoursToElement;
    #errorMessageElem;

    constructor (params) {
        this.#formElement = document.getElementById(params.idEnterData);
        this.#sityElement = document.getElementById(params.idSelectSity);
        this.#dateFromElement = document.getElementById(params.idDateFrom);
        this.#dateToElement = document.getElementById(params.idDateTo);
        this.#hoursFromElement = document.getElementById(params.idTimeFrom);
        this.#hoursToElement = document.getElementById(params.idTimeTo);
        this.#errorMessageElem = document.getElementById(params.idErrorMessage);

    }
    addHandler(processFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.defaultPrevented();
            const weatherRequest = {};
            weatherRequest.sity = this.#sityElement.value;
            weatherRequest.dateFrom = this.#dateFromElement.value;
            weatherRequest.dateTo = this.#dateToElement.value;
            weatherRequest.hoursFrom = this.#hoursFromElement.value;
            weatherRequest.hoursTo = this.#hoursToElement.value;
            processFun(weatherRequest);
    })
    }
}