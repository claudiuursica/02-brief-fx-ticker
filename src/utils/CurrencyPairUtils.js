/**
 * @param {string} currencyPair
 * @returns {?{currencyFrom: (string), currencyTo: (string)}}
 */
export function currencyPairToSymbols(currencyPair)
{
	if (isValidCurrencyPair(currencyPair))
	{
		const currencyFrom = currencyPair.slice(0, 3);
		if (!checkLengthSymbol(currencyFrom))
		{
			return null;
		}

		const currencyTo = currencyPair.slice(3);
		if (!checkLengthSymbol(currencyTo))
		{
			return null;
		}

		return { currencyFrom, currencyTo };
	}

	return null;
}

/**
 * @param {string} currencyPairs comma separated pairs
 * @returns {Array.<string>}
 */
export function currencyPairsToList(currencyPairs)
{
	if (isValidCurrencyPairsString(currencyPairs))
	{
		const currencyPairsList = trimAllSpaces(currencyPairs).split(',');
		return currencyPairsList.filter(currencyPair => isValidCurrencyPair(currencyPair));
	}

	return [];
}

/**
 *
 * @param {string} currencyPair
 * @returns {boolean}
 */
export function isValidCurrencyPair(currencyPair)
{
	return isString(currencyPair) && checkLengthCurrencyPair(currencyPair);
}

/**
 *
 * @param {string} currencyPairs
 * @returns {boolean}
 *
 * check if at least one pair
 */
export function isValidCurrencyPairsString(currencyPairs)
{
	return isString(currencyPairs) && checkLengthCurrencyPairs(currencyPairs);
}

const isString = currencyPair => typeof currencyPair === 'string';
const isValidLength = (string, param) => string.length === param;
const isAtLeastLength = (string, param) => string.length >= param;
const checkLengthCurrencyPair = currencyPair => isValidLength(currencyPair, 6);
const checkLengthCurrencyPairs = currencyPair => isAtLeastLength(currencyPair, 6);
const checkLengthSymbol = currencyPair => isValidLength(currencyPair, 3);
const trimAllSpaces = (string) => string.replace(/ /g, '');
