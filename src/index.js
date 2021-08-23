import './sass/main.scss';
import debounce from 'lodash.debounce';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries.js'


const refs = {
    input: document.querySelector(".input"),
    countriesList: document.querySelector(".countries__list")
}

function createMarkupListCountries(arr) {
    const template = arr.map((el) =>`<li>${el.name}</li>`).join("")
    refs.countriesList.insertAdjacentHTML('beforeend', template)
}

function getFetchData() {
    refs.countriesList.innerHTML = ""
    const value = refs.input.value
    console.log(value);
    fetchCountries(value)
}
    
export default function renderCollections(arrCountries) {
    if(arrCountries.length === 1) {
        return createMarkupCountry(arrCountries)
    } else if(arrCountries.length > 10) {
        return alert({text: 'Too many matches found. Please enter a more specific query!'})
    }
    createMarkupListCountries(arrCountries)
}

refs.input.addEventListener('input', debounce(getFetchData, 500))
