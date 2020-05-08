/* eslint-disable no-unused-vars */
'use strict';

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


export default smoothScrolling;