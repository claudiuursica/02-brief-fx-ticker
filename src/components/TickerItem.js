import React, { Component } from 'react';

export class TickerItem extends Component
{
	constructor(props)
	{
		super(props)

		this.removeSubscription = this.removeSubscription.bind(this);
	}

	removeSubscription()
	{
		this.props.removeSubscription(this.props.priceItem.symbol);
	}

	render()
	{
		const isUpdateRequired = this.props.priceItem.symbol === this.props.last.symbol;
		const targetPriceItem = isUpdateRequired ? this.props.last : this.props.priceItem;
		const isNegativePointsChange = targetPriceItem.points < 0;

		const percentDirectionClass = isNegativePointsChange ?
			'ticker-item__percent--state--down' : 'ticker-item__percent--state--up';
		const percentClass = 'ticker-item__percent ticker-item__elem ' + percentDirectionClass;

		const arrowHTMEntity = isNegativePointsChange ? this.props.downArrowHTMLEntity : this.props.upArrowHTMLEntity;

		const pointsDirectionClass = isNegativePointsChange ?
			'ticker-item__points--state--down' : 'ticker-item__points--state--up';
		const pointsClass = 'ticker-item__points ticker-item__elem ' + pointsDirectionClass;

		return (
			<div className="ticker-item">
				<button type="button" className="ticker-item__remove" onClick={this.removeSubscription}>X</button>
				<div className="ticker-item__header ticker-item__elem">
					<span className="ticker-item__header__title ticker-item__elem">{this.props.priceItem.symbol}</span>
					<span className="ticker-item__header__last-value ticker-item__elem">{this.props.priceItem.last.toFixed(4)}</span>
				</div>
				<div className="ticker-item__change ticker-item__elem">
					<span className={percentClass}>{arrowHTMEntity}{this.props.priceItem.percent.toFixed(2)}%</span>
					<span className={pointsClass}>{this.props.priceItem.points.toFixed(4)}</span>
				</div>
			</div>
		)
	}
}
