import renderCollections from './index.js'
export default function fetchCountries(searchQuery) {
    fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(response => response.json())
        .then(data => {renderCollections(data)})
        .catch(err => console.log(err))
}