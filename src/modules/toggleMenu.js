/* eslint-disable no-unused-vars */
'use strict';

const toggleMenu = () => {
	const btnMenu = document.querySelector('menu');
	document.body.addEventListener('click', event => {
		const target = event.target;
		if (target && target.closest('.menu')) {
			btnMenu.classList.add('active-menu');
		} else if (target && (target.tagName === 'A' || !target.classList.contains('active-menu'))) {
			btnMenu.classList.remove('active-menu');
		}
	});
};

export default toggleMenu;