'use strict';
/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
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

			const deadline = new Date(Date.parse(new Date()) + 24 * 60 * 60 * 1000);
			countTimer(deadline);
		}
	}, 1000);

};

export default countTimer;