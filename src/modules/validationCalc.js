/* eslint-disable no-unused-vars */
'use strict';

const validationCalc = () => {
	const inputCalc = document.querySelectorAll('input[class*="calc-item calc"]');
	inputCalc.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/g);
		});
	});
};

export default validationCalc;