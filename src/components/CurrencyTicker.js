import React, { Component } from 'react';
import { TickerItem } from "./TickerItem";

export class CurrencyTicker extends Component
{
	render()
	{
		const priceItems = this.props.priceItems;
		const priceItemsList = [];

		priceItems.forEach(priceItem => {
			priceItemsList.push(
				<TickerItem
					key={priceItem.symbol}
					priceItem={priceItem}
					last={this.props.last}
					upArrowHTMLEntity="&#8593;"
					downArrowHTMLEntity="&#x2193;"
					removeSubscription={this.props.removeSubscription}>
				</TickerItem>
			);
		});

		return (<div className="currency-ticker">{priceItemsList}</div>);
	}
}
