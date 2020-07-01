window.addEventListener('DOMContentLoaded', function(){
	'use strict';

	// Timer
	const countTimer = (deadLine) => {
		let timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		const getTimeRemaining = () => {
			let dateStop = new Date(deadLine).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000, 
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
			};

		const updateClock = () => {
			let timer = getTimeRemaining();

			if(timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0) {
			
				let hoursStr = timer.hours + '';
				let minutesStr = timer.minutes + '';
				let secondsStr = timer.seconds + '';
					
				hoursStr = (hoursStr.length < 2) ? '0' + hoursStr :  hoursStr;
				minutesStr = (minutesStr.length < 2) ? '0' + minutesStr :  minutesStr;
				secondsStr = (secondsStr.length < 2) ? '0' + secondsStr :  secondsStr;

				timerHours.textContent = hoursStr;
				timerMinutes.textContent = minutesStr;
				timerSeconds.textContent = secondsStr;
			} else {
				let timerAction = document.querySelector('.timer-action');
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				timerAction.textContent = 'Акция закончилась!';
			}
			if(timer.timeRemaining < 0) {
			 	clearInterval(idInterval);
			} 
		};
		let idInterval = setInterval(updateClock, 1000);
	};
	countTimer('03 july 2020');

	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		
		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);
		menuItems.forEach((item) => item.addEventListener('click', handlerMenu));
	};
	toggleMenu();

	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content'),
			popupClose = document.querySelector('.popup-close');
		let step = 0,
			step1 = 10;

		const openPopup = () => {
			let requestId = requestAnimationFrame(openPopup);
			step1++;
			popup.style.display = 'block';
			if(popup.style.opacity < 1){
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
			popupContent.style.left = 0;
		};

		popupBtn.forEach((item) => {
			item.addEventListener('click', () => {
				if(screen.width > 768){
					openPopup();
				} else {
					popup.style.display = 'block';
				}
			});
		});
		popupClose.addEventListener('click', () => {
			if(screen.width > 768){
					closePopup();
				} else {
					popup.style.display = 'none';
			}
		});
	};
	togglePopup();

});

