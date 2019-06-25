/**
 * This code is adapted from the tutorial on freeCodeCamp.org: https://www.freecodecamp.org/news/how-to-master-async-await-with-this-real-world-example-19107e7558ad/.
 * Some part of this code have been modified due to the technical and third-party changes, e.g. API Endpoint and response body.
 */

const axios = require('axios');

// First function - Receiving Currency Data Asynchronously
// Need to signup on https://currencylayer.com, then you will get the API access key
const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`http://www.apilayer.net/api/live?access_key= [YOUR API ACCESS KEY GOT FROM THE WEBSITE] &format=1`);

        const rate = response.data.quotes;
        const euro = 1 / rate[fromCurrency + 'EUR'];
        const exchangeRate = euro * rate[fromCurrency + toCurrency];

        return exchangeRate;
    } catch (error) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }
}

// Second function - Receiving Country Data Asynchronously
const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

        return response.data.map(country => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
}

// Third - Merging it all together
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

// Run the code
convertCurrency('USD', 'HRK', 20)
.then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error.message);
})