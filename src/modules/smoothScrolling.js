/* eslint-disable no-unused-vars */
'use strict';

const smoothScrolling = () => {
	const menuList = document.querySelectorAll('a[href*="#"]');
			menuList.forEach(eachElements => {
				eachElements.addEventListener('click', (event) => {
          event.preventDefault();
					const gotId = eachElements.getAttribute('href');
					document.querySelector('' + gotId).scrollIntoView({ behavior: 'smooth', block: 'start' });
		}); 
	});
};


export default smoothScrolling;