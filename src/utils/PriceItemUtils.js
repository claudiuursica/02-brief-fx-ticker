/**
 * @param {number} updatedRate
 * @param {number} lastValue
 * @returns {{points: number, percent: number, last: number}}
 */
export function createPriceItemFromUpdatedRate(updatedRate, lastValue)
{
	let pointsChange = updatedRate - lastValue;
	if (pointsChange === 0)
	{
		const isPositiveChange = Math.random() >= 0.5;
		const randomPointsChange = Math.random() * 0.01;
		pointsChange = isPositiveChange ? randomPointsChange : randomPointsChange * -1;
		updatedRate += pointsChange;
	}

	return {
		points: pointsChange,
		percent: Math.abs(pointsChange * 100),
		last: updatedRate
	};
}
