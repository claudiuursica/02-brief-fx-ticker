import { buildURL } from "./api";

describe('Function: buildURL', () =>
{
	it('should build the correct URL for the give currency pair', () => {
		const expectedResult = 'https://api.fixer.io/latest?base=USD&symbols=USD,EUR';
		expect(buildURL('USD', 'EUR')).toEqual(expectedResult);
	});
});
