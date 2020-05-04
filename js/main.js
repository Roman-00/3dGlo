// eslint-disable-next-line strict
'use stricts';
window.addEventListener('DOMContentLoaded', () => {

	// Плавная прокрутка по ссылкам
	const smoothScrolling = () => {
		const smoothScroll = event => {
			const anchor = event.currentTarget.href.split('#')[1];

			if (anchor === '') {
				return;
			}
			const target = document.querySelector(`#${anchor}`);

			if (target) {
				event.preventDefault();
				const targetTop = target.getBoundingClientRect().y;
				const targetTopScroll = document.documentElement.scrollTop;
				const topScroll = targetTop + targetTopScroll;

				window.scrollTo({
					top: topScroll,
					behavior: "smooth"
				});
			}
		};
		const linkAnchors = document.querySelectorAll('a[href^="#"]');
		linkAnchors.forEach(item => item.addEventListener('click', smoothScroll));
	};

	smoothScrolling();

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
	countTimer('30 April 2020');


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

	//Слайдер
	const slider = () => {
		const slider = document.querySelector('.portfolio-content'),
			slide = document.querySelectorAll('.portfolio-item'),
			dots = document.querySelector('.portfolio-dots'),
			btn = document.querySelector('.portfolio-btn');

		for (let i = 0; i < slide.length; i++) {
			dots.insertAdjacentHTML('beforeend',
				`<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);
		}

		const dot = document.querySelectorAll('.dot');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});


		startSlide(2000);

	};

	slider();

	// Function Our Teams photo replacement
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

	photoReplacement();

	//validation calc
	const validationCalc = () => {
		const inputCalc = document.querySelectorAll('input[class*="calc-item calc"]');
		inputCalc.forEach(item => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/\D/g);
			});
		});
	};

	validationCalc();

	// Калькулятор
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

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
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			if (target.matches('select') || target.matches('input')) {
				countSum();
			}

		});


	};

	calc(100);

	// Send Form
	const sendForm = formId => {
		const errorMessage = 'Что-то пошло не так...',
			loadMessage = `
			<div class='sk-circle-bounce'>
				<div class='sk-child sk-circle-1'></div>
				<div class='sk-child sk-circle-2'></div>
				<div class='sk-child sk-circle-3'></div>
				<div class='sk-child sk-circle-4'></div>
				<div class='sk-child sk-circle-5'></div>
				<div class='sk-child sk-circle-6'></div>
				<div class='sk-child sk-circle-7'></div>
				<div class='sk-child sk-circle-8'></div>
				<div class='sk-child sk-circle-9'></div>
				<div class='sk-child sk-circle-10'></div>
				<div class='sk-child sk-circle-11'></div>
				<div class='sk-child sk-circle-12'></div>
			</div>`,
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const form = document.getElementById(formId),
			formTag = document.querySelectorAll('form');

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem;';

		const postData = body => new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					resolve(successMessage);
				} else {
					reject(errorMessage);
				}
			});
			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(body));
		});

		form.addEventListener('submit', event => {
			event.preventDefault();
			form.appendChild(statusMessage);
			statusMessage.innerHTML = loadMessage;
			const formData = new FormData(form);
			const body = {};
			formData.forEach((val, key) => {
				body[key] = val;
			});
			postData(body)
				.then(() => {
					statusMessage.textContent = successMessage;
					form.reset();
				})
				.catch(error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
		});

		formTag.forEach(form => {
			form.addEventListener('input', event => {
				const target = event.target;

				if (target.name === 'user_phone') {
					target.value = target.value.replace(/[^\+\d]/g, '');
				}

				if (target.name === 'user_name' || target.name === 'user_message') {
					target.value = target.value.replace(/[^а-я ]/gi, '');
				}
			});
		});
	};
	sendForm('form1');
	sendForm('form2');
	sendForm('form3');

});
