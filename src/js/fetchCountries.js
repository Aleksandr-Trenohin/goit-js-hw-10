const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(countryName) {
  const url = `${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  });
}