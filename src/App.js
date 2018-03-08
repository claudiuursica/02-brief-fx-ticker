import React, {Component} from 'react';
import './App.css';

import { CurrencyTicker } from './components/CurrencyTicker';
import { CurrencyPricesSubscription } from './components/CurrencyPricesSubscription';

import { feed } from './services/feed';
import { currencyPairsToList } from "./utils/CurrencyPairUtils";

const DEFAULT_CURRENCY_PAIRS = ['EURUSD', 'USDCHF', 'USDJPY'];

class App extends Component
{
	/**
	 * @param {Object} props
	 */
	constructor(props)
	{
		super(props);

		const priceItems = new Map();

		feed.subscribe(DEFAULT_CURRENCY_PAIRS);
		feed.onChange(priceItem =>
		{
			priceItems.set(priceItem.symbol, priceItem);

			this.setState({
				priceItems: priceItems,
				last: priceItem
			});
		});

		this.state = {
			priceItems: priceItems
		};

		this.addSubscription = this.addSubscription.bind(this);
		this.removeSubscription = this.removeSubscription.bind(this);
	}

	/**
	 * @param {string} currencyPairs
	 */
	addSubscription(currencyPairs)
	{
		feed.subscribe(currencyPairsToList(currencyPairs));
	}

	/**
	 * @param {string} currencyPair
	 */
	removeSubscription(currencyPair)
	{
		feed.unsubscribe(currencyPair);

		const priceItems = this.state.priceItems;
		priceItems.delete(currencyPair);

		this.setState({
			priceItems: priceItems
		});
	}

	render()
	{
		return (
			<div>
				<CurrencyPricesSubscription addSubscription={this.addSubscription}/>
				<CurrencyTicker
					priceItems={this.state.priceItems}
					last={this.state.last}
					removeSubscription={this.removeSubscription}>
				</CurrencyTicker>
				<div className="disclaimer">
					<span>All currency pair values are fake and changes are simulated. Do not trade based on the above data.</span>
				</div>
			</div>
		);
	}
}

export default App;
