/* eslint-disable no-unused-vars */
'use strict';

const tabs = () => {
	const tabHeader = document.querySelector('.service-header'),
		tab = tabHeader.querySelectorAll('.service-header-tab'),
		tabContent = document.querySelectorAll('.service-tab');

	const toogleTabContent = index => {
		for (let i = 0; i < tabContent.length; i++) {
			if (index === i) {
				tab[i].classList.add('active');
				tabContent[i].classList.remove('d-none');
			} else {
				tab[i].classList.remove('active');
				tabContent[i].classList.add('d-none');
			}
		}
	};

	tabHeader.addEventListener('click', event => {
		let target = event.target;
		target = target.closest('.service-header-tab');
		if (target) {
			// eslint-disable-next-line no-loop-func
			tab.forEach((item, i) => {
				if (item === target) {
					toogleTabContent(i);
				}
			});
		}
	});
};

export default tabs;
