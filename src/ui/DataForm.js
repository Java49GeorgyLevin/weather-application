export class DataForm {
    // TODO
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

        //TODO
    }
    addHandler(processFun) {
        //TODO
    }
}