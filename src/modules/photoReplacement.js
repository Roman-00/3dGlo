/* eslint-disable no-unused-vars */
'use strict';

const photoReplacement = () => {
	const imgTeams = document.querySelectorAll('.command__photo');

	let url;
	imgTeams.forEach(elem => {

		elem.addEventListener('mouseenter', event => {
			url = event.target.src;
			const target = event.target;
			target.src = target.getAttribute('data-img');
		});

		elem.addEventListener('mouseleave', event => {
			event.target.src = url;
		});
	});
};

export default photoReplacement;