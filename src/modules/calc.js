'use strict';

// eslint-disable-next-line no-unused-vars
const calc = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');

	let animateTotal;
		const renderTotal = (total) => {
			let startTotal = 50;
	
			clearInterval(animateTotal);
	
			if (calcType.options[calcType.selectedIndex] === 0) {
				clearInterval(animateTotal);
				startTotal = 0;
			}
	
			animateTotal = setInterval(()=> {
				startTotal += total.toString().length;
				totalValue.textContent = Math.trunc(startTotal);
				if (startTotal >= total) {
					totalValue.textContent = Math.trunc(total);
					clearInterval(animateTotal);
				}
		}, 10);
	};

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = price * typeValue * squareValue * countValue * dayValue;
		}
		totalValue.textContent = total;
		renderTotal(total);
	};

	calcBlock.addEventListener('change', event => {
		const target = event.target;
		if (target.matches('select') || target.matches('input')) {
			countSum();
		}

	});
};

export default calc;