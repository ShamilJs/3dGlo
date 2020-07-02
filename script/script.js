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
		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		document.body.addEventListener('click', (event) => {
			let target = event.target;
			if(target.closest('.menu') || target.closest('.close-btn') || target.closest('menu ul>li') || 
				(!target.closest('.active-menu') && document.querySelector('.active-menu'))) {
					handlerMenu();
			}
		});
	};
	toggleMenu();

	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');
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
	
		popup.addEventListener('click', (event) => {
			let target = event.target;
			if(target.classList.contains('popup-close')){
				closePopup();
			} else {
				target = target.closest('.popup-content');
				if(!target){
					closePopup();
				}
			}
		});
	};
	togglePopup();

	const smoothDocument = () => {
		const anchors = document.querySelectorAll('a[href*="#"]');
		
		anchors.forEach((item) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				const blockID = item.getAttribute('href').substr(1);
				if(blockID !== 'close'){
					document.getElementById(blockID).scrollIntoView({
					   	behavior: 'smooth',
					   	block: 'start'
			    	});
				} 
			});
		});
	};
	smoothDocument();

	// табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');
		
		const toggleTabContent = (index) => {
			tabContent.forEach((item, i) => {
				if(i === index){
					tab[i].classList.add('active');
					item.classList.remove('d-none');
				} else {
					item.classList.add('d-none');
					tab[i].classList.remove('active');
				}
			});
		};

		tabHeader.addEventListener('click', (event) => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if(target){	
				tab.forEach((item, index) => {
					if(item === target){
						toggleTabContent(index);
					}
				});
			}
		});
	};
	tabs();
});

