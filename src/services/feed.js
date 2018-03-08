import { currencyPairToSymbols } from '../utils/CurrencyPairUtils';
import { createPriceItemFromUpdatedRate } from "../utils/PriceItemUtils";
import { buildURL } from "./api";

export const feed = (function ()
{
	const priceItemsSubscriptionList = [];

	const availablePriceItems = [
		{symbol: "EURUSD", last: 1.24, points: 0.01, percent: 1},
		{symbol: "USDCHF", last: 0.94, points: 1, percent: 1},
		{symbol: "USDJPY", last: 105.8, points: 1, percent: 1},
		{symbol: "USDAUD", last: 1.2812, points: 1, percent: 1},
		{symbol: "USDCAD", last: 1.2931, points: 1, percent: 1},
		{symbol: "USDGBP", last: 0.7209, points: 1, percent: 1}
	];

	return {
		onChange: function (callback)
		{
			setInterval(() =>
			{
				const randomPriceItemSymbol = Math.floor(Math.random() * availablePriceItems.length);
				const priceItem = availablePriceItems[randomPriceItemSymbol];

				const symbols = currencyPairToSymbols(priceItem.symbol);
				if (!symbols)
				{
					return;
				}

				const {currencyFrom, currencyTo} = symbols;
				fetch(buildURL(currencyFrom, currencyTo))
					.then(response => response.json())
					.then(data => data.rates[currencyTo])
					.then(updatedRate => createPriceItemFromUpdatedRate(updatedRate, priceItem.last))
					.then(priceItemUpdate =>
					{

						Object.assign(priceItem, priceItemUpdate);

						if (priceItemsSubscriptionList.includes(priceItem.symbol))
						{
							callback(priceItem);
						}
					});
			}, 200);
		},

		subscribe: function (currencyPairs)
		{
			currencyPairs.forEach(currencyPair =>
			{
				const isAvailable = availablePriceItems.some(priceItem => priceItem.symbol === currencyPair);
				const isAlreadySubscribed = priceItemsSubscriptionList.includes(currencyPair);
				if (isAvailable && !isAlreadySubscribed)
				{
					priceItemsSubscriptionList.push(currencyPair);
				}
			});
		},

		unsubscribe: function (symbol)
		{
			const index = priceItemsSubscriptionList.indexOf(symbol);
			if (index > -1)
			{
				priceItemsSubscriptionList.splice(index, 1);
			}
		}
	};

}());
