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

	// меню
	const toggleMenu = () => {
		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		document.body.addEventListener('click', (event) => {
			let target = event.target;
			if(target.closest('.menu') || target.closest('.close-btn') || (target.closest('menu ul>li>a')) || 
				(!target.closest('.active-menu') && document.querySelector('.active-menu'))) {
					handlerMenu();
			}
		});
	};
	toggleMenu();

	// открытие-закрытие модального окна
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

	// плавный переход по меню
	const smoothDocument = () => {
		const anchors = document.querySelectorAll('menu ul>li>a');
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

	// слайдер
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			btn = document.querySelectorAll('.portfolio-btn'),
			ulDots = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0, 
			interval, 
			dot = [];

		const createDots = () => {
			for(let i = 0; i < slide.length; i++){
				dot[i] = document.createElement('li');
				dot[i].classList.add('dot');
				ulDots.append(dot[i]);
			}
		};
		createDots();

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide ++;
			if(currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 1000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);	
		};

		slider.addEventListener('click', (event) => {
			event.preventDefault();
			let target = event.target;
			if(!target.matches('.portfolio-btn, .dot')){
				return;
			}
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if(target.matches('#arrow-left')){
				currentSlide --;
			} else if(target.matches('#arrow-right')){
				currentSlide ++;
			} else if(target.matches('.dot')){
				dot.forEach((item, index) => {
					if(item === target){
						currentSlide = index;
					}
				});
			}
			if(currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if(currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', (event) => {
			if(event.target.matches('.portfolio-btn') || 
				event.target.matches('.dot')){
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', (event) => {
			if(event.target.matches('.portfolio-btn, .dot')){
				startSlide();
			}
		});

		startSlide(1500);

	};
	slider();
});

