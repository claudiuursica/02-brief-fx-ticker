const BASE_URL = 'https://api.fixer.io/latest?base=';

/**
 * @param {string} currencyFrom
 * @param {string} currencyTo
 * @returns {string}
 */
export function buildURL(currencyFrom, currencyTo)
{
	return `${BASE_URL}${currencyFrom}&symbols=${currencyFrom},${currencyTo}`;
}
