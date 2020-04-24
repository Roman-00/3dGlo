// eslint-disable-next-line strict
'use stricts';
window.addEventListener('DOMContentLoaded', () => {
	// Timer
	const countTimer = deadline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return {
				timeRemaining,
				hours,
				minutes,
				seconds
			};
		}

		function timeFormats(data) {
			if (data < 10) {
				data = '0' + data;
			}
			return data;
		}

		const timerSetInterval = setInterval(() => {
			const timer = getTimeRemaining();
			timerHours.textContent = timeFormats(timer.hours);
			timerMinutes.textContent = timeFormats(timer.minutes);
			timerSeconds.textContent = timeFormats(timer.seconds);

			if (timer.timeRemaining < 0) {
				clearInterval(timerSetInterval);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}, 1000);

	};
	countTimer('23 April 2020');


	//Меню
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
	toggleMenu();

	// Amimate
	function animate({ timing, draw, duration }) {
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
	}

	//popup
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

		popupBtn.forEach(elem => {
			if (popupWidth > 768) {
				elem.addEventListener('click', animatePopup);
			} else {
				elem.addEventListener('click', () => {
					elem.addEventListener('click', () => popup.style.display = 'block');
				});
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

		/*popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
		});*/
	};

	togglePopUp();

	//Табы
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

	tabs();
});
