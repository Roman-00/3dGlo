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
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const heandlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', heandlerMenu);

		closeBtn.addEventListener('click', heandlerMenu);

		menuItems.forEach(elem => elem.addEventListener('click', heandlerMenu));

	};
	toggleMenu();

	//popup
	const togglePopUp = () => {
		let popup = document.querySelector('.popup'),
			count = 0;
		const	popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

		const animatePopup = () => {
			count++;
			popup.style.top = count + 'px';
			if(count < 350) {
				setTimeout(animatePopup, 10);
			}
		};

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				animatePopup();
			});
		});
		popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
		});
	};

	togglePopUp();
});
