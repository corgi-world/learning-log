((window, document) => {
	'use strict';

	const toggles = document.querySelectorAll('.toggle');
	const toggleBtn = document.getElementById('toggle-btn');

	toggleBtn.addEventListener('click', function() {
		toggleElements();
	});

	window.addEventListener('resize', function() {
		if (window.innerWidth > 1024) {
			offElements();
		}
	});

	const toggleElements = () => {
		[].forEach.call(toggles, (toggle) => {
			toggle.classList.toggle('on');
		});
	};
	const offElements = () => {
		[].forEach.call(toggles, (toggle) => {
			toggle.classList.remove('on');
		});
	};
})(window, document);
