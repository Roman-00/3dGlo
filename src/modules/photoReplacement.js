/* eslint-disable no-unused-vars */
'use strict';

const photoReplacement = () => {
	const command = document.querySelector('.command');
		
	command.onmouseover = (event) => {
		let target = event.target; 
		target.dataset.newsrc = target.src;
		target.src = target.dataset.img;
	};
	command.onmouseout = (event) => {
		let target = event.target; 
		target.src =  target.dataset.newsrc;
	};
	/*const imgTeams = document.querySelectorAll('.command__photo');

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
	});*/
};

export default photoReplacement;