/* eslint-disable no-unused-vars */
'use strict';

// eslint-disable-next-line no-unused-vars
class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.form = document.querySelector(selector);
		this.pattern = pattern;
		this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' &&
      item.type !== 'button');
		this.method = method;
		this.error = new Set();
	}

	init() {
		this.applyStyle();
		this.setPattern();
		this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
	}

	isValid(elem) {
		return false;
	}

	checkIt(event) {
		const target = event.target;

		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.remove(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
	}

	showError(elem) {
		elem.classList.remove('success');
		elem.classList.add('error');

		const errorDiv = document.createElement('div');
		errorDiv.textContent = 'Ошибка в этом поле!';
		errorDiv.classList.add('validator-error');
		elem.insertAdjacentElement('afterend', errorDiv);
	}

	showSuccess(elem) {
		elem.classList.remove('error');
		elem.classList.add('success');

		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			elem.nextElementSibling.remove();
		}
	}

	applyStyle() {
		const style = document.createElement('style');
		style.textContent = `
      input.success {
        border: 2px solid green !important;
      }
      input.error {
        border: 2px solid red !important;
      }
      .validator-error {
        position: relative;
        z-index: 1;
        font-size: 14px;
        color: red;
      }
    `;
		document.head.appendChild(style);
	}

	setPattern() {
		if (!this.pattern.name) {
			this.pattern.name = /^[а-яА-яЁё]+$/i;
		}

		if (!this.pattern.message) {
			this.pattern.message = /^[а-яА-Я ]+$/i;
		}

		if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w+\.\w{2,}$/;
		}

		if (!this.pattern.phone) {
			this.pattern.phone = /^\+?([78][-()]*\d){10}$/;
		}
	}
}
