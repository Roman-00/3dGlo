/* eslint-disable no-unused-vars */
'use strict';
// Amimate
const animate = ({ timing, draw, duration }) => {
	const start = performance.now();
	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		const progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}
	});
};

// popup
const togglePopUp = () => {
	const popup = document.querySelector('.popup'),
		popupContent = document.querySelector('.popup-content'),
		popupBtn = document.querySelectorAll('.popup-btn'),
		popupWidth = document.documentElement.clientWidth;

	const animatePopup = () => animate({
		duration: 300,
		timing(timeFraction) {
			return timeFraction;
		},
		draw(progress) {
			popupContent.style.top = '0%';
			popup.style.opacity = 0.1;
			popup.style.display = 'block';
			popupContent.style.top = progress * 25 + '%';
			popup.style.opacity = progress * 1;
		}
	});

	popupBtn.forEach(item => {
		if (popupWidth > 768) {
			item.addEventListener('click', animatePopup);
		} else {
			item.addEventListener('click', () => popup.style.display = 'block');
		}
	});

	popup.addEventListener('click', event => {
		let target = event.target;
		if (target.classList.contains('popup-close')) {
			popup.style.display = 'none';
		} else {
			target = target.closest('.popup-content');
			if (!target) {
				popup.style.display = 'none';
			}
		}
	});
};

export default togglePopUp;