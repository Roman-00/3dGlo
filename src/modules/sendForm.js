/* eslint-disable no-unused-vars */
'use strict';

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
	statusMessage.style.cssText = `
		font-size: 2rem;
		color: #ffffff;
		z-index: 999;
	`;

	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
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
			.then(response => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				}
				statusMessage.textContent = successMessage;
				form.reset();
				setTimeout(() => {
					statusMessage.textContent = '';
				}, 3000);
			})
			.catch(error => {
				statusMessage.textContent = errorMessage;
				console.error(error);
				setTimeout(() => {
					statusMessage.textContent = '';
				}, 3000);
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

export default sendForm;