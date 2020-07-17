	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');
		let step = 0,
			step1 = 10;

		const openPopup = () => {
			const requestId = requestAnimationFrame(openPopup);
			step1++;
			popup.style.display = 'block';
			if (popup.style.opacity < 1) {
				popup.style.opacity = step += 0.04;
				popupContent.style.left = step1 + '%';
			} else {
				cancelAnimationFrame(requestId);
			}
		};
		const closePopup = () => {
			step = 0;
			step1 = 10;
			popup.style.display = 'none';
			popup.style.opacity = 0;
			popupContent.style.left = '15%';
		};

		popupBtn.forEach(item => {
			item.addEventListener('click', () => {
				if (screen.width > 768) {
					openPopup();
				} else {
					popup.style.display = 'block';
					popup.style.opacity = 1;
					// popupContent.style.left = 0;
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;
			if (target.classList.contains('popup-close')) {
				closePopup();
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					closePopup();
				}
			}
		});
	};


	export default togglePopup;