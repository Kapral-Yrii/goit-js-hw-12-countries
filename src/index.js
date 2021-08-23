import './sass/main.scss';
import debounce from 'lodash.debounce';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries.js'


const refs = {
    input: document.querySelector(".input"),
    countriesList: document.querySelector(".countries__list"),
    root: document.querySelector(".root")
}

function createMarkupListCountries(arr) {
    refs.countriesList.innerHTML = ""
    const template = arr.map((el) =>`<li>${el.name}</li>`).join("")
    refs.countriesList.insertAdjacentHTML('beforeend', template)
}

function getFetchData() {
    refs.countriesList.innerHTML = ""
    refs.root.innerHTML = ""
    const value = refs.input.value
    console.log(value);
    fetchCountries(value)
}
function createMarkupCountry(arr) {
    refs.root.innerHTML = ""
    const country = arr[0]
    const languageMarkup = country.languages.map((el) =>`<li>${el.name}</li>`).join("")
    const countryMarkup =
    `<h1 class="country__name">${country.name}</h1>
    <div class="country__thumb">
        <div class="country__data">
            <p>Capital: <span>${country.capital}</span></p>
            <p>Population: <span>${country.population}</span></p>
            <p>Languages: <ul>${languageMarkup}</ul></p>
        </div>
        <div class="country__flag">
            <img src="${country.flag}" alt="${country.name}">
        </div>
    </div>`
    refs.root.insertAdjacentHTML('beforeend',countryMarkup)
}
    
export default function renderCollections(arrCountries) {
    if (arrCountries.length === 1) {
        return createMarkupCountry(arrCountries)
    } else if (arrCountries.length > 10) {
        return alert({ text: 'Too many matches found. Please enter a more specific query!' })
    } else if (arrCountries.message === 'Not Found') {
        return error({text: 'Country not found'})
    }
    createMarkupListCountries(arrCountries)
}

refs.input.addEventListener('input', debounce(getFetchData, 500))
