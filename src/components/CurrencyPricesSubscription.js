import React, { Component } from 'react';

export class CurrencyPricesSubscription extends Component
{
	/**
	 * @param {Object} props
	 */
	constructor(props)
	{
		super(props);

		this.state = {
			symbol: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.addSubscription = this.addSubscription.bind(this);
	}

	addSubscription()
	{
		this.props.addSubscription(this.state.symbol);

		this.setState({
			symbol: ''
		});
	}

	/**
	 * @param {Event} event
	 */
	handleChange(event)
	{
		this.setState({
			symbol: event.target.value
		});
	}

	render()
	{
		return (
			<div className="currency-prices-subscription">
				<p>Available currency pairs for demo: EURUSD, USDCHF, USDJPY, USDAUD, USDCAD, USDGBP</p>
				<div className="input-group">
					<input
						type="text" className="currency-prices-subscription__input"
						placeholder="Comma separated list of currency pairs to subscribe..."
						value={this.state.symbol}
						onChange={this.handleChange}>
					</input>
					<span>
            <button
	            className="currency-prices-subscription__subscribe"
	            type="button" onClick={this.addSubscription}>
              Get prices
            </button>
					</span>
				</div>
			</div>
		);
	}
}
