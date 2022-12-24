import { showErrorMessage } from "./ErrorMessage.js";
export class DataForm {
    #formElement;
    #cityElement;
    #inputElements;
    #dateFromElement;
    #dateToElement;
    #dateFrom;
    #dateTo;
    #hoursFromElement;
    #hoursToElement;
    #hourFrom;
    #hourTo;
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
        this.onChangeDate();
        this.onChangeHours();
        this.updateHTML();
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
    onChangeDate() {
        this.#dateFromElement.addEventListener("change", this.checkChangeDate.bind(this));
        this.#dateToElement.addEventListener("change", this.checkChangeDate.bind(this));
    }
    onChangeHours() {
        this.#hoursFromElement.addEventListener("change", (event) => this.checkChangeHours(event));
        this.#hoursToElement.addEventListener("change", (event) => this.checkChangeHours(event));
    }

    checkChangeDate(event) {
        const date = event.target.value;
        if(event.target == this.#dateFromElement){
            if(this.#dateFrom && date > this.#dateFrom){
                showErrorMessage(event.target, "date from must be <= date to", this.#errorMessageElem)
            } else {
                this.#dateFrom = date;
            }
        } else {
            if(this.#dateTo && date > this.#dateTo) {
                showErrorMessage(event.target, "date to must be >= date from", this.#errorMessageElem)
            } else {
                this.#dateTo = date;
            }
        }
    }
    checkChangeHours(event) {
        const hour = +event.target.value;
        if(event.target == this.#hoursFromElement) {
            if(this.#hourTo && hour > this.#hourTo) {
                showErrorMessage(event.target, "hour from must be <= hour to",this.#errorMessageElem)
            } else {
                this.#hourFrom = hour;
            }
        } else {
            if(this.#hourFrom && hour < this.#hourFrom) {
                showErrorMessage(event.target, "hours to must be >= hour from",this.#errorMessageElem)
            }else {
                this.#hourTo = hour;
            }
        }
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