import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  countryEl.innerHTML = '';
  countriesEl.innerHTML = '';

  const searchRequest = event.target.value.trim();

  if (searchRequest) {
    fetchCountries(searchRequest)
      .then(countries => {
        const countriesAmount = countries.length;
        if (countriesAmount === 1) {
          renderCountry(countries);
        } else if (countriesAmount >= 2 && countriesAmount <= 10) {
          renderCountriesList(countries);
        } else {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}


const countryEl = document.querySelector('.country-info');

function renderCountry(country) {
  const countryItem = country
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class="item"><img src="${flags.svg}" alt="flag of ${name}" width="28" height="100%">
        <h2>${name.official}</h2></div>
    <p><span class="item-info">Capital:</span> ${capital}</p>
    <p><span class="item-info">Population:</span> ${population}</p>
    <p><span class="item-info">Languages:</span> ${Object.values(languages).join(', ')}</p>`,
    )
    .join('');

  countryEl.innerHTML = countryItem;
}

const countriesEl = document.querySelector('.country-list');

function renderCountriesList(countries) {
  const countriesList = countries
    .map(
      ({ name, flags }) =>
        `<div class="item"><img src="${flags.svg}" alt="flag of ${name}" width="24" height="100%">
        <p class="item-name">${name.official}</p></div>`,
    )
    .join('');
 
  countriesEl.innerHTML = countriesList;
}

